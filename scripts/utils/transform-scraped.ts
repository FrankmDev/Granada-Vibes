/**
 * Transform functions for scraped events → GeneratedEvent format.
 * Keeps fetch-events.ts lean by centralizing all scraper transforms here.
 */
import type { ConciertosGranadaEvent } from '../sources/conciertos-granada.js';
import type { YuzinEvent } from '../sources/yuzin.js';
import type { GranadaEsCulturaEvent } from '../sources/granada-es-cultura.js';
import type { IndyRockEvent } from '../sources/indyrock.js';
import type { PalacioEvent } from '../sources/palacio-congresos.js';
import type { TurgranadaEvent } from '../sources/turgranada.js';
import type { AyuntamientoEvent } from '../sources/ayuntamiento.js';
import type { ElegirHoyEvent } from '../sources/elegirhoy.js';
import { detectCategory } from './category-detector.js';
import { detectNeighborhood } from './venue-neighborhood.js';

// Mirror of GeneratedEvent from fetch-events.ts
type EventSource =
  | 'ticketmaster' | 'eventbrite'
  | 'yuzin' | 'conciertos-granada' | 'granada-es-cultura' | 'indyrock'
  | 'ayuntamiento' | 'turgranada' | 'palacio-congresos' | 'elegirhoy'
  | 'manual' | 'mock';

type EventCategory =
  | 'concert' | 'exhibition' | 'festival' | 'market'
  | 'theater' | 'workshop' | 'guided-tour' | 'cinema' | 'other';

type Neighborhood =
  | 'albaicin' | 'sacromonte' | 'centro' | 'realejo'
  | 'alhambra' | 'cartuja' | 'zaidin' | 'otro';

