import type { Event, Route, Locale } from '@types';

export interface EventFilters {
  category?: string;
  neighborhood?: string;
  price?: 'free' | 'paid';
  when?: 'today' | 'week' | 'weekend' | 'month';
}

export interface RouteFilters {
  type?: string;
  difficulty?: string;
  duration?: 'short' | 'medium' | 'long';
  bestTime?: string;
}

// ── Date helpers ──────────────────────────────────────────────────────────────

export function isEventToday(event: Event): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate.getTime() === today.getTime();
}

export function isEventThisWeek(event: Event): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);
  const eventDate = new Date(event.date);
  return eventDate >= today && eventDate <= weekEnd;
}

export function isEventThisWeekend(event: Event): boolean {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSaturday = dayOfWeek === 0 ? 6 : 6 - dayOfWeek;
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

  const saturday = new Date(today);
  saturday.setDate(today.getDate() + daysUntilSaturday);
  saturday.setHours(0, 0, 0, 0);

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + daysUntilSunday);
  sunday.setHours(23, 59, 59, 999);

  const eventDate = new Date(event.date);
  return eventDate >= saturday && eventDate <= sunday;
}

export function isEventThisMonth(event: Event): boolean {
  const today = new Date();
  const eventDate = new Date(event.date);
  return (
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  );
}

// ── Filter functions ─────────────────────────────────────────────────────────

export function filterEvents(events: Event[], filters: EventFilters, _locale: Locale): Event[] {
  return events.filter((event) => {
    if (filters.category && event.category !== filters.category) return false;

    if (filters.neighborhood && event.neighborhood !== filters.neighborhood) return false;

    if (filters.price === 'free' && event.price !== null) return false;
    if (filters.price === 'paid' && event.price === null) return false;

    if (filters.when) {
      switch (filters.when) {
        case 'today':
          if (!isEventToday(event)) return false;
          break;
        case 'week':
          if (!isEventThisWeek(event)) return false;
          break;
        case 'weekend':
          if (!isEventThisWeekend(event)) return false;
          break;
        case 'month':
          if (!isEventThisMonth(event)) return false;
          break;
      }
    }

    return true;
  });
}

export function filterRoutes(routes: Route[], filters: RouteFilters, _locale: Locale): Route[] {
  return routes.filter((route) => {
    if (filters.type && route.category !== filters.type) return false;

    if (filters.difficulty && route.difficulty !== filters.difficulty) return false;

    if (filters.bestTime && route.timeOfDay !== filters.bestTime) return false;

    if (filters.duration) {
      const hours = route.duration / 60;
      switch (filters.duration) {
        case 'short':
          if (hours >= 2) return false;
          break;
        case 'medium':
          if (hours < 2 || hours > 4) return false;
          break;
        case 'long':
          if (hours <= 4) return false;
          break;
      }
    }

    return true;
  });
}
