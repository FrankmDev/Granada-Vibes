import type { BlogPost, Locale, Route } from '@types';
import { formatDistance, formatDuration } from './dates';

const BLOG_HEADING_OVERRIDES: Record<string, { es: string; en: string }> = {
  'feria-corpus-granada-2026': {
    es: 'Feria del Corpus 2026',
    en: 'Granada Corpus Fair 2026',
  },
  'tarasca-granada-2026': {
    es: 'Tarasca de Granada 2026',
    en: 'Granada Tarasca 2026',
  },
  'corpus-granada-2026': {
    es: 'Corpus de Granada 2026',
    en: 'Granada Corpus 2026',
  },
  'entradas-alhambra-agotadas': {
    es: 'Entradas Alhambra agotadas',
    en: 'Sold-out Alhambra tickets',
  },
  'granada-fin-de-semana-48-horas': {
    es: 'Granada en 48 horas',
    en: 'Granada in 48 hours',
  },
  'miradores-granada-guia-completa': {
    es: 'Miradores de Granada',
    en: 'Granada viewpoints',
  },
  'tapas-gratis-granada': {
    es: 'Tapas gratis en Granada',
    en: 'Free tapas in Granada',
  },
  'flamenco-granada-guia-autentica': {
    es: 'Flamenco en Granada',
    en: 'Flamenco in Granada',
  },
  'granada-en-un-dia-itinerario': {
    es: 'Granada en un día',
    en: 'Granada in one day',
  },
  'sierra-nevada-desde-granada-guia-excursion': {
    es: 'Sierra Nevada desde Granada',
    en: 'Sierra Nevada from Granada',
  },
  'granada-gratis-que-hacer-sin-gastar': {
    es: 'Qué hacer gratis en Granada',
    en: 'Free things to do in Granada',
  },
  'antes-de-llegar-granada': {
    es: 'Antes de viajar a Granada',
    en: 'Before visiting Granada',
  },
  'albaicin-a-pie': {
    es: 'Albaicín a pie',
    en: 'Albaicín on foot',
  },
};

