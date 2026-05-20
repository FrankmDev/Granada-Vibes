import type { Event } from '@types';
import generatedRaw from './generated.json';
import { mockEvents } from './mock.js';
import { mergeEventsBySlug } from './merge.js';
import { normalizeEvent } from './normalization.js';
import type { EventInput } from './types.js';

const generatedEvents = generatedRaw as EventInput[];
const madridDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Madrid',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function getTodayString(): string {
  return madridDateFormatter.format(new Date());
}

function getEventEndDate(event: Event): string {
  return event.endDate ?? event.date;
}

export const events: Event[] = mergeEventsBySlug(generatedEvents, mockEvents)
  .map(normalizeEvent)
  .filter((event) => getEventEndDate(event) >= getTodayString());
