import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

interface SeoIssue {
  type: 'title' | 'description' | 'h1' | 'canonical' | 'schema' | 'og';
  path: string;
  detail: string;
}

const DIST_DIR = join(process.cwd(), 'dist');
const TITLE_MIN = 25;
const TITLE_MAX = 70;
const DESCRIPTION_MIN = 80;
const DESCRIPTION_MAX = 170;

function walkHtmlFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const filePath = join(dir, entry);
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      walkHtmlFiles(filePath, out);
    } else if (filePath.endsWith('.html')) {
      out.push(filePath);
    }
  }
  return out;
}

function routePath(filePath: string): string {
  const path = `/${relative(DIST_DIR, filePath)
    .replace(/\\/g, '/')
    .replace(/index\.html$/, '')
    .replace(/\.html$/, '')}`;
  return path === '/' ? path : path.replace(/\/$/, '/');
}

function contentMatch(html: string, pattern: RegExp): string {
  return html.match(pattern)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
}

function isNoindex(html: string): boolean {
  return /<meta name="robots" content="noindex,\s*nofollow"/i.test(html);
}

function scanFile(filePath: string): SeoIssue[] {
  const html = readFileSync(filePath, 'utf-8');
  if (isNoindex(html)) return [];

  const path = routePath(filePath);
  const title = contentMatch(html, /<title>(.*?)<\/title>/s);
  const description = contentMatch(html, /<meta name="description" content="([^"]*)"/);
  const h1Count = Array.from(html.matchAll(/<h1\b[^>]*>/g)).length;
  const canonical = contentMatch(html, /<link rel="canonical" href="([^"]*)"/);
  const ogImage = contentMatch(html, /<meta property="og:image" content="([^"]*)"/);
  const schemaCount = Array.from(html.matchAll(/<script type="application\/ld\+json"[^>]*>/g)).length;
  const issues: SeoIssue[] = [];

  if (!title || title.length < TITLE_MIN || title.length > TITLE_MAX) {
    issues.push({ type: 'title', path, detail: `${title.length} chars: ${title}` });
  }
  if (!description || description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
    issues.push({ type: 'description', path, detail: `${description.length} chars: ${description}` });
  }
  if (h1Count !== 1) {
    issues.push({ type: 'h1', path, detail: `${h1Count} h1 tags` });
  }
  if (!canonical) {
    issues.push({ type: 'canonical', path, detail: 'Missing canonical URL' });
  }
  if (!ogImage || ogImage.includes('placehold.co')) {
    issues.push({ type: 'og', path, detail: ogImage || 'Missing og:image' });
  }
  if (schemaCount === 0) {
    issues.push({ type: 'schema', path, detail: 'Missing JSON-LD schema' });
  }

  return issues;
}

if (!existsSync(DIST_DIR)) {
  console.error('dist/ does not exist. Run `bun run build:static` first.');
  process.exit(1);
}

const issues = walkHtmlFiles(DIST_DIR).flatMap(scanFile);
const grouped = issues.reduce<Record<SeoIssue['type'], number>>((acc, issue) => {
  acc[issue.type] = (acc[issue.type] ?? 0) + 1;
  return acc;
}, {} as Record<SeoIssue['type'], number>);

console.log(JSON.stringify({
  pagesScanned: walkHtmlFiles(DIST_DIR).length,
  issueCounts: grouped,
  issues: issues.slice(0, 80),
}, null, 2));

if (issues.length > 0) {
  process.exitCode = 1;
}
