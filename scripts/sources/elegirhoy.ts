/**
 * Scraper: ElegirHoy / El Giraldillo
 * Andalusia-wide cultural agenda filtered for Granada.
 * Covers Parque de las Ciencias, La Madraza, CajaGranada.
 * Note: SSL cert may be self-signed — we handle that.
 */
import { fetchHTML, fetchText } from '../utils/scraper-helpers.js';
import { parseSpanishDate, parseSpanishTime } from '../utils/date-parser.js';

export interface ElegirHoyEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  url: string;
  description: string;
  imageUrl?: string;
}

const BASE_URL = 'https://elegirhoy.com';
const GRANADA_URL = `${BASE_URL}/municipio/granada`;

export async function fetchElegirHoyEvents(): Promise<ElegirHoyEvent[]> {
  // The site may have SSL cert issues — try with and without www
  const urls = [
    GRANADA_URL,
    `https://www.elegirhoy.com/municipio/granada`,
    `http://elegirhoy.com/municipio/granada`,
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

async function scrapeFromUrl(url: string): Promise<ElegirHoyEvent[]> {
  const $ = await fetchHTML(url, { timeout: 15_000 });
  const events: ElegirHoyEvent[] = [];
  const seen = new Set<string>();

  // Try common event card selectors
  const selectors = [
    '.event-card',
    '.evento',
    '.card',
    'article',
    '.views-row',
    '.item',
    '.node--type-evento',
  ];

  for (const selector of selectors) {
    $(selector).each((_, el) => {
      const $el = $(el);
      const title =
        $el.find('h2 a, h3 a, .title a, .field--name-title a').first().text().trim() ||
        $el.find('h2, h3, .title').first().text().trim();

      if (!title || title.length < 3 || seen.has(title)) return;
      seen.add(title);

      const link =
        $el.find('h2 a, h3 a, .title a').first().attr('href') ?? '';
      const dateText =
        $el.find('.date, .fecha, time, .field--name-field-fecha').first().text().trim();
      const venue =
        $el.find('.venue, .lugar, .location, .field--name-field-lugar').first().text().trim();
      const desc =
        $el.find('.description, .summary, .body, p').first().text().trim();
      const img =
        $el.find('img').first().attr('src') ??
        $el.find('img').first().attr('data-src');

      const fullUrl = link.startsWith('http')
        ? link
        : link
          ? `${BASE_URL}${link}`
          : url;

      events.push({
        title,
        date: parseSpanishDate(dateText) ?? '',
        time: parseSpanishTime(dateText),
        venue: venue || 'Granada',
        url: fullUrl,
        description: desc.slice(0, 300),
        imageUrl: img && !img.startsWith('data:') ? img : undefined,
      });
    });

    if (events.length > 0) break;
  }

  // If structured selectors didn't work, try a looser approach
  if (events.length === 0) {
    $('a').each((_, el) => {
      const $link = $(el);
      const href = $link.attr('href') ?? '';
      // Look for links that might be event detail pages
      if (!href.includes('/evento/') && !href.includes('/actividad/')) return;

      const title = $link.text().trim();
      if (!title || title.length < 5 || seen.has(title)) return;
      seen.add(title);

      const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

      events.push({
        title,
        date: '',
        time: 'Por confirmar',
        venue: 'Granada',
        url: fullUrl,
        description: '',
      });
    });
  }

  return events.filter((e) => e.title.length > 3);
}
