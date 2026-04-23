/**
 * Scraper: ConciertosenGranada.es
 * 100% live music. Small venues like Planta Baja, Sala Riff, Lemon Rock.
 *
 * HTML structure (per day section):
 *   Each event is an `li` containing an `a[href^="/conciertos/"]` with:
 *     - Visible time (e.g. "21:30")
 *     - Title via strong/link text
 *     - Genre (e.g. "/ Jazz/Swing")
 *     - Venue (e.g. "Lemon Rock. Granada")
 *     - Price (e.g. "5€", "Entrada libre")
 *     - Image via img.lazy[data-src] or meta[itemprop="image"]
 *
 * We also enrich events that lack price/description by fetching the detail page.
 */
import { fetchHTML } from '../utils/scraper-helpers.js';

export interface ConciertosGranadaEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  genre: string;
  price: string;
  url: string;
  imageUrl?: string;
  description?: string;
}

const BASE_URL = 'https://conciertosengranada.es';

/** Map Spanish short weekday + day + short month to YYYY-MM-DD */
const SHORT_MONTHS: Record<string, number> = {
  ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
  jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
};

function parseShortDate(text: string): string | null {
  // Matches: "Dom 22 Mar", "Vie 3 Abr", "Sab 11 Abr", "Mie 19 Mar"
  const match = text.match(/\b(?:lun|mar|mie|jue|vie|sab|dom)\w*\s+(\d{1,2})\s+(\w{3})/i);
  if (!match) return null;

  const day = Number(match[1]);
  const monthStr = match[2]!.toLowerCase();
  const month = SHORT_MONTHS[monthStr];
  if (month === undefined) return null;

  const now = new Date();
  let year = now.getFullYear();
  // If the date would be more than 2 months in the past, assume next year
  const candidate = new Date(year, month, day);
  if (candidate.getTime() < now.getTime() - 60 * 24 * 60 * 60 * 1000) {
    year++;
  }

  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** Extract time from text like "21:30" or "22:00" */
function extractTime(text: string): string {
  const match = text.match(/(\d{1,2}):(\d{2})/);
  if (match) {
    return `${match[1]!.padStart(2, '0')}:${match[2]}`;
  }
  return 'Por confirmar';
}

/** Extract price from text like "5€", "38,50€", "Entrada libre", "12/15€" */
function extractPrice(text: string): string {
  if (/entrada\s+libre|gratis|acceso\s+libre/i.test(text)) {
    return 'Gratis';
  }
  // Match first price pattern: "5€", "38,50€", "12,37/15€"
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*€/);
  if (match) {
    return `${match[1]!.replace(',', '.')}€`;
  }
  return '';
}

/** Extract genre from text like "/ Jazz/Swing", "/ Pop-rock/Indie" */
function extractGenre(text: string): string {
  const match = text.match(/\/\s*([A-ZÁÉÍÓÚÑa-záéíóúñ][A-Za-záéíóúñÁÉÍÓÚÑ\s/&-]+?)(?:\s*$|\s*\n)/);
  if (match) {
    return match[1]!.trim();
  }
  return '';
}

/** Fetch detail page for richer description and fallback price */
async function fetchDetailInfo(url: string): Promise<{ description?: string; price?: string }> {
  try {
    const $ = await fetchHTML(url, { timeout: 10_000, retries: 1 });
    const result: { description?: string; price?: string } = {};

    // Description: look for the event description block
    const descEl = $('div.descripcion, .evento-descripcion, article p, .entry-content p').first();
    if (descEl.length) {
      const desc = descEl.text().trim();
      if (desc.length > 10) {
        result.description = desc.slice(0, 400);
      }
    }

    // Price from detail page
    const text = $.text();
    const priceMatch = text.match(/Precio[:\s]+([\d.,]+(?:\s*[-/]\s*[\d.,]+)?)\s*€/i);
    if (priceMatch) {
      result.price = `${priceMatch[1]!.split(/[-/]/)[0]!.trim().replace(',', '.')}€`;
    } else if (/\b(entrada\s+libre|gratis|acceso\s+libre)\b/i.test(text)) {
      result.price = 'Gratis';
    }

    return result;
  } catch {
    return {};
  }
}