const BLOG_DESCRIPTION_OVERRIDES: Record<string, { es: string; en: string }> = {
  'feria-corpus-granada-2026': {
    es: 'Feria del Corpus Granada 2026: casetas, ferial de Almanjáyar, atracciones, transporte, horarios y consejos para ir de día o de noche.',
    en: 'Granada Corpus Fair 2026: casetas, Almanjáyar fairground, rides, transport, opening times and tips for day or night visits.',
  },
  'tarasca-granada-2026': {
    es: 'Tarasca Granada 2026: fecha, hora, salida desde Plaza del Carmen, recorrido por el centro y consejos para verla sin agobios.',
    en: 'Granada Tarasca 2026: date, time, Plaza del Carmen start, city-centre route and practical viewing tips.',
  },
  'corpus-granada-2026': {
    es: 'Corpus Granada 2026: fechas, programa, Tarasca, procesión, casetas, ferial, transporte y consejos locales para organizar la semana.',
    en: 'Granada Corpus 2026: dates, programme, Tarasca, procession, casetas, fairground, transport and local tips.',
  },
  'entradas-alhambra-agotadas': {
    es: 'Entradas Alhambra agotadas: opciones reales, canales oficiales, visitas nocturnas, Generalife, Dobla de Oro y alternativas cercanas.',
    en: 'Sold-out Alhambra tickets: official options, night visits, Generalife, Dobla de Oro and nearby alternatives.',
  },
  'granada-fin-de-semana-48-horas': {
    es: 'Granada en 48 horas: itinerario realista con Alhambra, Albaicín, Realejo, tapas, miradores, tiempos y prioridades.',
    en: 'Granada in 48 hours: realistic itinerary with Alhambra, Albaicín, Realejo, tapas, viewpoints, timing and priorities.',
  },
  'miradores-granada-guia-completa': {
    es: 'Miradores de Granada: San Nicolás, San Cristóbal, La Lona y Silla del Moro, con mejores horas, acceso y ruta recomendada.',
    en: 'Granada viewpoints: San Nicolás, San Cristóbal, La Lona and Silla del Moro, with best times, access and route ideas.',
  },
  'tapas-gratis-granada': {
    es: 'Tapas gratis en Granada: cómo funciona, zonas fiables, bares recomendados, precios reales y rutas por Navas, Realejo y La Chana.',
    en: 'Free tapas in Granada: how it works, reliable areas, recommended bars, real prices and routes around Navas, Realejo and La Chana.',
  },
  'flamenco-granada-guia-autentica': {
    es: 'Flamenco en Granada: guía para elegir cuevas, zambras y peñas auténticas en Sacromonte, con precios, acceso y consejos.',
    en: 'Flamenco in Granada: how to choose authentic caves, zambras and peñas in Sacromonte, with prices, access and tips.',
  },
  'granada-en-un-dia-itinerario': {
    es: 'Granada en un día: dos itinerarios prácticos, con o sin Alhambra, horarios, errores frecuentes y prioridades para no correr.',
    en: 'Granada in one day: two practical itineraries, with or without Alhambra, timing, common mistakes and priorities.',
  },
  'sierra-nevada-desde-granada-guia-excursion': {
    es: 'Sierra Nevada desde Granada sin coche: autobús, Pradollano, rutas de verano, qué llevar y cómo organizar la excursión.',
    en: 'Sierra Nevada from Granada without a car: bus, Pradollano, summer routes, what to bring and how to plan the trip.',
  },
  'granada-gratis-que-hacer-sin-gastar': {
    es: 'Qué hacer gratis en Granada: monumentos, miradores, bosque de la Alhambra, tapas y planes locales para gastar poco.',
    en: 'Free things to do in Granada: monuments, viewpoints, Alhambra forest, tapas and local plans on a low budget.',
  },
  'antes-de-llegar-granada': {
    es: 'Antes de viajar a Granada: reservas clave, entradas de la Alhambra, transporte, alojamiento, presupuesto y mejores fechas.',
    en: 'Before visiting Granada: key bookings, Alhambra tickets, transport, accommodation, budget and best dates.',
  },
  'albaicin-a-pie': {
    es: 'Albaicín a pie: ruta sin guía por miradores, plazas, teterías y calles clave, con tiempos, desnivel y consejos locales.',
    en: 'Albaicín on foot: self-guided route through viewpoints, squares, teahouses and key streets, with timing and local tips.',
  },
};

function stripAfterColon(value: string): string {
  return value.split(':')[0]?.trim() || value;
}

export function getBlogDisplayTitle(post: BlogPost, locale: Locale): string {
  return BLOG_HEADING_OVERRIDES[post.slug]?.[locale] ?? stripAfterColon(post.title[locale]);
}

export function getBlogSeoDescription(post: BlogPost, locale: Locale): string {
  return BLOG_DESCRIPTION_OVERRIDES[post.slug]?.[locale] ?? post.description[locale];
}

export function getRouteDisplayTitle(route: Route, locale: Locale): string {
  return stripAfterColon(route.title[locale]);
}

export function getRouteSeoTitle(route: Route, locale: Locale): string {
  const title = getRouteDisplayTitle(route, locale);
  const duration = formatDuration(route.duration, locale);
  const distance = formatDistance(route.distance, locale);

  if (locale === 'en') {
    return `${title}: ${duration}, ${distance}`;
  }

  return `${title}: ${duration} y ${distance}`;
}

interface RouteSeoDescriptionInput {
  route: Route;
  locale: Locale;
  neighborhoods: string;
  difficulty: string;
}

export function getRouteSeoDescription({
  route,
  locale,
  neighborhoods,
  difficulty,
}: RouteSeoDescriptionInput): string {
  const title = getRouteDisplayTitle(route, locale);
  const duration = formatDuration(route.duration, locale);
  const distance = formatDistance(route.distance, locale);

  if (locale === 'en') {
    return `${title} in Granada: ${duration}, ${distance}, ${difficulty} difficulty. Itinerary through ${neighborhoods} with stops, tips and practical details.`;
  }

  return `${title} en Granada: ${duration}, ${distance}, dificultad ${difficulty}. Itinerario por ${neighborhoods} con paradas, consejos y datos prácticos.`;
}
