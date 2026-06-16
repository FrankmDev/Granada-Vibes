import type { Event } from '@types';

export type EventInput = Omit<Event, 'price'> & {
  price?: Event['price'];
};

type EventPatch = Partial<Event>;

interface EventBuildContext {
  source: 'generated' | 'mock';
}

export interface EventVenueRule {
  id: string;
  matches: (event: EventInput) => boolean;
  apply: (event: EventInput, context: EventBuildContext) => EventPatch;
}
