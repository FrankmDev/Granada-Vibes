// Shared path segment translation maps and URL helpers for ES <-> EN.
// Plain .mjs module — safe to import from both Astro app TS (via
// astro/tsconfigs/base allowJs) and astro.config.mjs / sitemap Node context.
// No TypeScript path aliases, no .ts dependency.

// prettier-ignore
export const ES_TO_EN_SEGMENTS = /** @type {const} */ ({
  eventos: 'events',
  rutas: 'routes',
  guias: 'guides',
  'por-tiempo': 'by-time',
  privacidad: 'privacy',
  'aviso-legal': 'legal',
  colabora: 'collaborate',
  planifica: 'planifica',
  salas: 'venues',
  hoy: 'today',
  'este-fin-de-semana': 'this-weekend',
  conciertos: 'concerts',
  gratis: 'free',
});

export const EN_TO_ES_SEGMENTS = Object.fromEntries(
  Object.entries(ES_TO_EN_SEGMENTS).map(([spanishSegment, englishSegment]) => [
    englishSegment,
    spanishSegment,
  ])
);

/**
 * Ensure a pathname ends with a trailing slash.
 * Treats empty / '/' as '/'. Does NOT strip query strings or hashes.
 * @param {string} pathname
 * @returns {string}
 */
export function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/**
 * Strip a leading `/en` or `/en/` prefix. Returns '/' if nothing remains.
 * @param {string} pathname
 * @returns {string}
 */
export function stripEnglishPrefix(pathname) {
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}

/**
 * Translate path segments using a dictionary (ES_TO_EN or EN_TO_ES).
 * Preserves segments not found in the map. Normalizes trailing slash.
 * @param {string} pathname
 * @param {Record<string, string>} dictionary
 * @returns {string}
 */
export function translatePath(pathname, dictionary) {
  return normalizePathname(
    pathname
      .split('/')
      .map((segment) => dictionary[segment] ?? segment)
      .join('/')
  );
}

/**
 * Given any pathname (ES or EN), return the normalised English equivalent.
 * @param {string} pathname
 * @returns {string}
 */
export function getEnglishPath(pathname) {
  const translatedPath = translatePath(stripEnglishPrefix(pathname), ES_TO_EN_SEGMENTS);
  return normalizePathname(`/en${translatedPath === '/' ? '' : translatedPath}`);
}

/**
 * Given any pathname (ES or EN), return the normalised Spanish equivalent.
 * @param {string} pathname
 * @returns {string}
 */
export function getSpanishPath(pathname) {
  return translatePath(stripEnglishPrefix(pathname), EN_TO_ES_SEGMENTS);
}
