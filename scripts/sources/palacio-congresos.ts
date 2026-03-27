/**
 * Scraper: Palacio de Congresos de Granada
 * Each event is in a div.card.card-profile with two col-lg-6 columns:
 *   - col 1: img[src="/assets/img/curved-images/agenda/{ID}.png"]
 *   - col 2: card-body with h5 (title), h6.text-info (date), h4 (time), p (desc), a[href*="idEvento"]
 */
import { fetchHTML } from '../utils/scraper-helpers.js';
import { parseSpanishDate, parseSpanishTime } from '../utils/date-parser.js';

export interface PalacioEvent {
  title: string;
  date: string;
  time: string;
  url: string;
  imageUrl?: string;
  description?: string;
}

const BASE_URL = 'https://www.pcgr.org';
const LISTING_URL = `${BASE_URL}/?seccion=eventosCulturales`;

export async function fetchPalacioEvents(): Promise<PalacioEvent[]> {
  const $ = await fetchHTML(LISTING_URL);
  const events: PalacioEvent[] = [];
  const seen = new Set<string>();

  // Each event card: div.card.card-profile (or div.card.hoverCard)
  // Structure: .card > .row > .col-lg-6 (img) + .col-lg-6 (.card-body h5 h6 h4)
  $('div.card').each((_, cardEl) => {
    const $card = $(cardEl);

    // Title from h5 within card
    const title = $card.find('h5').first().text().replace(/\s+/g, ' ').trim();
    if (!title || title.length < 2 || seen.has(title)) return;
    seen.add(title);

    // Skip cancelled events
    if (/cancelad/i.test($card.find('h5').first().html() ?? '')) return;

    // Date from h6.text-info
    const dateText = $card.find('h6').first().text().trim();
    // Handle multi-date: "20 y 21 Marzo 2026" — take first
    const cleanDate = dateText.replace(/\s+y\s+\d+/g, '');
    const date = parseSpanishDate(cleanDate) ?? parseSpanishDate(dateText) ?? '';
    if (!date) return;

    // Time from h4
    const timeText = $card.find('h4').first().text().trim() || $card.text();
    const time = parseSpanishTime(timeText);

    // Image: find the agenda image (curved-images/agenda path)
    let imageUrl: string | undefined;
    $card.find('img').each((_, imgEl) => {
      const src = $(imgEl).attr('src') ?? '';
      if (src.includes('curved-images/agenda')) {
        imageUrl = src.startsWith('http')
          ? src
          : `${BASE_URL}/${src.replace(/^\.\//, '')}`;
        return false; // stop iteration
      }
    });

    // Event detail URL from link with idEvento
    let fullUrl = LISTING_URL;
    $card.find('a[href*="idEvento"]').each((_, aEl) => {
      const href = $(aEl).attr('href') ?? '';
      if (href) {
        fullUrl = href.startsWith('http')
          ? href
          : `${BASE_URL}/${href.replace(/^\.\//, '')}`;
        return false;
      }
    });

    // Description from paragraph
    const descText = $card.find('p').first().text().trim();
    const description = descText && descText.length > 5 ? descText.slice(0, 300) : undefined;

    events.push({ title, date, time, url: fullUrl, imageUrl, description });
  });

  // Fallback: h5-based scan if card approach found nothing
  if (events.length === 0) {
    $('h5').each((_, el) => {
      const $h5 = $(el);
      const title = $h5.text().replace(/\s+/g, ' ').trim();
      if (!title || title.length < 2 || seen.has(title)) return;
      seen.add(title);

      const $section = $h5.closest('div[class*="col"]').parent().parent();
      const dateText = $section.find('h6').first().text().trim();
      const date = parseSpanishDate(dateText.replace(/\s+y\s+\d+/g, '')) ?? '';
      if (!date) return;

      const time = parseSpanishTime($section.find('h4').first().text().trim() || $section.text());

      let imageUrl: string | undefined;
      const imgSrc = $section.find('img[src*="agenda"]').first().attr('src');
      if (imgSrc) {
        imageUrl = imgSrc.startsWith('http') ? imgSrc : `${BASE_URL}/${imgSrc.replace(/^\.\//, '')}`;
      }

      let fullUrl = LISTING_URL;
      const href = $section.find('a[href*="idEvento"]').first().attr('href') ?? '';
      if (href) fullUrl = href.startsWith('http') ? href : `${BASE_URL}/${href.replace(/^\.\//, '')}`;

      const descText = $section.find('p').first().text().trim();
      const description = descText && descText.length > 5 ? descText.slice(0, 300) : undefined;

      events.push({ title, date, time, url: fullUrl, imageUrl, description });
    });
  }

  return events.filter((e) => e.date.length === 10);
}
