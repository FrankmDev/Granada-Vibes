/**
 * Scraper: Palacio de Congresos de Granada
 * Big shows, musicals, opera, ballet.
 * Structure: img + h5 (title) + h6 (date) + h4 (time)
 * Detail links: ?seccion=evento&idEvento=NUMBER
 */
import { fetchHTML } from '../utils/scraper-helpers.js';
import { parseSpanishDate, parseSpanishTime } from '../utils/date-parser.js';

export interface PalacioEvent {
  title: string;
  date: string;
  time: string;
  url: string;
  imageUrl?: string;
}

const BASE_URL = 'https://www.pcgr.org';
const LISTING_URL = `${BASE_URL}/?seccion=eventosCulturales`;

export async function fetchPalacioEvents(): Promise<PalacioEvent[]> {
  const $ = await fetchHTML(LISTING_URL);
  const events: PalacioEvent[] = [];
  const seen = new Set<string>();

  // The page lists events with: img, h5 (title), h6 (date), h4 (time)
  // and links with "Ver información del Evento"
  // Strategy: find all images in the agenda section and extract siblings

  // Try to find event blocks by looking for links to event detail pages
  $('a[href*="idEvento"]').each((_, el) => {
    const $link = $(el);
    const href = $link.attr('href') ?? '';

    // Get the parent container
    const $container = $link.parent();

    // Look for title, date, time in siblings or parent context
    const $section = $container.closest('div, section, td');
    const allText = $section.text();

    // Find h5 for title
    const title =
      $section.find('h5').first().text().trim() ||
      $section.find('h4').first().text().trim() ||
      $link.text().trim();

    if (!title || title === 'Ver información del Evento' || seen.has(title)) return;
    seen.add(title);

    // Find date in h6
    const dateText = $section.find('h6').first().text().trim();
    // Handle multi-date: "20 y 21 Marzo 2026" — take the first date
    const cleanDate = dateText.replace(/\s+y\s+\d+/g, '');
    const date = parseSpanishDate(cleanDate) ?? parseSpanishDate(dateText) ?? '';

    // Find time in h4 or text
    const timeText =
      $section.find('h4').first().text().trim() || allText;
    const time = parseSpanishTime(timeText);

    // Image
    const img = $section.find('img').first().attr('src');
    const imageUrl = img
      ? img.startsWith('http') ? img : `${BASE_URL}/${img.replace(/^\.\//, '')}`
      : undefined;

    // Full URL
    const fullUrl = href.startsWith('http') ? href : `${BASE_URL}/${href.replace(/^\.\//, '')}`;

    events.push({
      title,
      date,
      time,
      url: fullUrl,
      imageUrl,
    });
  });

  // If link-based approach found nothing, try a broader scan
  if (events.length === 0) {
    $('h5').each((_, el) => {
      const $h5 = $(el);
      const title = $h5.text().trim();
      if (!title || seen.has(title)) return;
      seen.add(title);

      // Look at siblings
      const dateText = $h5.siblings('h6').first().text().trim() ||
        $h5.next('h6').text().trim();
      const timeText = $h5.siblings('h4').first().text().trim() ||
        $h5.nextAll('h4').first().text().trim();

      const date = parseSpanishDate(dateText) ?? '';
      const time = parseSpanishTime(timeText);

      events.push({
        title,
        date,
        time,
        url: LISTING_URL,
      });
    });
  }

  return events.filter((e) => e.date.length === 10);
}
