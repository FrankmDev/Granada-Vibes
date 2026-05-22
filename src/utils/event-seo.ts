import type { Event, Locale } from '@types';
import { formatFullDate, formatTime } from './dates';
import { formatPriceLabel, getPriceStatus } from './prices';

type Translate = (key: string, vars?: Record<string, string | number>) => string;

function clampMetaDescription(value: string): string {
  if (value.length <= 158) return value;
  return `${value.slice(0, 155).trim()}...`;
}

function cleanEventName(name: string): string {
  return name
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

export function getEventSeoTitle(event: Event, locale: Locale): string {
  const date = compactDateLabel(event.date, locale);
  const isConcert = event.category === 'concert';
  const name = compactEventName(event.title[locale], isConcert ? 28 : 24);

  if (locale === 'en') {
    if (isConcert) {
      return `${name}: tickets Granada ${date}`;
    }
    return `${name}: Granada ${date}`;
  }

  if (isConcert) {
    return `${name}: entradas Granada ${date}`;
  }
  return `${name}: Granada ${date}`;
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
