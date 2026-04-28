import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve(import.meta.dirname, '../src/data/events/generated.json');

interface GeneratedEvent {
  id: string;
  slug: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  category: string;
  date: string;
  time: string;
  venue: string;
  neighborhood: string;
  price: number | null;
  currency: string;
  tags: string[];
  featured: boolean;
  source: string;
  sourceId: string;
  sourceUrl?: string;
  imageUrl?: string;
  lastSyncedAt: string;
}

function normalizeTitle(title: string): string {
  if (!title) return '';
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function scoreEvent(event: GeneratedEvent): number {
  if (!event || typeof event !== 'object') return -999;
  let score = 0;
  if (event.imageUrl) score += 3;
  if (event.description && event.description.es && event.description.es.length > 50) score += 2;
  if (event.price !== null && event.price !== undefined) score += 1;
  if (event.time && event.time !== 'Por confirmar') score += 1;
  if (event.venue && event.venue !== 'Granada') score += 1;
  if (['ticketmaster', 'eventbrite'].includes(event.source)) score += 1;
  return score;
}

function main() {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed: unknown = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    console.error('[FAIL] generated.json no es un array.');
    process.exit(1);
  }

  const events = parsed.filter((e): e is GeneratedEvent =>
    e && typeof e === 'object' && 'id' in e && 'title' in e && 'date' in e
  );

  if (events.length !== parsed.length) {
    console.warn(`[!] Filtrados ${parsed.length - events.length} elementos invalidos.`);
  }

  const keepers = new Map<string, GeneratedEvent>();
  const duplicates: Array<{ kept: string; removed: string; reason: string }> = [];

  for (const event of events) {
    const titleNorm = normalizeTitle(event.title?.es ?? event.title?.en ?? '');
    const urlKey = event.sourceUrl ? event.sourceUrl.trim().toLowerCase() : null;
    const dateTimeVenueKey = `${event.date}::${event.time}::${(event.venue ?? '').toLowerCase().trim()}`;
    const titleDateKey = `${titleNorm}::${event.date}`;

    let matchKey: string | null = null;
    let matchReason = '';

    // 1. Check by exact URL
    if (urlKey) {
      const existing = Array.from(keepers.values()).find(
        (e) => e.sourceUrl && e.sourceUrl.trim().toLowerCase() === urlKey
      );
      if (existing) {
        matchKey = existing.id;
        matchReason = 'misma URL';
      }
    }

    // 2. Check by title + date
    if (!matchKey && titleNorm.length > 0) {
      const existing = Array.from(keepers.values()).find(
        (e) => normalizeTitle(e.title?.es ?? e.title?.en ?? '') + '::' + e.date === titleDateKey
      );
      if (existing) {
        matchKey = existing.id;
        matchReason = 'mismo titulo + fecha';
      }
    }

    // 3. Check by date + time + venue
    if (!matchKey) {
      const existing = Array.from(keepers.values()).find(
        (e) =>
          `${e.date}::${e.time}::${(e.venue ?? '').toLowerCase().trim()}` === dateTimeVenueKey
      );
      if (existing) {
        matchKey = existing.id;
        matchReason = 'misma fecha, hora y lugar';
      }
    }

    if (matchKey) {
      const existing = keepers.get(matchKey);
      if (!existing) {
        // Should not happen, but be safe
        keepers.set(matchKey, event);
        continue;
      }
      const existingScore = scoreEvent(existing);
      const newScore = scoreEvent(event);

      if (newScore > existingScore) {
        keepers.set(matchKey, event);
        duplicates.push({
          kept: event.id,
          removed: existing.id,
          reason: matchReason,
        });
      } else {
        duplicates.push({
          kept: existing.id,
          removed: event.id,
          reason: matchReason,
        });
      }
    } else {
      keepers.set(event.id, event);
    }
  }

  const result = Array.from(keepers.values());
  result.sort((a, b) => a.date.localeCompare(b.date));

  fs.writeFileSync(filePath, JSON.stringify(result, null, 2) + '\n', 'utf-8');

  console.log(`[OK] Eventos antes: ${events.length}`);
  console.log(`[OK] Eventos despues: ${result.length}`);
  console.log(`[OK] Duplicados eliminados: ${duplicates.length}`);

  if (duplicates.length > 0) {
    console.log('\n--- Duplicados eliminados ---');
    for (const dup of duplicates.slice(0, 50)) {
      console.log(`  - ${dup.reason}: eliminado ${dup.removed} (conservado ${dup.kept})`);
    }
    if (duplicates.length > 50) {
      console.log(`  ... y ${duplicates.length - 50} mas.`);
    }
  }
}

main();
