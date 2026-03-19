/**
 * Scraper: GranadaEsCultura
 * Curated cultural agenda. Uses The Events Calendar WordPress plugin.
 * Covers exhibitions, workshops, niche events.
 */
import { fetchHTML, fetchText } from '../utils/scraper-helpers.js';
import { parseSpanishDate, parseSpanishTime } from '../utils/date-parser.js';

export interface GranadaEsCulturaEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  url: string;
  description: string;
  imageUrl?: string;
}

const BASE_URL = 'https://granadaescultura.com';
const AGENDA_URL = `${BASE_URL}/agenda/`;

export async function fetchGranadaEsCulturaEvents(): Promise<GranadaEsCulturaEvent[]> {
  // Try The Events Calendar REST API first
  const apiEvents = await tryTECApi();
  if (apiEvents.length > 0) return apiEvents;

  // Fallback: HTML scraping
  return scrapeHTMLListing();
}

async function tryTECApi(): Promise<GranadaEsCulturaEvent[]> {
  const url = `${BASE_URL}/wp-json/tribe/events/v1/events?per_page=50&start_date=now&status=publish`;

  try {
    const text = await fetchText(url, { timeout: 10_000, retries: 1 });
    const data = JSON.parse(text) as Record<string, unknown>;

    if (data.events && Array.isArray(data.events)) {
      return (data.events as Record<string, unknown>[]).map((e) => {
        const venue = e.venue as Record<string, unknown> | undefined;
        const image = e.image as Record<string, unknown> | undefined;
        const startDate = String(e.start_date ?? '').slice(0, 10);
        const startTime = String(e.start_date ?? '').slice(11, 16);

        return {
          title: String(e.title ?? ''),
          date: startDate,
          time: startTime || 'Por confirmar',
          venue: String(venue?.venue ?? 'Granada'),
          url: String(e.url ?? ''),
          description: String(e.description ?? '')
            .replace(/<[^>]*>/g, '')
            .slice(0, 300)
            .trim(),
          imageUrl: (image?.url as string) || undefined,
        };
      });
    }
  } catch {
    // API not available
  }

  return [];
}

async function scrapeHTMLListing(): Promise<GranadaEsCulturaEvent[]> {
  try {
    const $ = await fetchHTML(AGENDA_URL);
    const events: GranadaEsCulturaEvent[] = [];

    // TEC list view selectors
    const selectors = [
      '.tribe-events-calendar-list__event-row',
      '.tribe-common-g-row',
      '.type-tribe_events',
      'article',
    ];

    for (const selector of selectors) {
      $(selector).each((_, el) => {
        const $el = $(el);
        const title =
          $el.find('h3 a, h2 a, .tribe-events-calendar-list__event-title a').first().text().trim() ||
          $el.find('h3, h2').first().text().trim();
        const link =
          $el.find('h3 a, h2 a').first().attr('href') ?? '';
        const dateText =
          $el.find('time').first().attr('datetime') ??
          $el.find('time, .tribe-event-schedule-details').first().text().trim();
        const venue =
          $el.find('.tribe-events-calendar-list__event-venue, .tribe-venue').first().text().trim();
        const img =
          $el.find('img').first().attr('data-lazy-src') ??
          $el.find('img').first().attr('data-src') ??
          $el.find('img').first().attr('src');

        if (!title || title.length < 3) return;

        const parsedDate = dateText?.includes('T')
          ? dateText.slice(0, 10)
          : parseSpanishDate(dateText ?? '');

        events.push({
          title,
          date: parsedDate ?? '',
          time: parseSpanishTime(dateText ?? ''),
          venue: venue || 'Granada',
          url: link.startsWith('http') ? link : `${BASE_URL}${link}`,
          description: '',
          imageUrl: img && !img.startsWith('data:') ? img : undefined,
        });
      });

      if (events.length > 0) break;
    }

    return events;
  } catch {
    return [];
  }
}
