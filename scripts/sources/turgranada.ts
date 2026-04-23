/**
 * Scraper: Turismo Granada (Patronato Provincial)
 * Official tourism board agenda. Next.js SSR site.
 * Strategy: parse SSR HTML with Cheerio, then fallback to __NEXT_DATA__ and APIs.
 */
import * as cheerio from 'cheerio';
import { fetchText } from '../utils/scraper-helpers.js';
import { parseSpanishDate } from '../utils/date-parser.js';

export interface TurgranadaEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  url: string;
  description: string;
  imageUrl?: string;
}

const BASE_URL = 'https://www.turgranada.es';

export async function fetchTurgranadaEvents(): Promise<TurgranadaEvent[]> {
  // This is a Next.js site. Try to find the data in:
  // 1. Visible HTML cards (most reliable since SSR renders them)
  // 2. __NEXT_DATA__ script tag
  // 3. API route

  try {
    const html = await fetchText(`${BASE_URL}/agenda/`, { timeout: 15_000 });

    // 1. Scrape visible HTML cards with Cheerio
    const scraped = scrapeFromHTML(html);
    if (scraped.length > 0) return scraped;

    // 2. Look for __NEXT_DATA__ JSON
    const nextDataMatch = html.match(
      /<script\s+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
    );

    if (nextDataMatch?.[1]) {
      const nextData = JSON.parse(nextDataMatch[1]) as Record<string, unknown>;
      return extractFromNextData(nextData);
    }

    // 3. Look for inline RSC payload or JSON data
    const jsonMatches = html.matchAll(
      /\{"events?":\s*\[([\s\S]*?)\]\s*[,}]/g
    );
    for (const match of jsonMatches) {
      try {
        const arr = JSON.parse(`[${match[1]}]`) as Record<string, unknown>[];
        if (arr.length > 0) {
          return arr.map(parseGenericEvent).filter((e) => e.date.length === 10);
        }
      } catch {
        continue;
      }
    }
  } catch {
    // Page fetch failed
  }

  // 4. Try common API patterns
  const apiPaths = [
    '/api/eventos',
    '/api/events',
    '/api/agenda',
    '/_next/data/agenda.json',
  ];

  for (const path of apiPaths) {
    try {
      const text = await fetchText(`${BASE_URL}${path}`, {
        timeout: 10_000,
        retries: 0,
      });
      const data = JSON.parse(text) as unknown;
      if (Array.isArray(data)) {
        return (data as Record<string, unknown>[])
          .map(parseGenericEvent)
          .filter((e) => e.date.length === 10);
      }
    } catch {
      continue;
    }
  }

  return [];
}

