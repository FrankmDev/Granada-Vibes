import type { Route } from '@types';

// ============================================================
// ROUTES — Tapeo · Cultural · Naturaleza · Artesanía
// ============================================================

export const routes: Route[] = [

  // ——————————————————————————————————————————
  // TAPEO
  // ——————————————————————————————————————————
  {
    id: 'rte-001',
    slug: 'ruta-tapeo-tradicional',
    title: {
      es: 'Ruta de Tapeo Tradicional',
      en: 'Traditional Tapas Route',
    },
    description: {
      es: 'Cinco instituciones del centro y el Realejo donde las tapas siguen siendo gratis con la bebida. Desde la bodega más antigua de Granada hasta el mejor bar de vinos del Realejo, dos horas andando entre bares históricos.',
      en: 'Five institutions in the center and the Realejo where tapas are still free with every drink. From Granada\'s oldest bodega to the best wine bar in the Realejo — two hours walking between historic bars.',
    },
    category: 'tapas',
    difficulty: 'easy',
    duration: 180,
    distance: 2.0,
    timeOfDay: 'evening',
    neighborhoods: ['centro', 'realejo'],
    highlights: [
      {
        title: { es: 'Bodegas Castañeda — Calle Almireceros, 1', en: 'Bodegas Castañeda — Calle Almireceros, 1' },
        description: {
          es: 'La bodega más emblemática de Granada desde 1927. Vermut servido desde barriles de madera empotrados en la pared, embutidos ibéricos y el legendario "calicasas" — mezcla de vinos que solo encuentras aquí.',
          en: 'Granada\'s most iconic bodega since 1927. Vermouth poured from wooden barrels set into the walls, Iberian cold cuts, and the legendary "calicasas" — a local wine blend you\'ll only find here.',
        },
      },
      {
        title: { es: 'Bar Casa Julio — Calle Hermosa, 5', en: 'Bar Casa Julio — Calle Hermosa, 5' },
        description: {
          es: 'Taberna de pescaíto frito desde 1947. El cazón en adobo, los calamares y las berenjenas con miel son los clásicos. Bar minúsculo que se desborda a la calle en hora punta.',
          en: 'Fried fish bar since 1947. Marinated dogfish, squid, and aubergine with honey are the classics. Tiny bar that spills out onto the street at peak hours.',
        },
      },
      {
        title: { es: 'Los Manueles — Calle Reyes Católicos, 61', en: 'Los Manueles — Calle Reyes Católicos, 61' },
        description: {
          es: 'Institución granadina desde 1917. Las croquetas caseras y los huevos estrellados con jamón son sus tapas más pedidas. Cocina continua todos los días — sin horario de cierre a mediodía.',
          en: 'Granada institution since 1917. Homemade croquettes and eggs with ham are their most ordered tapas. Continuous kitchen every day — no midday closing.',
        },
      },
      {
        title: { es: 'Bar Ávila — Calle Verónica de la Virgen, 16', en: 'Bar Ávila — Calle Verónica de la Virgen, 16' },
        description: {
          es: 'Bar del Realejo desde 1967 famoso por su jamón asado: crujiente por fuera, meloso por dentro. También sirven caracoles en temporada y calamaritos fritos. Llega antes de las 21:00 para evitar la cola.',
          en: 'Realejo bar since 1967 famous for its roasted ham: crispy outside, tender inside. They also serve snails in season and small fried squid. Arrive before 9 PM to avoid the queue.',
        },
      },
      {
        title: { es: 'Taberna La Tana — Placeta del Agua, 3', en: 'Taberna La Tana — Placeta del Agua, 3' },
        description: {
          es: 'La mejor carta de vinos de Granada: casi 600 referencias con 80 disponibles por copa. Fundada en 1993 por la familia González en el corazón del Realejo. El sumiller Jesús González recomienda sin pretensiones.',
          en: 'Granada\'s best wine list: nearly 600 references with 80 available by the glass. Founded in 1993 by the González family in the heart of the Realejo. Sommelier Jesús González recommends without pretension.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Hora de salida', en: 'Departure time' },
        content: {
          es: 'Empieza sobre las 20:30. Los granadinos tapean tarde — antes de esa hora los bares están medio vacíos.',
          en: 'Start around 8:30 PM. Granadinos tapas late — before that the bars are half-empty.',
        },
      },
      {
        title: { es: '"Un cuarto" de cerveza', en: '"Un cuarto" of beer' },
        content: {
          es: 'Pide "un cuarto" en lugar de "una caña". Es la medida tradicional granadina: unos 100 ml, más fría y a mejor precio. Los locales siempre piden así.',
          en: 'Order "un cuarto" instead of "una caña". It\'s the traditional Granada measure: about 100 ml, colder and cheaper. Locals always order this way.',
        },
      },
      {
        title: { es: 'Efectivo en los bares pequeños', en: 'Cash at small bars' },
        content: {
          es: 'Bar Casa Julio y Bar Ávila no siempre aceptan tarjeta. Lleva algo de efectivo para no quedarte sin tapa.',
          en: 'Bar Casa Julio and Bar Ávila don\'t always accept cards. Bring some cash so you don\'t miss out on a tapa.',
        },
      },
      {
        title: { es: 'En La Tana: deja que te recomienden', en: 'At La Tana: let them recommend' },
        content: {
          es: 'Di tu presupuesto y de qué has comido antes. Jesús o Luisa González te encontrarán el vino perfecto — tienen vinos de todas las regiones de España y de media Europa.',
          en: 'Tell them your budget and what you\'ve eaten. Jesús or Luisa González will find you the perfect wine — they stock wines from every Spanish region and half of Europe.',
        },
      },
    ],
    tags: ['gastronomía', 'tapas', 'bares', 'tradicional', 'centro', 'realejo', 'vinos'],
    featured: true,
    image: '/images/routes/tapas-granada.jpg',
    longDescription: {
      es: 'Granada es una de las últimas ciudades de España donde la tapa sigue siendo gratis con cada consumición — una costumbre que se remonta a las tabernas andaluzas del siglo XIX y que aquí se mantiene como un rito social irrenunciable. Esta ruta recorre cinco instituciones que suman más de cuatro siglos de historia entre todas: Bodegas Castañeda (1927), Los Manueles (1917), Bar Casa Julio (1947), Bar Ávila (1967) y Taberna La Tana (1993). El recorrido va del centro al Realejo, el antiguo barrio judío, combinando bodega de barriles, taberna de pescaíto frito, cocina andaluza clásica, bar de jamón asado y sala de catas. Dos kilómetros, cinco paradas, y la posibilidad real de cenar por menos de 15 euros entre tapas y bebidas. Esto es lo que los granadinos hacen cada noche.',
      en: 'Granada is one of the last cities in Spain where tapas are still free with every drink — a custom rooted in 19th-century Andalusian taverns that has survived here as an irreplaceable social ritual. This route visits five institutions with a combined history of more than four centuries: Bodegas Castañeda (1927), Los Manueles (1917), Bar Casa Julio (1947), Bar Ávila (1967), and Taberna La Tana (1993). The walk goes from the center to the Realejo, the former Jewish quarter, blending a barrel-wine bodega, a fried fish bar, classic Andalusian cooking, a roasted ham bar, and a wine cellar. Two kilometers, five stops, and the real possibility of eating dinner for under 15 euros between tapas and drinks. This is what Granadinos do every night.',
    },
    whatToBring: {
      es: ['Hambre real — llegarás a cinco paradas', 'Efectivo (Bar Ávila y Casa Julio no siempre aceptan tarjeta)', 'Calzado cómodo para adoquines del Realejo', 'Botella de agua para llevar entre paradas'],
      en: ['Real hunger — you\'ll hit five stops', 'Cash (Bar Ávila and Casa Julio don\'t always take cards)', 'Comfortable shoes for the Realejo\'s cobblestones', 'Water bottle to carry between stops'],
    },
    bestMonths: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  },
  {
    id: 'rte-002',
    slug: 'hora-del-vermut-albaicin',
    title: {
      es: 'La Hora del Vermut en el Albaicín',
      en: 'Vermouth Hour in the Albaicín',
    },
    description: {
      es: 'Tres paradas imprescindibles del vermut granadino en el barrio más antiguo de la ciudad. Desde la plaza más animada del Albaicín hasta una terraza con la Alhambra enfrente. Un sábado de aperitivo como los de aquí.',
      en: 'Three essential stops on Granada\'s vermouth circuit in the oldest neighborhood of the city. From the most animated square in the Albaicín to a terrace facing the Alhambra. A Saturday aperitif, done the local way.',
    },
    category: 'tapas',
    difficulty: 'easy',
    duration: 150,
    distance: 1.5,
    timeOfDay: 'afternoon',
    neighborhoods: ['albaicin'],
    highlights: [
      {
        title: { es: 'Placeta de San Miguel Bajo', en: 'San Miguel Bajo Square' },
        description: {
          es: 'La plaza más animada del Albaicín a mediodía. Cuatro bares con terraza bajo los naranjos — Cisco y Tierra es el local de referencia para el vermut de grifo, con aceitunas y boquerones de tapa.',
          en: 'The liveliest square in the Albaicín at midday. Four bars with terraces under orange trees — Cisco y Tierra is the local reference for draught vermouth, with olives and anchovies as a tapa.',
        },
      },
      {
        title: { es: 'Bar Aliatar / Los Caracoles — Plaza Aliatar, 4', en: 'Bar Aliatar / Los Caracoles — Plaza Aliatar, 4' },
        description: {
          es: 'Cuatro generaciones sirviendo tapas desde 1907 en la Plaza Aliatar, frente a la Colegiata del Salvador. Sus caracoles en salsa picante y el chorizo a la llama son las tapas más pedidas. El vermut llega solo con aceitunas de la casa.',
          en: 'Four generations serving tapas since 1907 on Plaza Aliatar, across from the Colegiata del Salvador. Their snails in spicy sauce and flaming chorizo are the most ordered tapas. The vermouth comes with house olives.',
        },
      },
      {
        title: { es: 'El Huerto de Juan Ranas, La Terraza — Callejón Atarazana, 6', en: 'El Huerto de Juan Ranas, La Terraza — Callejón Atarazana, 6' },
        description: {
          es: 'Terraza en el interior de un carmen restaurado frente al Mirador de San Nicolás. Vista directa sobre la Alhambra y el Generalife. Vinos andaluces, cervezas artesanas y cócteles. Los sábados y domingos abre desde las 13:00; entre semana solo a partir de las 18:00.',
          en: 'Terrace inside a restored carmen facing Mirador de San Nicolás. Direct view of the Alhambra and Generalife. Andalusian wines, craft beers, and cocktails. Saturdays and Sundays open from 1 PM; weekdays from 6 PM only.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'El día y la hora', en: 'Day and time' },
        content: {
          es: 'Esta ruta es para el sábado entre las 13:00 y las 15:00. Esa franja es cuando el ambiente del Albaicín es inigualable. Entre semana las terrazas están medio vacías.',
          en: 'This route is for Saturday between 1 PM and 3 PM. That window is when the Albaicín\'s atmosphere is unmatched. On weekdays the terraces are half-empty.',
        },
      },
      {
        title: { es: 'Bus C1 — la clave', en: 'Bus C1 — the key' },
        content: {
          es: 'El C1 sale de Plaza Nueva cada 9 minutos y sube hasta el barrio en 10 minutos. Compra el bono de 10 viajes en estancos — cuesta lo mismo que dos viajes sueltos. La bajada se hace a pie.',
          en: 'The C1 leaves from Plaza Nueva every 9 minutes and reaches the neighborhood in 10. Buy the 10-trip card at tobacco shops — it costs the same as two single fares. Walk back down.',
        },
      },
      {
        title: { es: 'El Huerto: reserva obligatoria', en: 'El Huerto: booking required' },
        content: {
          es: 'La Terraza de El Huerto de Juan Ranas tiene solo unas pocas mesas. Reserva online con al menos un día de antelación en fin de semana — sin reserva, no entras.',
          en: 'El Huerto\'s terrace has only a few tables. Book online at least a day in advance on weekends — without a reservation, you won\'t get in.',
        },
      },
    ],
    tags: ['vermut', 'tapas', 'terrazas', 'albaicín', 'vistas', 'aperitivo', 'sábado'],
    featured: false,
    image: '/images/routes/alhambra-san-nicolas.jpg',
    longDescription: {
      es: 'En el Albaicín, la "hora del vermut" no es una expresión — es una institución social. Los sábados entre las 13:00 y las 15:00, las plazas del barrio más antiguo de Granada se llenan de granadinos que intercambian la mañana de compras o de paseo por un vermut con aceitunas y conversación lenta. La ruta empieza en la Placeta de San Miguel Bajo, la más animada del barrio, con cuatro barras y terrazas bajo los naranjos. Sube después a la Plaza Aliatar para el Bar Aliatar, conocido como "Los Caracoles" por sus caracoles en salsa picante desde 1907 — cuatro generaciones atendiendo la misma barra. El remate es la terraza de El Huerto de Juan Ranas, un carmen restaurado junto al Mirador de San Nicolás con vista directa sobre la Alhambra. Un kilómetro y medio de caminata, 150 metros de desnivel, y una de las mejores mañanas de sábado que puede tenerse en España.',
      en: 'In the Albaicín, "vermouth hour" is not an expression — it\'s a social institution. On Saturdays between 1 PM and 3 PM, the squares of Granada\'s oldest neighborhood fill with locals trading their morning errands for a vermouth with olives and slow conversation. The route begins at Placeta de San Miguel Bajo, the liveliest in the neighborhood, with four bars and terraces under orange trees. It then climbs to Plaza Aliatar for Bar Aliatar, known as "Los Caracoles" for its snails in spicy sauce since 1907 — four generations behind the same bar. The finale is El Huerto de Juan Ranas\'s terrace, a restored carmen beside Mirador de San Nicolás with a direct view of the Alhambra. A kilometer and a half of walking, 150 meters of elevation gain, and one of the best Saturday mornings available in Spain.',
    },
    whatToBring: {
      es: ['Bono C1 de 10 viajes para subir al barrio', 'Calzado cómodo — el Albaicín tiene pendiente', 'Reserva hecha en El Huerto de Juan Ranas (fin de semana)', 'Tiempo: mínimo dos horas para no apurar'],
      en: ['C1 10-trip card to get up to the neighborhood', 'Comfortable shoes — the Albaicín is hilly', 'Booking made at El Huerto de Juan Ranas (weekends)', 'Time: at least two hours so you\'re not rushing'],
    },
    bestMonths: ['marzo', 'abril', 'mayo', 'junio', 'septiembre', 'octubre'],
  },

  // ——————————————————————————————————————————
  // CULTURAL
  // ——————————————————————————————————————————
  {
    id: 'rte-003',
    slug: 'atardecer-miradores-albaicin',
    title: {
      es: 'Atardecer en los Miradores del Albaicín',
      en: 'Sunset at the Albaicín Viewpoints',
    },
    description: {
      es: 'Tres miradores del Albaicín para ver la Alhambra al atardecer: desde la muralla zirí del siglo XI en San Cristóbal hasta el legendario San Nicolás, pasando por el Carril de las Tomasas — el camino secreto que pocos turistas conocen.',
      en: 'Three Albaicín viewpoints to watch the Alhambra at sunset: from the 11th-century Zirí walls at San Cristóbal to the legendary San Nicolás, along the Carril de las Tomasas — the hidden path few tourists know.',
    },
    category: 'viewpoint',
    difficulty: 'easy',
    duration: 120,
    distance: 2.5,
    timeOfDay: 'sunset',
    neighborhoods: ['albaicin'],
    highlights: [
      {
        title: { es: 'Mirador de San Cristóbal — Plaza de San Cristóbal', en: 'Mirador de San Cristóbal — Plaza de San Cristóbal' },
        description: {
          es: 'El mirador más panorámico del Albaicín, junto a los restos de la muralla zirí del siglo XI y la Iglesia de San Cristóbal. Vistas 180° sobre la vega, el centro histórico y la Alhambra. Sin aglomeraciones — la mayoría de turistas no llega hasta aquí. Acceso a pie por la Cuesta de Alhacaba o en bus N9.',
          en: 'The most panoramic viewpoint in the Albaicín, beside the remains of the 11th-century Zirí wall and the Church of San Cristóbal. 180° views over the Vega plain, the historic center, and the Alhambra. No crowds — most tourists never make it this far. Accessible on foot via Cuesta de Alhacaba or bus N9.',
        },
      },
      {
        title: { es: 'Carril de las Tomasas', en: 'Carril de las Tomasas' },
        description: {
          es: 'El camino peatonal que baja del alto Albaicín a San Nicolás entre tapias de carmenes y cactus centenarios. Flanquea el Convento de Santo Tomás de Villanueva — clausura activa desde el siglo XVII. Vistas abiertas de la Alhambra a media ladera, sin vendedores ni músicos. El tramo más auténtico de la ruta.',
          en: 'The pedestrian path descending from upper Albaicín to San Nicolás between carmen walls and century-old cacti. It runs alongside the 17th-century Convent of Santo Tomás de Villanueva — still an active cloistered community. Open views of the Alhambra mid-slope, no vendors or musicians. The most authentic stretch of the route.',
        },
      },
      {
        title: { es: 'Mirador de San Nicolás — Plaza de San Nicolás', en: 'Mirador de San Nicolás — Plaza de San Nicolás' },
        description: {
          es: 'El mirador más famoso de España: vista completa de la fachada sur de la Alhambra con el Generalife y Sierra Nevada cerrando el horizonte. Al atardecer, músicos callejeros tocan laúd y guitarra flamenca. La Alhambra se tiñe de rojo entre las 19:00 y las 20:30 según la época del año. Llega al menos 30 minutos antes del atardecer.',
          en: 'Spain\'s most famous viewpoint: the full southern facade of the Alhambra with the Generalife and Sierra Nevada closing the horizon. At sunset, street musicians play lute and flamenco guitar. The Alhambra turns red between 7 PM and 8:30 PM depending on the season. Arrive at least 30 minutes before sunset.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Hora exacta del atardecer', en: 'Exact sunset time' },
        content: {
          es: 'Consulta la hora del atardecer en timeanddate.com antes de salir. En verano el sol cae sobre las 21:30; en invierno, pasadas las 18:00. Llega a San Nicolás con 30-45 minutos de margen — la plaza se llena rápido y los mejores sitios se ocupan enseguida.',
          en: 'Check the sunset time on timeanddate.com before you go. In summer it sets around 9:30 PM; in winter, after 6 PM. Arrive at San Nicolás 30–45 minutes early — the square fills fast and the best spots go quickly.',
        },
      },
      {
        title: { es: 'Bus C31 o C32 desde Gran Vía', en: 'Bus C31 or C32 from Gran Vía' },
        content: {
          es: 'Sube en el C31 o C32 desde Gran Vía o Plaza Nueva (9 minutos). Baja en la parada "Alhacaba" para ir primero a San Cristóbal. La ruta termina en San Nicolás, desde donde se camina al centro en 20 minutos cuesta abajo por el Paseo de los Tristes.',
          en: 'Take the C31 or C32 from Gran Vía or Plaza Nueva (9 minutes). Get off at "Alhacaba" to start at San Cristóbal first. The route ends at San Nicolás, from where you can walk downhill to the center in 20 minutes via Paseo de los Tristes.',
        },
      },
      {
        title: { es: 'Carteristas en San Nicolás al atardecer', en: 'Pickpockets at San Nicolás at sunset' },
        content: {
          es: 'Es uno de los puntos con más incidencias de carterismo de Granada. Concurrido, distraído y lleno de turistas con el móvil en alto. Lleva la mochila delante, el móvil en el bolsillo delantero y no dejes objetos de valor en el suelo.',
          en: 'San Nicolás at sunset is one of Granada\'s pickpocketing hotspots — crowded, distracted, full of tourists with phones raised. Keep your bag in front, your phone in a front pocket, and don\'t leave valuables on the ground.',
        },
      },
      {
        title: { es: 'Después del atardecer: Calderería Nueva', en: 'After sunset: Calderería Nueva' },
        content: {
          es: 'Baja desde San Nicolás hasta Calderería Nueva (10 minutos andando). Las teterías de la calle sirven té de menta con pastelas de almendra a partir de 2€. El ambiente nocturno de la calle árabe es un buen cierre para la jornada.',
          en: 'Walk down from San Nicolás to Calderería Nueva (10 minutes). The tea houses on this street serve mint tea with almond pastries from €2. The evening atmosphere on this Arab-style street is a fitting end to the day.',
        },
      },
    ],
    tags: ['atardecer', 'vistas', 'albaicín', 'fotografía', 'romántico', 'alhambra', 'miradores'],
    featured: true,
    image: '/images/routes/alhambra-atardecer.jpg',
    longDescription: {
      es: 'El Albaicín fue declarado Patrimonio de la Humanidad por la UNESCO en 1994 junto con la Alhambra, y sus miradores ofrecen las vistas más icónicas del monumento. Esta ruta sigue la lógica natural del barrio: empieza en lo alto, en el Mirador de San Cristóbal junto a los restos de la muralla zirí del siglo XI, y desciende despacio hacia el atardecer. El tramo intermedio es el Carril de las Tomasas, un camino peatonal desconocido para la mayoría de turistas que baja entre tapias de jardines y el convento de clausura de Santo Tomás de Villanueva — un fragmento de Albaicín auténtico que los guías de viaje rara vez mencionan. El final es el Mirador de San Nicolás, inevitablemente concurrido pero también genuinamente emocionante: cuando el sol baja hacia Sierra Nevada, la Alhambra se enciende en tonos rojizos que justifican su nombre árabe (Al-Hamra: "la roja").',
      en: 'The Albaicín was declared a UNESCO World Heritage Site in 1994 alongside the Alhambra, and its viewpoints offer the most iconic views of the monument. This route follows the neighborhood\'s natural logic: it starts at the top, at the Mirador de San Cristóbal beside the remains of the 11th-century Zirí walls, and descends slowly toward sunset. The middle stretch is the Carril de las Tomasas, a pedestrian path unknown to most tourists that winds between garden walls and the cloistered Convent of Santo Tomás de Villanueva — a fragment of authentic Albaicín rarely mentioned in travel guides. The finale is the Mirador de San Nicolás, inevitably crowded but also genuinely moving: as the sun drops toward Sierra Nevada, the Alhambra ignites in shades of red that justify its Arabic name (Al-Hamra: "the red one").',
    },
    whatToBring: {
      es: ['Bono C31/C32 de 10 viajes para subir al barrio', 'Calzado cómodo — empedrado irregular en todo el recorrido', 'Cámara o móvil con batería cargada', 'Chaqueta ligera — la temperatura baja rápido después del atardecer'],
      en: ['C31/C32 10-trip card to ride up to the neighborhood', 'Comfortable shoes — irregular cobblestones throughout', 'Camera or phone with charged battery', 'Light jacket — temperature drops quickly after sunset'],
    },
    bestMonths: ['marzo', 'abril', 'mayo', 'junio', 'septiembre', 'octubre', 'noviembre'],
  },
  {
    id: 'rte-004',
    slug: 'granada-monumental',
    title: {
      es: 'Granada Monumental: El Siglo de Oro',
      en: 'Monumental Granada: The Golden Age',
    },
    description: {
      es: 'Tres monumentos renacentistas en el corazón del centro histórico: la Catedral donde Diego de Siloé redefinió la arquitectura española, la Capilla Real con los féretros de los Reyes Católicos en su cripta original, y el Monasterio de San Jerónimo — panteón del Gran Capitán y la obra cumbre de Siloé.',
      en: 'Three Renaissance monuments in the heart of the historic center: the Cathedral where Diego de Siloé redefined Spanish architecture, the Royal Chapel with the actual lead coffins of the Catholic Monarchs in the original crypt, and the Monastery of San Jerónimo — the pantheon of El Gran Capitán and Siloé\'s masterpiece.',
    },
    category: 'monuments',
    difficulty: 'easy',
    duration: 300,
    distance: 3.5,
    timeOfDay: 'morning',
    neighborhoods: ['centro'],
    highlights: [
      {
        title: { es: 'Catedral de Granada — Gran Vía de Colón, 5', en: 'Granada Cathedral — Gran Vía de Colón, 5' },
        description: {
          es: 'En 1528 Diego de Siloé tomó el relevo de Enrique Egas y transformó el plan gótico original en la primera catedral renacentista de España. Su obra cumbre aquí es la Capilla Mayor: una cúpula semiesférica con diez nervaduras sobre un cimborrio terminado en 1557, que inunda el espacio de luz a través de enormes ventanales circulares. Siloé murió en 1563 sin verla concluida. La fachada principal es posterior y barroca — obra de Alonso Cano en 1667. Entrada: €10 (reducida €8). Horario: lun–sáb 10:00–18:15, dom 15:00–18:15.',
          en: 'In 1528 Diego de Siloé took over from Enrique Egas and transformed the original Gothic plan into the first Renaissance cathedral in Spain. His masterpiece here is the Capilla Mayor: a hemispherical dome with ten ribs over a cimborrio completed in 1557, flooding the space with light through enormous circular windows. Siloé died in 1563 without seeing it finished. The main facade is later and Baroque — Alonso Cano\'s work from 1667. Admission: €10 (reduced €8). Hours: Mon–Sat 10:00–18:15, Sun 15:00–18:15.',
        },
      },
      {
        title: { es: 'Capilla Real — Calle Oficios, s/n', en: 'Royal Chapel — Calle Oficios, s/n' },
        description: {
          es: 'Construida entre 1505 y 1517 por Enrique Egas en estilo gótico isabelino como mausoleo personal de los Reyes Católicos. En el centro del crucero: los sepulcros de mármol de Fernando e Isabel — obra de Domenico Fancelli — y los de Juana la Loca y Felipe el Hermoso, de Bartolomé Ordóñez. Pero los cuerpos reales no están ahí: están en la cripta, en féretros de plomo con sus iniciales grabadas. La antigua sacristía es hoy museo con la colección personal de Isabel: van der Weyden, Dierick Bouts y — poco señalizado — el único Botticelli de temática religiosa en España, "La Oración en el Huerto". Entrada: €5 (reducida €3,50). Horario: lun–sáb 10:15–18:30, dom 11:00–18:00.',
          en: 'Built between 1505 and 1517 by Enrique Egas in Isabelline Gothic style as the personal mausoleum of the Catholic Monarchs. At the center of the transept: the marble sepulchres of Fernando and Isabel — by Domenico Fancelli — and those of Joanna I and Philip I, by Bartolomé Ordóñez. But the royal bodies are not in them: they lie in the crypt below, in lead coffins with their initials engraved on the lids. The former sacristy is now a museum with Isabel\'s personal collection: van der Weyden, Dierick Bouts, and — easy to miss — the only Botticelli with religious subject matter in Spain, "The Prayer in the Garden". Admission: €5 (reduced €3.50). Hours: Mon–Sat 10:15–18:30, Sun 11:00–18:00.',
        },
      },
      {
        title: { es: 'Monasterio de San Jerónimo — Calle Rector López Argüeta, 9', en: 'Monastery of San Jerónimo — Calle Rector López Argüeta, 9' },
        description: {
          es: 'El primer monasterio cristiano fundado en Granada tras la Reconquista, en 1504, sobre terrenos que se cree pertenecieron a Boabdil. Diego de Siloé asumió las obras en 1526 y convirtió el proyecto gótico inicial en su obra renacentista más completa. Lo financió María de Manrique, viuda del Gran Capitán Gonzalo Fernández de Córdoba, a cambio de enterramiento en la capilla mayor — donde él reposa junto a ella. El claustro gótico-isabelino de 1519, con 36 columnas y patio de naranjos, contrasta con la magnificencia del templo renacentista. Mucho menos visitado que la Catedral y la Capilla Real. Entrada: €7 (menores de 10 años gratis). Horario: 10:00–13:00 y 16:00–19:00 (cierra para la siesta).',
          en: 'The first Christian monastery founded in Granada after the Reconquest, in 1504, on land believed to have belonged to Boabdil. Diego de Siloé took over construction in 1526 and transformed the initial Gothic project into his most complete Renaissance work. It was funded by María de Manrique, widow of El Gran Capitán Gonzalo Fernández de Córdoba, in exchange for burial in the main chapel — where he rests alongside her. The 1519 Isabelline Gothic cloister, with 36 columns and a courtyard of orange trees, contrasts with the grandeur of the Renaissance church. Far less visited than the Cathedral and Royal Chapel. Admission: €7 (children under 10 free). Hours: 10:00–13:00 and 16:00–19:00 (closes for siesta).',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Empieza a las 10:00 para evitar colas', en: 'Start at 10:00 to beat queues' },
        content: {
          es: 'La Capilla Real abre a las 10:15 y en temporada alta acumula 20–30 minutos de cola a partir de las 11:00. Llega a la Catedral justo al abrir (10:00), pasa a la Capilla Real al terminar y tendrás entrada sin espera.',
          en: 'The Royal Chapel opens at 10:15 and in high season queues build to 20–30 minutes from 11:00 onward. Arrive at the Cathedral right when it opens (10:00), move on to the Royal Chapel when done, and you\'ll enter without waiting.',
        },
      },
      {
        title: { es: 'El Botticelli que nadie ve', en: 'The Botticelli nobody notices' },
        content: {
          es: 'En la sacristía-museo de la Capilla Real hay un "La Oración en el Huerto" de Sandro Botticelli. Es la única pintura de Botticelli con temática religiosa en España. Está expuesta sin mucho énfasis — si no la buscas expresamente, es fácil pasarla por alto.',
          en: "In the Royal Chapel's sacristy-museum hangs a \"Prayer in the Garden\" by Sandro Botticelli — the only Botticelli with religious subject matter in Spain. It's displayed without much fanfare. If you don't look for it deliberately, it's easy to walk past.",
        },
      },
      {
        title: { es: 'El Monasterio cierra para la siesta', en: 'The Monastery closes for siesta' },
        content: {
          es: 'San Jerónimo cierra entre las 13:30 y las 16:00. Si llegas después del mediodía, planifica la visita a partir de las 16:00 o madruga para los tres monumentos en una sola mañana.',
          en: 'San Jerónimo closes between 13:30 and 16:00. If you arrive after midday, plan the visit from 16:00 onward — or start early and cover all three monuments in a single morning.',
        },
      },
      {
        title: { es: 'Los domingos la Capilla Real cierra por la mañana', en: 'On Sundays the Royal Chapel is closed in the morning' },
        content: {
          es: 'La Capilla Real no abre hasta las 11:00 los domingos (frente a las 10:15 el resto de días) y puede cerrar temporalmente por celebraciones litúrgicas sin previo aviso. Confirma horario en capillarealgranada.com.',
          en: 'The Royal Chapel does not open until 11:00 on Sundays (vs. 10:15 other days) and may close temporarily for liturgical celebrations without notice. Confirm hours at capillarealgranada.com.',
        },
      },
    ],
    tags: ['monumentos', 'historia', 'renacimiento', 'arquitectura', 'reyes-católicos', 'gran-capitán', 'diego-de-siloé'],
    featured: true,
    image: '/images/routes/catedral-granada.jpg',
    longDescription: {
      es: 'Cuando los Reyes Católicos entraron en Granada el 2 de enero de 1492, la ciudad árabe más importante de Europa occidental pasó a manos castellanas. El programa arquitectónico que siguió no fue solo urbanístico: fue una declaración de poder e identidad. La Capilla Real fue el primer encargo — mausoleo personal de Fernando e Isabel, terminado en 1517, cuatro años después de la muerte de ella. La Catedral empezó como gótica, como todas las catedrales de la Reconquista, pero en 1528 llega Diego de Siloé con algo radicalmente nuevo: la planta centralizada de influencia romana paleocristiana, la cúpula en la cabecera, la luz como protagonista. Es el momento en que España abraza el Renacimiento italiano sin imitarlo — lo transforma. El Monasterio de San Jerónimo es el tercer vértice de este triángulo y el menos frecuentado: aquí está enterrado Gonzalo Fernández de Córdoba, el Gran Capitán, el general que ganó el Reino de Nápoles para la Corona española. Su viuda pagó la obra final del convento a cambio de ese enterramiento. Siloé también trabajó aquí. Tres monumentos, un mismo arquitecto como hilo conductor, y el momento exacto en que Granada pasó de ser la última capital nazarí a convertirse en ciudad imperial española.',
      en: 'When the Catholic Monarchs entered Granada on January 2, 1492, the most important Arab city in Western Europe passed into Castilian hands. The architectural program that followed was not merely urban: it was a declaration of power and identity. The Royal Chapel was the first commission — the personal mausoleum of Fernando and Isabel, completed in 1517, four years after her death. The Cathedral started as Gothic, like all Reconquest cathedrals, but in 1528 Diego de Siloé arrived with something radically new: the centralized plan inspired by early Christian Rome, the dome over the apse, light as protagonist. This is the moment Spain embraced the Italian Renaissance without copying it — transforming it. The Monastery of San Jerónimo is the third vertex of this triangle and the least visited: this is where Gonzalo Fernández de Córdoba, El Gran Capitán, the general who won the Kingdom of Naples for the Spanish Crown, is buried. His widow funded the final construction in exchange for that burial. Siloé also worked here. Three monuments, one architect as the common thread, and the exact moment Granada transformed from the last Nasrid capital into a Spanish imperial city.',
    },
    whatToBring: {
      es: ['Ropa que cubra hombros y rodillas — obligatorio en los tres monumentos', 'Cámara (sin flash — prohibido en la Capilla Real y el Monasterio)', 'Agua — no hay fuentes en el recorrido interior', 'Presupuesto: Catedral €10 + Capilla Real €5 + Monasterio €7 = €22 por persona'],
      en: ['Clothing covering shoulders and knees — required in all three monuments', 'Camera (no flash — prohibited in the Royal Chapel and Monastery)', 'Water — no drinking fountains on the interior route', 'Budget: Cathedral €10 + Royal Chapel €5 + Monastery €7 = €22 per person'],
    },
    bestMonths: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'octubre', 'noviembre', 'diciembre'],
  },
  {
    id: 'rte-005',
    slug: 'rincones-secretos-realejo',
    title: {
      es: 'Rincones Secretos del Realejo',
      en: 'Secret Corners of the Realejo',
    },
    description: {
      es: 'El barrio que los árabes llamaron Garnata al-Yahud esconde tres secretos que los turistas casi nunca encuentran: un palacio nazarí del siglo XIII con entrada de 2€, el último lavadero público de Granada en uso hasta 1965, y la mayor concentración de murales de Raúl Ruiz — el artista que el mundo conoce como El Niño de las Pinturas.',
      en: "The neighborhood the Arabs called Garnata al-Yahud hides three secrets tourists almost never find: a 13th-century Nasrid palace with €2 admission, Granada's last public laundry in use until 1965, and the highest concentration of murals by Raúl Ruiz — the artist the world knows as El Niño de las Pinturas.",
    },
    category: 'secrets',
    difficulty: 'easy',
    duration: 150,
    distance: 2.5,
    timeOfDay: 'afternoon',
    neighborhoods: ['realejo'],
    highlights: [
      {
        title: { es: 'Cuarto Real de Santo Domingo — Plaza de los Campos, 6', en: 'Cuarto Real de Santo Domingo — Plaza de los Campos, 6' },
        description: {
          es: 'Un palacio nazarí del siglo XIII que el Ayuntamiento de Granada lleva décadas restaurando a la sombra del Convento de Santo Domingo. Es uno de los pocos palacios civiles nazaríes que se conservan fuera de la Alhambra. La mayoría de visitantes pasan por la plaza sin saber que existe. Declarado BIC en 1919, propiedad municipal desde 1990. Entrada: €2 general, €1 reducida, gratis los domingos. Horario: mar–sáb 10:30–14:00 y 17:30–20:30, dom 10:30–14:00. Lunes cerrado. Solo pago con tarjeta.',
          en: 'A 13th-century Nasrid palace that the Granada city council has been quietly restoring in the shadow of the Convent of Santo Domingo. One of the few surviving Nasrid civil palaces outside the Alhambra. Most visitors walk through the square without knowing it exists. Listed as a national monument (BIC) since 1919, municipal property since 1990. Admission: €2 general, €1 reduced, free on Sundays. Hours: Tue–Sat 10:30–14:00 and 17:30–20:30, Sun 10:30–14:00. Mondays closed. Card payment only.',
        },
      },
      {
        title: { es: 'Lavadero de la Placeta de la Puerta del Sol', en: 'Lavadero de la Placeta de la Puerta del Sol' },
        description: {
          es: 'El único lavadero público que queda en Granada. Construido en 1862 — no en el siglo XVII como repiten muchas guías — sobre el solar donde estaba la puerta que separaba la judería del Mauror en época zirí (siglo XI). Las seis columnas toscanas de mármol de Sierra Elvira no son originales: proceden de la ermita de Santa Escolástica, demolida cuando se levantó el lavadero. Funcionó hasta 1965. La techumbre de teja árabe y la estructura de madera son las originales. Entrada libre. Nadie viene aquí.',
          en: "The only public laundry remaining in Granada. Built in 1862 — not in the 17th century as many guides repeat — on the site where the gate separating the Jewish quarter from the Mauror stood in the Zirí era (11th century). The six Tuscan marble columns from Sierra Elvira are not original: they came from the Santa Escolástica hermitage, demolished when the laundry was built. It functioned until 1965. The Arab-tile roof and wooden framework are the originals. Free entry. Nobody comes here.",
        },
      },
      {
        title: { es: 'Murales de El Niño de las Pinturas — Calle Molinos', en: 'El Niño de las Pinturas Murals — Calle Molinos' },
        description: {
          es: 'Raúl Ruiz nació en Madrid en 1977, creció en el Zaidín y lleva más de 25 años viviendo en el Realejo. Calle Molinos es donde se concentra su obra más reconocible: figuras de niños y adolescentes con expresiones cargadas de emoción — miedo, asombro, melancolía — acompañadas de frases que funcionan como poemas cortos pintados directamente en la pared. Sus murales no están en ningún museo ni están protegidos: algunos desaparecen. Campo del Príncipe, al final de la calle, es el punto de tapas del barrio.',
          en: 'Raúl Ruiz was born in Madrid in 1977, grew up in the Zaidín, and has lived in the Realejo for over 25 years. Calle Molinos is where his most recognizable work is concentrated: figures of children and teenagers with emotion-charged expressions — fear, wonder, melancholy — accompanied by phrases that work as short poems painted directly on the wall. His murals are not in any museum and are not protected: some disappear. Campo del Príncipe, at the end of the street, is the neighborhood\'s tapas hub.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Visita el Cuarto Real un domingo', en: 'Visit the Cuarto Real on a Sunday' },
        content: {
          es: 'Los domingos la entrada es gratuita. Cierra a las 14:00, así que llega antes de las 13:15. De martes a sábado también abre por la tarde (17:30–20:30) — buen plan si pasas por el barrio en la tarde.',
          en: 'On Sundays admission is free. It closes at 14:00, so arrive before 13:15. Tuesday to Saturday it also opens in the afternoon (17:30–20:30) — a good plan if you\'re passing through the neighborhood in the evening.',
        },
      },
      {
        title: { es: 'Solo pago con tarjeta en el Cuarto Real', en: 'Card payment only at the Cuarto Real' },
        content: {
          es: 'El Cuarto Real de Santo Domingo no acepta efectivo. Lleva tarjeta de crédito o débito. Los domingos no hace falta pagar, así que no importa.',
          en: 'The Cuarto Real de Santo Domingo does not accept cash. Bring a credit or debit card. On Sundays admission is free, so it doesn\'t matter.',
        },
      },
      {
        title: { es: 'Los murales cambian', en: 'The murals change' },
        content: {
          es: 'Los murales de El Niño de las Pinturas no están protegidos y algunos han desaparecido o se han repintado. Calle Molinos y el entorno de Campo del Príncipe son los más estables. Si vas con la intención de ver una pieza concreta, puede que ya no esté.',
          en: "El Niño de las Pinturas' murals are not protected and some have disappeared or been repainted. Calle Molinos and the area around Campo del Príncipe are the most stable. If you go specifically to see a particular piece, it may no longer be there.",
        },
      },
      {
        title: { es: 'Extensión gratuita: Casa de los Tiros', en: 'Free extension: Casa de los Tiros' },
        content: {
          es: 'A 5 minutos andando, en Calle Pavaneras, está la Casa de los Tiros — palacio del siglo XVI convertido en museo. Entrada gratuita para ciudadanos de la UE; €1,50 para el resto. Horario: mar–sáb 9:00–21:00, dom 9:00–15:00. Lunes cerrado.',
          en: 'A 5-minute walk away, on Calle Pavaneras, is the Casa de los Tiros — a 16th-century palace turned museum. Free entry for EU citizens; €1.50 for others. Hours: Tue–Sat 9:00–21:00, Sun 9:00–15:00. Mondays closed.',
        },
      },
    ],
    tags: ['secretos', 'realejo', 'judería', 'arte-urbano', 'nazarí', 'el-niño-de-las-pinturas', 'fotografía'],
    featured: true,
    image: '/images/routes/mirador-san-nicolas.jpg',
    longDescription: {
      es: 'En árabe el barrio se llamaba Garnata al-Yahud: Granada de los Judíos. La comunidad judía granadina llevaba aquí casi quince siglos cuando el 31 de marzo de 1492 los Reyes Católicos firmaron el Edicto de Granada desde la propia Alhambra, ordenando la expulsión de todos los judíos de España. En tres meses, el barrio quedó vacío. Los nazaríes lo habían llamado Realejo — del árabe ar-Rabad al-Yahudi, arrabal de los judíos — y ese nombre sobrevivió a la expulsión, al Renacimiento, a la Ilustración y al siglo XX. Hoy el Realejo es uno de los barrios más habitados por estudiantes universitarios de Granada, con una mezcla de vida de barrio auténtica y rastros arqueológicos que aparecen entre los edificios si sabes dónde mirar. El Cuarto Real de Santo Domingo es el más sorprendente: un salón nazarí del siglo XIII que el Convento de Santo Domingo construyó a su alrededor sin demolerlo, y que el Ayuntamiento lleva décadas restaurando con pocos recursos y poca publicidad. A pocos metros, el Lavadero de la Puerta del Sol es el último de los lavaderos públicos que tuvo la ciudad — espacios colectivos donde las mujeres del barrio lavaban la ropa a mano — construido en 1862 y clausurado en 1965 cuando el agua corriente en los hogares los volvió obsoletos. Y en Calle Molinos, Raúl Ruiz lleva 25 años pintando los muros del barrio donde vive con los rostros que ha hecho famosos en todo el mundo.',
      en: "In Arabic the neighborhood was called Garnata al-Yahud: Granada of the Jews. The Jewish community of Granada had lived here for nearly fifteen centuries when on March 31, 1492, the Catholic Monarchs signed the Alhambra Decree from the palace itself, ordering the expulsion of all Jews from Spain. Within three months, the neighborhood stood empty. The Nasrids had called it Realejo — from the Arabic ar-Rabad al-Yahudi, suburb of the Jews — and that name survived the expulsion, the Renaissance, the Enlightenment, and the 20th century. Today the Realejo is one of Granada's most student-populated neighborhoods, a mix of authentic local life and archaeological traces that surface between buildings if you know where to look. The Cuarto Real de Santo Domingo is the most surprising: a 13th-century Nasrid salon that the Convent of Santo Domingo built around without demolishing, and which the city council has been restoring for decades with limited funding and limited publicity. A few meters away, the Lavadero de la Puerta del Sol is the last of the city's public laundries — collective spaces where neighborhood women hand-washed clothes — built in 1862 and closed in 1965 when running water in homes made them obsolete. And on Calle Molinos, Raúl Ruiz has spent 25 years painting the walls of the neighborhood where he lives with the faces that have made him famous worldwide.",
    },
    whatToBring: {
      es: ['Tarjeta de crédito — el Cuarto Real no acepta efectivo', 'Calzado cómodo para el empedrado del barrio', 'Cámara — los murales del Niño de las Pinturas son muy fotogénicos', 'Tiempo: el barrio invita a perderse'],
      en: ['Credit card — the Cuarto Real does not accept cash', 'Comfortable shoes for the neighborhood cobblestones', 'Camera — El Niño de las Pinturas murals are very photogenic', 'Time: this neighborhood invites getting lost'],
    },
    bestMonths: ['marzo', 'abril', 'mayo', 'septiembre', 'octubre', 'noviembre'],
  },
  {
    id: 'rte-006',
    slug: 'huellas-reyes-catolicos',
    title: {
      es: 'Huellas de los Reyes Católicos',
      en: 'Traces of the Catholic Monarchs',
    },
    description: {
      es: 'Tres edificios a menos de 200 metros entre sí que cuentan la Granada de 1492 a 1521: la alhóndiga nazarí que los Reyes Católicos heredaron y preservaron, la universidad islámica que convirtieron en Ayuntamiento, y la capilla que Isabel fundó semanas antes de morir y Fernando nunca vio terminada.',
      en: 'Three buildings within 200 meters of each other that tell the story of Granada from 1492 to 1521: the Nasrid caravanserai the Catholic Monarchs inherited and preserved, the Islamic university they turned into City Hall, and the chapel Isabel founded weeks before dying and Fernando never saw finished.',
    },
    category: 'history',
    difficulty: 'easy',
    duration: 180,
    distance: 2.5,
    timeOfDay: 'morning',
    neighborhoods: ['centro'],
    highlights: [
      {
        title: { es: 'Corral del Carbón — Calle Mariana Pineda, s/n', en: 'Corral del Carbón — Calle Mariana Pineda, s/n' },
        description: {
          es: 'Construido en la primera mitad del siglo XIV por el sultán Yusuf I como alhóndiga nueva (al-Fundaq al-Yadida): hospedaje para los mercaderes que traían cereales a la ciudad. Es el único edificio de este tipo que se conserva completo en toda la Península Ibérica. Los Reyes Católicos lo heredaron intacto en 1492, lo mantuvieron en uso como mercado y le dieron el nombre actual cuando pasó a almacenar carbón. La entrada original nazarí, con su arco de mocárabes, es una de las más bellas que quedan en Granada. Entrada: gratuita. Horario: todos los días 9:00–20:00.',
          en: 'Built in the first half of the 14th century by Sultan Yusuf I as a new caravanserai (al-Fundaq al-Yadida): lodging for merchants bringing grain into the city. It is the only completely preserved building of its kind in the entire Iberian Peninsula. The Catholic Monarchs inherited it intact in 1492, kept it in use as a market, and gave it its current name when it began storing coal. The original Nasrid entrance arch, with its muqarnas decoration, is one of the most beautiful surviving examples in Granada. Admission: free. Hours: every day 9:00–20:00.',
        },
      },
      {
        title: { es: 'Palacio de la Madraza — Calle Oficios, 14', en: 'Palacio de la Madraza — Calle Oficios, 14' },
        description: {
          es: 'Inaugurada en 1349 por el mismo Yusuf I que construyó el Corral del Carbón, la Madraza fue la primera universidad pública de al-Ándalus: aquí se enseñaban matemáticas, astronomía, literatura árabe y derecho islámico. Tras la conquista de 1492, los Reyes Católicos la convirtieron en el Ayuntamiento de Granada. Siglos de reformas sepultaron el interior original bajo capas barrocas y neoclásicas — hasta que los trabajos del siglo XX recuperaron el oratorio nazarí: un mihrab con una cúpula octogonal de mocárabes intacta desde el siglo XIV. Hoy es la sede cultural de la Universidad de Granada. Entrada: gratuita. Horario: lun–vie 9:00–21:00, sáb 11:00–14:00 y 17:30–20:30. Cerrado domingos y festivos.',
          en: 'Inaugurated in 1349 by the same Yusuf I who built the Corral del Carbón, the Madraza was the first public university in al-Andalus: mathematics, astronomy, Arabic literature, and Islamic law were taught here. After the 1492 conquest, the Catholic Monarchs converted it into Granada\'s City Hall. Centuries of renovations buried the original interior under Baroque and neoclassical layers — until 20th-century restoration recovered the Nasrid oratory: a mihrab with an intact 14th-century octagonal muqarnas dome. Today it is the University of Granada\'s cultural center. Admission: free. Hours: Mon–Fri 9:00–21:00, Sat 11:00–14:00 and 17:30–20:30. Closed Sundays and public holidays.',
        },
      },
      {
        title: { es: 'Capilla Real — Calle Oficios, s/n', en: 'Royal Chapel — Calle Oficios, s/n' },
        description: {
          es: 'El 13 de septiembre de 1504, Isabel firmó la Real Cédula que creaba la Capilla Real de Granada como panteón propio. Llevaba meses gravemente enferma. Murió el 26 de noviembre de 1504 — diez semanas después de firmar el decreto — sin haber visto comenzar las obras. Fernando murió el 23 de enero de 1516 en Madrigalejo, Extremadura, cuando el edificio aún estaba en construcción. Los cuerpos no llegaron a la cripta hasta el 10 de noviembre de 1521. La decisión de enterrarse en Granada no era sentimental: la ciudad conquistada era "territorio neutral" entre Castilla y Aragón, el único lugar donde dos coronas distintas podían compartir sepultura sin señalar una preferencia por ninguna de las dos. Entrada: €5 (reducida €3,50). Horario: lun–sáb 10:15–18:30, dom 11:00–18:00.',
          en: 'On September 13, 1504, Isabel signed the Royal Charter creating the Royal Chapel of Granada as her personal pantheon. She had been gravely ill for months. She died on November 26, 1504 — ten weeks after signing the decree — without having seen construction begin. Fernando died on January 23, 1516 in Madrigalejo, Extremadura, while the building was still under construction. The bodies did not reach the crypt until November 10, 1521. The decision to be buried in Granada was not sentimental: the conquered city was "neutral territory" between Castile and Aragon — the only place where two separate crowns could share burial without favoring either one. Admission: €5 (reduced €3.50). Hours: Mon–Sat 10:15–18:30, Sun 11:00–18:00.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Los tres en una mañana', en: 'All three in one morning' },
        content: {
          es: 'El Corral del Carbón y la Madraza son gratuitos. Solo la Capilla Real tiene entrada (€5). Los tres están en un radio de 200 metros en torno a la Catedral. Haz el recorrido en sentido contrario a las agujas del reloj: Corral del Carbón → Madraza → Capilla Real.',
          en: 'The Corral del Carbón and the Madraza are free. Only the Royal Chapel charges admission (€5). All three are within a 200-meter radius around the Cathedral. Walk the route counterclockwise: Corral del Carbón → Madraza → Royal Chapel.',
        },
      },
      {
        title: { es: 'La Madraza en verano cierra a las 14:00', en: 'The Madraza closes at 14:00 in summer' },
        content: {
          es: 'Del 15 de junio al 15 de septiembre la Madraza tiene horario reducido: solo 9:00–14:00. El resto del año abre también por la tarde (hasta las 21:00 de lunes a viernes). Planifica en función de la época del año.',
          en: 'From June 15 to September 15 the Madraza has reduced hours: only 9:00–14:00. The rest of the year it also opens in the afternoon (until 21:00 Monday to Friday). Plan according to the time of year.',
        },
      },
      {
        title: { es: 'Extensión: Hospital Real', en: 'Extension: Hospital Real' },
        content: {
          es: 'A 15 minutos andando, el Hospital Real completa el cuadro: fundado el 15 de septiembre de 1504 — el mismo mes que la Capilla Real — por los propios Reyes Católicos para atender a los heridos de las guerras de Granada. Diseñado por Enrique Egas. Hoy es el Rectorado de la Universidad de Granada. El patio interior es visitable en horario de oficina.',
          en: 'A 15-minute walk away, the Hospital Real completes the picture: founded on September 15, 1504 — the same month as the Royal Chapel — by the Catholic Monarchs themselves to care for the wounded from the Granada wars. Designed by Enrique Egas. Today it is the Rector\'s building of the University of Granada. The interior courtyard is open during office hours.',
        },
      },
    ],
    tags: ['historia', 'reyes-católicos', 'nazarí', 'patrimonio', 'alhóndiga', '1492', 'madraza'],
    featured: false,
    image: '/images/routes/capilla-real.jpg',
    longDescription: {
      es: 'El 2 de enero de 1492, Fernando e Isabel entraron en Granada. Llevaban diez años de guerra para llegar hasta aquí. Lo que hicieron los días siguientes define mejor que nada quiénes eran: mantuvieron en pie los monumentos nazaríes que podían haber derribado, convirtieron la universidad islámica en Ayuntamiento en lugar de demolerla, y encargaron un hospital general para los heridos de su propio ejército. Dos años después llegó el segundo acto: el 31 de marzo de 1492, desde la propia Alhambra, firmaron el Edicto de Granada que expulsaba a todos los judíos de España. En ese mismo año, Colón llegó a América. Granada fue el escenario donde se decidió la arquitectura del mundo moderno. La Capilla Real fue la última decisión que tomó Isabel en lúcido: la firmó en septiembre de 1504, enferma y sin levantarse de la cama en Medina del Campo, sabiendo que no viviría para verla construida. Fernando murió doce años después sin haberla visto terminada. Los dos monarcas que cambiaron el mundo no vieron ninguno de los edificios que mandaron construir en Granada terminados en vida. El patio del Corral del Carbón, el mihrab de la Madraza y la cripta de la Capilla Real son los tres espacios donde esa historia se puede leer directamente en la piedra.',
      en: 'On January 2, 1492, Fernando and Isabel entered Granada. They had waged ten years of war to get here. What they did in the following days defines them better than anything: they kept standing the Nasrid monuments they could have demolished, converted the Islamic university into City Hall rather than razing it, and commissioned a general hospital for their own army\'s wounded. Two years later came the second act: on March 31, 1492, from the Alhambra itself, they signed the Alhambra Decree expelling all Jews from Spain. That same year, Columbus reached America. Granada was the stage where the architecture of the modern world was decided. The Royal Chapel was the last decision Isabel made while lucid: she signed it in September 1504, bedridden in Medina del Campo, knowing she would not live to see it built. Fernando died twelve years later without having seen it finished. The two monarchs who changed the world saw none of the buildings they commissioned in Granada completed in their lifetimes. The courtyard of the Corral del Carbón, the mihrab of the Madraza, and the crypt of the Royal Chapel are the three spaces where that history can be read directly in the stone.',
    },
    whatToBring: {
      es: ['Nada especial — dos de los tres monumentos son gratuitos', 'Ropa que cubra hombros y rodillas para la Capilla Real', 'Cámara (sin flash en la Capilla Real)', 'Presupuesto máximo: €5 (solo la Capilla Real)'],
      en: ['Nothing special — two of the three monuments are free', 'Clothing covering shoulders and knees for the Royal Chapel', 'Camera (no flash in the Royal Chapel)', 'Maximum budget: €5 (only the Royal Chapel)'],
    },
    bestMonths: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'octubre', 'noviembre', 'diciembre'],
  },
  {
    id: 'rte-007',
    slug: 'ruta-flamenco-autentico',
    title: {
      es: 'Ruta del Flamenco Auténtico',
      en: 'Authentic Flamenco Route',
    },
    description: {
      es: 'La zambra nació en los palacios nazaríes y sobrevivió en las cuevas del Sacromonte. Esta ruta combina el contexto histórico (Museo Cuevas, €5), el espectáculo más íntimo de Granada (Zambra María la Canastera, €26) y la peña más antigua de España (La Platería, 1949, jueves 21:30).',
      en: 'The zambra was born in Nasrid palaces and survived in the caves of Sacromonte. This route combines the historical context (Museo Cuevas, €5), the most intimate show in Granada (Zambra María la Canastera, €26) and the oldest flamenco club in Spain (La Platería, 1949, Thursdays 21:30).',
    },
    category: 'flamenco',
    difficulty: 'easy',
    duration: 240,
    distance: 3.0,
    timeOfDay: 'evening',
    neighborhoods: ['sacromonte', 'albaicin'],
    highlights: [
      {
        title: { es: 'Museo Cuevas del Sacromonte — Barranco de los Negros, s/n', en: 'Museo Cuevas del Sacromonte — Barranco de los Negros, s/n' },
        description: {
          es: 'El museo etnográfico que explica cómo las comunidades gitanas del Sacromonte transformaron la zambra morisca en el arte que es hoy. La palabra zambra viene del árabe zamra (flauta). Tras la expulsión de los moriscos en los siglos XVI y XVII, los gitanos que se asentaron en las cuevas del barranco adoptaron y reinventaron las zambras que se celebraban en los palacios nazaríes. El recorrido incluye 11 cuevas originales con mobiliario de época, jardín botánico, mirador y audioguía gratuita en español e inglés. En febrero de 2019 la zambra gitana del Sacromonte fue declarada Patrimonio Cultural Inmaterial. Entrada: €5 (menores de 10 gratis). Horario: diario 10:00–20:00 (invierno hasta 18:00).',
          en: 'The ethnographic museum that explains how the Gitano communities of Sacromonte transformed the Moorish zambra into the art it is today. The word zambra comes from the Arabic zamra (flute). After the expulsion of the Moriscos in the 16th and 17th centuries, the Gitanos who settled in the ravine caves adopted and reinvented the zambras celebrated in Nasrid palaces. The visit includes 11 original caves with period furnishings, a botanical garden, a viewpoint, and a free audio guide in Spanish and English. In February 2019, the Gitano zambra of Sacromonte was declared Intangible Cultural Heritage. Admission: €5 (children under 10 free). Hours: daily 10:00–20:00 (winter until 18:00).',
        },
      },
      {
        title: { es: 'Zambra María la Canastera — Camino del Sacromonte', en: 'Zambra María la Canastera — Camino del Sacromonte' },
        description: {
          es: 'La zambra familiar más íntima del Sacromonte: aforo de 100 personas, 6 artistas (cantaores, bailaoras y guitarra), una hora de espectáculo. La cueva está decorada con fotografías de las visitas de artistas y con cerámica y cobre repujado del barrio. Es una de las zambras más asequibles de Granada (€26 con consumición incluida) y una de las que mejor mantiene la forma tradicional de la zambra gitana. Reserva con antelación — se llena especialmente en temporada alta. El espectáculo comienza a las 21:00.',
          en: 'The most intimate family zambra in Sacromonte: capacity of 100 people, 6 artists (singers, dancers, and guitarist), one hour of performance. The cave is decorated with photographs of artists who have visited and with Sacromonte pottery and hammered copper. It is one of the most affordable zambras in Granada (€26 with drink included) and one of the best at preserving the traditional form of the Gitano zambra. Book in advance — it fills up especially in high season. Show starts at 21:00.',
        },
      },
      {
        title: { es: 'Peña La Platería — Albaicín (Los Jueves Flamencos, 21:30)', en: 'Peña La Platería — Albaicín (Flamenco Thursdays, 21:30)' },
        description: {
          es: 'Fundada en 1949 por Manuel Salamanca Jiménez, un platero granadino que reunía artistas y aficionados en su taller de la Calle San Matías. Es la primera y más antigua peña flamenca de España. En 1969 se trasladó a su sede actual en el Albaicín. Los Jueves Flamencos: cada jueves a las 21:30, artistas locales y el ambiente de aficionados auténticos — poca turista, mucho cante. El respeto es parte del ritual: sin flash, sin vídeo, sin conversaciones mientras actúan. Consulta la programación en laplateria.es.',
          en: 'Founded in 1949 by Manuel Salamanca Jiménez, a Granada silversmith who gathered artists and aficionados in his workshop on Calle San Matías. It is the first and oldest flamenco club (peña) in Spain. In 1969 it moved to its current home in the Albaicín. Flamenco Thursdays: every Thursday at 21:30, local artists and a genuine aficionado atmosphere — few tourists, serious singing. Respect is part of the ritual: no flash, no video, no conversation while performers are on. Check the program at laplateria.es.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'La Canastera cualquier noche; La Platería solo los jueves', en: 'La Canastera any night; La Platería only on Thursdays' },
        content: {
          es: 'Si tienes flexibilidad de fechas, visita el Museo Cuevas por la tarde (cierra a las 20:00), cena en Sacromonte o el Albaicín, y ve a La Platería el jueves a las 21:30. Si solo puedes ir un día, La Zambra María la Canastera funciona cualquier noche de la semana a las 21:00.',
          en: 'If you have flexible dates, visit the Museo Cuevas in the afternoon (closes at 20:00), have dinner in Sacromonte or the Albaicín, and go to La Platería on Thursday at 21:30. If you can only go one day, Zambra María la Canastera runs any night of the week at 21:00.',
        },
      },
      {
        title: { es: 'Reserva La Canastera por WhatsApp', en: 'Book La Canastera by WhatsApp' },
        content: {
          es: 'La Zambra María la Canastera tiene aforo para 100 personas y se llena en temporada alta. Reserva con antelación por WhatsApp o en su web (marialacanastera.com). En temporada baja (enero-febrero) suele haber hueco en el día.',
          en: 'Zambra María la Canastera holds 100 people and sells out in high season. Book in advance by WhatsApp or on their website (marialacanastera.com). In low season (January–February) same-day spots are usually available.',
        },
      },
      {
        title: { es: 'Cómo llegar al Sacromonte de noche', en: 'Getting to Sacromonte at night' },
        content: {
          es: 'El Sacromonte no tiene bus nocturno directo. Desde el centro se camina unos 25 minutos por el Paseo de los Tristes y el Camino del Sacromonte (bien iluminado). En taxi desde la Catedral son 5-7 minutos y unos €6-8.',
          en: 'Sacromonte has no direct night bus. From the center it is a 25-minute walk along the Paseo de los Tristes and the Camino del Sacromonte (well lit). By taxi from the Cathedral it is 5–7 minutes and about €6–8.',
        },
      },
      {
        title: { es: 'Presupuesto total', en: 'Total budget' },
        content: {
          es: 'Museo Cuevas €5 + Zambra María la Canastera €26 (con consumición) = €31 por persona. La Peña La Platería cobra una entrada módica los jueves (consultar en laplateria.es). Es una de las noches culturales más baratas y auténticas de Granada.',
          en: 'Museo Cuevas €5 + Zambra María la Canastera €26 (with drink) = €31 per person. La Platería charges a modest entry fee on Thursdays (check laplateria.es). This is one of the cheapest and most authentic cultural evenings in Granada.',
        },
      },
    ],
    tags: ['flamenco', 'zambra', 'sacromonte', 'albaicín', 'gitano', 'cante-jondo', 'peña'],
    featured: true,
    image: '/images/routes/sacromonte-darro.jpg',
    longDescription: {
      es: 'La zambra no es flamenco de escenario. Es un ritual que nació en los palacios de la Granada nazarí — las fiestas que los sultanes celebraban con músicos y bailarinas moriscas — y que sobrevivió a la Reconquista en las cuevas del Sacromonte. Cuando los Reyes Católicos expulsaron a los moriscos entre 1609 y 1614, los gitanos que ya vivían en el barranco del Sacromonte se quedaron con la forma y la vaciaron de su contenido árabe, llenándola con el universo sonoro del cante jondo: la bulería, la seguiriya, la soleá. El resultado fue un estilo propio — la zambra gitana del Sacromonte — que UNESCO reconoció como Patrimonio Cultural Inmaterial junto con el flamenco en 2010. La Peña La Platería es el otro extremo del espectro: nada de turistas, nada de escenario, nada de luces. Manuel Salamanca era platero y le gustaba el cante. En 1949 empezó a invitar a artistas a su taller. Lo que nació como tertulia de aficionados se convirtió en la primera peña flamenca de España. Setenta y cinco años después, cada jueves por la noche el Albaicín sigue sonando exactamente igual.',
      en: 'The zambra is not stage flamenco. It is a ritual born in the palaces of Nasrid Granada — the celebrations the sultans held with Moorish musicians and dancers — that survived the Reconquest in the caves of Sacromonte. When the Catholic Monarchs expelled the Moriscos between 1609 and 1614, the Gitanos already living in the Sacromonte ravine kept the form and emptied it of its Arab content, filling it with the sound world of cante jondo: bulería, seguiriya, soleá. The result was a style of its own — the Gitano zambra of Sacromonte — which UNESCO recognized as Intangible Cultural Heritage alongside flamenco in 2010. La Platería is the other end of the spectrum: no tourists, no stage, no lights. Manuel Salamanca was a silversmith who loved singing. In 1949 he started inviting artists to his workshop. What began as an aficionado gathering became the first flamenco club in Spain. Seventy-five years later, every Thursday night the Albaicín still sounds exactly the same.',
    },
    whatToBring: {
      es: ['Calzado cómodo — el Camino del Sacromonte es irregular y con pendiente', 'Ropa de abrigo — las cuevas son frescas por dentro incluso en verano', 'Efectivo o tarjeta para la consumición incluida', 'Reserva confirmada para La Canastera en temporada alta'],
      en: ['Comfortable shoes — the Camino del Sacromonte is uneven and hilly', 'A layer — the caves are cool inside even in summer', 'Cash or card for the included drink', 'Confirmed booking for La Canastera in high season'],
    },
    bestMonths: ['marzo', 'abril', 'mayo', 'junio', 'septiembre', 'octubre', 'noviembre'],
  },
  {
    id: 'rte-008',
    slug: 'ruta-fotografia-sacromonte',
    title: {
      es: 'Ruta de Fotografía en el Sacromonte',
      en: 'Photography Route in Sacromonte',
    },
    description: {
      es: 'Los mejores spots fotográficos del barrio de las cuevas. Contraluces, texturas de tierra blanca, flamenco puro y vistas únicas de la Alhambra que no verás en ninguna otra parte.',
      en: 'The best photographic spots in the cave neighborhood. Backlights, white earth textures, pure flamenco, and unique views of the Alhambra you won\'t find anywhere else.',
    },
    category: 'photography',
    difficulty: 'moderate',
    duration: 180,
    distance: 4.0,
    timeOfDay: 'sunset',
    neighborhoods: ['sacromonte'],
    highlights: [
      {
        title: { es: 'Barranco de los Negros', en: 'Barranco de los Negros' },
        description: {
          es: 'Camino de tierra con cuevas a ambos lados. Textura y luz únicos para fotografiar.',
          en: 'Dirt path with caves on both sides. Unique texture and light for photography.',
        },
      },
      {
        title: { es: 'Museo Cuevas del Sacromonte', en: 'Sacromonte Caves Museum' },
        description: {
          es: 'Cuevas rehabilitadas con la mejor vista de la Alhambra desde el lado opuesto del Darro.',
          en: 'Rehabilitated caves with the best view of the Alhambra from the other side of the Darro.',
        },
      },
      {
        title: { es: 'La Cerra', en: 'La Cerra' },
        description: {
          es: 'El punto más alto del Sacromonte con vistas 360° de Granada y Sierra Nevada.',
          en: 'The highest point in Sacromonte with 360° views of Granada and Sierra Nevada.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Equipo recomendado', en: 'Recommended equipment' },
        content: {
          es: 'Lleva objetivo angular para las cuevas y teleobjetivo para la Alhambra.',
          en: 'Bring a wide-angle lens for the caves and a telephoto for the Alhambra.',
        },
      },
      {
        title: { es: 'Respeto', en: 'Respect' },
        content: {
          es: 'Es un barrio habitado. Pide siempre permiso antes de fotografiar cuevas privadas.',
          en: 'It is an inhabited neighborhood. Always ask permission before photographing private caves.',
        },
      },
    ],
    tags: ['fotografía', 'sacromonte', 'cuevas', 'paisaje', 'texturas'],
    featured: false,
    image: '/images/routes/albaicin-panorama.jpg',
  },

  // ——————————————————————————————————————————
  // NATURALEZA
  // ——————————————————————————————————————————
  {
    id: 'rte-009',
    slug: 'senderismo-rio-darro',
    title: {
      es: 'Senderismo por el Río Darro',
      en: 'Hiking along the Darro River',
    },
    description: {
      es: 'Ruta de dificultad media que sigue el curso del Darro desde la Carrera hasta los Cármenes de la Muralla. Naturaleza, arqueología y vistas panorámicas a las que se accede a pie desde el centro.',
      en: 'Moderate route following the Darro from the Carrera to the Cármenes de la Muralla. Nature, archaeology, and panoramic views accessible on foot from the city center.',
    },
    category: 'hiking',
    difficulty: 'moderate',
    duration: 240,
    distance: 8.0,
    timeOfDay: 'morning',
    neighborhoods: ['centro', 'albaicin'],
    highlights: [
      {
        title: { es: 'Paseo de los Tristes', en: 'Paseo de los Tristes' },
        description: {
          es: 'El paseo más romántico de Granada, junto al río y a los pies de la Alhambra.',
          en: 'The most romantic walk in Granada, by the river and at the foot of the Alhambra.',
        },
      },
      {
        title: { es: 'Puente Espinosa', en: 'Espinosa Bridge' },
        description: {
          es: 'Puente del siglo XVI con vistas espectaculares del Barranco del Mauror.',
          en: '16th-century bridge with spectacular views of the Barranco del Mauror.',
        },
      },
      {
        title: { es: 'Fuente del Avellano', en: 'Avellano Fountain' },
        description: {
          es: 'Manantial histórico donde García Lorca recitaba y debatía con sus amigos de la Generación del 27.',
          en: 'Historic spring where García Lorca recited and debated with his Generation of \'27 friends.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Calzado', en: 'Footwear' },
        content: {
          es: 'Imprescindible calzado de senderismo. Hay tramos con piedra suelta y barro.',
          en: 'Hiking footwear is essential. There are sections with loose stones and mud.',
        },
      },
      {
        title: { es: 'Época recomendada', en: 'Recommended season' },
        content: {
          es: 'Primavera u otoño. El caudal del Darro es más espectacular en marzo y abril.',
          en: 'Spring or fall. The Darro\'s water level is most spectacular in March and April.',
        },
      },
    ],
    tags: ['senderismo', 'naturaleza', 'río', 'historia', 'vistas'],
    featured: false,
    image: '/images/routes/paseo-tristes.jpg',
    whatToBring: {
      es: ['Calzado de senderismo', 'Agua abundante', 'Snacks energéticos', 'Protección solar', 'Bastones opcionales para el regreso'],
      en: ['Hiking shoes', 'Plenty of water', 'Energy snacks', 'Sun protection', 'Optional trekking poles for the return'],
    },
    bestMonths: ['febrero', 'marzo', 'abril', 'mayo', 'octubre', 'noviembre'],
  },
  {
    id: 'rte-010',
    slug: 'bosque-alhambra-acequias',
    title: {
      es: 'El Bosque de la Alhambra y sus Acequias',
      en: 'The Alhambra Forest and its Water Channels',
    },
    description: {
      es: 'Ruta circular por el bosque que rodea la colina de la Alhambra, siguiendo el recorrido de las acequias nazaríes que abastecían de agua a los palacios. Un mundo verde escondido a minutos del centro.',
      en: 'Circular route through the forest surrounding the Alhambra hill, following the Nasrid water channels that supplied the palaces. A green world hidden minutes from the city center.',
    },
    category: 'hiking',
    difficulty: 'easy',
    duration: 100,
    distance: 3.2,
    timeOfDay: 'morning',
    neighborhoods: ['alhambra'],
    highlights: [
      {
        title: { es: 'Acequia Real', en: 'Acequia Real' },
        description: {
          es: 'El canal de agua nazarí de 7 km que traía agua desde el Darro al corazón de la Alhambra.',
          en: 'The 7 km Nasrid water channel that brought water from the Darro to the heart of the Alhambra.',
        },
      },
      {
        title: { es: 'Bosque de olmos y encinas', en: 'Elm and holm oak forest' },
        description: {
          es: 'El bosque del siglo XIX que rodea el recinto. En primavera, un espectáculo de verdor y pájaros cantores.',
          en: 'The 19th-century forest surrounding the complex. In spring, a spectacle of greenery and songbirds.',
        },
      },
      {
        title: { es: 'Torres defensivas externas', en: 'External defensive towers' },
        description: {
          es: 'Torres medievales integradas en el bosque, alejadas de los circuitos turísticos.',
          en: 'Medieval towers integrated into the forest, away from tourist circuits.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Acceso libre', en: 'Free access' },
        content: {
          es: 'La entrada al bosque es gratuita. No necesitas entrada a la Alhambra.',
          en: 'Entry to the forest is free. You don\'t need an Alhambra ticket.',
        },
      },
      {
        title: { es: 'Madrugar', en: 'Go early' },
        content: {
          es: 'Antes de las 9:00 el bosque está desierto y la luz entre los árboles es mágica.',
          en: 'Before 9 AM the forest is deserted and the light filtering through the trees is magical.',
        },
      },
    ],
    tags: ['naturaleza', 'bosque', 'acequias', 'alhambra', 'gratuito'],
    featured: true,
    image: '/images/routes/alhambra-jardines.jpg',
    whatToBring: {
      es: ['Calzado deportivo o de senderismo ligero', 'Agua', 'Cámara', 'Prismáticos para los pájaros'],
      en: ['Sports or light hiking shoes', 'Water', 'Camera', 'Binoculars for birdwatching'],
    },
    bestMonths: ['febrero', 'marzo', 'abril', 'mayo', 'octubre', 'noviembre', 'diciembre'],
  },

  // ——————————————————————————————————————————
  // ARTESANÍA
  // ——————————————————————————————————————————
  {
    id: 'rte-011',
    slug: 'barrio-artesanos-taracea',
    title: {
      es: 'El Barrio de los Artesanos: Taracea y Cerámica',
      en: 'The Artisans\' Quarter: Marquetry and Ceramics',
    },
    description: {
      es: 'Recorre el triángulo artesanal entre la Alcaicería, Calderería Nueva y el Corral del Carbón. Aquí sobreviven los talleres de taracea, cerámica nazarí y esparto que mantienen vivo el legado andalusí.',
      en: 'Walk the artisan triangle between the Alcaicería, Calderería Nueva, and Corral del Carbón. Here, marquetry, Nasrid ceramics, and esparto workshops keep the Andalusi legacy alive.',
    },
    category: 'history',
    difficulty: 'easy',
    duration: 120,
    distance: 1.8,
    timeOfDay: 'morning',
    neighborhoods: ['centro'],
    highlights: [
      {
        title: { es: 'La Alcaicería', en: 'La Alcaicería' },
        description: {
          es: 'El antiguo bazar de seda nazarí, hoy laberinto de tiendas artesanas con cerámica, esparto y cuero repujado.',
          en: 'The old Nasrid silk bazaar, today a labyrinth of artisan shops with ceramics, esparto, and embossed leather.',
        },
      },
      {
        title: { es: 'Calderería Nueva', en: 'Calderería Nueva' },
        description: {
          es: 'La calle más árabe de Granada, con talleres de lámparas de latón, teteras y mosaico nazarí.',
          en: 'Granada\'s most Arab-feeling street, with workshops making brass lamps, teapots, and Nasrid mosaic.',
        },
      },
      {
        title: { es: 'Taller de Taracea González', en: 'González Marquetry Workshop' },
        description: {
          es: 'Tres generaciones de maestros artesanos fabricando muebles y joyeros de taracea granadina, técnica heredada de los nazaríes.',
          en: 'Three generations of master craftsmen making Granada marquetry furniture and jewelry boxes, a technique inherited from the Nasrids.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Talleres en horario de mañana', en: 'Morning workshop hours' },
        content: {
          es: 'Los mejores talleres trabajan de 9:00 a 14:00. Por la tarde, muchos cierran para el descanso.',
          en: 'The best workshops operate from 9 AM to 2 PM. Many close in the afternoon.',
        },
      },
      {
        title: { es: 'Compra directa al artesano', en: 'Buy directly from the artisan' },
        content: {
          es: 'Evita las tiendas de souvenirs del paseo. El precio justo está en los talleres del interior.',
          en: 'Avoid souvenir shops on the main drag. Fair prices are found in the workshops further inside.',
        },
      },
    ],
    tags: ['artesanía', 'taracea', 'cerámica', 'nazarí', 'compras', 'tradición'],
    featured: true,
    image: '/images/routes/alcaiceria.jpg',
    longDescription: {
      es: 'Granada fue durante siglos el mayor centro artesanal de Al-Ándalus. La taracea (incrustaciones de madera con nácar y hueso), la cerámica verde y morada, el trabajo del esparto y el cuero repujado son artes que sobreviven hoy en pocos talleres del centro histórico. Esta ruta te lleva a conocer a los últimos maestros artesanos que mantienen estas técnicas del siglo XII, visitando su trabajo en directo y con la posibilidad de adquirir piezas únicas directamente del productor.',
      en: 'Granada was for centuries the greatest artisan center of Al-Andalus. Marquetry (wood inlaid with mother-of-pearl and bone), green and purple ceramics, esparto work, and embossed leather are arts that survive today in just a handful of workshops in the historic center. This route takes you to meet the last master craftsmen keeping these 12th-century techniques alive, watching them work and with the chance to buy unique pieces directly from the maker.',
    },
    whatToBring: {
      es: ['Efectivo para compras en talleres', 'Bolsa de tela para tus compras', 'Cámara (pedir permiso antes de fotografiar artesanos)'],
      en: ['Cash for workshop purchases', 'Cloth bag for your purchases', 'Camera (ask permission before photographing artisans)'],
    },
    bestMonths: ['enero', 'febrero', 'marzo', 'abril', 'octubre', 'noviembre', 'diciembre'],
  },
  {
    id: 'rte-012',
    slug: 'talleres-esparto-realejo',
    title: {
      es: 'Talleres de Esparto y Seda del Realejo',
      en: 'Esparto and Silk Workshops of the Realejo',
    },
    description: {
      es: 'El Realejo fue el barrio de los tejedores y artesanos del esparto en la Granada árabe. Esta ruta combina visita a talleres activos con la historia del barrio judío y sus tradiciones artesanales supervivientes.',
      en: 'The Realejo was the neighborhood of weavers and esparto craftsmen in Arab Granada. This route combines visits to active workshops with the history of the Jewish quarter and its surviving craft traditions.',
    },
    category: 'history',
    difficulty: 'easy',
    duration: 150,
    distance: 2.2,
    timeOfDay: 'morning',
    neighborhoods: ['realejo'],
    highlights: [
      {
        title: { es: 'Taller de Esparto El Realejo', en: 'El Realejo Esparto Workshop' },
        description: {
          es: 'Uno de los últimos talleres de esparto de Granada, donde todavía se trenzan a mano cestas, esteras y sombrerería tradicional.',
          en: 'One of Granada\'s last esparto workshops, where baskets, mats, and traditional hats are still braided by hand.',
        },
      },
      {
        title: { es: 'Casa de los Tiros', en: 'Casa de los Tiros' },
        description: {
          es: 'Palacio renacentista que alberga el Museo de Artes y Costumbres Populares, con la mejor colección de artesanía tradicional granadina.',
          en: 'Renaissance palace housing the Museum of Popular Arts and Customs, with the best collection of traditional Granada crafts.',
        },
      },
      {
        title: { es: 'Callejón del Gallo', en: 'Callejón del Gallo' },
        description: {
          es: 'Callejuela escondida donde sobreviven dos talleres de trabajo en cuero y herrería artística.',
          en: 'Hidden alley where two workshops of leatherwork and artistic ironwork survive.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Museos gratuitos', en: 'Free museums' },
        content: {
          es: 'La Casa de los Tiros tiene entrada gratuita para ciudadanos de la UE.',
          en: 'Casa de los Tiros has free entry for EU citizens.',
        },
      },
      {
        title: { es: 'Martes y jueves', en: 'Tuesdays and Thursdays' },
        content: {
          es: 'Algunos talleres hacen demostraciones para grupos los martes y jueves por la mañana.',
          en: 'Some workshops hold demonstrations for groups on Tuesday and Thursday mornings.',
        },
      },
    ],
    tags: ['artesanía', 'esparto', 'seda', 'realejo', 'tradición', 'talleres'],
    featured: false,
    image: '/images/routes/alcaiceria.jpg',
  },

  // ——————————————————————————————————————————
  // FLAMENCO
  // ——————————————————————————————————————————
  {
    id: 'rte-013',
    slug: 'sacromonte-flamenco-historia-gitana',
    title: {
      es: 'Sacromonte: flamenco y cultura gitana',
      en: 'Sacromonte: Flamenco and Gitano Culture',
    },
    description: {
      es: 'La tarde perfecta en el Sacromonte: museo, cuevas históricas, mirador al atardecer frente a la Alhambra y espectáculo flamenco en una cueva familiar. El barrio donde nació el flamenco, con tiempo para entenderlo.',
      en: 'The perfect Sacromonte evening: museum, historic caves, sunset viewpoint facing the Alhambra, and a flamenco show in a family cave. The neighborhood where flamenco was born, with time to understand it.',
    },
    category: 'flamenco',
    difficulty: 'easy',
    duration: 210,
    distance: 3.0,
    timeOfDay: 'sunset',
    neighborhoods: ['sacromonte', 'albaicin'],
    longDescription: {
      es: 'El Sacromonte no es un barrio que se visita rápido. Es un barrio que se entiende despacio. Esta ruta empieza en el museo para que tengas el contexto que la mayoría de visitantes no tiene: por qué los gitanos llegaron aquí, cómo construyeron sus cuevas, qué fue el flamenco antes de ser un producto turístico. Luego subes por el Camino del Sacromonte, ves las cuevas desde fuera, identifies las que tienen historia real, y llegas al mirador justo cuando el sol empieza a ponerse sobre la Alhambra. La noche termina dentro de una cueva familiar, con el cante que no tiene hora fija de empezar ni de terminar.',
      en: 'Sacromonte is not a neighborhood you visit quickly. It\'s a neighborhood you understand slowly. This route starts at the museum so you have the context most visitors lack: why the gitanos came here, how they built their caves, what flamenco was before it became a tourist product. Then you climb Camino del Sacromonte, see the caves from outside, identify the ones with real history, and reach the viewpoint just as the sun begins to set over the Alhambra. The night ends inside a family cave, with cante that has no fixed start time and no fixed end.',
    },
    highlights: [
      {
        title: { es: 'Museo del Sacromonte', en: 'Sacromonte Museum' },
        description: {
          es: 'Empieza aquí. El Museo del Sacromonte (Barranco de los Negros, 9) explica la historia del barrio y la cultura gitana con rigor y sin romantizarla. Réplicas de cuevas originales, utensilios, documentos. Abre hasta las 19h en temporada alta. Entrada: 5€. Sin esto, el resto de la ruta es solo paisaje.',
          en: 'Start here. The Sacromonte Museum (Barranco de los Negros, 9) explains the history of the neighborhood and gitano culture with rigor and without romanticizing it. Replica original caves, utensils, documents. Open until 7pm in high season. Entry: €5. Without this, the rest of the route is just scenery.',
        },
      },
      {
        title: { es: 'Camino del Sacromonte: las cuevas históricas', en: 'Camino del Sacromonte: the historic caves' },
        description: {
          es: 'Sube por el Camino del Sacromonte desde el Paseo del Padre Manjón. Las cuevas con placa familiar son las genuinas: Carmona, Maya, Heredia, Montoya. Lee los carteles, fíjate en cuáles tienen espectáculo esa noche. La subida es suave y el pavimento está bien mantenido.',
          en: 'Climb Camino del Sacromonte from Paseo del Padre Manjón. Caves with family plaques are the genuine ones: Carmona, Maya, Heredia, Montoya. Read the signs, check which ones have a show that night. The climb is gentle and the pavement is well maintained.',
        },
      },
      {
        title: { es: 'Mirador del Sacromonte al atardecer', en: 'Sacromonte viewpoint at sunset' },
        description: {
          es: 'Desde lo alto del Camino del Sacromonte hay un mirador natural con vistas directas a la Alhambra. A diferencia del Mirador de San Nicolás, aquí no hay vendedores ambulantes ni grupos de turistas organizados. Solo la Alhambra encendiéndose en naranja mientras el valle se llena de sombra.',
          en: 'From the top of Camino del Sacromonte there\'s a natural viewpoint with direct views of the Alhambra. Unlike the San Nicolás viewpoint, here there are no street vendors or organized tourist groups. Just the Alhambra turning orange while the valley fills with shadow.',
        },
      },
      {
        title: { es: 'Espectáculo flamenco en cueva familiar', en: 'Flamenco show in a family cave' },
        description: {
          es: 'Llama por la tarde a la Cueva de la Rocío (familia Carmona) o a la Cueva de María la Canastera para confirmar hora y reservar. El espectáculo empieza cuando el cantaor está listo, no en punto. El espacio es pequeño, las paredes son roca, y los artistas son de la familia. Precio: 25-30€ con copa.',
          en: 'Call in the afternoon to Cueva de la Rocío (Carmona family) or Cueva de María la Canastera to confirm the time and book. The show starts when the cantaor is ready, not on the dot. The space is small, the walls are rock, and the artists are family. Price: €25-30 with a drink.',
        },
      },
      {
        title: { es: 'Vuelta por el Paseo del Darro', en: 'Return via Paseo del Darro' },
        description: {
          es: 'Si la hora y las piernas lo permiten, vuelve bajando hasta la Carrera del Darro y sigue el río hasta la Plaza Nueva. De noche el paseo está iluminado y casi vacío de turistas. Es el mejor momento para ver el Puente del Cadí y los baños árabes del Bañuelo desde fuera.',
          en: 'If time and legs allow, return by descending to Carrera del Darro and follow the river to Plaza Nueva. At night the path is lit and almost empty of tourists. It\'s the best moment to see the Puente del Cadí and the Arab baths of El Bañuelo from outside.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Hora de salida', en: 'Departure time' },
        content: {
          es: 'Empieza el museo a las 17:30 para llegar al mirador antes del atardecer y tener tiempo de cenar antes del espectáculo (que suele ser a las 21:30-22:00).',
          en: 'Start the museum at 5:30 PM to reach the viewpoint before sunset and have time to eat before the show (usually at 9:30-10:00 PM).',
        },
      },
      {
        title: { es: 'Reserva la cueva ese mismo día', en: 'Book the cave the same day' },
        content: {
          es: 'Llama por la tarde para confirmar. En agosto reserva con varios días de antelación. Muchas cuevas no tienen web — el teléfono es el único canal.',
          en: 'Call in the afternoon to confirm. In August, book several days ahead. Many caves have no website — phone is the only channel.',
        },
      },
      {
        title: { es: 'Calzado y chaqueta', en: 'Footwear and jacket' },
        content: {
          es: 'El Camino del Sacromonte tiene adoquines irregulares. Nada de tacones. Por la noche, incluso en verano, la temperatura baja varios grados respecto al centro.',
          en: 'Camino del Sacromonte has uneven cobblestones. No heels. At night, even in summer, the temperature drops several degrees compared to the city centre.',
        },
      },
      {
        title: { es: 'Volver en taxi', en: 'Return by taxi' },
        content: {
          es: 'A medianoche el bus C34 tiene frecuencia baja. Pide el número al taxista que te lleve o usa Uber para la vuelta. Precio al centro: 6-8€.',
          en: 'At midnight bus C34 has low frequency. Get the number of the taxi driver who takes you up, or use Uber for the return. Price to centre: €6-8.',
        },
      },
    ],
    whatToBring: {
      es: ['Calzado cómodo con suela antideslizante', 'Chaqueta ligera (noches frescas incluso en verano)', 'Efectivo para las cuevas (no siempre aceptan tarjeta)', 'Teléfono cargado para la reserva y el taxi de vuelta'],
      en: ['Comfortable shoes with non-slip soles', 'Light jacket (cool nights even in summer)', 'Cash for the caves (cards not always accepted)', 'Charged phone for the booking and return taxi'],
    },
    bestMonths: ['marzo', 'abril', 'mayo', 'junio', 'septiembre', 'octubre'],
    tags: ['flamenco', 'sacromonte', 'cuevas', 'atardecer', 'cultura gitana', 'nocturna'],
    featured: true,
    image: '/images/routes/sacromonte-darro.jpg',
  },

  // ——————————————————————————————————————————
  // HISTORIA / PATRIMONIO ÁRABE
  // ——————————————————————————————————————————
  {
    id: 'rte-014',
    slug: 'granada-arabe-historia-nazari',
    title: {
      es: 'Granada árabe: la ciudad nazarí a pie',
      en: 'Arab Granada: the Nasrid City on Foot',
    },
    description: {
      es: 'Dos horas y media por los restos de la Garnata islámica: los baños árabes más antiguos de España, el único alhóndiga nazarí conservado, la antigua universidad islámica y el zoco reconstruido sobre la trama original del siglo XIV. Sin guía, sin grupo, sin prisa.',
      en: 'Two and a half hours through what remains of Islamic Garnata: the oldest Arab baths in Spain, the only surviving Nasrid caravanserai, the ancient Islamic university, and the reconstructed souk built over the original 14th-century street grid. No guide, no group, no rush.',
    },
    category: 'history',
    difficulty: 'easy',
    duration: 150,
    distance: 2.2,
    timeOfDay: 'morning',
    neighborhoods: ['centro', 'albaicin'],
    longDescription: {
      es: `<p>Granada fue durante más de dos siglos (1238–1492) la capital del último reino islámico de la península ibérica. Mientras el resto de Al-Ándalus caía, la Granada nazarí florecía: construyó la Alhambra, amplió el barrio del Albaicín, levantó mezquitas, madrazas, alhóndigas y baños que aún hoy pueden visitarse.</p>

<p>Esta ruta no es la Alhambra — eso merece un día entero aparte. Es el tejido urbano que los nazaríes dejaron a los pies de la colina: las calles que siguieron siendo calles, los edificios que sobrevivieron con otro nombre, los vestigios que la Granada cristiana decidió conservar por utilidad o por olvido.</p>

<p>El itinerario empieza en el Bañuelo, en la Carrera del Darro, los baños árabes del siglo XI en mejor estado de toda España. De ahí sube al centro histórico: el Corral del Carbón, que fue alhóndiga nazarí y hoy sigue siendo el único edificio de ese tipo conservado en la península; la Madraza, fundada por Yusuf I en 1349 como universidad islámica; y la Alcaicería, el zoco de los sederos reconstruido sobre la retícula árabe original.</p>

<p>Dos horas y media, menos de dos kilómetros y medio, y sin entrar en ningún recinto de pago. La historia árabe de Granada se puede leer caminando, si sabes dónde mirar.</p>`,
      en: `<p>Granada was for more than two centuries (1238–1492) the capital of the last Islamic kingdom on the Iberian Peninsula. While the rest of Al-Andalus fell, Nasrid Granada flourished: it built the Alhambra, expanded the Albaicín quarter, and raised mosques, madrasas, caravanserais, and hammams that can still be visited today.</p>

<p>This route is not the Alhambra — that deserves a full day on its own. It is the urban fabric the Nasrids left at the foot of the hill: streets that remained streets, buildings that survived under different names, vestiges that Christian Granada chose to preserve out of usefulness or neglect.</p>

<p>The itinerary starts at El Bañuelo, on Carrera del Darro — 11th-century Arab baths in better condition than any others in Spain. From there it moves into the historic centre: the Corral del Carbón, a Nasrid caravanserai and the only surviving building of its kind on the peninsula; the Madraza, founded by Yusuf I in 1349 as an Islamic university; and the Alcaicería, the silk merchants' souk reconstructed over the original Arab street grid.</p>

<p>Two and a half hours, under two and a half kilometres, and no paid entry required. The Arab history of Granada can be read by walking, if you know where to look.</p>`,
    },
    highlights: [
      {
        title: { es: 'El Bañuelo — Carrera del Darro, 31', en: 'El Bañuelo — Carrera del Darro, 31' },
        description: {
          es: 'Los baños árabes mejor conservados de España. Construidos en el siglo XI, durante el reino zirí, funcionaron sin interrupción hasta el siglo XVI. La sala de las estrellas — bóvedas de ladrillo con lucernarios en forma de estrella de ocho puntas para regular la luz y la temperatura — es el espacio más fotografiado. Entrada gratuita. Abre martes a sábado 10:00–14:00. Cerrado lunes.',
          en: 'The best-preserved Arab baths in Spain. Built in the 11th century during the Zirid kingdom, they operated without interruption until the 16th century. The star room — brick vaults with eight-pointed star skylights to regulate light and temperature — is the most photographed space. Free entry. Open Tuesday to Saturday 10:00–14:00. Closed Monday.',
        },
      },
      {
        title: { es: 'Corral del Carbón — Calle Mariana Pineda, s/n', en: 'Corral del Carbón — Calle Mariana Pineda, s/n' },
        description: {
          es: 'El único alhóndiga nazarí conservado en toda la península ibérica. Construida en el siglo XIV como posada y almacén para los mercaderes árabes, sobrevivió porque los Reyes Católicos la reconvirtieron primero en almacén de carbón (de ahí el nombre actual) y luego en teatro. La portada de mocárabes del arco de entrada es de las más elaboradas que quedan fuera de la Alhambra. Entrada libre todos los días, 9:00–20:30.',
          en: 'The only surviving Nasrid caravanserai on the entire Iberian Peninsula. Built in the 14th century as an inn and warehouse for Arab merchants, it survived because the Catholic Monarchs converted it first into a charcoal store (hence the current name) and then into a theatre. The muqarnas portal of the entrance arch is among the most elaborate surviving outside the Alhambra. Free entry every day, 9:00–20:30.',
        },
      },
      {
        title: { es: 'Madraza de Granada — Calle Oficios, 14', en: 'Madraza de Granada — Calle Oficios, 14' },
        description: {
          es: 'Fundada en 1349 por el sultán Yusuf I como universidad islámica — la primera de la península. Tras la conquista, los Reyes Católicos la compraron como sede del ayuntamiento. Del interior nazarí original solo queda la capilla del oratorio, con una cúpula de mocárabes y azulejos geométricos que el Ayuntamiento tapiró durante siglos y redescubrió en el siglo XX. Es la pieza más sorprendente de la ruta. Entrada libre lunes a viernes, 10:00–14:00.',
          en: 'Founded in 1349 by Sultan Yusuf I as an Islamic university — the first on the peninsula. After the Conquest, the Catholic Monarchs bought it as the town hall. Of the original Nasrid interior only the oratory chapel survives, with a muqarnas dome and geometric tilework that the city council walled up for centuries and rediscovered in the 20th century. It is the most surprising space on the route. Free entry Monday to Friday, 10:00–14:00.',
        },
      },
      {
        title: { es: 'Alcaicería — junto a la Catedral', en: 'Alcaicería — next to the Cathedral' },
        description: {
          es: 'El zoco de los sederos nazarí — la zona comercial más protegida y rentable de la ciudad medieval. El original fue destruido por un incendio en 1843; lo que se ve hoy es una reconstrucción orientalista del siglo XIX sobre la retícula de calles árabe original. Pasear por sus callejones estrechos sigue siendo útil para entender cómo funcionaba el comercio urbano nazarí: una calle por gremio, cerrada con portones de noche. Hoy vende artesanía local y cerámica.',
          en: 'The Nasrid silk merchants\' souk — the most protected and profitable commercial zone in the medieval city. The original was destroyed by fire in 1843; what you see today is a 19th-century Orientalist reconstruction built over the original Arab street grid. Walking its narrow alleys is still useful for understanding how Nasrid urban commerce worked: one street per guild, closed with gates at night. Today it sells local crafts and ceramics.',
        },
      },
      {
        title: { es: 'Puerta de Elvira — entrada norte del Albaicín', en: 'Puerta de Elvira — north entrance to the Albaicín' },
        description: {
          es: 'Uno de los arcos nazaríes mejor conservados en pie. Fue la puerta principal de entrada a la ciudad desde el norte, en el camino de Córdoba. El arco de herradura con ladrillo visto y el alfiz enmarcándolo son elementos característicos de la arquitectura militar nazarí. Hoy está integrada en el tráfico urbano, lo que dificulta la perspectiva, pero merece los cinco minutos de desvío si el tiempo lo permite.',
          en: 'One of the best-preserved Nasrid arches still standing. It was the main northern entrance to the city, on the road from Córdoba. The horseshoe arch in exposed brick with its alfiz frame are characteristic elements of Nasrid military architecture. Today it is integrated into urban traffic, which makes perspective difficult, but it is worth the five-minute detour if time allows.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Empieza antes de las 10:00', en: 'Start before 10:00' },
        content: {
          es: 'El Bañuelo abre a las 10:00 y tiene aforo limitado — llegar cinco minutos antes evita esperar. La Carrera del Darro de mañana, sin grupos de tour, es uno de los mejores paseos de Granada.',
          en: 'El Bañuelo opens at 10:00 and has limited capacity — arriving five minutes early avoids a wait. The Carrera del Darro in the morning, without tour groups, is one of Granada\'s best walks.',
        },
      },
      {
        title: { es: 'La Madraza cierra por la tarde', en: 'The Madraza is only open in the morning' },
        content: {
          es: 'Horario: lunes a viernes, 10:00–14:00. Si haces la ruta en jueves o viernes incluye la Madraza al principio para no perdértela. Los fines de semana está cerrada.',
          en: 'Hours: Monday to Friday, 10:00–14:00. If you do the route on a Thursday or Friday, include the Madraza early so you don\'t miss it. It is closed on weekends.',
        },
      },
      {
        title: { es: 'Desayuna en una tetería antes de empezar', en: 'Have breakfast in a teahouse before you start' },
        content: {
          es: 'La Calle Calderería Nueva, a dos minutos del Bañuelo, tiene la concentración más alta de teterías de Granada. Té moruno y msemen a menos de 5€. Es el desayuno más coherente con la ruta que vas a hacer.',
          en: 'Calle Calderería Nueva, two minutes from El Bañuelo, has the highest concentration of teahouses in Granada. Moorish tea and msemen for under €5. It is the most fitting breakfast for the route you are about to walk.',
        },
      },
      {
        title: { es: 'La Alcaicería no es para comprar', en: 'The Alcaicería is not for shopping' },
        content: {
          es: 'El nivel de turismo hace que los precios de artesanía sean de zona aeropuerto. Visítala para entender la trama urbana y la historia del zoco, no para comprar. Si quieres cerámica granadina de calidad, hay mejores opciones en el Realejo.',
          en: 'The tourist volume means craft prices are at airport-level. Visit it to understand the street grid and souk history, not to shop. If you want quality Granada ceramics, there are better options in the Realejo.',
        },
      },
    ],
    whatToBring: {
      es: ['Calzado cómodo (calles empedradas en todo el trayecto)', 'Botella de agua — pocas fuentes en el recorrido central', 'Algo para leer dentro del Bañuelo (folleto o guía descargada)', 'Cámara o teléfono cargado — la sala de estrellas del Bañuelo y la cúpula de la Madraza merecen la foto'],
      en: ['Comfortable shoes (cobblestones throughout)', 'Water bottle — few fountains along the central stretch', 'Something to read inside El Bañuelo (leaflet or downloaded guide)', 'Camera or charged phone — El Bañuelo\'s star room and the Madraza dome are worth the shot'],
    },
    bestMonths: ['marzo', 'abril', 'mayo', 'octubre', 'noviembre'],
    tags: ['historia', 'árabe', 'nazarí', 'bañuelo', 'madraza', 'patrimonio', 'mañana'],
    featured: false,
    image: '/images/routes/alcaiceria.jpg',
  },
];

