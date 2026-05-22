import type { Event, Locale } from '@types';
import { formatFullDate, formatTime } from './dates';
import { formatPriceLabel, getPriceStatus } from './prices';

type Translate = (key: string, vars?: Record<string, string | number>) => string;

function clampMetaDescription(value: string): string {
  if (value.length <= 158) return value;
  return `${value.slice(0, 155).trim()}...`;
}

export function getEventSeoTitle(event: Event, locale: Locale): string {
  const year = event.date.slice(0, 4);
  const isConcert = event.category === 'concert';

  if (locale === 'en') {
    if (isConcert) {
      return `${event.title.en} in Granada ${year}: tickets, time and venue`;
    }
    return `${event.title.en} in Granada: date, time, venue and price`;
  }

  if (isConcert) {
    return `${event.title.es} en Granada ${year}: entradas, horario y lugar`;
  }
  return `${event.title.es} en Granada: fecha, horario, lugar y precio`;
}

export function getEventSeoDescription(event: Event, locale: Locale, t: Translate): string {
  const price = formatPriceLabel(event, t);
  const date = formatFullDate(event.date, locale);
  const time = formatTime(event.time, locale);

  if (locale === 'en') {
    return clampMetaDescription(
      `${event.title.en} in Granada: ${date}, ${time}, ${event.venue}. Tickets or price: ${price}. Check location, details and related plans.`
    );
  }

  return clampMetaDescription(
    `${event.title.es} en Granada: ${date}, ${time}, ${event.venue}. Entradas o precio: ${price}. Consulta ubicación, detalles y planes relacionados.`
  );
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
