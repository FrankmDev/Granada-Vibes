#!/usr/bin/env bun
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { improveImageUrl } from './utils/image-quality.js';

const rootDir = path.resolve(import.meta.dirname, '..');
const generatedPath = path.join(rootDir, 'src/data/events/generated.json');
const outputDir = path.join(rootDir, 'src/assets/images/events');
// NOTE: AVIF is not available in this environment (Sharp built without
// libheif/libavif), so we use WebP as the best modern format.
const maxWidth = 1400;
const maxHeight = 1050;

interface EventRecord extends Record<string, unknown> {
  id?: string;
  slug?: string;
  imageUrl?: string;
}

function isEventRecord(value: unknown): value is EventRecord {
  return typeof value === 'object' && value !== null;
}

function isRemoteImage(url: string | undefined): url is string {
  return typeof url === 'string' && /^https?:\/\//.test(url);
}

function getCacheName(url: string): string {
  return `${createHash('sha256').update(url).digest('hex').slice(0, 20)}.webp`;
}

async function fetchImage(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url, {
    headers: {
      Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'Accept-Language': 'es-ES,es;q=0.9',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return response.arrayBuffer();
}

async function optimizeImage(url: string, filePath: string): Promise<void> {
  const buffer = Buffer.from(await fetchImage(url));

  await sharp(buffer, { failOn: 'none' })
    .rotate()
    .resize({
      width: maxWidth,
      height: maxHeight,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      // Maximum practical quality for source storage. At 95 we get excellent
      // visual fidelity; Astro will re-encode at the same quality at build time
      // so there is no generational loss.
      quality: 95,
      effort: 5,
      smartSubsample: true,
    })
    .toFile(filePath);
}

function loadEvents(): EventRecord[] {
  const parsed: unknown = JSON.parse(readFileSync(generatedPath, 'utf8'));
  if (!Array.isArray(parsed) || !parsed.every(isEventRecord)) {
    throw new Error('generated.json no contiene un array valido de eventos.');
  }
  return parsed;
}

function saveEvents(events: EventRecord[]): void {
  writeFileSync(generatedPath, JSON.stringify(events, null, 2) + '\n', 'utf8');
}

function cleanUnusedImages(usedFiles: Set<string>): number {
  if (!existsSync(outputDir)) return 0;

  let removed = 0;
  for (const file of readdirSync(outputDir)) {
    if (!file.endsWith('.webp')) continue;
    if (usedFiles.has(file)) continue;

    rmSync(path.join(outputDir, file));
    removed++;
  }

  return removed;
}

async function main(): Promise<void> {
  if (!existsSync(generatedPath)) {
    console.warn('[!] No existe generated.json. No hay imagenes que optimizar.');
    return;
  }

  mkdirSync(outputDir, { recursive: true });

  const events = loadEvents();
  const usedFiles = new Set<string>();
  let optimized = 0;
  let reused = 0;
  let failed = 0;

  for (const event of events) {
    const originalUrl = event.imageUrl;
    const improvedUrl = improveImageUrl(originalUrl);
    if (!isRemoteImage(improvedUrl)) {
      // Already a local filename (legacy /generated/events/ or new bare filename)
      if (typeof event.imageUrl === 'string') {
        const basename = path.basename(event.imageUrl);
        if (basename.endsWith('.webp') || basename.endsWith('.jpg') || basename.endsWith('.png') || basename.endsWith('.avif')) {
          usedFiles.add(basename);
        }
      }
      continue;
    }

    const fileName = getCacheName(improvedUrl);
    const filePath = path.join(outputDir, fileName);
    usedFiles.add(fileName);

    if (existsSync(filePath)) {
      event.imageUrl = fileName;
      reused++;
      continue;
    }

    try {
      await optimizeImage(improvedUrl, filePath);
      event.imageUrl = fileName;
      optimized++;
    } catch (error) {
      const shouldRetryOriginal = isRemoteImage(originalUrl) && originalUrl !== improvedUrl;
      if (shouldRetryOriginal) {
        try {
          const originalFileName = getCacheName(originalUrl);
          const originalFilePath = path.join(outputDir, originalFileName);
          usedFiles.add(originalFileName);
          await optimizeImage(originalUrl, originalFilePath);
          event.imageUrl = originalFileName;
          optimized++;
          continue;
        } catch {
          delete event.imageUrl;
        }
      } else {
        delete event.imageUrl;
      }
      failed++;
      const label = event.slug ?? event.id ?? improvedUrl;
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[img] No se pudo optimizar ${label}: ${message}`);
    }
  }

  const removed = cleanUnusedImages(usedFiles);
  saveEvents(events);

  console.log(
    `[OK] Imagenes de eventos: ${optimized} optimizadas, ${reused} reutilizadas, ${failed} fallidas, ${removed} antiguas eliminadas.`
  );
}

main().catch((error) => {
  console.error('[FAIL] Error optimizando imagenes de eventos:', error);
  process.exit(1);
});
