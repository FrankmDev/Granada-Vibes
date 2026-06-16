import type { Locale } from '@types';

/**
 * Get the locale from a pathname
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'es';
}
