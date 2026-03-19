import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchTicketmasterEvents, type TicketmasterEvent } from './sources/ticketmaster.js';
import { fetchEventbriteEvents, type EventbriteEvent } from './sources/eventbrite.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GENERATED_PATH = resolve(__dirname, '../src/data/events/generated.json');

// ─── Types (mirrored from src/types — no alias available in scripts) ───

type EventSource = 'ticketmaster' | 'eventbrite' | 'manual' | 'mock';

type EventCategory =
  | 'concert'
  | 'exhibition'
  | 'festival'
  | 'market'
  | 'theater'
  | 'workshop'
  | 'guided-tour'
  | 'cinema'
  | 'other';

type Neighborhood =
  | 'albaicin'
  | 'sacromonte'
  | 'centro'
  | 'realejo'
  | 'alhambra'
  | 'cartuja'
  | 'zaidin'
  | 'otro';

interface GeneratedEvent {
  id: string;
  slug: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  neighborhood: Neighborhood;
  price: number | null;
  currency: 'EUR';
  tags: string[];
  featured: boolean;
  source: EventSource;
  sourceId: string;
  sourceUrl: string;
  imageUrl?: string;
  lastSyncedAt: string;
}

// ─── Helpers ───

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

// ─── Ticketmaster transform ───

function mapTmCategory(event: TicketmasterEvent): EventCategory {
  const segment = event.classifications?.[0]?.segment?.name;
  if (!segment) return 'other';

  switch (segment) {
    case 'Music':
      return 'concert';
    case 'Arts & Theatre':
      return 'theater';
    case 'Film':
      return 'cinema';
    default:
      return 'other';
  }
}

function getBestTmImage(event: TicketmasterEvent): string | undefined {
  if (!event.images?.length) return undefined;
  return event.images.reduce((best, img) =>
    img.width > best.width ? img : best
  ).url;
}

function transformTicketmaster(raw: TicketmasterEvent): GeneratedEvent {
  const venue = raw._embedded?.venues?.[0]?.name ?? 'Granada';
  const price = raw.priceRanges?.[0]?.min ?? null;
  const time = raw.dates.start.localTime
    ? raw.dates.start.localTime.slice(0, 5)
    : 'Por confirmar';
  const imageUrl = getBestTmImage(raw);

  return {
    id: `tm-${raw.id}`,
    slug: slugify(raw.name),
    title: { es: raw.name, en: raw.name },
    description: { es: '', en: '' },
    category: mapTmCategory(raw),
    date: raw.dates.start.localDate,
    time,
    venue,
    neighborhood: 'centro',
    price,
    currency: 'EUR',
    tags: [],
    featured: false,
    source: 'ticketmaster',
    sourceId: raw.id,
    sourceUrl: raw.url,
    ...(imageUrl ? { imageUrl } : {}),
    lastSyncedAt: new Date().toISOString(),
  };
}

// ─── Eventbrite transform ───

// Guess category from Eventbrite tags/name
function mapEbCategory(event: EventbriteEvent): EventCategory {
  const name = event.name.toLowerCase();
  const tagNames = (event.tags ?? []).map((t) => t.display_name.toLowerCase());
  const all = [name, ...tagNames].join(' ');

  if (/\b(concert|concierto|live music|música en vivo|gig)\b/.test(all)) return 'concert';
  if (/\b(teatro|theater|theatre|comedia|drama)\b/.test(all)) return 'theater';
  if (/\b(cine|cinema|film|película|screening)\b/.test(all)) return 'cinema';
  if (/\b(festival)\b/.test(all)) return 'festival';
  if (/\b(exposición|exhibition|galería|gallery|arte|art)\b/.test(all)) return 'exhibition';
  if (/\b(mercado|mercadillo|market|feria)\b/.test(all)) return 'market';
  if (/\b(taller|workshop|clase|class|curso)\b/.test(all)) return 'workshop';
  if (/\b(visita|tour|guided|guiada|recorrido)\b/.test(all)) return 'guided-tour';
  return 'other';
}

function transformEventbrite(raw: EventbriteEvent): GeneratedEvent {
  const venue = raw.primary_venue?.name ?? 'Granada';
  const imageUrl = raw.image?.url;

  return {
    id: `eb-${raw.id}`,
    slug: slugify(raw.name),
    title: { es: raw.name, en: raw.name },
    description: { es: raw.summary ?? '', en: raw.summary ?? '' },
    category: mapEbCategory(raw),
    date: raw.start_date,
    time: raw.start_time ? raw.start_time.slice(0, 5) : 'Por confirmar',
    venue,
    neighborhood: 'centro',
    price: null,
    currency: 'EUR',
    tags: (raw.tags ?? [])
      .filter((t) => t.prefix === 'EventbriteCategory')
      .map((t) => t.display_name),
    featured: false,
    source: 'eventbrite',
    sourceId: raw.id,
    sourceUrl: raw.url,
    ...(imageUrl ? { imageUrl } : {}),
    lastSyncedAt: new Date().toISOString(),
  };
}

