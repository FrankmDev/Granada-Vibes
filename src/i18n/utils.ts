import type { Translations } from './locales/es';
import { es } from './locales/es';
import { en } from './locales/en';
import type { Locale } from '@types';

const translations: Record<Locale, Translations> = {
  es,
  en,
};

/**
 * Type-safe path accessor for nested translation objects
 */
type Path<T, Key extends keyof T = keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${Path<T[Key], keyof T[Key]>}` | Key
    : Key
  : never;

type TranslationPath = Path<Translations>;

/**
 * Get a nested value from an object using a dot-notation path
 */
function getNestedValue<T extends Record<string, unknown>>(
  obj: T,
  path: string
): string | Record<string, unknown> | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return current as string | Record<string, unknown> | undefined;
}

/**
 * Replace template variables in a string
 * e.g., interpolate("Hello {{name}}", { name: "World" }) → "Hello World"
 */
function interpolate(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = vars[key];
    return value !== undefined ? String(value) : `{{${key}}}`;
  });
}

/**
 * Hook to get translations for a specific locale
 * Returns a function to translate keys with optional interpolation
 */
export function useTranslations(locale: Locale) {
  const t = translations[locale];

  return (
    key: TranslationPath,
    vars?: Record<string, string | number>
  ): string => {
    const value = getNestedValue(t, key);

    if (typeof value !== 'string') {
      // Return the key as fallback if translation not found
      return key;
    }

    return vars ? interpolate(value, vars) : value;
  };
}

/**
 * Get all translations for a locale (for passing to components)
 */
export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locale === 'es' || locale === 'en';
}

/**
 * Get the other locale (for language switcher)
 */
export function getOtherLocale(currentLocale: Locale): Locale {
  return currentLocale === 'es' ? 'en' : 'es';
}
