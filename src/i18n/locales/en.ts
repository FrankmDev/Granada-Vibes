import type { Translations } from './es';

export const en: Translations = {
  // Navigation
  nav: {
    home: 'Home',
    events: 'Events',
    routes: 'Routes',
    about: 'About us',
  },

  // Common actions
  actions: {
    viewAll: 'View all',
    viewDetails: 'View details',
    viewMore: 'View more',
    learnMore: 'Learn more',
    getTickets: 'Get tickets',
    share: 'Share',
    save: 'Save',
    filter: 'Filter',
    sort: 'Sort',
    search: 'Search',
    clear: 'Clear',
    apply: 'Apply',
    close: 'Close',
    back: 'Back',
  },

  // Categories
  categories: {
    all: 'All',
    concert: 'Concert',
    exhibition: 'Exhibition',
    festival: 'Festival',
    market: 'Market',
    theater: 'Theater',
    workshop: 'Workshop',
    'guided-tour': 'Guided tour',
    viewpoint: 'Viewpoints',
    tapas: 'Tapas',
    monuments: 'Monuments',
    hiking: 'Hiking',
    photography: 'Photography',
    secrets: 'Secret spots',
    history: 'History',
    flamenco: 'Flamenco',
  },

  // Difficulty levels
  difficulty: {
    easy: 'Easy',
    moderate: 'Moderate',
    challenging: 'Challenging',
    expert: 'Expert',
  },

  // Time of day
  timeOfDay: {
    morning: 'Morning',
    afternoon: 'Afternoon',
    sunset: 'Sunset',
    evening: 'Evening',
    any: 'Any time',
  },

  // Neighborhoods
  neighborhoods: {
    albaicin: 'Albaicín',
    sacromonte: 'Sacromonte',
    centro: 'City Center',
    realejo: 'Realejo',
    alhambra: 'Alhambra',
    cartuja: 'Cartuja',
    ronda: 'Ronda',
  },

  // Events page
  events: {
    title: 'Cultural events',
    subtitle: 'Discover the best of Granada\'s cultural scene',
    upcoming: 'Upcoming events',
    featured: 'Featured',
    noEvents: 'No events match your filters',
    filters: {
      title: 'Filter events',
      category: 'Category',
      date: 'Date',
      neighborhood: 'Neighborhood',
      price: 'Price',
    },
    free: 'Free',
    fromPrice: 'From {{price}}€',
  },

  // Routes page
  routes: {
    title: 'Routes through Granada',
    subtitle: 'Explore the city with our curated routes',
    featured: 'Featured routes',
    duration: '{{minutes}} min',
    distance: '{{km}} km',
    difficultyLabel: 'Difficulty',
    bestTime: 'Best time',
    highlights: 'Highlights',
    tips: 'Tips',
    noRoutes: 'No routes match your filters',
  },

  // Home page
  home: {
    hero: {
      title: 'Discover the soul of Granada',
      subtitle: 'Your smart cultural guide to the city of the Alhambra',
      ctaEvents: 'View events',
      ctaRoutes: 'Explore routes',
    },
    featuredEvents: 'Featured events',
    featuredRoutes: 'Recommended routes',
    discoverMore: 'Discover more',
  },

  // About page
  about: {
    title: 'About Granada Vibes',
    mission: {
      title: 'Our mission',
      description:
        'To connect visitors and locals with Granada\'s rich culture, facilitating the discovery of events, routes, and authentic experiences that celebrate the unique essence of this city.',
    },
    values: {
      title: 'Our values',
      authentic: {
        title: 'Authenticity',
        description: 'We promote genuine experiences, away from tourist traps.',
      },
      quality: {
        title: 'Curated quality',
        description: 'Every event and route is carefully selected by our team.',
      },
      community: {
        title: 'Community',
        description: 'We support local creators and businesses in the city.',
      },
    },
  },

  // Footer
  footer: {
    tagline: 'Your cultural guide to Granada',
    links: {
      explore: 'Explore',
      company: 'Company',
      legal: 'Legal',
    },
    copyright: '© {{year}} Granada Vibes. All rights reserved.',
  },

  // Meta
  meta: {
    siteName: 'Granada Vibes',
    defaultDescription:
      'Your smart cultural guide to Granada. Discover events, routes, and unique experiences in the city of the Alhambra.',
  },
};
