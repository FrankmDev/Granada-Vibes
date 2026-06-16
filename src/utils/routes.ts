import type { Locale } from '@types';

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

export function getSwitchLangUrl(locale: Locale): string {
  return locale === 'es' ? '/en/' : '/';
}
