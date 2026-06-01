import type { Event, EventCategory, Locale, LocalizedText, Neighborhood } from '@types';
import { slugify } from '@utils/slugs';
import { clampMetaDescription } from '@utils/seo-text';
import { getIndexableEvents } from './events/queries.js';

export interface VenueDirectoryEntry {
  slug: string;
  name: string;
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  events: Event[];
  upcomingEvents: Event[];
  pastEvents: Event[];
  neighborhoods: Neighborhood[];
  categories: EventCategory[];
}

export interface ArtistDirectoryEntry {
  slug: string;
  name: string;
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  events: Event[];
  upcomingEvents: Event[];
  pastEvents: Event[];
  venues: string[];
}

const madridDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Madrid',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const VENUE_ALIASES: Record<string, { slug: string; name: string }> = {
  'sala industrial copera': { slug: 'industrial-copera', name: 'Industrial Copera' },
  'industrial copera': { slug: 'industrial-copera', name: 'Industrial Copera' },
  'el tren': { slug: 'sala-el-tren', name: 'Sala El Tren' },
  'sala el tren': { slug: 'sala-el-tren', name: 'Sala El Tren' },
  'plaza de toros': { slug: 'plaza-de-toros-granada', name: 'Plaza de Toros de Granada' },
  'plaza de toros de granada': { slug: 'plaza-de-toros-granada', name: 'Plaza de Toros de Granada' },
  'palacio de congresos de granada': { slug: 'palacio-de-congresos-granada', name: 'Palacio de Congresos de Granada' },
  'palacio de congresos': { slug: 'palacio-de-congresos-granada', name: 'Palacio de Congresos de Granada' },
};

const ARTIST_PREFIX_PATTERN = /^(?:1001 músicas\s*-\s*caixabank|milnoff|dee fest)\s*[:|]\s*/i;

function todayString(): string {
  return madridDateFormatter.format(new Date());
}

function eventEndDate(event: Event): string {
  return event.endDate ?? event.date;
}

function isUpcomingEvent(event: Event): boolean {
  return eventEndDate(event) >= todayString();
}

