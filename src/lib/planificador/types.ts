import type { Lugar, LugarCategoria } from '@/data/lugares.js';
import type { Locale } from '@types';

export type TiempoPlan = '2h' | 'medio-dia' | 'dia-completo' | 'fin-de-semana';
export type CompaniaPlan = 'solo' | 'pareja' | 'amigos' | 'familia' | 'grupo';
export type PresupuestoPlan = 'minimo' | 'ajustado' | 'moderado' | 'holgado' | 'sin-limite';
export type RitmoPlan = 'tranquilo' | 'equilibrado' | 'intenso';
export type MovilidadPlan = 'pie' | 'publico' | 'coche' | 'sin-restriccion';
export type PlannerCategory = LugarCategoria;

export interface PlanParams {
  tiempo: TiempoPlan;
  categorias: PlannerCategory[];
  compania: CompaniaPlan;
  presupuesto: PresupuestoPlan;
  ritmo: RitmoPlan;
  movilidad: MovilidadPlan;
  notas: string;
  fecha: string;
}

export interface ScoreBreakdown {
  categoria: number;
  compania: number;
  presupuesto: number;
  ritmo: number;
  total: number;
  coincidencias_categoria: number;
}

export interface RankedLugar {
  lugar: Lugar;
  score: ScoreBreakdown;
  distancia_centro_km: number;
}

export interface Parada {
  orden: number;
  hora_inicio: string;
  hora_fin: string;
  lugar: Lugar;
  nota_transicion: string;
  puntuacion: number;
}

export interface DiaItinerario {
  dia: number;
  titulo_dia: string;
  paradas: Parada[];
}

export interface ItineraryMeta {
  fecha_plan: string;
  lugares_filtrados: number;
  lugares_seleccionados: number;
  lugares_descartados_por_horario: number;
  minutos_objetivo: number;
  minutos_programados: number;
  referencia: string;
}

export interface Itinerario {
  titulo: string;
  subtitulo: string;
  resumen: string;
  dias: DiaItinerario[];
  coste_estimado: string;
  duracion_total: string;
  nota_final: string;
  params_url: string;
  meta: ItineraryMeta;
}

export interface DayPlanBuildResult {
  dias: DiaItinerario[];
  scheduledMinutes: number;
  droppedBySchedule: RankedLugar[];
}

export interface PlannerGenerationOptions {
  locale?: Locale;
}
