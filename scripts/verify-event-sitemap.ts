import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
const distDir = path.join(rootDir, 'dist');
const sitemapPath = path.join(distDir, 'sitemap-0.xml');
const generatedEventsPath = path.join(rootDir, 'src/data/events/generated.json');
const expectedOrigin = 'https://granadaurban.com';
const today = new Date().toISOString().split('T')[0];

function assertFileExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    throw new Error(`No existe ${path.relative(rootDir, filePath)}. Ejecuta bun run build antes de verificar.`);
  }
}

function getSitemapXml(): string {
  assertFileExists(sitemapPath);
  return fs.readFileSync(sitemapPath, 'utf8');
}

function getSitemapUrls(sitemapXml: string): Set<string> {
  const urls = new Set<string>();
  const locPattern = /<loc>([^<]+)<\/loc>/g;

  for (const match of sitemapXml.matchAll(locPattern)) {
    const loc = match[1];
    if (loc) urls.add(loc);
  }

  return urls;
}

function getHreflangUrls(sitemapXml: string): string[] {
  return Array.from(sitemapXml.matchAll(/hreflang="[^"]+" href="([^"]+)"/g))
    .map((match) => match[1])
    .filter((url): url is string => Boolean(url));
}

function getEventUrls(locale: 'es' | 'en'): Set<string> {
  const basePath = locale === 'es'
    ? path.join(distDir, 'eventos')
    : path.join(distDir, 'en/events');
  const urlPrefix = locale === 'es'
    ? `${expectedOrigin}/eventos`
    : `${expectedOrigin}/en/events`;
  const urls = new Set<string>();

  assertFileExists(basePath);

  for (const entry of fs.readdirSync(basePath, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === 'index') continue;

    const indexPath = path.join(basePath, entry.name, 'index.html');
    if (fs.existsSync(indexPath)) {
      urls.add(`${urlPrefix}/${entry.name}/`);
    }
  }

  return urls;
}

function diff(left: Set<string>, right: Set<string>): string[] {
  return Array.from(left).filter((item) => !right.has(item)).sort();
}

function getEventSitemapUrls(sitemapUrls: Set<string>): Set<string> {
  return new Set(
    Array.from(sitemapUrls).filter((url) => {
      const isSpanishEventDetail = url.startsWith(`${expectedOrigin}/eventos/`) &&
        url !== `${expectedOrigin}/eventos/`;
      const isEnglishEventDetail = url.startsWith(`${expectedOrigin}/en/events/`) &&
        url !== `${expectedOrigin}/en/events/`;

      return isSpanishEventDetail || isEnglishEventDetail;
    })
  );
}

function hasQueryString(url: string): boolean {
  return new URL(url).search.length > 0;
}

function urlToHtmlPath(url: string): string {
  const { pathname } = new URL(url);
  const normalizedPath = pathname === '/' ? '/index.html' : `${pathname.replace(/\/$/, '')}/index.html`;
  return path.join(distDir, normalizedPath);
}

function getMetaRobots(html: string): string {
  return html.match(/<meta name="robots" content="([^"]+)"/i)?.[1] ?? '';
}

function getCanonicalUrl(html: string): string {
  return html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? '';
}

function getSitemapHtmlIssues(sitemapUrls: Set<string>): { noindexUrls: string[]; canonicalMismatchUrls: string[]; missingHtmlUrls: string[] } {
  const noindexUrls: string[] = [];
  const canonicalMismatchUrls: string[] = [];
  const missingHtmlUrls: string[] = [];

  for (const url of sitemapUrls) {
    const htmlPath = urlToHtmlPath(url);
    if (!fs.existsSync(htmlPath)) {
      missingHtmlUrls.push(url);
      continue;
    }

    const html = fs.readFileSync(htmlPath, 'utf8');
    const robots = getMetaRobots(html);
    const canonical = getCanonicalUrl(html);

    if (/noindex/i.test(robots)) {
      noindexUrls.push(url);
    }

    if (canonical && canonical !== url) {
      canonicalMismatchUrls.push(`${url} -> ${canonical}`);
    }
  }

  return { noindexUrls, canonicalMismatchUrls, missingHtmlUrls };
}

