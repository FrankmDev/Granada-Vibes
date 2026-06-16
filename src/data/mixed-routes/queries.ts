import type { MixedRoute } from '@types';
import { mixedRoutes } from './data.js';

export function getAllMixedRoutes(): MixedRoute[] {
  return mixedRoutes;
}
