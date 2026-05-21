import { SITE_CONFIG } from '@config/site';
import type { BlogPost, Event, Locale, Route } from '@types';

export const AI_FEED_UPDATED_AT = new Date().toISOString();

export interface AiFeedMeta {
  name: string;
  url: string;
  description: string;
  updatedAt: string;
  language: Locale | 'multi';
  license: string;
  contact: string;
}

export interface AiEventFeedItem {
  id: string;
  slug: string;
  title: string;
  titleEs: string;
  titleEn: string;
  description: string;
  descriptionEs: string;
  descriptionEn: string;
  url: string;
  urlEn: string;
  date: string;
  time: string;
  endDate?: string;
  venue: string;
  address?: string;
  neighborhood: string;
  category: string;
  price: number | null;
  currency: 'EUR';
  tags: string[];
  image?: string;
  sourceUrl?: string;
  lastSyncedAt?: string;
}

export interface AiRouteFeedItem {
  id: string;
  slug: string;
  title: string;
  titleEs: string;
  titleEn: string;
  description: string;
  descriptionEs: string;
  descriptionEn: string;
  url: string;
  urlEn: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  distanceKm: number;
  neighborhoods: string[];
  tags: string[];
  image?: string;
  highlights: string[];
}

export interface AiGuideFeedItem {
  id: string;
  slug: string;
  title: string;
  titleEs: string;
  titleEn: string;
  description: string;
  descriptionEs: string;
  descriptionEn: string;
  url: string;
  urlEn: string;
  category: string;
  publishDate: string;
  readingTimeMinutes: number;
  tags: string[];
  author: string;
  image?: string;
}

export function getAiFeedMeta(description: string, language: AiFeedMeta['language'] = 'multi'): AiFeedMeta {
  return {
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description,
    updatedAt: AI_FEED_UPDATED_AT,
    language,
    license: 'All rights reserved. Cite and link to Granada Urban when using this data.',
    contact: SITE_CONFIG.email,
  };
}

export function absoluteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (value.startsWith('https://') || value.startsWith('http://')) return value;
  if (value.startsWith('/')) return `${SITE_CONFIG.url}${value}`;
  return undefined;
}

export function eventUrl(slug: string, locale: Locale): string {
  return locale === 'en'
    ? `${SITE_CONFIG.url}/en/events/${slug}/`
    : `${SITE_CONFIG.url}/eventos/${slug}/`;
}

export function routeUrl(slug: string, locale: Locale): string {
  return locale === 'en'
    ? `${SITE_CONFIG.url}/en/routes/${slug}/`
    : `${SITE_CONFIG.url}/rutas/${slug}/`;
}

export function guideUrl(slug: string, locale: Locale): string {
  return locale === 'en'
    ? `${SITE_CONFIG.url}/en/guides/${slug}/`
    : `${SITE_CONFIG.url}/guias/${slug}/`;
}

export function toAiEventFeedItem(event: Event): AiEventFeedItem {
  const image = absoluteUrl(event.remoteImageUrl) ?? absoluteUrl(event.image) ?? absoluteUrl(event.imageUrl);

  return {
    id: event.id,
    slug: event.slug,
    title: event.title.es,
    titleEs: event.title.es,
    titleEn: event.title.en,
    description: event.description.es,
    descriptionEs: event.description.es,
    descriptionEn: event.description.en,
    url: eventUrl(event.slug, 'es'),
    urlEn: eventUrl(event.slug, 'en'),
    date: event.date,
    time: event.time,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    venue: event.venue,
    ...(event.address ? { address: event.address } : {}),
    neighborhood: event.neighborhood,
    category: event.category,
    price: event.price,
    currency: event.currency,
    tags: event.tags,
    ...(image ? { image } : {}),
    ...(event.sourceUrl ? { sourceUrl: event.sourceUrl } : {}),
    ...(event.lastSyncedAt ? { lastSyncedAt: event.lastSyncedAt } : {}),
  };
}

export function toAiRouteFeedItem(route: Route): AiRouteFeedItem {
  const image = absoluteUrl(route.image);

  return {
    id: route.id,
    slug: route.slug,
    title: route.title.es,
    titleEs: route.title.es,
    titleEn: route.title.en,
    description: route.description.es,
    descriptionEs: route.description.es,
    descriptionEn: route.description.en,
    url: routeUrl(route.slug, 'es'),
    urlEn: routeUrl(route.slug, 'en'),
    category: route.category,
    difficulty: route.difficulty,
    durationMinutes: route.duration,
    distanceKm: route.distance,
    neighborhoods: route.neighborhoods,
    tags: route.tags,
    ...(image ? { image } : {}),
    highlights: route.highlights.map((highlight) => highlight.title.es),
  };
}

export function toAiGuideFeedItem(post: BlogPost): AiGuideFeedItem {
  const image = absoluteUrl(post.image);

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.es,
    titleEs: post.title.es,
    titleEn: post.title.en,
    description: post.description.es,
    descriptionEs: post.description.es,
    descriptionEn: post.description.en,
    url: guideUrl(post.slug, 'es'),
    urlEn: guideUrl(post.slug, 'en'),
    category: post.category,
    publishDate: post.publishDate,
    readingTimeMinutes: post.readingTime,
    tags: post.tags,
    author: post.author,
    ...(image ? { image } : {}),
  };
}

export function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

export function textResponse(body: string, contentType = 'text/plain; charset=utf-8'): Response {
  return new Response(body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
