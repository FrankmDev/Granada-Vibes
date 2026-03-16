import type { Locale } from '@types';
import { LOCALE_PATHS } from '@config/site';

/**
 * Generate a localized path
 */
export function getLocalizedPath(
  path: string,
  locale: Locale
): string {
  const prefix = LOCALE_PATHS[locale];
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Join with prefix
  return prefix ? `${prefix}/${cleanPath}` : `/${cleanPath}`;
}

/**
 * Get the locale from a pathname
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'es';
}

/**
 * Get the path without locale prefix
 */
export function getPathWithoutLocale(pathname: string): string {
  return pathname.replace(/^\/(en\/)?/, '/') || '/';
}

/**
 * Generate paths for both locales
 */
export function generateAlternatePaths(
  path: string
): { es: string; en: string } {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return {
    es: `/${cleanPath}`,
    en: `/en/${cleanPath}`,
  };
}
