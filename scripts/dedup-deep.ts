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

function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeVenue(venue: string): string {
  return normalizeText(venue)
    .replace(/\b(cafe|cafeteria|pub|sala|teatro|auditorio|palacio|plaza|pl)\b/g, '')
    .trim();
}

function titleWords(title: string): string[] {
  const stopWords = new Set(['de', 'del', 'la', 'el', 'los', 'las', 'en', 'y', 'a', 'con', 'por', 'un', 'una', 'tributo', 'concierto', 'festival', 'granada', 'live']);
  return normalizeText(title)
    .split(' ')
    .filter(w => w.length > 2 && !stopWords.has(w));
}

function jaccardSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

function baseUrl(url: string): string {
  try {
    const u = new URL(url);
    // Keep query string but strip common tracking params
    const params = new URLSearchParams(u.search);
    const stripped = new URLSearchParams();
    for (const [key, value] of params) {
      const kl = key.toLowerCase();
      if (['utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'ref'].includes(kl)) continue;
      stripped.append(key, value);
    }
    const search = stripped.toString();
    return u.origin + u.pathname + (search ? '?' + search : '');
  } catch {
    return url.split('#')[0]!;
  }
}

function scoreEvent(event: GeneratedEvent): number {
  let score = 0;
  if (event.imageUrl) score += 3;
  if (event.description?.es?.length > 50) score += 2;
  if (event.price !== null && event.price !== undefined) score += 1;
  if (event.time && event.time !== 'Por confirmar') score += 1;
  if (event.venue && event.venue !== 'Granada') score += 1;
  if (['ticketmaster', 'eventbrite'].includes(event.source)) score += 1;
  return score;
}

function main() {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const events: GeneratedEvent[] = JSON.parse(raw);

  const duplicates: Array<{
    reason: string;
    eventA: GeneratedEvent;
    eventB: GeneratedEvent;
    kept: GeneratedEvent;
    removed: GeneratedEvent;
  }> = [];

  const keepers = new Map<string, GeneratedEvent>();

  for (const event of events) {
    let duplicateOf: GeneratedEvent | null = null;
    let reason = '';

    for (const [, candidate] of keepers) {
      // 1. Exact same specific URL (ignore generic listing pages)
      if (event.sourceUrl && candidate.sourceUrl) {
        const baseA = baseUrl(event.sourceUrl).toLowerCase();
        const baseB = baseUrl(candidate.sourceUrl).toLowerCase();
        // Only flag if URLs are identical and look like a specific event page
        const looksSpecific = /\d|id=|slug=|evento\/|conciertos\/|tickets\/|e\//i.test(baseA);
        const looksGeneric = /\beventosculturales\b|\bcalendario\b|\bagenda\b|\blistado\b/.test(baseA);
        if (baseA === baseB && baseA.length > 15 && looksSpecific && !looksGeneric) {
          duplicateOf = candidate;
          reason = 'misma URL especifica';
          break;
        }
      }

      // 2. Same normalized title + same date
      if (normalizeText(event.title.es) === normalizeText(candidate.title.es) && event.date === candidate.date) {
        duplicateOf = candidate;
        reason = 'mismo titulo normalizado + fecha';
        break;
      }

      // 3. Same date + time + venue (normalized)
      if (
        event.date === candidate.date &&
        event.time === candidate.time &&
        event.time !== 'Por confirmar' &&
        normalizeVenue(event.venue) === normalizeVenue(candidate.venue) &&
        normalizeVenue(event.venue).length > 2
      ) {
        duplicateOf = candidate;
        reason = 'misma fecha, hora y lugar normalizado';
        break;
      }

      // 4. Same date + venue + high title similarity
      if (
        event.date === candidate.date &&
        normalizeVenue(event.venue) === normalizeVenue(candidate.venue) &&
        normalizeVenue(event.venue).length > 2
      ) {
        const sim = jaccardSimilarity(titleWords(event.title.es), titleWords(candidate.title.es));
        if (sim >= 0.6) {
          duplicateOf = candidate;
          reason = `titulo similar (${Math.round(sim * 100)}%) + fecha + lugar`;
          break;
        }
      }

      // 5. Same slug (shouldn't happen, but check anyway)
      if (event.slug === candidate.slug) {
        duplicateOf = candidate;
        reason = 'mismo slug';
        break;
      }
    }

    if (duplicateOf) {
      const scoreA = scoreEvent(event);
      const scoreB = scoreEvent(duplicateOf);

      if (scoreA > scoreB) {
        // Replace the kept one with this better one
        keepers.delete(duplicateOf.id);
        keepers.set(event.id, event);
        duplicates.push({
          reason,
          eventA: event,
          eventB: duplicateOf,
          kept: event,
          removed: duplicateOf,
        });
      } else {
        duplicates.push({
          reason,
          eventA: event,
          eventB: duplicateOf,
          kept: duplicateOf,
          removed: event,
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
  console.log(`[OK] Duplicados encontrados y eliminados: ${duplicates.length}`);

  if (duplicates.length > 0) {
    console.log('\n========== DUPLICADOS DETALLADOS ==========');
    for (const dup of duplicates) {
      console.log(`\n[${dup.reason}]`);
      console.log(`  CONSERVADO: "${dup.kept.title.es}" (${dup.kept.source})`);
      console.log(`    -> ${dup.kept.date} ${dup.kept.time} | ${dup.kept.venue}`);
      console.log(`    -> ${dup.kept.sourceUrl ?? 'sin URL'}`);
      console.log(`  ELIMINADO:  "${dup.removed.title.es}" (${dup.removed.source})`);
      console.log(`    -> ${dup.removed.date} ${dup.removed.time} | ${dup.removed.venue}`);
      console.log(`    -> ${dup.removed.sourceUrl ?? 'sin URL'}`);
    }
    console.log('\n===========================================');
  } else {
    console.log('[OK] No se encontraron duplicados adicionales. Todos los eventos son unicos.');
  }
}

main();
