const SPANISH_MONTHS: Record<string, number> = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
  ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
  jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
};

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Parse a Spanish date string into YYYY-MM-DD format.
 * Handles: "15 de marzo de 2026", "15 marzo 2026", "15/03/2026",
 * "Sábado 15 de marzo", "2026-03-15", "SÁBADO 9 DE MAYO 2026"
 */
export function parseSpanishDate(
  text: string,
  referenceYear?: number
): string | null {
  if (!text) return null;

  const cleaned = text
    .toLowerCase()
    .replace(/[.,]/g, '')
    .trim();

  // Already ISO: 2026-03-15
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return cleaned;

  // DD/MM/YYYY or DD-MM-YYYY
  const numericMatch = cleaned.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (numericMatch) {
    const [, d, m, y] = numericMatch;
    return `${y}-${pad(Number(m))}-${pad(Number(d))}`;
  }

  // Written date: "15 de marzo de 2026" or "15 marzo 2026" or "SÁBADO 9 DE MAYO 2026"
  // Strip weekday prefix
  const stripped = cleaned.replace(
    /^(lunes|martes|miércoles|miercoles|jueves|viernes|sábado|sabado|domingo)\s*,?\s*/,
    ''
  );

  // Match: day + month name + optional year
  const writtenMatch = stripped.match(
    /(\d{1,2})\s+(?:de\s+)?(\w+)\s*(?:de\s+)?(\d{4})?/
  );

  if (writtenMatch) {
    const [, dayStr, monthStr, yearStr] = writtenMatch;
    const monthNum = SPANISH_MONTHS[monthStr ?? ''];
    if (monthNum !== undefined) {
      const year = yearStr
        ? Number(yearStr)
        : referenceYear ?? new Date().getFullYear();
      return `${year}-${pad(monthNum + 1)}-${pad(Number(dayStr))}`;
    }
  }

  return null;
}

/**
 * Extract HH:MM from Spanish time strings.
 * Handles: "20:30h", "20.30", "21:00", "a las 20:30", "20:30 h."
 */
export function parseSpanishTime(text: string): string {
  if (!text) return 'Por confirmar';

  // Match HH:MM or HH.MM with optional h/h. suffix
  const match = text.match(/(\d{1,2})[:.h](\d{2})/);
  if (match) {
    return `${pad(Number(match[1]))}:${match[2]}`;
  }

  // Match standalone hour: "21h", "20 h"
  const hourOnly = text.match(/(\d{1,2})\s*h\.?\b/);
  if (hourOnly) {
    return `${pad(Number(hourOnly[1]))}:00`;
  }

  return 'Por confirmar';
}
