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
      es: 'Los mejores bares del centro histórico y el Realejo donde las tapas siguen siendo gratis con la bebida. Una experiencia gastronómica auténtica creada por locales.',
      en: 'The best tapas bars in the historic center where they still serve free tapas with every drink. A route through Granada\'s most authentic gastronomy.',
    },
    category: 'tapeo',
    difficulty: 'easy',
    duration: 180,
    distance: 2.0,
    timeOfDay: 'evening',
    neighborhoods: ['centro', 'realejo'],
    highlights: [
      {
        title: { es: 'Bar Casa Julio', en: 'Bar Casa Julio' },
        description: {
          es: 'Especialidad en caracoles y ambiente auténtico desde 1951.',
          en: 'Specialty in snails and authentic atmosphere since 1951.',
        },
      },
      {
        title: { es: 'Taberna La Tana', en: 'Taberna La Tana' },
        description: {
          es: 'Vinos naturales y tapas creativas en el corazón del Realejo.',
          en: 'Natural wines and creative tapas in the heart of the Realejo.',
        },
      },
      {
        title: { es: 'Los Manueles', en: 'Los Manueles' },
        description: {
          es: 'Institución granadina desde 1917, famosa por sus migas y boquerones.',
          en: 'Granada institution since 1917, famous for its migas and anchovies.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Horario', en: 'Schedule' },
        content: {
          es: 'Empieza sobre las 20:30. Los granadinos cenan tarde.',
          en: 'Start around 8:30 PM. Granadinos dine late.',
        },
      },
      {
        title: { es: 'Consejo local', en: 'Local tip' },
        content: {
          es: 'Pide "un cuarto" de cerveza, la medida tradicional granadina.',
          en: 'Ask for "un cuarto" of beer, the traditional Granada measure.',
        },
      },
    ],
    tags: ['gastronomía', 'tapas', 'bares', 'tradicional', 'centro'],
    featured: true,
    longDescription: {
      es: 'Granada es famosa por ser una de las últimas ciudades de España donde las tapas siguen siendo gratis con cada consumición. Esta ruta te lleva por los bares más auténticos del centro histórico y el Realejo, donde podrás disfrutar de la verdadera cultura del tapeo granadino. Desde los caracoles de Casa Julio hasta los vinos naturales de La Tana, cada parada es una institución local que ha mantenido vivas las tradiciones gastronómicas de la ciudad durante décadas.',
      en: 'Granada is famous for being one of the last cities in Spain where tapas are still free with every drink. This route takes you through the most authentic bars in the historic center and the Realejo, where you can enjoy the true culture of Granadan tapas. From the snails at Casa Julio to the natural wines at La Tana, each stop is a local institution that has kept the city\'s gastronomic traditions alive for decades.',
    },
    whatToBring: {
      es: ['Hambre y ganas de descubrir', 'Calzado cómodo para caminar entre bares', 'Dinero en efectivo (algunos bares no aceptan tarjeta)', 'Botella de agua entre tapa y tapa'],
      en: ['Hunger and curiosity', 'Comfortable shoes for walking between bars', 'Cash (some bars don\'t accept cards)', 'Water bottle between tapas'],
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
      es: 'Descubre la cultura del vermut granadino entre terrazas con vistas a la Alhambra. La mejor combinación de paisaje, conversación y cocina de mercado de temporada.',
      en: 'Discover Granada\'s vermouth culture on terraces with Alhambra views. The perfect blend of scenery, conversation, and seasonal market cooking.',
    },
    category: 'tapeo',
    difficulty: 'easy',
    duration: 150,
    distance: 1.5,
    timeOfDay: 'afternoon',
    neighborhoods: ['albaicin'],
    highlights: [
      {
        title: { es: 'Terraza del Mirador de San Nicolás', en: 'San Nicolás Viewpoint Terrace' },
        description: {
          es: 'Vermut con aceitunas y la Alhambra enfrente. No existe mejor panorama.',
          en: 'Vermouth with olives and the Alhambra in front. No better panorama exists.',
        },
      },
      {
        title: { es: 'Bar El Habanero', en: 'Bar El Habanero' },
        description: {
          es: 'Ambiente auténtico de barrio, tapas copiosas y vermut de grifo.',
          en: 'Authentic neighborhood atmosphere, generous tapas, and draught vermouth.',
        },
      },
      {
        title: { es: 'Placeta de San Miguel Bajo', en: 'San Miguel Bajo Square' },
        description: {
          es: 'La plaza más animada del Albaicín a mediodía. Terrazas bajo los naranjos.',
          en: 'The liveliest square in the Albaicín at midday. Terraces under the orange trees.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Mejor momento', en: 'Best time' },
        content: {
          es: 'Entre las 13:00 y las 15:00 los sábados. El ambiente es inigualable.',
          en: 'Between 1 PM and 3 PM on Saturdays. The atmosphere is unmatched.',
        },
      },
      {
        title: { es: 'Transporte', en: 'Transport' },
        content: {
          es: 'Sube en el bus C1 desde Plaza Nueva. Baja caminando y disfrutando.',
          en: 'Take bus C1 from Plaza Nueva up. Walk back down enjoying the views.',
        },
      },
    ],
    tags: ['vermut', 'tapas', 'terrazas', 'albaicín', 'vistas'],
    featured: false,
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
      es: 'Ruta por los mejores miradores del Albaicín para ver la Alhambra al atardecer: San Nicolás, San Cristóbal y el jardín secreto de Santa Isabel la Real. La puesta de sol más famosa de Granada.',
      en: 'Route through the three most spectacular viewpoints of the Albaicín to contemplate the Alhambra at sunset. San Nicolás, San Cristóbal, and the secret of Santa Isabel la Real.',
    },
    category: 'cultural',
    difficulty: 'easy',
    duration: 120,
    distance: 3.5,
    timeOfDay: 'sunset',
    neighborhoods: ['albaicin'],
    highlights: [
      {
        title: { es: 'Mirador de San Nicolás', en: 'San Nicolás Viewpoint' },
        description: {
          es: 'El más famoso, con la Alhambra a tus pies y Sierra Nevada al fondo.',
          en: 'The most famous, with the Alhambra at your feet and Sierra Nevada in the background.',
        },
      },
      {
        title: { es: 'Mirador de San Cristóbal', en: 'San Cristóbal Viewpoint' },
        description: {
          es: 'Más tranquilo, con vistas panorámicas de toda la ciudad y la vega.',
          en: 'Quieter, with panoramic views of the whole city and the vega.',
        },
      },
      {
        title: { es: 'Carmen de Santa Isabel la Real', en: 'Carmen of Santa Isabel la Real' },
        description: {
          es: 'Un jardín conventual con vistas privadas sobre el Darro y encanto único.',
          en: 'A convent garden with private views over the Darro river and unique charm.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Mejor hora', en: 'Best time' },
        content: {
          es: 'Llega 45 minutos antes del atardecer para encontrar buen sitio.',
          en: 'Arrive 45 minutes before sunset to find a good spot.',
        },
      },
      {
        title: { es: 'Qué llevar', en: 'What to bring' },
        content: {
          es: 'Calzado cómodo, agua y una chaqueta para cuando baje el sol.',
          en: 'Comfortable shoes, water, and a jacket for when the sun goes down.',
        },
      },
    ],
    tags: ['atardecer', 'vistas', 'albaicín', 'fotografía', 'romántico'],
    featured: true,
    longDescription: {
      es: 'El Albaicín es el barrio más antiguo de Granada, declarado Patrimonio de la Humanidad, y sus miradores ofrecen las vistas más icónicas de la Alhambra. Esta ruta te lleva por calles empedradas, entre casas encaladas y jardines secretos, para descubrir los tres puntos panorámicos más espectaculares. Desde el bullicioso Mirador de San Nicolás hasta el tranquilo de San Cristóbal, pasando por el escondido Carmen de Santa Isabel, cada parada ofrece una perspectiva única del monumento nazarí.',
      en: 'The Albaicín is Granada\'s oldest neighborhood, declared a UNESCO World Heritage Site, and its viewpoints offer the most iconic views of the Alhambra. This route takes you along cobbled streets, between whitewashed houses and secret gardens, to discover the three most spectacular panoramic points.',
    },
    whatToBring: {
      es: ['Calzado cómodo para caminar por empedrado', 'Cámara o móvil con batería cargada', 'Agua para el recorrido', 'Chaqueta ligera para después del atardecer'],
      en: ['Comfortable shoes for walking on cobblestones', 'Camera or phone with charged battery', 'Water for the route', 'Light jacket for after sunset'],
    },
    bestMonths: ['marzo', 'abril', 'mayo', 'septiembre', 'octubre', 'noviembre'],
  },
  {
    id: 'rte-004',
    slug: 'granada-monumental',
    title: {
      es: 'Granada Monumental: El Siglo de Oro',
      en: 'Monumental Granada: The Golden Age',
    },
    description: {
      es: 'Recorrido por los monumentos más emblemáticos del Renacimiento español. Catedral, Capilla Real, Monasterio de San Jerónimo y más joyas arquitectónicas del siglo XVI.',
      en: 'Route through the most emblematic monuments of the Spanish Renaissance. Cathedral, Royal Chapel, Monastery of San Jerónimo and more 16th-century architectural jewels.',
    },
    category: 'cultural',
    difficulty: 'easy',
    duration: 300,
    distance: 4.0,
    timeOfDay: 'morning',
    neighborhoods: ['centro'],
    highlights: [
      {
        title: { es: 'Catedral de Granada', en: 'Granada Cathedral' },
        description: {
          es: 'Primera iglesia renacentista de España. Obra maestra de Diego de Siloé.',
          en: 'First Renaissance church in Spain. Masterpiece by Diego de Siloé.',
        },
      },
      {
        title: { es: 'Capilla Real', en: 'Royal Chapel' },
        description: {
          es: 'Mausoleo de los Reyes Católicos. Joya del gótico isabelino y tesoro de pintura flamenca.',
          en: 'Mausoleum of the Catholic Monarchs. Jewel of Isabelline Gothic and Flemish painting.',
        },
      },
      {
        title: { es: 'Monasterio de San Jerónimo', en: 'Monastery of San Jerónimo' },
        description: {
          es: 'El claustro más hermoso de España según muchos historiadores del arte.',
          en: 'The most beautiful cloister in Spain according to many art historians.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Bono turístico', en: 'Tourist pass' },
        content: {
          es: 'Compra el bono conjunto de monumentos. Ahorrarás dinero y tiempo.',
          en: 'Buy the joint monument pass. You will save money and time.',
        },
      },
      {
        title: { es: 'Torre de la Catedral', en: 'Cathedral Tower' },
        content: {
          es: 'Sube a la torre para vistas panorámicas únicas sobre los tejados del centro.',
          en: 'Climb the tower for unique panoramic views over the rooftops of the center.',
        },
      },
    ],
    tags: ['monumentos', 'historia', 'renacimiento', 'arquitectura', 'cultura'],
    featured: true,
    longDescription: {
      es: 'Granada es una de las ciudades con mayor concentración de monumentos renacentistas de España, fruto de su importancia histórica tras la Reconquista. La Catedral, con su impresionante fachada y cúpula, marca el inicio de la arquitectura renacentista en España. La Capilla Real guarda los restos de los Reyes Católicos, artífices de la unificación de España. El Monasterio de San Jerónimo, joya poco concurrida, alberga el claustro más bello del país.',
      en: 'Granada is one of the cities with the highest concentration of Renaissance monuments in Spain. The Cathedral marks the beginning of Renaissance architecture in Spain. The Royal Chapel holds the remains of the Catholic Monarchs. The Monastery of San Jerónimo houses the most beautiful cloister in the country.',
    },
    whatToBring: {
      es: ['Calzado cómodo', 'Ropa apropiada para visitar lugares de culto', 'Cámara (sin flash en interiores)', 'Agua y algún snack para las 5 horas de recorrido'],
      en: ['Comfortable shoes', 'Appropriate clothing for places of worship', 'Camera (no flash indoors)', 'Water and snacks for the 5-hour route'],
    },
    bestMonths: ['marzo', 'abril', 'mayo', 'junio', 'septiembre', 'octubre', 'noviembre'],
  },
  {
    id: 'rte-005',
    slug: 'rincones-secretos-realejo',
    title: {
      es: 'Rincones Secretos del Realejo',
      en: 'Secret Corners of the Realejo',
    },
    description: {
      es: 'Descubre los rincones secretos del Realejo, el antiguo barrio judío de Granada. Patios mágicos, murales de El Niño de las Pinturas, plazas escondidas y la verdadera vida local lejos del turismo masivo.',
      en: 'The old Jewish quarter hides magical courtyards, hidden murals by El Niño de las Pinturas, and squares where time stopped. A route to get lost and find authentic Granada.',
    },
    category: 'cultural',
    difficulty: 'easy',
    duration: 150,
    distance: 2.5,
    timeOfDay: 'afternoon',
    neighborhoods: ['realejo'],
    highlights: [
      {
        title: { es: 'Calle de los Molinos', en: 'Calle de los Molinos' },
        description: {
          es: 'Una escalinata llena de flores y balcones que parece sacada de un cuento.',
          en: 'A staircase full of flowers and balconies that seems straight out of a fairy tale.',
        },
      },
      {
        title: { es: 'Plaza del Realejo', en: 'Realejo Square' },
        description: {
          es: 'La plaza más animada del barrio, con su icónica fuente y terrazas de estudiantes.',
          en: 'The liveliest square in the neighborhood, with its iconic fountain and student terraces.',
        },
      },
      {
        title: { es: 'Murales de El Niño de las Pinturas', en: 'El Niño de las Pinturas Murals' },
        description: {
          es: 'Arte urbano del artista granadino más internacional, integrado en la arquitectura del barrio.',
          en: 'Street art by Granada\'s most internationally renowned artist, integrated into the neighborhood\'s architecture.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Mirar arriba', en: 'Look up' },
        content: {
          es: 'Muchos rincones secretos están en azoteas y patios interiores.',
          en: 'Many secret corners are on rooftops and interior courtyards.',
        },
      },
      {
        title: { es: 'Hora dorada', en: 'Golden hour' },
        content: {
          es: 'El atardecer tiñe las fachadas encaladas de colores cálidos increíbles.',
          en: 'Sunset dyes the whitewashed facades in incredible warm colors.',
        },
      },
    ],
    tags: ['secretos', 'realejo', 'arte urbano', 'patios', 'fotografía'],
    featured: true,
  },
  {
    id: 'rte-006',
    slug: 'huellas-reyes-catolicos',
    title: {
      es: 'Huellas de los Reyes Católicos',
      en: 'Traces of the Catholic Monarchs',
    },
    description: {
      es: 'Ruta histórica por los lugares donde Isabel y Fernando vivieron sus últimos años. La Granada de 1492 al 1516, donde los monarcas que cambiaron el mundo dejaron su huella para siempre.',
      en: 'Historical route through the places where Isabel and Fernando lived their final years. The Granada of 1492–1516, where the monarchs who changed the world left their mark forever.',
    },
    category: 'cultural',
    difficulty: 'easy',
    duration: 180,
    distance: 3.0,
    timeOfDay: 'morning',
    neighborhoods: ['centro', 'alhambra'],
    highlights: [
      {
        title: { es: 'Hospital Real', en: 'Royal Hospital' },
        description: {
          es: 'La última gran obra de los Reyes Católicos en Granada, hoy sede de la Universidad.',
          en: 'The last great work of the Catholic Monarchs in Granada, today the University\'s main building.',
        },
      },
      {
        title: { es: 'Capilla Real', en: 'Royal Chapel' },
        description: {
          es: 'Donde reposan sus restos junto a Juana la Loca y Felipe el Hermoso. Un mausoleo incomparable.',
          en: 'Where their remains rest alongside Juana and Felipe. An incomparable mausoleum.',
        },
      },
      {
        title: { es: 'Corral del Carbón', en: 'Corral del Carbón' },
        description: {
          es: 'El alhóndiga nazarí que convirtieron en teatro y que es el monumento más antiguo del centro.',
          en: 'The Nasrid alhóndiga they turned into a theater, the oldest monument in the city center.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Contexto histórico', en: 'Historical context' },
        content: {
          es: 'Lee sobre la toma de Granada en 1492 antes de la ruta. Todo cobrará sentido.',
          en: 'Read about the fall of Granada in 1492 before the route. Everything will make sense.',
        },
      },
      {
        title: { es: 'Capilla Real', en: 'Royal Chapel' },
        content: {
          es: 'No te pierdas la sacristía-museo, que guarda joyas personales de la reina.',
          en: 'Don\'t miss the sacristy-museum, which holds the queen\'s personal jewels.',
        },
      },
    ],
    tags: ['historia', 'reyes católicos', 'renacimiento', 'patrimonio', 'cultura'],
    featured: false,
  },
  {
    id: 'rte-007',
    slug: 'ruta-flamenco-autentico',
    title: {
      es: 'Ruta del Flamenco Auténtico',
      en: 'Authentic Flamenco Route',
    },
    description: {
      es: 'De la Zambra del Sacromonte a las Peñas Flamencas del Albaicín. Los templos del cante jondo donde el arte se vive sin escenarios ni micros.',
      en: 'From the Zambra of Sacromonte to the Flamenco Clubs of Albaicín. The temples of deep song where art is lived without stages or microphones.',
    },
    category: 'cultural',
    difficulty: 'easy',
    duration: 240,
    distance: 3.5,
    timeOfDay: 'evening',
    neighborhoods: ['sacromonte', 'albaicin'],
    highlights: [
      {
        title: { es: 'Zambra María la Canastera', en: 'Zambra María la Canastera' },
        description: {
          es: 'Una cueva con más de 50 años de historia flamenca ininterrumpida.',
          en: 'A cave with more than 50 years of uninterrupted flamenco history.',
        },
      },
      {
        title: { es: 'Peña La Platería', en: 'La Platería Flamenco Club' },
        description: {
          es: 'La peña flamenca más antigua de España. Cultura viva desde 1949.',
          en: 'The oldest flamenco club in Spain. Living culture since 1949.',
        },
      },
      {
        title: { es: 'Ventas El Gallo', en: 'El Gallo Tavern' },
        description: {
          es: 'Espectáculo en cueva con cena incluida. El lugar que elige Camarón cuando visitaba Granada.',
          en: 'Cave show with dinner included. The place Camarón chose when visiting Granada.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Entradas', en: 'Tickets' },
        content: {
          es: 'Compra entradas con antelación. Los espectáculos suelen llenarse en temporada alta.',
          en: 'Buy tickets in advance. Shows usually sell out in high season.',
        },
      },
      {
        title: { es: 'En las peñas', en: 'In the clubs' },
        content: {
          es: 'No uses flash ni grabes vídeo. El respeto es parte del ritual.',
          en: 'Don\'t use flash or record video. Respect is part of the ritual.',
        },
      },
    ],
    tags: ['flamenco', 'cante', 'sacromonte', 'albaicín', 'cultura'],
    featured: true,
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
    category: 'cultural',
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
    category: 'naturaleza',
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
    category: 'naturaleza',
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
    category: 'artesania',
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
    category: 'artesania',
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
  },
];

