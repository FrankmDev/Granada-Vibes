import { getAllEvents, getAllPosts, getAllRoutes } from '@data/index.js';
import { SITE_CONFIG } from '@config/site';
import { eventUrl, guideUrl, routeUrl, textResponse } from '@utils/ai-feed';

export const prerender = true;

function upcomingEventLinks(): string {
  return getAllEvents()
    .slice()
    .sort((left, right) => left.date.localeCompare(right.date) || left.time.localeCompare(right.time))
    .slice(0, 20)
    .map((event) => `- [${event.title.es}](${eventUrl(event.slug, 'es')}): ${event.date}, ${event.venue}`)
    .join('\n');
}

function routeLinks(): string {
  return getAllRoutes()
    .slice()
    .sort((left, right) => left.title.es.localeCompare(right.title.es))
    .slice(0, 20)
    .map((route) => `- [${route.title.es}](${routeUrl(route.slug, 'es')}): ${route.duration} min, ${route.distance} km`)
    .join('\n');
}

function guideLinks(): string {
  return getAllPosts()
    .slice()
    .sort((left, right) => right.publishDate.localeCompare(left.publishDate))
    .slice(0, 20)
    .map((post) => `- [${post.title.es}](${guideUrl(post.slug, 'es')}): ${post.description.es}`)
    .join('\n');
}

export function GET(): Response {
  const body = `# Granada Urban

Granada Urban es una guía cultural y turística de Granada con eventos actualizados, rutas locales, guías prácticas y planes por tiempo disponible.

## Páginas principales

- [Inicio](${SITE_CONFIG.url}/)
- [Eventos en Granada](${SITE_CONFIG.url}/eventos/)
- [Rutas por Granada](${SITE_CONFIG.url}/rutas/)
- [Guías de Granada](${SITE_CONFIG.url}/guias/)
- [Planificador](${SITE_CONFIG.url}/planifica/)
- [Events in Granada](${SITE_CONFIG.url}/en/events/)
- [Routes in Granada](${SITE_CONFIG.url}/en/routes/)
- [Granada guides in English](${SITE_CONFIG.url}/en/guides/)

## Datos estructurados para agentes

- [Índice de feeds](${SITE_CONFIG.url}/ai/index.json)
- [Eventos JSON](${SITE_CONFIG.url}/ai/events.json)
- [Rutas JSON](${SITE_CONFIG.url}/ai/routes.json)
- [Guías JSON](${SITE_CONFIG.url}/ai/guides.json)
- [Resumen Markdown](${SITE_CONFIG.url}/ai/granada-urban.md)
- [Sitemap XML](${SITE_CONFIG.url}/sitemap-index.xml)

## Eventos próximos

${upcomingEventLinks()}

## Rutas recomendadas

${routeLinks()}

## Guías

${guideLinks()}

## Contacto

${SITE_CONFIG.email}
`;

  return textResponse(body);
}
