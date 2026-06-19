// Shared event indexability rules — plain .mjs module usable from both
// app TypeScript (src/utils/event-indexing.ts) and sitemap config
// (src/config/sitemap.mjs). No TS path aliases, no .ts dependency.

const MADRID_DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Madrid',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * Return the current date in Granada (Europe/Madrid) as YYYY-MM-DD.
 * Replaces ad-hoc `new Date().toISOString().split('T')[0]` throughout.
 */
export function getMadridToday() {
  return MADRID_DATE_FORMATTER.format(new Date());
}

export const MIN_DESCRIPTION_WORDS = 18;
export const MIN_LONG_DESCRIPTION_WORDS = 60; // raised from 40 per approved plan
export const MIN_TIPS_WORDS = 16;

function wordCount(value) {
  return String(value ?? '').trim().split(/\s+/).filter(Boolean).length;
}

function localizedWordCount(value) {
  if (!value || typeof value !== 'object') return 0;
  return Math.max(wordCount(value.es), wordCount(value.en));
}

/**
 * Normalize text: lowercase, strip diacritics, keep only word chars.
 */
function normalizedTokens(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9áéíóúñü\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => t.length > 2); // skip filler tokens
}

/**
 * Lightweight deterministic near-duplicate detection using token containment.
 * Returns true if `smaller` token set is > 75% contained in `larger` set.
 * Zero dependencies.
 */
export function isNearDuplicateOf(text, reference) {
  if (!text || !reference) return false;

  const textTokens = new Set(normalizedTokens(text));
  const refTokens = new Set(normalizedTokens(reference));
  const smaller = textTokens.size <= refTokens.size ? textTokens : refTokens;
  const larger = textTokens.size <= refTokens.size ? refTokens : textTokens;

  if (smaller.size < 3 || larger.size < 3) return false;

  let intersection = 0;
  for (const token of smaller) {
    if (larger.has(token)) intersection++;
  }

  return intersection / smaller.size > 0.75;
}

/**
 * Check if a localized text field contains repeated/near-duplicate content.
 * Catches both exact midpoint duplicates and near-duplicate token overlap.
 */
export function hasRepeatedCopy(value) {
  if (!value || typeof value !== 'object') return false;

  return [value.es, value.en].some((copy) => {
    const normalized = String(copy ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (normalized.length < 40) return false;

    const midpoint = Math.floor(normalized.length / 2);
    const left = normalized.slice(0, midpoint).trim();
    const right = normalized.slice(midpoint).trim();
    if (left.length > 20 && left === right) return true;

    // Near-duplicate token containment check across both halves
    if (left.length > 20 && right.length > 20) {
      return isNearDuplicateOf(left, right);
    }

    return false;
  });
}

/**
 * Editorial depth check: does the event have enough unique copy to justify indexing?
 */
export function hasEditorialDepth(event) {
  if (localizedWordCount(event.description) >= MIN_DESCRIPTION_WORDS && !hasRepeatedCopy(event.description)) {
    return true;
  }

  if (localizedWordCount(event.longDescription) >= MIN_LONG_DESCRIPTION_WORDS) {
    return true;
  }

  if (localizedWordCount(event.tips) >= MIN_TIPS_WORDS) {
    return true;
  }

  return Math.max(event.highlights?.es?.length ?? 0, event.highlights?.en?.length ?? 0) >= 2;
}

/**
 * Main indexability gate for events.
 * @param {object} event - Event object with date/endDate/seoIndex/editorial fields
 * @param {string} today - Current date as YYYY-MM-DD (use getMadridToday())
 * @returns {boolean}
 */
export function shouldIndexEvent(event, today) {
  if (event.seoIndex === 'never') return false;
  if (event.seoIndex === 'always') return true;

  const eventEndDate = typeof event.endDate === 'string' ? event.endDate : event.date;
  if (typeof eventEndDate !== 'string' || eventEndDate < today) return false;

  return hasEditorialDepth(event);
}
