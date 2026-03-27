/**
 * Scraper: ConciertosenGranada.es
 * 100% live music. Small venues like Planta Baja, Sala Riff, Lemon Rock.
 * Structure: li[itemscope] with Schema.org MusicEvent microdata
 * Images: accessed via data-src on img.lazy, or meta[itemprop="image"] in div.microdatos
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

export async function fetchConciertosGranadaEvents(): Promise<ConciertosGranadaEvent[]> {
  const $ = await fetchHTML(BASE_URL);
  const events: ConciertosGranadaEvent[] = [];
  const seen = new Set<string>();

  // Each event is in an li[itemscope] with Schema.org MusicEvent data
  $('li[itemscope][itemtype*="MusicEvent"]').each((_, el) => {
    const $li = $(el);

    // ── Image ── best source: meta[itemprop="image"] in div.microdatos
    const metaImage = $li.find('meta[itemprop="image"]').attr('content');
    // Fallback: data-src on lazy img (thumbnail, but usable)
    const imgDataSrc = $li.find('img.lazy').attr('data-src');
    // Convert thumbnail to full-size if it matches the thumbnail pattern
    // e.g. /doc/cp/2026/c_xxx_p.jpg → /doc/c/2026/c_xxx.jpg
    //      /doc/ap/2017/a_xxx_p.jpg → /doc/a/2017/a_xxx.jpg
    let imageUrl: string | undefined = metaImage;
    if (!imageUrl && imgDataSrc && !imgDataSrc.includes('nofoto')) {
      // Attempt to convert thumbnail to full-size
      imageUrl = imgDataSrc
        .replace('/doc/cp/', '/doc/c/')
        .replace('/doc/ap/', '/doc/a/')
        .replace(/_p\.jpg$/, '.jpg');
    }

    // ── Title ── first itemprop="name" within microdatos, or anchor text
    const metaName = $li.find('meta[itemprop="name"]').attr('content');
    // Also try the visible anchor text
    const anchorTitle = $li.find('a.nombre strong').map((_, s) => $(s).text().trim()).get().join(' ').trim();
    const title = metaName || anchorTitle;
    if (!title || title.length < 2) return;

    // ── URL ──
    const href = $li.find('a[href^="/conciertos/"]').first().attr('href') ?? '';
    if (!href || href === '/conciertos/' || href === '/conciertos') return;
    const cleanHref = href.split('?')[0]!;
    const normalizedHref = cleanHref.replace(/\/\d{10,}$/, '');
    if (seen.has(normalizedHref)) return;
    seen.add(normalizedHref);

    // ── Date ──
    // Try Schema.org startDate first (most reliable)
    const metaDate = $li.find('meta[itemprop="startDate"]').attr('content');
    let dateStr = '';
    if (metaDate) {
      // Format: "2026-03-24T20:30" → "2026-03-24"
      dateStr = metaDate.split('T')[0] ?? '';
    }

    // Fallback: parse visible date text from the link
    if (!dateStr) {
      const rawText = $li.find('a[href^="/conciertos/"]').first().text();
      const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      for (const line of lines) {
        const parsed = parseShortDate(line);
        if (parsed) { dateStr = parsed; break; }
      }
    }

    if (!dateStr) return;

    // ── Time ──
    const metaStartDate = $li.find('meta[itemprop="startDate"]').attr('content');
    let time = 'Por confirmar';
    if (metaStartDate && metaStartDate.includes('T')) {
      const timePart = metaStartDate.split('T')[1];
      if (timePart) time = timePart.slice(0, 5);
    }

    // ── Venue ──
    const venueMeta = $li.find('[itemprop="location"] [itemprop="name"]').first().attr('content')
      || $li.find('[itemprop="location"] [itemprop="name"]').first().text().trim();
    let venue = venueMeta || 'Granada';
    if (!venue || venue.trim().length < 2) {
      // Fallback: parse from visible text
      const rawText = $li.find('a[href^="/conciertos/"]').first().text();
      const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i]!;
        if (!parseShortDate(line) && line.length > 2) {
          venue = line.replace(/\.\s*(granada|motril|monachil|almuñécar|loja)$/i, '').trim();
          break;
        }
      }
    }

    // ── Genre ──
    const parentText = $li.text();
    const genreMatch = parentText.match(
      /\b(Rock|Metal|Pop|Jazz|Swing|Indie|Electr[oó]nica|Folk|Flamenco|Hip[- ]?[Hh]op|Reggae|Blues|Soul|Funk|Punk|Ska|Rap|Trap|Techno|House|Rumba|Latin|Cl[aá]sica|World|Mestizaje|Fusión|Singer[\s-]?Songwriter)(\s*\/\s*\S+)?/i
    );
    const genre = genreMatch ? genreMatch[1]! : '';

    // ── Price ──
    const priceMatch = parentText.match(/(\d+[,.]?\d*)\s*€|entrada\s+libre|gratis/i);
    const price = priceMatch ? priceMatch[0].trim() : '';

    // ── Description ──
    const descEl = $li.find('p, .description, .info, .resumen').first();
    const description = descEl.length ? descEl.text().trim().slice(0, 300) : undefined;

    events.push({
      title,
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

  // Fallback: if structured data approach found nothing, revert to link-based scraping
  if (events.length === 0) {
    $('a[href^="/conciertos/"]').each((_, el) => {
      const $link = $(el);
      const href = $link.attr('href') ?? '';
      if (href === '/conciertos/' || href === '/conciertos') return;
      if (/\/conciertos\/(genero|tipo|lugar|fecha|locales)\//i.test(href)) return;

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
          venue = line.replace(/\.\s*(granada|motril|monachil|almuñécar|loja)$/i, '').trim();
        }
      }

      const $parent = $link.parent();
      const img = $parent.find('img').first();
      const imgSrc = img.attr('data-src') ?? img.attr('src') ?? '';
      const imageUrl =
        imgSrc && !imgSrc.includes('nofoto')
          ? imgSrc.startsWith('http')
            ? imgSrc
            : `${BASE_URL}${imgSrc}`
          : undefined;

      if (!dateStr) return;

      events.push({
        title,
        date: dateStr,
        time: 'Por confirmar',
        venue,
        genre: '',
        price: '',
        url: cleanHref.startsWith('http') ? cleanHref : `${BASE_URL}${cleanHref}`,
        imageUrl,
      });
    });
  }

  return events;
}
