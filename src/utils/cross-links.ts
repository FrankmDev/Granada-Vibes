import type { BlogPost, Event, Neighborhood, Route, RouteCategory } from '@types';
import { getAllRoutes, getAllEvents, getAllPosts } from '@data/index.js';

// ═══════════════════════════════════════════════════════════════
// CROSS-LINK ENGINE — finds related content across silos
// Scoring: tags (+2), category semantic mapping (+5),
//          neighborhood (+3), title/description keyword (+1)
// ═══════════════════════════════════════════════════════════════

type LinkItem =
  | { type: 'route'; item: Route; score: number }
  | { type: 'event'; item: Event; score: number }
  | { type: 'post'; item: BlogPost; score: number };

const categoryBridge: Record<string, string[]> = {
  // Blog category -> route categories
  guia: ['viewpoint', 'tapas', 'monuments', 'history', 'secrets'],
  cultura: ['history', 'flamenco', 'monuments'],
  gastronomia: ['tapas'],
  barrios: ['viewpoint', 'tapas', 'secrets', 'history'],
  consejos: ['viewpoint', 'tapas', 'monuments', 'history'],
  // Route category -> blog categories
  viewpoint: ['guia', 'barrios'],
  tapas: ['gastronomia', 'guia', 'consejos'],
  monuments: ['guia', 'cultura', 'barrios'],
  hiking: ['guia', 'consejos'],
  photography: ['guia', 'barrios'],
  secrets: ['barrios', 'guia', 'consejos'],
  history: ['cultura', 'guia', 'barrios'],
  flamenco: ['cultura'],
  // Event category -> route categories
  concert: ['flamenco'],
  exhibition: ['history', 'monuments', 'photography'],
  festival: ['flamenco', 'history'],
  market: ['tapas', 'secrets'],
  theater: ['history', 'monuments'],
  workshop: ['history', 'photography', 'flamenco'],
  'guided-tour': ['history', 'monuments', 'secrets'],
  cinema: ['history', 'monuments'],
  other: [],
};

function normalizedTags(item: Route | Event | BlogPost): string[] {
  return item.tags.map((t) =>
    t
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  );
}

function tagOverlap(a: string[], b: string[]): number {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x)).length;
}

function scoreAgainstSource(
  sourceTags: string[],
  sourceNeighborhoods: Neighborhood[],
  sourceCategory?: string,
  sourceText?: string
) {
  return (candidate: Route | Event | BlogPost): number => {
    let score = 0;

    // Tag overlap
    const cTags = normalizedTags(candidate);
    score += tagOverlap(sourceTags, cTags) * 2;

    // Neighborhood overlap
    const cNeighs =
      'neighborhoods' in candidate
        ? candidate.neighborhoods
        : 'neighborhood' in candidate
          ? [candidate.neighborhood]
          : [];
    const neighOverlap = cNeighs.filter((n) => sourceNeighborhoods.includes(n)).length;
    score += neighOverlap * 3;

    // Category semantic bridge
    if (sourceCategory) {
      const candidateCategory =
        'category' in candidate ? String(candidate.category) : undefined;
      if (candidateCategory) {
        const bridges = categoryBridge[sourceCategory] ?? [];
        if (bridges.includes(candidateCategory)) score += 5;
        // Reverse bridge
        const reverseBridges = categoryBridge[candidateCategory] ?? [];
        if (reverseBridges.includes(sourceCategory)) score += 5;
        // Exact match
        if (sourceCategory === candidateCategory) score += 8;
      }
    }

    // Keyword match in title + description
    if (sourceText) {
      const text = sourceText.toLowerCase();
      const candidateText = (
        ('title' in candidate ? candidate.title.es + ' ' + candidate.title.en : '') +
        ' ' +
        ('description' in candidate ? candidate.description.es + ' ' + candidate.description.en : '')
      ).toLowerCase();
      const words = text.split(/\s+/).filter((w) => w.length > 4);
      const matched = words.filter((w) => candidateText.includes(w)).length;
      score += Math.min(matched, 4);
    }

    return score;
  };
}

function sortAndLimit<T extends LinkItem>(items: T[], limit: number): T[] {
  return items.sort((a, b) => b.score - a.score).slice(0, limit);
}

// ── BlogPost cross-links ──────────────────────────────────────

