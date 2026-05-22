import type { Event } from '@types';
import generatedRaw from './generated.json';
import { historicalEvents } from './historical.js';
import { mockEvents } from './mock.js';
import { mergeEventsBySlug } from './merge.js';
import { normalizeEvent } from './normalization.js';
import type { EventInput } from './types.js';

const generatedEvents = generatedRaw as EventInput[];

export const events: Event[] = mergeEventsBySlug(
  mergeEventsBySlug(generatedEvents, historicalEvents),
  mockEvents
).map(normalizeEvent);
