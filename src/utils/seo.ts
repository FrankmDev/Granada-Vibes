import { DEFAULT_OG_IMAGE, SITE_CONFIG } from '@config/site';
import type { Event, Route, Locale } from '@types';

const ES_TO_EN_SEGMENTS: Record<string, string> = {
  eventos: 'events',
  rutas: 'routes',
  guias: 'guides',
  blog: 'blog',
  'por-tiempo': 'by-time',
  sobre: 'about',
  privacidad: 'privacy',
  'aviso-legal': 'legal',
  planifica: 'planifica',
  colabora: 'collaborate',
  salas: 'venues',
  artistas: 'artists',
  hoy: 'today',
  'este-fin-de-semana': 'this-weekend',
  'conciertos-granada': 'granada-concerts',
  gratis: 'free',
};

const EN_TO_ES_SEGMENTS: Record<string, string> = Object.fromEntries(
  Object.entries(ES_TO_EN_SEGMENTS).map(([spanishSegment, englishSegment]) => [
    englishSegment,
    spanishSegment,
  ])
);

export function normalizeUrlPath(path: string): string {
  if (!path || path === '/') return '/';

  const [pathname = '/', query = ''] = path.split('?');
  const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;

  return query ? `${normalizedPathname}?${query}` : normalizedPathname;
}

export function absoluteSiteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_CONFIG.url}${normalizeUrlPath(path)}`;
}

function stripEnglishPrefix(path: string): string {
  return path.replace(/^\/en(?=\/|$)/, '') || '/';
}

function translateSegments(path: string, dictionary: Record<string, string>): string {
  return path
    .split('/')
    .map((segment) => dictionary[segment] ?? segment)
    .join('/');
}

export function getSpanishPath(path: string): string {
  return normalizeUrlPath(translateSegments(stripEnglishPrefix(path), EN_TO_ES_SEGMENTS));
}

export function getEnglishPath(path: string): string {
  const withoutLocale = stripEnglishPrefix(path);
  const translatedPath = translateSegments(withoutLocale, ES_TO_EN_SEGMENTS);
  return normalizeUrlPath(`/en${translatedPath === '/' ? '' : translatedPath}`);
}

export function getAlternateUrls(path: string): Record<Locale, string> {
  return {
    es: absoluteSiteUrl(getSpanishPath(path)),
    en: absoluteSiteUrl(getEnglishPath(path)),
  };
}

/**
 * Generate meta description for an event page.
 * Pattern: "[Name] en Granada — [date]. [Venue]. [Price]."
 */
export function getEventMetaDescription(event: Event, locale: Locale): string {
  const name = event.title[locale];
  const venue = event.venue;
  const price = event.price === null
    ? (locale === 'es' ? 'Gratis' : 'Free')
    : `${event.price}€`;

  const date = new Date(event.date).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  if (locale === 'es') {
    return `${name} en Granada — ${date}. ${venue}. ${price}.`;
  }
  return `${name} in Granada — ${date}. ${venue}. ${price}.`;
}

/**
 * Generate meta description for a route page.
 * Pattern: "Ruta de [type] por [neighborhood]: [duration], [distance]. Dificultad [level]."
 */
export function getRouteMetaDescription(route: Route, locale: Locale): string {
  const name = route.title[locale];
  const hours = Math.round(route.duration / 60);
  const distance = `${route.distance} km`;

  const difficultyMap: Record<string, { es: string; en: string }> = {
    easy:        { es: 'fácil',    en: 'easy' },
    moderate:    { es: 'moderada', en: 'moderate' },
    challenging: { es: 'exigente', en: 'challenging' },
  };

  const difficulty = difficultyMap[route.difficulty]?.[locale] ?? route.difficulty;
  const durationLabel = locale === 'es' ? `${hours}h` : `${hours}h`;

  if (locale === 'es') {
    return `${name}: ${durationLabel}, ${distance}. Dificultad ${difficulty}.`;
  }
  return `${name}: ${durationLabel}, ${distance}. Difficulty: ${difficulty}.`;
}

/**
 * Generate OG image URL — returns a branded Granada fallback.
 */
export function getOgImageUrl(_text: string): string {
  return 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&h=630&fit=crop&q=80';
}

export function resolveOgImageUrl(image = DEFAULT_OG_IMAGE): string {
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (!image.startsWith('/')) return `${SITE_CONFIG.url}${DEFAULT_OG_IMAGE}`;
  return `${SITE_CONFIG.url}${image}`;
}
