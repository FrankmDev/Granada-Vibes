import { lugares } from '@/data/lugares.js';
import type { Lugar } from '@/data/lugares.js';
import type { Locale } from '@types';
import {
  CENTRO_COORDS,
  DAY_START_TIME,
  MOMENT_ORDER,
  MOMENT_START_TIME,
  TIME_BUDGETS,
  TRANSITION_MINUTES,
  WALKING_MAX_DISTANCE_KM,
} from './constants.js';
import {
  generateDayTitle,
  generateFinalNote,
  generateSubtitle,
  generateSummary,
  generateTitle,
} from './editorial.js';
import type {
  DayPlanBuildResult,
  DiaItinerario,
  Itinerario,
  Parada,
  PlanParams,
  PlannerCategory,
  PlannerGenerationOptions,
  RankedLugar,
  ScoreBreakdown,
} from './types.js';
import {
  clamp,
  formatCostRange,
  formatDuration,
  getWeekdayInMadrid,
  haversineKm,
  normalizeText,
  stableReferenceCode,
  toTimeString,
  toMinutes,
} from './utils.js';
import { encodePlanParams } from './url.js';

const CATEGORY_TYPE_AFFINITY: Record<PlannerCategory, readonly Lugar['tipo'][]> = {
  historia: ['monumento', 'museo', 'experiencia', 'barrio'],
  gastronomia: ['bar', 'restaurante', 'tienda', 'experiencia'],
  naturaleza: ['parque', 'mirador'],
  fotografia: ['mirador', 'parque', 'monumento', 'barrio'],
  flamenco: ['experiencia', 'museo', 'bar'],
  arte: ['monumento', 'museo', 'experiencia', 'tienda'],
  compras: ['tienda', 'experiencia'],
  secreto: ['mirador', 'parque', 'barrio', 'tienda'],
  monumentos: ['monumento', 'museo'],
} as const;

interface NotePreferences {
  avoidTouristCrowds: boolean;
  needsAccessibleStops: boolean;
  wantsViews: boolean;
  wantsTapas: boolean;
  wantsQuiet: boolean;
  wantsTerrace: boolean;
  wantsReservations: boolean;
  wantsKidsFriendly: boolean;
  wantsNightPlan: boolean;
}

