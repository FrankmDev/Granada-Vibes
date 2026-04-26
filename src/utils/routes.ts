import type { Locale } from '@types';

const ROUTE_MAP: Record<Locale, Record<string, string>> = {
  es: {
    home: '/',
    events: '/eventos/',
    routes: '/rutas/',
    blog: '/blog/',
    byTime: '/rutas/por-tiempo/',
    planner: '/planifica/',
    privacy: '/privacidad/',
    legal: '/aviso-legal/',
  },
  en: {
    home: '/en/',
    events: '/en/events/',
    routes: '/en/routes/',
    blog: '/en/blog/',
    byTime: '/en/routes/by-time/',
    planner: '/en/planifica/',
    privacy: '/en/privacy/',
    legal: '/en/legal/',
  },
};

export function getRoute(
  name: 'home' | 'events' | 'routes' | 'blog' | 'byTime' | 'planner' | 'privacy' | 'legal',
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

export function getSwitchLangUrl(locale: Locale): string {
  return locale === 'es' ? '/en/' : '/';
}
