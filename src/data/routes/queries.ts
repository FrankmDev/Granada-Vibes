import type { Route } from '@types';
import { routes } from './data.js';

export function getAllRoutes(): Route[] {
  return routes;
}

export function getFeaturedRoutes(): Route[] {
  return routes.filter((r) => r.featured);
}

export function getRouteBySlug(slug: string): Route | undefined {
  return routes.find((r) => r.slug === slug);
}
