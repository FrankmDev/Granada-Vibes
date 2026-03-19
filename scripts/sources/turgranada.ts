/**
 * Scraper: Turismo Granada (Patronato Provincial)
 * Official tourism board agenda. Next.js SSR site — content loads via JS.
 * Strategy: look for embedded JSON state or API endpoints.
 */
import { fetchText } from '../utils/scraper-helpers.js';

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
  // 1. __NEXT_DATA__ script tag
  // 2. API route
  // 3. RSC payload

  // Try fetching the page and extracting __NEXT_DATA__
  try {
    const html = await fetchText(`${BASE_URL}/agenda/`, { timeout: 15_000 });

    // Look for __NEXT_DATA__ JSON
    const nextDataMatch = html.match(
      /<script\s+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
    );

    if (nextDataMatch?.[1]) {
      const nextData = JSON.parse(nextDataMatch[1]) as Record<string, unknown>;
      return extractFromNextData(nextData);
    }

    // Look for inline RSC payload or JSON data
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

  // Try common API patterns
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
