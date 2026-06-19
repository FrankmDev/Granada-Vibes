const FREE_PRICE_PATTERN = /\b(gratis|entrada libre|entrada gratuita|acceso libre|acceso gratuito|de balde|free entry)\b/i;

const PRICE_PATTERNS = [
  // Require explicit price context: "desde 20€" / "desde 20 €"
  /desde\s+(\d+)\s*€/i,
  // "a partir de 20€" / "a partir de 20 €"
  /a partir de\s+(\d+)\s*€/i,
  // "precio: 20€" / "precio 20€"
  /precio[\s:]+(\d+)\s*€/i,
  // "20€" with word boundary before digits (matches only € amounts, not numbers near € by accident)
  /(?<!\w)(\d+)\s*€/,
  // "20 euros" / "20 euro"
  /(?<!\w)(\d+)\s*euros?\b/i,
  // "20 eur"
  /(?<!\w)(\d+)\s*eur\b/i,
];

export function extractPriceFromText(text: string): number | null | undefined {
  if (!text.trim()) return undefined;

  if (FREE_PRICE_PATTERN.test(text)) {
    return null;
  }

  for (const pattern of PRICE_PATTERNS) {
    const match = text.match(pattern);
    const rawPrice = match?.[1];

    if (rawPrice) {
      return Number.parseInt(rawPrice, 10);
    }
  }

  return undefined;
}

export function getEventSearchableText(event: {
  description?: { es: string; en: string };
  longDescription?: { es: string; en: string };
}): string {
  return [
    event.description?.es,
    event.description?.en,
    event.longDescription?.es,
    event.longDescription?.en,
  ]
    .filter((value): value is string => Boolean(value))
    .join(' ');
}
