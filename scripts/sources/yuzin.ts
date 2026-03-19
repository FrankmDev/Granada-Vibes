/**
 * Scraper: Yuzin Granada
 * Best local cultural agenda. WordPress + The Events Calendar plugin.
 * Covers concerts, theater, exhibitions, circus, performing arts.
 * The site renders via JS, so we try the TEC JSON API first,
 * then fall back to HTML scraping of the listing page.
 */
import * as cheerio from 'cheerio';
import { fetchHTML, fetchText } from '../utils/scraper-helpers.js';
import { parseSpanishDate, parseSpanishTime } from '../utils/date-parser.js';

export interface YuzinEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  url: string;
  description: string;
  imageUrl?: string;
}

const BASE_URL = 'https://yuzin.com';
const LISTING_URL = `${BASE_URL}/ciudad/granada/`;

export async function fetchYuzinEvents(): Promise<YuzinEvent[]> {
  // Try The Events Calendar REST API (WordPress plugin)
  const apiEvents = await tryTECApi();
  if (apiEvents.length > 0) return apiEvents;

  // Fallback: scrape HTML listing
  return scrapeHTMLListing();
}

async function tryTECApi(): Promise<YuzinEvent[]> {
  const endpoints = [
    `${BASE_URL}/wp-json/tribe/events/v1/events?per_page=50&start_date=now&status=publish`,
    `${BASE_URL}/wp-json/wp/v2/tribe_events?per_page=50&status=publish&_embed`,
  ];

  for (const url of endpoints) {
    try {
      const text = await fetchText(url, { timeout: 10_000, retries: 1 });
      const data = JSON.parse(text) as Record<string, unknown>;

      // TEC v1 format: { events: [...] }
      if (data.events && Array.isArray(data.events)) {
        return (data.events as Record<string, unknown>[]).map(parseTECEvent);
      }

      // WP REST format: direct array
      if (Array.isArray(data)) {
        return (data as Record<string, unknown>[]).map(parseWPEvent);
      }
    } catch {
      continue;
    }
  }

  return [];
}

function parseTECEvent(e: Record<string, unknown>): YuzinEvent {
  const startDate = String(e.start_date ?? '').slice(0, 10);
  const startTime = String(e.start_date ?? '').slice(11, 16);
  const venue = e.venue as Record<string, unknown> | undefined;

  return {
    title: String(e.title ?? ''),
    date: startDate,
    time: startTime || 'Por confirmar',
    venue: String(venue?.venue ?? 'Granada'),
    category: '',
    url: String(e.url ?? ''),
    description: stripHTML(String(e.description ?? '')).slice(0, 300),
    imageUrl: (e.image as Record<string, unknown>)?.url as string | undefined,
  };
}

function parseWPEvent(e: Record<string, unknown>): YuzinEvent {
  const title = e.title as Record<string, unknown> | undefined;
  const excerpt = e.excerpt as Record<string, unknown> | undefined;

  return {
    title: stripHTML(String(title?.rendered ?? '')),
    date: String(e.date ?? '').slice(0, 10),
    time: String(e.date ?? '').slice(11, 16) || 'Por confirmar',
    venue: 'Granada',
    category: '',
    url: String(e.link ?? ''),
    description: stripHTML(String(excerpt?.rendered ?? '')).slice(0, 300),
  };
}

async function scrapeHTMLListing(): Promise<YuzinEvent[]> {
  try {
    const $ = await fetchHTML(LISTING_URL);
    const events: YuzinEvent[] = [];

    // Try common TEC selectors
    const selectors = [
      '.tribe-events-calendar-list__event',
      '.tribe-common-g-row',
      '.type-tribe_events',
      'article.post',
      '.fusion-post-content',
    ];

    for (const selector of selectors) {
      $(selector).each((_, el) => {
        const $el = $(el);
        const title =
          $el.find('h2 a, h3 a, .entry-title a').first().text().trim() ||
          $el.find('h2, h3, .entry-title').first().text().trim();
        const link =
          $el.find('h2 a, h3 a, .entry-title a').first().attr('href') ?? '';
        const dateText =
          $el.find('time, .tribe-event-date-start, .entry-date').first().text().trim();
        const venue =
          $el.find('.tribe-events-venue, .tribe-venue').first().text().trim();
        const img =
          $el.find('img').first().attr('data-lazy-src') ??
          $el.find('img').first().attr('src');

        if (!title) return;

        events.push({
          title,
          date: parseSpanishDate(dateText) ?? '',
          time: parseSpanishTime(dateText),
          venue: venue || 'Granada',
          category: '',
          url: link.startsWith('http') ? link : `${BASE_URL}${link}`,
          description: '',
          imageUrl: img || undefined,
        });
      });

      if (events.length > 0) break;
    }

    return events;
  } catch {
    return [];
  }
}

function stripHTML(html: string): string {
  return cheerio
    .load(html)
    .text()
    .replace(/\s+/g, ' ')
    .trim();
}
