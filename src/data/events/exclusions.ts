interface EventExclusionCandidate {
  slug?: string;
  title?: {
    es?: string;
    en?: string;
  };
  source?: string;
  sourceId?: string;
}

const excludedSlugs = new Set([
  'escape-room-al-aire-libre-en-granada',
]);

const excludedSourceIds = new Set([
  'eventbrite:1978344132556',
]);

const excludedNormalizedTitles = new Set([
  'escaperoomalairelibreengranada',
]);

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export function isExcludedEvent(event: EventExclusionCandidate): boolean {
  if (event.slug && excludedSlugs.has(event.slug)) return true;

  if (event.source && event.sourceId && excludedSourceIds.has(`${event.source}:${event.sourceId}`)) {
    return true;
  }

  const titles = [event.title?.es, event.title?.en].filter(
    (title): title is string => typeof title === 'string' && title.length > 0
  );

  return titles.some((title) => excludedNormalizedTitles.has(normalizeTitle(title)));
}
