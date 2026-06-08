import type { Event, LocalizedText } from '@types';

const MIN_DESCRIPTION_WORDS = 18;
const MIN_LONG_DESCRIPTION_WORDS = 40;
const MIN_TIPS_WORDS = 16;

function wordCount(value: string | undefined): number {
  return (value ?? '').trim().split(/\s+/).filter(Boolean).length;
}

function localizedWordCount(value: LocalizedText | undefined): number {
  if (!value) return 0;
  return Math.max(wordCount(value.es), wordCount(value.en));
}

function hasRepeatedShortCopy(value: LocalizedText | undefined): boolean {
  if (!value) return false;

  return [value.es, value.en].some((copy) => {
    const normalized = copy.replace(/\s+/g, ' ').trim().toLowerCase();
    if (normalized.length < 40) return false;

    const midpoint = Math.floor(normalized.length / 2);
    const left = normalized.slice(0, midpoint).trim();
    const right = normalized.slice(midpoint).trim();
    return left.length > 20 && left === right;
  });
}

function hasEditorialDepth(event: Event): boolean {
  if (localizedWordCount(event.description) >= MIN_DESCRIPTION_WORDS && !hasRepeatedShortCopy(event.description)) {
    return true;
  }

  if (localizedWordCount(event.longDescription) >= MIN_LONG_DESCRIPTION_WORDS) {
    return true;
  }

  if (localizedWordCount(event.tips) >= MIN_TIPS_WORDS) {
    return true;
  }

  return Math.max(event.highlights?.es.length ?? 0, event.highlights?.en.length ?? 0) >= 2;
}

export function shouldIndexEventDetail(event: Event, fromDate: Date = new Date()): boolean {
  if (event.seoIndex === 'never') return false;
  if (event.seoIndex === 'always') return true;

  const today = fromDate.toISOString().split('T')[0];
  if (!today || (event.endDate ?? event.date) < today) return false;

  return hasEditorialDepth(event);
}