function scrapeFromHTML(html: string): TurgranadaEvent[] {
  try {
    const $ = cheerio.load(html);
    const events: TurgranadaEvent[] = [];
    const seen = new Set<string>();

    // ── Strategy 1: Find event card anchors via Cheerio ──
    // Look for links to /es/eventos/ pages
    $('a[href*="/es/eventos/"]').each((_, el) => {
      const $link = $(el);
      const href = $link.attr('href') ?? '';
      if (!href.includes('/es/eventos/')) return;

      // Extract title: look for text in spans or the link text itself
      const titleSpan = $link.find('span').filter((_, span) => {
        const text = $(span).text().trim();
        return text.length > 3 && text.length < 200;
      });

      let title = '';
      if (titleSpan.length) {
        // Get the span with the longest text (likely the title)
        let maxLen = 0;
        titleSpan.each((_, span) => {
          const text = $(span).text().trim();
          if (text.length > maxLen && !text.match(/^\d/) && text.length < 200) {
            title = text;
            maxLen = text.length;
          }
        });
      }
      if (!title) {
        title = $link.text().replace(/\s+/g, ' ').trim().slice(0, 150);
      }
      if (!title || title.length < 3 || seen.has(title)) return;
      seen.add(title);

      // Extract date from spans with font-semibold or date-like text
      let dateText = '';
      $link.find('span').each((_, span) => {
        const text = $(span).text().trim();
        // Look for date patterns: "13 jun. 2025", "24 abr. 2026"
        if (/\d{1,2}\s+\w{3,4}\.?\s+\d{4}/i.test(text) || /\d{1,2}\s+de\s+\w+/i.test(text)) {
          dateText = text;
          return false;
        }
      });

      // Parse date: "13 jun. 2025 a 15 jun. 2026" -> take first date
      const firstDatePart = dateText.split(/\s+a\s+/i)[0] ?? dateText;
      // Clean up abbreviated months with dots: "jun." -> "jun"
      const cleanedDate = firstDatePart.replace(/(\w{3})\./g, '$1');
      const date = parseSpanishDate(cleanedDate) ?? '';

      // Extract venue from spans (look for location-like text)
      let venue = 'Granada';
      $link.find('span').each((_, span) => {
        const text = $(span).text().trim();
        // Look for venue names (not the title, not the date)
        if (text !== title && !text.match(/^\d/) && text.length > 3 && text.length < 100) {
          if (text.includes('Granada') || text.includes('Sala') || text.includes('Teatro') ||
              text.includes('Palacio') || text.includes('Centro') || text.includes('Museo') ||
              text.includes('Auditorio') || text.includes('Parque')) {
            venue = text;
            return false;
          }
        }
      });

      // Extract time from text
      let time = 'Por confirmar';
      const timeMatch = $link.text().match(/(\d{1,2})[:.h](\d{2})/);
      if (timeMatch) {
        time = `${timeMatch[1]!.padStart(2, '0')}:${timeMatch[2]}`;
      }

      // Extract image
      let imageUrl: string | undefined;
      const img = $link.find('img').first();
      const imgSrc = img.attr('src') ?? img.attr('data-src') ?? '';
      if (imgSrc && imgSrc.startsWith('http')) {
        imageUrl = imgSrc;
      }

      // Extract description
      let description = '';
      $link.find('p, span').each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 30 && text !== title && text.length < 500) {
          description = text.slice(0, 300);
          return false;
        }
      });

      if (date.length === 10) {
        events.push({
          title,
          date,
          time,
          venue,
          url: href.startsWith('http') ? href : `${BASE_URL}${href}`,
          description,
          imageUrl,
        });
      }
    });

    // ── Strategy 2: Broader card-based approach ──
    if (events.length === 0) {
      // Try to find any card-like structures
      const cardSelectors = [
        '[class*="card"]',
        '[class*="event"]',
        'article',
        '[class*="item"]',
      ];

      for (const selector of cardSelectors) {
        $(selector).each((_, el) => {
          const $card = $(el);
          const link = $card.find('a[href*="/es/eventos/"]').first();
          if (!link.length) return;

          const href = link.attr('href') ?? '';
          const title = link.text().replace(/\s+/g, ' ').trim().slice(0, 150);
          if (!title || title.length < 3 || seen.has(title)) return;
          seen.add(title);

          const cardText = $card.text();
          const dateMatch = cardText.match(/(\d{1,2})\s+(?:de\s+)?(\w+?)\.?\s+(\d{4})/i);
          const date = dateMatch ? parseSpanishDate(`${dateMatch[1]} ${dateMatch[2]} ${dateMatch[3]}`) ?? '' : '';

          const imgSrc = $card.find('img').first().attr('src') ?? '';
          const imageUrl = imgSrc && imgSrc.startsWith('http') ? imgSrc : undefined;

          if (date.length === 10) {
            events.push({
              title,
              date,
              time: 'Por confirmar',
              venue: 'Granada',
              url: href.startsWith('http') ? href : `${BASE_URL}${href}`,
              description: '',
              imageUrl,
            });
          }
        });

        if (events.length > 0) break;
      }
    }

    return events;
  } catch {
    return [];
  }
}

function extractFromNextData(data: Record<string, unknown>): TurgranadaEvent[] {
  // Navigate the Next.js data structure to find events
  const props = data.props as Record<string, unknown> | undefined;
  const pageProps = props?.pageProps as Record<string, unknown> | undefined;

  if (!pageProps) return [];

  // Look for any array that looks like events
  for (const [, value] of Object.entries(pageProps)) {
    if (Array.isArray(value) && value.length > 0) {
      const first = value[0] as Record<string, unknown>;
      // Check if it looks like an event
      if (first.title || first.name || first.nombre) {
        return (value as Record<string, unknown>[])
          .map(parseGenericEvent)
          .filter((e) => e.date.length === 10);
      }
    }
  }

  return [];
}

function parseGenericEvent(e: Record<string, unknown>): TurgranadaEvent {
  const title = String(e.title ?? e.name ?? e.nombre ?? '');
  const date = String(
    e.date ?? e.fecha ?? e.startDate ?? e.start_date ?? ''
  ).slice(0, 10);
  const time = String(
    e.time ?? e.hora ?? e.startTime ?? e.start_time ?? ''
  ).slice(0, 5) || 'Por confirmar';
  const venue = String(e.venue ?? e.lugar ?? e.location ?? 'Granada');
  const url = String(e.url ?? e.link ?? e.slug ?? '');
  const desc = String(e.description ?? e.descripcion ?? '').slice(0, 300);
  const img = String(e.image ?? e.imagen ?? e.imageUrl ?? '');

  return {
    title,
    date,
    time,
    venue,
    url: url.startsWith('http') ? url : url ? `${BASE_URL}${url}` : `${BASE_URL}/agenda/`,
    description: desc,
    imageUrl: img || undefined,
  };
}
