export interface EditorialMediaBlock {
  es: string;
  en: string;
}

const mediaFigure = (src: string, alt: string, caption: string): string => `
<figure class="editorial-media" data-editorial-media>
  <img src="${src}" alt="${alt}" loading="lazy" />
  <figcaption>${caption}</figcaption>
</figure>
`;

const sourceNote = (label: string, links: string[]): string => `
<aside class="editorial-source-note" data-editorial-media>
  <strong>${label}</strong>
  <ul>
    ${links.map((link) => `<li>${link}</li>`).join('')}
  </ul>
</aside>
`;

export const editorialMediaByBlogSlug: Record<string, EditorialMediaBlock> = {
  'carocas-granada': {
    es:
      mediaFigure(
        '/carocas3.webp',
        'Plaza Bib-Rambla de Granada',
        'Bib-Rambla sigue siendo el escenario esencial de las Carocas durante el Corpus de Granada.'
      ) +
      sourceNote('Fuentes contrastadas para esta guia', [
        '<a href="https://turismo.granada.org/es/carocas" target="_blank" rel="noopener">Turismo Granada: que son las Carocas y seleccion municipal de veinte piezas</a>',
        '<a href="https://www.granada.org/inet/wagenda.nsf/wwtod/E9AE00AE72536482C1258DFF003DAB72/%24file/PROGRAMA%20CORPUS%202026%20WEB.pdf" target="_blank" rel="noopener">Programa oficial del Corpus 2026: exposicion de Carocas en Plaza Bib-Rambla</a>',
        '<a href="https://clm-granada.com/concurso-de-quintillas-y-carocas/" target="_blank" rel="noopener">Centro de Lenguas Modernas UGR: definicion tecnica de la quintilla y continuidad cultural de la tradicion</a>',
      ]),
    en:
      mediaFigure(
        '/carocas3.webp',
        'Plaza Bib-Rambla in Granada',
        'Bib-Rambla remains the essential setting for the Carocas during Granada Corpus week.'
      ) +
      sourceNote('Sources checked for this guide', [
        '<a href="https://turismo.granada.org/es/carocas" target="_blank" rel="noopener">Turismo Granada: what the Carocas are and the municipal selection of twenty works</a>',
        '<a href="https://www.granada.org/inet/wagenda.nsf/wwtod/E9AE00AE72536482C1258DFF003DAB72/%24file/PROGRAMA%20CORPUS%202026%20WEB.pdf" target="_blank" rel="noopener">Official Corpus 2026 programme: Carocas exhibition in Plaza Bib-Rambla</a>',
        '<a href="https://clm-granada.com/concurso-de-quintillas-y-carocas/" target="_blank" rel="noopener">University of Granada CLM: technical definition of the quintilla and the modern educational adaptation of the tradition</a>',
      ]),
  },
  'entradas-alhambra-agotadas': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/5/59/GRANADA_-_La_Alhambra_vista_desde_el_mirador_de_San_Nicolas_-_panoramio.jpg',
        'La Alhambra vista desde el mirador de San Nicolas',
        'La Alhambra desde San Nicolas. Imagen real de Wikimedia Commons.'
      ) +
      sourceNote('Datos contrastados para esta guia', [
        '<a href="https://www.alhambra-patronato.es/visitar/tipos-de-visitas" target="_blank" rel="noopener">Patronato de la Alhambra: tipos de visita y precios publicos vigentes</a>',
        '<a href="https://tickets.alhambra-patronato.es/" target="_blank" rel="noopener">Canal oficial de venta de entradas de la Alhambra</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/5/59/GRANADA_-_La_Alhambra_vista_desde_el_mirador_de_San_Nicolas_-_panoramio.jpg',
        'The Alhambra seen from San Nicolas viewpoint',
        'The Alhambra from San Nicolas. Real image from Wikimedia Commons.'
      ) +
      sourceNote('Sources checked for this guide', [
        '<a href="https://www.alhambra-patronato.es/visitar/tipos-de-visitas" target="_blank" rel="noopener">Alhambra Board: current visit types and public prices</a>',
        '<a href="https://tickets.alhambra-patronato.es/" target="_blank" rel="noopener">Official Alhambra ticketing channel</a>',
      ]),
  },
  'granada-fin-de-semana-48-horas': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/c/c6/Carrera_del_Darro_de_Granada.jpg',
        'Carrera del Darro en Granada',
        'Carrera del Darro, uno de los ejes mas utiles para un primer fin de semana en Granada.'
      ) +
      sourceNote('Base practica revisada', [
        '<a href="https://www.movilidadgranada.com/bus_linea.php?linea=C32" target="_blank" rel="noopener">Movilidad Granada: linea C32 Alhambra - Albaicin</a>',
        '<a href="https://www.alhambra-patronato.es/visita/monumentos-andalusies-visita-general" target="_blank" rel="noopener">Patronato: monumentos andalusies incluidos en la visita general</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/c/c6/Carrera_del_Darro_de_Granada.jpg',
        'Carrera del Darro in Granada',
        'Carrera del Darro, one of the most useful axes for a first weekend in Granada.'
      ) +
      sourceNote('Practical base checked', [
        '<a href="https://www.movilidadgranada.com/bus_linea.php?idioma=en&linea=C32" target="_blank" rel="noopener">Movilidad Granada: C32 Alhambra - Albaicin bus line</a>',
        '<a href="https://www.alhambra-patronato.es/visita/monumentos-andalusies-visita-general" target="_blank" rel="noopener">Alhambra Board: Andalusian monuments included in the general visit</a>',
      ]),
  },
  'miradores-granada-guia-completa': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/5/59/GRANADA_-_La_Alhambra_vista_desde_el_mirador_de_San_Nicolas_-_panoramio.jpg',
        'Vista de la Alhambra desde San Nicolas',
        'San Nicolas concentra la postal clasica; San Cristobal, La Lona y Silla del Moro completan mejor la lectura de la ciudad.'
      ) +
      sourceNote('Miradores verificados', [
        '<a href="https://turgranada.es/pois/mirador-de-san-nicolas" target="_blank" rel="noopener">TurGranada: Mirador de San Nicolas</a>',
        '<a href="https://www.movilidadgranada.com/bus_linea.php?linea=C32" target="_blank" rel="noopener">Movilidad Granada: lineas que conectan Alhambra, Albaicin y centro</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/5/59/GRANADA_-_La_Alhambra_vista_desde_el_mirador_de_San_Nicolas_-_panoramio.jpg',
        'Alhambra view from San Nicolas',
        'San Nicolas gives the classic postcard; San Cristobal, La Lona and Silla del Moro complete the city reading.'
      ) +
      sourceNote('Viewpoints checked', [
        '<a href="https://turgranada.es/en/pois/san-nicolas-viewpoint" target="_blank" rel="noopener">TurGranada: San Nicolas Viewpoint</a>',
        '<a href="https://www.movilidadgranada.com/bus_linea.php?idioma=en&linea=C32" target="_blank" rel="noopener">Movilidad Granada: lines connecting Alhambra, Albaicin and the centre</a>',
      ]),
  },
  'tapas-gratis-granada': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/a/a0/Granada%2C_La_Fontana%2C_tapas.jpg',
        'Tapas servidas en Granada',
        'La tapa incluida funciona mejor por zonas que por una lista cerrada de bares: Navas, Realejo, Plaza Nueva, Elvira y La Chana.'
      ) +
      sourceNote('Criterio editorial', [
        'Se recomiendan zonas y barras con rotacion alta para evitar prometer disponibilidad fija.',
        '<a href="https://turgranada.es/" target="_blank" rel="noopener">TurGranada: informacion turistica oficial de la provincia</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/a/a0/Granada%2C_La_Fontana%2C_tapas.jpg',
        'Tapas served in Granada',
        'The included tapa works better by area than as a fixed list of bars: Navas, Realejo, Plaza Nueva, Elvira and La Chana.'
      ) +
      sourceNote('Editorial criterion', [
        'We recommend high-turnover areas and bars instead of promising fixed availability.',
        '<a href="https://turgranada.es/en/" target="_blank" rel="noopener">TurGranada: official provincial tourism information</a>',
      ]),
  },
  'flamenco-granada-guia-autentica': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/6/68/Aa_interpretation_centre_in_sacromonte_-_etnographical_and_environmontal_museum_showing_life_and_customs_in_a_group_of_caves_1.jpg',
        'Cuevas del Sacromonte en Granada',
        'El Sacromonte se entiende mejor como barrio, mirador y cultura de cueva antes que como simple espectaculo.'
      ) +
      sourceNote('Contexto revisado', [
        '<a href="https://sacromontegranada.com/" target="_blank" rel="noopener">Museo Cuevas del Sacromonte: historia, cuevas y entorno</a>',
        '<a href="https://turgranada.es/" target="_blank" rel="noopener">TurGranada: informacion turistica oficial</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/6/68/Aa_interpretation_centre_in_sacromonte_-_etnographical_and_environmontal_museum_showing_life_and_customs_in_a_group_of_caves_1.jpg',
        'Sacromonte caves in Granada',
        'Sacromonte is best understood as a neighbourhood, viewpoint and cave culture before it is reduced to a show.'
      ) +
      sourceNote('Context checked', [
        '<a href="https://sacromontegranada.com/" target="_blank" rel="noopener">Sacromonte Caves Museum: history, caves and setting</a>',
        '<a href="https://turgranada.es/en/" target="_blank" rel="noopener">TurGranada: official tourism information</a>',
      ]),
  },
  'granada-en-un-dia-itinerario': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/0/0c/Cathedral_%26_Capilla_Real_Granada_Spain.jpg',
        'Catedral y Capilla Real de Granada',
        'La Catedral, la Capilla Real y el eje Plaza Nueva-Darro son el nucleo mas eficiente cuando solo tienes un dia.'
      ) +
      sourceNote('Plan contrastado', [
        '<a href="https://www.alhambra-patronato.es/visitar/tipos-de-visitas" target="_blank" rel="noopener">Patronato de la Alhambra: tipos de visitas</a>',
        '<a href="https://www.movilidadgranada.com/" target="_blank" rel="noopener">Movilidad Granada: estado e itinerarios de transporte urbano</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/0/0c/Cathedral_%26_Capilla_Real_Granada_Spain.jpg',
        'Granada Cathedral and Royal Chapel',
        'The Cathedral, Royal Chapel and Plaza Nueva-Darro axis are the most efficient core when you only have one day.'
      ) +
      sourceNote('Plan checked', [
        '<a href="https://www.alhambra-patronato.es/visitar/tipos-de-visitas" target="_blank" rel="noopener">Alhambra Board: visit types</a>',
        '<a href="https://www.movilidadgranada.com/" target="_blank" rel="noopener">Movilidad Granada: urban transport status and routes</a>',
      ]),
  },
  'sierra-nevada-desde-granada-guia-excursion': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/5/5d/Sierra_Nevada%2C_Granada_04.JPG',
        'Sierra Nevada vista desde Granada',
        'Sierra Nevada cambia mucho por temporada: nieve, senderos altos, calor en cotas bajas y transporte condicionan el plan.'
      ) +
      sourceNote('Antes de subir', [
        '<a href="https://sierranevada.es/" target="_blank" rel="noopener">Sierra Nevada: informacion oficial de estacion, actividades y estado</a>',
        '<a href="https://www.alsa.com/" target="_blank" rel="noopener">ALSA: horarios de autobus Granada - Sierra Nevada</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/5/5d/Sierra_Nevada%2C_Granada_04.JPG',
        'Sierra Nevada seen from Granada',
        'Sierra Nevada changes sharply by season: snow, high trails, low-altitude heat and transport all shape the plan.'
      ) +
      sourceNote('Before going up', [
        '<a href="https://sierranevada.es/en/" target="_blank" rel="noopener">Sierra Nevada: official resort, activities and status information</a>',
        '<a href="https://www.alsa.com/en/web/bus/home" target="_blank" rel="noopener">ALSA: Granada - Sierra Nevada bus schedules</a>',
      ]),
  },
  'granada-gratis-que-hacer-sin-gastar': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/d/d8/Corral_del_Carb%C3%B3n%2CGranada..JPG',
        'Patio del Corral del Carbon en Granada',
        'Corral del Carbon, Bañuelo, Dar al-Horra, Horno de Oro y Maristan hacen que Granada barata no sea una version menor.'
      ) +
      sourceNote('Monumentos revisados', [
        '<a href="https://www.alhambra-patronato.es/visita/monumentos-andalusies-visita-general" target="_blank" rel="noopener">Patronato: Monumentos Andalusies</a>',
        '<a href="https://www.alhambra-patronato.es/en/discover/andalusian-monuments/corral-del-carbon" target="_blank" rel="noopener">Patronato: Corral del Carbon</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/d/d8/Corral_del_Carb%C3%B3n%2CGranada..JPG',
        'Corral del Carbon courtyard in Granada',
        'Corral del Carbon, Banuelo, Dar al-Horra, Horno de Oro and Maristan prove budget Granada is not a lesser version.'
      ) +
      sourceNote('Monuments checked', [
        '<a href="https://www.alhambra-patronato.es/visita/monumentos-andalusies-visita-general" target="_blank" rel="noopener">Alhambra Board: Andalusian Monuments</a>',
        '<a href="https://www.alhambra-patronato.es/en/discover/andalusian-monuments/corral-del-carbon" target="_blank" rel="noopener">Alhambra Board: Corral del Carbon</a>',
      ]),
  },
  'antes-de-llegar-granada': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/c/c1/A_view_of_Granada_from_the_Alhambra.jpg',
        'Vista general de Granada desde la Alhambra',
        'Reservas, transporte y barrio base importan mas en Granada que en ciudades planas: la orografia decide el viaje.'
      ) +
      sourceNote('Reservas clave', [
        '<a href="https://tickets.alhambra-patronato.es/" target="_blank" rel="noopener">Entradas oficiales de la Alhambra</a>',
        '<a href="https://www.movilidadgranada.com/" target="_blank" rel="noopener">Movilidad Granada: transporte urbano y avisos</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/c/c1/A_view_of_Granada_from_the_Alhambra.jpg',
        'General view of Granada from the Alhambra',
        'Bookings, transport and base neighbourhood matter more in Granada than in flat cities: the terrain shapes the trip.'
      ) +
      sourceNote('Key bookings', [
        '<a href="https://tickets.alhambra-patronato.es/en/" target="_blank" rel="noopener">Official Alhambra tickets</a>',
        '<a href="https://www.movilidadgranada.com/" target="_blank" rel="noopener">Movilidad Granada: urban transport and alerts</a>',
      ]),
  },
  'albaicin-a-pie': {
    es:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Aa_a_street_of_albaicin_small_street_2016_white_in_granada_in_spain.jpg',
        'Calle del Albaicin en Granada',
        'El Albaicin se disfruta con una ruta corta y bien secuenciada: mirador, aljibe, plaza, callejon y bajada al Darro.'
      ) +
      sourceNote('Ruta revisada', [
        '<a href="https://turgranada.es/en/pois/san-nicolas-viewpoint" target="_blank" rel="noopener">TurGranada: San Nicolas Viewpoint</a>',
        '<a href="https://www.movilidadgranada.com/bus_linea.php?linea=C32" target="_blank" rel="noopener">Movilidad Granada: conexiones Albaicin - Alhambra - centro</a>',
      ]),
    en:
      mediaFigure(
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Aa_a_street_of_albaicin_small_street_2016_white_in_granada_in_spain.jpg',
        'Albaicin street in Granada',
        'The Albaicin works best as a short, well-sequenced route: viewpoint, cistern, square, alley and descent to the Darro.'
      ) +
      sourceNote('Route checked', [
        '<a href="https://turgranada.es/en/pois/san-nicolas-viewpoint" target="_blank" rel="noopener">TurGranada: San Nicolas Viewpoint</a>',
        '<a href="https://www.movilidadgranada.com/bus_linea.php?idioma=en&linea=C32" target="_blank" rel="noopener">Movilidad Granada: Albaicin - Alhambra - centre connections</a>',
      ]),
  },
};
