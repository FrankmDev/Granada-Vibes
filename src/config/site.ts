import type { SiteConfig, Locale } from '@types';

export const SITE_CONFIG: SiteConfig = {
  name: 'Granada Vibes',
  description: {
    es: 'Tu guía cultural e inteligente de Granada. Descubre eventos, rutas y experiencias únicas en la ciudad de la Alhambra.',
    en: 'Your smart cultural guide to Granada. Discover events, routes, and unique experiences in the city of the Alhambra.',
  },
  url: 'https://granadavibes.com',
  defaultLocale: 'es',
  locales: ['es', 'en'],
  social: {
    instagram: 'https://instagram.com/granadavibes',
    twitter: 'https://twitter.com/granadavibes',
    facebook: 'https://facebook.com/granadavibes',
  },
};

export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

export const LOCALE_PATHS: Record<Locale, string> = {
  es: '',
  en: '/en',
};

export const DEFAULT_OG_IMAGE = 'https://placehold.co/1200x630/080808/f0ede8?text=Granada+Vibes';
