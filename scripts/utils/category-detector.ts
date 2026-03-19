type EventCategory =
  | 'concert'
  | 'exhibition'
  | 'festival'
  | 'market'
  | 'theater'
  | 'workshop'
  | 'guided-tour'
  | 'cinema'
  | 'other';

/**
 * Detect event category from Spanish text (title + description + tags).
 * Order matters: most specific patterns first.
 */
export function detectCategory(text: string): EventCategory {
  const t = text.toLowerCase();

  if (/\b(visita\s+guiada|recorrido\s+guiado|tour\s+guiado|free\s+tour)\b/.test(t)) {
    return 'guided-tour';
  }
  if (/\b(taller|workshop|clase|masterclass|curso)\b/.test(t)) {
    return 'workshop';
  }
  if (/\b(cine|cinema|película|film|screening|proyecci[oó]n|cortometraje)\b/.test(t)) {
    return 'cinema';
  }
  if (/\b(teatro|comedia|dramaturgia|mon[oó]logo|stand[- ]?up|circo|t[ií]teres|danza|ballet|[oó]pera|zarzuela|musical)\b/.test(t)) {
    return 'theater';
  }
  if (/\b(concierto|m[uú]sica en vivo|live music|recital|ac[uú]stico|gig|jam session|dj set)\b/.test(t)) {
    return 'concert';
  }
  if (/\b(festival|fest\b|fiesta mayor)\b/.test(t)) {
    return 'festival';
  }
  if (/\b(mercado|mercadillo|feria de|rastro|market)\b/.test(t)) {
    return 'market';
  }
  if (/\b(exposici[oó]n|muestra|galer[ií]a|instalaci[oó]n art[ií]stica|exhibici[oó]n)\b/.test(t)) {
    return 'exhibition';
  }

  return 'other';
}
