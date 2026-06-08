/**
 * Short labels for on-page heroes and section headers.
 * Long SEO copy belongs in BaseLayout `title` / meta description only.
 */
export function compactDisplayTitle(value: string, maxLength = 22): string {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed.toUpperCase();

  const withoutCity = trimmed
    .replace(/\s+de\s+granada$/i, '')
    .replace(/\s+granada$/i, '')
    .trim();

  if (withoutCity.length <= maxLength) return withoutCity.toUpperCase();

  const truncated = withoutCity.slice(0, maxLength).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 10) return truncated.slice(0, lastSpace).toUpperCase();

  return truncated.toUpperCase();
}

export function venueDisplayTitle(name: string): string {
  return compactDisplayTitle(name, 24);
}
