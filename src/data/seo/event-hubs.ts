import type { EventCategory, LocalizedText } from '@types';

export type EventHubKind = 'today' | 'weekend' | 'concerts' | 'free' | 'venue';

export interface EventHubConfig {
  id: string;
  kind: EventHubKind;
  title: LocalizedText;
  h1: LocalizedText;
  /** Short label for hero and section headers (SEO uses `title`). */
  displayH1: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  eyebrow: LocalizedText;
  ctaLabel: LocalizedText;
  emptyTitle: LocalizedText;
  emptyText: LocalizedText;
  category?: EventCategory;
  freeOnly?: boolean;
  venueIncludes?: string[];
  spanishPath: string;
  englishPath: string;
  faqs: {
    question: LocalizedText;
    answer: LocalizedText;
  }[];
}

export const eventHubs: EventHubConfig[] = [
  {
    id: 'today',
    kind: 'today',
    title: {
      es: 'Qué hacer hoy en Granada: eventos, conciertos y planes',
      en: 'What to do in Granada today: events, concerts and plans',
    },
    h1: {
      es: 'Hoy en Granada',
      en: 'Today in Granada',
    },
    displayH1: { es: 'HOY', en: 'TODAY' },
    description: {
      es: 'Planes para hoy en Granada: conciertos, cultura, eventos gratis, rutas y actividades actualizadas para disfrutar la ciudad.',
      en: 'Plans for today in Granada: concerts, culture, free events, routes and updated activities around the city.',
    },
    intro: {
      es: 'Agenda práctica para decidir rápido: eventos de hoy, conciertos, planes gratis y actividades cerca del centro, Albaicín, Realejo y otros barrios de Granada.',
      en: 'A practical agenda for quick decisions: today events, concerts, free plans and activities near the center, Albaicín, Realejo and other Granada neighborhoods.',
    },
    eyebrow: { es: 'Agenda diaria', en: 'Daily agenda' },
    ctaLabel: { es: 'Ver agenda completa', en: 'View full agenda' },
    emptyTitle: { es: 'Hoy no hay eventos destacados', en: 'No highlighted events today' },
    emptyText: {
      es: 'Consulta la agenda completa o mira los planes de este fin de semana para encontrar una alternativa.',
      en: 'Check the full agenda or browse weekend plans to find an alternative.',
    },
    spanishPath: '/eventos/hoy/',
    englishPath: '/en/events/today/',
    faqs: [
      {
        question: { es: '¿Dónde ver eventos de hoy en Granada?', en: 'Where can I find events in Granada today?' },
        answer: {
          es: 'En esta página reunimos los eventos con fecha de hoy y los conectamos con la agenda completa para que puedas saltar a conciertos, planes gratis o actividades por barrio.',
          en: 'This page gathers events dated today and connects them with the full agenda so you can jump to concerts, free plans or activities by neighborhood.',
        },
      },
      {
        question: { es: '¿Se actualiza la agenda de hoy?', en: 'Is today’s agenda updated?' },
        answer: {
          es: 'Sí. La web trabaja con eventos sincronizados y fichas editoriales, por lo que conviene revisar la ficha del evento antes de salir para confirmar horario, precio y ubicación.',
          en: 'Yes. The site works with synced events and editorial listings, so check the event page before going out to confirm time, price and venue.',
        },
      },
    ],
  },
  {
    id: 'weekend',
    kind: 'weekend',
    title: {
      es: 'Eventos en Granada este fin de semana: conciertos y planes',
      en: 'Events in Granada this weekend: concerts and plans',
    },
    h1: {
      es: 'Este fin de semana',
      en: 'This weekend',
    },
    displayH1: { es: 'FINDE', en: 'WEEKEND' },
    description: {
      es: 'Agenda de eventos este fin de semana en Granada: conciertos, cultura, planes gratis, salas, barrios y actividades para viernes, sábado y domingo.',
      en: 'Weekend events in Granada: concerts, culture, free plans, venues, neighborhoods and activities for Friday, Saturday and Sunday.',
    },
    intro: {
      es: 'Selección para organizar el finde sin perder tiempo: música en directo, cultura, planes gratis y propuestas cercanas para alargar la sesión.',
      en: 'A weekend-first selection: live music, culture, free plans and nearby ideas to keep the session going.',
    },
    eyebrow: { es: 'Viernes a domingo', en: 'Friday to Sunday' },
    ctaLabel: { es: 'Ver todos los eventos', en: 'View all events' },
    emptyTitle: { es: 'Todavía no hay eventos para este fin de semana', en: 'No weekend events yet' },
    emptyText: {
      es: 'La agenda se mueve rápido. Mira próximos eventos o filtra por conciertos y gratis.',
      en: 'The agenda moves quickly. Browse upcoming events or filter by concerts and free plans.',
    },
    spanishPath: '/eventos/este-fin-de-semana/',
    englishPath: '/en/events/this-weekend/',
    faqs: [
      {
        question: { es: '¿Qué hacer este fin de semana en Granada?', en: 'What to do in Granada this weekend?' },
        answer: {
          es: 'Empieza por conciertos y eventos culturales, y completa el plan con rutas por barrios cercanos, tapas o actividades gratuitas si buscas algo más flexible.',
          en: 'Start with concerts and cultural events, then complete the plan with nearby routes, tapas or free activities if you want something more flexible.',
        },
      },
    ],
  },
  {
    id: 'concerts',
    kind: 'concerts',
    title: {
      es: 'Conciertos en Granada 2026: agenda, entradas y salas',
      en: 'Concerts in Granada 2026: agenda, tickets and venues',
    },
    h1: {
      es: 'Conciertos en Granada',
      en: 'Concerts in Granada',
    },
    displayH1: { es: 'CONCIERTOS', en: 'CONCERTS' },
    description: {
      es: 'Agenda actualizada de conciertos en Granada: artistas, fechas, entradas, salas, festivales y música en directo esta semana.',
      en: 'Updated Granada concert agenda: artists, dates, tickets, venues, festivals and live music this week.',
    },
    intro: {
      es: 'La página para búsquedas de entradas, artistas y salas: conciertos próximos, precios visibles, recintos y enlaces a fichas con horarios y planes cercanos.',
      en: 'The page for ticket, artist and venue searches: upcoming concerts, visible prices, venues and links to listings with times and nearby plans.',
    },
    eyebrow: { es: 'Música en directo', en: 'Live music' },
    ctaLabel: { es: 'Explorar conciertos', en: 'Explore concerts' },
    emptyTitle: { es: 'No hay conciertos próximos', en: 'No upcoming concerts' },
    emptyText: {
      es: 'Vuelve a la agenda completa para ver teatro, exposiciones, cine y otros planes culturales.',
      en: 'Go back to the full agenda to see theater, exhibitions, cinema and other cultural plans.',
    },
    category: 'concert',
    spanishPath: '/eventos/conciertos/',
    englishPath: '/en/events/concerts/',
    faqs: [
      {
        question: { es: '¿Dónde comprar entradas para conciertos en Granada?', en: 'Where can I buy concert tickets in Granada?' },
        answer: {
          es: 'Cada ficha indica si hay enlace oficial de entradas o si el precio debe consultarse en la fuente del evento. Revisa siempre horario, recinto y apertura de puertas.',
          en: 'Each listing shows whether there is an official ticket link or whether the price should be checked at the event source. Always review time, venue and doors.',
        },
      },
      {
        question: { es: '¿Qué salas tienen más conciertos en Granada?', en: 'Which venues host the most concerts in Granada?' },
        answer: {
          es: 'Plaza de Toros, Industrial Copera, Sala El Tren, Palacio de Congresos y salas pequeñas del centro concentran buena parte de la programación musical.',
          en: 'Plaza de Toros, Industrial Copera, Sala El Tren, Palacio de Congresos and smaller city-center venues concentrate much of the music agenda.',
        },
      },
    ],
  },
  {
    id: 'free',
    kind: 'free',
    title: {
      es: 'Eventos gratis en Granada: agenda de planes gratuitos',
      en: 'Free events in Granada: free plans agenda',
    },
    h1: {
      es: 'Entrada libre',
      en: 'Free entry',
    },
    displayH1: { es: 'GRATIS', en: 'FREE' },
    description: {
      es: 'Agenda de eventos gratis en Granada: conciertos, cultura, exposiciones, talleres y planes de entrada libre actualizados.',
      en: 'Free events in Granada: concerts, culture, exhibitions, workshops and free-entry plans updated.',
    },
    intro: {
      es: 'Planes de entrada libre o gratuitos para moverse por Granada sin gastar: cultura, música, exposiciones, talleres y actividades de barrio.',
      en: 'Free-entry plans to move around Granada without spending: culture, music, exhibitions, workshops and neighborhood activities.',
    },
    eyebrow: { es: 'Entrada libre', en: 'Free entry' },
    ctaLabel: { es: 'Ver planes gratis', en: 'View free plans' },
    emptyTitle: { es: 'No hay eventos gratis próximos', en: 'No upcoming free events' },
    emptyText: {
      es: 'Mira la agenda completa: algunos eventos todavía no publican precio y pueden actualizarse.',
      en: 'Check the full agenda: some events have not published a price yet and may be updated.',
    },
    freeOnly: true,
    spanishPath: '/eventos/gratis/',
    englishPath: '/en/events/free/',
    faqs: [
      {
        question: { es: '¿Los eventos gratis necesitan reserva?', en: 'Do free events require booking?' },
        answer: {
          es: 'Algunos eventos gratuitos funcionan por orden de llegada y otros requieren inscripción. Entra en la ficha antes de ir para comprobar condiciones y aforo.',
          en: 'Some free events are first-come-first-served and others require registration. Open the listing before going to check access conditions and capacity.',
        },
      },
    ],
  },
  {
    id: 'plaza-de-toros-granada',
    kind: 'venue',
    title: {
      es: 'Plaza de Toros de Granada: conciertos, entradas y próximos eventos',
      en: 'Plaza de Toros Granada: concerts, tickets and upcoming events',
    },
    h1: {
      es: 'Plaza de Toros de Granada',
      en: 'Plaza de Toros Granada',
    },
    displayH1: { es: 'PLAZA DE TOROS', en: 'PLAZA DE TOROS' },
    description: {
      es: 'Próximos conciertos y eventos en Plaza de Toros de Granada: fechas, horarios, entradas, ubicación y cómo llegar.',
      en: 'Upcoming concerts and events at Plaza de Toros Granada: dates, times, tickets, location and how to get there.',
    },
    intro: {
      es: 'Recinto clave para grandes conciertos en Granada. Aquí agrupamos fechas, artistas, precios visibles y fichas con información práctica antes de comprar entradas.',
      en: 'A key venue for major concerts in Granada. This page groups dates, artists, visible prices and practical listings before buying tickets.',
    },
    eyebrow: { es: 'Recinto', en: 'Venue' },
    ctaLabel: { es: 'Ver eventos del recinto', en: 'View venue events' },
    emptyTitle: { es: 'No hay eventos próximos en Plaza de Toros', en: 'No upcoming events at Plaza de Toros' },
    emptyText: {
      es: 'Consulta conciertos en Granada o vuelve a la agenda completa para ver otros recintos.',
      en: 'Browse concerts in Granada or return to the full agenda to see other venues.',
    },
    venueIncludes: ['plaza de toros'],
    spanishPath: '/salas/plaza-de-toros-granada/',
    englishPath: '/en/venues/plaza-de-toros-granada/',
    faqs: [
      {
        question: { es: '¿Qué eventos hay en Plaza de Toros de Granada?', en: 'What events are held at Plaza de Toros Granada?' },
        answer: {
          es: 'Principalmente conciertos de gran formato, ciclos musicales y eventos culturales con alta demanda de entradas.',
          en: 'Mainly large concerts, music cycles and cultural events with high ticket demand.',
        },
      },
    ],
  },
  {
    id: 'industrial-copera',
    kind: 'venue',
    title: {
      es: 'Industrial Copera Granada: conciertos, entradas y próximos eventos',
      en: 'Industrial Copera Granada: concerts, tickets and upcoming events',
    },
    h1: {
      es: 'Industrial Copera Granada',
      en: 'Industrial Copera Granada',
    },
    displayH1: { es: 'COPERA', en: 'COPERA' },
    description: {
      es: 'Agenda de conciertos y eventos en Industrial Copera Granada: fechas, entradas, horarios, artistas y cómo llegar.',
      en: 'Concerts and events at Industrial Copera Granada: dates, tickets, times, artists and how to get there.',
    },
    intro: {
      es: 'Uno de los recintos habituales para conciertos, electrónica y giras nacionales cerca de Granada. Revisa fechas próximas, precios y fichas relacionadas.',
      en: 'One of the usual venues for concerts, electronic music and national tours near Granada. Check upcoming dates, prices and related listings.',
    },
    eyebrow: { es: 'Sala', en: 'Venue' },
    ctaLabel: { es: 'Ver agenda de la sala', en: 'View venue agenda' },
    emptyTitle: { es: 'No hay eventos próximos en Industrial Copera', en: 'No upcoming events at Industrial Copera' },
    emptyText: {
      es: 'Explora conciertos en Granada para encontrar otras fechas similares.',
      en: 'Explore concerts in Granada to find similar dates.',
    },
    venueIncludes: ['industrial copera'],
    spanishPath: '/salas/industrial-copera/',
    englishPath: '/en/venues/industrial-copera/',
    faqs: [
      {
        question: { es: '¿Industrial Copera está en Granada capital?', en: 'Is Industrial Copera in Granada city?' },
        answer: {
          es: 'Industrial Copera está en el área metropolitana. Comprueba la ficha del evento para confirmar dirección, horario y transporte recomendado.',
          en: 'Industrial Copera is in the metropolitan area. Check each event listing to confirm address, time and recommended transport.',
        },
      },
    ],
  },
  {
    id: 'sala-el-tren',
    kind: 'venue',
    title: {
      es: 'Sala El Tren Granada: conciertos, entradas y próximos eventos',
      en: 'Sala El Tren Granada: concerts, tickets and upcoming events',
    },
    h1: {
      es: 'Sala El Tren Granada',
      en: 'Sala El Tren Granada',
    },
    displayH1: { es: 'EL TREN', en: 'EL TREN' },
    description: {
      es: 'Próximos conciertos y eventos en Sala El Tren Granada: fechas, entradas, horarios, artistas y planes cerca.',
      en: 'Upcoming concerts and events at Sala El Tren Granada: dates, tickets, times, artists and nearby plans.',
    },
    intro: {
      es: 'Sala de referencia para rock, metal, urbana, festivales solidarios y conciertos de escena local. Agrupamos sus próximas fechas en una página estable.',
      en: 'A reference venue for rock, metal, urban music, charity festivals and local scene concerts. Its upcoming dates are grouped on one stable page.',
    },
    eyebrow: { es: 'Sala', en: 'Venue' },
    ctaLabel: { es: 'Ver próximos conciertos', en: 'View upcoming concerts' },
    emptyTitle: { es: 'No hay eventos próximos en Sala El Tren', en: 'No upcoming events at Sala El Tren' },
    emptyText: {
      es: 'Mira la agenda de conciertos para encontrar alternativas cercanas.',
      en: 'Browse the concert agenda to find nearby alternatives.',
    },
    venueIncludes: ['sala el tren', 'el tren'],
    spanishPath: '/salas/sala-el-tren/',
    englishPath: '/en/venues/sala-el-tren/',
    faqs: [
      {
        question: { es: '¿Qué tipo de conciertos programa Sala El Tren?', en: 'What kind of concerts does Sala El Tren host?' },
        answer: {
          es: 'Suele concentrar rock, metal, urbana, electrónica, festivales solidarios y propuestas de escena local con formato de sala.',
          en: 'It often concentrates rock, metal, urban music, electronic music, charity festivals and local-scene proposals in a club format.',
        },
      },
    ],
  },
];

export function getEventHubConfig(id: string): EventHubConfig {
  const config = eventHubs.find((hub) => hub.id === id);
  if (!config) {
    throw new Error(`Unknown event hub: ${id}`);
  }
  return config;
}