function uniqueValues<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function normalizeLookup(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sortEventsByDate(a: Event, b: Event): number {
  return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
}

function compactName(name: string, maxLength = 30): string {
  if (name.length <= maxLength) return name;
  const truncated = name.slice(0, maxLength - 1).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  return `${(lastSpace > 18 ? truncated.slice(0, lastSpace) : truncated).trim()}...`;
}

function compactTitle(name: string, suffix: string, maxLength = 54): string {
  const fullTitle = `${name}${suffix}`;
  if (fullTitle.length <= maxLength) return fullTitle;
  return `${compactName(name, maxLength - suffix.length)}${suffix}`;
}

function formatDirectoryDate(date: string, locale: Locale): string {
  const [year, month, day] = date.split('-');
  if (!year || !month || !day) return date;

  if (locale === 'en') {
    return new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return `${day}/${month}/${year}`;
}

function directoryEvents(): Event[] {
  return getIndexableEvents().slice().sort(sortEventsByDate);
}

function getVenueIdentity(venue: string): { slug: string; name: string } {
  const normalized = normalizeLookup(venue);
  const alias = VENUE_ALIASES[normalized];
  if (alias) return alias;

  return {
    slug: slugify(venue).replace(/^sala-/, ''),
    name: venue,
  };
}

function cleanArtistName(event: Event): string {
  const performer = event.performer?.es?.trim();
  const raw = performer && performer.length > 0 ? performer : event.title.es;

  return raw
    .replace(ARTIST_PREFIX_PATTERN, '')
    .replace(/\s+en\s+granada$/i, '')
    .replace(/\s+\|\s+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/[.。]+$/g, '')
    .trim();
}

function getArtistIdentity(event: Event): { slug: string; name: string } {
  const name = cleanArtistName(event);
  return {
    slug: slugify(name),
    name,
  };
}

function venueDescription(entry: Pick<VenueDirectoryEntry, 'name' | 'events' | 'upcomingEvents' | 'categories'>): LocalizedText {
  const total = entry.events.length;
  const upcoming = entry.upcomingEvents.length;
  const nextEvent = entry.upcomingEvents[0];
  const nextDateEs = nextEvent ? formatDirectoryDate(nextEvent.date, 'es') : null;
  const nextDateEn = nextEvent ? formatDirectoryDate(nextEvent.date, 'en') : null;
  return {
    es: clampMetaDescription(
      nextEvent && nextDateEs
        ? `${entry.name} en Granada: próxima fecha el ${nextDateEs}, con ${upcoming} eventos activos, horarios, precios y contexto útil antes de ir.`
        : `${entry.name} en Granada: agenda cultural con ${upcoming} próximas fechas, precios, horarios y ${total} eventos registrados.`
    ),
    en: clampMetaDescription(
      nextEvent && nextDateEn
        ? `${entry.name} in Granada: next confirmed date on ${nextDateEn}, plus ${upcoming} active listings, prices, times and useful venue context.`
        : `${entry.name} in Granada: cultural agenda with ${upcoming} upcoming dates, prices, times and ${total} listed events.`
    ),
  };
}

function venueIntro(entry: Pick<VenueDirectoryEntry, 'name' | 'upcomingEvents' | 'categories'>): LocalizedText {
  const nextEvent = entry.upcomingEvents[0];
  const nextDateEs = nextEvent ? formatDirectoryDate(nextEvent.date, 'es') : null;
  const nextDateEn = nextEvent ? formatDirectoryDate(nextEvent.date, 'en') : null;
  return {
    es: nextEvent && nextDateEs
      ? `${entry.name} forma parte del circuito cultural activo de Granada. Aquí tienes la próxima fecha confirmada para ${nextDateEs}, los eventos ya publicados en este espacio y enlaces a cada ficha para revisar precios, horarios, tipo de plan y contexto local antes de decidir.`
      : `${entry.name} forma parte del mapa cultural de Granada. Esta página reúne las fechas activas publicadas para este espacio, sus categorías más habituales y enlaces directos a cada evento para revisar precios, horarios y contexto local.`,
    en: nextEvent && nextDateEn
      ? `${entry.name} is part of Granada's active cultural circuit. Here you have the next confirmed date on ${nextDateEn}, the live listings already published for this venue and direct links to each page so you can check price, timing, plan type and local context before deciding.`
      : `${entry.name} is part of Granada's cultural map. This page groups the active listings published for this venue, its most common categories and direct links to each event so you can review prices, timing and local context.`,
  };
}

function artistDescription(entry: Pick<ArtistDirectoryEntry, 'name' | 'events' | 'upcomingEvents'>): LocalizedText {
  const nextEvent = entry.upcomingEvents[0];
  const nextDateEs = nextEvent ? formatDirectoryDate(nextEvent.date, 'es') : null;
  const nextDateEn = nextEvent ? formatDirectoryDate(nextEvent.date, 'en') : null;
  return {
    es: clampMetaDescription(
      nextEvent && nextDateEs
        ? `${entry.name} en Granada: próxima fecha el ${nextDateEs} en ${nextEvent.venue}, con entradas, contexto del concierto y más planes musicales relacionados.`
        : `${entry.name} en Granada: ${entry.upcomingEvents.length} próximas fechas, entradas, salas y eventos relacionados en la agenda musical local.`
    ),
    en: clampMetaDescription(
      nextEvent && nextDateEn
        ? `${entry.name} in Granada: next date on ${nextDateEn} at ${nextEvent.venue}, with ticket context, venue details and related music plans.`
        : `${entry.name} in Granada: ${entry.upcomingEvents.length} upcoming dates, tickets, venues and related events in the local music agenda.`
    ),
  };
}

function artistIntro(entry: Pick<ArtistDirectoryEntry, 'name' | 'venues' | 'upcomingEvents'>): LocalizedText {
  const venues = entry.venues.slice(0, 3).join(', ');
  const nextEvent = entry.upcomingEvents[0];
  const nextDateEs = nextEvent ? formatDirectoryDate(nextEvent.date, 'es') : null;
  const nextDateEn = nextEvent ? formatDirectoryDate(nextEvent.date, 'en') : null;
  return {
    es: nextEvent && nextDateEs
      ? `Ficha de ${entry.name} en GRN URBAN: próxima fecha en Granada el ${nextDateEs}${nextEvent.venue ? ` en ${nextEvent.venue}` : ''}, con acceso rápido a la información del concierto, entradas cuando existan, recintos relacionados y otros planes musicales de la misma escena.${venues ? ` Salas frecuentes: ${venues}.` : ''}`
      : `Ficha de ${entry.name} en GRN URBAN: fechas en Granada, recintos, entradas cuando estén disponibles y eventos similares para seguir explorando la agenda musical local.${venues ? ` Salas frecuentes: ${venues}.` : ''}`,
    en: nextEvent && nextDateEn
      ? `${entry.name} on GRN URBAN: next Granada date on ${nextDateEn}${nextEvent.venue ? ` at ${nextEvent.venue}` : ''}, with direct access to the live listing, tickets when available, related venues and similar music plans across the local scene.${venues ? ` Frequent venues: ${venues}.` : ''}`
      : `${entry.name} on GRN URBAN: Granada dates, venues, tickets when available and similar events to keep exploring the local music agenda.${venues ? ` Frequent venues: ${venues}.` : ''}`,
  };
}

export function getAllVenueEntries(): VenueDirectoryEntry[] {
  const grouped = new Map<string, { name: string; events: Event[] }>();

  for (const event of directoryEvents()) {
    const identity = getVenueIdentity(event.venue);
    const group = grouped.get(identity.slug) ?? { name: identity.name, events: [] };
    group.events.push(event);
    grouped.set(identity.slug, group);
  }

  return Array.from(grouped.entries())
    .map(([slug, group]) => {
      const groupedEvents = group.events.slice().sort(sortEventsByDate);
      const upcomingEvents = groupedEvents.filter(isUpcomingEvent);
      const pastEvents = groupedEvents.filter((event) => !isUpcomingEvent(event));
      const categories = uniqueValues(groupedEvents.map((event) => event.category));
      const neighborhoods = uniqueValues(groupedEvents.map((event) => event.neighborhood));
      const base = {
        slug,
        name: group.name,
        title: {
          es: compactTitle(group.name, ': eventos en Granada'),
          en: compactTitle(group.name, ': events in Granada'),
        },
        events: groupedEvents,
        upcomingEvents,
        pastEvents,
        categories,
        neighborhoods,
      };

      return {
        ...base,
        description: venueDescription(base),
        intro: venueIntro(base),
      };
    })
    .sort((a, b) => b.events.length - a.events.length || a.name.localeCompare(b.name));
}

export function getVenueEntryBySlug(slug: string): VenueDirectoryEntry | undefined {
  return getAllVenueEntries().find((entry) => entry.slug === slug);
}

export function getAllArtistEntries(): ArtistDirectoryEntry[] {
  const grouped = new Map<string, { name: string; events: Event[] }>();

  for (const event of directoryEvents()) {
    if (event.category !== 'concert') continue;
    const identity = getArtistIdentity(event);
    if (!identity.slug || !identity.name) continue;
    const group = grouped.get(identity.slug) ?? { name: identity.name, events: [] };
    group.events.push(event);
    grouped.set(identity.slug, group);
  }

  return Array.from(grouped.entries())
    .map(([slug, group]) => {
      const groupedEvents = group.events.slice().sort(sortEventsByDate);
      const upcomingEvents = groupedEvents.filter(isUpcomingEvent);
      const pastEvents = groupedEvents.filter((event) => !isUpcomingEvent(event));
      const venues = uniqueValues(groupedEvents.map((event) => event.venue));
      const base = {
        slug,
        name: group.name,
        title: {
          es: compactTitle(group.name, ': conciertos en Granada'),
          en: compactTitle(group.name, ': concerts in Granada'),
        },
        events: groupedEvents,
        upcomingEvents,
        pastEvents,
        venues,
      };

      return {
        ...base,
        description: artistDescription(base),
        intro: artistIntro(base),
      };
    })
    .sort((a, b) => b.events.length - a.events.length || a.name.localeCompare(b.name));
}

export function getArtistEntryBySlug(slug: string): ArtistDirectoryEntry | undefined {
  return getAllArtistEntries().find((entry) => entry.slug === slug);
}

export function getDirectoryHref(kind: 'artist' | 'venue', slug: string, locale: Locale): string {
  if (kind === 'artist') {
    return locale === 'en' ? `/en/artists/${slug}/` : `/artistas/${slug}/`;
  }
  return locale === 'en' ? `/en/venues/${slug}/` : `/salas/${slug}/`;
}
