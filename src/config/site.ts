import type { SiteConfig, Locale } from '@types';

export const SITE_CONFIG: SiteConfig = {
  name: 'GranadaUrban',
  description: {
    es: 'Eventos, rutas, guías y planes en Granada. Descubre qué hacer hoy, este fin de semana y durante todo el año con una mirada local.',
    en: 'Events, routes, guides and plans in Granada. Discover what to do today, this weekend and year-round with a local editorial view.',
  },
  url: 'https://granadaurban.com',
  email: 'info@granadaurban.com',
  defaultLocale: 'es',
  locales: ['es', 'en'],
  social: {
    instagram: 'https://instagram.com/granadaurban',
    twitter: 'https://twitter.com/granadaurban',
    facebook: 'https://facebook.com/granadaurban',
  },
};

export const LOCALE_PATHS: Record<Locale, string> = {
  es: '',
  en: '/en',
};

export const DEFAULT_OG_IMAGE = '/favicon.jpg';
