/**
 * Venue coordinates for map display.
 * Keyed by normalized venue name (lowercase, trimmed).
 */

export interface VenueCoords {
  lat: number;
  lng: number;
}

const VENUE_COORDS: Record<string, VenueCoords> = {
  // ── Centro ──
  'planta baja': { lat: 37.1753, lng: -3.5986 },
  'aliatar': { lat: 37.1741, lng: -3.5988 },
  'el tren': { lat: 37.1762, lng: -3.5975 },
  'sala el tren': { lat: 37.1762, lng: -3.5975 },
  'jj taberna': { lat: 37.1760, lng: -3.5960 },
  'taberna j&j': { lat: 37.1760, lng: -3.5960 },
  'lemon rock': { lat: 37.1748, lng: -3.5982 },
  'teatro isabel la católica': { lat: 37.1743, lng: -3.5980 },
  'teatro isabel la catolica': { lat: 37.1743, lng: -3.5980 },
  'centro josé guerrero': { lat: 37.1761, lng: -3.5985 },
  'centro jose guerrero': { lat: 37.1761, lng: -3.5985 },
  'corral del carbón': { lat: 37.1748, lng: -3.5979 },
  'corral del carbon': { lat: 37.1748, lng: -3.5979 },
  'catedral de granada': { lat: 37.1763, lng: -3.5987 },
  'capilla real': { lat: 37.1764, lng: -3.5982 },
  'palacio de la madraza': { lat: 37.1759, lng: -3.5984 },
  'la madraza': { lat: 37.1759, lng: -3.5984 },
  'teatro alhambra': { lat: 37.1736, lng: -3.5976 },
  'sala vimaambi': { lat: 37.1750, lng: -3.5970 },
  'sala custom': { lat: 37.1745, lng: -3.5965 },
  'sala riff': { lat: 37.1570, lng: -3.6170 },
  'sala riff. armilla': { lat: 37.1570, lng: -3.6170 },
  'teatro caja granada': { lat: 37.1698, lng: -3.6113 },
  'pl. de bib-rambla, 6': { lat: 37.1755, lng: -3.5990 },

  // ── Alhambra ──
  'auditorio manuel de falla': { lat: 37.1728, lng: -3.5888 },
  'palacio de carlos v': { lat: 37.1769, lng: -3.5892 },
  'generalife': { lat: 37.1787, lng: -3.5854 },
  'museo de la alhambra': { lat: 37.1769, lng: -3.5892 },
  'carmen de los mártires': { lat: 37.1731, lng: -3.5883 },
  'carmen de los martires': { lat: 37.1731, lng: -3.5883 },
  'fundación rodríguez-acosta': { lat: 37.1730, lng: -3.5891 },
  'teatro del generalife': { lat: 37.1787, lng: -3.5854 },

  // ── Realejo ──
  'casa del arte flamenco': { lat: 37.1726, lng: -3.5955 },
  'campo del príncipe': { lat: 37.1726, lng: -3.5935 },
  'campo del principe': { lat: 37.1726, lng: -3.5935 },
  'palacio de los condes de gabia': { lat: 37.1735, lng: -3.5950 },

  // ── Albaicín ──
  'mirador de san nicolás': { lat: 37.1812, lng: -3.5928 },
  'mirador de san nicolas': { lat: 37.1812, lng: -3.5928 },
  'palacio de los olvidados': { lat: 37.1790, lng: -3.5935 },
  'dar ziryab': { lat: 37.1805, lng: -3.5930 },
  'carmen de la victoria': { lat: 37.1798, lng: -3.5910 },
  'palacio de dar al-horra': { lat: 37.1815, lng: -3.5945 },

  // ── Sacromonte ──
  'museo cuevas del sacromonte': { lat: 37.1825, lng: -3.5850 },
  'cuevas del sacromonte': { lat: 37.1825, lng: -3.5850 },
  'abadía del sacromonte': { lat: 37.1843, lng: -3.5795 },
  'venta el gallo': { lat: 37.1820, lng: -3.5868 },
  'cueva de la rocío': { lat: 37.1818, lng: -3.5870 },

  // ── Cartuja ──
  'monasterio de la cartuja': { lat: 37.1920, lng: -3.5990 },
  'campus de cartuja': { lat: 37.1905, lng: -3.6020 },
  'pts granada': { lat: 37.1950, lng: -3.6100 },

  // ── Zaidín ──
  'palacio de congresos': { lat: 37.1590, lng: -3.5930 },
  'palacio de congresos de granada': { lat: 37.1590, lng: -3.5930 },
  'plaza de toros': { lat: 37.1650, lng: -3.6010 },
  'estadio nuevo los cármenes': { lat: 37.1530, lng: -3.5950 },
  'parque de las ciencias': { lat: 37.1620, lng: -3.6020 },
  'museo cajagranada': { lat: 37.1620, lng: -3.6030 },
  'cajagranada fundación': { lat: 37.1620, lng: -3.6030 },
  'sala industrial copera': { lat: 37.1490, lng: -3.6060 },
  'industrial copera': { lat: 37.1490, lng: -3.6060 },

  // ── Hotels & other venues ──
  'hotel monasterio granada adults only': { lat: 37.1760, lng: -3.5940 },
  'gran hotel luna de granada': { lat: 37.1650, lng: -3.6050 },
  'international school of management': { lat: 37.1730, lng: -3.6010 },

  // ── Sierra Nevada ──
  'sierra nevada estación de esquí': { lat: 37.0960, lng: -3.3960 },
  'sierra nevada': { lat: 37.0960, lng: -3.3960 },
};

// Fallback coordinates per neighborhood (center of each barrio)
const NEIGHBORHOOD_FALLBACK: Record<string, VenueCoords> = {
  'centro': { lat: 37.1755, lng: -3.5985 },
  'albaicin': { lat: 37.1810, lng: -3.5930 },
  'sacromonte': { lat: 37.1825, lng: -3.5860 },
  'realejo': { lat: 37.1730, lng: -3.5945 },
  'alhambra': { lat: 37.1770, lng: -3.5890 },
  'cartuja': { lat: 37.1920, lng: -3.6000 },
  'zaidin': { lat: 37.1600, lng: -3.5970 },
  'otro': { lat: 37.1760, lng: -3.5980 },
};

/**
 * Get coordinates for a venue. Falls back to neighborhood center if venue unknown.
 */
export function getVenueCoordinates(
  venue: string,
  neighborhood?: string
): VenueCoords | null {
  const norm = venue.toLowerCase().trim();

  // Exact match
  if (VENUE_COORDS[norm]) return VENUE_COORDS[norm];

  // Partial match
  for (const [key, coords] of Object.entries(VENUE_COORDS)) {
    if (norm.includes(key) || key.includes(norm)) return coords;
  }

  // Neighborhood fallback
  if (neighborhood && NEIGHBORHOOD_FALLBACK[neighborhood]) {
    return NEIGHBORHOOD_FALLBACK[neighborhood];
  }

  return null;
}
