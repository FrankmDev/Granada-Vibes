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

export const posts: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'guia-completa-alhambra-granada',
    title: {
      es: 'Guía completa de la Alhambra: entradas, qué ver y cómo no arruinar la visita',
      en: 'Complete Alhambra Guide: Tickets, What to See, and How Not to Ruin Your Visit',
    },
    description: {
      es: 'Todo lo que necesitas saber antes de visitar la Alhambra: cómo comprar entradas sin que se agoten, los Palacios Nazaríes explicados en serio, la visita nocturna y el plan del día completo que hacen los locales.',
      en: 'Everything you need to know before visiting the Alhambra: how to buy tickets before they sell out, the Nasrid Palaces explained properly, the night visit, and the full-day plan locals actually follow.',
    },
    content: alhambraGuideContent,
    publishDate: '2026-04-10',
    category: 'guia',
    tags: ['alhambra', 'entradas', 'palacios nazaríes', 'generalife', 'alcazaba', 'granada', 'patrimonio'],
    author: 'RAWDA',
    image: '/images/routes/alhambra-san-nicolas.jpg',
    readingTime: 14,
    featured: true,
  },
  {
    id: 'blog-002',
    slug: 'que-hacer-granada-fin-de-semana',
    title: {
      es: 'Qué hacer en Granada en un fin de semana: la ruta definitiva según los que vivimos aquí',
      en: 'What to Do in Granada in a Weekend: The Definitive Guide by Locals',
    },
    description: {
      es: 'La guía de fin de semana que haría un granadino para un amigo que viene a visitarle. Sin trampas turísticas, con las calles, bares y rincones que de verdad merecen la pena.',
      en: 'The weekend guide a local would make for a friend visiting. No tourist traps — just the streets, bars and corners that are truly worth your time.',
    },
    content: finDeSemanaContent,
    publishDate: '2026-03-01',
    category: 'guia',
    tags: ['fin de semana', 'tapas', 'albaicín', 'alhambra', 'granada'],
    author: 'RAWDA',
    image: '/images/routes/albaicin-panorama.jpg',
    readingTime: 12,
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
    author: 'RAWDA',
    image: '/images/routes/alhambra-san-nicolas.jpg',
    readingTime: 10,
    featured: false,
  },
  {
    id: 'blog-004',
    slug: 'mejores-tapas-granada-ruta-bares',
    title: {
      es: 'Las mejores tapas de Granada: ruta por los bares imprescindibles',
      en: 'The Best Tapas in Granada: A Route Through Essential Bars',
    },
    description: {
      es: 'Recorrido por los bares donde los locales de verdad van a tapear. Desde la mítica Calle Navas hasta el auténtico barrio de La Chana. Dónde comer gratis y bien en Granada.',
      en: 'A tour of the bars where real locals go for tapas. From the mythical Calle Navas to the authentic La Chana neighborhood. Where to eat free and well in Granada.',
    },
    content: tapasContent,
    publishDate: '2026-03-25',
    category: 'gastronomia',
    tags: ['tapas', 'gastronomía', 'bares', 'calle navas', 'realejo'],
    author: 'RAWDA',
    image: '/images/routes/tapas-granada.jpg',
    readingTime: 11,
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
    author: 'RAWDA',
    image: '/images/routes/sacromonte-darro.jpg',
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
      es: 'Dos itinerarios para un día completo en Granada: uno con Alhambra reservada, uno sin ella. Con horarios de AVE desde Málaga, Sevilla y Madrid, y los tres errores que arruinan el día a la mayoría de visitantes.',
      en: 'Two itineraries for a full day in Granada: one with a pre-booked Alhambra ticket, one without. Includes AVE timetables from Málaga, Seville and Madrid, and the three mistakes most visitors make.',
    },
    content: granadaUnDiaContent,
    publishDate: '2026-04-15',
    category: 'guia',
    tags: ['itinerario', 'un día', 'alhambra', 'albaicín', 'desde málaga', 'día de excursión', 'granada'],
    author: 'RAWDA',
    image: '/images/routes/alhambra-san-nicolas.jpg',
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
    author: 'RAWDA',
    image: '/images/routes/alhambra-atardecer.jpg',
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
    author: 'RAWDA',
    image: '/images/routes/mirador-san-nicolas.jpg',
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
    author: 'RAWDA',
    image: '/images/routes/albaicin-panorama.jpg',
    readingTime: 10,
    featured: true,
  },
  {
    id: 'blog-005',
    slug: 'guia-albaicin-granada',
    title: {
      es: 'Guía del Albaicín: cómo perderse (bien) por el barrio medieval de Granada',
      en: 'Albaicín Guide: How to Get Lost (Well) in Granada\'s Medieval Quarter',
    },
    description: {
      es: 'El único barrio medieval árabe de Europa continental, declarado Patrimonio Mundial en 1994. Cuándo ir, por dónde subir, qué ver y cómo desayunar sin pagar precio de turista.',
      en: 'The only medieval Arab quarter in continental Europe, declared a World Heritage Site in 1994. When to go, how to get up, what to see, and how to have breakfast without paying tourist prices.',
    },
    content: albaicínGuideContent,
    publishDate: '2026-04-01',
    category: 'barrios',
    tags: ['albaicín', 'barrios', 'historia', 'árabe', 'patrimonio', 'granada'],
    author: 'RAWDA',
    image: '/images/routes/paseo-tristes.jpg',
    readingTime: 12,
    featured: false,
  },
];
