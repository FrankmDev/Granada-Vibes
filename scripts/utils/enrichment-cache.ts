import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const cacheDir = path.resolve(import.meta.dirname, '../.cache');
const cachePath = path.join(cacheDir, 'enrichment-cache.json');
const defaultTtlMs = 12 * 60 * 60 * 1000;

interface CacheEntry {
  body: string;
  fetchedAt: string;
}

type CacheStore = Record<string, CacheEntry>;

let store: CacheStore | null = null;

function loadStore(): CacheStore {
  if (store) return store;

  if (!existsSync(cachePath)) {
    store = {};
    return store;
  }

  try {
    const parsed: unknown = JSON.parse(readFileSync(cachePath, 'utf8'));
    store = parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed as CacheStore
      : {};
  } catch {
    store = {};
  }

  return store;
}

function saveStore(): void {
  if (!store) return;
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cachePath, JSON.stringify(store, null, 2) + '\n', 'utf8');
}

function getEntry(key: string, ttlMs: number): CacheEntry | null {
  const entry = loadStore()[key];
  if (!entry) return null;

  const fetchedAt = Date.parse(entry.fetchedAt);
  if (Number.isNaN(fetchedAt)) return null;
  if (Date.now() - fetchedAt > ttlMs) return null;

  return entry;
}

export async function fetchTextWithCache(
  url: string,
  fetcher: () => Promise<string>,
  options: { ttlMs?: number; fallbackToStale?: boolean } = {}
): Promise<string> {
  const ttlMs = options.ttlMs ?? defaultTtlMs;
  const fallbackToStale = options.fallbackToStale ?? true;
  const freshEntry = getEntry(url, ttlMs);

  if (freshEntry) return freshEntry.body;

  try {
    const body = await fetcher();
    loadStore()[url] = {
      body,
      fetchedAt: new Date().toISOString(),
    };
    saveStore();
    return body;
  } catch (error) {
    const staleEntry = loadStore()[url];
    if (fallbackToStale && staleEntry) {
      console.warn(`[cache] Usando detalle cacheado por fallo de red: ${url}`);
      return staleEntry.body;
    }
    throw error;
  }
}
