/**
 * Data processing helpers for SeasonalSection.
 * Converts raw Semana Santa JSON into a masonry-ready structure.
 */
import type { Locale } from '../../types';

// ── Raw JSON shapes ──────────────────────────────────────────
export interface PasoRaw {
  nombre: string;
  tipo: 'misterio' | 'cristo' | 'palio';
  descripcion?: string;
}

export interface HorarioRaw {
  salida?: string;
  salidaCasaHermandad?: string;
}

export interface CofradiaRaw {
  id: string;
  nombrePopular: string;
  nombreOficial: string;
  iglesiaSalida: string;
  barrio: string;
  pasos: PasoRaw[];
  horario?: HorarioRaw & Record<string, unknown>;
}

export interface DiaRaw {
  id: string;
  nombre: string;
  fecha: string;
  cofradias: CofradiaRaw[];
}

// ── Processed shapes ─────────────────────────────────────────
export type PasoTipo = 'Misterio' | 'Cristo' | 'Palio';

export interface ProcessedPaso {
  id: string;
  nombre: string;
  tipo: PasoTipo;
  hermandad: string;
  hora: string;
  iglesia: string;
  barrio: string;
  originalIndex: number;
}

export interface ColData {
  items: ProcessedPaso[];
  heights: number[];
}

export interface ProcessedDia {
  id: string;
  nombre: string;
  fecha: string;
  masonryData: ColData[];
}

// ── Type accent colors (mirrors CSS design tokens) ───────────
// CSS vars can't be used in inline styles at build time.
export const TYPE_COLORS: Record<PasoTipo, string> = {
  Misterio: '#e6c587', // --color-gold-text
  Palio:    '#c9a84c', // --color-gold
  Cristo:   '#e8622a', // --color-accent
};

export const PASO_IMAGES = [
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=85',
  'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=85',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=85',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85',
  'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900&q=85',
];

// ── Pure helpers ─────────────────────────────────────────────
export function normalizeTipo(tipo: PasoRaw['tipo']): PasoTipo {
  if (tipo === 'misterio') return 'Misterio';
  if (tipo === 'cristo') return 'Cristo';
  return 'Palio';
}

export function getTypeLabel(tipo: PasoTipo, locale: Locale): string {
  const labels: Record<PasoTipo, Record<Locale, string>> = {
    Misterio: { es: 'Misterio', en: 'Mystery' },
    Palio:    { es: 'Palio',    en: 'Palanquin' },
    Cristo:   { es: 'Cristo',   en: 'Christ' },
  };
  return labels[tipo][locale];
}

export function formatShortDate(dateStr: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-ES', {
    day: 'numeric',
    month: 'short',
  })
    .format(new Date(dateStr))
    .toUpperCase()
    .replace('.', '');
}

function getHeights(count: number, target: number): number[] {
  if (count === 0) return [];
  if (count === 1) return [target];
  if (count === 2) return [target * 0.58, target * 0.42];
  if (count === 3) return [target * 0.42, target * 0.33, target * 0.25];
  if (count === 4) return [target * 0.30, target * 0.20, target * 0.28, target * 0.22];
  if (count === 5) return [target * 0.25, target * 0.18, target * 0.22, target * 0.15, target * 0.20];
  return Array<number>(count).fill(target / count);
}

export function buildProcessedDias(dias: DiaRaw[]): ProcessedDia[] {
  return dias.map((dia) => {
    const allPasos: ProcessedPaso[] = [];

    dia.cofradias.forEach((cofradia) => {
      cofradia.pasos.forEach((paso, index) => {
        allPasos.push({
          id: `${cofradia.id}-${index}`,
          nombre: paso.nombre,
          tipo: normalizeTipo(paso.tipo),
          hermandad: cofradia.nombrePopular,
          hora: cofradia.horario?.salida ?? cofradia.horario?.salidaCasaHermandad ?? '18:00',
          iglesia: cofradia.iglesiaSalida,
          barrio: cofradia.barrio,
          originalIndex: allPasos.length,
        });
      });
    });

    const sorted = allPasos.sort((a, b) => {
      const [ah = 0, am = 0] = a.hora.split(':').map(Number);
      const [bh = 0, bm = 0] = b.hora.split(':').map(Number);
      return (ah * 60 + am) - (bh * 60 + bm);
    });

    const cols: ProcessedPaso[][] = [[], [], []];
    sorted.forEach((p, i) => {
      const col = cols[i % 3];
      if (col) col.push({ ...p, originalIndex: i });
    });

    const maxItems = Math.max(cols[0].length, cols[1].length, cols[2].length);
    let targetHeight = maxItems * 50;
    if (sorted.length === 1) targetHeight = 65;
    if (sorted.length === 2) targetHeight = 60;

    return {
      id: dia.id,
      nombre: dia.nombre,
      fecha: dia.fecha,
      masonryData: cols.map((col) => ({
        items: col,
        heights: getHeights(col.length, targetHeight),
      })),
    };
  });
}
