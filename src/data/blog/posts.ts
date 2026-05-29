import type { BlogPost } from '@types';
import { finDeSemanaContent } from './content/fin-de-semana.js';
import { miradoresContent } from './content/miradores.js';
import { tapasContent } from './content/tapas.js';
import { albaicínGuideContent } from './content/albaicin-guide.js';
import { alhambraGuideContent } from './content/alhambra-guide.js';
import { flamencoGuideContent } from './content/flamenco-guide.js';
import { antesDeLegarContent } from './content/antes-de-llegar.js';
import { granadaGratisContent } from './content/granada-gratis.js';
import { sierraNevadaContent } from './content/sierra-nevada.js';
import { granadaUnDiaContent } from './content/granada-un-dia.js';
import { corpusGranada2026Content } from './content/corpus-granada-2026.js';
import { tarascaGranada2026Content } from './content/tarasca-granada-2026.js';

export const posts: BlogPost[] = [
  {
    id: 'blog-012',
    slug: 'tarasca-granada-2026',
    title: {
      es: 'Tarasca de Granada 2026: cuándo sale, desde dónde, recorrido y cómo verla bien',
      en: 'Granada Tarasca 2026: When It Starts, Where It Leaves From, Route and Local Tips',
    },
    description: {
      es: 'Tarasca de Granada 2026: fecha y hora confirmadas, salida desde Plaza del Carmen, recorrido habitual por el centro, gigantes y cabezudos, contexto dentro del Corpus y consejos para verla bien.',
      en: 'Granada Tarasca 2026: confirmed date and time, Plaza del Carmen starting point, usual city-centre route, giants and big-head figures, Corpus context and practical viewing tips.',
    },
    content: tarascaGranada2026Content,
    publishDate: '2026-05-29',
    category: 'cultura',
    tags: ['tarasca', 'tarasca granada 2026', 'corpus', 'plaza del carmen', 'recorrido', 'gigantes y cabezudos', 'granada'],
    author: 'GRN URBAN',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/TARASCA%20DE%20GRANADA%2002.jpg',
    readingTime: 8,
    featured: true,
  },
  {
    id: 'blog-011',
    slug: 'corpus-granada-2026',
    title: {
      es: 'Corpus de Granada 2026: guía completa con fechas, programa, casetas y trucos de local',
      en: 'Granada Corpus Christi 2026: Complete Guide to Dates, Programme, Casetas and Local Tips',
    },
    description: {
      es: 'Corpus de Granada 2026: fechas oficiales, programa, casetas, Tarasca, procesión, ferial de Almanjáyar, transporte, Día del Niño, toros y consejos locales.',
      en: 'Granada Corpus Christi 2026: dates, programme, casetas, Tarasca, procession, Almanjáyar fairground, transport, kids, bullfighting and local tips.',
    },
    content: corpusGranada2026Content,
    publishDate: '2026-05-26',
    category: 'cultura',
    tags: ['corpus', 'corpus 2026', 'feria', 'tarasca', 'casetas', 'almanjáyar', 'programa', 'granada', 'andalucia'],
    author: 'GRN URBAN',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Corpus%20Christi%20en%20la%20Catedral%20de%20Granada%2001.jpg',
    readingTime: 12,
    featured: true,
  },
  {
    id: 'blog-001',
    slug: 'entradas-alhambra-agotadas',
    title: {
      es: 'Entradas Alhambra: cómo conseguirlas cuando están agotadas',
      en: 'Alhambra Tickets: How to Get Them When They Are Sold Out',
    },
    description: {
      es: 'Las entradas a la Alhambra están agotadas? Guía práctica con métodos reales para conseguirlas: devoluciones a medianoche, cupo presencial, visita nocturna, tours guiados y alternativas si no hay forma. Precios y horarios actualizados.',
      en: 'Alhambra tickets sold out? Practical guide with real methods to get them: midnight returns, on-site quota, night visit, guided tours, and alternatives if there is no way. Updated prices and timings.',
    },
    content: alhambraGuideContent,
    publishDate: '2026-04-10',
    category: 'guia',
    tags: ['alhambra', 'entradas agotadas', 'como conseguir entradas', 'palacios nazaríes', 'visita nocturna', 'granada', 'patrimonio'],
    author: 'GRN URBAN',
    image: '/images/blog/alhambra-entradas.avif',
    readingTime: 12,
    featured: true,
  },
  {
    id: 'blog-002',
    slug: 'granada-fin-de-semana-48-horas',
    title: {
      es: 'Granada en fin de semana: qué hacer en 48 horas',
      en: 'Granada in a Weekend: What to Do in 48 Hours',
    },
    description: {
      es: 'Itinerario completo de 48 horas en Granada hecho por locales: Alhambra, Albaicín, tapeo gratis, atardecer en San Nicolás y los secretos que la mayoría de guías se pierde. Con horarios, precios y presupuesto real.',
      en: 'Complete 48-hour Granada itinerary made by locals: Alhambra, Albaicín, free tapas, sunset at San Nicolás, and the secrets most guides miss. With timings, prices, and a real budget.',
    },
    content: finDeSemanaContent,
    publishDate: '2026-03-01',
    category: 'guia',
    tags: ['fin de semana', '48 horas', 'itinerario', 'tapas', 'albaicín', 'alhambra', 'granada', 'presupuesto'],
    author: 'GRN URBAN',
    image: '/images/blog/fin-de-semana.avif',
    readingTime: 11,
    featured: true,
  },
  {
    id: 'blog-003',
    slug: 'miradores-granada-guia-completa',
    title: {
      es: 'Los miradores de Granada: cuándo ir, cómo llegar y cuál es mejor según lo que buscas',
      en: 'Granada\'s Viewpoints: When to Go, How to Get There, and Which One Is Best for You',
    },
    description: {
      es: 'Guía definitiva de los miradores de Granada: San Nicolás, San Cristóbal, Santa Isabel la Real, La Lona y la Silla del Moro. Horarios, cómo llegar y cuál elegir.',
      en: 'The definitive guide to Granada\'s viewpoints: San Nicolás, San Cristóbal, Santa Isabel la Real, La Lona and Silla del Moro. Best times, how to get there and which to choose.',
    },
    content: miradoresContent,
    publishDate: '2026-03-10',
    category: 'guia',
    tags: ['miradores', 'albaicín', 'fotografía', 'atardecer', 'granada'],
    author: 'GRN URBAN',
    image: '/images/blog/miradores-guia.avif',
    readingTime: 10,
    featured: false,
  },
  {
    id: 'blog-004',
    slug: 'tapas-gratis-granada',
    title: {
      es: 'Tapas gratis en Granada: cómo funciona el sistema y los mejores bares',
      en: 'Free Tapas in Granada: How the System Works and the Best Bars',
    },
    description: {
      es: 'Cómo funciona el sistema de tapas gratis en Granada: precios reales, por qué no es una ley, las mejores rutas por barrios (Navas, Realejo, La Chana) y los bares donde comer gratis y bien. Guía hecha por locales.',
      en: 'How the free tapas system works in Granada: real prices, why it is not a law, the best routes by neighbourhood (Navas, Realejo, La Chana), and the bars where you eat free and well. A locals guide.',
    },
    content: tapasContent,
    publishDate: '2026-03-25',
    category: 'gastronomia',
    tags: ['tapas gratis', 'cómo funciona', 'bares', 'calle navas', 'realejo', 'la chana', 'granada', 'gastronomía'],
    author: 'GRN URBAN',
    image: '/images/blog/tapas-gratis.avif',
    readingTime: 12,
    featured: false,
  },
  {
    id: 'blog-006',
    slug: 'flamenco-granada-guia-autentica',
    title: {
      es: 'Flamenco en Granada: cómo verlo de verdad (y no caer en la trampa turística)',
      en: 'Flamenco in Granada: How to See It for Real (and Avoid the Tourist Trap)',
    },
    description: {
      es: 'El flamenco nació en las cuevas del Sacromonte. Guía para distinguir lo auténtico de lo turístico, qué cuevas elegir, cómo llegar de noche, cuánto cuesta y por qué las peñas son lo que de verdad merece la pena.',
      en: 'Flamenco was born in Sacromonte\'s caves. A guide to telling authentic from tourist, which caves to choose, how to get there at night, what it costs, and why the peñas are what\'s truly worth it.',
    },
    content: flamencoGuideContent,
    publishDate: '2026-04-12',
    category: 'cultura',
    tags: ['flamenco', 'sacromonte', 'cuevas', 'cultura gitana', 'música', 'granada'],
    author: 'GRN URBAN',
    image: '/images/blog/flamenco-guia.avif',
    readingTime: 12,
    featured: true,
  },
  {
    id: 'blog-010',
    slug: 'granada-en-un-dia-itinerario',
    title: {
      es: 'Granada en un día: el itinerario definitivo para quien viene de paso',
      en: 'Granada in a Day: The Definitive Itinerary for Visitors Passing Through',
    },
    description: {
      es: 'Guía maestra con dos itinerarios para un día completo en Granada: uno con Alhambra reservada, uno sin ella. Horarios de AVE desde Málaga, Sevilla y Madrid, y los tres errores que arruinan el día a la mayoría de visitantes.',
      en: 'Master guide with two itineraries for a full day in Granada: one with a pre-booked Alhambra ticket, one without. AVE timetables from Málaga, Seville and Madrid, and the three mistakes most visitors make.',
    },
    content: granadaUnDiaContent,
    publishDate: '2026-04-15',
    category: 'guia',
    tags: ['itinerario', 'un día', 'alhambra', 'albaicín', 'desde málaga', 'día de excursión', 'granada'],
    author: 'GRN URBAN',
    image: '/images/blog/granada-un-dia.avif',
    readingTime: 10,
    featured: true,
  },
  {
    id: 'blog-009',
    slug: 'sierra-nevada-desde-granada-guia-excursion',
    title: {
      es: 'Sierra Nevada desde Granada: esquí, senderismo y cómo llegar sin coche',
      en: 'Sierra Nevada from Granada: Skiing, Hiking and Getting There Without a Car',
    },
    description: {
      es: 'La montaña más alta de la península ibérica está a 45 minutos de autobús de Granada. Guía completa de la estación de esquí (Pradollano), las rutas de senderismo de verano (Mulhacén, Veleta, Laguna de Yeguas), cómo llegar y qué llevar.',
      en: 'The highest mountain on the Iberian Peninsula is 45 minutes by bus from Granada. Complete guide to the ski resort (Pradollano), summer hiking routes (Mulhacén, Veleta, Laguna de Yeguas), how to get there and what to bring.',
    },
    content: sierraNevadaContent,
    publishDate: '2026-04-15',
    category: 'guia',
    tags: ['sierra nevada', 'esquí', 'senderismo', 'mulhacén', 'pradollano', 'excursión', 'granada'],
    author: 'GRN URBAN',
    image: '/images/blog/sierra-nevada.avif',
    readingTime: 11,
    featured: false,
  },
  {
    id: 'blog-008',
    slug: 'granada-gratis-que-hacer-sin-gastar',
    title: {
      es: 'Qué hacer gratis en Granada: monumentos, miradores y el sistema de la tapa explicado',
      en: 'Free Things to Do in Granada: Monuments, Viewpoints, and the Tapa System Explained',
    },
    description: {
      es: 'Granada es cara solo si no sabes cómo funciona. Guía de monumentos gratuitos (El Bañuelo, Corral del Carbón, Madraza), miradores sin entrada, el bosque de la Alhambra y el sistema de tapas que convierte dos cañas en una comida.',
      en: 'Granada is only expensive if you don\'t know how it works. Guide to free monuments (El Bañuelo, Corral del Carbón, Madraza), free viewpoints, the Alhambra forest, and the tapa system that turns two drinks into a meal.',
    },
    content: granadaGratisContent,
    publishDate: '2026-04-15',
    category: 'guia',
    tags: ['gratis', 'presupuesto', 'tapas', 'miradores', 'bañuelo', 'monumentos', 'granada'],
    author: 'GRN URBAN',
    image: '/images/blog/granada-gratis.avif',
    readingTime: 9,
    featured: false,
  },
  {
    id: 'blog-007',
    slug: 'antes-de-llegar-granada',
    title: {
      es: 'Antes de llegar a Granada: lo que tienes que reservar, saber y preparar',
      en: 'Before You Arrive in Granada: What to Book, Know, and Pack',
    },
    description: {
      es: 'La guía práctica pre-viaje que nadie te da: cómo conseguir entrada para la Alhambra sin que se agote, cómo llegar, cuándo ir de verdad, dónde dormir sin arrepentirte y cuánto dinero llevar.',
      en: 'The pre-trip practical guide nobody gives you: how to get Alhambra tickets before they sell out, how to get there, when to actually visit, where to stay without regrets, and how much money to bring.',
    },
    content: antesDeLegarContent,
    publishDate: '2026-04-15',
    category: 'guia',
    tags: ['planificación', 'alhambra entradas', 'cómo llegar', 'alojamiento', 'presupuesto', 'granada'],
    author: 'GRN URBAN',
    image: '/images/blog/antes-de-llegar.avif',
    readingTime: 10,
    featured: true,
  },
  {
    id: 'blog-005',
    slug: 'albaicin-a-pie',
    title: {
      es: 'Albaicín a pie: el paseo que deberías hacer sin guía',
      en: 'Albaicín on Foot: The Walk You Should Do Without a Guide',
    },
    description: {
      es: 'Ruta a pie paso a paso por el Albaicín sin guía: 3,5 km, 2,5-3 horas, miradores, plazas secretas, teterías y consejos de locales. Incluye mapa mental, horarios y precios reales.',
      en: 'Step-by-step walking route through the Albaicín without a guide: 3.5 km, 2.5-3 hours, viewpoints, secret squares, teahouses, and local tips. Includes a mental map, timings, and real prices.',
    },
    content: albaicínGuideContent,
    publishDate: '2026-04-01',
    category: 'barrios',
    tags: ['albaicín', 'a pie', 'paseo', 'sin guía', 'ruta', 'miradores', 'granada', 'patrimonio'],
    author: 'GRN URBAN',
    image: '/images/blog/albaicin-pie.avif',
    readingTime: 11,
    featured: false,
  },
];
