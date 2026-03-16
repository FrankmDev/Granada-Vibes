import type { Route } from '@types';

export const routes: Route[] = [
  {
    id: 'rte-001',
    slug: 'atardecer-miradores-albaicin',
    title: {
      es: 'Atardecer en los Miradores del Albaicín',
      en: 'Sunset at the Albaicín Viewpoints',
    },
    description: {
      es: 'Recorrido por los tres miradores más espectaculares del Albaicín para contemplar la Alhambra al atardecer. San Nicolás, San Cristóbal y el secreto de Santa Isabel la Real.',
      en: 'Route through the three most spectacular viewpoints of the Albaicín to contemplate the Alhambra at sunset. San Nicolás, San Cristóbal, and the secret of Santa Isabel la Real.',
    },
    category: 'viewpoint',
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
          es: 'Más tranquilo, con vistas panorámicas de toda Granada.',
          en: 'Quieter, with panoramic views of all Granada.',
        },
      },
      {
        title: { es: 'Carmen de Santa Isabel', en: 'Carmen of Santa Isabel' },
        description: {
          es: 'Un jardín secreto con vistas privadas y encanto único.',
          en: 'A secret garden with private views and unique charm.',
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
      en: 'The Albaicín is Granada\'s oldest neighborhood, declared a UNESCO World Heritage Site, and its viewpoints offer the most iconic views of the Alhambra. This route takes you along cobbled streets, between whitewashed houses and secret gardens, to discover the three most spectacular panoramic points. From the bustling San Nicolás viewpoint to the quiet San Cristóbal, passing through the hidden Carmen de Santa Isabel, each stop offers a unique perspective of the Nasrid monument.',
    },
    whatToBring: {
      es: ['Calzado cómodo para caminar por empedrado', 'Cámara o móvil con batería cargada', 'Agua para el recorrido', 'Chaqueta ligera para después del atardecer', 'Gafas de sol para antes de la puesta'],
      en: ['Comfortable shoes for walking on cobblestones', 'Camera or phone with charged battery', 'Water for the route', 'Light jacket for after sunset', 'Sunglasses for before sunset'],
    },
    bestMonths: ['marzo', 'abril', 'mayo', 'septiembre', 'octubre', 'noviembre'],
  },
  {
    id: 'rte-002',
    slug: 'ruta-tapeo-tradicional',
    title: {
      es: 'Ruta de Tapeo Tradicional',
      en: 'Traditional Tapas Route',
    },
    description: {
      es: 'Los mejores bares de tapas del centro histórico donde aún sirven gratis con la bebida. Una ruta por la gastronomía más auténtica de Granada.',
      en: 'The best tapas bars in the historic center where they still serve free with your drink. A route through Granada\'s most authentic gastronomy.',
    },
    category: 'tapas',
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
          es: 'Institución granadina famosa por sus migas y boquerones.',
          en: 'Granada institution famous for its migas and anchovies.',
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
    id: 'rte-003',
    slug: 'senderismo-rio-darro',
    title: {
      es: 'Senderismo por el Río Darro',
      en: 'Hiking along the Darro River',
    },
    description: {
      es: 'Ruta de dificultad media que sigue el curso del Darro desde el centro hasta los Cármenes de la Muralla. Naturaleza, historia y vistas panorámicas.',
      en: 'Moderate difficulty route that follows the course of the Darro from the center to the Cármenes de la Muralla. Nature, history, and panoramic views.',
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
          en: '16th-century bridge with spectacular views of the Mauror Ravine.',
        },
      },
      {
        title: { es: 'Fuente del Avellano', en: 'Avellano Fountain' },
        description: {
          es: 'Manantial histórico donde nace la leyenda de Agustina de Aragón.',
          en: 'Historic spring where the legend of Agustina de Aragón was born.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Calzado', en: 'Footwear' },
        content: {
          es: 'Imprescindible calzado de senderismo. Hay tramos con piedra suelta.',
          en: 'Hiking footwear is essential. There are sections with loose stones.',
        },
      },
      {
        title: { es: 'Época recomendada', en: 'Recommended season' },
        content: {
          es: 'Primavera u otoño. Evita el verano por el calor.',
          en: 'Spring or fall. Avoid summer due to heat.',
        },
      },
    ],
    tags: ['senderismo', 'naturaleza', 'río', 'historia', 'vistas'],
    featured: false,
  },
  {
    id: 'rte-004',
    slug: 'granada-monumental',
    title: {
      es: 'Granada Monumental',
      en: 'Monumental Granada',
    },
    description: {
      es: 'Recorrido por los monumentos más emblemáticos del Renacimiento español. Catedral, Capilla Real, Monasterio de San Jerónimo y más joyas arquitectónicas.',
      en: 'Route through the most emblematic monuments of the Spanish Renaissance. Cathedral, Royal Chapel, Monastery of San Jerónimo, and more architectural jewels.',
    },
    category: 'monuments',
    difficulty: 'easy',
    duration: 300,
    distance: 4.0,
    timeOfDay: 'morning',
    neighborhoods: ['centro'],
    highlights: [
      {
        title: { es: 'Catedral de Granada', en: 'Granada Cathedral' },
        description: {
          es: 'Primera iglesia renacentista de España. Obra de Diego de Siloé.',
          en: 'First Renaissance church in Spain. Work by Diego de Siloé.',
        },
      },
      {
        title: { es: 'Capilla Real', en: 'Royal Chapel' },
        description: {
          es: 'Mausoleo de los Reyes Católicos. Joya del gótico isabelino.',
          en: 'Mausoleum of the Catholic Monarchs. Jewel of Isabelline Gothic.',
        },
      },
      {
        title: { es: 'Monasterio de San Jerónimo', en: 'Monastery of San Jerónimo' },
        description: {
          es: 'El claustro más hermoso de España según muchos historiadores.',
          en: 'The most beautiful cloister in Spain according to many historians.',
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
        title: { es: 'Catedral', en: 'Cathedral' },
        content: {
          es: 'Sube a la torre para vistas panorámicas de la ciudad.',
          en: 'Climb the tower for panoramic views of the city.',
        },
      },
    ],
    tags: ['monumentos', 'historia', 'renacimiento', 'arquitectura', 'cultura'],
    featured: true,
    longDescription: {
      es: 'Granada es una de las ciudades con mayor concentración de monumentos renacentistas de España, fruto de su importancia histórica tras la Reconquista. Esta ruta te lleva a través de los siglos XVI y XVII, cuando la ciudad se transformó bajo el reinado de Carlos I y Felipe II. La Catedral, con su impresionante fachada y cúpula, marca el inicio de la arquitectura renacentista en España. La Capilla Real guarda los restos de los Reyes Católicos, artífices de la unificación de España. El Monasterio de San Jerónimo, joya poco concurrida, alberga el claustro más bello del país.',
      en: 'Granada is one of the cities with the highest concentration of Renaissance monuments in Spain, a result of its historical importance after the Reconquest. This route takes you through the 16th and 17th centuries, when the city was transformed under the reign of Charles I and Philip II. The Cathedral, with its impressive façade and dome, marks the beginning of Renaissance architecture in Spain. The Royal Chapel holds the remains of the Catholic Monarchs, architects of Spanish unification. The Monastery of San Jerónimo, a little-visited jewel, houses the most beautiful cloister in the country.',
    },
    whatToBring: {
      es: ['Calzado cómodo para caminar por el centro', 'Ropa apropiada para visitar lugares de culto', 'Cámara (sin flash en interiores)', 'Guía o audioguía para entender la historia', 'Agua y algún snack para las 5 horas de recorrido'],
      en: ['Comfortable shoes for walking through the center', 'Appropriate clothing for visiting places of worship', 'Camera (no flash indoors)', 'Guide or audio guide to understand the history', 'Water and snacks for the 5-hour route'],
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
      es: 'El antiguo barrio judío esconde patios mágicos, murales ocultos y plazas donde el tiempo se detuvo. Una ruta para perderse y encontrar la Granada auténtica.',
      en: 'The old Jewish quarter hides magical courtyards, hidden murals, and squares where time stopped. A route to get lost and find authentic Granada.',
    },
    category: 'secrets',
    difficulty: 'easy',
    duration: 150,
    distance: 2.5,
    timeOfDay: 'afternoon',
    neighborhoods: ['realejo'],
    highlights: [
      {
        title: { es: 'Calle de los Molinos', en: 'Calle de los Molinos' },
        description: {
          es: 'Una escalinata llena de flores que parece sacada de un cuento.',
          en: 'A staircase full of flowers that seems straight out of a fairy tale.',
        },
      },
      {
        title: { es: 'Plaza del Realejo', en: 'Realejo Square' },
        description: {
          es: 'La plaza más animada del barrio, con su icónica fuente de las ranas.',
          en: 'The liveliest square in the neighborhood, with its iconic frog fountain.',
        },
      },
      {
        title: { es: 'Grafitis de El Niño', en: 'El Niño Graffiti' },
        description: {
          es: 'Obras de arte urbano que transforman fachadas en lienzos.',
          en: 'Urban art works that transform facades into canvases.',
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
          es: 'El atardecer tiñe las fachadas de colores increíbles.',
          en: 'Sunset dyes the facades incredible colors.',
        },
      },
    ],
    tags: ['secretos', 'realejo', 'arte urbano', 'patios', 'fotografía'],
    featured: true,
  },
  {
    id: 'rte-006',
    slug: 'ruta-fotografia-sacromonte',
    title: {
      es: 'Ruta de Fotografía en el Sacromonte',
      en: 'Photography Route in Sacromonte',
    },
    description: {
      es: 'Los mejores spots fotográficos del barrio de las cuevas. Contraluces, texturas de tierra blanca, flamenco puro y vistas únicas de la Alhambra.',
      en: 'The best photographic spots in the cave neighborhood. Backlights, white earth textures, pure flamenco, and unique views of the Alhambra.',
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
          es: 'Calle de tierra con cuevas a ambos lados. Textura única para fotos.',
          en: 'Dirt street with caves on both sides. Unique texture for photos.',
        },
      },
      {
        title: { es: 'Museo Cuevas del Sacromonte', en: 'Sacromonte Caves Museum' },
        description: {
          es: 'Cuevas rehabilitadas que muestran la vida tradicional del barrio.',
          en: 'Rehabilitated caves showing the traditional life of the neighborhood.',
        },
      },
      {
        title: { es: 'La Cerra', en: 'La Cerra' },
        description: {
          es: 'El punto más alto con vistas 360 de Granada y Sierra Nevada.',
          en: 'The highest point with 360 views of Granada and Sierra Nevada.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Equipo', en: 'Equipment' },
        content: {
          es: 'Lleva objetivo angular para las cuevas y teleobjetivo para la Alhambra.',
          en: 'Bring a wide-angle lens for the caves and a telephoto for the Alhambra.',
        },
      },
      {
        title: { es: 'Respeto', en: 'Respect' },
        content: {
          es: 'Es un barrio habitado. Pide permiso antes de fotografiar cuevas privadas.',
          en: 'It is an inhabited neighborhood. Ask permission before photographing private caves.',
        },
      },
    ],
    tags: ['fotografía', 'sacromonte', 'cuevas', 'paisaje', 'texturas'],
    featured: false,
  },
  {
    id: 'rte-007',
    slug: 'granada-isabel-la-catolica',
    title: {
      es: 'Huellas de Isabel la Católica',
      en: 'Traces of Isabella the Catholic',
    },
    description: {
      es: 'Ruta histórica por los lugares donde la Reina vivió sus últimos años. La Granada de 1500, donde murió la mujer que cambió la historia de España.',
      en: 'Historical route through the places where the Queen lived her last years. The Granada of 1500, where the woman who changed the history of Spain died.',
    },
    category: 'history',
    difficulty: 'easy',
    duration: 180,
    distance: 3.0,
    timeOfDay: 'morning',
    neighborhoods: ['centro', 'alhambra'],
    highlights: [
      {
        title: { es: 'Convento de la Isabella', en: 'Convent of La Isabella' },
        description: {
          es: 'Fundado por la propia reina. Aún conserva objetos de su época.',
          en: 'Founded by the queen herself. Still preserves objects from her time.',
        },
      },
      {
        title: { es: 'Hospital Real', en: 'Royal Hospital' },
        description: {
          es: 'La última gran obra de los Reyes Católicos en Granada.',
          en: 'The last great work of the Catholic Monarchs in Granada.',
        },
      },
      {
        title: { es: 'Capilla Real', en: 'Royal Chapel' },
        description: {
          es: 'Donde reposan sus restos junto a Fernando. Un mausoleo incomparable.',
          en: 'Where her remains rest alongside Fernando. An incomparable mausoleum.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Contexto histórico', en: 'Historical context' },
        content: {
          es: 'Lee sobre la Granada de 1492 antes de la ruta. Todo cobrará sentido.',
          en: 'Read about Granada in 1492 before the route. Everything will make sense.',
        },
      },
      {
        title: { es: 'Capilla Real', en: 'Royal Chapel' },
        content: {
          es: 'Visita guiada obligatoria para entender la importancia del lugar.',
          en: 'Mandatory guided visit to understand the importance of the place.',
        },
      },
    ],
    tags: ['historia', 'reyes católicos', 'renacimiento', 'patrimonio', 'cultura'],
    featured: false,
  },
  {
    id: 'rte-008',
    slug: 'ruta-flamenco-autentico',
    title: {
      es: 'Ruta del Flamenco Auténtico',
      en: 'Authentic Flamenco Route',
    },
    description: {
      es: 'De la Zambra del Sacromonte a las Peñas Flamencas del Albaicín. Los templos del cante jondo donde el arte se vive sin escenarios ni micros.',
      en: 'From the Zambra of Sacromonte to the Flamenco Clubs of Albaicín. The temples of deep song where art is lived without stages or microphones.',
    },
    category: 'flamenco',
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
          es: 'Espectáculo en cueva con cena incluida. Turístico pero auténtico.',
          en: 'Cave show with dinner included. Touristy but authentic.',
        },
      },
    ],
    tips: [
      {
        title: { es: 'Puntos de venta', en: 'Ticket offices' },
        content: {
          es: 'Compra entradas con antelación. Los espectáculos suelen llenarse.',
          en: 'Buy tickets in advance. Shows usually sell out.',
        },
      },
      {
        title: { es: 'Vestimenta', en: 'Dress code' },
        content: {
          es: 'Cómodo y respetuoso. En las peñas, no uses flash ni graves vídeo.',
          en: 'Comfortable and respectful. In the clubs, don\'t use flash or record video.',
        },
      },
    ],
    tags: ['flamenco', 'cante', 'sacromonte', 'albaicín', 'cultura'],
    featured: true,
  },
];

export function getAllRoutes(): Route[] {
  return routes;
}

export function getFeaturedRoutes(): Route[] {
  return routes.filter((r) => r.featured);
}

export function getRoutesByCategory(category: Route['category']): Route[] {
  return routes.filter((r) => r.category === category);
}

export function getRoutesByNeighborhood(
  neighborhood: Route['neighborhoods'][number]
): Route[] {
  return routes.filter((r) => r.neighborhoods.includes(neighborhood));
}

export function getRouteBySlug(slug: string): Route | undefined {
  return routes.find((r) => r.slug === slug);
}
