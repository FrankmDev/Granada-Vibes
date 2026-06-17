import type { BlogPost, Event, MixedRoute, Route } from '@types';
import {
  getPostBySlug,
  getAllRoutes,
  getRouteBySlug,
  getIndexableEvents,
  getEventBySlug,
  getIndexableVenueEntries,
  getRelatedPosts,
  getAllMixedRoutes,
} from '@data/index.js';
import type { VenueDirectoryEntry } from '@data/directories';
import { getVenueRelations } from '@data/venues/relations.js';
import {
  getRelatedRoutesForBlogPost,
  getRelatedEventsForBlogPost,
  getRelatedPostsForRoute,
  getRelatedEventsForRoute as getRelatedEventsForRouteFromCrossLinks,
  getRelatedRoutesForEvent as getRelatedRoutesForEventFromCrossLinks,
  getRelatedPostsForEvent,
} from './cross-links.js';

let indexableEventsCache: Event[] | undefined;
let indexableVenueEntriesCache: VenueDirectoryEntry[] | undefined;
let routesCache: Route[] | undefined;
let mixedRoutesCache: MixedRoute[] | undefined;
let eventBySlugCache: Map<string, Event> | undefined;
let venueBySlugCache: Map<string, VenueDirectoryEntry> | undefined;

function getCachedIndexableEvents(): Event[] {
  indexableEventsCache ??= getIndexableEvents();
  return indexableEventsCache;
}

function getCachedVenueEntries(): VenueDirectoryEntry[] {
  indexableVenueEntriesCache ??= getIndexableVenueEntries();
  return indexableVenueEntriesCache;
}

function getCachedRoutes(): Route[] {
  routesCache ??= getAllRoutes();
  return routesCache;
}

function getCachedMixedRoutes(): MixedRoute[] {
  mixedRoutesCache ??= getAllMixedRoutes();
  return mixedRoutesCache;
}

function getEventBySlugFromIndex(slug: string): Event | undefined {
  eventBySlugCache ??= new Map(getCachedIndexableEvents().map((event) => [event.slug, event]));
  return eventBySlugCache.get(slug) ?? getEventBySlug(slug);
}

function getVenueBySlugFromIndex(slug: string): VenueDirectoryEntry | undefined {
  venueBySlugCache ??= new Map(getCachedVenueEntries().map((entry) => [entry.slug, entry]));
  return venueBySlugCache.get(slug);
}

// ═══════════════════════════════════════════════════════════════
// SLUG RESOLUTION — turns manual slug arrays into real objects
// ═══════════════════════════════════════════════════════════════

function resolveSlugs<T extends { slug: string }>(
  slugs: string[] | undefined,
  resolver: (slug: string) => T | undefined,
  excludeSlug?: string
): T[] {
  if (!slugs || slugs.length === 0) return [];

  const seen = new Set<string>();
  const result: T[] = [];

  for (const slug of slugs) {
    if (seen.has(slug)) continue;
    if (slug === excludeSlug) continue;

    const item = resolver(slug);
    if (item) {
      seen.add(slug);
      result.push(item);
    }
  }

  return result;
}

function resolveRelatedGuides(
  slugs: string[] | undefined,
  excludeSlug?: string
): BlogPost[] {
  return resolveSlugs(slugs, getPostBySlug, excludeSlug);
}

function resolveRelatedEvents(
  slugs: string[] | undefined,
  excludeId?: string
): Event[] {
  if (!slugs || slugs.length === 0) return [];

  const seen = new Set<string>();
  const result: Event[] = [];

  for (const slug of slugs) {
    if (seen.has(slug)) continue;

    const item = getEventBySlugFromIndex(slug);
    if (item && item.id !== excludeId) {
      seen.add(slug);
      result.push(item);
    }
  }

  return result;
}

function resolveRelatedRoutes(
  slugs: string[] | undefined,
  excludeSlug?: string
): Route[] {
  return resolveSlugs(slugs, getRouteBySlug, excludeSlug);
}

function resolveRelatedVenues(slugs: string[] | undefined): VenueDirectoryEntry[] {
  if (!slugs || slugs.length === 0) return [];

  const seen = new Set<string>();
  const result: VenueDirectoryEntry[] = [];

  for (const slug of slugs) {
    if (seen.has(slug)) continue;

    const entry = getVenueBySlugFromIndex(slug);
    if (entry) {
      seen.add(slug);
      result.push(entry);
    }
  }

  return result;
}

function excludeByKey<T>(items: T[], source: T[], keyFn: (item: T) => string | number): T[] {
  const keys = new Set(source.map(keyFn));
  return items.filter((item) => !keys.has(keyFn(item)));
}

