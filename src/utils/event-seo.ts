import type { Event, Locale } from '@types';
import { eventSeoOverrides } from '@data/seo/event-seo-overrides';
import { formatFullDate, formatTime } from './dates';
import { formatPriceLabel, getPriceStatus } from './prices';
import { clampMetaDescription } from './seo-text';

type Translate = (key: string, vars?: Record<string, string | number>) => string;

function cleanEventName(name: string): string {
  return name
    .replace(/\bby Theatre Properties\b/gi, '')
    .replace(/\s+\|\s+/g, ' ')
    .replace(/[.。]+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function compactEventName(name: string, maxLength: number): string {
  const clean = cleanEventName(name);
  if (clean.length <= maxLength) return clean;
  const truncated = clean.slice(0, maxLength - 1).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  return `${(lastSpace > 24 ? truncated.slice(0, lastSpace) : truncated).trim()}...`;
}

function compactDateLabel(date: string, locale: Locale): string {
  const formatter = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return formatter.format(new Date(date)).replace(/\./g, '');
}

function getVenueSearchName(venue: string): string {
  return venue
    .replace(/\s+y\s+Exposiciones$/i, '')
    .replace(/^Hotel\s+/i, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function shouldUseTicketsIntent(event: Event): boolean {
  const status = getPriceStatus(event);
  return status === 'paid' || status === 'tickets' || !!event.ticketsUrl;
}

function isPastSeoEvent(event: Event): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate < today;
}

function getSpanishTitleHook(event: Event): string {
  if (isPastSeoEvent(event)) {
    return 'concierto y próximas fechas';
  }

  const status = getPriceStatus(event);

  if (status === 'free') {
    return 'gratis';
  }

  if (event.category === 'workshop' || event.category === 'guided-tour') {
    return 'reserva';
  }

  if (event.category === 'festival' || event.category === 'cinema') {
    return 'fechas y programa';
  }

  if (shouldUseTicketsIntent(event)) {
    return 'entradas';
  }

  return 'fecha y detalles';
}

function getEnglishTitleHook(event: Event): string {
  if (isPastSeoEvent(event)) {
    return 'concert and next dates';
  }

  const status = getPriceStatus(event);

  if (status === 'free') {
    return 'free entry';
  }

  if (event.category === 'workshop' || event.category === 'guided-tour') {
    return 'booking';
  }

  if (event.category === 'festival' || event.category === 'cinema') {
    return 'dates and programme';
  }

  if (shouldUseTicketsIntent(event)) {
    return 'tickets';
  }

  return 'date and details';
}

function buildAutomaticSeoTitle(event: Event, locale: Locale): string {
  const isConcert = event.category === 'concert';
  const maxNameLength = isConcert ? 34 : 38;
  const name = compactEventName(event.title[locale], maxNameLength);
  const date = compactDateLabel(event.date, locale);
  const venue = getVenueSearchName(event.venue);

  if (locale === 'en') {
    const hook = getEnglishTitleHook(event);
    const base = `${name} Granada ${date}: ${hook}`;
    const withVenue = `${name} Granada ${date}: ${hook} ${venue}`;
    return withVenue.length <= 64 ? withVenue : base;
  }

  const hook = getSpanishTitleHook(event);

  if (hook === 'gratis') {
    const freeTitle = `${name} gratis en Granada ${date}`;
    return freeTitle.length <= 64 ? freeTitle : `${name} gratis Granada ${date}`;
  }

  const base = `${name} Granada ${date}: ${hook}`;
  const withVenue = `${name} Granada ${date}: ${hook} ${venue}`;
  return withVenue.length <= 64 ? withVenue : base;
}

export function getEventSeoTitle(event: Event, locale: Locale): string {
  const override = eventSeoOverrides[event.slug]?.title[locale];
  if (override) return override;

  return buildAutomaticSeoTitle(event, locale);
}

export function getEventSeoDescription(event: Event, locale: Locale, t: Translate): string {
  const override = eventSeoOverrides[event.slug]?.description[locale];
  if (override) return clampMetaDescription(override);

  const price = formatPriceLabel(event, t);
  const date = formatFullDate(event.date, locale);
  const time = formatTime(event.time, locale);
  const venue = getVenueSearchName(event.venue);
  const status = getPriceStatus(event);
  const pastEvent = isPastSeoEvent(event);

  if (pastEvent) {
    if (locale === 'en') {
      return clampMetaDescription(
        `${cleanEventName(event.title.en)} played in Granada on ${date} at ${venue}. Use this page to check the venue, the original date and related upcoming plans in the city.`
      );
    }

    return clampMetaDescription(
      `${cleanEventName(event.title.es)} se celebró en Granada el ${date} en ${venue}. Usa esta página para ver el recinto, la fecha original y próximos planes relacionados en la ciudad.`
    );
  }

  if (locale === 'en') {
    const intent = status === 'free'
      ? 'Free entry'
      : shouldUseTicketsIntent(event)
        ? `Tickets or price: ${price}`
        : `Price: ${price}`;

    return clampMetaDescription(
      `${cleanEventName(event.title.en)} in Granada: ${date}, ${time}, ${venue}. ${intent}. Check location, details and related plans.`
    );
  }

  const intent = status === 'free'
    ? 'Entrada gratuita'
    : shouldUseTicketsIntent(event)
      ? `Entradas o precio: ${price}`
      : `Precio: ${price}`;

  return clampMetaDescription(
    `${cleanEventName(event.title.es)} en Granada: ${date}, ${time}, ${venue}. ${intent}. Consulta ubicación, detalles y planes relacionados.`
  );
}

export function getEventSeoH1(event: Event, locale: Locale): string {
  const override = eventSeoOverrides[event.slug]?.h1[locale];
  if (override) return override;

  const cleanName = cleanEventName(event.title[locale]);

  if (locale === 'en') {
    return cleanName.toLowerCase().includes('granada') ? cleanName : `${cleanName} in Granada`;
  }

  return cleanName.toLowerCase().includes('granada') ? cleanName : `${cleanName} en Granada`;
}

export function isPastEvent(event: Event, fromDate: Date = new Date()): boolean {
  const today = new Date(fromDate);
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate < today;
}

export function getEventTicketIntentLabel(event: Event, locale: Locale, t: Translate): string {
  const status = getPriceStatus(event);
  if (locale === 'en') {
    if (status === 'free') return 'Free entry';
    if (status === 'paid') return `Tickets from ${formatPriceLabel(event, t)}`;
    return 'Check tickets';
  }
  if (status === 'free') return 'Entrada libre';
  if (status === 'paid') return `Entradas desde ${formatPriceLabel(event, t)}`;
  return 'Consultar entradas';
}
