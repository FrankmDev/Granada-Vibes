/**
 * Date formatting utilities
 */

/**
 * Format a date with locale-specific formatting
 */
export function formatDate(
  date: Date | string | number,
  locale: 'es' | 'en' = 'es',
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const localeString = locale === 'es' ? 'es-ES' : 'en-US';
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return d.toLocaleDateString(localeString, options ?? defaultOptions);
}

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
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours ?? 0, minutes ?? 0);
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
 * Check if a date is in the future
 */
export function isUpcoming(date: Date | string): boolean {
  const eventDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

/**
 * Sort array of items by date property
 */
export function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

/**
 * Sort array of items by date property (descending)
 */
export function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Format date range (start and end dates)
 */
export function formatDateRange(
  startDate: string,
  endDate: string,
  locale: 'es' | 'en' = 'es'
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const localeString = locale === 'es' ? 'es-ES' : 'en-US';
  
  // Same day
  if (start.toDateString() === end.toDateString()) {
    return start.toLocaleDateString(localeString, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  
  // Same month and year
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()} - ${end.toLocaleDateString(localeString, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;
  }
  
  // Different months
  return `${start.toLocaleDateString(localeString, {
    day: 'numeric',
    month: 'short',
  })} - ${end.toLocaleDateString(localeString, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`;
}

/**
 * Get days difference between two dates
 */
export function getDaysDifference(date1: Date | string, date2: Date | string): number {
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

/**
 * Get week start and end dates
 */
export function getWeekBounds(date: Date = new Date()): { start: Date; end: Date } {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  start.setDate(diff);
  
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
}

/**
 * Check if date is this weekend
 */
export function isThisWeekend(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Calculate days until Saturday
  const daysUntilSaturday = dayOfWeek === 0 ? 6 : 6 - dayOfWeek;
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + daysUntilSaturday);
  saturday.setHours(0, 0, 0, 0);
  
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + daysUntilSunday);
  sunday.setHours(23, 59, 59, 999);
  
  return d >= saturday && d <= sunday;
}

/**
 * Check if date is within this month
 */
export function isThisMonth(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
}
