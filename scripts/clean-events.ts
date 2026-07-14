import fs from 'node:fs';
import path from 'node:path';
import { isExcludedEvent } from '../src/data/events/exclusions.js';

const generatedPath = path.resolve(import.meta.dirname, '../src/data/events/generated.json');
const madridDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Madrid',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

interface EventRecord extends Record<string, unknown> {
  date?: string;
  endDate?: string;
  slug?: string;
  title?: {
    es?: string;
    en?: string;
  };
  source?: string;
  sourceId?: string;
}

function isEventRecord(value: unknown): value is EventRecord {
  return typeof value === 'object' && value !== null;
}

function loadEvents(): EventRecord[] {
  const raw = fs.readFileSync(generatedPath, 'utf8');
  const parsed: unknown = JSON.parse(raw);

  if (!Array.isArray(parsed) || !parsed.every(isEventRecord)) {
    throw new Error('generated.json no contiene un array valido de eventos.');
  }

  return parsed;
}

function saveEvents(events: EventRecord[]): void {
  const tempPath = `${generatedPath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(events, null, 2) + '\n', 'utf8');
  fs.renameSync(tempPath, generatedPath);
}

function getTodayString(): string {
  return madridDateFormatter.format(new Date());
}

function getEventEndDate(event: EventRecord): string | undefined {
  if (typeof event.endDate === 'string') return event.endDate;
  if (typeof event.date === 'string') return event.date;
  return undefined;
}

function main(): void {
  const today = getTodayString();

  if (!fs.existsSync(generatedPath)) {
    console.warn(`[!] No se encontró ${generatedPath}. Nada que limpiar.`);
    process.exit(0);
  }

  let events: EventRecord[];
  try {
    events = loadEvents();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[FAIL] No se pudieron cargar los eventos: ${message}`);
    process.exit(1);
  }

  let invalidDateCount = 0;
  let excludedCount = 0;
  const filtered = events.filter((event) => {
    if (isExcludedEvent(event)) {
      excludedCount++;
      return false;
    }

    const endDate = getEventEndDate(event);
    const isValidDate = typeof endDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(endDate);

    if (!isValidDate) {
      invalidDateCount++;
      return false;
    }

    return endDate >= today;
  });

  const removed = events.length - filtered.length;
  const pastRemoved = removed - invalidDateCount - excludedCount;

  if (invalidDateCount > 0) {
    console.warn(`[!] ${invalidDateCount} evento(s) sin fecha valida fueron descartados durante la limpieza.`);
  }

  if (excludedCount > 0) {
    console.warn(`[!] ${excludedCount} evento(s) excluido(s) por denylist fueron descartados durante la limpieza.`);
  }

  if (removed === 0) {
    console.log(`[OK] Ningún evento pasado. Todo limpio (${filtered.length} eventos).`);
  } else {
    saveEvents(filtered);
    console.log(
      `[OK] Eliminados ${pastRemoved} evento(s) pasado(s), ${invalidDateCount} invalido(s) y ${excludedCount} excluido(s). Restantes: ${filtered.length}.`
    );
  }
}

main();
