/**
 * Scraper: IndyRock Granada
 * Independent music, alternative festivals.
 * Simple HTML page with h3/h4 headings and p tags, separated by "* * *" dividers.
 */
import { fetchHTML } from '../utils/scraper-helpers.js';
import { parseSpanishDate, parseSpanishTime } from '../utils/date-parser.js';

export interface IndyRockEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  url: string;
  description: string;
}

const PAGE_URL = 'https://indyrock.es/granada.htm';

export async function fetchIndyRockEvents(): Promise<IndyRockEvent[]> {
  const $ = await fetchHTML(PAGE_URL);
  const events: IndyRockEvent[] = [];

  // Content is in h3/h4 headings followed by p tags, separated by hr or "* * *"
  // Strategy: iterate through headings and collect following paragraphs
  const headings = $('h3, h4').toArray();

  for (const heading of headings) {
    const $heading = $(heading);
    const title = $heading.text().replace(/\*+/g, '').trim();

    if (!title || title.length < 3 || title === '* * *') continue;

    // Collect all sibling paragraphs until next heading or separator
    const paragraphs: string[] = [];
    let $next = $heading.next();

    while ($next.length && !$next.is('h3, h4, hr')) {
      const text = $next.text().trim();
      if (text && text !== '* * *') {
        paragraphs.push(text);
      }
      $next = $next.next();
    }

    const fullText = paragraphs.join(' ');

    // Extract date from paragraphs
    const dateMatch = fullText.match(
      /(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)(?:\s+(?:de\s+)?(\d{4}))?/i
    );
    const dateStr = dateMatch ? dateMatch[0] : '';
    const date = parseSpanishDate(dateStr) ?? '';

    // Extract time
    const time = parseSpanishTime(fullText);

    // Extract venue — look for known venue patterns or "en el/la..."
    const venueMatch = fullText.match(
      /(?:en\s+(?:el|la|los|las)\s+)?((?:Sala|Teatro|Parque|Palacio|Auditorio|Club|Bar|Pub|Espacio|Centro)\s+[\w\s]+?)(?:\.|,|$)/i
    );
    let venue = venueMatch ? venueMatch[1]!.trim() : '';

    // Also check for specific venues mentioned directly
    if (!venue) {
      const knownVenues = [
        'Planta Baja', 'Sala Riff', 'Lemon Rock', 'El Tren',
        'Industrial Copera', 'Teatro CajaGranada', 'Aliatar',
      ];
      for (const v of knownVenues) {
        if (fullText.toLowerCase().includes(v.toLowerCase())) {
          venue = v;
          break;
        }
      }
    }

    if (!venue) venue = 'Granada';

    // Extract URL from any link in the paragraphs
    let url = '';
    $heading.nextUntil('h3, h4, hr').find('a').each((_, a) => {
      const href = $(a).attr('href') ?? '';
      if (href.startsWith('http') && !url) {
        url = href;
      }
    });

    // Also check the heading itself for links
    const headingLink = $heading.find('a').attr('href');
    if (headingLink?.startsWith('http')) {
      url = headingLink;
    }

    if (!url) url = PAGE_URL;

    events.push({
      title,
      date,
      time,
      venue,
      url,
      description: fullText.slice(0, 300).trim(),
    });
  }

  // Filter out entries without a valid date
  return events.filter((e) => e.date.length === 10);
}
