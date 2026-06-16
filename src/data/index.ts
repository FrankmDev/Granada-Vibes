// ============================================================
// Central data barrel — re-exports all domain query helpers.
// Import from '@data' everywhere in the app.
// ============================================================

// Events
export {
  getEventBySlug,
  getIndexableEvents,
} from './events/index.js';

// Routes
export {
  routes,
  getAllRoutes,
  getFeaturedRoutes,
  getRouteBySlug,
} from './routes/index.js';

// Mixed Routes (Time-based plans)
export {
  mixedRoutes,
  getAllMixedRoutes,
} from './mixed-routes/index.js';

// Blog
export {
  posts,
  getAllPosts,
  getFeaturedPosts,
  getPostBySlug,
  getRelatedPosts,
} from './blog/index.js';

// Lugares (Planner)
export { lugares } from './lugares.js';

// Directory entries
export {
  getDirectoryHref,
  getIndexableVenueEntries,
} from './directories.js';
