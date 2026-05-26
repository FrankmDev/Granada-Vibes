import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
const distDir = path.join(rootDir, 'dist');
const sitemapPath = path.join(distDir, 'sitemap-0.xml');
const expectedOrigin = 'https://granadaurban.com';

function assertFileExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    throw new Error(`No existe ${path.relative(rootDir, filePath)}. Ejecuta bun run build antes de verificar.`);
  }
}

function getSitemapUrls(): Set<string> {
  assertFileExists(sitemapPath);
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = new Set<string>();
  const locPattern = /<loc>([^<]+)<\/loc>/g;

  for (const match of sitemapXml.matchAll(locPattern)) {
    const loc = match[1];
    if (loc) urls.add(loc);
  }

  return urls;
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

function main(): void {
  assertFileExists(distDir);

  const sitemapUrls = getSitemapUrls();
  const expectedEventUrls = new Set([
    ...getEventUrls('es'),
    ...getEventUrls('en'),
  ]);
  const sitemapEventUrls = getEventSitemapUrls(sitemapUrls);
  const wrongDomainUrls = Array.from(sitemapUrls).filter((url) => !url.startsWith(`${expectedOrigin}/`));
  const missingFromSitemap = diff(expectedEventUrls, sitemapEventUrls);
  const staleInSitemap = diff(sitemapEventUrls, expectedEventUrls);

  if (wrongDomainUrls.length > 0) {
    console.error('[FAIL] El sitemap contiene URLs con dominio incorrecto:');
    for (const url of wrongDomainUrls) console.error(`  - ${url}`);
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

  if (process.exitCode === 1) return;

  console.log(`[OK] Sitemap de eventos verificado: ${expectedEventUrls.size} URLs de eventos con dominio ${expectedOrigin}.`);
}

main();
