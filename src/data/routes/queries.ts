import type { Route, RouteCategory, Neighborhood } from '@types';
import { routes } from './data';

export function getAllRoutes(): Route[] {
  return routes;
}

export function getFeaturedRoutes(): Route[] {
  return routes.filter((r) => r.featured);
}

export function getRoutesByCategory(category: RouteCategory): Route[] {
  return routes.filter((r) => r.category === category);
}

export function getRoutesByNeighborhood(neighborhood: Neighborhood): Route[] {
  return routes.filter((r) => r.neighborhoods.includes(neighborhood));
}

export function getRouteBySlug(slug: string): Route | undefined {
  return routes.find((r) => r.slug === slug);
}