function mergeManualAndFallback<T>(
  manual: T[],
  limit: number,
  fallbackFactory: (limit: number) => T[],
  keyFn: (item: T) => string | number
): T[] {
  if (manual.length >= limit) return manual.slice(0, limit);

  const fallback = excludeByKey(
    fallbackFactory(limit + manual.length),
    manual,
    keyFn
  );

  return [...manual, ...fallback].slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════
// BLOG POST related content
// Manual relations take priority; cross-link engine fills the gaps.
// ═══════════════════════════════════════════════════════════════

export function getRelatedGuidesForPost(post: BlogPost, limit = 3): BlogPost[] {
  const manual = resolveRelatedGuides(post.relatedGuides, post.slug);
  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => getRelatedPosts(post, fallbackLimit),
    (item) => item.slug
  );
}

export function getRelatedEventsForPost(post: BlogPost, limit = 3): Event[] {
  const manual = resolveRelatedEvents(post.relatedEvents);
  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => getRelatedEventsForBlogPost(post, fallbackLimit),
    (item) => item.id
  );
}

export function getRelatedRoutesForPost(post: BlogPost, limit = 3): Route[] {
  const manual = resolveRelatedRoutes(post.relatedRoutes, post.slug);
  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => getRelatedRoutesForBlogPost(post, fallbackLimit),
    (item) => item.slug
  );
}

export function getRelatedVenuesForPost(post: BlogPost, limit = 3): VenueDirectoryEntry[] {
  return resolveRelatedVenues(post.relatedVenues).slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════
// EVENT related content
// ═══════════════════════════════════════════════════════════════

function getSimilarEvents(event: Event, limit: number): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return getCachedIndexableEvents()
    .filter((candidate) => {
      if (candidate.id === event.id) return false;
      const candidateDate = new Date(candidate.date);
      candidateDate.setHours(0, 0, 0, 0);
      return candidate.category === event.category && candidateDate >= today;
    })
    .slice(0, limit);
}

export function getRelatedEventsForEvent(event: Event, limit = 3): Event[] {
  const manual = resolveRelatedEvents(event.relatedEvents, event.id);
  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => getSimilarEvents(event, fallbackLimit),
    (item) => item.id
  );
}

export function getRelatedRoutesForEvent(event: Event, limit = 3): Route[] {
  const manual = resolveRelatedRoutes(event.relatedRoutes, event.slug);
  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => getRelatedRoutesForEventFromCrossLinks(event, fallbackLimit),
    (item) => item.slug
  );
}

export function getRelatedGuidesForEvent(event: Event, limit = 3): BlogPost[] {
  const manual = resolveRelatedGuides(event.relatedGuides, event.slug);
  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => getRelatedPostsForEvent(event, fallbackLimit),
    (item) => item.slug
  );
}

export function getRelatedVenuesForEvent(event: Event, limit = 3): VenueDirectoryEntry[] {
  const manual = resolveRelatedVenues(event.relatedVenues);

  const venueEntry = getCachedVenueEntries().find((entry) =>
    entry.events.some((item) => item.id === event.id)
  );

  if (venueEntry && !manual.some((entry) => entry.slug === venueEntry.slug)) {
    manual.unshift(venueEntry);
  }

  return manual.slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════
// ROUTE related content
// ═══════════════════════════════════════════════════════════════

function getSimilarRoutes(route: Route, limit: number): Route[] {
  const routes = getCachedRoutes();
  const sourceNeighborhoods = new Set(route.neighborhoods);
  const sourceTags = route.tags.map((t) => t.toLowerCase());

  // Score every candidate (excluding self) and pick top N by composite score
  const scored = routes
    .filter((candidate) => candidate.id !== route.id)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === route.category) score += 6;
      if (candidate.difficulty === route.difficulty) score += 3;
      const neighOverlap = candidate.neighborhoods.filter((n) => sourceNeighborhoods.has(n)).length;
      score += neighOverlap * 2;
      const candTags = candidate.tags.map((t) => t.toLowerCase());
      score += candTags.filter((t) => sourceTags.includes(t)).length;
      return { route: candidate, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.route);
}

export function getRelatedRoutesForRoute(route: Route, limit = 3): Route[] {
  const manual = resolveRelatedRoutes(route.relatedRoutes, route.slug);
  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => getSimilarRoutes(route, fallbackLimit),
    (item) => item.slug
  );
}

export function getRelatedGuidesForRoute(route: Route, limit = 3): BlogPost[] {
  const manual = resolveRelatedGuides(route.relatedGuides, route.slug);
  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => getRelatedPostsForRoute(route, fallbackLimit),
    (item) => item.slug
  );
}

export function getRelatedEventsForRoute(route: Route, limit = 3): Event[] {
  const manual = resolveRelatedEvents(route.relatedEvents);
  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => getRelatedEventsForRouteFromCrossLinks(route, fallbackLimit),
    (item) => item.id
  );
}

