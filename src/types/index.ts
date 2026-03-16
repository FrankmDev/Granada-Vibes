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
  | 'guided-tour';

export type Neighborhood =
  | 'albaicin'
  | 'sacromonte'
  | 'centro'
  | 'realejo'
  | 'alhambra'
  | 'cartuja'
  | 'ronda';

export interface Event {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: EventCategory;
  date: string; // ISO 8601 date
  time: string; // HH:MM format
  endTime?: string; // HH:MM format
  venue: string;
  neighborhood: Neighborhood;
  address?: string;
  price: number | null; // null = free
  currency: 'EUR';
  tags: string[];
  featured: boolean;
  image?: string;
  url?: string;
}

// ============================================
// ROUTE TYPES
// ============================================

export type RouteDifficulty = 'easy' | 'moderate' | 'challenging' | 'expert';
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
