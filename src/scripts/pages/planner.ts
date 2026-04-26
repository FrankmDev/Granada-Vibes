import {
  buildDefaultPlanParams,
  decodePlanParams,
  encodePlanParams,
  generarItinerario,
} from '@/lib/planificador.js';
import type { Itinerario, PlanParams } from '@/lib/planificador.js';

interface PlannerCopy {
  loadingMessages: string[];
  shareCopied: string;
  valueLabels: Record<string, Record<string, string>>;
  placeTypes: Record<string, string>;
  labels: {
    referencePrefix: string;
    localTip: string;
  };
}

const root = document.getElementById('planner-app');
const rawCopy = document.getElementById('planner-copy')?.textContent;

if (!root || !rawCopy) {
  throw new Error('Planner app configuration not found.');
}

const locale = (root.getAttribute('data-locale') ?? 'es') as 'es' | 'en';
const copy = JSON.parse(rawCopy) as PlannerCopy;

const defaultParams = buildDefaultPlanParams();

const state: Record<string, string | string[]> = {
  tiempo: '',
  categorias: [],
  compania: '',
  presupuesto: '',
  ritmo: '',
  movilidad: '',
  notas: '',
  fecha: defaultParams.fecha,
};

let currentItinerary: Itinerario | null = null;
const resultsEl = document.getElementById('planner-results') as HTMLDivElement;
const formEl = document.getElementById('planner-form') as HTMLDivElement;
const loadingEl = document.getElementById('planner-loading') as HTMLDivElement;
const progressEl = document.getElementById('planner-progress') as HTMLDivElement;
const btnGenerate = document.getElementById('btn-generar') as HTMLButtonElement;
const btnTooltip = document.getElementById('btn-tooltip') as HTMLParagraphElement;
const notesInput = document.getElementById('plan-notas') as HTMLTextAreaElement;
const notesCount = document.getElementById('notas-count') as HTMLSpanElement;

function parsePlannerParams(): PlanParams {
  return {
    tiempo: state.tiempo as PlanParams['tiempo'],
    categorias: state.categorias as PlanParams['categorias'],
    compania: state.compania as PlanParams['compania'],
    presupuesto: state.presupuesto as PlanParams['presupuesto'],
    ritmo: state.ritmo as PlanParams['ritmo'],
    movilidad: state.movilidad as PlanParams['movilidad'],
    notas: state.notas as string,
    fecha: state.fecha as string,
  };
}

function validateForm(): boolean {
  const required = ['tiempo', 'categorias', 'compania', 'presupuesto', 'ritmo', 'movilidad'];
  const isValid = required.every((key) => {
    const value = state[key];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });

  btnGenerate.disabled = !isValid;
  btnTooltip.classList.toggle('hidden', isValid);
  updateProgress();
  return isValid;
}

