/**
 * Shared types and helpers for the event fetch pipeline.
 * Single source of truth — no duplications across files.
 */

// ─── Event Source ───

export type EventSource =
  | 'ticketmaster' | 'eventbrite'
  | 'yuzin' | 'conciertos-granada' | 'granada-es-cultura' | 'indyrock'
  | 'ayuntamiento' | 'turgranada' | 'palacio-congresos' | 'elegirhoy'
  | 'manual' | 'mock';

// ─── Event Category ───

export type EventCategory =
  | 'concert'
  | 'exhibition'
  | 'festival'
  | 'market'
  | 'theater'
  | 'workshop'
  | 'guided-tour'
  | 'cinema'
  | 'other';

// ─── Neighborhood ───

export type Neighborhood =
  | 'albaicin'
  | 'sacromonte'
  | 'centro'
  | 'realejo'
  | 'alhambra'
  | 'cartuja'
  | 'zaidin'
  | 'otro';

// ─── Generated Event ───

export interface GeneratedEvent {
  id: string;
  slug: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  category: EventCategory;
  date: string;
  endDate?: string;
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
  ticketsUrl?: string;
  imageUrl?: string;
  remoteImageUrl?: string;
  lastSyncedAt: string;
}

// ─── Helpers ───

export function slugify(text: string): string {
  const raw = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
  return raw.length > 80 ? raw.slice(0, 80).replace(/-+$/, '') : raw;
}

export function hashId(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Parse a price string like "13€", "45,10€", "Gratis", "Entrada libre" into a number or null.
 * Returns null for free events and undefined-ish values.
 * Requires euro/currency context — does NOT match bare standalone numbers.
 */
export function parsePrice(text: string): number | null {
  if (!text) return null;
  if (/gratis|entrada libre|entrada gratuita|acceso libre|acceso gratuito|de balde|free\s*entry/i.test(text)) return null;

  // Require explicit currency context: €, EUR, euro(s), or "precio"
  const currencyPatterns = [
    /(\d+(?:[.,]\d+)?)\s*€/,
    /(\d+(?:[.,]\d+)?)\s*euros?\b/i,
    /(\d+(?:[.,]\d+)?)\s*eur\b/i,
  ];

  for (const pattern of currencyPatterns) {
    const match = text.match(pattern);
    if (match) {
      return parseFloat(match[1]!.replace(',', '.'));
    }
  }

  // Also catch "desde 20" or "precio 20" contexts without explicit currency symbol
  const priceContextPattern = /(?:precio|price|coste|costo|desde|a\s+partir\s+de)\s*[:]?\s*(\d+(?:[.,]\d+)?)/i;
  const ctxMatch = text.match(priceContextPattern);
  if (ctxMatch) {
    return parseFloat(ctxMatch[1]!.replace(',', '.'));
  }

  return null;
}
