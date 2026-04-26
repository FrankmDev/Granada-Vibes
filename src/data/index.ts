// ============================================================
// Central data barrel — re-exports all domain query helpers.
// Import from '@data' everywhere in the app.
// ============================================================

// Events
export {
  mockEvents,
  getAllEvents,
  getFeaturedEvents,
  getEventsByCategory,
  getEventsByNeighborhood,
  getEventBySlug,
  getUpcomingEvents,
  getEventsByTag,
} from './events/index.js';

// Routes
export {
  routes,
  getAllRoutes,
  getFeaturedRoutes,
  getRoutesByCategory,
  getRoutesByNeighborhood,
  getRouteBySlug,
} from './routes/index.js';

// Mixed Routes (Time-based plans)
export {
  mixedRoutes,
  getAllMixedRoutes,
  getMixedRouteBySlug,
  getMixedRouteByDuration,
} from './mixed-routes/index.js';

// Blog
export {
  posts,
  getAllPosts,
  getFeaturedPosts,
  getPostsByCategory,
  getPostBySlug,
  getRelatedPosts,
  getPostsByTag,
} from './blog/index.js';

// Lugares (Planner)
export { lugares } from './lugares.js';
