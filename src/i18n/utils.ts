import type { Translations } from './locales/es.js';
import { es } from './locales/es.js';
import { en } from './locales/en.js';
import type { Locale } from '@types';

const translations: Record<Locale, Translations> = {
  es,
  en,
};

/** Default locale used for fallback when a key is missing in the current locale */
const DEFAULT_LOCALE: Locale = 'es';

/**
 * Type-safe path accessor for nested translation objects
 */
type Path<T, Key extends keyof T = keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${Path<T[Key], keyof T[Key]>}` | Key
    : Key
  : never;

type TranslationPath = Path<Translations>;

const isDev = import.meta.env.DEV;

function warnInDev(message: string): void {
  if (!isDev) return;
  globalThis.console.warn(message);
}

/**
 * Get a nested value from an object using a dot-notation path
 */
function getNestedValue(
  obj: Record<string, unknown>,
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
 * Missing variables produce an empty string (never a raw token), with a dev-only warning.
 */
function interpolate(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_match: string, key: string) => {
    const value = vars[key];
    if (value !== undefined) return String(value);
    warnInDev(`[i18n] Missing interpolation variable "{{${key}}}" in template: "${template.slice(0, 80)}"`);
    return '';
  });
}

/**
 * Hook to get translations for a specific locale
 * Returns a function to translate keys with optional interpolation
 *
 * Behaviour:
 * - If the key exists as a string in the requested locale, returns it (interpolated if vars given).
 * - Otherwise falls back to the default locale (es). If the default also lacks the key,
 *   returns an empty string and warns in dev — never leaks raw keys into production HTML.
 */
export function useTranslations(locale: Locale) {
  const current = translations[locale];
  const fallback = DEFAULT_LOCALE !== locale ? translations[DEFAULT_LOCALE] : null;

  return (
    key: TranslationPath,
    vars?: Record<string, string | number>
  ): string => {
    let value = getNestedValue(current, key);

    // If not found in current locale, try default locale
    if (typeof value !== 'string' && fallback) {
      value = getNestedValue(fallback, key);
    }

    if (typeof value !== 'string') {
      warnInDev(`[i18n] Missing translation key "${key}" for locale "${locale}" (and fallback "${DEFAULT_LOCALE}")`);
      return '';
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
