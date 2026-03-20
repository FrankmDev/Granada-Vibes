/**
 * Scraper: Agenda del Ayuntamiento de Granada
 * Municipal events — Lotus Notes / Domino legacy system.
 * Covers community centers, municipal theaters, neighborhood events.
 * URL: granada.org/inet/wagenda.nsf/fechasdistrito.htm
 */
import { fetchHTML } from '../utils/scraper-helpers.js';
import { parseSpanishDate, parseSpanishTime } from '../utils/date-parser.js';

export interface AyuntamientoEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  url: string;
  description: string;
  imageUrl?: string;
}

const BASE_URL = 'https://www.granada.org';
const LISTING_URL = `${BASE_URL}/inet/wagenda.nsf/fechasdistrito.htm`;

export async function fetchAyuntamientoEvents(): Promise<AyuntamientoEvent[]> {
  // This is a Lotus Notes system, very legacy. Try multiple URL patterns.
  const urls = [
    LISTING_URL,
    `${BASE_URL}/inet/wagenda.nsf/byfecha?openview`,
    `${BASE_URL}/inet/wagenda.nsf`,
  ];

  for (const url of urls) {
    try {
      const events = await scrapeFromUrl(url);
      if (events.length > 0) return events;
    } catch {
      continue;
    }
  }

  return [];
}

async function scrapeFromUrl(url: string): Promise<AyuntamientoEvent[]> {
  const $ = await fetchHTML(url, { timeout: 20_000 });
  const events: AyuntamientoEvent[] = [];
  const seen = new Set<string>();

  // Lotus Notes sites typically use tables for layout
  // Try to find event entries in table rows or list items

  // Strategy 1: Look for links that might be event detail pages
  $('a[href*="wagenda"]').each((_, el) => {
    const $link = $(el);
    const href = $link.attr('href') ?? '';
    const title = $link.text().trim();

    if (!title || title.length < 5 || seen.has(title)) return;
    seen.add(title);

    // Look for date in surrounding context
    const $row = $link.closest('tr, div, li');
    const rowText = $row.text();

    const date = parseSpanishDate(rowText) ?? '';
    const time = parseSpanishTime(rowText);

    // Try to extract venue
    const cells = $row.find('td');
    let venue = '';
    cells.each((_, cell) => {
      const cellText = $(cell).text().trim();
      if (
        cellText !== title &&
        !cellText.match(/^\d/) &&
        cellText.length > 3 &&
        cellText.length < 100
      ) {
        if (!venue) venue = cellText;
      }
    });

    const fullUrl = href.startsWith('http')
      ? href
      : `${BASE_URL}${href.startsWith('/') ? '' : '/'}${href}`;

    // Extract description from surrounding text
    const descText = $row.find('p, .description, td:last-child').first().text().trim();
    const description = descText && descText !== title && descText.length > 5
      ? descText.slice(0, 300)
      : '';

    // Extract image from row
    const imgSrc = $row.find('img').first().attr('src') ?? '';
    const imageUrl = imgSrc && !imgSrc.startsWith('data:')
      ? imgSrc.startsWith('http') ? imgSrc : `${BASE_URL}${imgSrc.startsWith('/') ? '' : '/'}${imgSrc}`
      : undefined;

    events.push({
      title,
      date,
      time,
      venue: venue || 'Granada',
      url: fullUrl,
      description,
      imageUrl,
    });
  });

  // Strategy 2: If no links found, try to parse table rows directly
  if (events.length === 0) {
    $('tr').each((_, row) => {
      const $row = $(row);
      const cells = $row.find('td');
      if (cells.length < 2) return;

      const texts = cells.map((_, c) => $(c).text().trim()).get();
      const fullText = texts.join(' ');

      // Try to identify which cell has the title (usually the longest text)
      const title = texts.reduce((a, b) => (a.length > b.length ? a : b), '');
      if (!title || title.length < 5 || seen.has(title)) return;
      seen.add(title);

      const date = parseSpanishDate(fullText) ?? '';
      if (!date) return;

      events.push({
        title,
        date,
        time: parseSpanishTime(fullText),
        venue: 'Granada',
        url: LISTING_URL,
        description: '',
      });
    });
  }

  return events.filter((e) => e.date.length === 10);
}
