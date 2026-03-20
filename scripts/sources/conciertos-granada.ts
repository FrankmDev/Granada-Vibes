/**
 * Scraper: ConciertosenGranada.es
 * 100% live music. Small venues like Planta Baja, Sala Riff, Lemon Rock.
 * Structure: <a href="/conciertos/..."> contains title, venue, and short date
 * separated by whitespace/newlines.
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

  $('a[href^="/conciertos/"]').each((_, el) => {
    const $link = $(el);
    const href = $link.attr('href') ?? '';
    if (href === '/conciertos/' || href === '/conciertos') return;
    // Skip genre/category filter links (e.g. /conciertos/genero/pop)
    if (/\/conciertos\/(genero|tipo|lugar|fecha|locales)\//i.test(href)) return;

    // Strip query params like ?link=banner for dedup
    const cleanHref = href.split('?')[0]!;
    // Normalize: strip trailing timestamp segments (/1773946800)
    const normalizedHref = cleanHref.replace(/\/\d{10,}$/, '');
    if (seen.has(normalizedHref)) return;
    seen.add(normalizedHref);

    // The link text contains: "Title \n\n Venue \n ShortDate"
    const rawText = $link.text();
    const lines = rawText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    if (lines.length === 0) return;

    // First non-empty line is the title
    const title = lines[0]!;
    if (title.length < 2) return;

    // Try to find venue and date from remaining lines
    let venue = 'Granada';
    let dateStr = '';

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]!;
      const parsed = parseShortDate(line);
      if (parsed) {
        dateStr = parsed;
      } else if (line.length > 2 && !dateStr) {
        // Lines before the date line are venue info
        venue = line.replace(/\.\s*(granada|motril|monachil|almuñécar|loja)$/i, '').trim();
      }
    }

    // Extract image from parent
    const $parent = $link.parent();
    const img = $parent.find('img').first();
    const imgSrc = img.attr('src') ?? '';
    const imageUrl =
      imgSrc && !imgSrc.includes('nofoto')
        ? imgSrc.startsWith('http')
          ? imgSrc
          : `${BASE_URL}${imgSrc}`
        : undefined;

    // Extract description from parent text (extra info beyond title/venue/date)
    const $descEl = $parent.find('p, .description, .info, .resumen').first();
    const description = $descEl.length
      ? $descEl.text().trim().slice(0, 300)
      : undefined;

    // Extract genre/price from parent text
    const parentText = $parent.text();
    const genreMatch = parentText.match(
      /\b(Rock|Metal|Pop|Jazz|Swing|Indie|Electr[oó]nica|Folk|Flamenco|Hip[- ]?[Hh]op|Reggae|Blues|Soul|Funk|Punk|Ska|Rap|Trap|Techno|House|Rumba|Latin|Cl[aá]sica|World|Mestizaje|Fusión|Singer[\s-]?Songwriter)\b/i
    );
    const genre = genreMatch ? genreMatch[1]! : '';

    const priceMatch = parentText.match(/(\d+[,.]?\d*)\s*€|entrada\s+libre|gratis/i);
    const price = priceMatch ? priceMatch[0].trim() : '';

    if (!dateStr) {
      // No date found, skip event
      return;
    }

    events.push({
      title,
      date: dateStr,
      time: 'Por confirmar',
      venue,
      genre,
      price,
      url: cleanHref.startsWith('http') ? cleanHref : `${BASE_URL}${cleanHref}`,
      imageUrl,
      description,
    });
  });

  return events;
}