export function getRelatedVenuesForRoute(route: Route, limit = 3): VenueDirectoryEntry[] {
  const manual = resolveRelatedVenues(route.relatedVenues);

  // Fallback: venues whose events list overlaps with the route's neighborhoods.
  const sourceNeighborhoods = new Set(route.neighborhoods);
  const fallback = getCachedVenueEntries()
    .map((entry) => {
      const eventNeighborhoods = entry.events
        .map((event) => event.neighborhood)
        .filter((n) => sourceNeighborhoods.has(n));
      return { entry, score: eventNeighborhoods.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.entry);

  return mergeManualAndFallback(manual, limit, () => fallback, (item) => item.slug);
}

// ═══════════════════════════════════════════════════════════════
// VENUE related content
// ═══════════════════════════════════════════════════════════════

export function getRelatedEventsForVenue(
  venue: VenueDirectoryEntry,
  limit = 6,
  excludeEventId?: string
): Event[] {
  const relations = getVenueRelations(venue.slug);
  const manual = resolveRelatedEvents(relations.relatedEvents, excludeEventId);

  return mergeManualAndFallback(
    manual,
    limit,
    (fallbackLimit) => venue.events
      .filter((event) => event.id !== excludeEventId)
      .slice(0, fallbackLimit),
    (item) => item.id
  );
}

export function getRelatedGuidesForVenue(venue: VenueDirectoryEntry, limit = 3): BlogPost[] {
  const relations = getVenueRelations(venue.slug);
  return resolveRelatedGuides(relations.relatedGuides).slice(0, limit);
}

export function getRelatedRoutesForVenue(venue: VenueDirectoryEntry, limit = 3): Route[] {
  const relations = getVenueRelations(venue.slug);
  return resolveRelatedRoutes(relations.relatedRoutes).slice(0, limit);
}

export function getRelatedVenuesForVenue(venue: VenueDirectoryEntry, limit = 3): VenueDirectoryEntry[] {
  const relations = getVenueRelations(venue.slug);
  return resolveRelatedVenues(relations.relatedVenues)
    .filter((entry) => entry.slug !== venue.slug)
    .slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════
// MIXED ROUTE related content
// Pure fallback ranking (MixedRoute has no manual relations).
// ═══════════════════════════════════════════════════════════════

function getSimilarMixedRoutes(plan: MixedRoute, limit: number): MixedRoute[] {
  const sourceNeighborhoods = new Set(plan.neighborhoods);
  const sourceDuration = plan.duration;

  // Duration proximity: closer durations score higher
  const durationRank: Record<string, number> = {
    '2h': 1, '6h': 2, '12h': 3, '1day': 4, '2days': 5, '3days': 6,
  };
  const sourceRank = durationRank[sourceDuration] ?? 3;

  const scored = getCachedMixedRoutes()
    .filter((candidate) => candidate.id !== plan.id)
    .map((candidate) => {
      let score = 0;
      const neighOverlap = candidate.neighborhoods.filter((n) => sourceNeighborhoods.has(n)).length;
      score += neighOverlap * 4;
      const candRank = durationRank[candidate.duration] ?? 3;
      const dist = Math.abs(candRank - sourceRank);
      score += Math.max(0, 4 - dist); // closer duration ranks higher
      return { plan: candidate, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.plan);
}

function getRoutesForMixedRoute(plan: MixedRoute, limit: number): Route[] {
  const sourceNeighborhoods = new Set(plan.neighborhoods);

  const scored = getCachedRoutes().map((candidate) => {
    const neighOverlap = candidate.neighborhoods.filter((n) => sourceNeighborhoods.has(n)).length;
    return { route: candidate, score: neighOverlap };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.route);
}

function getGuidesForMixedRoute(plan: MixedRoute, limit: number): BlogPost[] {
  // Reuse the cross-link engine keyed on a proxy route whose neighborhoods
  // overlap the plan's. This keeps ranking consistent with route pages.
  const sourceNeighborhoods = new Set(plan.neighborhoods);
  const proxy = getCachedRoutes().find((r) =>
    r.neighborhoods.some((n) => sourceNeighborhoods.has(n))
  );
  if (!proxy) return [];
  return getRelatedPostsForRoute(proxy, limit);
}

function getEventsForMixedRoute(plan: MixedRoute, limit: number): Event[] {
  const sourceNeighborhoods = new Set(plan.neighborhoods);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const candidates = getCachedIndexableEvents()
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .map((event) => ({
      event,
      score: sourceNeighborhoods.has(event.neighborhood) ? 3 : 0,
    }))
    .sort((a, b) => b.score - a.score);

  return candidates.slice(0, limit).map((item) => item.event);
}

export function getRelatedMixedRoutesForMixedRoute(plan: MixedRoute, limit = 3): MixedRoute[] {
  return getSimilarMixedRoutes(plan, limit);
}

export function getRelatedGuidesForMixedRoute(plan: MixedRoute, limit = 3): BlogPost[] {
  return getGuidesForMixedRoute(plan, limit);
}

export function getRelatedEventsForMixedRoute(plan: MixedRoute, limit = 3): Event[] {
  return getEventsForMixedRoute(plan, limit);
}

export function getRelatedRoutesForMixedRoute(plan: MixedRoute, limit = 3): Route[] {
  return getRoutesForMixedRoute(plan, limit);
}