// ─── Shared logic ───

function isValidEvent(event: GeneratedEvent): boolean {
  if (!event.title.es) return false;
  if (!event.venue) return false;
  if (Number.isNaN(new Date(event.date).getTime())) return false;
  return true;
}

function loadExistingEvents(): GeneratedEvent[] {
  try {
    const raw = readFileSync(GENERATED_PATH, 'utf-8');
    return JSON.parse(raw) as GeneratedEvent[];
  } catch {
    return [];
  }
}

function ensureUniqueSlugs(events: GeneratedEvent[]): GeneratedEvent[] {
  const slugCount = new Map<string, number>();
  return events.map((event) => {
    const count = slugCount.get(event.slug) ?? 0;
    slugCount.set(event.slug, count + 1);
    if (count === 0) return event;
    return { ...event, slug: `${event.slug}-${count + 1}` };
  });
}

function deduplicateAndMerge(
  existing: GeneratedEvent[],
  incoming: GeneratedEvent[]
): GeneratedEvent[] {
  const today = new Date().toISOString().split('T')[0] as string;

  // Key by source+sourceId to avoid cross-source collisions
  const key = (e: GeneratedEvent): string => `${e.source}:${e.sourceId}`;
  const incomingByKey = new Map(incoming.map((e) => [key(e), e]));
  const merged = new Map<string, GeneratedEvent>();

  for (const event of existing) {
    if (event.date < today) continue;
    if (incomingByKey.has(key(event))) continue;
    merged.set(key(event), event);
  }

  for (const event of incoming) {
    merged.set(key(event), event);
  }

  const sorted = Array.from(merged.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return ensureUniqueSlugs(sorted);
}

// ─── Source fetchers ───

interface SourceResult {
  name: string;
  events: GeneratedEvent[];
}

async function fetchFromTicketmaster(): Promise<SourceResult> {
  if (!process.env.TICKETMASTER_API_KEY) {
    console.warn('⚠ TICKETMASTER_API_KEY not set — skipping Ticketmaster');
    return { name: 'Ticketmaster', events: [] };
  }

  const raw = await fetchTicketmasterEvents();
  const transformed = raw.map(transformTicketmaster).filter(isValidEvent);
  return { name: 'Ticketmaster', events: transformed };
}

async function fetchFromEventbrite(): Promise<SourceResult> {
  if (!process.env.EVENTBRITE_API_KEY) {
    console.warn('⚠ EVENTBRITE_API_KEY not set — skipping Eventbrite');
    return { name: 'Eventbrite', events: [] };
  }

  const raw = await fetchEventbriteEvents();
  const transformed = raw.map(transformEventbrite).filter(isValidEvent);
  return { name: 'Eventbrite', events: transformed };
}

// ─── Main ───

async function main(): Promise<void> {
  const results: SourceResult[] = [];
  const errors: string[] = [];

  // Fetch from all sources in parallel
  const fetchers = [fetchFromTicketmaster(), fetchFromEventbrite()];
  const settled = await Promise.allSettled(fetchers);

  for (const result of settled) {
    if (result.status === 'fulfilled') {
      results.push(result.value);
    } else {
      errors.push(String(result.reason));
    }
  }

  // Log results per source
  for (const { name, events } of results) {
    console.log(`✓ ${name}: ${events.length} eventos obtenidos`);
  }

  // If all sources failed, exit with error
  if (errors.length > 0) {
    for (const err of errors) {
      console.error('✗ Error:', err);
    }
  }

  if (results.length === 0 && errors.length > 0) {
    console.error('✗ All sources failed');
    process.exit(1);
  }

  // Combine all incoming events
  const allIncoming = results.flatMap((r) => r.events);

  // If no events from any source, keep existing data
  if (allIncoming.length === 0) {
    console.warn('⚠ No events returned from any source — keeping existing data');
    process.exit(0);
  }

  // Merge with existing
  const existing = loadExistingEvents();
  const final = deduplicateAndMerge(existing, allIncoming);

  console.log(`✓ Después de deduplicar: ${final.length} eventos en total`);

  // Write
  writeFileSync(GENERATED_PATH, JSON.stringify(final, null, 2) + '\n', 'utf-8');
  console.log(`✓ Escritos en src/data/events/generated.json`);
}

main();
