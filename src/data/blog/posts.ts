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
import { feriaCorpusGranada2026Content } from './content/feria-corpus-granada-2026.js';

export const posts: BlogPost[] = [
  {
    id: 'blog-013',
    slug: 'feria-corpus-granada-2026',
    title: {
      es: 'Feria del Corpus de Granada 2026: casetas, ferial, transporte, ambiente y consejos',
      en: 'Granada Corpus Fair 2026: Casetas, Fairground, Transport, Atmosphere and Local Tips',
    },
    description: {
      es: 'Guía práctica de la Feria del Corpus de Granada 2026: fechas, recinto ferial de Almanjáyar, 72 casetas, acceso libre, atracciones, Día del Niño, transporte, huelga parcial del metro y ambiente de día y de noche.',
      en: 'Practical guide to Granada Corpus Fair 2026: dates, Almanjáyar fairground, 72 casetas, free entry, rides, Children’s Day, transport, partial metro strike and day-to-night atmosphere.',
    },
    content: feriaCorpusGranada2026Content,
    publishDate: '2026-05-29',
    category: 'cultura',
    tags: ['feria del corpus', 'feria granada 2026', 'casetas', 'almanjayar', 'metro granada', 'dia del nino', 'corpus', 'granada'],
    author: 'GRN URBAN',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Casetas%20en%20la%20Feria%20de%20Granada%202007.jpg',
    readingTime: 9,
    featured: true,
  },
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
      es: 'Entradas Alhambra agotadas: opciones reales',
      en: 'Sold-Out Alhambra Tickets: Real Options',
    },
    description: {
      es: 'Qué hacer si no quedan entradas para la Alhambra: canal oficial, visitas nocturnas, Jardines y Generalife, Dobla de Oro, tours autorizados y alternativas cerca del monumento.',
      en: 'What to do when Alhambra tickets are sold out: official channel, night visits, Gardens and Generalife, Dobla de Oro, authorised tours and nearby alternatives.',
    },
    content: alhambraGuideContent,
    publishDate: '2026-04-10',
    category: 'guia',
    tags: ['alhambra', 'entradas agotadas', 'como conseguir entradas', 'palacios nazaríes', 'visita nocturna', 'granada', 'patrimonio'],
    author: 'GRN URBAN',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/GRANADA_-_La_Alhambra_vista_desde_el_mirador_de_San_Nicolas_-_panoramio.jpg',
    readingTime: 12,
    featured: true,
  },
  {
    id: 'blog-002',
    slug: 'granada-fin-de-semana-48-horas',
    title: {
      es: 'Granada en 48 horas: ruta de fin de semana',
      en: 'Granada in 48 Hours: Weekend Route',
    },
    description: {
      es: 'Itinerario de 48 horas en Granada con Alhambra, Albaicín, Realejo, Carrera del Darro, tapeo por zonas y miradores. Plan realista con tiempos, transporte y prioridades.',
      en: 'A 48-hour Granada itinerary with the Alhambra, Albaicin, Realejo, Carrera del Darro, tapas areas and viewpoints. Realistic timing, transport and priorities.',
    },
    content: finDeSemanaContent,
    publishDate: '2026-03-01',
    category: 'guia',
    tags: ['fin de semana', '48 horas', 'itinerario', 'tapas', 'albaicín', 'alhambra', 'granada', 'presupuesto'],
    author: 'GRN URBAN',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Carrera%20del%20Darro%20de%20Granada.jpg',
    readingTime: 11,
    featured: true,
  },
  {
    id: 'blog-003',
    slug: 'miradores-granada-guia-completa',
    title: {
      es: 'Miradores de Granada: cuál elegir y cuándo ir',
      en: 'Granada Viewpoints: Which to Choose and When',
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
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/GRANADA_-_La_Alhambra_vista_desde_el_mirador_de_San_Nicolas_-_panoramio.jpg',
    readingTime: 10,
    featured: false,
  },
  {
    id: 'blog-004',
    slug: 'tapas-gratis-granada',
    title: {
      es: 'Tapas gratis en Granada: zonas y bares fiables',
      en: 'Free Tapas in Granada: Areas and Reliable Bars',
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
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Granada%2C%20La%20Fontana%2C%20tapas.jpg',
    readingTime: 12,
    featured: false,
  },
  {
    id: 'blog-006',
    slug: 'flamenco-granada-guia-autentica',
    title: {
      es: 'Flamenco en Granada: Sacromonte sin trampas',
      en: 'Flamenco in Granada: Sacromonte Without Traps',
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
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aa%20interpretation%20centre%20in%20sacromonte%20-%20etnographical%20and%20environmontal%20museum%20showing%20life%20and%20customs%20in%20a%20group%20of%20caves%201.jpg',
    readingTime: 12,
    featured: true,
  },
  {
    id: 'blog-010',
    slug: 'granada-en-un-dia-itinerario',
    title: {
      es: 'Granada en un día: itinerario práctico',
      en: 'Granada in One Day: Practical Itinerary',
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
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cathedral%20%26%20Capilla%20Real%20Granada%20Spain.jpg',
    readingTime: 10,
    featured: true,
  },
  {
    id: 'blog-009',
    slug: 'sierra-nevada-desde-granada-guia-excursion',
    title: {
      es: 'Sierra Nevada desde Granada: guía sin coche',
      en: 'Sierra Nevada from Granada: Car-Free Guide',
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
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sierra%20Nevada%2C%20Granada%2004.JPG',
    readingTime: 11,
    featured: false,
  },
  {
    id: 'blog-008',
    slug: 'granada-gratis-que-hacer-sin-gastar',
    title: {
      es: 'Qué hacer gratis en Granada: guía real',
      en: 'Free Things to Do in Granada: Real Guide',
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
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Corral_del_Carb%C3%B3n%2CGranada..JPG',
    readingTime: 9,
    featured: false,
  },
  {
    id: 'blog-007',
    slug: 'antes-de-llegar-granada',
    title: {
      es: 'Antes de viajar a Granada: reservas clave',
      en: 'Before Granada: Key Bookings and Tips',
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
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/A%20view%20of%20Granada%20from%20the%20Alhambra.jpg',
    readingTime: 10,
    featured: true,
  },
  {
    id: 'blog-005',
    slug: 'albaicin-a-pie',
    title: {
      es: 'Albaicín a pie: ruta esencial',
      en: 'Albaicin on Foot: Essential Route',
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
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aa%20a%20street%20of%20albaicin%20small%20street%202016%20white%20in%20granada%20in%20spain.jpg',
    readingTime: 11,
    featured: false,
  },
];
