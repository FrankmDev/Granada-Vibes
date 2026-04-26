import { DAY_START_TIME } from './constants.js';

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const radius = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  return radius * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function toTimeString(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function addMinutes(time: string, minutes: number): string {
  return toTimeString(toMinutes(time) + minutes);
}

export function maxTime(...times: Array<string | null | undefined>): string {
  return times
    .filter((time): time is string => Boolean(time))
    .reduce((latest, current) => (toMinutes(current) > toMinutes(latest) ? current : latest), DAY_START_TIME);
}

export function minutesFromDayStart(time: string): number {
  return toMinutes(time) - toMinutes(DAY_START_TIME);
}

export function formatDuration(minutes: number, locale: 'es' | 'en'): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  if (locale === 'en') {
    if (hours === 0) return `${remainder} min`;
    if (remainder === 0) return `${hours} h`;
    return `${hours} h ${remainder} min`;
  }

  if (hours === 0) return `${remainder} min`;
  if (remainder === 0) return `${hours} h`;
  return `${hours} h ${remainder} min`;
}

export function formatCostRange(min: number, max: number, locale: 'es' | 'en'): string {
  if (max === 0) return locale === 'en' ? 'Free' : 'Gratuito';
  if (min === max) return `${min}€`;
  return `${min}€–${max}€`;
}

export function getPlanningDateInMadrid(): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formatter.format(new Date());
}

export function getWeekdayInMadrid(date: string): string {
  const normalized = `${date}T12:00:00+02:00`;
  const weekday = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid',
    weekday: 'long',
  }).format(new Date(normalized));

  return normalizeText(weekday);
}

export function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

export function stableReferenceCode(seed: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let hash = hashString(seed);
  let code = '';

  for (let index = 0; index < 6; index += 1) {
    code += chars[hash % chars.length] ?? 'X';
    hash = Math.floor(hash / chars.length);
  }

  return code;
}
