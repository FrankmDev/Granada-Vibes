import { getAllRoutes } from '@data/index.js';
import { getAiFeedMeta, jsonResponse, toAiRouteFeedItem } from '@utils/ai-feed';

export const prerender = true;

export function GET(): Response {
  const routes = getAllRoutes()
    .slice()
    .sort((left, right) => left.title.es.localeCompare(right.title.es))
    .map(toAiRouteFeedItem);

  return jsonResponse({
    meta: getAiFeedMeta('Curated routes around Granada from Granada Urban. Includes duration, distance, neighborhoods, difficulty, highlights and canonical URLs.'),
    count: routes.length,
    routes,
  });
}
