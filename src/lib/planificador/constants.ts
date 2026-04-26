import type {
  CompaniaPlan,
  MovilidadPlan,
  PlannerCategory,
  PresupuestoPlan,
  RitmoPlan,
  TiempoPlan,
} from './types.js';

export const CENTRO_COORDS = {
  lat: 37.1763,
  lng: -3.5986,
} as const;

export const TRANSITION_MINUTES = 15;
export const WALKING_MAX_DISTANCE_KM = 3;
export const DAY_START_TIME = '09:00';

export const MOMENT_ORDER = {
  mañana: 1,
  tarde: 2,
  cualquiera: 2,
  atardecer: 3,
  noche: 4,
} as const;

export const MOMENT_START_TIME = {
  mañana: '09:00',
  cualquiera: '10:00',
  tarde: '14:00',
  atardecer: '18:00',
  noche: '21:00',
} as const;

export const TIME_BUDGETS: Record<TiempoPlan, { total: number; days: number }> = {
  '2h': { total: 120, days: 1 },
  'medio-dia': { total: 300, days: 1 },
  'dia-completo': { total: 600, days: 1 },
  'fin-de-semana': { total: 1200, days: 2 },
};

export const VALID_CATEGORIES: readonly PlannerCategory[] = [
  'historia',
  'gastronomia',
  'naturaleza',
  'fotografia',
  'flamenco',
  'arte',
  'compras',
  'secreto',
  'monumentos',
] as const;

export const VALID_COMPANIES: readonly CompaniaPlan[] = [
  'solo',
  'pareja',
  'amigos',
  'familia',
  'grupo',
] as const;

export const VALID_BUDGETS: readonly PresupuestoPlan[] = [
  'minimo',
  'ajustado',
  'moderado',
  'holgado',
  'sin-limite',
] as const;

export const VALID_PACES: readonly RitmoPlan[] = [
  'tranquilo',
  'equilibrado',
  'intenso',
] as const;

export const VALID_MOBILITY: readonly MovilidadPlan[] = [
  'pie',
  'publico',
  'coche',
  'sin-restriccion',
] as const;
