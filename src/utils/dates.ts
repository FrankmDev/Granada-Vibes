/**
 * Date formatting utilities
 */

/**
 * Format date in short format (day + short month)
 */
export function formatDateShort(
  date: Date | string | number,
  locale: 'es' | 'en' = 'es'
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const localeString = locale === 'es' ? 'es-ES' : 'en-US';

  return d.toLocaleDateString(localeString, {
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Format time string (HH:MM) to locale-specific format
 */
export function formatTime(
  time: string,
  locale: 'es' | 'en' = 'es'
): string {
  if (!time || !/^\d{1,2}:\d{2}$/.test(time)) {
    return locale === 'es' ? 'Por confirmar' : 'TBC';
  }

  const [hours, minutos] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours ?? 0, minutos ?? 0);
  const localeString = locale === 'es' ? 'es-ES' : 'en-US';

  return date.toLocaleTimeString(localeString, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format duration in minutes to human-readable string
 */
export function formatDuration(minutes: number, locale: 'es' | 'en' = 'es'): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return locale === 'es' ? `${hours} h` : `${hours}h`;
  }

  return locale === 'es'
    ? `${hours} h ${mins} min`
    : `${hours}h ${mins}min`;
}

/**
 * Format distance in kilometers to human-readable string
 */
export function formatDistance(km: number, locale: 'es' | 'en' = 'es'): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return locale === 'es'
    ? `${km.toFixed(1)} km`
    : `${km.toFixed(1)}km`;
}

/**
 * Get days difference between two dates
 */
function getDaysDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  const diffTime = d1.getTime() - d2.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get temporal proximity badge for an event
 * Returns: 'today' | 'tomorrow' | 'this-week' | 'future' | null
 */
export function getTemporalProximity(date: string | Date): 'today' | 'tomorrow' | 'this-week' | 'future' | null {
  const eventDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysDiff = getDaysDifference(eventDate, today);

  if (daysDiff === 0) return 'today';
  if (daysDiff === 1) return 'tomorrow';
  if (daysDiff >= 2 && daysDiff <= 7) return 'this-week';
  if (daysDiff > 7) return 'future';
  return null;
}

/**
 * Format full date with weekday (e.g., "Viernes, 20 de junio de 2025")
 */
export function formatFullDate(date: string | Date, locale: 'es' | 'en' = 'es'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const localeString = locale === 'es' ? 'es-ES' : 'en-US';

  return d.toLocaleDateString(localeString, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