export function getRelatedRoutesForBlogPost(post: BlogPost, limit = 2): Route[] {
  const sourceTags = normalizedTags(post);
  const scorer = scoreAgainstSource(sourceTags, [], post.category, post.tags.join(' '));

  const scored = getAllRoutes()
    .filter((r) => !post.tags.some((t) => t.toLowerCase().includes('sierra nevada')) || r.category !== 'hiking') // avoid false positives
    .map((item) => ({ type: 'route' as const, item, score: scorer(item) }));

  return sortAndLimit(scored, limit).map((s) => s.item);
}

export function getRelatedEventsForBlogPost(post: BlogPost, limit = 2): Event[] {
  const sourceTags = normalizedTags(post);
  const scorer = scoreAgainstSource(sourceTags, [], post.category, post.tags.join(' '));

  const scored = getAllEvents().map((item) => ({
    type: 'event' as const,
    item,
    score: scorer(item),
  }));

  return sortAndLimit(scored, limit).map((s) => s.item);
}

// ── Route cross-links ─────────────────────────────────────────

export function getRelatedPostsForRoute(route: Route, limit = 2): BlogPost[] {
  const sourceTags = normalizedTags(route);
  const scorer = scoreAgainstSource(
    sourceTags,
    route.neighborhoods,
    route.category,
    route.title.es + ' ' + route.description.es
  );

  const scored = getAllPosts().map((item) => ({
    type: 'post' as const,
    item,
    score: scorer(item),
  }));

  return sortAndLimit(scored, limit).map((s) => s.item);
}

export function getRelatedEventsForRoute(route: Route, limit = 2): Event[] {
  const sourceTags = normalizedTags(route);
  const scorer = scoreAgainstSource(
    sourceTags,
    route.neighborhoods,
    route.category,
    route.title.es + ' ' + route.description.es
  );

  const scored = getAllEvents().map((item) => ({
    type: 'event' as const,
    item,
    score: scorer(item),
  }));

  return sortAndLimit(scored, limit).map((s) => s.item);
}

// ── Event cross-links ─────────────────────────────────────────

export function getRelatedRoutesForEvent(event: Event, limit = 2): Route[] {
  const sourceTags = normalizedTags(event);
  const scorer = scoreAgainstSource(
    sourceTags,
    [event.neighborhood],
    event.category,
    event.title.es + ' ' + event.description.es
  );

  const scored = getAllRoutes().map((item) => ({
    type: 'route' as const,
    item,
    score: scorer(item),
  }));

  return sortAndLimit(scored, limit).map((s) => s.item);
}

export function getRelatedPostsForEvent(event: Event, limit = 2): BlogPost[] {
  const sourceTags = normalizedTags(event);
  const scorer = scoreAgainstSource(
    sourceTags,
    [event.neighborhood],
    event.category,
    event.title.es + ' ' + event.description.es
  );

  const scored = getAllPosts().map((item) => ({
    type: 'post' as const,
    item,
    score: scorer(item),
  }));

  return sortAndLimit(scored, limit).map((s) => s.item);
}

// ── Neighborhood link helper ──────────────────────────────────

export function getNeighborhoodLink(
  neighborhood: Neighborhood,
  locale: 'es' | 'en'
): { label: string; url: string } | null {
  if (neighborhood === 'otro') return null;

  const labels: Record<Neighborhood, { es: string; en: string }> = {
    albaicin: { es: 'Rutas por el Albaicín', en: 'Routes in Albaicín' },
    sacromonte: { es: 'Rutas por el Sacromonte', en: 'Routes in Sacromonte' },
    centro: { es: 'Rutas por el Centro', en: 'Routes in the City Center' },
    realejo: { es: 'Rutas por el Realejo', en: 'Routes in Realejo' },
    alhambra: { es: 'Rutas por la Alhambra', en: 'Routes in the Alhambra' },
    cartuja: { es: 'Rutas por la Cartuja', en: 'Routes in Cartuja' },
    zaidin: { es: 'Rutas por el Zaidín', en: 'Routes in Zaidín' },
    otro: { es: '', en: '' },
  };

  const base = locale === 'en' ? '/en/routes/' : '/rutas/';
  return {
    label: labels[neighborhood][locale],
    url: `${base}?neighborhood=${neighborhood}`,
  };
}