export interface GeneratedEvent {
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function hashId(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function parsePrice(text: string): number | null {
  if (!text) return null;
  if (/gratis|libre|free/i.test(text)) return null;
  const match = text.match(/(\d+(?:[.,]\d+)?)/);
  if (match) return parseFloat(match[1]!.replace(',', '.'));
  return null;
}

const now = new Date().toISOString();

export function transformConciertosGranada(raw: ConciertosGranadaEvent): GeneratedEvent {
  // Clean title: strip whitespace pollution from scraping
  const cleanTitle = raw.title.replace(/\s+/g, ' ').trim();
  const desc = raw.description ?? '';
  return {
    id: `cg-${hashId(raw.url)}`,
    slug: slugify(cleanTitle),
    title: { es: cleanTitle, en: cleanTitle },
    description: { es: desc, en: desc },
    category: 'concert',
    date: raw.date,
    time: raw.time,
    venue: raw.venue,
    neighborhood: detectNeighborhood(raw.venue),
    price: parsePrice(raw.price),
    currency: 'EUR',
    tags: raw.genre ? [raw.genre] : [],
    featured: false,
    source: 'conciertos-granada',
    sourceId: hashId(raw.url),
    sourceUrl: raw.url,
    ...(raw.imageUrl ? { imageUrl: raw.imageUrl } : {}),
    lastSyncedAt: now,
  };
}

export function transformYuzin(raw: YuzinEvent): GeneratedEvent {
  return {
    id: `yz-${hashId(raw.url)}`,
    slug: slugify(raw.title),
    title: { es: raw.title, en: raw.title },
    description: { es: raw.description, en: raw.description },
    category: raw.category
      ? (detectCategory(raw.category + ' ' + raw.title) as EventCategory)
      : detectCategory(raw.title + ' ' + raw.description),
    date: raw.date,
    time: raw.time,
    venue: raw.venue,
    neighborhood: detectNeighborhood(raw.venue),
    price: null,
    currency: 'EUR',
    tags: [],
    featured: false,
    source: 'yuzin',
    sourceId: hashId(raw.url),
    sourceUrl: raw.url,
    ...(raw.imageUrl ? { imageUrl: raw.imageUrl } : {}),
    lastSyncedAt: now,
  };
}

export function transformGranadaEsCultura(raw: GranadaEsCulturaEvent): GeneratedEvent {
  return {
    id: `gec-${hashId(raw.url)}`,
    slug: slugify(raw.title),
    title: { es: raw.title, en: raw.title },
    description: { es: raw.description, en: raw.description },
    category: detectCategory(raw.title + ' ' + raw.description),
    date: raw.date,
    time: raw.time,
    venue: raw.venue,
    neighborhood: detectNeighborhood(raw.venue),
    price: null,
    currency: 'EUR',
    tags: [],
    featured: false,
    source: 'granada-es-cultura',
    sourceId: hashId(raw.url),
    sourceUrl: raw.url,
    ...(raw.imageUrl ? { imageUrl: raw.imageUrl } : {}),
    lastSyncedAt: now,
  };
}

export function transformIndyRock(raw: IndyRockEvent): GeneratedEvent {
  return {
    id: `ir-${hashId(raw.url + raw.title)}`,
    slug: slugify(raw.title),
    title: { es: raw.title, en: raw.title },
    description: { es: raw.description, en: raw.description },
    category: 'concert',
    date: raw.date,
    time: raw.time,
    venue: raw.venue,
    neighborhood: detectNeighborhood(raw.venue),
    price: null,
    currency: 'EUR',
    tags: [],
    featured: false,
    source: 'indyrock',
    sourceId: hashId(raw.url + raw.title),
    sourceUrl: raw.url,
    ...(raw.imageUrl ? { imageUrl: raw.imageUrl } : {}),
    lastSyncedAt: now,
  };
}

export function transformPalacio(raw: PalacioEvent): GeneratedEvent {
  const cleanTitle = raw.title.replace(/\s+/g, ' ').trim();
  const desc = raw.description ?? '';
  return {
    id: `pc-${hashId(raw.url + raw.title)}`,
    slug: slugify(cleanTitle),
    title: { es: cleanTitle, en: cleanTitle },
    description: { es: desc, en: desc },
    category: detectCategory(raw.title),
    date: raw.date,
    time: raw.time,
    venue: 'Palacio de Congresos de Granada',
    neighborhood: 'zaidin',
    price: null,
    currency: 'EUR',
    tags: [],
    featured: false,
    source: 'palacio-congresos',
    sourceId: hashId(raw.url + raw.title),
    sourceUrl: raw.url,
    ...(raw.imageUrl ? { imageUrl: raw.imageUrl } : {}),
    lastSyncedAt: now,
  };
}

export function transformTurgranada(raw: TurgranadaEvent): GeneratedEvent {
  return {
    id: `tg-${hashId(raw.url + raw.title)}`,
    slug: slugify(raw.title),
    title: { es: raw.title, en: raw.title },
    description: { es: raw.description, en: raw.description },
    category: detectCategory(raw.title + ' ' + raw.description),
    date: raw.date,
    time: raw.time,
    venue: raw.venue,
    neighborhood: detectNeighborhood(raw.venue),
    price: null,
    currency: 'EUR',
    tags: [],
    featured: false,
    source: 'turgranada',
    sourceId: hashId(raw.url + raw.title),
    sourceUrl: raw.url,
    ...(raw.imageUrl ? { imageUrl: raw.imageUrl } : {}),
    lastSyncedAt: now,
  };
}

export function transformAyuntamiento(raw: AyuntamientoEvent): GeneratedEvent {
  return {
    id: `ay-${hashId(raw.url + raw.title)}`,
    slug: slugify(raw.title),
    title: { es: raw.title, en: raw.title },
    description: { es: raw.description, en: raw.description },
    category: detectCategory(raw.title + ' ' + raw.description),
    date: raw.date,
    time: raw.time,
    venue: raw.venue,
    neighborhood: detectNeighborhood(raw.venue),
    price: null,
    currency: 'EUR',
    tags: [],
    featured: false,
    source: 'ayuntamiento',
    sourceId: hashId(raw.url + raw.title),
    sourceUrl: raw.url,
    ...(raw.imageUrl ? { imageUrl: raw.imageUrl } : {}),
    lastSyncedAt: now,
  };
}

export function transformElegirHoy(raw: ElegirHoyEvent): GeneratedEvent {
  return {
    id: `eh-${hashId(raw.url + raw.title)}`,
    slug: slugify(raw.title),
    title: { es: raw.title, en: raw.title },
    description: { es: raw.description, en: raw.description },
    category: detectCategory(raw.title + ' ' + raw.description),
    date: raw.date,
    time: raw.time,
    venue: raw.venue,
    neighborhood: detectNeighborhood(raw.venue),
    price: null,
    currency: 'EUR',
    tags: [],
    featured: false,
    source: 'elegirhoy',
    sourceId: hashId(raw.url + raw.title),
    sourceUrl: raw.url,
    ...(raw.imageUrl ? { imageUrl: raw.imageUrl } : {}),
    lastSyncedAt: now,
  };
}
