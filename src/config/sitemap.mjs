import { readFileSync } from 'fs';
import path from 'path';

const ROUTES_EXCLUDED_FROM_SITEMAP = [
  '/404/',
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
  artistas: 'artists',
  hoy: 'today',
  'este-fin-de-semana': 'this-weekend',
  'conciertos-granada': 'granada-concerts',
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

const VENUE_ALIASES = {
  'sala industrial copera': { slug: 'industrial-copera', name: 'Industrial Copera' },
  'industrial copera': { slug: 'industrial-copera', name: 'Industrial Copera' },
  'el tren': { slug: 'sala-el-tren', name: 'Sala El Tren' },
  'sala el tren': { slug: 'sala-el-tren', name: 'Sala El Tren' },
  'plaza de toros': { slug: 'plaza-de-toros-granada', name: 'Plaza de Toros de Granada' },
  'plaza de toros de granada': { slug: 'plaza-de-toros-granada', name: 'Plaza de Toros de Granada' },
  'palacio de congresos de granada': { slug: 'palacio-de-congresos-granada', name: 'Palacio de Congresos de Granada' },
  'palacio de congresos': { slug: 'palacio-de-congresos-granada', name: 'Palacio de Congresos de Granada' },
};

const ARTIST_PREFIX_PATTERN = /^(?:1001 músicas\s*-\s*caixabank|milnoff|dee fest)\s*[:|]\s*/i;

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

function getArtistSlug(event) {
  const title = typeof event?.title?.es === 'string' ? event.title.es : '';
  const performer = typeof event?.performer?.es === 'string' ? event.performer.es.trim() : '';
  const raw = performer.length > 0 ? performer : title;

  const name = raw
    .replace(ARTIST_PREFIX_PATTERN, '')
    .replace(/\s+en\s+granada$/i, '')
    .replace(/\s+\|\s+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/[.。]+$/g, '')
    .trim();

  return name ? slugify(name) : '';
}

function incrementCount(map, key) {
  if (!key) return;
  map.set(key, (map.get(key) ?? 0) + 1);
}

function readDirectorySitemapSignals(rootDir) {
  const artistCounts = new Map();
  const venueCounts = new Map();

  try {
    const generatedPath = path.join(rootDir, 'src/data/events/generated.json');
    const generatedEvents = JSON.parse(readFileSync(generatedPath, 'utf-8'));
    const today = new Date().toISOString().split('T')[0];

    if (!Array.isArray(generatedEvents) || !today) {
      return { artistCounts, venueCounts };
    }

    for (const event of generatedEvents) {
      if (!event || typeof event !== 'object' || event.seoIndex === 'never') continue;

      const eventEndDate = typeof event.endDate === 'string' ? event.endDate : event.date;
      if (typeof eventEndDate !== 'string' || eventEndDate < today) continue;

      if (typeof event.venue === 'string') {
        incrementCount(venueCounts, getVenueSlug(event.venue));
      }

      if (event.category === 'concert') {
        incrementCount(artistCounts, getArtistSlug(event));
      }
    }
  } catch {
    return { artistCounts, venueCounts };
  }

  return { artistCounts, venueCounts };
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
    pathname === '/eventos/conciertos-granada/' ||
    pathname === '/eventos/gratis/' ||
    pathname === '/en/events/today/' ||
    pathname === '/en/events/this-weekend/' ||
    pathname === '/en/events/granada-concerts/' ||
    pathname === '/en/events/free/'
  ) {
    return { priority: 0.85, changefreq: 'daily', lastmod: today };
  }

  if (
    pathname === '/rutas/' ||
    pathname === '/en/routes/' ||
    pathname === '/guias/' ||
    pathname === '/en/guides/' ||
    pathname === '/artistas/' ||
    pathname === '/en/artists/' ||
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

  if (pathname.match(/^\/(?:en\/artists|artistas)\/[^/]+\/$/)) {
    const slug = pathname.split('/').filter(Boolean).at(-1);
    const eventCount = slug ? directorySignals.artistCounts.get(slug) ?? 0 : 0;
    return {
      priority: eventCount >= 2 ? 0.62 : 0.45,
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

function shouldIndexPage(page, pastEventSlugs, directorySignals) {
  const pathname = normalizePathname(new URL(page).pathname);
  if (ROUTES_EXCLUDED_FROM_SITEMAP.includes(pathname)) return false;

  const eventMatch = pathname.match(/^\/(?:en\/events|eventos)\/([^/]+)\/$/);
  if (eventMatch) {
    const slug = eventMatch[1];
    return !pastEventSlugs.has(slug);
  }

  const artistMatch = pathname.match(/^\/(?:en\/artists|artistas)\/([^/]+)\/$/);
  if (artistMatch) {
    const slug = artistMatch[1];
    return slug ? (directorySignals.artistCounts.get(slug) ?? 0) >= 2 : false;
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

  return {
    filter: (page) => shouldIndexPage(page, pastEventSlugs, directorySignals),
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
