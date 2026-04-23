import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchTicketmasterEvents, type TicketmasterEvent } from './sources/ticketmaster.js';
import { fetchEventbriteEvents, type EventbriteEvent } from './sources/eventbrite.js';
import { fetchConciertosGranadaEvents } from './sources/conciertos-granada.js';
import { fetchYuzinEvents } from './sources/yuzin.js';
import { fetchGranadaEsCulturaEvents } from './sources/granada-es-cultura.js';

import { fetchPalacioEvents } from './sources/palacio-congresos.js';
import { fetchTurgranadaEvents } from './sources/turgranada.js';
import { fetchAyuntamientoEvents } from './sources/ayuntamiento.js';
import { fetchElegirHoyEvents } from './sources/elegirhoy.js';
import {
  transformConciertosGranada,
  transformYuzin,
  transformGranadaEsCultura,

  transformPalacio,
  transformTurgranada,
  transformAyuntamiento,
  transformElegirHoy,
} from './utils/transform-scraped.js';
import { detectNeighborhood } from './utils/venue-neighborhood.js';
import {
  type GeneratedEvent,
  type EventCategory,
  slugify,
} from './utils/shared-types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GENERATED_PATH = resolve(__dirname, '../src/data/events/generated.json');

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

  // Prefer 16:9 ratio images at highest resolution
  const preferred = event.images.filter((img) => img.ratio === '16_9');
  const pool = preferred.length > 0 ? preferred : event.images;

  return pool.reduce((best, img) =>
    img.width > best.width ? img : best
  ).url;
}

function getBestTmDescription(event: TicketmasterEvent): string {
  // Ticketmaster has several description fields — take the first with content
  const candidates = [event.description, event.info, event.pleaseNote];
  for (const text of candidates) {
    if (text && text.trim().length > 0) {
      return text.trim().slice(0, 500);
    }
  }
  return '';
}

