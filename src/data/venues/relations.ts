/**
 * Relaciones manuales para salas y recintos del directorio.
 * Las claves son slugs de salas tal como se generan en `src/data/directories.ts`.
 */

export interface VenueRelations {
  relatedGuides?: string[];
  relatedEvents?: string[];
  relatedRoutes?: string[];
  relatedVenues?: string[];
  zone?: string;
  tags?: string[];
}

const venueRelations: Record<string, VenueRelations> = {
  'palacio-de-congresos-granada': {
    zone: 'zaidin',
    tags: ['conciertos', 'teatro', 'musica', 'gran formato'],
    relatedGuides: [
      'antes-de-llegar-granada',
      'granada-en-un-dia-itinerario',
      'granada-fin-de-semana-48-horas',
    ],
    relatedRoutes: ['granada-monumental', 'ruta-corpus-granada-2026'],
    relatedEvents: [
      'tarzan-el-musical-by-theatre-properties',
      'malu-quince-tour',
      'el-ultimo-suspiro-de-granada',
    ],
    relatedVenues: ['plaza-de-toros-granada', 'ool-ya-koo'],
  },
  'plaza-de-toros-granada': {
    zone: 'zaidin',
    tags: ['conciertos', 'musica', 'gran formato'],
    relatedGuides: [
      'granada-en-un-dia-itinerario',
      'antes-de-llegar-granada',
      'granada-fin-de-semana-48-horas',
    ],
    relatedRoutes: ['granada-monumental'],
    relatedEvents: [
      'pablo-alboran',
      '1001-musicas-caixabank-sting',
      'la-plazuela',
    ],
    relatedVenues: ['palacio-de-congresos-granada'],
  },
  'ool-ya-koo': {
    zone: 'centro',
    tags: ['conciertos', 'jazz', 'musica en directo'],
    relatedGuides: [
      'tapas-gratis-granada',
      'granada-fin-de-semana-48-horas',
      'granada-gratis-que-hacer-sin-gastar',
    ],
    relatedRoutes: ['ruta-tapeo-tradicional', 'granada-monumental'],
    relatedEvents: [
      'liane-carroll',
      'baile-swing-con-carlos-ligero-cuarteto',
    ],
    relatedVenues: ['palacio-de-congresos-granada'],
  },
  'hotel-monasterio-granada-adults-only': {
    zone: 'centro',
    tags: ['gastronomia', 'eventos', 'rooftop'],
    relatedGuides: [
      'tapas-gratis-granada',
      'granada-fin-de-semana-48-horas',
    ],
    relatedRoutes: ['ruta-tapeo-tradicional'],
    relatedEvents: [
      'gastrocata-luxury-granada',
      'gastrocata-luxury-granada-2',
    ],
  },
  'hotel-palacio-de-santa-paula': {
    zone: 'centro',
    tags: ['conciertos', 'candlelight', 'musica'],
    relatedGuides: [
      'granada-fin-de-semana-48-horas',
      'tapas-gratis-granada',
    ],
    relatedRoutes: ['ruta-tapeo-tradicional', 'granada-monumental'],
    relatedEvents: ['candlelight', 'candlelight-2'],
  },
};

export function getVenueRelations(slug: string): VenueRelations {
  return venueRelations[slug] ?? {};
}