function updateProgress(): void {
  const required = ['tiempo', 'categorias', 'compania', 'presupuesto', 'ritmo', 'movilidad'];
  required.forEach((key, index) => {
    const stepEl = progressEl.querySelector(`[data-step="${index}"]`);
    if (!stepEl) return;

    const value = state[key];
    const isComplete = Array.isArray(value) ? value.length > 0 : Boolean(value);
    stepEl.classList.remove('is-active', 'is-complete');
    if (isComplete) {
      stepEl.classList.add('is-complete');
    }
  });

  // Set active to first incomplete step
  const firstIncomplete = required.findIndex((key) => {
    const value = state[key];
    return Array.isArray(value) ? value.length === 0 : !value;
  });
  if (firstIncomplete !== -1) {
    const activeStep = progressEl.querySelector(`[data-step="${firstIncomplete}"]`);
    activeStep?.classList.add('is-active');
  }

  // Update vertical rail fill
  const completedCount = required.filter((key) => {
    const value = state[key];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;
  const railFill = progressEl.querySelector('.rail-fill') as HTMLElement | null;
  if (railFill) {
    railFill.style.height = `${(completedCount / required.length) * 100}%`;
  }
}

function setSelectedState(): void {
  document.querySelectorAll<HTMLElement>('[data-group]').forEach((group) => {
    const groupName = group.getAttribute('data-group') ?? '';
    const isMulti = group.getAttribute('data-multi') === 'true';
    const value = state[groupName];

    const hasSelection = isMulti
      ? Array.isArray(value) && value.length > 0
      : Boolean(value);
    group.classList.toggle('has-selection', hasSelection);

    group.querySelectorAll<HTMLButtonElement>('button[data-value]').forEach((button) => {
      const buttonValue = button.getAttribute('data-value') ?? '';
      const isSelected = isMulti && Array.isArray(value)
        ? value.includes(buttonValue)
        : value === buttonValue;
      button.classList.toggle('is-selected', isSelected);
    });
  });
}

function updateUrl(params: PlanParams): void {
  const nextUrl = `${window.location.pathname}?${encodePlanParams(params)}`;
  window.history.pushState({ planner: true }, '', nextUrl);
}

function renderPills(params: PlanParams): void {
  const container = document.getElementById('result-pills') as HTMLDivElement;
  container.innerHTML = '';

  const groups: Array<keyof Pick<PlanParams, 'tiempo' | 'compania' | 'presupuesto' | 'ritmo'>> = [
    'tiempo',
    'compania',
    'presupuesto',
    'ritmo',
  ];

  groups.forEach((group) => {
    const rawValue = params[group];
    const label = copy.valueLabels[group]?.[String(rawValue)] ?? String(rawValue);
    const element = document.createElement('span');
    element.className = 'result-pill';
    element.textContent = label;
    container.appendChild(element);
  });
}

function renderResults(itinerary: Itinerario, params: PlanParams): void {
  currentItinerary = itinerary;

  (document.getElementById('result-ref') as HTMLSpanElement).textContent =
    `${copy.labels.referencePrefix} ${itinerary.meta.referencia}`;
  (document.getElementById('result-titulo') as HTMLHeadingElement).textContent = itinerary.titulo;
  (document.getElementById('result-subtitulo') as HTMLParagraphElement).textContent = itinerary.subtitulo;
  (document.getElementById('result-resumen') as HTMLParagraphElement).textContent = itinerary.resumen;
  (document.getElementById('result-coste') as HTMLSpanElement).textContent = itinerary.coste_estimado;
  (document.getElementById('result-duracion') as HTMLSpanElement).textContent = itinerary.duracion_total;
  (document.getElementById('result-nota-final') as HTMLParagraphElement).textContent = itinerary.nota_final;

  renderPills(params);

  const daysContainer = document.getElementById('result-dias') as HTMLDivElement;
  daysContainer.innerHTML = '';

  itinerary.dias.forEach((dia, dayIdx) => {
    const section = document.createElement('div');
    section.className = 'day-section';
    section.style.animationDelay = `${dayIdx * 0.15}s`;

    const header = document.createElement('div');
    header.className = 'day-header';
    header.innerHTML = `
      <span class="day-number">${String(dayIdx + 1).padStart(2, '0')}</span>
      <span class="day-title">${dia.titulo_dia}</span>
      <span class="day-line" aria-hidden="true"></span>
    `;
    section.appendChild(header);

    const timeline = document.createElement('div');
    timeline.className = 'timeline';

    const track = document.createElement('div');
    track.className = 'timeline-track';
    track.setAttribute('aria-hidden', 'true');
    timeline.appendChild(track);

    dia.paradas.forEach((parada, stopIdx) => {
      const card = document.createElement('div');
      card.className = 'stop-card';
      card.style.animationDelay = `${0.2 + stopIdx * 0.1}s`;

      card.innerHTML = `
        <span class="stop-dot" aria-hidden="true"></span>
        <span class="stop-corner tl" aria-hidden="true"></span>
        <span class="stop-corner tr" aria-hidden="true"></span>
        <span class="stop-corner bl" aria-hidden="true"></span>
        <span class="stop-corner br" aria-hidden="true"></span>
        <div class="stop-header">
          <span class="stop-order">${String(parada.orden).padStart(2, '0')}</span>
          <span class="stop-time">${parada.hora_inicio} — ${parada.hora_fin}</span>
        </div>
        <h4 class="stop-name">${parada.lugar.nombre}</h4>
        <div class="stop-badges">
          <span class="stop-badge type">${copy.placeTypes[parada.lugar.tipo] ?? parada.lugar.tipo}</span>
          <span class="stop-badge neighborhood">${parada.lugar.ubicacion.barrio}</span>
        </div>
        <p class="stop-desc">${parada.lugar.descripcion}</p>
        <div class="stop-tip">
          <span class="stop-tip-label">${copy.labels.localTip}</span>
          <p class="stop-tip-text">${parada.lugar.consejo_local}</p>
        </div>
        <div class="stop-meta">
          <span>${parada.lugar.coste.descripcion}</span>
          <span>${parada.lugar.ubicacion.direccion}</span>
        </div>
        ${parada.nota_transicion ? `<div class="stop-transition">${parada.nota_transicion}</div>` : ''}
      `;

      timeline.appendChild(card);
    });

    section.appendChild(timeline);
    daysContainer.appendChild(section);
  });
}

function switchStage(
  fromEl: HTMLElement | null,
  toEl: HTMLElement | null,
  leavingClass = 'is-leaving',
  enteringClass = 'is-entering',
  leaveDuration = 400,
): void {
  if (fromEl) {
    fromEl.classList.add(leavingClass);
    window.setTimeout(() => {
      fromEl.classList.add('hidden');
      fromEl.classList.remove(leavingClass);
    }, leaveDuration);
  }

  if (toEl) {
    window.setTimeout(() => {
      toEl.classList.remove('hidden');
      toEl.classList.add(enteringClass);
      // Clean up entering class after animation completes
      window.setTimeout(() => {
        toEl.classList.remove(enteringClass);
      }, 800);
    }, fromEl ? leaveDuration : 0);
  }
}

function startGeneration(params: PlanParams): void {
  switchStage(formEl, loadingEl, 'is-leaving', 'is-entering', 400);
  if (progressEl) {
    progressEl.classList.add('is-leaving');
    window.setTimeout(() => {
      progressEl.classList.add('hidden');
      progressEl.classList.remove('is-leaving');
    }, 400);
  }
  resultsEl.classList.add('hidden');
  resultsEl.classList.remove('is-entering');

  // Scroll to the planner section top immediately so the loading/results
  // appear in view and we don't jump to the bottom when tall content unfolds.
  root.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const loadingText = document.getElementById('loading-text') as HTMLParagraphElement;
  let index = 0;
  loadingText.textContent = copy.loadingMessages[0] ?? '';

  const interval = window.setInterval(() => {
    index = (index + 1) % copy.loadingMessages.length;
    loadingText.style.opacity = '0';
    window.setTimeout(() => {
      loadingText.textContent = copy.loadingMessages[index] ?? '';
      loadingText.style.opacity = '1';
    }, 200);
  }, 900);

  window.setTimeout(() => {
    window.clearInterval(interval);
    const itinerary = generarItinerario(params, { locale });
    renderResults(itinerary, params);
    updateUrl(params);
    switchStage(loadingEl, resultsEl, 'is-leaving', 'is-entering', 350);
  }, 2600);
}

function resetForm(): void {
  state.tiempo = '';
  state.categorias = [];
  state.compania = '';
  state.presupuesto = '';
  state.ritmo = '';
  state.movilidad = '';
  state.notas = '';
  state.fecha = defaultParams.fecha;

  notesInput.value = '';
  notesCount.textContent = '0';
  setSelectedState();
  updateProgress();
  window.history.pushState({}, '', window.location.pathname);
  validateForm();

  // Animate results out, then form back in
  resultsEl.classList.add('is-leaving');
  window.setTimeout(() => {
    resultsEl.classList.add('hidden');
    resultsEl.classList.remove('is-leaving');
    formEl.classList.remove('hidden');
    progressEl.classList.remove('hidden');
    formEl.classList.add('is-entering');
    window.setTimeout(() => {
      formEl.classList.remove('is-entering');
    }, 600);
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 400);
}

document.querySelectorAll<HTMLElement>('[data-group]').forEach((group) => {
  const groupName = group.getAttribute('data-group') ?? '';
  const isMulti = group.getAttribute('data-multi') === 'true';

  group.querySelectorAll<HTMLButtonElement>('button[data-value]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value') ?? '';

      if (isMulti) {
        const current = state[groupName] as string[];
        const nextValues = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        state[groupName] = nextValues;
      } else {
        state[groupName] = value;
      }

      setSelectedState();
      validateForm();
    });
  });
});

