import * as cheerio from 'cheerio';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

interface FetchOptions {
  timeout?: number;
  retries?: number;
  delay?: number;
}

export async function fetchHTML(
  url: string,
  options: FetchOptions = {}
): Promise<cheerio.CheerioAPI> {
  const { timeout = 15_000, retries = 2, delay = 1000 } = options;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          'Accept-Language': 'es-ES,es;q=0.9',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const html = await response.text();
      return cheerio.load(html);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delay * (attempt + 1)));
      }
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
}

export async function fetchText(
  url: string,
  options: FetchOptions = {}
): Promise<string> {
  const { timeout = 15_000, retries = 2, delay = 1000 } = options;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          'Accept-Language': 'es-ES,es;q=0.9',
        },
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      return await response.text();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delay * (attempt + 1)));
      }
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
}
