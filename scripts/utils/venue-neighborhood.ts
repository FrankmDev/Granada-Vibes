type Neighborhood =
  | 'albaicin'
  | 'sacromonte'
  | 'centro'
  | 'realejo'
  | 'alhambra'
  | 'cartuja'
  | 'zaidin'
  | 'otro';

const VENUE_MAP: Record<string, Neighborhood> = {
  // Centro
  'planta baja': 'centro',
  'sala riff': 'centro',
  'lemon rock': 'centro',
  'el tren': 'centro',
  'teatro isabel la católica': 'centro',
  'teatro isabel la catolica': 'centro',
  'centro josé guerrero': 'centro',
  'centro jose guerrero': 'centro',
  'corral del carbón': 'centro',
  'corral del carbon': 'centro',
  'catedral de granada': 'centro',
  'palacio de la madraza': 'centro',
  'la madraza': 'centro',
  'capilla real': 'centro',
  'aliatar': 'centro',
  'teatro alhambra': 'centro',
  'jj taberna': 'centro',
  'taberna j&j': 'centro',
  'sala el tren': 'centro',
  'sala vimaambi': 'centro',
  'sala custom': 'centro',
  'teatro caja granada': 'centro',

  // Alhambra
  'auditorio manuel de falla': 'alhambra',
  'palacio de carlos v': 'alhambra',
  'generalife': 'alhambra',
  'museo de la alhambra': 'alhambra',
  'carmen de los mártires': 'alhambra',
  'carmen de los martires': 'alhambra',
  'fundación rodríguez-acosta': 'alhambra',
  'teatro del generalife': 'alhambra',

  // Realejo
  'casa del arte flamenco': 'realejo',
  'campo del príncipe': 'realejo',
  'campo del principe': 'realejo',
  'palacio de los condes de gabia': 'realejo',

  // Albaicín
  'mirador de san nicolás': 'albaicin',
  'mirador de san nicolas': 'albaicin',
  'palacio de los olvidados': 'albaicin',
  'dar ziryab': 'albaicin',
  'carmen de la victoria': 'albaicin',
  'palacio de dar al-horra': 'albaicin',

  // Sacromonte
  'museo cuevas del sacromonte': 'sacromonte',
  'cuevas del sacromonte': 'sacromonte',
  'abadía del sacromonte': 'sacromonte',
  'venta el gallo': 'sacromonte',
  'cueva de la rocío': 'sacromonte',

  // Cartuja
  'monasterio de la cartuja': 'cartuja',
  'campus de cartuja': 'cartuja',
  'pts granada': 'cartuja',

  // Zaidín
  'palacio de congresos': 'zaidin',
  'palacio de congresos de granada': 'zaidin',
  'plaza de toros': 'zaidin',
  'estadio nuevo los cármenes': 'zaidin',
  'parque de las ciencias': 'zaidin',
  'museo cajagranada': 'zaidin',
  'cajagranada fundación': 'zaidin',
  'sala industrial copera': 'zaidin',
  'industrial copera': 'zaidin',
};

const ADDRESS_PATTERNS: Array<[RegExp, Neighborhood]> = [
  [/\b(albaic[ií]n|albayz[ií]n)\b/i, 'albaicin'],
  [/\bsacromonte\b/i, 'sacromonte'],
  [/\brealejo\b/i, 'realejo'],
  [/\bcartuja\b/i, 'cartuja'],
  [/\b(alhambra|generalife)\b/i, 'alhambra'],
  [/\b(zaid[ií]n|camino de ronda|palacio de.*congreso)\b/i, 'zaidin'],
];

/**
 * Detect neighborhood from venue name and optional address.
 */
export function detectNeighborhood(
  venue: string,
  address?: string
): Neighborhood {
  const venueNorm = venue.toLowerCase().trim();

  // Exact match on venue name
  if (VENUE_MAP[venueNorm]) return VENUE_MAP[venueNorm];

  // Partial match — check if any known venue is contained in the string
  for (const [key, hood] of Object.entries(VENUE_MAP)) {
    if (venueNorm.includes(key)) return hood;
  }

  // Address keyword matching
  const combined = `${venue} ${address ?? ''}`;
  for (const [pattern, hood] of ADDRESS_PATTERNS) {
    if (pattern.test(combined)) return hood;
  }

  return 'centro'; // Default for Granada city
}
