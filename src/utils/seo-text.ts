const BRAND_PATTERNS = [
  /\s*\|\s*GranadaUrban\s*$/i,
  /\s*\|\s*GRN\s+URBAN\s*$/i,
  /\s*[·•-]\s*GRN\s+URBAN\s*$/i,
];

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function stripTrailingBrand(value: string): string {
  return BRAND_PATTERNS.reduce((currentValue, pattern) => currentValue.replace(pattern, ''), value);
}

function truncateAtWord(value: string, maxLength: number): string {
  const cleanValue = collapseWhitespace(value);
  if (cleanValue.length <= maxLength) return cleanValue;

  const truncated = cleanValue.slice(0, Math.max(0, maxLength - 1)).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  const safeCut = lastSpace > Math.floor(maxLength * 0.55) ? truncated.slice(0, lastSpace) : truncated;
  return `${safeCut.replace(/[,:;.\s]+$/g, '').trim()}...`;
}

export function normalizeSeoTitle(title: string): string {
  return collapseWhitespace(stripTrailingBrand(title));
}

export function buildSeoTitle(title: string | undefined, siteName: string): string {
  const cleanTitle = normalizeSeoTitle(title ?? siteName);
  if (!cleanTitle || cleanTitle.toLowerCase() === siteName.toLowerCase()) return siteName;
  if (cleanTitle.toLowerCase().startsWith(`${siteName.toLowerCase()} |`)) return cleanTitle;

  const suffix = ` | ${siteName}`;
  const maxBaseLength = 68 - suffix.length;
  return `${truncateAtWord(cleanTitle, maxBaseLength)}${suffix}`;
}

export function clampMetaDescription(description: string, maxLength = 158): string {
  return truncateAtWord(description, maxLength);
}
