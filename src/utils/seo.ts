import { DEFAULT_OG_IMAGE, SITE_CONFIG } from '@config/site';
import type { Locale } from '@types';

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
  hoy: 'today',
  'este-fin-de-semana': 'this-weekend',
  conciertos: 'concerts',
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

  const [pathWithoutHash = '/'] = path.split('#');
  const [pathname = '/'] = pathWithoutHash.split('?');
  const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;

  return normalizedPathname;
}

export function absoluteSiteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    const url = new URL(path);
    return `${SITE_CONFIG.url}${normalizeUrlPath(url.pathname)}`;
  }
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

function getSpanishPath(path: string): string {
  return normalizeUrlPath(translateSegments(stripEnglishPrefix(path), EN_TO_ES_SEGMENTS));
}

function getEnglishPath(path: string): string {
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

export function shouldRenderAlternateUrls(path: string): boolean {
  const normalizedPath = normalizeUrlPath(path);
  if (normalizedPath.startsWith('/ai/')) return false;
  if (normalizedPath.startsWith('/artistas/') || normalizedPath.startsWith('/en/artists/')) return false;
  return true;
}

export function resolveOgImageUrl(image = DEFAULT_OG_IMAGE): string {
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (!image.startsWith('/')) return `${SITE_CONFIG.url}${DEFAULT_OG_IMAGE}`;
  return `${SITE_CONFIG.url}${image}`;
}