function getPastGeneratedEventSlugs(): string[] {
  assertFileExists(generatedEventsPath);
  if (!today) return [];

  const rawEvents: unknown = JSON.parse(fs.readFileSync(generatedEventsPath, 'utf8'));
  if (!Array.isArray(rawEvents)) return [];

  return rawEvents
    .filter((event): event is { slug: string; date: string; endDate?: string } => {
      if (!event || typeof event !== 'object') return false;
      const candidate = event as Record<string, unknown>;
      return typeof candidate.slug === 'string' &&
        typeof candidate.date === 'string' &&
        (candidate.endDate === undefined || typeof candidate.endDate === 'string');
    })
    .filter((event) => (event.endDate ?? event.date) < today)
    .map((event) => event.slug)
    .sort();
}

function main(): void {
  assertFileExists(distDir);

  const sitemapXml = getSitemapXml();
  const sitemapUrls = getSitemapUrls(sitemapXml);
  const hreflangUrls = getHreflangUrls(sitemapXml);
  const expectedEventUrls = new Set([
    ...getEventUrls('es'),
    ...getEventUrls('en'),
  ]);
  const sitemapEventUrls = getEventSitemapUrls(sitemapUrls);
  const allSitemapUrls = [...Array.from(sitemapUrls), ...hreflangUrls];
  const wrongDomainUrls = allSitemapUrls.filter((url) => !url.startsWith(`${expectedOrigin}/`));
  const queryUrls = allSitemapUrls.filter(hasQueryString);
  const pastGeneratedEventSlugs = getPastGeneratedEventSlugs();
  const missingFromSitemap = diff(expectedEventUrls, sitemapEventUrls);
  const staleInSitemap = diff(sitemapEventUrls, expectedEventUrls);
  const sitemapHtmlIssues = getSitemapHtmlIssues(sitemapUrls);

  if (wrongDomainUrls.length > 0) {
    console.error('[FAIL] El sitemap contiene URLs con dominio incorrecto:');
    for (const url of wrongDomainUrls) console.error(`  - ${url}`);
    process.exitCode = 1;
  }

  if (queryUrls.length > 0) {
    console.error('[FAIL] El sitemap contiene URLs con query string:');
    for (const url of queryUrls) console.error(`  - ${url}`);
    process.exitCode = 1;
  }

  if (pastGeneratedEventSlugs.length > 0) {
    console.error('[FAIL] El dataset generado contiene eventos pasados no limpiados:');
    for (const slug of pastGeneratedEventSlugs) console.error(`  - ${slug}`);
    process.exitCode = 1;
  }

  if (missingFromSitemap.length > 0) {
    console.error('[FAIL] Hay páginas de eventos generadas que no están en el sitemap:');
    for (const url of missingFromSitemap) console.error(`  - ${url}`);
    process.exitCode = 1;
  }

  if (staleInSitemap.length > 0) {
    console.error('[FAIL] Hay URLs de eventos en el sitemap que ya no tienen página generada:');
    for (const url of staleInSitemap) console.error(`  - ${url}`);
    process.exitCode = 1;
  }

  if (sitemapHtmlIssues.missingHtmlUrls.length > 0) {
    console.error('[FAIL] El sitemap contiene URLs sin HTML generado:');
    for (const url of sitemapHtmlIssues.missingHtmlUrls) console.error(`  - ${url}`);
    process.exitCode = 1;
  }

  if (sitemapHtmlIssues.noindexUrls.length > 0) {
    console.error('[FAIL] El sitemap contiene URLs marcadas como noindex:');
    for (const url of sitemapHtmlIssues.noindexUrls) console.error(`  - ${url}`);
    process.exitCode = 1;
  }

  if (sitemapHtmlIssues.canonicalMismatchUrls.length > 0) {
    console.error('[FAIL] El sitemap contiene URLs cuyo canonical apunta a otra URL:');
    for (const url of sitemapHtmlIssues.canonicalMismatchUrls) console.error(`  - ${url}`);
    process.exitCode = 1;
  }

  if (process.exitCode === 1) return;

  console.log(`[OK] Sitemap SEO verificado: ${expectedEventUrls.size} URLs de eventos, dominio ${expectedOrigin}, sin query params, noindex, canonicals cruzados ni eventos generados pasados.`);
}

main();