export async function fetchConciertosGranadaEvents(): Promise<ConciertosGranadaEvent[]> {
  const $ = await fetchHTML(BASE_URL);
  const events: ConciertosGranadaEvent[] = [];
  const seen = new Set<string>();

  // ── Current date context for date parsing ──
  // The page groups events by day with date headers.
  // We'll track the current date as we iterate.
  let currentDate = '';

  // ── Strategy: Walk all list items containing concert links ──
  // The page uses `li` elements with embedded concert data.
  // Each li has: time, image, title (in a[href^="/conciertos/"]), genre, venue+price

  $('li').each((_, liEl) => {
    const $li = $(liEl);

    // Must contain a concert link
    const $concertLink = $li.find('a[href^="/conciertos/"]').first();
    if (!$concertLink.length) return;

    const href = $concertLink.attr('href') ?? '';
    if (!href || href === '/conciertos/' || href === '/conciertos') return;
    // Skip category/filter links
    if (/\/conciertos\/(genero|tipo|lugar|fecha|locales)\//i.test(href)) return;

    const cleanHref = href.split('?')[0]!;
    // Normalize URL to deduplicate events with timestamp suffixes
    const normalizedHref = cleanHref.replace(/\/\d{10,}$/, '');
    if (seen.has(normalizedHref)) return;
    seen.add(normalizedHref);

    // ── Get all text content of this li for extraction ──
    const liText = $li.text();
    const liHtml = $li.html() ?? '';

    // ── Title ──
    // Try Schema.org meta first, then link strong text, then link text
    const metaName = $li.find('meta[itemprop="name"]').attr('content');
    const strongText = $concertLink.find('strong').map((_, s) => $(s).text().trim()).get().join(' ').trim();
    const linkText = $concertLink.text().split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const title = metaName || strongText || linkText[0] || '';
    if (!title || title.length < 2) return;

    // ── Date ──
    // Try Schema.org startDate first
    const metaDate = $li.find('meta[itemprop="startDate"]').attr('content');
    let dateStr = '';
    if (metaDate) {
      dateStr = metaDate.split('T')[0] ?? '';
    }
    // Fallback: parse from visible text
    if (!dateStr) {
      for (const line of linkText) {
        const parsed = parseShortDate(line);
        if (parsed) { dateStr = parsed; break; }
      }
    }
    // Fallback: use current date context (from day headers)
    if (!dateStr && currentDate) {
      dateStr = currentDate;
    }
    if (!dateStr) return;
    // Update current date context
    currentDate = dateStr;

    // ── Time ──
    const metaStartDate = $li.find('meta[itemprop="startDate"]').attr('content');
    let time = 'Por confirmar';
    if (metaStartDate && metaStartDate.includes('T')) {
      const timePart = metaStartDate.split('T')[1];
      if (timePart) time = timePart.slice(0, 5);
    }
    // Fallback: extract from visible text (first occurrence of HH:MM)
    if (time === 'Por confirmar') {
      time = extractTime(liText);
    }

    // ── Venue ──
    // Try Schema.org location
    const venueMeta = $li.find('[itemprop="location"] [itemprop="name"]').first().attr('content')
      || $li.find('[itemprop="location"] [itemprop="name"]').first().text().trim();
    let venue = venueMeta || '';

    // Fallback: look for venue links (a[href^="/locales/"])
    if (!venue || venue.length < 2) {
      const venueLink = $li.find('a[href*="/locales/"]').first().text().trim();
      if (venueLink) {
        // Strip city suffix like ". Granada"
        venue = venueLink.replace(/\.\s*(granada|motril|monachil|almuñécar|loja|armilla|la zubia|lanjarón|dílar|nigüelas|órgiva|atarfe)\s*$/i, '').trim();
      }
    }

    // Fallback: parse from link text lines
    if (!venue || venue.length < 2) {
      for (let i = 1; i < linkText.length; i++) {
        const line = linkText[i]!;
        if (!parseShortDate(line) && line.length > 2 && !/^\d/.test(line)) {
          venue = line.replace(/\.\s*(granada|motril|monachil|almuñécar|loja)$/i, '').trim();
          break;
        }
      }
    }
    if (!venue) venue = 'Granada';

    // ── Genre ──
    const genre = extractGenre(liText);

    // ── Price ──
    const price = extractPrice(liText);

    // ── Image ──
    const metaImage = $li.find('meta[itemprop="image"]').attr('content');
    const imgDataSrc = $li.find('img.lazy').attr('data-src') ?? $li.find('img').first().attr('data-src');
    const imgSrc = $li.find('img').first().attr('src');
    let imageUrl: string | undefined = metaImage;
    if (!imageUrl && imgDataSrc && !imgDataSrc.includes('nofoto')) {
      // Convert thumbnail to full-size
      imageUrl = imgDataSrc
        .replace('/doc/cp/', '/doc/c/')
        .replace('/doc/ap/', '/doc/a/')
        .replace(/_p\.(jpe?g|png)$/i, '.$1');
    }
    if (!imageUrl && imgSrc && !imgSrc.includes('nofoto') && !imgSrc.startsWith('data:')) {
      imageUrl = imgSrc;
    }
    // Ensure absolute URL
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    }

    // ── Description ──
    const descEl = $li.find('p, .description, .info, .resumen').first();
    const description = descEl.length ? descEl.text().trim().slice(0, 300) : undefined;

    events.push({
      title: title.replace(/\s+/g, ' ').trim(),
      date: dateStr,
      time,
      venue,
      genre,
      price,
      url: cleanHref.startsWith('http') ? cleanHref : `${BASE_URL}${cleanHref}`,
      imageUrl,
      description,
    });
  });

  // ── Also scan the "banner" / "destacados" section ──
  // These are in the top slider and may not appear in the li scan
  $('a[href^="/conciertos/"]').each((_, el) => {
    const $link = $(el);
    const href = $link.attr('href') ?? '';
    if (!href || href === '/conciertos/' || href === '/conciertos') return;
    if (/\/conciertos\/(genero|tipo|lugar|fecha|locales)\//i.test(href)) return;
    // Skip buy-ticket links
    if (href.includes('link=banner') === false && $link.closest('li').length) return;

    const cleanHref = href.split('?')[0]!;
    const normalizedHref = cleanHref.replace(/\/\d{10,}$/, '');
    if (seen.has(normalizedHref)) return;
    seen.add(normalizedHref);

    const rawText = $link.text();
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    const title = lines[0]!;
    if (title.length < 2) return;

    let venue = 'Granada';
    let dateStr = '';

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]!;
      const parsed = parseShortDate(line);
      if (parsed) {
        dateStr = parsed;
      } else if (line.length > 2 && !dateStr) {
        venue = line.replace(/\.\s*(granada|motril|monachil|almuñécar|loja|armilla|la zubia|lanjarón|dílar)$/i, '').trim();
      }
    }

    if (!dateStr) return;

    // Get image from parent container
    const $parent = $link.parent();
    const imgSrc = $parent.find('img').first().attr('data-src')
      ?? $parent.find('img').first().attr('src') ?? '';
    const imageUrl = imgSrc && !imgSrc.includes('nofoto')
      ? (imgSrc.startsWith('http') ? imgSrc : `${BASE_URL}${imgSrc}`)
      : undefined;

    events.push({
      title: title.replace(/\s+/g, ' ').trim(),
      date: dateStr,
      time: 'Por confirmar',
      venue,
      genre: '',
      price: '',
      url: cleanHref.startsWith('http') ? cleanHref : `${BASE_URL}${cleanHref}`,
      imageUrl,
    });
  });

  // ── Enrich events that lack price/description from detail pages ──
  // Parallelize with concurrency limit to avoid hammering the server
  const CONCURRENCY = 5;
  const needsEnrich = events.filter(e => !e.price || !e.description);

  for (let i = 0; i < needsEnrich.length; i += CONCURRENCY) {
    const batch = needsEnrich.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map(async (event) => {
        const info = await fetchDetailInfo(event.url);
        if (info.price && !event.price) event.price = info.price;
        if (info.description && !event.description) event.description = info.description;
      })
    );
    // Small delay between batches
    if (i + CONCURRENCY < needsEnrich.length) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  return events;
}
