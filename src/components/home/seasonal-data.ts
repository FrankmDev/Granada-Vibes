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
  imagen?: string | null;
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
  imagenIglesia?: string | null;
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
  cofradiaId: string;
  nombre: string;
  tipo: PasoTipo;
  hermandad: string;
  hora: string;
  iglesia: string;
  barrio: string;
  originalIndex: number;
  imagen: string | null;
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

// Fallback images (Wikimedia Commons, Semana Santa de Granada) for pasos without a specific image
export const PASO_IMAGES = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Cortejo_de_palmas_de_la_Borriquilla_en_Granada.jpg/960px-Cortejo_de_palmas_de_la_Borriquilla_en_Granada.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Gitanos_de_Granada.jpg/960px-Gitanos_de_Granada.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Hermandad_del_Cristo_de_San_Agust%C3%ADn.jpg/960px-Hermandad_del_Cristo_de_San_Agust%C3%ADn.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/SANT%C3%8DSIMO_CRISTO_DE_LA_REDENCI%C3%93N_EN_SU_SAGRADO_DESCENDIMIENTO.jpg/960px-SANT%C3%8DSIMO_CRISTO_DE_LA_REDENCI%C3%93N_EN_SU_SAGRADO_DESCENDIMIENTO.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lanzada_Granada.JPG/960px-Lanzada_Granada.JPG',
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
          cofradiaId: cofradia.id,
          nombre: paso.nombre,
          tipo: normalizeTipo(paso.tipo),
          hermandad: cofradia.nombrePopular,
          hora: cofradia.horario?.salida ?? cofradia.horario?.salidaCasaHermandad ?? '18:00',
          iglesia: cofradia.iglesiaSalida,
          barrio: cofradia.barrio,
          originalIndex: allPasos.length,
          imagen: paso.imagen ?? null,
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
