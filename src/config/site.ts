import type { SiteConfig, Locale } from '@types';

export const SITE_CONFIG: SiteConfig = {
  name: 'GRN URBAN',
  description: {
    es: 'Tu guía cultural e inteligente de Granada. Descubre eventos, rutas y experiencias únicas en la ciudad de la Alhambra.',
    en: 'Your smart cultural guide to Granada. Discover events, routes, and unique experiences in the city of the Alhambra.',
  },
  url: 'https://www.granadaurban.com',
  defaultLocale: 'es',
  locales: ['es', 'en'],
  social: {
    instagram: 'https://instagram.com/granadaurban',
    twitter: 'https://twitter.com/granadaurban',
    facebook: 'https://facebook.com/granadaurban',
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

export const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&h=630&fit=crop&q=80';
