import type { Neighborhood } from '@types';
import type { EventInput, EventVenueRule } from './types.js';

function normalizeVenueName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function venueMatches(...aliases: string[]): (event: EventInput) => boolean {
  const normalizedAliases = aliases.map(normalizeVenueName);

  return (event) => {
    const venue = normalizeVenueName(event.venue);
    return normalizedAliases.some((alias) => venue === alias || venue.includes(alias));
  };
}

function venueRule(
  id: string,
  aliases: string[],
  patch: {
    canonicalVenue?: string;
    neighborhood?: Neighborhood;
    address?: string;
  }
): EventVenueRule {
  return {
    id,
    matches: venueMatches(...aliases),
    apply: (event) => ({
      venue: patch.canonicalVenue ?? event.venue,
      ...(patch.neighborhood ? { neighborhood: patch.neighborhood } : {}),
      ...(patch.address && !event.address ? { address: patch.address } : {}),
    }),
  };
}

const eventVenueRules: EventVenueRule[] = [
  venueRule('lemon-rock', ['lemon rock', 'lemonrock'], {
    canonicalVenue: 'Lemon Rock',
    neighborhood: 'centro',
    address: 'Calle Montalbán, 6',
  }),
  venueRule('industrial-copera', ['industrial copera', 'sala industrial copera', 'copera'], {
    canonicalVenue: 'Industrial Copera',
    neighborhood: 'zaidin',
  }),
  venueRule('sala-el-tren', ['sala el tren', 'el tren'], {
    canonicalVenue: 'Sala El Tren',
    neighborhood: 'centro',
  }),
];

export function applyVenueRules(event: EventInput): EventInput {
  return eventVenueRules.reduce<EventInput>((current, rule) => {
    if (!rule.matches(current)) return current;

    return {
      ...current,
      ...rule.apply(current, { source: current.source === 'mock' ? 'mock' : 'generated' }),
    };
  }, event);
}
