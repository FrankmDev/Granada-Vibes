// ============================================
// CORE TYPES - Shared across the application
// ============================================

export type Locale = 'es' | 'en';

export interface LocalizedText {
  es: string;
  en: string;
}

// ============================================
// EVENT TYPES
// ============================================

export type EventCategory =
  | 'concert'
  | 'exhibition'
  | 'festival'
  | 'market'
  | 'theater'
  | 'workshop'
  | 'guided-tour'
  | 'cinema'
  | 'other';

export type EventSource =
  | 'ticketmaster'
  | 'eventbrite'
  | 'yuzin'
  | 'conciertos-granada'
  | 'granada-es-cultura'
  | 'indyrock'
  | 'ayuntamiento'
  | 'turgranada'
  | 'palacio-congresos'
  | 'elegirhoy'
  | 'manual'
  | 'mock';

export type Neighborhood =
  | 'albaicin'
  | 'sacromonte'
  | 'centro'
  | 'realejo'
  | 'alhambra'
  | 'cartuja'
  | 'zaidin'
  | 'otro';

export interface Event {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: EventCategory;
  date: string; // ISO 8601 date
  time: string; // HH:MM format
  endDate?: string; // ISO 8601 date (YYYY-MM-DD) — end date for multi-day events
  venue: string;
  neighborhood: Neighborhood;
  address?: string;
  price: number | null; // null = free
  currency: 'EUR';
  tags: string[];
  featured: boolean;
  image?: string;
  url?: string;
  // Campos para páginas de detalle
  venueDescription?: LocalizedText;
  highlights?: { es: string[]; en: string[] };
  tips?: LocalizedText;
  ticketsUrl?: string;
  // Campos de trazabilidad para fuentes externas
  source?: EventSource;
  sourceId?: string;
  sourceUrl?: string;
  imageUrl?: string;
  lastSyncedAt?: string;
}

// ============================================
// ROUTE TYPES
// ============================================

export type RouteDifficulty = 'easy' | 'moderate' | 'challenging';
export type Difficulty = RouteDifficulty;
export type RouteCategory =
  | 'viewpoint'
  | 'tapas'
  | 'monuments'
  | 'hiking'
  | 'photography'
  | 'secrets'
  | 'history'
  | 'flamenco';
export type TimeOfDay = 'morning' | 'afternoon' | 'sunset' | 'evening' | 'any';

export interface RouteHighlight {
  title: LocalizedText;
  description: LocalizedText;
}

export interface RouteTip {
  title: LocalizedText;
  content: LocalizedText;
}

export interface Route {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: RouteCategory;
  difficulty: RouteDifficulty;
  duration: number; // minutes
  distance: number; // kilometers
  timeOfDay: TimeOfDay;
  neighborhoods: Neighborhood[];
  highlights: RouteHighlight[];
  tips: RouteTip[];
  image?: string;
  featured: boolean;
  tags: string[];
  // Campos para páginas de detalle
  longDescription?: LocalizedText;
  whatToBring?: { es: string[]; en: string[] };
  bestMonths?: string[];
}

// ============================================
// UI COMPONENT TYPES
// ============================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type BadgeVariant = 'default' | 'accent' | 'gold' | 'success' | 'error';

// ============================================
// SEO TYPES
// ============================================

export interface SEOMetadata {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noindex?: boolean;
}

// ============================================
// CONFIG TYPES
// ============================================

export interface SiteConfig {
  name: string;
  description: LocalizedText;
  url: string;
  defaultLocale: Locale;
  locales: Locale[];
  social: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

// ============================================
// UTILITY TYPES
// ============================================

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
