/**
 * Centralized UI configuration for category colors, icons, difficulty, and time-of-day.
 * Single source of truth — imported by all card components.
 *
 * Colors use CSS custom property names so they can be applied via
 * inline `style` or via Tailwind arbitrary values like `text-[var(--color-accent)]`.
 */
import type { EventCategory, RouteCategory, RouteDifficulty, TimeOfDay, LocalizedText } from '@types';

// ── Shared style shape ──

export interface CategoryStyle {
  /** CSS custom property name, e.g. '--color-cat-concert' */
  colorVar: string;
  /** SVG path data for a 24×24 viewBox */
  icon: string;
}

export interface DifficultyStyle {
  label: LocalizedText;
  colorVar: string;
  bars: 1 | 2 | 3;
}

export interface TimeOfDayStyle {
  icon: string;
}

// ── Event categories ──

export const eventCategoryStyles: Record<EventCategory, CategoryStyle> = {
  concert: {
    colorVar: 'var(--color-cat-concert)',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  },
  exhibition: {
    colorVar: 'var(--color-cat-exhibition)',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  festival: {
    colorVar: 'var(--color-cat-festival)',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  market: {
    colorVar: 'var(--color-cat-market)',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  },
  theater: {
    colorVar: 'var(--color-cat-theater)',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  },
  workshop: {
    colorVar: 'var(--color-cat-workshop)',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
  },
  'guided-tour': {
    colorVar: 'var(--color-cat-guided-tour)',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
  cinema: {
    colorVar: 'var(--color-cat-cinema)',
    icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
  },
  other: {
    colorVar: 'var(--color-cat-other)',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
};

// ── Route categories ──

export const routeCategoryStyles: Record<RouteCategory, CategoryStyle> = {
  viewpoint: {
    colorVar: 'var(--color-cat-viewpoints)',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  },
  tapas: {
    colorVar: 'var(--color-cat-tapas)',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  },
  monuments: {
    colorVar: 'var(--color-cat-monuments)',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  hiking: {
    colorVar: 'var(--color-cat-hiking)',
    icon: 'M13.5 21.5L9.5 16l-2 2-2.5-2.5 3.5-3.5 2 2 5.5-8 2 2-4 6 3 3-5.5 5.5z M12 2a5 5 0 100 10 5 5 0 000-10z',
  },
  photography: {
    colorVar: 'var(--color-cat-photography)',
    icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z',
  },
  secrets: {
    colorVar: 'var(--color-cat-secrets)',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  history: {
    colorVar: 'var(--color-cat-history)',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z M12 2a10 10 0 100 20 10 10 0 000-20z',
  },
  flamenco: {
    colorVar: 'var(--color-cat-flamenco)',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  },
};

// ── Difficulty ──

export const difficultyStyles: Record<RouteDifficulty, DifficultyStyle> = {
  easy: {
    label: { es: 'Fácil', en: 'Easy' },
    colorVar: 'var(--color-difficulty-easy)',
    bars: 1,
  },
  moderate: {
    label: { es: 'Moderada', en: 'Moderate' },
    colorVar: 'var(--color-difficulty-moderate)',
    bars: 2,
  },
  challenging: {
    label: { es: 'Exigente', en: 'Challenging' },
    colorVar: 'var(--color-difficulty-hard)',
    bars: 3,
  },
};

// ── Time of day ──

export const timeOfDayStyles: Record<TimeOfDay, TimeOfDayStyle> = {
  morning: {
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  },
  afternoon: {
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  },
  sunset: {
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
  },
  evening: {
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
  },
  any: {
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707',
  },
};

// ── SVG icon paths (shared across components) ──

export const icons = {
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  location: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
  chevronRight: 'M9 5l7 7-7 7',
  star: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z',
  distance: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
} as const;