function transformTicketmaster(raw: TicketmasterEvent): GeneratedEvent {
  const venue = raw._embedded?.venues?.[0]?.name ?? 'Granada';
  const price = raw.priceRanges?.[0]?.min ?? null;
  const time = raw.dates.start.localTime
    ? raw.dates.start.localTime.slice(0, 5)
    : 'Por confirmar';
  const imageUrl = getBestTmImage(raw);
  const description = getBestTmDescription(raw);

  return {
    id: `tm-${raw.id}`,
    slug: slugify(raw.name),
    title: { es: raw.name, en: raw.name },
    description: { es: description, en: description },
    category: mapTmCategory(raw),
    date: raw.dates.start.localDate,
    time,
    venue,
    neighborhood: detectNeighborhood(venue),
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

  // Extract price: null means free, number means paid
  let price: number | null = null;
  if (raw.is_free) {
    price = null; // free
  } else if (raw.ticket_price) {
    price = raw.ticket_price.min;
  }

  return {
    id: `eb-${raw.id}`,
    slug: slugify(raw.name),
    title: { es: raw.name, en: raw.name },
    description: { es: raw.summary ?? '', en: raw.summary ?? '' },
    category: mapEbCategory(raw),
    date: raw.start_date,
    time: raw.start_time ? raw.start_time.slice(0, 5) : 'Por confirmar',
    venue,
    neighborhood: detectNeighborhood(venue),
    price,
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

// ─── Validation ───

interface ValidationStats {
  total: number;
  noTitle: number;
  noVenue: number;
  badDate: number;
  pastDate: number;
  cancelled: number;
  noImage: number;
  passed: number;
}

function isValidEvent(event: GeneratedEvent, stats: ValidationStats): boolean {
  stats.total++;

  if (!event.title.es) { stats.noTitle++; return false; }
  if (!event.venue) { stats.noVenue++; return false; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date)) { stats.badDate++; return false; }
  if (Number.isNaN(new Date(event.date).getTime())) { stats.badDate++; return false; }

  // Filter past events at ingestion time
  const today = new Date().toISOString().split('T')[0] as string;
  if (event.date < today) { stats.pastDate++; return false; }

  // Filter cancelled events
  if (/^cancelad[oa]\b/i.test(event.title.es)) { stats.cancelled++; return false; }

  // Track missing images but DON'T filter them out
  if (!event.imageUrl) { stats.noImage++; }

  stats.passed++;
  return true;
}

/** Log validation stats for a source */
function logValidationStats(sourceName: string, stats: ValidationStats): void {
  if (stats.total === 0) return;

  const rejected = stats.total - stats.passed;
  if (rejected > 0) {
    const reasons: string[] = [];
    if (stats.noTitle > 0) reasons.push(`${stats.noTitle} sin título`);
    if (stats.noVenue > 0) reasons.push(`${stats.noVenue} sin venue`);
    if (stats.badDate > 0) reasons.push(`${stats.badDate} fecha inválida`);
    if (stats.pastDate > 0) reasons.push(`${stats.pastDate} pasados`);
    if (stats.cancelled > 0) reasons.push(`${stats.cancelled} cancelados`);
    console.log(`  ↳ ${sourceName}: ${rejected} descartados (${reasons.join(', ')})`);
  }
  if (stats.noImage > 0) {
    console.log(`  ↳ ${sourceName}: ${stats.noImage} sin imagen (aceptados igualmente)`);
  }
}

// ─── Shared logic ───

/** Normalize title for content-based deduplication */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
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

  // Step 1: Key by source+sourceId to avoid cross-source collisions
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

  // Step 2: Content-based deduplication (same normalized title + same date)
  // Keeps the first occurrence (which has the best data from source priority)
  const contentDeduped = new Map<string, GeneratedEvent>();
  for (const event of merged.values()) {
    const contentKey = `${normalizeTitle(event.title.es)}::${event.date}`;
    if (!contentDeduped.has(contentKey)) {
      contentDeduped.set(contentKey, event);
    }
  }

  const deduped = Array.from(contentDeduped.values());
  const beforeCount = merged.size;
  if (deduped.length < beforeCount) {
    console.log(`✓ Deduplicación por contenido: ${beforeCount - deduped.length} duplicados eliminados`);
  }

  const sorted = deduped.sort((a, b) => a.date.localeCompare(b.date));

  return ensureUniqueSlugs(sorted);
}

// ─── Source fetchers ───

interface SourceResult {
  name: string;
  events: GeneratedEvent[];
  rawCount: number;
}

async function fetchFromTicketmaster(): Promise<SourceResult> {
  if (!process.env.TICKETMASTER_API_KEY) {
    console.warn('⚠ TICKETMASTER_API_KEY not set — skipping Ticketmaster');
    return { name: 'Ticketmaster', events: [], rawCount: 0 };
  }

  const raw = await fetchTicketmasterEvents();
  const stats: ValidationStats = { total: 0, noTitle: 0, noVenue: 0, badDate: 0, pastDate: 0, cancelled: 0, noImage: 0, passed: 0 };
  const transformed = raw.map(transformTicketmaster).filter(e => isValidEvent(e, stats));
  logValidationStats('Ticketmaster', stats);
  return { name: 'Ticketmaster', events: transformed, rawCount: raw.length };
}

async function fetchFromEventbrite(): Promise<SourceResult> {
  if (!process.env.EVENTBRITE_API_KEY) {
    console.warn('⚠ EVENTBRITE_API_KEY not set — skipping Eventbrite');
    return { name: 'Eventbrite', events: [], rawCount: 0 };
  }

  const raw = await fetchEventbriteEvents();
  const stats: ValidationStats = { total: 0, noTitle: 0, noVenue: 0, badDate: 0, pastDate: 0, cancelled: 0, noImage: 0, passed: 0 };
  const transformed = raw.map(transformEventbrite).filter(e => isValidEvent(e, stats));
  logValidationStats('Eventbrite', stats);
  return { name: 'Eventbrite', events: transformed, rawCount: raw.length };
}

// ─── Scraper fetchers ───

async function fetchFromConciertosGranada(): Promise<SourceResult> {
  const raw = await fetchConciertosGranadaEvents();
  const stats: ValidationStats = { total: 0, noTitle: 0, noVenue: 0, badDate: 0, pastDate: 0, cancelled: 0, noImage: 0, passed: 0 };
  const transformed = raw.map(transformConciertosGranada).filter(e => isValidEvent(e, stats));
  logValidationStats('ConciertosenGranada', stats);
  return { name: 'ConciertosenGranada', events: transformed, rawCount: raw.length };
}

async function fetchFromYuzin(): Promise<SourceResult> {
  const raw = await fetchYuzinEvents();
  const stats: ValidationStats = { total: 0, noTitle: 0, noVenue: 0, badDate: 0, pastDate: 0, cancelled: 0, noImage: 0, passed: 0 };
  const transformed = raw.map(transformYuzin).filter(e => isValidEvent(e, stats));
  logValidationStats('Yuzin', stats);
  return { name: 'Yuzin', events: transformed, rawCount: raw.length };
}

async function fetchFromGranadaEsCultura(): Promise<SourceResult> {
  const raw = await fetchGranadaEsCulturaEvents();
  const stats: ValidationStats = { total: 0, noTitle: 0, noVenue: 0, badDate: 0, pastDate: 0, cancelled: 0, noImage: 0, passed: 0 };
  const transformed = raw.map(transformGranadaEsCultura).filter(e => isValidEvent(e, stats));
  logValidationStats('GranadaEsCultura', stats);
  return { name: 'GranadaEsCultura', events: transformed, rawCount: raw.length };
}

async function fetchFromPalacio(): Promise<SourceResult> {
  const raw = await fetchPalacioEvents();
  const stats: ValidationStats = { total: 0, noTitle: 0, noVenue: 0, badDate: 0, pastDate: 0, cancelled: 0, noImage: 0, passed: 0 };
  const transformed = raw.map(transformPalacio).filter(e => isValidEvent(e, stats));
  logValidationStats('PalacioCongresos', stats);
  return { name: 'PalacioCongresos', events: transformed, rawCount: raw.length };
}

async function fetchFromTurgranada(): Promise<SourceResult> {
  const raw = await fetchTurgranadaEvents();
  const stats: ValidationStats = { total: 0, noTitle: 0, noVenue: 0, badDate: 0, pastDate: 0, cancelled: 0, noImage: 0, passed: 0 };
  const transformed = raw.map(transformTurgranada).filter(e => isValidEvent(e, stats));
  logValidationStats('Turgranada', stats);
  return { name: 'Turgranada', events: transformed, rawCount: raw.length };
}

async function fetchFromAyuntamiento(): Promise<SourceResult> {
  const raw = await fetchAyuntamientoEvents();
  const stats: ValidationStats = { total: 0, noTitle: 0, noVenue: 0, badDate: 0, pastDate: 0, cancelled: 0, noImage: 0, passed: 0 };
  const transformed = raw.map(transformAyuntamiento).filter(e => isValidEvent(e, stats));
  logValidationStats('Ayuntamiento', stats);
  return { name: 'Ayuntamiento', events: transformed, rawCount: raw.length };
}

async function fetchFromElegirHoy(): Promise<SourceResult> {
  const raw = await fetchElegirHoyEvents();
  const stats: ValidationStats = { total: 0, noTitle: 0, noVenue: 0, badDate: 0, pastDate: 0, cancelled: 0, noImage: 0, passed: 0 };
  const transformed = raw.map(transformElegirHoy).filter(e => isValidEvent(e, stats));
  logValidationStats('ElegirHoy', stats);
  return { name: 'ElegirHoy', events: transformed, rawCount: raw.length };
}

// ─── Main ───

async function main(): Promise<void> {
  console.log('🔄 Fetching events from all sources...\n');

  const results: SourceResult[] = [];
  const errors: { name: string; error: string }[] = [];

  // Fetch from all sources in parallel
  const fetchers: Array<{ name: string; fn: () => Promise<SourceResult> }> = [
    { name: 'Ticketmaster', fn: fetchFromTicketmaster },
    { name: 'Eventbrite', fn: fetchFromEventbrite },
    { name: 'ConciertosenGranada', fn: fetchFromConciertosGranada },
    { name: 'Yuzin', fn: fetchFromYuzin },
    { name: 'GranadaEsCultura', fn: fetchFromGranadaEsCultura },
    { name: 'PalacioCongresos', fn: fetchFromPalacio },
    { name: 'Turgranada', fn: fetchFromTurgranada },
    { name: 'Ayuntamiento', fn: fetchFromAyuntamiento },
    { name: 'ElegirHoy', fn: fetchFromElegirHoy },
  ];

  const settled = await Promise.allSettled(
    fetchers.map(f => f.fn())
  );

  for (let i = 0; i < settled.length; i++) {
    const result = settled[i]!;
    const fetcher = fetchers[i]!;
    if (result.status === 'fulfilled') {
      results.push(result.value);
    } else {
      const errorMsg = result.reason instanceof Error
        ? result.reason.message
        : String(result.reason);
      errors.push({ name: fetcher.name, error: errorMsg });
    }
  }

  // Log results per source
  console.log('\n📊 Resultados por fuente:');
  for (const { name, events, rawCount } of results) {
    const icon = events.length > 0 ? '✓' : '○';
    const rawInfo = rawCount !== events.length ? ` (${rawCount} raw → ${events.length} válidos)` : '';
    console.log(`${icon} ${name}: ${events.length} eventos${rawInfo}`);
  }

  // Log errors
  if (errors.length > 0) {
    console.log('\n⚠ Errores:');
    for (const { name, error } of errors) {
      console.error(`  ✗ ${name}: ${error}`);
    }
  }

  if (results.length === 0 && errors.length > 0) {
    console.error('\n✗ All sources failed');
    process.exit(1);
  }

  // Combine all incoming events
  const allIncoming = results.flatMap((r) => r.events);

  // If no events from any source, keep existing data
  if (allIncoming.length === 0) {
    console.warn('\n⚠ No events returned from any source — keeping existing data');
    process.exit(0);
  }

  // Merge with existing
  const existing = loadExistingEvents();
  const final = deduplicateAndMerge(existing, allIncoming);

  console.log(`\n✓ Después de deduplicar: ${final.length} eventos en total`);

  // Coverage summary
  const withImage = final.filter((e) => e.imageUrl).length;
  const withDescription = final.filter((e) => e.description.es.length > 0).length;
  const withPrice = final.filter((e) => e.price !== null).length;
  const withTime = final.filter((e) => e.time !== 'Por confirmar').length;
  const withVenue = final.filter((e) => e.venue !== 'Granada' && e.venue !== '').length;

  console.log(`\n📈 Cobertura de datos:`);
  console.log(`  📸 Con imagen:      ${withImage}/${final.length} (${Math.round((withImage / final.length) * 100)}%)`);
  console.log(`  📝 Con descripción: ${withDescription}/${final.length} (${Math.round((withDescription / final.length) * 100)}%)`);
  console.log(`  💰 Con precio:      ${withPrice}/${final.length} (${Math.round((withPrice / final.length) * 100)}%)`);
  console.log(`  🕐 Con hora:        ${withTime}/${final.length} (${Math.round((withTime / final.length) * 100)}%)`);
  console.log(`  📍 Con venue:       ${withVenue}/${final.length} (${Math.round((withVenue / final.length) * 100)}%)`);

  // Write
  writeFileSync(GENERATED_PATH, JSON.stringify(final, null, 2) + '\n', 'utf-8');
  console.log(`\n✓ Escritos en src/data/events/generated.json`);
}

main();
