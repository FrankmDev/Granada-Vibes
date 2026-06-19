import type { Event, LocalizedText } from '@types';
import {
  hasEditorialDepth as hasEditorialDepthMjs,
  hasRepeatedCopy,
  isNearDuplicateOf,
  shouldIndexEvent as shouldIndexEventMjs,
  MIN_DESCRIPTION_WORDS,
  MIN_LONG_DESCRIPTION_WORDS,
  MIN_TIPS_WORDS,
} from '../config/event-indexing.mjs';

export {
  MIN_DESCRIPTION_WORDS,
  MIN_LONG_DESCRIPTION_WORDS,
  MIN_TIPS_WORDS,
  hasRepeatedCopy,
  isNearDuplicateOf,
};

/**
 * Typed wrapper — delegates to the shared .mjs implementation.
 */
export function hasEditorialDepth(event: Event): boolean {
  return hasEditorialDepthMjs(event);
}

// Re-export the MJS today helper with a TS-compatible wrapper
function madridTodayFromDate(date: Date): string {
  // Format the given date in Europe/Madrid timezone for consistent comparison
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}

/**
 * Determine if an event's detail page should be indexable by search engines.
 *
 * Wraps the shared .mjs logic with a typed TS signature.
 * Uses Europe/Madrid timezone for date comparison — aligned with sitemap.
 *
 * @param event - The event to evaluate
 * @param fromDate - Reference date (defaults to now). Converted to Madrid-today internally.
 */
export function shouldIndexEventDetail(event: Event, fromDate: Date = new Date()): boolean {
  const today = madridTodayFromDate(fromDate);
  return shouldIndexEventMjs(event, today);
}

/**
 * Word count helper (re-exported for convenience).
 */
export function wordCount(value: string | undefined): number {
  return (value ?? '').trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Localized word count: returns the larger of es/en word counts.
 */
export function localizedWordCount(value: LocalizedText | undefined): number {
  if (!value) return 0;
  return Math.max(wordCount(value.es), wordCount(value.en));
}
