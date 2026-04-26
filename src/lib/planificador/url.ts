import { VALID_BUDGETS, VALID_CATEGORIES, VALID_COMPANIES, VALID_MOBILITY, VALID_PACES } from './constants.js';
import type {
  CompaniaPlan,
  MovilidadPlan,
  PlanParams,
  PlannerCategory,
  PresupuestoPlan,
  RitmoPlan,
  TiempoPlan,
} from './types.js';
import { getPlanningDateInMadrid } from './utils.js';

const TIME_TO_QUERY: Record<TiempoPlan, string> = {
  '2h': '2h',
  'medio-dia': 'medio-dia',
  'dia-completo': 'dia',
  'fin-de-semana': 'finde',
};

const QUERY_TO_TIME: Record<string, TiempoPlan> = {
  '2h': '2h',
  'medio-dia': 'medio-dia',
  dia: 'dia-completo',
  finde: 'fin-de-semana',
};

const BUDGET_TO_QUERY: Record<PresupuestoPlan, string> = {
  minimo: 'minimo',
  ajustado: 'ajustado',
  moderado: 'moderado',
  holgado: 'holgado',
  'sin-limite': 'sinlimite',
};

const QUERY_TO_BUDGET: Record<string, PresupuestoPlan> = {
  minimo: 'minimo',
  ajustado: 'ajustado',
  moderado: 'moderado',
  holgado: 'holgado',
  sinlimite: 'sin-limite',
};

const MOBILITY_TO_QUERY: Record<MovilidadPlan, string> = {
  pie: 'pie',
  publico: 'publico',
  coche: 'coche',
  'sin-restriccion': 'libre',
};

const QUERY_TO_MOBILITY: Record<string, MovilidadPlan> = {
  pie: 'pie',
  publico: 'publico',
  coche: 'coche',
  libre: 'sin-restriccion',
};

function isValidCategory(value: string): value is PlannerCategory {
  return VALID_CATEGORIES.includes(value as PlannerCategory);
}

export function encodePlanParams(params: PlanParams): string {
  const query = new URLSearchParams();
  query.set('t', TIME_TO_QUERY[params.tiempo]);
  query.set('c', params.compania);
  query.set('i', params.categorias.join(','));
  query.set('p', BUDGET_TO_QUERY[params.presupuesto]);
  query.set('r', params.ritmo);
  query.set('m', MOBILITY_TO_QUERY[params.movilidad]);
  query.set('d', params.fecha);
  return query.toString();
}

export function decodePlanParams(search: string): PlanParams | null {
  const query = new URLSearchParams(search);
  const tiempo = QUERY_TO_TIME[query.get('t') ?? ''];
  const compania = query.get('c') as CompaniaPlan | null;
  const presupuesto = QUERY_TO_BUDGET[query.get('p') ?? ''];
  const ritmo = query.get('r') as RitmoPlan | null;
  const movilidad = QUERY_TO_MOBILITY[query.get('m') ?? ''];
  const categorias = (query.get('i') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(isValidCategory);
  const fecha = query.get('d') ?? getPlanningDateInMadrid();

  if (!tiempo || !presupuesto || !movilidad) return null;
  if (!compania || !VALID_COMPANIES.includes(compania)) return null;
  if (!ritmo || !VALID_PACES.includes(ritmo)) return null;
  if (!categorias.length) return null;

  return {
    tiempo,
    categorias,
    compania,
    presupuesto,
    ritmo,
    movilidad,
    notas: '',
    fecha,
  };
}

export function buildDefaultPlanParams(): PlanParams {
  return {
    tiempo: 'medio-dia',
    categorias: ['historia'],
    compania: 'solo',
    presupuesto: 'moderado',
    ritmo: 'equilibrado',
    movilidad: 'pie',
    notas: '',
    fecha: getPlanningDateInMadrid(),
  };
}
