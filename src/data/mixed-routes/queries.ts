import type { MixedRoute, TimeDuration } from '@types';
import { mixedRoutes } from './data.js';

export function getAllMixedRoutes(): MixedRoute[] {
  return mixedRoutes;
}

export function getMixedRouteBySlug(slug: string): MixedRoute | undefined {
  return mixedRoutes.find((r) => r.slug === slug);
}

export function getMixedRouteByDuration(duration: TimeDuration): MixedRoute | undefined {
  return mixedRoutes.find((r) => r.duration === duration);
}
