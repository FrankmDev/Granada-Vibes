// Date utilities
export {
  formatDate,
  formatDateShort,
  formatTime,
  formatDuration,
  formatDistance,
  isUpcoming,
  sortByDate,
  sortByDateDesc,
  formatDateRange,
} from './dates';

// Path utilities
export {
  getLocalizedPath,
  getLocaleFromPath,
  getPathWithoutLocale,
  generateAlternatePaths,
} from './paths';

// Slug utilities
export {
  slugify,
  generateId,
} from './slugs';

// Filter utilities
export {
  filterEvents,
  filterRoutes,
  isEventToday,
  isEventThisWeek,
  isEventThisWeekend,
  isEventThisMonth,
} from './filters';

// SEO utilities
export {
  absoluteSiteUrl,
  getAlternateUrls,
  getEventMetaDescription,
  getEnglishPath,
  getRouteMetaDescription,
  getOgImageUrl,
  getSpanishPath,
  normalizeUrlPath,
  resolveOgImageUrl,
} from './seo';

export {
  buildSeoTitle,
  clampMetaDescription,
  normalizeSeoTitle,
} from './seo-text';

// Event SEO utilities
export {
  getEventDisplayTitle,
  getEventSeoDescription,
  getEventSeoTitle,
  getEventTicketIntentLabel,
  isPastEvent,
} from './event-seo';

export {
  shouldIndexEventDetail,
} from './event-indexing';

// Route utilities
export {
  difficultyConfig,
  getDifficultyBars,
} from './routes';

// String utilities
export { truncateTitle } from './strings';

// Price utilities
export { getPriceStatus, formatPriceLabel } from './prices';
