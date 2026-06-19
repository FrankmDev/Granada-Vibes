import type { Locale } from '@types';
import { getEnglishPath, getSpanishPath } from '../config/path-segments.mjs';

type RouteName = 'home' | 'events' | 'routes' | 'blog' | 'byTime' | 'planner' | 'privacy' | 'legal' | 'collaborate';

const ROUTE_MAP: Record<Locale, Record<RouteName, string>> = {
  es: {
    home: '/',
    events: '/eventos/',
    routes: '/rutas/',
    blog: '/guias/',
    byTime: '/rutas/por-tiempo/',
    planner: '/planifica/',
    privacy: '/privacidad/',
    legal: '/aviso-legal/',
    collaborate: '/colabora/',
  },
  en: {
    home: '/en/',
    events: '/en/events/',
    routes: '/en/routes/',
    blog: '/en/guides/',
    byTime: '/en/routes/by-time/',
    planner: '/en/planifica/',
    privacy: '/en/privacy/',
    legal: '/en/legal/',
    collaborate: '/en/collaborate/',
  },
};

export function getRoute(
  name: RouteName,
  locale: Locale
): string {
  return ROUTE_MAP[locale][name];
}

export function getEventDetailUrl(slug: string, locale: Locale): string {
  return `${ROUTE_MAP[locale].events}${slug}/`;
}

export function getRouteDetailUrl(slug: string, locale: Locale): string {
  return `${ROUTE_MAP[locale].routes}${slug}/`;
}

export function getBlogDetailUrl(slug: string, locale: Locale): string {
  return `${ROUTE_MAP[locale].blog}${slug}/`;
}

export function getPlanDetailUrl(slug: string, locale: Locale): string {
  return `${ROUTE_MAP[locale].byTime}${slug}/`;
}

/**
 * Return the URL to switch to the opposite locale.
 * When `currentPath` is provided, preserves the equivalent deep path by
 * translating path segments (e.g. /rutas/por-tiempo/ → /en/routes/by-time/).
 * Without `currentPath`, falls back to the locale root for backward compatibility.
 */
export function getSwitchLangUrl(locale: Locale, currentPath?: string): string {
  if (currentPath) {
    // Translate the current path to the opposite locale
    const oppositeLocale: Locale = locale === 'es' ? 'en' : 'es';
    const translatedPath =
      oppositeLocale === 'en'
        ? getEnglishPath(currentPath)
        : getSpanishPath(currentPath);
    return translatedPath;
  }
  // Backward-compatible fallback: just switch locale root
  return locale === 'es' ? '/en/' : '/';
}
