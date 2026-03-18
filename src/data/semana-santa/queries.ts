import type {
  Paso,
  SemanaSantaData,
  HolyWeekDayData,
  Cofradia,
  PasoDetail,
  HolyWeekDay,
  Neighborhood,
} from '@types';
import semanaSantaRaw from './pasos.json';

const semanaSantaData = semanaSantaRaw as SemanaSantaData;

// ————————————————————————————————————————
// Internal helpers
// ————————————————————————————————————————

function normalizeBarrio(barrio: string): Neighborhood {
  const mapping: Record<string, Neighborhood> = {
    'Centro': 'centro',
    'Albaicín': 'albaicin',
    'Sacromonte': 'sacromonte',
    'Realejo': 'realejo',
    'Alhambra': 'alhambra',
    'Zaidín': 'zaidin',
    'Zaidin': 'zaidin',
    'Cartuja': 'cartuja',
  };
  return mapping[barrio] ?? 'otro';
}

function createSlug(name: string, dayId: string, cofradiaId: string): string {
  const base = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${dayId}-${cofradiaId}-${base}`.slice(0, 80);
}

const FEATURED_COFRADIAS: Record<HolyWeekDay, string[]> = {
  'domingo-ramos': ['borriquilla', 'maravillas'],
  'lunes-santo': ['huerto', 'trabajo-luz'],
  'martes-santo': ['gran-poder-esperanza', 'via-crucis'],
  'miercoles-santo': ['consuelo-gitanos', 'nazareno'],
  'jueves-santo': ['estrella', 'aurora', 'silencio'],
  'viernes-santo': ['chias', 'cristo-favores'],
  'sabado-santo': ['santa-maria-alhambra'],
  'domingo-resurreccion': ['resurreccion'],
};

function isFeatured(dayId: HolyWeekDay, cofradiaId: string): boolean {
  return FEATURED_COFRADIAS[dayId]?.includes(cofradiaId) ?? false;
}

// Memoized paso list — built once from JSON, reused across all queries
let _cachedPasos: Paso[] | undefined;

function buildPasos(): Paso[] {
  const pasos: Paso[] = [];

  for (const day of semanaSantaData.dias) {
    for (const cofradia of day.cofradias) {
      for (const paso of cofradia.pasos) {
        const departureTime =
          cofradia.horario.salida ??
          cofradia.horario.salidaCasaHermandad ??
          '00:00';

        pasos.push({
          id: `${cofradia.id}-${paso.nombre.toLowerCase().replace(/\s+/g, '-')}`,
          slug: createSlug(paso.nombre, day.id, cofradia.id),
          title: { es: paso.nombre, en: paso.nombre },
          brotherhood: { es: cofradia.nombrePopular, en: cofradia.nombrePopular },
          day: day.id as HolyWeekDay,
          departureTime,
          departureChurch: cofradia.iglesiaSalida,
          neighborhood: normalizeBarrio(cofradia.barrio),
          featured: isFeatured(day.id as HolyWeekDay, cofradia.id),
          tipo: paso.tipo,
          description: { es: paso.descripcion, en: paso.descripcion },
        });
      }
    }
  }

  return pasos;
}

// ————————————————————————————————————————
// Public query helpers
// ————————————————————————————————————————

export function getSemanaSantaData(): SemanaSantaData {
  return semanaSantaData;
}

export function getMeta(): SemanaSantaData['meta'] {
  return semanaSantaData.meta;
}

export function getAllDays(): HolyWeekDayData[] {
  return semanaSantaData.dias;
}

export function getAllPasos(): Paso[] {
  if (!_cachedPasos) {
    _cachedPasos = buildPasos();
  }
  return _cachedPasos;
}

export function getPasosByDay(dayId: HolyWeekDay): Paso[] {
  return getAllPasos().filter((p) => p.day === dayId);
}

export function getFeaturedPasos(): Paso[] {
  return getAllPasos().filter((p) => p.featured);
}

export function getPasoBySlug(slug: string): Paso | undefined {
  return getAllPasos().find((p) => p.slug === slug);
}

export function getCofradiaById(
  dayId: HolyWeekDay,
  cofradiaId: string,
): Cofradia | undefined {
  const day = semanaSantaData.dias.find((d) => d.id === dayId);
  return day?.cofradias.find((c) => c.id === cofradiaId);
}

export function getAllCofradiasByDay(): Record<HolyWeekDay, Cofradia[]> {
  const result: Record<string, Cofradia[]> = {};
  for (const day of semanaSantaData.dias) {
    result[day.id] = day.cofradias;
  }
  return result as Record<HolyWeekDay, Cofradia[]>;
}
