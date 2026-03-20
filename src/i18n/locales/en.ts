import type { Translations } from './es';

export const en: Translations = {
  // Navigation
  nav: {
    home: 'Home',
    events: 'Events',
    routes: 'Routes',
    blog: 'Blog',
    about: 'About us',
    changeLanguage: 'Switch to Español',
    skipToContent: 'Skip to main content',
    guideLabel: 'Cultural Guide',
    mainNavLabel: 'Main navigation',
    mobileNavLabel: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Switch language:',
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
    cinema: 'Cinema',
    other: 'Other',
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
    zaidin: 'Zaidín',
    otro: 'Other',
  },

  // Events page
  events: {
    title: 'Cultural events',
    subtitle: 'Discover the best of Granada\'s cultural scene',
    upcoming: 'Upcoming',
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

  // Detail pages (events & routes)
  detail: {
    date: 'Date',
    time: 'Time',
    price: 'Price',
    venue: 'Venue',
    share: 'Share',
    free: 'Free',
    unknown: 'Check details',
    whatToExpect: 'What to expect',
    practicalTips: 'Practical tips',
    tags: 'Tags',
    getTickets: 'Get tickets',
    mapComingSoon: 'Map coming soon',
    similarEvents: 'Similar events',
    similarRoutes: 'Similar routes',
    whatToBring: 'What to bring',
    bestMonths: 'Best months',
    addToPlan: 'Add to plan',
    confirmAttendance: 'Confirm attendance',
    bookPlace: 'Book a spot',
    difficulty: 'Difficulty',
    duration: 'Duration',
    distance: 'Distance',
    bestTime: 'Best time',
    shareSuccess: 'URL copied to clipboard',
    shareError: 'Could not share',
  },

  // Filters
  filters: {
    clearFilters: 'Clear filters',
    results: '{{count}} results',
    noResults: 'No results',
    noResultsDesc: 'Try different filters or browse all content.',
    all: 'All',
    anyDuration: 'Any duration',
    anyTime: 'Any time',
    onlyFree: 'Free only',
    difficulty: 'Difficulty',
    today: 'Today',
    thisWeek: 'This week',
    thisWeekend: 'This weekend',
    thisMonth: 'This month',
    short: 'Short (< 2h)',
    medium: 'Medium (2–4h)',
    long: 'Long (> 4h)',
  },

  // Home page
  home: {
    hero: {
      title: 'Discover the soul of Granada',
      badge: 'Cultural Guide',
      tagline: 'Discover the best events, secret routes and authentic culture of the city that captivates.',
      ctaEvents: 'Explore Events',
      ctaRoutes: 'View Routes',
      eventsTitle: 'Upcoming',
      eventsSubtitle: 'Events',
      scrollText: 'Discover more',
      statEvents: 'Events',
      statRoutes: 'Routes',
      statNeighborhoods: 'Neighborhoods',
      today: 'TODAY',
      tomorrow: 'TOMORROW',
      upcoming: 'UPCOMING',
      free: 'FREE',
    },
    featuredEvents: 'Featured events',
    featuredRoutes: 'Recommended routes',
    discoverMore: 'Discover more',
    exploreEvents: 'Explore events',
    exploreRoutes: 'Explore routes',
    stats: {
      years: '800+ years of history',
      heritage: '2 UNESCO Heritage sites',
      tapas: '48h to get lost',
      free: '0€ tapa included',
      yearsDesc: 'Since the founding',
      heritageDesc: 'World Heritage sites',
      tapasDesc: 'Of tapas and culture',
      freeDesc: 'With every drink',
    },
  },

  // Mixed Routes (Time-based plans)
  mixedRoutes: {
    title: 'Routes by time available',
    subtitle: 'Complete plans based on how much time you have in Granada. Curated by locals, mixing viewpoints, tapas, monuments and real experiences.',
    sectionTitle: 'How much time do you have?',
    sectionSubtitle: 'Granada adapts to you. Choose your time window and we\'ll give you the perfect plan.',
    viewPlan: 'View full plan',
    stops: 'stops',
    neighborhoods: 'neighborhoods',
    day: 'Day {{number}}',
    essentialTips: 'Essential tips',
    bestFor: 'Best for',
    durations: {
      '2h': '2 hours',
      '6h': '6 hours',
      '12h': '12 hours',
      '1day': '1 day',
      '2days': '2 days',
      '3days': '3 days',
    },
    stopCategories: {
      mirador: 'Viewpoint',
      tapas: 'Tapas',
      monumento: 'Monument',
      cultura: 'Culture',
      paseo: 'Walk',
      compras: 'Shopping',
      naturaleza: 'Nature',
      flamenco: 'Flamenco',
    },
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
      privacy: 'Privacy',
      legalNotice: 'Legal notice',
      contact: 'Contact',
    },
    explore: 'Explore',
    thisWeek: 'This week',
    contact: 'Contact',
    newsletter: 'Get the latest updates',
    newsletterPlaceholder: 'Your email',
    viewAllEvents: 'View all events',
    madeIn: 'Made with ❤ in Granada',
    copyright: '© {{year}} Granada Vibes. All rights reserved.',
    allRightsReserved: 'All rights reserved',
  },

  // Blog
  blog: {
    title: 'Blog',
    subtitle: 'Stories, guides and secrets of Granada told by those who live it',
    readingTime: '{{minutes}} min read',
    publishedOn: 'Published on {{date}}',
    by: 'By {{author}}',
    relatedPosts: 'Related articles',
    allPosts: 'All articles',
    noPosts: 'No articles available',
    categories: {
      guia: 'Guides',
      cultura: 'Culture',
      gastronomia: 'Food & Drink',
      barrios: 'Neighborhoods',
      consejos: 'Tips',
    },
  },

  // Meta
  meta: {
    siteName: 'Granada Vibes',
    defaultDescription:
      'Your smart cultural guide to Granada. Discover events, routes, and unique experiences in the city of the Alhambra.',
  },
};
