import type { Event, EventCategory, Neighborhood } from '@types';
import { mockEvents } from './mock.js';
import generatedRaw from './generated.json';

const generatedEvents = generatedRaw as Event[];

const events: Event[] = generatedEvents.length > 0
  ? generatedEvents
  : mockEvents;

export function getAllEvents(): Event[] {
  return events;
}

export function getFeaturedEvents(): Event[] {
  return events.filter((e) => e.featured);
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return events.filter((e) => e.category === category);
}

export function getEventsByNeighborhood(neighborhood: Neighborhood): Event[] {
  return events.filter((e) => e.neighborhood === neighborhood);
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents(limit: number, fromDate: Date = new Date()): Event[] {
  const from = fromDate.toISOString().split('T')[0] as string;
  return events
    .filter((e) => e.date >= from)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function getEventsByTag(tag: string): Event[] {
  return events.filter((e) => e.tags.includes(tag));
}
