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
import {
  type GeneratedEvent,
  slugify,
  hashId,
  parsePrice,
} from './shared-types.js';

// Re-export GeneratedEvent for consumers that import from here
export type { GeneratedEvent };

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
    lastSyncedAt: new Date().toISOString(),
  };
}

export function transformYuzin(raw: YuzinEvent): GeneratedEvent {
  return {
    id: `yz-${hashId(raw.url)}`,
    slug: slugify(raw.title),
    title: { es: raw.title, en: raw.title },
    description: { es: raw.description, en: raw.description },
    category: raw.category
      ? detectCategory(raw.category + ' ' + raw.title)
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
    lastSyncedAt: new Date().toISOString(),
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
    lastSyncedAt: new Date().toISOString(),
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
    lastSyncedAt: new Date().toISOString(),
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
    price: parsePrice(raw.price ?? ''),
    currency: 'EUR',
    tags: [],
    featured: false,
    source: 'palacio-congresos',
    sourceId: hashId(raw.url + raw.title),
    sourceUrl: raw.url,
    ...(raw.imageUrl ? { imageUrl: raw.imageUrl } : {}),
    lastSyncedAt: new Date().toISOString(),
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
    lastSyncedAt: new Date().toISOString(),
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
    lastSyncedAt: new Date().toISOString(),
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
    lastSyncedAt: new Date().toISOString(),
  };
}
