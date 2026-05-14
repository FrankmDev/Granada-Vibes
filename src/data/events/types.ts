import type { Event } from '@types';

export type EventInput = Omit<Event, 'price'> & {
  price?: Event['price'];
};

export type EventPatch = Partial<Event>;

export interface EventBuildContext {
  source: 'generated' | 'mock';
}

export interface EventVenueRule {
  id: string;
  matches: (event: EventInput) => boolean;
  apply: (event: EventInput, context: EventBuildContext) => EventPatch;
}
