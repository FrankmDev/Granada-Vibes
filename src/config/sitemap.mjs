/* global URL */
import { readFileSync } from 'fs';
import path from 'path';

const ROUTES_EXCLUDED_FROM_SITEMAP = [
  '/404/',
  '/aviso-legal/',
  '/en/legal/',
  '/privacidad/',
  '/en/privacy/',
];

const ROUTE_PREFIXES_EXCLUDED_FROM_SITEMAP = [
  '/ai/',
  '/artistas/',
  '/en/artists/',
];

const ES_TO_EN_SEGMENTS = {
  eventos: 'events',
  rutas: 'routes',
  guias: 'guides',
  'por-tiempo': 'by-time',
  privacidad: 'privacy',
  'aviso-legal': 'legal',
  colabora: 'collaborate',
  planifica: 'planifica',
  salas: 'venues',
  hoy: 'today',
  'este-fin-de-semana': 'this-weekend',
  conciertos: 'concerts',
  gratis: 'free',
};

const EN_TO_ES_SEGMENTS = Object.fromEntries(
  Object.entries(ES_TO_EN_SEGMENTS).map(([spanishSegment, englishSegment]) => [
    englishSegment,
    spanishSegment,
  ])
);

function normalizePathname(pathname) {
  if (pathname === '/') return pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function stripEnglishPrefix(pathname) {
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}

function translatePath(pathname, dictionary) {
  return normalizePathname(
    pathname
      .split('/')
      .map((segment) => dictionary[segment] ?? segment)
      .join('/')
  );
}

function getEnglishPath(pathname) {
  const translatedPath = translatePath(stripEnglishPrefix(pathname), ES_TO_EN_SEGMENTS);
  return normalizePathname(`/en${translatedPath === '/' ? '' : translatedPath}`);
}

function getSpanishPath(pathname) {
  return translatePath(stripEnglishPrefix(pathname), EN_TO_ES_SEGMENTS);
}

function getAlternateLinks(url) {
  const parsedUrl = new URL(url);
  const pathname = normalizePathname(parsedUrl.pathname);

  return [
    {
      lang: 'es',
      url: new URL(getSpanishPath(pathname), parsedUrl.origin).href,
    },
    {
      lang: 'en',
      url: new URL(getEnglishPath(pathname), parsedUrl.origin).href,
    },
  ];
}

function readPastEventSlugs(rootDir) {
  const pastEventSlugs = new Set();

  try {
    const generatedPath = path.join(rootDir, 'src/data/events/generated.json');
    const generatedEvents = JSON.parse(readFileSync(generatedPath, 'utf-8'));
    const today = new Date().toISOString().split('T')[0];

    if (!Array.isArray(generatedEvents) || !today) return pastEventSlugs;

    for (const event of generatedEvents) {
      if (!event || typeof event !== 'object') continue;

      const eventEndDate = typeof event.endDate === 'string' ? event.endDate : event.date;
      if (
        typeof eventEndDate === 'string' &&
        typeof event.slug === 'string' &&
        eventEndDate < today
      ) {
        pastEventSlugs.add(event.slug);
      }
    }
  } catch {
    return pastEventSlugs;
  }

  return pastEventSlugs;
}

function wordCount(value) {
  return String(value ?? '').trim().split(/\s+/).filter(Boolean).length;
}

function localizedWordCount(value) {
  if (!value || typeof value !== 'object') return 0;
  return Math.max(wordCount(value.es), wordCount(value.en));
}

function hasRepeatedShortCopy(value) {
  if (!value || typeof value !== 'object') return false;

  return [value.es, value.en].some((copy) => {
    const normalized = String(copy ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (normalized.length < 40) return false;

    const midpoint = Math.floor(normalized.length / 2);
    const left = normalized.slice(0, midpoint).trim();
    const right = normalized.slice(midpoint).trim();
    return left.length > 20 && left === right;
  });
}

function hasEditorialDepth(event) {
  if (localizedWordCount(event.description) >= 18 && !hasRepeatedShortCopy(event.description)) {
    return true;
  }

  if (localizedWordCount(event.longDescription) >= 40) {
    return true;
  }

  if (localizedWordCount(event.tips) >= 16) {
    return true;
  }

  return Math.max(event.highlights?.es?.length ?? 0, event.highlights?.en?.length ?? 0) >= 2;
}

function shouldIndexEvent(event, today) {
  if (event.seoIndex === 'never') return false;
  if (event.seoIndex === 'always') return true;

  const eventEndDate = typeof event.endDate === 'string' ? event.endDate : event.date;
  if (typeof eventEndDate !== 'string' || eventEndDate < today) return false;

  return hasEditorialDepth(event);
}

function readEventIndexability(rootDir) {
  const eventIndexability = new Map();

  try {
    const generatedPath = path.join(rootDir, 'src/data/events/generated.json');
    const overridesPath = path.join(rootDir, 'src/data/events/overrides.ts');
    const generatedEvents = JSON.parse(readFileSync(generatedPath, 'utf-8'));
    const overridesSource = readFileSync(overridesPath, 'utf-8');
    const overrideSlugs = new Set(
      Array.from(overridesSource.matchAll(/^\s*(?:'([^']+)'|([a-zA-Z][\w-]*)):\s*\{/gm))
        .map((match) => match[1] ?? match[2])
        .filter(Boolean)
    );
    const today = new Date().toISOString().split('T')[0];

    if (!Array.isArray(generatedEvents) || !today) return eventIndexability;

    for (const event of generatedEvents) {
      if (!event || typeof event !== 'object' || typeof event.slug !== 'string') continue;
      if (overrideSlugs.has(event.slug)) {
        eventIndexability.set(event.slug, shouldIndexEvent({ ...event, seoIndex: 'always' }, today));
        continue;
      }
      eventIndexability.set(event.slug, shouldIndexEvent(event, today));
    }
  } catch {
    return eventIndexability;
  }

  return eventIndexability;
}

const VENUE_ALIASES = {
  'sala industrial copera': { slug: 'industrial-copera', name: 'Industrial Copera' },
  'industrial copera': { slug: 'industrial-copera', name: 'Industrial Copera' },
  'el tren': { slug: 'sala-el-tren', name: 'Sala El Tren' },
  'sala el tren': { slug: 'sala-el-tren', name: 'Sala El Tren' },
  'plaza de toros': { slug: 'plaza-de-toros-granada', name: 'Plaza de Toros de Granada' },
  'plaza de toros de granada': { slug: 'plaza-de-toros-granada', name: 'Plaza de Toros de Granada' },
  'palacio de congresos de granada': { slug: 'palacio-de-congresos-granada', name: 'Palacio de Congresos de Granada' },
  'palacio de congresos': { slug: 'palacio-de-congresos-granada', name: 'Palacio de Congresos de Granada' },
  'hotel monasterio granada adults only': { slug: 'hotel-monasterio-granada', name: 'Hotel Monasterio Granada' },
  'hotel monasterio granada': { slug: 'hotel-monasterio-granada', name: 'Hotel Monasterio Granada' },
  'pl. de bib-rambla, 6': { slug: 'plaza-bib-rambla-granada', name: 'Plaza Bib-Rambla' },
  'pl de bib-rambla 6': { slug: 'plaza-bib-rambla-granada', name: 'Plaza Bib-Rambla' },
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function normalizeLookup(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getVenueSlug(venue) {
  const alias = VENUE_ALIASES[normalizeLookup(venue)];
  return alias?.slug ?? slugify(venue).replace(/^sala-/, '');
}

function incrementCount(map, key) {
  if (!key) return;
  map.set(key, (map.get(key) ?? 0) + 1);
}

function readDirectorySitemapSignals(rootDir) {
  const venueCounts = new Map();

  try {
    const generatedPath = path.join(rootDir, 'src/data/events/generated.json');
    const generatedEvents = JSON.parse(readFileSync(generatedPath, 'utf-8'));
    const today = new Date().toISOString().split('T')[0];

    if (!Array.isArray(generatedEvents) || !today) {
      return { venueCounts };
    }

    for (const event of generatedEvents) {
      if (!event || typeof event !== 'object' || event.seoIndex === 'never') continue;

      const eventEndDate = typeof event.endDate === 'string' ? event.endDate : event.date;
      if (typeof eventEndDate !== 'string' || eventEndDate < today) continue;

      if (typeof event.venue === 'string') {
        incrementCount(venueCounts, getVenueSlug(event.venue));
      }
    }
  } catch {
    return { venueCounts };
  }

  return { venueCounts };
}

function getSitemapMeta(url, pastEventSlugs, directorySignals) {
  const pathname = normalizePathname(new URL(url).pathname);
  const today = new Date().toISOString().split('T')[0];

  if (pathname === '/' || pathname === '/en/') {
    return { priority: 1.0, changefreq: 'daily', lastmod: today };
  }

  if (pathname === '/eventos/' || pathname === '/en/events/') {
    return { priority: 0.9, changefreq: 'daily', lastmod: today };
  }

  if (
    pathname === '/eventos/hoy/' ||
    pathname === '/eventos/este-fin-de-semana/' ||
    pathname === '/eventos/conciertos/' ||
    pathname === '/eventos/gratis/' ||
    pathname === '/en/events/today/' ||
    pathname === '/en/events/this-weekend/' ||
    pathname === '/en/events/concerts/' ||
    pathname === '/en/events/free/'
  ) {
    return { priority: 0.85, changefreq: 'daily', lastmod: today };
  }

  if (
    pathname === '/rutas/' ||
    pathname === '/en/routes/' ||
    pathname === '/guias/' ||
    pathname === '/en/guides/' ||
    pathname === '/salas/' ||
    pathname === '/en/venues/' ||
    pathname === '/rutas/por-tiempo/' ||
    pathname === '/en/routes/by-time/'
  ) {
    return { priority: 0.8, changefreq: 'weekly', lastmod: today };
  }

  if (
    pathname === '/planifica/' ||
    pathname === '/en/planifica/' ||
    pathname === '/colabora/' ||
    pathname === '/en/collaborate/'
  ) {
    return { priority: 0.7, changefreq: 'monthly' };
  }

  if (
    pathname === '/guias/corpus-granada-2026/' ||
    pathname === '/en/guides/corpus-granada-2026/'
  ) {
    return { priority: 0.9, changefreq: 'daily', lastmod: today };
  }

  const eventMatch = pathname.match(/^\/(?:en\/events|eventos)\/([^/]+)\/$/);
  if (eventMatch) {
    const slug = eventMatch[1];
    return pastEventSlugs.has(slug)
      ? { priority: 0.3, changefreq: 'yearly', lastmod: today }
      : { priority: 0.72, changefreq: 'daily', lastmod: today };
  }

  if (pathname.match(/^\/(?:en\/routes|rutas)\/[^/]+\/$/)) {
    return { priority: 0.6, changefreq: 'monthly' };
  }

  if (pathname.match(/^\/(?:en\/venues|salas)\/[^/]+\/$/)) {
    const slug = pathname.split('/').filter(Boolean).at(-1);
    const eventCount = slug ? directorySignals.venueCounts.get(slug) ?? 0 : 0;
    return {
      priority: eventCount >= 3 ? 0.68 : 0.5,
      changefreq: eventCount >= 2 ? 'weekly' : 'monthly',
      lastmod: eventCount >= 2 ? today : undefined,
    };
  }

  if (pathname.match(/^\/(?:en\/guides|guias)\/[^/]+\/$/)) {
    return { priority: 0.6, changefreq: 'monthly' };
  }

  if (pathname.match(/^\/(?:en\/routes\/by-time|rutas\/por-tiempo)\/[^/]+\/$/)) {
    return { priority: 0.55, changefreq: 'monthly' };
  }

  return { priority: 0.5, changefreq: 'monthly' };
}

function shouldIndexPage(page, pastEventSlugs, directorySignals, eventIndexability) {
  const pathname = normalizePathname(new URL(page).pathname);
  if (ROUTES_EXCLUDED_FROM_SITEMAP.includes(pathname)) return false;
  if (ROUTE_PREFIXES_EXCLUDED_FROM_SITEMAP.some((prefix) => pathname.startsWith(prefix))) {
    return false;
  }

  const eventMatch = pathname.match(/^\/(?:en\/events|eventos)\/([^/]+)\/$/);
  if (eventMatch) {
    const slug = eventMatch[1];
    if (eventIndexability.has(slug)) return eventIndexability.get(slug) === true;
    return !pastEventSlugs.has(slug);
  }

  const venueMatch = pathname.match(/^\/(?:en\/venues|salas)\/([^/]+)\/$/);
  if (venueMatch) {
    const slug = venueMatch[1];
    return slug ? (directorySignals.venueCounts.get(slug) ?? 0) >= 2 : false;
  }

  return true;
}

export function createSitemapConfig(rootDir) {
  const pastEventSlugs = readPastEventSlugs(rootDir);
  const directorySignals = readDirectorySitemapSignals(rootDir);
  const eventIndexability = readEventIndexability(rootDir);

  return {
    filter: (page) => shouldIndexPage(page, pastEventSlugs, directorySignals, eventIndexability),
    serialize(item) {
      const meta = getSitemapMeta(item.url, pastEventSlugs, directorySignals);
      return {
        ...item,
        changefreq: meta.changefreq,
        priority: meta.priority,
        lastmod: meta.lastmod,
        links: getAlternateLinks(item.url),
      };
    },
  };
}
