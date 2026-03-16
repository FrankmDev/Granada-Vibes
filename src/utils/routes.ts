import type { RouteDifficulty } from '@types';

export interface DifficultyConfig {
  label: { es: string; en: string };
  colorVar: string;
  textClass: string;
  bgClass: string;
  bars: number;
}

/**
 * Centralised difficulty configuration.
 * Use colorVar for inline styles (e.g., style={`color: ${config.colorVar}`}).
 * Use textClass / bgClass for Tailwind utility classes.
 */
export const difficultyConfig: Record<RouteDifficulty, DifficultyConfig> = {
  easy: {
    label:     { es: 'Fácil',    en: 'Easy' },
    colorVar:  'var(--color-difficulty-easy)',
    textClass: 'text-success',
    bgClass:   'bg-success/15',
    bars:      1,
  },
  moderate: {
    label:     { es: 'Moderada', en: 'Moderate' },
    colorVar:  'var(--color-difficulty-moderate)',
    textClass: 'text-[#d4873a]',
    bgClass:   'bg-[#d4873a]/15',
    bars:      2,
  },
  challenging: {
    label:     { es: 'Exigente', en: 'Challenging' },
    colorVar:  'var(--color-difficulty-hard)',
    textClass: 'text-error',
    bgClass:   'bg-error/15',
    bars:      3,
  },
};

/**
 * Render the 3-segment difficulty bar as a string.
 * e.g., easy → "■□□", moderate → "■■□", challenging → "■■■"
 */
export function getDifficultyBars(difficulty: RouteDifficulty): string {
  const filled = difficultyConfig[difficulty].bars;
  return Array.from({ length: 3 }, (_, i) => (i < filled ? '■' : '□')).join('');
}