function includesAny(text: string, terms: readonly string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function getNotePreferences(params: PlanParams): NotePreferences {
  const notes = normalizeText(params.notas);

  return {
    avoidTouristCrowds: includesAny(notes, ['evitar turistas', 'poco turistico', 'no turistico', 'sin turistas', 'masificado', 'masificacion', 'tranquilo']),
    needsAccessibleStops: includesAny(notes, ['movilidad reducida', 'silla de ruedas', 'accesible', 'sin escaleras', 'carrito']),
    wantsViews: includesAny(notes, ['vistas', 'mirador', 'atardecer', 'puesta de sol', 'foto', 'fotografia']),
    wantsTapas: includesAny(notes, ['tapa', 'tapas', 'tapear', 'bar', 'bares', 'racion']),
    wantsQuiet: includesAny(notes, ['tranquilo', 'silencioso', 'sin ruido', 'poca gente', 'intimo', 'local']),
    wantsTerrace: includesAny(notes, ['terraza', 'patio', 'aire libre', 'exterior']),
    wantsReservations: includesAny(notes, ['reserva', 'reservar', 'especial', 'gastronomico', 'menu degustacion']),
    wantsKidsFriendly: includesAny(notes, ['ninos', 'niños', 'familia', 'carrito']),
    wantsNightPlan: includesAny(notes, ['noche', 'copas', 'flamenco', 'cena', 'zambra']),
  };
}

function isClosedOnPlanningDate(lugar: Lugar, fecha: string): boolean {
  if (!lugar.horario.cerrado) return false;
  return normalizeText(lugar.horario.cerrado) === getWeekdayInMadrid(fecha);
}

function getDistanceToCenterKm(lugar: Lugar): number {
  return haversineKm(CENTRO_COORDS.lat, CENTRO_COORDS.lng, lugar.ubicacion.lat, lugar.ubicacion.lng);
}

function applyHardFilters(params: PlanParams, allPlaces: Lugar[]): Lugar[] {
  const notePreferences = getNotePreferences(params);

  return allPlaces.filter((lugar) => {
    if (params.movilidad === 'pie' && getDistanceToCenterKm(lugar) > WALKING_MAX_DISTANCE_KM) {
      return false;
    }

    if ((params.compania === 'familia' || notePreferences.wantsKidsFriendly) && !lugar.apto_para.familias) {
      return false;
    }

    if (notePreferences.needsAccessibleStops && !lugar.apto_para.movilidad_reducida) {
      return false;
    }

    if (params.presupuesto === 'minimo' && lugar.coste.minimo !== 0) {
      return false;
    }

    if (params.presupuesto === 'ajustado' && lugar.coste.maximo > 30) {
      return false;
    }

    if (isClosedOnPlanningDate(lugar, params.fecha)) {
      return false;
    }

    return true;
  });
}

function scorePlace(lugar: Lugar, params: PlanParams): ScoreBreakdown {
  const notePreferences = getNotePreferences(params);
  const categoryMatches = params.categorias.filter((category) => lugar.categorias.includes(category)).length;
  let total = 0;

  const categoryScore = clamp(categoryMatches * 4 + (lugar.nivel_turistico <= 2 ? 2 : 0), 0, 8);
  total = categoryScore;

  let companyScore = 0;
  switch (params.compania) {
    case 'solo':
      if (lugar.apto_para.solos) companyScore += 4;
      if (lugar.categorias.includes('fotografia') || lugar.categorias.includes('naturaleza')) companyScore += 2;
      break;
    case 'pareja':
      if (lugar.apto_para.parejas) companyScore += 4;
      if (lugar.horario.mejor_momento === 'atardecer' || lugar.horario.mejor_momento === 'noche') companyScore += 2;
      break;
    case 'familia':
      if (lugar.apto_para.familias) companyScore += 4;
      if (lugar.coste.minimo === 0) companyScore += 2;
      break;
    case 'amigos':
      if (lugar.apto_para.amigos) companyScore += 4;
      if (lugar.tipo === 'bar' || lugar.tipo === 'experiencia') companyScore += 2;
      break;
    case 'grupo':
      if (lugar.apto_para.amigos) companyScore += 4;
      break;
  }
  total = clamp(total + companyScore, 0, 12);

  let budgetScore = 0;
  switch (params.presupuesto) {
    case 'minimo':
      if (lugar.presupuesto_nivel === 1) budgetScore += 4;
      break;
    case 'ajustado':
      if (lugar.presupuesto_nivel <= 2) budgetScore += 4;
      break;
    case 'moderado':
      budgetScore += 2;
      break;
    case 'holgado':
      if (lugar.presupuesto_nivel >= 3) budgetScore += 4;
      break;
    case 'sin-limite':
      if (lugar.presupuesto_nivel === 4) {
        budgetScore += 4;
      }
      break;
  }
  total = clamp(total + budgetScore, 0, 16);

  let paceScore = 0;
  switch (params.ritmo) {
    case 'tranquilo':
      if (lugar.duracion_min >= 60) paceScore += 4;
      if (lugar.duracion_min < 30) paceScore -= 2;
      break;
    case 'equilibrado':
      paceScore += 2;
      break;
    case 'intenso':
      if (lugar.duracion_min <= 45) paceScore += 4;
      if (lugar.duracion_min > 90) paceScore -= 2;
      break;
  }
  total = clamp(total + paceScore, 0, 20);

  let noteScore = 0;
  const normalizedTags = lugar.tags.map((tag) => normalizeText(tag));
  const hasTagLike = (needle: string) => normalizedTags.some((tag) => tag.includes(needle));

  if (notePreferences.avoidTouristCrowds) {
    if (lugar.nivel_turistico <= 2) noteScore += 4;
    if (lugar.nivel_turistico >= 5) noteScore -= 6;
    if (lugar.categorias.includes('secreto') || hasTagLike('local') || hasTagLike('poco')) noteScore += 3;
  }

  if (notePreferences.wantsViews) {
    if (lugar.tipo === 'mirador' || lugar.categorias.includes('fotografia')) noteScore += 5;
    if (hasTagLike('vista') || hasTagLike('mirador') || hasTagLike('atardecer')) noteScore += 3;
  }

  if (notePreferences.wantsTapas) {
    if (lugar.tipo === 'bar') noteScore += 5;
    if (hasTagLike('tapa') || hasTagLike('barra')) noteScore += 3;
  }

  if (notePreferences.wantsQuiet) {
    if (hasTagLike('intimo') || hasTagLike('tranquilo') || hasTagLike('secreto')) noteScore += 4;
    if (lugar.nivel_turistico >= 4) noteScore -= 3;
  }

  if (notePreferences.wantsTerrace && (hasTagLike('terraza') || hasTagLike('patio') || hasTagLike('aire'))) {
    noteScore += 4;
  }

  if (notePreferences.wantsReservations && hasTagLike('reserva')) {
    noteScore += 4;
  }

  if (notePreferences.wantsReservations && lugar.tipo === 'restaurante') {
    noteScore += 6;
  }

  if (notePreferences.wantsNightPlan && (lugar.horario.mejor_momento === 'noche' || lugar.horario.mejor_momento === 'atardecer')) {
    noteScore += 3;
  }

  if (notePreferences.wantsNightPlan && (lugar.tipo === 'bar' || lugar.tipo === 'restaurante' || lugar.tipo === 'experiencia')) {
    noteScore += 3;
  }

  total = clamp(total + noteScore, 0, 28);

  return {
    categoria: categoryScore,
    compania: companyScore,
    presupuesto: budgetScore,
    ritmo: paceScore,
    total,
    coincidencias_categoria: categoryMatches,
  };
}

function rankPlaces(params: PlanParams, filteredPlaces: Lugar[]): RankedLugar[] {
  const getEditorialAffinity = (rankedPlace: RankedLugar): number => {
    return params.categorias.reduce((total, category) => {
      return total + (CATEGORY_TYPE_AFFINITY[category]?.includes(rankedPlace.lugar.tipo) ? 1 : 0);
    }, 0);
  };

  const getEditorialBonus = (rankedPlace: RankedLugar): number => {
    let bonus = 0;

    if (!params.categorias.includes('compras') && rankedPlace.lugar.tipo === 'tienda') {
      bonus -= 2;
    }

    if ((params.categorias.includes('historia') || params.categorias.includes('monumentos')) && rankedPlace.lugar.tipo === 'monumento') {
      bonus += 4;
    }

    if (params.categorias.includes('historia') && rankedPlace.lugar.tipo === 'museo') {
      bonus += 3;
    }

    if (params.categorias.includes('gastronomia')) {
      if (rankedPlace.lugar.tipo === 'bar' || rankedPlace.lugar.tipo === 'restaurante') {
        bonus += 4;
      } else if (rankedPlace.lugar.tipo === 'tienda' || rankedPlace.lugar.tipo === 'barrio') {
        bonus += 1;
      }
    }

    if (params.categorias.includes('fotografia') && rankedPlace.lugar.tipo === 'mirador') {
      bonus += 4;
    }

    if (params.categorias.includes('naturaleza') && rankedPlace.lugar.tipo === 'parque') {
      bonus += 4;
    }

    if (params.categorias.includes('flamenco') && rankedPlace.lugar.tipo === 'experiencia') {
      bonus += 4;
    }

    if (
      (params.categorias.includes('historia') || params.categorias.includes('monumentos')) &&
      rankedPlace.lugar.tags.some((tag) => tag === 'obligatorio' || tag === 'patrimonio-unesco')
    ) {
      bonus += 2;
    }

    return bonus;
  };

  return filteredPlaces
    .map((lugar) => ({
      lugar,
      score: scorePlace(lugar, params),
      distancia_centro_km: getDistanceToCenterKm(lugar),
    }))
    .sort((left, right) => {
      const leftPriority = left.score.total + getEditorialAffinity(left) * 3 + getEditorialBonus(left);
      const rightPriority = right.score.total + getEditorialAffinity(right) * 3 + getEditorialBonus(right);
      if (rightPriority !== leftPriority) {
        return rightPriority - leftPriority;
      }
      if (right.score.total !== left.score.total) return right.score.total - left.score.total;
      if (right.score.coincidencias_categoria !== left.score.coincidencias_categoria) {
        return right.score.coincidencias_categoria - left.score.coincidencias_categoria;
      }
      const leftAffinity = getEditorialAffinity(left);
      const rightAffinity = getEditorialAffinity(right);
      if (rightAffinity !== leftAffinity) {
        return rightAffinity - leftAffinity;
      }
      if (left.lugar.nivel_turistico !== right.lugar.nivel_turistico) {
        return left.lugar.nivel_turistico - right.lugar.nivel_turistico;
      }
      if (params.movilidad === 'pie' && left.distancia_centro_km !== right.distancia_centro_km) {
        return left.distancia_centro_km - right.distancia_centro_km;
      }
      if (left.lugar.duracion_min !== right.lugar.duracion_min) {
        return left.lugar.duracion_min - right.lugar.duracion_min;
      }
      return left.lugar.nombre.localeCompare(right.lugar.nombre, 'es');
    });
}

function isRelevantCandidate(rankedPlace: RankedLugar, params: PlanParams): boolean {
  const notePreferences = getNotePreferences(params);
  const normalizedTags = rankedPlace.lugar.tags.map((tag) => normalizeText(tag));

  if (notePreferences.wantsTapas) {
    return (
      rankedPlace.lugar.tipo === 'bar' ||
      rankedPlace.lugar.tipo === 'restaurante' ||
      normalizedTags.some((tag) => tag.includes('tapa') || tag.includes('tapeo'))
    );
  }

  const hasDirectCategoryMatch = params.categorias.some((category) => rankedPlace.lugar.categorias.includes(category));
  const hasTypeAffinity = params.categorias.some((category) => CATEGORY_TYPE_AFFINITY[category]?.includes(rankedPlace.lugar.tipo));

  if (hasDirectCategoryMatch || hasTypeAffinity) return true;
  if (notePreferences.wantsViews && rankedPlace.lugar.tipo === 'mirador') return true;
  if (notePreferences.wantsReservations && rankedPlace.lugar.tipo === 'restaurante') return true;
  if (notePreferences.wantsTerrace && normalizedTags.some((tag) => tag.includes('terraza') || tag.includes('patio'))) {
    return true;
  }

  return false;
}

function selectPlacesByTime(params: PlanParams, rankedPlaces: RankedLugar[]): RankedLugar[] {
  const candidatePool = rankedPlaces.filter((rankedPlace) => isRelevantCandidate(rankedPlace, params));
  const relevantPlaces = candidatePool.length > 0 ? candidatePool : rankedPlaces;
  const selected: RankedLugar[] = [];
  let selectedStopCount = 0;
  let selectedCoveredCategories = 0;
  let selectedScheduledScore = 0;
  let selectedDiversityScore = 0;

  const getScheduledMetrics = (candidates: RankedLugar[]) => {
    const scheduled = buildDays(params, 'es', orderByMomentAndNeighborhood(candidates));
    const stopIds = new Set(scheduled.dias.flatMap((dia) => dia.paradas.map((parada) => parada.lugar.id)));
    const scheduledStops = candidates.filter((candidate) => stopIds.has(candidate.lugar.id));
    const scheduledTypes = new Set(scheduledStops.map((candidate) => candidate.lugar.tipo));
    const scheduledNeighborhoods = new Set(scheduledStops.map((candidate) => candidate.lugar.ubicacion.barrio));
    const coveredCategories = params.categorias.filter((category) => {
      return candidates.some((candidate) => stopIds.has(candidate.lugar.id) && candidate.lugar.categorias.includes(category));
    }).length;
    const totalScore = scheduled.dias.flatMap((dia) => dia.paradas).reduce((sum, parada) => sum + parada.puntuacion, 0);
    const diversityScore = scheduledTypes.size * 8 + scheduledNeighborhoods.size * 3;

    return {
      scheduled,
      stopIds,
      stopCount: stopIds.size,
      coveredCategories,
      totalScore,
      diversityScore,
    };
  };

  const notePreferences = getNotePreferences(params);
  const preferenceSeeds = [
    ...(notePreferences.wantsReservations
      ? relevantPlaces.filter((rankedPlace) => rankedPlace.lugar.tipo === 'restaurante').slice(0, 3)
      : []),
    ...(notePreferences.wantsTapas
      ? relevantPlaces.filter((rankedPlace) => rankedPlace.lugar.tipo === 'bar').slice(0, 4)
      : []),
    ...(notePreferences.wantsViews
      ? relevantPlaces.filter((rankedPlace) => rankedPlace.lugar.tipo === 'mirador').slice(0, 4)
      : []),
  ];
  const coverageSeeds = params.categorias.flatMap((category) =>
    relevantPlaces.filter((rankedPlace) => rankedPlace.lugar.categorias.includes(category)).slice(0, 3)
  );
  const iterationPool = [...new Map([...preferenceSeeds, ...coverageSeeds, ...relevantPlaces].map((item) => [item.lugar.id, item])).values()];

  for (const rankedPlace of iterationPool) {
    if (selected.some((candidate) => candidate.lugar.id === rankedPlace.lugar.id)) continue;

    const tentative = [...selected, rankedPlace];
    const metrics = getScheduledMetrics(tentative);

    if (!metrics.stopIds.has(rankedPlace.lugar.id)) continue;

    const selectedIds = new Set(selected.map((candidate) => candidate.lugar.id));
    const keepsCurrentSelection = [...selectedIds].every((id) => metrics.stopIds.has(id));
    const improvesCoverage = metrics.coveredCategories > selectedCoveredCategories;
    const improvesStopCount = metrics.stopCount > selectedStopCount;
    const improvesScore = metrics.totalScore > selectedScheduledScore;
    const improvesDiversity = metrics.diversityScore > selectedDiversityScore;

    if (!keepsCurrentSelection && !improvesCoverage) {
      continue;
    }

    if (!improvesCoverage && !improvesStopCount && !improvesScore && !improvesDiversity && selected.length > 0) {
      continue;
    }

    selected.splice(0, selected.length, ...tentative);
    selectedStopCount = metrics.stopCount;
    selectedCoveredCategories = metrics.coveredCategories;
    selectedScheduledScore = metrics.totalScore;
    selectedDiversityScore = metrics.diversityScore;
  }

  return selected;
}

function orderByMomentAndNeighborhood(selectedPlaces: RankedLugar[]): RankedLugar[] {
  const buckets = new Map<number, RankedLugar[]>();

  for (const place of selectedPlaces) {
    const order = MOMENT_ORDER[place.lugar.horario.mejor_momento] ?? 99;
    const current = buckets.get(order) ?? [];
    current.push(place);
    buckets.set(order, current);
  }

  return [...buckets.entries()]
    .sort((left, right) => left[0] - right[0])
    .flatMap(([, bucket]) => {
      const counts = bucket.reduce<Record<string, number>>((accumulator, item) => {
        const key = item.lugar.ubicacion.barrio;
        accumulator[key] = (accumulator[key] ?? 0) + 1;
        return accumulator;
      }, {});

      return [...bucket].sort((left, right) => {
        const neighborhoodDelta =
          (counts[right.lugar.ubicacion.barrio] ?? 0) - (counts[left.lugar.ubicacion.barrio] ?? 0);
        if (neighborhoodDelta !== 0) return neighborhoodDelta;
        if (left.lugar.ubicacion.barrio !== right.lugar.ubicacion.barrio) {
          return left.lugar.ubicacion.barrio.localeCompare(right.lugar.ubicacion.barrio, 'es');
        }
        if (right.score.total !== left.score.total) return right.score.total - left.score.total;
        if (left.lugar.nivel_turistico !== right.lugar.nivel_turistico) {
          return left.lugar.nivel_turistico - right.lugar.nivel_turistico;
        }
        return left.lugar.nombre.localeCompare(right.lugar.nombre, 'es');
      });
    });
}

function estimateTransitionMinutes(params: PlanParams, current: Lugar, next?: Lugar): number {
  if (!next) return 0;

  const distanceKm = haversineKm(current.ubicacion.lat, current.ubicacion.lng, next.ubicacion.lat, next.ubicacion.lng);
  const sameNeighborhoodBase = current.ubicacion.barrio === next.ubicacion.barrio ? 8 : TRANSITION_MINUTES;

  if (params.movilidad === 'coche') {
    return clamp(Math.round(distanceKm * 6) + 8, sameNeighborhoodBase, 35);
  }

  if (params.movilidad === 'publico') {
    return clamp(Math.round(distanceKm * 10) + 12, sameNeighborhoodBase, 45);
  }

  return clamp(Math.round(distanceKm * 14) + 6, sameNeighborhoodBase, 55);
}

function buildTransitionNote(locale: Locale, params: PlanParams, current: Lugar, next?: Lugar): string {
  if (!next) return '';
  const transitionMinutes = estimateTransitionMinutes(params, current, next);

  if (current.ubicacion.barrio === next.ubicacion.barrio) {
    return locale === 'en'
      ? `From ${current.nombre}, allow about ${transitionMinutes} minutes through ${current.ubicacion.barrio} to ${next.nombre}.`
      : `Desde ${current.nombre}, calcula unos ${transitionMinutes} min por ${current.ubicacion.barrio} hasta ${next.nombre}.`;
  }

  return locale === 'en'
    ? `From ${current.nombre}, head towards ${next.ubicacion.barrio} for ${next.nombre} — allow around ${transitionMinutes} minutes.`
    : `Desde ${current.nombre}, dirígete a ${next.ubicacion.barrio} para llegar a ${next.nombre} — calcula unos ${transitionMinutes} min.`;
}

function getAbsoluteClosingMinutes(lugar: Lugar): number {
  if (!lugar.horario.cierre) return toMinutes('23:30');
  const closingMinutes = toMinutes(lugar.horario.cierre);
  return closingMinutes < toMinutes('06:00') ? closingMinutes + 24 * 60 : closingMinutes;
}

function canFitWithinClosingHours(lugar: Lugar, endMinutes: number): boolean {
  return endMinutes <= getAbsoluteClosingMinutes(lugar);
}

function getDayStartTime(params: PlanParams): string {
  const notePreferences = getNotePreferences(params);
  const onlyFoodPlan =
    params.categorias.includes('gastronomia') &&
    !params.categorias.some((category) => category !== 'gastronomia' && category !== 'flamenco');

  if (notePreferences.wantsNightPlan || params.categorias.includes('flamenco')) {
    return '18:00';
  }

  if (notePreferences.wantsViews && (params.tiempo === '2h' || params.tiempo === 'medio-dia')) {
    return '16:00';
  }

  if (onlyFoodPlan) {
    return params.compania === 'amigos' ? '13:00' : '12:00';
  }

  return DAY_START_TIME;
}

function buildDays(params: PlanParams, locale: Locale, orderedPlaces: RankedLugar[]): DayPlanBuildResult {
  const totalDays = TIME_BUDGETS[params.tiempo].days;
  const dayBudget = TIME_BUDGETS[params.tiempo].total / totalDays;
  const dayStartTime = getDayStartTime(params);
  const dayStartMinutes = toMinutes(dayStartTime);
  let pending = [...orderedPlaces];
  let scheduledMinutes = 0;
  const droppedBySchedule: RankedLugar[] = [];
  const dias: DiaItinerario[] = [];

  for (let dayNumber = 1; dayNumber <= totalDays; dayNumber += 1) {
    const paradas: Parada[] = [];
    const nextPending: RankedLugar[] = [];
    let currentMinutes = dayStartMinutes;
    const remainingDays = totalDays - dayNumber + 1;
    const targetStopsForDay = Math.ceil(pending.length / remainingDays);

    for (let index = 0; index < pending.length; index += 1) {
      const rankedPlace = pending[index];
      if (!rankedPlace) continue;

      if (totalDays > 1 && dayNumber < totalDays && paradas.length >= targetStopsForDay) {
        nextPending.push(...pending.slice(index));
        break;
      }

      const previousStop = paradas[paradas.length - 1];
      const transition = previousStop ? estimateTransitionMinutes(params, previousStop.lugar, rankedPlace.lugar) : 0;
      const openingMinutes = rankedPlace.lugar.horario.apertura ? toMinutes(rankedPlace.lugar.horario.apertura) : null;
      const preferredMomentStart =
        rankedPlace.lugar.horario.mejor_momento === 'atardecer' || rankedPlace.lugar.horario.mejor_momento === 'noche'
          ? toMinutes(MOMENT_START_TIME[rankedPlace.lugar.horario.mejor_momento])
          : null;
      const startMinutes = Math.max(
        currentMinutes + transition,
        openingMinutes ?? dayStartMinutes,
        preferredMomentStart ?? dayStartMinutes
      );
      const endMinutes = startMinutes + rankedPlace.lugar.duracion_min;

      if (!canFitWithinClosingHours(rankedPlace.lugar, endMinutes)) {
        droppedBySchedule.push(rankedPlace);
        continue;
      }

      if (endMinutes - dayStartMinutes > dayBudget) {
        nextPending.push(rankedPlace);
        continue;
      }

      paradas.push({
        orden: paradas.length + 1,
        hora_inicio: toTimeString(startMinutes),
        hora_fin: toTimeString(endMinutes),
        lugar: rankedPlace.lugar,
        nota_transicion: '',
        puntuacion: rankedPlace.score.total,
      });
      currentMinutes = endMinutes;
    }

    for (let index = 0; index < paradas.length; index += 1) {
      const parada = paradas[index];
      if (!parada) continue;
      parada.nota_transicion = buildTransitionNote(locale, params, parada.lugar, paradas[index + 1]?.lugar);
    }

    if (paradas.length > 0) {
      dias.push({
        dia: dayNumber,
        titulo_dia: generateDayTitle(dayNumber, locale, paradas),
        paradas,
      });

      scheduledMinutes += currentMinutes - dayStartMinutes;
    }

    pending = nextPending;
  }

  droppedBySchedule.push(...pending);

  return {
    dias,
    scheduledMinutes,
    droppedBySchedule,
  };
}

function getMainNeighborhood(dias: DiaItinerario[]): string {
  const counts = dias.flatMap((dia) => dia.paradas).reduce<Record<string, number>>((accumulator, parada) => {
    const key = parada.lugar.ubicacion.barrio;
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(counts).sort((left, right) => right[1] - left[1])[0]?.[0] ?? 'Granada';
}

function buildEmptyItinerary(params: PlanParams, locale: Locale): Itinerario {
  const paramsUrl = encodePlanParams(params);
  const reference = stableReferenceCode(paramsUrl);

  return {
    titulo: locale === 'en' ? 'No results' : 'Sin resultados',
    subtitulo: locale === 'en' ? 'Try adjusting the filters' : 'Prueba con otros filtros',
    resumen:
      locale === 'en'
        ? 'No place matches all current restrictions. Try widening the budget, changing mobility or adding more interests.'
        : 'Ningún lugar encaja con todas las restricciones actuales. Prueba a abrir presupuesto, cambiar la movilidad o añadir más intereses.',
    dias: [],
    coste_estimado: locale === 'en' ? 'Free' : 'Gratuito',
    duracion_total: formatDuration(0, locale),
    nota_final:
      locale === 'en'
        ? 'Granada has many viable combinations. Relax one restriction and generate another route.'
        : 'Granada tiene muchas combinaciones posibles. Relaja una restricción y genera otro itinerario.',
    params_url: paramsUrl,
    meta: {
      fecha_plan: params.fecha,
      lugares_filtrados: 0,
      lugares_seleccionados: 0,
      lugares_descartados_por_horario: 0,
      minutos_objetivo: TIME_BUDGETS[params.tiempo].total,
      minutos_programados: 0,
      referencia: reference,
    },
  };
}

export function generarItinerario(params: PlanParams, options: PlannerGenerationOptions = {}): Itinerario {
  const locale = options.locale ?? 'es';
  const filteredPlaces = applyHardFilters(params, lugares);

  if (filteredPlaces.length === 0) {
    return buildEmptyItinerary(params, locale);
  }

  const rankedPlaces = rankPlaces(params, filteredPlaces);
  const selectedPlaces = selectPlacesByTime(params, rankedPlaces);
  const orderedPlaces = orderByMomentAndNeighborhood(selectedPlaces);
  const { dias, scheduledMinutes, droppedBySchedule } = buildDays(params, locale, orderedPlaces);

  if (dias.length === 0) {
    return buildEmptyItinerary(params, locale);
  }

  const allStops = dias.flatMap((dia) => dia.paradas);
  const costMin = allStops.reduce((total, parada) => total + parada.lugar.coste.minimo, 0);
  const costMax = allStops.reduce((total, parada) => total + parada.lugar.coste.maximo, 0);
  const paramsUrl = encodePlanParams(params);
  const reference = stableReferenceCode(paramsUrl);
  const mainNeighborhood = getMainNeighborhood(dias);

  return {
    titulo: generateTitle(params, locale, mainNeighborhood),
    subtitulo: generateSubtitle(params, locale),
    resumen: generateSummary(params, locale, allStops.length, scheduledMinutes),
    dias,
    coste_estimado: formatCostRange(costMin, costMax, locale),
    duracion_total: formatDuration(scheduledMinutes, locale),
    nota_final: generateFinalNote(params, locale),
    params_url: paramsUrl,
    meta: {
      fecha_plan: params.fecha,
      lugares_filtrados: filteredPlaces.length,
      lugares_seleccionados: allStops.length,
      lugares_descartados_por_horario: droppedBySchedule.length,
      minutos_objetivo: TIME_BUDGETS[params.tiempo].total,
      minutos_programados: scheduledMinutes,
      referencia: reference,
    },
  };
}
