import type { Locale } from '@types';
import type { DiaItinerario, PlanParams } from './types.js';
import { formatDuration } from './utils.js';

type PlannerLocale = Locale;

const COMPANY_COPY = {
  es: {
    solo: 'solo',
    pareja: 'en pareja',
    amigos: 'con amigos',
    familia: 'en familia',
    grupo: 'en grupo',
  },
  en: {
    solo: 'solo',
    pareja: 'as a couple',
    amigos: 'with friends',
    familia: 'with family',
    grupo: 'as a group',
  },
} as const;

const CATEGORY_STYLE = {
  es: {
    historia: 'histórico',
    gastronomia: 'gastronómico',
    naturaleza: 'natural',
    fotografia: 'fotográfico',
    flamenco: 'flamenco',
    arte: 'artístico',
    compras: 'de compras',
    secreto: 'de rincones secretos',
    monumentos: 'monumental',
  },
  en: {
    historia: 'historic',
    gastronomia: 'food-focused',
    naturaleza: 'nature-led',
    fotografia: 'photographic',
    flamenco: 'flamenco',
    arte: 'art-focused',
    compras: 'shopping',
    secreto: 'secret-spot',
    monumentos: 'monumental',
  },
} as const;

const TIME_COPY = {
  es: {
    '2h': 'una tarde',
    'medio-dia': 'medio día',
    'dia-completo': 'un día',
    'fin-de-semana': 'un fin de semana',
  },
  en: {
    '2h': 'two hours',
    'medio-dia': 'half a day',
    'dia-completo': 'one full day',
    'fin-de-semana': 'a weekend',
  },
} as const;

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function generateTitle(params: PlanParams, locale: PlannerLocale, mainNeighborhood: string): string {
  if (locale === 'en') {
    if (params.categorias.includes('gastronomia') && params.compania === 'amigos') {
      return 'Tapas and food night with friends';
    }

    if (params.categorias.includes('fotografia') && params.compania === 'solo') {
      return `A solo camera walk through ${mainNeighborhood}`;
    }

    if (params.compania === 'pareja') {
      return `A day as a couple around ${mainNeighborhood}`;
    }

    return `${capitalize(TIME_COPY.en[params.tiempo])} ${COMPANY_COPY.en[params.compania]} in ${mainNeighborhood}`;
  }

  if (params.categorias.includes('gastronomia') && params.compania === 'amigos') {
    return 'Noche de tapas y gastronomía con amigos';
  }

  if (params.categorias.includes('fotografia') && params.compania === 'solo') {
    return `Una ruta solo con la cámara por ${mainNeighborhood}`;
  }

  if (params.compania === 'pareja') {
    return `Un día en pareja por ${mainNeighborhood}`;
  }

  if (params.compania === 'familia') {
    return `Granada ${CATEGORY_STYLE.es[params.categorias[0] ?? 'historia']} en familia`;
  }

  return `${capitalize(TIME_COPY.es[params.tiempo])} ${COMPANY_COPY.es[params.compania]} por ${mainNeighborhood}`;
}

export function generateSubtitle(params: PlanParams, locale: PlannerLocale): string {
  const categories = params.categorias;

  if (locale === 'en') {
    if (categories.length === 1) {
      return `A personalised itinerary built around ${categories[0]}`;
    }
    return `A personalised itinerary combining ${categories.slice(0, -1).join(', ')} and ${categories[categories.length - 1]}`;
  }

  if (categories.length === 1) {
    return `Itinerario personalizado centrado en ${categories[0]}`;
  }

  return `Itinerario personalizado combinando ${categories.slice(0, -1).join(', ')} y ${categories[categories.length - 1]}`;
}

export function generateSummary(
  params: PlanParams,
  locale: PlannerLocale,
  selectedStops: number,
  totalMinutes: number
): string {
  const duration = formatDuration(totalMinutes, locale);

  if (locale === 'en') {
    const rhythm =
      params.ritmo === 'tranquilo'
        ? 'at an easy pace'
        : params.ritmo === 'intenso'
          ? 'at a fast pace'
          : 'at a balanced pace';

    let summary = `We selected ${selectedStops} places for ${duration} of visits and transitions ${rhythm}.`;

    if (params.presupuesto === 'minimo') {
      summary += ' Everything fits a free budget.';
    } else if (params.presupuesto === 'ajustado') {
      summary += ' The route stays within a tight budget.';
    }

    if (params.compania === 'pareja') {
      summary += ' Sunset-friendly and atmospheric stops were prioritised.';
    } else if (params.compania === 'familia') {
      summary += ' Family-friendly stops were prioritised throughout the route.';
    } else if (params.compania === 'solo') {
      summary += ' The route favours safe, easy-to-enjoy visits for solo travellers.';
    }

    return summary;
  }

  const rhythm =
    params.ritmo === 'tranquilo'
      ? 'sin prisas'
      : params.ritmo === 'intenso'
        ? 'a buen ritmo'
        : 'con ritmo equilibrado';

  let summary = `Hemos seleccionado ${selectedStops} lugares para ${duration} de visitas y transiciones ${rhythm}.`;

  if (params.presupuesto === 'minimo') {
    summary += ' Todo encaja en un plan gratuito.';
  } else if (params.presupuesto === 'ajustado') {
    summary += ' El recorrido se mantiene dentro de un presupuesto ajustado.';
  }

  if (params.compania === 'pareja') {
    summary += ' Hemos priorizado paradas con buena atmósfera y momentos de atardecer.';
  } else if (params.compania === 'familia') {
    summary += ' Hemos priorizado lugares cómodos y aptos para toda la familia.';
  } else if (params.compania === 'solo') {
    summary += ' El plan favorece visitas cómodas y fáciles de disfrutar en solitario.';
  }

  return summary;
}

export function generateFinalNote(params: PlanParams, locale: PlannerLocale): string {
  if (locale === 'en') {
    switch (params.compania) {
      case 'pareja':
        return 'Leave some margin for sunset viewpoints. In Granada, the light usually improves the later you arrive.';
      case 'familia':
        return 'Start early and keep the afternoon free. The route works better that way with children.';
      case 'solo':
        return 'Granada is easy to explore alone. If you improvise one extra stop, make it a tapas bar with locals at the counter.';
      case 'amigos':
        return 'This route improves if you stay flexible. The best tapas sequence is usually the one you keep adapting on the fly.';
      default:
        return 'Leave room for one unplanned stop. Granada rewards curiosity.';
    }
  }

  switch (params.compania) {
    case 'pareja':
      return 'Deja margen para un mirador al final. En Granada la luz suele mejorar cuanto más te acercas al atardecer.';
    case 'familia':
      return 'Empieza pronto y deja la tarde libre. Con niños el plan funciona mejor así.';
    case 'solo':
      return 'Granada se presta muy bien a improvisar. Si añades una parada fuera de plan, que sea un bar de barrio.';
    case 'amigos':
      return 'Este itinerario funciona mejor si no intentáis fijarlo todo. La mejor ronda de tapas suele ser la que se adapta sobre la marcha.';
    default:
      return 'Deja hueco para una parada no prevista. Granada suele premiar la curiosidad.';
  }
}

export function generateDayTitle(dayNumber: number, locale: PlannerLocale, paradas: DiaItinerario['paradas']): string {
  const barrios = [...new Set(paradas.map((parada) => parada.lugar.ubicacion.barrio))];
  const barriosLabel = barrios.join(locale === 'en' ? ' and ' : ' y ');

  if (locale === 'en') {
    return `Day ${dayNumber} · ${barriosLabel}`;
  }

  return `Día ${dayNumber} · ${barriosLabel}`;
}
