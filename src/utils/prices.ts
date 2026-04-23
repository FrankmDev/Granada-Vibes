import type { Event } from '@types';

export type PriceStatus = 'free' | 'paid' | 'tickets';

/**
 * Check if an event's description indicates it's free.
 */
function isExplicitlyFree(event: Event): boolean {
  const text = (
    event.description?.es ??
    event.description?.en ??
    event.longDescription?.es ??
    event.longDescription?.en ??
    ''
  ).toLowerCase();
  return /\b(gratis|entrada libre|entrada gratuita|acceso libre|acceso gratuito|de balde|free entry)\b/.test(text);
}

/**
 * Determine the price status of an event.
 *
 * - 'paid'    — exact price is known
 * - 'free'    — explicitly free (null price + source convention OR description says so)
 * - 'tickets' — everything else: paid event with unknown exact price
 */
export function getPriceStatus(event: Event): PriceStatus {
  if (event.price != null) return 'paid';
  if (event.source === 'mock') return 'free';
  if (event.source === 'turgranada') return 'free';
  if (isExplicitlyFree(event)) return 'free';
  return 'tickets';
}

/**
 * Format a price label for UI display.
 *
 * Rules:
 *  - Exact price known    → "XX€"
 *  - Free                 → "Gratis"
 *  - Paid, price unknown  → "Consultar"
 */
export function formatPriceLabel(
  event: Event,
  t: (key: string) => string
): string {
  const status = getPriceStatus(event);
  if (status === 'free') return t('events.free');
  if (status === 'paid') return `${event.price}€`;
  return t('detail.unknown');
}
