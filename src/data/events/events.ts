import type { Event } from '@types';

export const events: Event[] = [
  {
    id: 'evt-001',
    slug: 'festival-internacional-musica-danza',
    title: {
      es: 'Festival Internacional de Música y Danza',
      en: 'International Festival of Music and Dance',
    },
    description: {
      es: 'El festival más prestigioso de Granada se celebra en los jardines de la Alhambra. Este año cuenta con programación excepcional de flamenco, música clásica y danza contemporánea.',
      en: 'Granada\'s most prestigious festival takes place in the Alhambra gardens. This year features exceptional programming of flamenco, classical music, and contemporary dance.',
    },
    category: 'festival',
    date: '2025-06-20',
    time: '21:30',
    venue: 'Generalife',
    neighborhood: 'alhambra',
    price: 35,
    currency: 'EUR',
    tags: ['música clásica', 'flamenco', 'danza', 'patrimonio'],
    featured: true,
  },
  {
    id: 'evt-002',
    slug: 'concierto-rosalia-granada',
    title: {
      es: 'Rosalía - Motomami World Tour',
      en: 'Rosalía - Motomami World Tour',
    },
    description: {
      es: 'La artista catalana revoluciona el Palacio de Deportes con su fusión única de flamenco, reguetón y experimentalismo. Una noche histórica para la música española.',
      en: 'The Catalan artist revolutionizes the Sports Palace with her unique fusion of flamenco, reggaeton, and experimentalism. A historic night for Spanish music.',
    },
    category: 'concert',
    date: '2025-04-15',
    time: '20:00',
    venue: 'Palacio de Deportes',
    neighborhood: 'cartuja',
    price: 65,
    currency: 'EUR',
    tags: ['pop', 'flamenco', 'concierto', 'internacional'],
    featured: true,
  },
  {
    id: 'evt-003',
    slug: 'exposicion-picasso-granada',
    title: {
      es: 'Picasso: El diálogo con Granada',
      en: 'Picasso: The Dialogue with Granada',
    },
    description: {
      es: 'Más de 80 obras del genio malagueño exploran su conexión con la cultura nazarí y el legado de la Alhambra en su obra. Incluye pinturas, dibujos y cerámicas inéditas.',
      en: 'More than 80 works by the genius from Malaga explore his connection with Nasrid culture and the legacy of the Alhambra in his work. Includes unpublished paintings, drawings, and ceramics.',
    },
    category: 'exhibition',
    date: '2025-03-01',
    endTime: '2025-06-30',
    time: '10:00',
    venue: 'Museo de Bellas Artes',
    neighborhood: 'centro',
    price: 10,
    currency: 'EUR',
    tags: ['arte', 'picasso', 'exposición', 'patrimonio'],
    featured: true,
  },
  {
    id: 'evt-004',
    slug: 'mercado-artesania-sacromonte',
    title: {
      es: 'Mercado de Artesanía del Sacromonte',
      en: 'Sacromonte Craft Market',
    },
    description: {
      es: 'Artesanos locales exponen sus creaciones en el barrio más emblemático de Granada. Cerámica, esparto, joyería tradicional y productos gastronómicos de la zona.',
      en: 'Local artisans display their creations in Granada\'s most emblematic neighborhood. Ceramics, esparto grass, traditional jewelry, and gastronomic products from the area.',
    },
    category: 'market',
    date: '2025-03-15',
    time: '11:00',
    endTime: '2025-03-16',
    venue: 'Camino del Sacromonte',
    neighborhood: 'sacromonte',
    price: null,
    currency: 'EUR',
    tags: ['artesanía', 'mercado', 'cultura local', 'gratis'],
    featured: false,
  },
  {
    id: 'evt-005',
    slug: 'teatro-federico-garcia-lorca',
    title: {
      es: 'Yerma - Teatro Isabel la Católica',
      en: 'Yerma - Isabel the Catholic Theater',
    },
    description: {
      es: 'La tragedia rural de Lorca cobra vida en una producción innovadora dirigida por una joven compañía granadina. Homenaje al poeta en su tierra natal.',
      en: 'Lorca\'s rural tragedy comes to life in an innovative production directed by a young Granada company. A tribute to the poet in his homeland.',
    },
    category: 'theater',
    date: '2025-05-10',
    time: '19:00',
    venue: 'Teatro Isabel la Católica',
    neighborhood: 'centro',
    price: 25,
    currency: 'EUR',
    tags: ['teatro', 'lorca', 'clásico', 'cultura'],
    featured: true,
  },
  {
    id: 'evt-006',
    slug: 'taller-ceramica-nazari',
    title: {
      es: 'Taller de Cerámica Nazarí',
      en: 'Nasrid Ceramics Workshop',
    },
    description: {
      es: 'Aprende las técnicas milenarias de la cerámica andalusí con maestros artesanos. Incluye materiales y puedes llevarte tu obra terminada.',
      en: 'Learn the millennia-old techniques of Andalusian ceramics with master artisans. Includes materials and you can take your finished work home.',
    },
    category: 'workshop',
    date: '2025-04-05',
    time: '10:00',
    endTime: '2025-04-05',
    venue: 'Escuela de Artes',
    neighborhood: 'realejo',
    price: 45,
    currency: 'EUR',
    tags: ['taller', 'cerámica', 'artesanía', 'experiencia'],
    featured: false,
  },
  {
    id: 'evt-007',
    slug: 'visitas-nocturnas-alhambra',
    title: {
      es: 'Visitas Nocturnas a la Alhambra',
      en: 'Night Visits to the Alhambra',
    },
    description: {
      es: 'La magia de la Alhambra bajo las estrellas. Recorrido exclusivo por los Palacios Nazaríes con iluminación especial y música en vivo.',
      en: 'The magic of the Alhambra under the stars. Exclusive tour of the Nasrid Palaces with special lighting and live music.',
    },
    category: 'guided-tour',
    date: '2025-07-01',
    time: '22:00',
    venue: 'Alhambra',
    neighborhood: 'alhambra',
    price: 18,
    currency: 'EUR',
    tags: ['patrimonio', 'noche', 'alhambra', 'especial'],
    featured: true,
  },
  {
    id: 'evt-008',
    slug: 'concierto-jazz-plaza-trinidad',
    title: {
      es: 'Festival de Jazz en la Plaza de la Trinidad',
      en: 'Jazz Festival at Plaza de la Trinidad',
    },
    description: {
      es: 'Tres días de jazz internacional en uno de los escenarios más especiales de Granada, con la Iglesia de San Juan de Dios como telón de fondo.',
      en: 'Three days of international jazz in one of Granada\'s most special venues, with the Church of San Juan de Dios as a backdrop.',
    },
    category: 'festival',
    date: '2025-07-15',
    time: '21:00',
    endTime: '2025-07-17',
    venue: 'Plaza de la Trinidad',
    neighborhood: 'centro',
    price: null,
    currency: 'EUR',
    tags: ['jazz', 'música', 'gratis', 'verano'],
    featured: false,
  },
  {
    id: 'evt-009',
    slug: 'exposicion-fotografia-albaicin',
    title: {
      es: 'Miradas del Albaicín - Exposición Fotográfica',
      en: 'Views of the Albaicín - Photography Exhibition',
    },
    description: {
      es: 'Fotógrafos locales capturan las mil caras del barrio más fotografiado de Granada. Una mirada íntima a sus calles, gentes y tradiciones.',
      en: 'Local photographers capture the thousand faces of Granada\'s most photographed neighborhood. An intimate look at its streets, people, and traditions.',
    },
    category: 'exhibition',
    date: '2025-05-20',
    time: '11:00',
    endTime: '2025-08-20',
    venue: 'Centro Cultural Gran Capitán',
    neighborhood: 'centro',
    price: null,
    currency: 'EUR',
    tags: ['fotografía', 'albaicín', 'cultura local', 'gratis'],
    featured: false,
  },
  {
    id: 'evt-010',
    slug: 'concierto-carmen-linares',
    title: {
      es: 'Carmen Linares - 40 Años de Cante',
      en: 'Carmen Linares - 40 Years of Cante',
    },
    description: {
      es: 'La cantaora jienense celebra cuatro décadas de carrera con un concierto único en el Teatro del Generalife. Pura emoción flamenca.',
      en: 'The singer from Jaén celebrates four decades of career with a unique concert at the Generalife Theater. Pure flamenco emotion.',
    },
    category: 'concert',
    date: '2025-06-28',
    time: '21:00',
    venue: 'Teatro del Generalife',
    neighborhood: 'alhambra',
    price: 40,
    currency: 'EUR',
    tags: ['flamenco', 'cante', 'tradición', 'especial'],
    featured: true,
  },
  {
    id: 'evt-011',
    slug: 'mercado-alimentacion-saludable',
    title: {
      es: 'Mercado de Alimentación Saludable',
      en: 'Healthy Food Market',
    },
    description: {
      es: 'Productores locales de la Alpujarra y la Vega de Granada se dan cita con sus mejores productos ecológicos, artesanales y de temporada.',
      en: 'Local producers from the Alpujarra and the Vega de Granada meet with their best organic, artisanal, and seasonal products.',
    },
    category: 'market',
    date: '2025-04-20',
    time: '10:00',
    endTime: '2025-04-20',
    venue: 'Plaza del Carmen',
    neighborhood: 'centro',
    price: null,
    currency: 'EUR',
    tags: ['gastronomía', 'ecológico', 'local', 'mercado'],
    featured: false,
  },
  {
    id: 'evt-012',
    slug: 'taller-escritura-creativa',
    title: {
      es: 'Taller de Escritura Creativa en el Albaicín',
      en: 'Creative Writing Workshop in the Albaicín',
    },
    description: {
      es: 'Escribe inspirado por los paisajes del Albaicín. Taller impartido por escritores locales en espacios emblemáticos del barrio.',
      en: 'Write inspired by the landscapes of the Albaicín. Workshop taught by local writers in emblematic spaces of the neighborhood.',
    },
    category: 'workshop',
    date: '2025-05-25',
    time: '10:00',
    endTime: '2025-05-25',
    venue: 'Carmen de la Victoria',
    neighborhood: 'albaicin',
    price: 30,
    currency: 'EUR',
    tags: ['escritura', 'creatividad', 'literatura', 'albaicín'],
    featured: false,
  },
];

export function getAllEvents(): Event[] {
  return events;
}

export function getFeaturedEvents(): Event[] {
  return events.filter((e) => e.featured);
}

export function getEventsByCategory(category: Event['category']): Event[] {
  return events.filter((e) => e.category === category);
}

export function getEventsByNeighborhood(
  neighborhood: Event['neighborhood']
): Event[] {
  return events.filter((e) => e.neighborhood === neighborhood);
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}
