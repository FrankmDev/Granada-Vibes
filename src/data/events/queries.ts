import type { Event, EventCategory, Neighborhood } from '@types';
import { shouldIndexEventDetail } from '../../utils/event-indexing.js';
import { events } from './repository.js';

function byDateAscending(a: Event, b: Event): number {
  return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
}

export function getAllEvents(): Event[] {
  return events;
}

export function getFeaturedEvents(): Event[] {
  return events.filter((event) => event.featured);
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return events.filter((event) => event.category === category);
}

export function getEventsByNeighborhood(neighborhood: Neighborhood): Event[] {
  return events.filter((event) => event.neighborhood === neighborhood);
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}

export function getUpcomingEvents(limit: number, fromDate: Date = new Date()): Event[] {
  const from = fromDate.toISOString().split('T')[0];
  if (!from) return [];

  return events
    .filter((event) => event.date >= from)
    .slice()
    .sort(byDateAscending)
    .slice(0, limit);
}

export function getIndexableEvents(fromDate: Date = new Date()): Event[] {
  return events
    .filter((event) => shouldIndexEventDetail(event, fromDate))
    .slice()
    .sort(byDateAscending);
}

export function getEventsByTag(tag: string): Event[] {
  return events.filter((event) => event.tags.includes(tag));
}
