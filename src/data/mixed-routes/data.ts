import type { MixedRoute } from '@types';

export const mixedRoutes: MixedRoute[] = [
  // ——————————————————————————————————————————
  // 2 HORAS — Lo esencial express
  // ——————————————————————————————————————————
  {
    id: 'mr-001',
    slug: '2-horas-granada-esencial',
    duration: '2h',
    title: {
      es: 'Granada en 2 horas: lo esencial',
      en: 'Granada in 2 hours: the essentials',
    },
    description: {
      es: 'Escala en Granada o tarde libre corta. Un paseo concentrado por lo mejor del centro con mirador, tapas y el corazón de la ciudad.',
      en: 'Quick stopover or short free afternoon. A concentrated walk through the best of downtown with a viewpoint, tapas and the heart of the city.',
    },
    totalHours: 2,
    neighborhoods: ['centro', 'albaicin'],
    bestFor: {
      es: 'Escalas, tardes libres cortas, primera toma de contacto',
      en: 'Stopovers, short free afternoons, first contact with the city',
    },
    days: [
      {
        blocks: [
          {
            label: {
              es: 'Tu ventana de 2 horas',
              en: 'Your 2-hour window',
            },
            stops: [
              {
                name: { es: 'Plaza Nueva y Carrera del Darro', en: 'Plaza Nueva & Carrera del Darro' },
                description: {
                  es: 'Empieza en Plaza Nueva y camina por la Carrera del Darro, la calle más bonita de Granada. El río, los puentes árabes, el Alhambra arriba. No te pares en los restaurantes de aquí — son trampa turística.',
                  en: 'Start at Plaza Nueva and walk along Carrera del Darro, Granada\'s most beautiful street. The river, Arabic bridges, the Alhambra above. Don\'t stop at the restaurants here — they\'re tourist traps.',
                },
                category: 'paseo',
                neighborhood: 'centro',
                duration: 20,
              },
              {
                name: { es: 'Mirador de San Nicolás', en: 'San Nicolás Viewpoint' },
                description: {
                  es: 'Sube por la Cuesta del Chapiz o por las callejuelas del Albaicín hasta el mirador. La vista de la Alhambra con Sierra Nevada de fondo es la postal de Granada. Si vas al atardecer, llega 20 minutos antes.',
                  en: 'Walk up Cuesta del Chapiz or through the Albaicín alleyways to the viewpoint. The view of the Alhambra with Sierra Nevada behind is Granada\'s postcard. If going at sunset, arrive 20 minutes early.',
                },
                category: 'mirador',
                neighborhood: 'albaicin',
                duration: 40,
                tip: {
                  es: 'Cuidado con los carteristas en el mirador. Lleva el móvil en bolsillo delantero.',
                  en: 'Watch for pickpockets at the viewpoint. Keep your phone in a front pocket.',
                },
              },
              {
                name: { es: 'Tapas en el bajo Albaicín', en: 'Tapas in lower Albaicín' },
                description: {
                  es: 'Baja por Calderería Nueva (la calle de las teterías) y para en Bar Lara o Casa Torcuato. Pide una caña — la tapa va incluida, así funciona Granada.',
                  en: 'Walk down Calderería Nueva (the tea house street) and stop at Bar Lara or Casa Torcuato. Order a caña (small beer) — the tapa is included, that\'s how Granada works.',
                },
                category: 'tapas',
                neighborhood: 'albaicin',
                duration: 40,
              },
            ],
          },
        ],
      },
    ],
    essentialTips: [
      {
        es: 'Lleva calzado cómodo — el Albaicín es todo cuestas empedradas',
        en: 'Wear comfortable shoes — the Albaicín is all cobblestone hills',
      },
      {
        es: 'Si puedes elegir hora, ve al atardecer — el mirador es otra cosa con esa luz',
        en: 'If you can choose the time, go at sunset — the viewpoint is something else in that light',
      },
    ],
  },

  // ——————————————————————————————————————————
  // 6 HORAS — Media jornada intensa
  // ——————————————————————————————————————————
  {
    id: 'mr-002',
    slug: '6-horas-media-jornada',
    duration: '6h',
    title: {
      es: 'Granada en 6 horas: media jornada intensa',
      en: 'Granada in 6 hours: an intense half-day',
    },
    description: {
      es: 'Medio día para sumergirte en Granada. Albaicín por la mañana, tapeo en el centro al mediodía, Realejo por la tarde. Tres barrios, tres mundos.',
      en: 'Half a day to immerse yourself in Granada. Albaicín in the morning, tapas downtown at noon, Realejo in the afternoon. Three neighborhoods, three worlds.',
    },
    totalHours: 6,
    neighborhoods: ['albaicin', 'centro', 'realejo'],
    bestFor: {
      es: 'Viajeros con medio día libre, cruceristas, escapadas rápidas',
      en: 'Travelers with a free half-day, cruise passengers, quick getaways',
    },
    days: [
      {
        blocks: [
          {
            label: { es: 'Mañana (9:00–12:00)', en: 'Morning (9:00–12:00)' },
            stops: [
              {
                name: { es: 'Albaicín a primera hora', en: 'Albaicín early morning' },
                description: {
                  es: 'El Albaicín está vacío a las 9 de la mañana. Pasea sin prisa por la placeta de San Miguel Bajo, baja por callejones blancos y piérdete. Este es el momento de hacer fotos sin gente.',
                  en: 'The Albaicín is empty at 9am. Stroll unhurried through Plaza de San Miguel Bajo, wander through whitewashed alleys and get lost. This is the time for people-free photos.',
                },
                category: 'paseo',
                neighborhood: 'albaicin',
                duration: 60,
              },
              {
                name: { es: 'Mirador de San Nicolás + San Cristóbal', en: 'San Nicolás + San Cristóbal Viewpoints' },
                description: {
                  es: 'San Nicolás es obligatorio, pero camina 10 minutos más hasta San Cristóbal — menos gente y la vista incluye toda la Vega. Por la mañana la luz es limpia y la Alhambra se ve dorada.',
                  en: 'San Nicolás is a must, but walk 10 more minutes to San Cristóbal — fewer people and the view includes the entire Vega plain. In the morning the light is clean and the Alhambra looks golden.',
                },
                category: 'mirador',
                neighborhood: 'albaicin',
                duration: 45,
              },
              {
                name: { es: 'Desayuno en Plaza Larga', en: 'Breakfast at Plaza Larga' },
                description: {
                  es: 'Baja a Plaza Larga y desayuna en Bar Aixa o Casa Pasteles. Tostada con aceite y tomate — el desayuno granadino de toda la vida. Los sábados hay mercado de artesanía.',
                  en: 'Head down to Plaza Larga and have breakfast at Bar Aixa or Casa Pasteles. Toast with olive oil and tomato — the classic Granada breakfast. On Saturdays there\'s a craft market.',
                },
                category: 'tapas',
                neighborhood: 'albaicin',
                duration: 30,
                tip: {
                  es: 'Si es sábado, el mercado abre hasta las 14:00',
                  en: 'If it\'s Saturday, the market runs until 2pm',
                },
              },
            ],
          },
          {
            label: { es: 'Mediodía (12:00–14:00)', en: 'Midday (12:00–14:00)' },
            stops: [
              {
                name: { es: 'Catedral y Capilla Real', en: 'Cathedral & Royal Chapel' },
                description: {
                  es: 'Baja al centro y visita la Capilla Real (donde están los Reyes Católicos). La Catedral es imponente por fuera — por dentro, solo si te sobra tiempo. Prioriza la Capilla.',
                  en: 'Head downtown and visit the Royal Chapel (where the Catholic Monarchs are buried). The Cathedral is impressive from outside — inside, only if you have spare time. Prioritize the Chapel.',
                },
                category: 'monumento',
                neighborhood: 'centro',
                duration: 40,
              },
              {
                name: { es: 'Tapeo en Navas o alrededores', en: 'Tapas on Navas street or nearby' },
                description: {
                  es: 'Calle Navas es la calle de tapas más conocida, pero los locales van a las paralelas: prueba Los Diamantes (pescaíto frito), La Riviera o Bar Ávila. Dos cañas y dos tapas = almuerzo gratis.',
                  en: 'Calle Navas is the most famous tapas street, but locals go to the parallel streets: try Los Diamantes (fried fish), La Riviera or Bar Ávila. Two beers and two tapas = free lunch.',
                },
                category: 'tapas',
                neighborhood: 'centro',
                duration: 50,
              },
            ],
          },
          {
            label: { es: 'Tarde (14:00–15:00)', en: 'Afternoon (14:00–15:00)' },
            stops: [
              {
                name: { es: 'Realejo: street art y Carmen de los Mártires', en: 'Realejo: street art & Carmen de los Mártires' },
                description: {
                  es: 'El Realejo es el barrio judío reconvertido en zona de arte urbano. Busca los murales de El Niño de las Pinturas. Si queda tiempo, sube al Carmen de los Mártires — jardines gratuitos con pavos reales y vistas.',
                  en: 'Realejo is the former Jewish quarter turned street art district. Look for El Niño de las Pinturas murals. If there\'s time, go up to Carmen de los Mártires — free gardens with peacocks and views.',
                },
                category: 'cultura',
                neighborhood: 'realejo',
                duration: 60,
              },
            ],
          },
        ],
      },
    ],
    essentialTips: [
      {
        es: 'Las cocinas de los bares abren a las 13:00 — antes de esa hora solo hay desayunos',
        en: 'Bar kitchens open at 1pm — before that, only breakfast is served',
      },
      {
        es: 'Los lunes cierran muchos museos y la Capilla Real. Comprueba antes',
        en: 'Many museums and the Royal Chapel close on Mondays. Check beforehand',
      },
    ],
  },

  // ——————————————————————————————————————————
  // 12 HORAS — Un día completo sin prisas
  // ——————————————————————————————————————————
  {
    id: 'mr-003',
    slug: '12-horas-granada-sin-prisas',
    duration: '12h',
    title: {
      es: 'Granada en 12 horas sin Alhambra: ruta sin prisas',
      en: '12 Hours in Granada Without the Alhambra: Unhurried Route',
    },
    description: {
      es: 'Plan de 12 horas para quien no tiene entrada a los Palacios Nazaríes. Albaicín a fondo, monumentos gratuitos del centro, tapeo local y atardecer en el mirador. Sin correr.',
      en: '12-hour plan for visitors without Nasrid Palaces tickets. Deep Albaicín, free downtown monuments, local tapas and sunset from the viewpoint. No rushing required.',
    },
    totalHours: 12,
    neighborhoods: ['albaicin', 'centro', 'realejo', 'sacromonte'],
    bestFor: {
      es: 'Viajeros con un día completo, visitas de fin de semana',
      en: 'Travelers with a full day, weekend visits',
    },
    days: [
      {
        blocks: [
          {
            label: { es: 'Mañana (9:00–13:00)', en: 'Morning (9:00–1:00pm)' },
            stops: [
              {
                name: { es: 'Albaicín profundo', en: 'Deep Albaicín' },
                description: {
                  es: 'Sube desde Plaza Nueva por la Cuesta del Chapiz. Entra en el Palacio de Dar al-Horra (gratis, residencia de la madre de Boabdil), pasea por San Miguel Bajo, y baja por las callejuelas hasta la Placeta del Abad.',
                  en: 'Walk up from Plaza Nueva via Cuesta del Chapiz. Visit the Palacio de Dar al-Horra (free, residence of Boabdil\'s mother), stroll around San Miguel Bajo, and wander down through the alleyways to Placeta del Abad.',
                },
                category: 'paseo',
                neighborhood: 'albaicin',
                duration: 90,
              },
              {
                name: { es: 'Miradores encadenados', en: 'Viewpoint chain' },
                description: {
                  es: 'Haz la ruta San Nicolás → San Cristóbal → Mirador de la Lona. Cada uno tiene su ángulo. San Nicolás es la postal, San Cristóbal es la panorámica, La Lona es el secreto local.',
                  en: 'Do the route San Nicolás → San Cristóbal → Mirador de la Lona. Each has its angle. San Nicolás is the postcard, San Cristóbal is the panoramic, La Lona is the local secret.',
                },
                category: 'mirador',
                neighborhood: 'albaicin',
                duration: 50,
              },
              {
                name: { es: 'Vermut en Plaza Larga', en: 'Vermouth at Plaza Larga' },
                description: {
                  es: 'Baja a Plaza Larga para un vermut o una caña con tapa. Bar Aixa tiene terraza con sol por la mañana. Pide el vermut rojo de grifo.',
                  en: 'Head down to Plaza Larga for a vermouth or a beer with tapa. Bar Aixa has a terrace with morning sun. Order the red vermouth on tap.',
                },
                category: 'tapas',
                neighborhood: 'albaicin',
                duration: 30,
              },
            ],
          },
          {
            label: { es: 'Mediodía (13:00–15:30)', en: 'Midday (1:00pm–3:30pm)' },
            stops: [
              {
                name: { es: 'Centro monumental', en: 'Monumental center' },
                description: {
                  es: 'Catedral (entrada por la puerta lateral de Gran Vía), Capilla Real, Madraza (antigua universidad islámica, gratuita), Corral del Carbón (el edificio árabe más antiguo de la Península). Todo en un radio de 200 metros.',
                  en: 'Cathedral (enter through the side door on Gran Vía), Royal Chapel, Madraza (former Islamic university, free), Corral del Carbón (oldest Arabic building in the Iberian Peninsula). All within 200 meters.',
                },
                category: 'monumento',
                neighborhood: 'centro',
                duration: 60,
              },
              {
                name: { es: 'Almuerzo de tapas', en: 'Tapas lunch' },
                description: {
                  es: 'Sal del circuito turístico: Bodegas Castañeda (vinos de barril + montaditos), Los Diamantes II en Navas (fritura granadina), o La Tana en Realejo (vino natural + tapa creativa). 3-4 cañas = comida completa.',
                  en: 'Get off the tourist circuit: Bodegas Castañeda (barrel wines + montaditos), Los Diamantes II on Navas (Granada-style fried fish), or La Tana in Realejo (natural wine + creative tapas). 3-4 beers = full meal.',
                },
                category: 'tapas',
                neighborhood: 'centro',
                duration: 60,
              },
            ],
          },
          {
            label: { es: 'Tarde (15:30–18:30)', en: 'Afternoon (3:30pm–6:30pm)' },
            stops: [
              {
                name: { es: 'Realejo: arte y jardines', en: 'Realejo: art & gardens' },
                description: {
                  es: 'El barrio de los murales. Busca las obras de El Niño de las Pinturas y Raúl Ruiz. Sube al Carmen de los Mártires (jardines gratuitos, pavos reales, fuentes) — es uno de los secretos mejor guardados.',
                  en: 'The mural neighborhood. Find the works of El Niño de las Pinturas and Raúl Ruiz. Go up to Carmen de los Mártires (free gardens, peacocks, fountains) — one of Granada\'s best-kept secrets.',
                },
                category: 'cultura',
                neighborhood: 'realejo',
                duration: 60,
              },
              {
                name: { es: 'Paseo de los Tristes y Sacromonte', en: 'Paseo de los Tristes & Sacromonte' },
                description: {
                  es: 'Baja al Paseo de los Tristes, la terraza más fotogénica de Granada (literalmente bajo la Alhambra). Sube por el camino del Sacromonte hasta el Museo Cuevas — las cuevas encaladas donde vivían los gitanos.',
                  en: 'Walk down to Paseo de los Tristes, Granada\'s most photogenic terrace (literally below the Alhambra). Walk up the Sacromonte path to the Cave Museum — whitewashed caves where Roma communities lived.',
                },
                category: 'paseo',
                neighborhood: 'sacromonte',
                duration: 60,
              },
            ],
          },
          {
            label: { es: 'Noche (18:30–21:00)', en: 'Evening (6:30pm–9:00pm)' },
            stops: [
              {
                name: { es: 'Atardecer en San Nicolás', en: 'Sunset at San Nicolás' },
                description: {
                  es: 'Vuelve al mirador para el atardecer. A esta hora la Alhambra se ilumina y Sierra Nevada se tiñe de rosa. Llega 20 min antes porque se llena.',
                  en: 'Return to the viewpoint for sunset. At this hour the Alhambra lights up and Sierra Nevada turns pink. Arrive 20 min early because it gets crowded.',
                },
                category: 'mirador',
                neighborhood: 'albaicin',
                duration: 40,
              },
              {
                name: { es: 'Flamenco en cueva', en: 'Cave flamenco' },
                description: {
                  es: 'Si reservaste con antelación, cierra el día con un tablao en el Sacromonte. Cueva de la Rocío o Venta El Gallo son auténticas (no los shows para autobuses). Reserva mínimo 2 días antes.',
                  en: 'If you booked ahead, end the day with a flamenco show in Sacromonte. Cueva de la Rocío or Venta El Gallo are authentic (not the bus tour shows). Book at least 2 days in advance.',
                },
                category: 'flamenco',
                neighborhood: 'sacromonte',
                duration: 75,
                tip: {
                  es: 'Los shows empiezan entre 20:00 y 21:30. Reserva online, no en la calle.',
                  en: 'Shows start between 8pm and 9:30pm. Book online, not on the street.',
                },
              },
            ],
          },
        ],
      },
    ],
    essentialTips: [
      {
        es: 'Los bares de tapas cierran de 16:00 a 20:00 (la "hora muerta"). Planifica alrededor de eso',
        en: 'Tapas bars close from 4pm to 8pm (the "dead hour"). Plan around that',
      },
      {
        es: 'El Carmen de los Mártires cierra a las 18:00 en invierno y 20:00 en verano',
        en: 'Carmen de los Mártires closes at 6pm in winter and 8pm in summer',
      },
      {
        es: 'Si es viernes o sábado, el Albaicín tiene más vida por la noche — teterías y bares de la Calderería',
        en: 'If it\'s Friday or Saturday, the Albaicín has more nightlife — tea houses and bars on Calderería',
      },
    ],
  },

  // ——————————————————————————————————————————
  // 1 DÍA COMPLETO — Con Alhambra
  // ——————————————————————————————————————————
  {
    id: 'mr-004',
    slug: '1-dia-completo-alhambra',
    duration: '1day',
    title: {
      es: 'Ruta de 1 día en Granada con Alhambra: itinerario paso a paso',
      en: '1-Day Granada Route with Alhambra: Step-by-Step Itinerary',
    },
    description: {
      es: 'Itinerario detallado de 14 horas para quien ya tiene entrada a la Alhambra. Horarios concretos, paradas ordenadas y consejos para no perder tiempo entre monumentos, tapas y miradores.',
      en: 'Detailed 14-hour itinerary for visitors with pre-booked Alhambra tickets. Timed stops, ordered waypoints and tips to move efficiently between monuments, tapas bars and viewpoints.',
    },
    totalHours: 14,
    neighborhoods: ['alhambra', 'centro', 'realejo', 'albaicin', 'sacromonte'],
    bestFor: {
      es: 'Primera visita a Granada, viajes organizados de un día',
      en: 'First visit to Granada, organized day trips',
    },
    days: [
      {
        blocks: [
          {
            label: { es: 'Mañana (8:30–13:00)', en: 'Morning (8:30am–1:00pm)' },
            stops: [
              {
                name: { es: 'La Alhambra', en: 'The Alhambra' },
                description: {
                  es: 'Llega a las 8:30 con la entrada comprada (agótanse semanas antes). Recorre Alcazaba → Palacios Nazaríes (tu hora de entrada es fija) → Generalife. Mínimo 3 horas. No intentes correr — este sitio merece silencio.',
                  en: 'Arrive at 8:30am with tickets already purchased (they sell out weeks ahead). Walk Alcazaba → Nasrid Palaces (your entry time is fixed) → Generalife. Minimum 3 hours. Don\'t rush — this place deserves silence.',
                },
                category: 'monumento',
                neighborhood: 'alhambra',
                duration: 180,
                tip: {
                  es: 'Compra la entrada en la web oficial al menos 2 meses antes. Las visitas nocturnas los viernes y sábados son otra experiencia completamente distinta.',
                  en: 'Buy tickets on the official website at least 2 months ahead. Night visits on Fridays and Saturdays are a completely different experience.',
                },
              },
              {
                name: { es: 'Carmen de los Mártires', en: 'Carmen de los Mártires' },
                description: {
                  es: 'A la salida de la Alhambra (Puerta de la Justicia), cruza al Carmen de los Mártires. Jardines románticos, laberinto vegetal, pavos reales. Gratis y casi siempre vacío.',
                  en: 'On your way out of the Alhambra (Justice Gate), cross to Carmen de los Mártires. Romantic gardens, hedge labyrinth, peacocks. Free and almost always empty.',
                },
                category: 'naturaleza',
                neighborhood: 'realejo',
                duration: 30,
              },
            ],
          },
          {
            label: { es: 'Mediodía (13:00–15:30)', en: 'Midday (1:00pm–3:30pm)' },
            stops: [
              {
                name: { es: 'Tapeo en el Realejo', en: 'Tapas in Realejo' },
                description: {
                  es: 'Baja al Realejo, el barrio judío. Campo del Príncipe es la plaza del barrio. La Tana (vinos naturales, tapa gourmet), Bar Poë (fusión), o si quieres tradición pura: Casa Julio (caracoles y migas). Pide 3-4 cañas y comes.',
                  en: 'Head down to Realejo, the Jewish quarter. Campo del Príncipe is the main square. La Tana (natural wines, gourmet tapa), Bar Poë (fusion), or for pure tradition: Casa Julio (snails and migas). Order 3-4 beers and you\'ve eaten.',
                },
                category: 'tapas',
                neighborhood: 'realejo',
                duration: 60,
              },
              {
                name: { es: 'Murales del Realejo', en: 'Realejo murals' },
                description: {
                  es: 'El Realejo es una galería de arte al aire libre. Los murales de El Niño de las Pinturas están por todo el barrio — el más famoso en la Cuesta del Caidero. Arte urbano de calidad internacional.',
                  en: 'Realejo is an open-air art gallery. El Niño de las Pinturas\' murals are all over — the most famous on Cuesta del Caidero. Street art of international quality.',
                },
                category: 'cultura',
                neighborhood: 'realejo',
                duration: 30,
              },
            ],
          },
          {
            label: { es: 'Tarde (15:30–18:00)', en: 'Afternoon (3:30pm–6:00pm)' },
            stops: [
              {
                name: { es: 'Centro monumental', en: 'Monumental center' },
                description: {
                  es: 'Capilla Real (imprescindible), Madraza (la primera universidad de Granada, entrada gratuita), Corral del Carbón (posada árabe del s.XIV). Paseo por Alcaicería (el antiguo zoco de seda, ahora tiendas de souvenirs — más bonito que útil).',
                  en: 'Royal Chapel (essential), Madraza (Granada\'s first university, free entry), Corral del Carbón (14th century Arabic inn). Stroll through Alcaicería (the old silk bazaar, now souvenir shops — more picturesque than useful).',
                },
                category: 'monumento',
                neighborhood: 'centro',
                duration: 75,
              },
              {
                name: { es: 'Calderería Nueva', en: 'Calderería Nueva' },
                description: {
                  es: 'La calle de las teterías. Aunque es turístico, las teterías son reales — el té con piñones y la pastelería marroquí merecen la pena. Abyana o As-Sirat son buenas opciones.',
                  en: 'The tea house street. Although touristy, the tea houses are genuine — the tea with pine nuts and Moroccan pastries are worth it. Abyana or As-Sirat are good choices.',
                },
                category: 'cultura',
                neighborhood: 'centro',
                duration: 30,
              },
            ],
          },
          {
            label: { es: 'Atardecer y noche (18:00–22:00)', en: 'Sunset & evening (6:00pm–10:00pm)' },
            stops: [
              {
                name: { es: 'Atardecer desde San Nicolás', en: 'Sunset from San Nicolás' },
                description: {
                  es: 'Sube al mirador de San Nicolás para el atardecer. La Alhambra iluminada, Sierra Nevada rosada, los vencejos volando. Uno de los mejores atardeceres de Europa — no es hipérbole.',
                  en: 'Walk up to San Nicolás viewpoint for sunset. The illuminated Alhambra, pink Sierra Nevada, swallows flying. One of Europe\'s best sunsets — not hyperbole.',
                },
                category: 'mirador',
                neighborhood: 'albaicin',
                duration: 45,
              },
              {
                name: { es: 'Cena de tapas en el Albaicín', en: 'Tapas dinner in the Albaicín' },
                description: {
                  es: 'Quédate en el Albaicín para cenar. El Huerto de Juan Ranas tiene vistas (caro pero inolvidable), o baja a Carmen de las Tomasas. Para tapas locales: Rincón de Aurora en San Miguel Bajo.',
                  en: 'Stay in the Albaicín for dinner. El Huerto de Juan Ranas has views (expensive but unforgettable), or go down to Carmen de las Tomasas. For local tapas: Rincón de Aurora in San Miguel Bajo.',
                },
                category: 'tapas',
                neighborhood: 'albaicin',
                duration: 75,
              },
            ],
          },
        ],
      },
    ],
    essentialTips: [
      {
        es: 'La entrada a la Alhambra DEBE comprarse con antelación. Se agotan semanas antes, especialmente en primavera',
        en: 'Alhambra tickets MUST be purchased in advance. They sell out weeks ahead, especially in spring',
      },
      {
        es: 'Lleva agua y protección solar para la Alhambra — hay pocas sombras en la Alcazaba',
        en: 'Bring water and sun protection for the Alhambra — there\'s little shade in the Alcazaba',
      },
      {
        es: 'Si no consigues entrada completa, la visita a jardines y Alcazaba (sin Palacios Nazaríes) también merece la pena y hay más disponibilidad',
        en: 'If you can\'t get full tickets, the garden and Alcazaba visit (without Nasrid Palaces) is also worthwhile and has more availability',
      },
    ],
  },

  // ——————————————————————————————————————————
  // 2 DÍAS — Granada a fondo
  // ——————————————————————————————————————————
  {
    id: 'mr-005',
    slug: '2-dias-granada-a-fondo',
    duration: '2days',
    title: {
      es: '2 días en Granada: la ciudad a fondo',
      en: '2 days in Granada: the city in depth',
    },
    description: {
      es: 'Dos días para conocer Granada de verdad. Día 1: Alhambra, centro y Realejo. Día 2: Albaicín, Sacromonte, mercados y vida local. Con tiempo para sentarte, tapear sin prisa y ver atardecer dos veces.',
      en: 'Two days to truly know Granada. Day 1: Alhambra, center and Realejo. Day 2: Albaicín, Sacromonte, markets and local life. With time to sit, tapas without rushing and watch two sunsets.',
    },
    totalHours: 28,
    neighborhoods: ['alhambra', 'centro', 'realejo', 'albaicin', 'sacromonte'],
    bestFor: {
      es: 'Fin de semana en Granada, viajes culturales, parejas',
      en: 'Weekend in Granada, cultural trips, couples',
    },
    days: [
      {
        day: 1,
        label: {
          es: 'Día 1: Alhambra, Centro y Realejo',
          en: 'Day 1: Alhambra, Center & Realejo',
        },
        blocks: [
          {
            label: { es: 'Mañana (8:30–13:00)', en: 'Morning (8:30am–1:00pm)' },
            stops: [
              {
                name: { es: 'La Alhambra completa', en: 'The complete Alhambra' },
                description: {
                  es: 'Dedica toda la mañana a la Alhambra sin prisas. Empieza por la Alcazaba para las vistas, sigue con Palacios Nazaríes (respeta tu hora) y termina en el Generalife. Los jardines del Partal son lo más infravalorado.',
                  en: 'Dedicate the entire morning to the Alhambra without rushing. Start with the Alcazaba for the views, continue to Nasrid Palaces (respect your time slot) and finish at the Generalife. The Partal gardens are the most underrated part.',
                },
                category: 'monumento',
                neighborhood: 'alhambra',
                duration: 210,
              },
            ],
          },
          {
            label: { es: 'Mediodía (13:00–15:30)', en: 'Midday (1:00pm–3:30pm)' },
            stops: [
              {
                name: { es: 'Carmen de los Mártires + bajada al Realejo', en: 'Carmen de los Mártires + walk to Realejo' },
                description: {
                  es: 'A la salida, Carmen de los Mártires. Luego baja por el Bosque de la Alhambra (el camino entre árboles centenarios) hasta el Realejo.',
                  en: 'On your way out, Carmen de los Mártires. Then walk down through the Alhambra Forest (the path among centuries-old trees) to Realejo.',
                },
                category: 'naturaleza',
                neighborhood: 'realejo',
                duration: 40,
              },
              {
                name: { es: 'Almuerzo largo en el Realejo', en: 'Long lunch in Realejo' },
                description: {
                  es: 'Campo del Príncipe: terraza con sol en invierno. Prueba Om Kalsoum (fusión árabe-andaluza), La Tana (vinos naturales) o los clásicos de siempre en La Trastienda. Hoy comes sentado — mañana tapeas.',
                  en: 'Campo del Príncipe: sunny terrace in winter. Try Om Kalsoum (Arabic-Andalusian fusion), La Tana (natural wines) or the classics at La Trastienda. Today you eat seated — tomorrow you\'ll tapas-hop.',
                },
                category: 'tapas',
                neighborhood: 'realejo',
                duration: 75,
              },
            ],
          },
          {
            label: { es: 'Tarde (15:30–18:30)', en: 'Afternoon (3:30pm–6:30pm)' },
            stops: [
              {
                name: { es: 'Centro monumental y compras', en: 'Monumental center & shopping' },
                description: {
                  es: 'Capilla Real, Madraza (gratis), paseo por Alcaicería. Para compras con sentido: cerámica de Fajalauza (la de toda la vida, azul y verde) en las tiendas de la Cuesta de Gomérez, no en la Alcaicería.',
                  en: 'Royal Chapel, Madraza (free), stroll through Alcaicería. For meaningful shopping: Fajalauza ceramics (traditional blue and green) at shops on Cuesta de Gomérez, not in the Alcaicería.',
                },
                category: 'monumento',
                neighborhood: 'centro',
                duration: 90,
              },
              {
                name: { es: 'Atardecer en Carrera del Darro', en: 'Sunset on Carrera del Darro' },
                description: {
                  es: 'La Carrera del Darro al atardecer, con la Alhambra iluminándose arriba. Siéntate en la terraza del Paseo de los Tristes con una copa. El momento más romántico de Granada.',
                  en: 'Carrera del Darro at sunset, with the Alhambra lighting up above. Sit on the Paseo de los Tristes terrace with a glass of wine. Granada\'s most romantic moment.',
                },
                category: 'paseo',
                neighborhood: 'centro',
                duration: 45,
              },
            ],
          },
          {
            label: { es: 'Noche (20:30–22:30)', en: 'Night (8:30pm–10:30pm)' },
            stops: [
              {
                name: { es: 'Cena en el centro', en: 'Dinner in the center' },
                description: {
                  es: 'Chikito (cocina granadina moderna, donde García Lorca tenía su tertulia), Arrayanes (cocina marroquí auténtica en la Calderería) o Damascueros (alta cocina con producto local). Reserva en cualquiera de los tres.',
                  en: 'Chikito (modern Granada cuisine, where García Lorca held his literary gatherings), Arrayanes (authentic Moroccan cuisine on Calderería) or Damascueros (fine dining with local produce). Book at any of the three.',
                },
                category: 'tapas',
                neighborhood: 'centro',
                duration: 90,
              },
            ],
          },
        ],
      },
      {
        day: 2,
        label: {
          es: 'Día 2: Albaicín, Sacromonte y vida local',
          en: 'Day 2: Albaicín, Sacromonte & local life',
        },
        blocks: [
          {
            label: { es: 'Mañana (9:00–13:00)', en: 'Morning (9:00am–1:00pm)' },
            stops: [
              {
                name: { es: 'Albaicín sin prisas', en: 'Albaicín without rushing' },
                description: {
                  es: 'Hoy es el día de perderse. Sube por la Cuesta del Chapiz, entra en el Palacio de Dar al-Horra (gratis), pasea por San Miguel Bajo. Baja por callejones que no están en Google Maps. Cada esquina es una foto.',
                  en: 'Today is the day to get lost. Walk up Cuesta del Chapiz, visit Palacio de Dar al-Horra (free), wander around San Miguel Bajo. Walk down alleys that aren\'t on Google Maps. Every corner is a photo.',
                },
                category: 'paseo',
                neighborhood: 'albaicin',
                duration: 90,
              },
              {
                name: { es: 'Miradores secretos', en: 'Secret viewpoints' },
                description: {
                  es: 'Hoy no vayas a San Nicolás — ya lo harás al atardecer. Busca el Mirador de la Lona (panorámica 360°), el de San Cristóbal (toda la Vega) y el del Ojo de Granada (el más escondido, pregunta a un vecino).',
                  en: 'Today skip San Nicolás — you\'ll go at sunset. Find Mirador de la Lona (360° panoramic), San Cristóbal (the entire Vega plain) and Ojo de Granada (the most hidden, ask a local).',
                },
                category: 'mirador',
                neighborhood: 'albaicin',
                duration: 45,
              },
              {
                name: { es: 'Desayuno tardío en Plaza Larga', en: 'Late breakfast at Plaza Larga' },
                description: {
                  es: 'Tostada con aceite y jamón en Bar Aixa o Casa Pasteles. Si es sábado, mercado de artesanía con productos locales.',
                  en: 'Toast with olive oil and jamón at Bar Aixa or Casa Pasteles. If it\'s Saturday, craft market with local products.',
                },
                category: 'tapas',
                neighborhood: 'albaicin',
                duration: 30,
              },
            ],
          },
          {
            label: { es: 'Mediodía (13:00–15:30)', en: 'Midday (1:00pm–3:30pm)' },
            stops: [
              {
                name: { es: 'Sacromonte: cuevas y camino', en: 'Sacromonte: caves & path' },
                description: {
                  es: 'Sigue el Camino del Sacromonte desde el Paseo de los Tristes. Museo Cuevas del Sacromonte (la vida tradicional gitana). El camino sigue hasta la Abadía del Sacromonte — vistas que pocos turistas conocen.',
                  en: 'Follow the Sacromonte path from Paseo de los Tristes. Sacromonte Cave Museum (traditional Roma life). The path continues to Sacromonte Abbey — views that few tourists know.',
                },
                category: 'cultura',
                neighborhood: 'sacromonte',
                duration: 90,
              },
              {
                name: { es: 'Tapeo callejero', en: 'Street-style tapas' },
                description: {
                  es: 'Hoy toca ruta de bares. Empieza en el bajo Albaicín (Bar Lara, Casa Torcuato), baja al centro (Bodegas Castañeda, La Riviera). La regla: una caña por bar, nunca más de dos.',
                  en: 'Today\'s a bar crawl day. Start in lower Albaicín (Bar Lara, Casa Torcuato), head downtown (Bodegas Castañeda, La Riviera). The rule: one beer per bar, never more than two.',
                },
                category: 'tapas',
                neighborhood: 'centro',
                duration: 75,
              },
            ],
          },
          {
            label: { es: 'Tarde-noche (17:00–22:00)', en: 'Late afternoon & night (5:00pm–10:00pm)' },
            stops: [
              {
                name: { es: 'Atardecer desde San Nicolás', en: 'Sunset from San Nicolás' },
                description: {
                  es: 'Ahora sí: San Nicolás al atardecer. Después de dos días en Granada, esta vista significa más. Llega 20 minutos antes para conseguir sitio en el muro.',
                  en: 'Now it\'s time: San Nicolás at sunset. After two days in Granada, this view means more. Arrive 20 minutes early to get a spot on the wall.',
                },
                category: 'mirador',
                neighborhood: 'albaicin',
                duration: 45,
              },
              {
                name: { es: 'Flamenco en cueva', en: 'Cave flamenco' },
                description: {
                  es: 'Cierra tu viaje con flamenco auténtico en el Sacromonte. Cueva de la Rocío, Venta El Gallo o María la Canastera. No vayas a los que te venden en la calle — reserva online con antelación.',
                  en: 'Close your trip with authentic flamenco in Sacromonte. Cueva de la Rocío, Venta El Gallo or María la Canastera. Don\'t go to the ones sold on the street — book online in advance.',
                },
                category: 'flamenco',
                neighborhood: 'sacromonte',
                duration: 75,
                tip: {
                  es: 'Los mejores tablaos cuestan entre 20€-30€. Si te piden más de 35€ es que no es auténtico.',
                  en: 'The best tablaos cost €20-30. If they charge more than €35 it\'s not authentic.',
                },
              },
            ],
          },
        ],
      },
    ],
    essentialTips: [
      {
        es: 'Compra la entrada de la Alhambra con 2 meses de antelación — es lo primero que debes hacer al planificar el viaje',
        en: 'Buy Alhambra tickets 2 months in advance — it\'s the first thing to do when planning your trip',
      },
      {
        es: 'Granada se recorre a pie. No necesitas transporte salvo para Sierra Nevada',
        en: 'Granada is walkable. You don\'t need transport except for Sierra Nevada',
      },
      {
        es: 'En verano (julio-agosto), evita pasear entre 14:00 y 18:00 — el calor es brutal. Siesta y tapas en interior.',
        en: 'In summer (July-August), avoid walking between 2pm and 6pm — the heat is brutal. Siesta and indoor tapas.',
      },
    ],
  },

  // ——————————————————————————————————————————
  // 3 DÍAS — Granada y alrededores
  // ——————————————————————————————————————————
  {
    id: 'mr-006',
    slug: '3-dias-granada-y-alrededores',
    duration: '3days',
    title: {
      es: '3 días: Granada, sus barrios y alrededores',
      en: '3 days: Granada, its neighborhoods & surroundings',
    },
    description: {
      es: 'Tres días para vivir Granada como un local. Alhambra, barrios con alma, pueblos de la Alpujarra, mercados de barrio, flamenco, atardeceres y las mejores tapas de Andalucía. Con calma.',
      en: 'Three days to live Granada like a local. Alhambra, soulful neighborhoods, Alpujarra villages, local markets, flamenco, sunsets and the best tapas in Andalusia. Unhurried.',
    },
    totalHours: 42,
    neighborhoods: ['alhambra', 'centro', 'realejo', 'albaicin', 'sacromonte', 'cartuja'],
    bestFor: {
      es: 'Viajes largos, exploradores, amantes de la cultura, familias',
      en: 'Longer trips, explorers, culture lovers, families',
    },
    days: [
      {
        day: 1,
        label: {
          es: 'Día 1: Alhambra y Centro',
          en: 'Day 1: Alhambra & Center',
        },
        blocks: [
          {
            label: { es: 'Mañana (8:30–13:30)', en: 'Morning (8:30am–1:30pm)' },
            stops: [
              {
                name: { es: 'Alhambra sin prisas', en: 'Alhambra unhurried' },
                description: {
                  es: 'Con tres días puedes dedicarle toda la mañana. No te saltes el Partal ni los jardines altos del Generalife. Hay rincones donde estarás solo si te sales del camino principal.',
                  en: 'With three days you can dedicate the entire morning. Don\'t skip the Partal or the upper Generalife gardens. There are corners where you\'ll be alone if you step off the main path.',
                },
                category: 'monumento',
                neighborhood: 'alhambra',
                duration: 210,
              },
              {
                name: { es: 'Carmen de los Mártires', en: 'Carmen de los Mártires' },
                description: {
                  es: 'Jardines románticos con vistas, laberinto, estanques. Los pavos reales pasean libres. Perfecto para bajar el ritmo después de la Alhambra.',
                  en: 'Romantic gardens with views, labyrinth, ponds. Peacocks roam free. Perfect to slow down after the Alhambra.',
                },
                category: 'naturaleza',
                neighborhood: 'realejo',
                duration: 30,
              },
            ],
          },
          {
            label: { es: 'Mediodía (13:30–16:00)', en: 'Midday (1:30pm–4:00pm)' },
            stops: [
              {
                name: { es: 'Almuerzo largo en el Realejo', en: 'Long lunch in Realejo' },
                description: {
                  es: 'Con tres días, hoy puedes comer sentado con calma. Damascueros (alta cocina granadina, menú degustación excelente), Om Kalsoum (fusión mediterráneo-árabe) o La Trastienda (cocina de mercado).',
                  en: 'With three days, today you can sit and eat calmly. Damascueros (Granada fine dining, excellent tasting menu), Om Kalsoum (Mediterranean-Arabic fusion) or La Trastienda (market cuisine).',
                },
                category: 'tapas',
                neighborhood: 'realejo',
                duration: 90,
              },
            ],
          },
          {
            label: { es: 'Tarde (16:00–19:00)', en: 'Afternoon (4:00pm–7:00pm)' },
            stops: [
              {
                name: { es: 'Centro monumental', en: 'Monumental center' },
                description: {
                  es: 'Capilla Real (imprescindible), Catedral (exterior + interior si quieres), Madraza, Corral del Carbón. Paseo por la Alcaicería y Calderería Nueva.',
                  en: 'Royal Chapel (essential), Cathedral (exterior + interior if you want), Madraza, Corral del Carbón. Stroll through Alcaicería and Calderería Nueva.',
                },
                category: 'monumento',
                neighborhood: 'centro',
                duration: 90,
              },
              {
                name: { es: 'Merienda en tetería', en: 'Afternoon tea at a tea house' },
                description: {
                  es: 'Calderería Nueva: Abyana o Kasbah. Té con piñones, pastelería marroquí y un rato de calma. Las teterías son parte de la identidad granadina.',
                  en: 'Calderería Nueva: Abyana or Kasbah. Tea with pine nuts, Moroccan pastries and a moment of calm. Tea houses are part of Granada\'s identity.',
                },
                category: 'cultura',
                neighborhood: 'centro',
                duration: 40,
              },
            ],
          },
          {
            label: { es: 'Noche (20:00–22:30)', en: 'Night (8:00pm–10:30pm)' },
            stops: [
              {
                name: { es: 'Ruta de tapas por el centro', en: 'Tapas crawl through the center' },
                description: {
                  es: 'Bodegas Castañeda → Los Diamantes → La Riviera → Bar Ávila. Una caña por bar, la tapa viene gratis. En 4 bares has cenado y has pagado menos de 10€.',
                  en: 'Bodegas Castañeda → Los Diamantes → La Riviera → Bar Ávila. One beer per bar, the tapa comes free. In 4 bars you\'ve had dinner and paid less than €10.',
                },
                category: 'tapas',
                neighborhood: 'centro',
                duration: 90,
              },
            ],
          },
        ],
      },
      {
        day: 2,
        label: {
          es: 'Día 2: Albaicín, Sacromonte y flamenco',
          en: 'Day 2: Albaicín, Sacromonte & flamenco',
        },
        blocks: [
          {
            label: { es: 'Mañana (9:00–13:00)', en: 'Morning (9:00am–1:00pm)' },
            stops: [
              {
                name: { es: 'Albaicín en profundidad', en: 'Albaicín in depth' },
                description: {
                  es: 'Sube por la Cuesta del Chapiz. Palacio de Dar al-Horra, iglesias mudéjares de San Juan de los Reyes y San José. Piérdete por las callejuelas — cada esquina revela un aljibe o un carmen escondido.',
                  en: 'Walk up Cuesta del Chapiz. Palacio de Dar al-Horra, Mudéjar churches of San Juan de los Reyes and San José. Get lost in the alleys — every corner reveals a cistern or hidden carmen.',
                },
                category: 'paseo',
                neighborhood: 'albaicin',
                duration: 90,
              },
              {
                name: { es: 'Cadena de miradores', en: 'Viewpoint chain' },
                description: {
                  es: 'San Cristóbal (panorámica de la Vega) → Mirador de la Lona (360°) → San Nicolás (la postal). Por la mañana tendrás estos miradores para ti solo.',
                  en: 'San Cristóbal (Vega panoramic) → Mirador de la Lona (360°) → San Nicolás (the postcard). In the morning you\'ll have these viewpoints to yourself.',
                },
                category: 'mirador',
                neighborhood: 'albaicin',
                duration: 50,
              },
              {
                name: { es: 'Brunch en San Miguel Bajo', en: 'Brunch at San Miguel Bajo' },
                description: {
                  es: 'Plaza de San Miguel Bajo: El Bar de Eric (brunch internacional), o desayuno tradicional en Bar Aixa (tostada con aceite). La plaza tiene terraza con sol todo el año.',
                  en: 'Plaza de San Miguel Bajo: El Bar de Eric (international brunch), or traditional breakfast at Bar Aixa (toast with olive oil). The square has a sunny terrace year-round.',
                },
                category: 'tapas',
                neighborhood: 'albaicin',
                duration: 40,
              },
            ],
          },
          {
            label: { es: 'Mediodía (13:00–16:00)', en: 'Midday (1:00pm–4:00pm)' },
            stops: [
              {
                name: { es: 'Sacromonte', en: 'Sacromonte' },
                description: {
                  es: 'Sigue el Camino del Sacromonte. Museo Cuevas (la vida en las cuevas), las cactáceas del camino, la Abadía del Sacromonte arriba del todo (vistas increíbles y museo de arte sacro). El camino a la abadía es empinado pero merece la pena.',
                  en: 'Follow the Sacromonte path. Cave Museum (cave life), the cactus landscape, Sacromonte Abbey at the very top (incredible views and sacred art museum). The path to the abbey is steep but worth it.',
                },
                category: 'cultura',
                neighborhood: 'sacromonte',
                duration: 120,
              },
            ],
          },
          {
            label: { es: 'Tarde (16:00–19:00)', en: 'Afternoon (4:00pm–7:00pm)' },
            stops: [
              {
                name: { es: 'Cartuja: el barroco escondido', en: 'Cartuja: hidden baroque' },
                description: {
                  es: 'El Monasterio de la Cartuja es la joya barroca más exagerada de España y casi nadie va. La sacristía es de otro planeta — mármoles, frescos, horror vacui total. Coge el bus C1 desde el centro.',
                  en: 'The Cartuja Monastery is Spain\'s most extravagant baroque gem and almost nobody visits. The sacristy is from another planet — marble, frescoes, total horror vacui. Take bus C1 from the center.',
                },
                category: 'monumento',
                neighborhood: 'cartuja',
                duration: 60,
                tip: {
                  es: 'El bus C1 sale de Gran Vía cada 10 minutos. Cierra a las 20:00.',
                  en: 'Bus C1 leaves from Gran Vía every 10 minutes. Closes at 8pm.',
                },
              },
              {
                name: { es: 'Huerta de San Vicente', en: 'Huerta de San Vicente' },
                description: {
                  es: 'La casa de verano de Federico García Lorca, donde escribió Bodas de Sangre y Yerma. Visita guiada corta pero intensa. El parque que la rodea es perfecto para descansar.',
                  en: 'Federico García Lorca\'s summer house, where he wrote Blood Wedding and Yerma. Short but intense guided tour. The surrounding park is perfect for resting.',
                },
                category: 'cultura',
                neighborhood: 'centro',
                duration: 45,
              },
            ],
          },
          {
            label: { es: 'Noche (20:00–23:00)', en: 'Night (8:00pm–11:00pm)' },
            stops: [
              {
                name: { es: 'Atardecer y tapas en Albaicín', en: 'Sunset & tapas in Albaicín' },
                description: {
                  es: 'Sube a San Nicolás para el atardecer. Después, tapea por el bajo Albaicín: Bar Lara, Casa Torcuato, Rincón de Aurora. Termina la noche en la Placeta de San Miguel Bajo.',
                  en: 'Head up to San Nicolás for sunset. Then tapas-hop through lower Albaicín: Bar Lara, Casa Torcuato, Rincón de Aurora. End the night at Placeta de San Miguel Bajo.',
                },
                category: 'tapas',
                neighborhood: 'albaicin',
                duration: 75,
              },
              {
                name: { es: 'Flamenco en cueva', en: 'Cave flamenco' },
                description: {
                  es: 'El broche final del día. Cueva de la Rocío, Venta El Gallo o Zambra María la Canastera. Reserva con antelación — los buenos se llenan.',
                  en: 'The perfect ending. Cueva de la Rocío, Venta El Gallo or Zambra María la Canastera. Book ahead — the good ones fill up.',
                },
                category: 'flamenco',
                neighborhood: 'sacromonte',
                duration: 75,
              },
            ],
          },
        ],
      },
      {
        day: 3,
        label: {
          es: 'Día 3: Alrededores y vida local',
          en: 'Day 3: Surroundings & local life',
        },
        blocks: [
          {
            label: { es: 'Mañana (8:30–13:00)', en: 'Morning (8:30am–1:00pm)' },
            stops: [
              {
                name: { es: 'Excursión: La Alpujarra', en: 'Day trip: The Alpujarra' },
                description: {
                  es: 'Alquila un coche o únete a una excursión organizada. Pueblos blancos colgados de la montaña: Pampaneira, Bubión y Capileira. Artesanía textil, jamón de Trevélez, aceite de oliva. La España que desaparece, preservada aquí. Carretera espectacular con curvas — no apta para prisa.',
                  en: 'Rent a car or join an organized trip. White villages hanging from the mountain: Pampaneira, Bubión and Capileira. Textile crafts, Trevélez ham, olive oil. A disappearing Spain, preserved here. Spectacular winding road — not for those in a hurry.',
                },
                category: 'naturaleza',
                neighborhood: 'otro',
                duration: 180,
                tip: {
                  es: 'Si no tienes coche, hay autobuses ALSA desde la estación de Granada a las 8:30 y 12:00. Reserva ida y vuelta.',
                  en: 'If you don\'t have a car, ALSA buses leave from Granada station at 8:30am and 12:00pm. Book round-trip.',
                },
              },
            ],
          },
          {
            label: { es: 'Mediodía (13:00–15:30)', en: 'Midday (1:00pm–3:30pm)' },
            stops: [
              {
                name: { es: 'Almuerzo en la Alpujarra', en: 'Lunch in the Alpujarra' },
                description: {
                  es: 'Plato alpujarreño en Pampaneira o Bubión: patatas, morcilla, chorizo, huevo frito, jamón. Contundente, barato, inolvidable. El vino de la costa tropical va bien con todo.',
                  en: 'Plato alpujarreño in Pampaneira or Bubión: potatoes, blood sausage, chorizo, fried egg, ham. Hearty, cheap, unforgettable. Costa Tropical wine pairs well with everything.',
                },
                category: 'tapas',
                neighborhood: 'otro',
                duration: 60,
              },
            ],
          },
          {
            label: { es: 'Tarde (16:00–19:00)', en: 'Afternoon (4:00pm–7:00pm)' },
            stops: [
              {
                name: { es: 'Vuelta a Granada: barrio del Zaidín', en: 'Return to Granada: Zaidín neighborhood' },
                description: {
                  es: 'Si vuelves con tiempo, acércate al Zaidín — el barrio más "real" de Granada. Mercado de San Agustín (si es por la mañana), bares sin turistas, vida de barrio. Bar La Mancha tiene las mejores croquetas de la ciudad.',
                  en: 'If you return with time, visit Zaidín — Granada\'s most "real" neighborhood. Mercado de San Agustín (if morning), bars without tourists, neighborhood life. Bar La Mancha has the city\'s best croquetas.',
                },
                category: 'paseo',
                neighborhood: 'zaidin',
                duration: 60,
              },
              {
                name: { es: 'Último atardecer', en: 'Last sunset' },
                description: {
                  es: 'Para tu último atardecer, prueba algo diferente: sube a la Silla del Moro (por encima de la Alhambra). Casi nadie sube aquí y ves la Alhambra desde arriba. O vuelve a San Nicolás — ya es tu lugar.',
                  en: 'For your last sunset, try something different: hike up to Silla del Moro (above the Alhambra). Almost nobody comes here and you see the Alhambra from above. Or go back to San Nicolás — it\'s your spot now.',
                },
                category: 'mirador',
                neighborhood: 'alhambra',
                duration: 45,
              },
            ],
          },
          {
            label: { es: 'Noche (20:00–22:00)', en: 'Night (8:00pm–10:00pm)' },
            stops: [
              {
                name: { es: 'Última cena granadina', en: 'Last Granada dinner' },
                description: {
                  es: 'Cierra el viaje como un granadino: ruta de tapas final. Los sitios que más te gustaron, o prueba los que te faltaron. Bodegas Castañeda para el vermut de despedida, Los Diamantes para el último pescaíto.',
                  en: 'Close the trip like a local: final tapas route. The places you liked most, or try the ones you missed. Bodegas Castañeda for a farewell vermouth, Los Diamantes for one last fried fish.',
                },
                category: 'tapas',
                neighborhood: 'centro',
                duration: 90,
              },
            ],
          },
        ],
      },
    ],
    essentialTips: [
      {
        es: 'Para la Alpujarra necesitas medio día mínimo. Si tienes coche, la carretera por Sierra Nevada (A-395 → A-4132) es espectacular',
        en: 'The Alpujarra needs at least half a day. If you have a car, the road through Sierra Nevada (A-395 → A-4132) is spectacular',
      },
      {
        es: 'El tercer día es flexible: Sierra Nevada en invierno (30 min en coche), la costa tropical en verano (45 min), o la Alpujarra todo el año',
        en: 'Day three is flexible: Sierra Nevada in winter (30 min drive), the tropical coast in summer (45 min), or the Alpujarra year-round',
      },
      {
        es: 'Granada tiene Uber y Cabify. El bus urbano C1 y C2 suben al Albaicín si estás cansado de cuestas',
        en: 'Granada has Uber and Cabify. City buses C1 and C2 go up to the Albaicín if you\'re tired of hills',
      },
    ],
  },
];
