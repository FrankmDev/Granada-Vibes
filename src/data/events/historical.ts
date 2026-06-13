import type { Event } from '@types';

export const historicalEvents: Event[] = [
  {
    id: 'hist-la-plazuela-2026',
    slug: 'la-plazuela',
    title: {
      es: 'La Plazuela',
      en: 'La Plazuela',
    },
    description: {
      es: 'La Plazuela actuó en la Plaza de Toros de Granada el 15 de mayo de 2026 dentro de su gira Lugar Nº0, D.L.Y., una de las citas musicales con más búsquedas del año en la ciudad.',
      en: 'La Plazuela performed at Plaza de Toros Granada on May 15, 2026 as part of the Lugar Nº0, D.L.Y. tour, one of the most searched music dates of the year in the city.',
    },
    category: 'concert',
    date: '2026-05-15',
    time: '21:30',
    venue: 'Plaza de Toros de Granada',
    neighborhood: 'centro',
    address: 'Av. Dr. Olóriz, 25, 18012 Granada',
    price: 37,
    currency: 'EUR',
    tags: ['la-plazuela', 'flamenco-urbano', 'funk', 'plaza-de-toros', 'entradas'],
    featured: false,
    seoIndex: 'always',
    source: 'manual',
    sourceUrl: 'https://www.ondacero.es/emisoras/andalucia/granada/noticias/plazuela-presenta-show-granada-mano-cervezas-alhambra-dentro-gira-2026_202605116a01a767b5b06629960bee32.html',
    performer: {
      es: 'La Plazuela',
      en: 'La Plazuela',
    },
    longDescription: {
      es: `El dúo granadino La Plazuela llenó la Plaza de Toros de Granada con un concierto en gran formato, jugando literalmente en casa. Su propuesta mezcla flamenco, electrónica, funk y sonidos urbanos, con un directo que ha ganado fama por convertir cada canción en un ritual colectivo de baile y palmas.

Aunque la fecha del 15 de mayo de 2026 ya pasó, esta ficha se mantiene como referencia para quienes buscan entradas, horario, recinto o próximos conciertos relacionados con La Plazuela en Granada. Desde aquí puedes saltar a otros conciertos activos, eventos en Plaza de Toros y planes musicales similares en la ciudad.`,
      en: `The Granada duo La Plazuela filled Plaza de Toros Granada with a large-format concert, literally playing at home. Their proposal blends flamenco, electronics, funk and urban sounds, with a live show known for turning each song into a collective ritual of dancing and clapping.

Although the May 15, 2026 date has already passed, this listing remains as a reference for people searching for tickets, time, venue or upcoming concerts related to La Plazuela in Granada. From here you can jump to active concerts, Plaza de Toros events and similar music plans in the city.`,
    },
    highlights: {
      es: [
        'Concierto en casa para uno de los proyectos granadinos con más tirón nacional',
        'Búsquedas frecuentes sobre entradas, horario y Plaza de Toros',
        'Referencia útil para encontrar próximos conciertos similares en Granada',
      ],
      en: [
        'A hometown concert for one of Granada’s strongest national music projects',
        'Frequent searches around tickets, time and Plaza de Toros',
        'A useful reference to find similar upcoming concerts in Granada',
      ],
    },
    tips: {
      es: 'Este evento ya se celebró. Consulta la agenda de conciertos para encontrar nuevas fechas de música en directo y revisa las páginas de salas para ver próximos eventos en Plaza de Toros.',
      en: 'This event has already taken place. Check the concert agenda to find new live music dates and browse venue pages for upcoming Plaza de Toros events.',
    },
  },
];
