import type { Event } from '@types';
import { shouldIndexEventDetail } from '../../utils/event-indexing.js';
import { events } from './repository.js';

function byDateAscending(a: Event, b: Event): number {
  return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}

export function getIndexableEvents(fromDate: Date = new Date()): Event[] {
  return events
    .filter((event) => shouldIndexEventDetail(event, fromDate))
    .slice()
    .sort(byDateAscending);
}
