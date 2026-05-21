import { getAllEvents } from '@data/index.js';
import { getAiFeedMeta, jsonResponse, toAiEventFeedItem } from '@utils/ai-feed';

export const prerender = true;

export function GET(): Response {
  const events = getAllEvents()
    .slice()
    .sort((left, right) => left.date.localeCompare(right.date) || left.time.localeCompare(right.time))
    .map(toAiEventFeedItem);

  return jsonResponse({
    meta: getAiFeedMeta('Upcoming events in Granada from Granada Urban. Includes dates, venues, prices, categories, images and canonical URLs.'),
    count: events.length,
    events,
  });
}
