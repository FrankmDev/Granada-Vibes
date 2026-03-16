export const es = {
  // Navigation
  nav: {
    home: 'Inicio',
    events: 'Eventos',
    routes: 'Rutas',
    about: 'Sobre nosotros',
  },

  // Common actions
  actions: {
    viewAll: 'Ver todos',
    viewDetails: 'Ver detalles',
    viewMore: 'Ver más',
    learnMore: 'Saber más',
    getTickets: 'Entradas',
    share: 'Compartir',
    save: 'Guardar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    search: 'Buscar',
    clear: 'Limpiar',
    apply: 'Aplicar',
    close: 'Cerrar',
    back: 'Volver',
  },

  // Categories
  categories: {
    all: 'Todo',
    concert: 'Concierto',
    exhibition: 'Exposición',
    festival: 'Festival',
    market: 'Mercado',
    theater: 'Teatro',
    workshop: 'Taller',
    'guided-tour': 'Visita guiada',
    viewpoint: 'Miradores',
    tapas: 'Tapeo',
    monuments: 'Monumentos',
    hiking: 'Senderismo',
    photography: 'Fotografía',
    secrets: 'Rincones secretos',
    history: 'Historia',
    flamenco: 'Flamenco',
  },

  // Difficulty levels
  difficulty: {
    easy: 'Fácil',
    moderate: 'Moderada',
    challenging: 'Exigente',
    expert: 'Experto',
  },

  // Time of day
  timeOfDay: {
    morning: 'Mañana',
    afternoon: 'Tarde',
    sunset: 'Atardecer',
    evening: 'Noche',
    any: 'Cualquier momento',
  },

  // Neighborhoods
  neighborhoods: {
    albaicin: 'Albaicín',
    sacromonte: 'Sacromonte',
    centro: 'Centro',
    realejo: 'Realejo',
    alhambra: 'Alhambra',
    cartuja: 'Cartuja',
    ronda: 'Ronda',
  },

  // Events page
  events: {
    title: 'Eventos culturales',
    subtitle: 'Descubre lo mejor de la escena cultural granadina',
    upcoming: 'Próximos eventos',
    featured: 'Destacados',
    noEvents: 'No hay eventos que coincidan con tus filtros',
    filters: {
      title: 'Filtrar eventos',
      category: 'Categoría',
      date: 'Fecha',
      neighborhood: 'Barrio',
      price: 'Precio',
    },
    free: 'Gratis',
    fromPrice: 'Desde {{price}}€',
  },

  // Routes page
  routes: {
    title: 'Rutas por Granada',
    subtitle: 'Explora la ciudad con nuestras rutas curadas',
    featured: 'Rutas destacadas',
    duration: '{{minutes}} min',
    distance: '{{km}} km',
    difficultyLabel: 'Dificultad',
    bestTime: 'Mejor momento',
    highlights: 'Puntos destacados',
    tips: 'Consejos',
    noRoutes: 'No hay rutas que coincidan con tus filtros',
  },

  // Home page
  home: {
    hero: {
      title: 'Descubre el alma de Granada',
      subtitle: 'Tu guía cultural e inteligente de la ciudad de la Alhambra',
      ctaEvents: 'Ver eventos',
      ctaRoutes: 'Explorar rutas',
    },
    featuredEvents: 'Eventos destacados',
    featuredRoutes: 'Rutas recomendadas',
    discoverMore: 'Descubre más',
  },

  // About page
  about: {
    title: 'Sobre Granada Vibes',
    mission: {
      title: 'Nuestra misión',
      description:
        'Conectar a visitantes y locales con la rica cultura granadina, facilitando el descubrimiento de eventos, rutas y experiencias auténticas que celebren la esencia única de esta ciudad.',
    },
    values: {
      title: 'Nuestros valores',
      authentic: {
        title: 'Autenticidad',
        description: 'Promovemos experiencias genuinas, lejos de las trampas turísticas.',
      },
      quality: {
        title: 'Calidad curada',
        description: 'Cada evento y ruta es seleccionado cuidadosamente por nuestro equipo.',
      },
      community: {
        title: 'Comunidad',
        description: 'Apoyamos a creadores locales y negocios de la ciudad.',
      },
    },
  },

  // Footer
  footer: {
    tagline: 'Tu guía cultural de Granada',
    links: {
      explore: 'Explorar',
      company: 'Nosotros',
      legal: 'Legal',
    },
    copyright: '© {{year}} Granada Vibes. Todos los derechos reservados.',
  },

  // Meta
  meta: {
    siteName: 'Granada Vibes',
    defaultDescription:
      'Tu guía cultural e inteligente de Granada. Descubre eventos, rutas y experiencias únicas en la ciudad de la Alhambra.',
  },
} as const;

export type Translations = typeof es;
