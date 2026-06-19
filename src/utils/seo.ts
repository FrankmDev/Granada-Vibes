import { DEFAULT_OG_IMAGE, SITE_CONFIG } from '@config/site';
import type { Locale } from '@types';
import {
  getEnglishPath,
  getSpanishPath,
  normalizePathname,
} from '../config/path-segments.mjs';

export function normalizeUrlPath(path: string): string {
  if (!path || path === '/') return '/';

  const [pathWithoutHash = '/'] = path.split('#');
  const [pathname = '/'] = pathWithoutHash.split('?');
  const normalizedPathname = normalizePathname(pathname);

  return normalizedPathname;
}

export function absoluteSiteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    const url = new URL(path);
    return `${SITE_CONFIG.url}${normalizeUrlPath(url.pathname)}`;
  }
  return `${SITE_CONFIG.url}${normalizeUrlPath(path)}`;
}

export function getAlternateUrls(path: string): Record<Locale, string> {
  return {
    es: absoluteSiteUrl(getSpanishPath(path)),
    en: absoluteSiteUrl(getEnglishPath(path)),
  };
}

export function shouldRenderAlternateUrls(path: string): boolean {
  const normalizedPath = normalizeUrlPath(path);
  if (normalizedPath.startsWith('/ai/')) return false;
  if (normalizedPath.startsWith('/artistas/') || normalizedPath.startsWith('/en/artists/')) return false;
  return true;
}

export function resolveOgImageUrl(image = DEFAULT_OG_IMAGE): string {
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (!image.startsWith('/')) return `${SITE_CONFIG.url}${DEFAULT_OG_IMAGE}`;
  return `${SITE_CONFIG.url}${image}`;
}
