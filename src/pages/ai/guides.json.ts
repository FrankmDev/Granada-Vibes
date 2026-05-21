import { getAllPosts } from '@data/index.js';
import { getAiFeedMeta, jsonResponse, toAiGuideFeedItem } from '@utils/ai-feed';

export const prerender = true;

export function GET(): Response {
  const guides = getAllPosts().map(toAiGuideFeedItem);

  return jsonResponse({
    meta: getAiFeedMeta('Granada travel guides from Granada Urban. Includes local guides, practical advice, culture, routes, tapas and Alhambra planning.'),
    count: guides.length,
    guides,
  });
}
