import type { Event, Route, Locale } from '@types';

/**
 * Generate meta description for an event page.
 * Pattern: "[Name] en Granada — [date]. [Venue]. [Price]."
 */
export function getEventMetaDescription(event: Event, locale: Locale): string {
  const name = event.title[locale];
  const venue = event.venue;
  const price = event.price === null
    ? (locale === 'es' ? 'Gratis' : 'Free')
    : `${event.price}€`;

  const date = new Date(event.date).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  if (locale === 'es') {
    return `${name} en Granada — ${date}. ${venue}. ${price}.`;
  }
  return `${name} in Granada — ${date}. ${venue}. ${price}.`;
}

/**
 * Generate meta description for a route page.
 * Pattern: "Ruta de [type] por [neighborhood]: [duration], [distance]. Dificultad [level]."
 */
export function getRouteMetaDescription(route: Route, locale: Locale): string {
  const name = route.title[locale];
  const hours = Math.round(route.duration / 60);
  const distance = `${route.distance} km`;

  const difficultyMap: Record<string, { es: string; en: string }> = {
    easy:        { es: 'fácil',    en: 'easy' },
    moderate:    { es: 'moderada', en: 'moderate' },
    challenging: { es: 'exigente', en: 'challenging' },
  };

  const difficulty = difficultyMap[route.difficulty]?.[locale] ?? route.difficulty;
  const durationLabel = locale === 'es' ? `${hours}h` : `${hours}h`;

  if (locale === 'es') {
    return `${name}: ${durationLabel}, ${distance}. Dificultad ${difficulty}.`;
  }
  return `${name}: ${durationLabel}, ${distance}. Difficulty: ${difficulty}.`;
}

/**
 * Generate OG image URL using the light theme placeholder colors.
 */
export function getOgImageUrl(text: string): string {
  return `https://placehold.co/1200x630/FAF8F5/2C2824?text=${encodeURIComponent(text)}`;
}
