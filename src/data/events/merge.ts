import type { EventInput } from './types.js';

function mergeEvent(existing: EventInput, curated: EventInput): EventInput {
  const highlights = curated.highlights ?? existing.highlights;
  const tips = curated.tips ?? existing.tips;
  const venueDescription = curated.venueDescription ?? existing.venueDescription;
  const longDescription = curated.longDescription ?? existing.longDescription;
  const whatToBring = curated.whatToBring ?? existing.whatToBring;
  const bestMonths = curated.bestMonths ?? existing.bestMonths;
  const price = curated.price ?? existing.price;
  const ticketsUrl = curated.ticketsUrl || existing.ticketsUrl;
  const image = curated.image || existing.image;
  const imageUrl = curated.imageUrl || existing.imageUrl;

  return {
    ...existing,
    ...curated,
    ...(price !== undefined ? { price } : {}),
    ...(ticketsUrl ? { ticketsUrl } : {}),
    ...(image ? { image } : {}),
    ...(imageUrl ? { imageUrl } : {}),
    ...(highlights ? { highlights } : {}),
    ...(tips ? { tips } : {}),
    ...(venueDescription ? { venueDescription } : {}),
    ...(longDescription ? { longDescription } : {}),
    ...(whatToBring ? { whatToBring } : {}),
    ...(bestMonths ? { bestMonths } : {}),
  };
}

export function mergeEventsBySlug(generatedEvents: EventInput[], curatedEvents: EventInput[]): EventInput[] {
  const eventMap = new Map<string, EventInput>();

  for (const event of generatedEvents) {
    eventMap.set(event.slug, event);
  }

  for (const event of curatedEvents) {
    const existing = eventMap.get(event.slug);
    eventMap.set(event.slug, existing ? mergeEvent(existing, event) : event);
  }

  return Array.from(eventMap.values());
}