notesInput.addEventListener('input', () => {
  state.notas = notesInput.value;
  notesCount.textContent = String(notesInput.value.length);
});

btnGenerate.addEventListener('mouseenter', () => {
  if (btnGenerate.disabled) {
    btnTooltip.classList.remove('hidden');
  }
});

btnGenerate.addEventListener('mouseleave', () => {
  btnTooltip.classList.add('hidden');
});

btnGenerate.addEventListener('click', () => {
  if (!validateForm()) return;
  const params = parsePlannerParams();
  startGeneration(params);
});

document.getElementById('btn-compartir')?.addEventListener('click', async () => {
  if (!currentItinerary) return;

  try {
    if (navigator.share) {
      await navigator.share({
        title: currentItinerary.titulo,
        url: window.location.href,
      });
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      const button = document.getElementById('btn-compartir') as HTMLButtonElement;
      const originalHtml = button.innerHTML;
      button.innerHTML = `<span>${copy.shareCopied}</span>`;
      window.setTimeout(() => {
        button.innerHTML = originalHtml;
      }, 1600);
    }
  } catch {
    return;
  }
});

document.getElementById('btn-reset')?.addEventListener('click', () => {
  resetForm();
});

function initFromUrl(): boolean {
  const params = decodePlanParams(window.location.search);
  if (!params) return false;

  state.tiempo = params.tiempo;
  state.categorias = params.categorias;
  state.compania = params.compania;
  state.presupuesto = params.presupuesto;
  state.ritmo = params.ritmo;
  state.movilidad = params.movilidad;
  state.fecha = params.fecha;
  state.notas = '';

  setSelectedState();
  validateForm();
  startGeneration(params);
  return true;
}

if (!initFromUrl()) {
  setSelectedState();
  validateForm();
}
