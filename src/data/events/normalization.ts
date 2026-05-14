import type { Event } from '@types';
import type { EventInput } from './types.js';
import { eventOverrides } from './overrides.js';
import { extractPriceFromText, getEventSearchableText } from './price.js';
import { applyVenueRules } from './venue-rules.js';

function withImageAlias(event: EventInput): EventInput {
  const image = event.image ?? event.imageUrl;
  return image ? { ...event, image } : event;
}

function applyManualOverride(event: EventInput): EventInput {
  const override = eventOverrides[event.slug];
  return override ? { ...event, ...override } : event;
}

function withExtractedPrice(event: EventInput): EventInput {
  const canInferPrice = event.price === undefined || (event.price === null && event.source !== 'mock');
  if (!canInferPrice) return event;

  const extracted = extractPriceFromText(getEventSearchableText(event));
  return extracted !== undefined ? { ...event, price: extracted } : event;
}

function ensureRequiredDefaults(event: EventInput): Event {
  return {
    ...event,
    price: event.price ?? null,
    currency: event.currency ?? 'EUR',
    tags: event.tags ?? [],
    featured: event.featured ?? false,
  };
}

export function normalizeEvent(event: EventInput): Event {
  return ensureRequiredDefaults(
    withExtractedPrice(applyVenueRules(applyManualOverride(withImageAlias(event))))
  );
}
