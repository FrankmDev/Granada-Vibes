// ============================================================
// Central data barrel — re-exports all domain query helpers.
// Import from '@data' everywhere in the app.
// ============================================================

// Events
export {
  events,
  getAllEvents,
  getFeaturedEvents,
  getEventsByCategory,
  getEventsByNeighborhood,
  getEventBySlug,
  getUpcomingEvents,
  getEventsByTag,
} from './events';

// Routes
export {
  routes,
  getAllRoutes,
  getFeaturedRoutes,
  getRoutesByCategory,
  getRoutesByNeighborhood,
  getRouteBySlug,
} from './routes';

// Semana Santa
export {
  getSemanaSantaData,
  getMeta,
  getAllDays,
  getAllPasos,
  getPasosByDay,
  getFeaturedPasos,
  getPasoBySlug,
  getCofradiaById,
  getAllCofradiasByDay,
} from './semana-santa';
