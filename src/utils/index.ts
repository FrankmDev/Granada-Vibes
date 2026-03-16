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
  getEventMetaDescription,
  getRouteMetaDescription,
  getOgImageUrl,
} from './seo';

// Route utilities
export {
  difficultyConfig,
  getDifficultyBars,
} from './routes';
