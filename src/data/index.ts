// Events
export {
  events,
  getAllEvents,
  getFeaturedEvents,
  getEventsByCategory,
  getEventsByNeighborhood,
  getEventBySlug,
} from './events/events';

// Routes
export {
  routes,
  getAllRoutes,
  getFeaturedRoutes,
  getRoutesByCategory,
  getRoutesByNeighborhood,
  getRouteBySlug,
} from './routes/routes';

import { events as _events } from './events/events';
import type { Event } from '@types';

/**
 * Get upcoming events (from today forward), sorted by date ascending.
 */
export function getUpcomingEvents(limit: number, fromDate: Date = new Date()): Event[] {
  const from = fromDate.toISOString().split('T')[0] as string;
  return _events
    .filter((e) => e.date >= from)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

/**
 * Get events that include a specific tag.
 */
export function getEventsByTag(tag: string): Event[] {
  return _events.filter((e) => e.tags.includes(tag));
}
