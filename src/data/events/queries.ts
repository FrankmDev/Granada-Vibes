import type { Event, EventCategory, Neighborhood } from '@types';
import { mockEvents } from './mock.js';
import generatedRaw from './generated.json';
import { eventOverrides } from './overrides.js';

// ═══════════════════════════════════════════════════════════════
// PRICE EXTRACTION — generated events often lack price fields,
// but many mention it inside description / longDescription.
// ═══════════════════════════════════════════════════════════════
function extractPriceFromDescription(text: string): number | null | undefined {
  if (!text) return undefined;
  const lower = text.toLowerCase();

  // Explicitly free
  if (/\b(gratis|entrada libre|entrada gratuita|acceso libre|acceso gratuito|de balde)\b/.test(lower)) {
    return null; // null in our schema means "free"
  }

  const patterns = [
    /desde\s+(\d+)[\s]*€/i,
    /a partir de\s+(\d+)[\s]*€/i,
    /precio[\s:]+(\d+)[\s]*€/i,
    /(\d+)[\s]*€/,
    /(\d+)[\s]*euros?\b/i,
    /(\d+)[\s]*eur\b/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return parseInt(match[1]!, 10);
    }
  }

  return undefined; // genuinely unknown
}

const generatedEvents = (generatedRaw as Event[]).map((e) => ({
  ...e,
  image: e.image ?? e.imageUrl,
}));

// Merge generated + mock events by slug.
// Mock events overlay generated ones: they carry curated fields (price, ticketsUrl,
// highlights, tips, images) while generated events bring source metadata.
const eventMap = new Map<string, Event>();

generatedEvents.forEach((e) => eventMap.set(e.slug, e));

mockEvents.forEach((e) => {
  const existing = eventMap.get(e.slug);
  if (existing) {
    eventMap.set(
      e.slug,
      {
        ...existing,
        ...e,
        // Preserve mock price when generated lacks it (null/undefined)
        price: e.price ?? existing.price,
        // Preserve mock ticket URL when generated lacks it
        ticketsUrl: e.ticketsUrl || existing.ticketsUrl,
        // Preserve richer mock image if generated has none
        image: e.image || existing.image,
        imageUrl: e.imageUrl || existing.imageUrl,
        // Preserve curated content fields if mock has them
        highlights: e.highlights || existing.highlights,
        tips: e.tips || existing.tips,
        venueDescription: e.venueDescription || existing.venueDescription,
        longDescription: e.longDescription || existing.longDescription,
        whatToBring: e.whatToBring || existing.whatToBring,
        bestMonths: e.bestMonths || existing.bestMonths,
      } as Event
    );
  } else {
    eventMap.set(e.slug, e);
  }
});

// Apply manual overrides + price extraction for generated events
const events = Array.from(eventMap.values()).map((e) => {
  let event = { ...e } as Event;

  // 1. Apply manual overrides FIRST (they may add rich descriptions with prices)
  const override = eventOverrides[event.slug];
  if (override) {
    event = { ...event, ...override } as Event;
  }

  // 2. THEN try to extract price from the enriched description for events that still lack it
  // This runs after overrides so that any longDescription containing price info is captured.
  if (event.price == null && event.source !== 'mock') {
    const descriptionText =
      event.description?.es ||
      event.description?.en ||
      event.longDescription?.es ||
      event.longDescription?.en ||
      '';
    const extracted = extractPriceFromDescription(descriptionText);
    if (extracted !== undefined) {
      event = { ...event, price: extracted };
    }
  }

  return event;
});

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
