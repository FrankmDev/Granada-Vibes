import type { Event, EventCategory, Locale, LocalizedText, Neighborhood } from '@types';
import { slugify } from '@utils/slugs';
import { events } from './events/repository.js';

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

function compactTitle(name: string, suffix: string, maxLength = 60): string {
  const fullTitle = `${name}${suffix}`;
  if (fullTitle.length <= maxLength) return fullTitle;
  return `${compactName(name, maxLength - suffix.length)}${suffix}`;
}

function directoryEvents(): Event[] {
  return events.slice().sort(sortEventsByDate);
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
  return {
    es: `${entry.name}: próximos eventos, conciertos, entradas, horarios y agenda cultural en Granada. ${upcoming} próximas fechas y ${total} eventos registrados en GRN Urban.`,
    en: `${entry.name}: upcoming events, concerts, tickets, times and cultural agenda in Granada. ${upcoming} upcoming dates and ${total} listed events on GRN Urban.`,
  };
}

function venueIntro(entry: Pick<VenueDirectoryEntry, 'name' | 'upcomingEvents' | 'categories'>): LocalizedText {
  return {
    es: `${entry.name} forma parte del mapa cultural de Granada. Esta página agrupa su agenda actualizada, próximos eventos, precios visibles, horarios y enlaces a fichas con información práctica para decidir rápido.`,
    en: `${entry.name} is part of Granada's cultural map. This page groups its updated agenda, upcoming events, visible prices, times and links to listings with practical information for quick decisions.`,
  };
}

function artistDescription(entry: Pick<ArtistDirectoryEntry, 'name' | 'events' | 'upcomingEvents'>): LocalizedText {
  return {
    es: `${entry.name} en Granada: próximos conciertos, entradas, fechas, salas y eventos relacionados. ${entry.upcomingEvents.length} próximas fechas y ${entry.events.length} eventos registrados.`,
    en: `${entry.name} in Granada: upcoming concerts, tickets, dates, venues and related events. ${entry.upcomingEvents.length} upcoming dates and ${entry.events.length} listed events.`,
  };
}

function artistIntro(entry: Pick<ArtistDirectoryEntry, 'name' | 'venues' | 'upcomingEvents'>): LocalizedText {
  const venues = entry.venues.slice(0, 3).join(', ');
  return {
    es: `Ficha de ${entry.name} en GRN Urban: fechas en Granada, recintos, entradas cuando estén disponibles y eventos similares para seguir explorando la agenda musical local.${venues ? ` Recintos relacionados: ${venues}.` : ''}`,
    en: `${entry.name} on GRN Urban: Granada dates, venues, tickets when available and similar events to keep exploring the local music agenda.${venues ? ` Related venues: ${venues}.` : ''}`,
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
