import { getAllEvents, getAllPosts, getAllRoutes } from '@data/index.js';
import { SITE_CONFIG } from '@config/site';
import { getAiFeedMeta, jsonResponse } from '@utils/ai-feed';

export const prerender = true;

export function GET(): Response {
  return jsonResponse({
    meta: getAiFeedMeta('Machine-readable index for Granada Urban content feeds.'),
    feeds: [
      {
        name: 'Events',
        url: `${SITE_CONFIG.url}/ai/events.json`,
        description: 'Upcoming events in Granada with dates, venues, prices, images and canonical URLs.',
        count: getAllEvents().length,
      },
      {
        name: 'Routes',
        url: `${SITE_CONFIG.url}/ai/routes.json`,
        description: 'Curated walking routes and time-based plans around Granada.',
        count: getAllRoutes().length,
      },
      {
        name: 'Guides',
        url: `${SITE_CONFIG.url}/ai/guides.json`,
        description: 'Editorial guides about Granada, Alhambra, tapas, viewpoints, neighborhoods and practical planning.',
        count: getAllPosts().length,
      },
      {
        name: 'Markdown summary',
        url: `${SITE_CONFIG.url}/ai/granada-urban.md`,
        description: 'Human-readable Markdown summary for AI agents and answer engines.',
      },
      {
        name: 'Sitemap',
        url: `${SITE_CONFIG.url}/sitemap-index.xml`,
        description: 'Canonical XML sitemap for search engines.',
      },
    ],
  });
}
