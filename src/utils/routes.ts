import type { RouteDifficulty } from '@types';
import { difficultyStyles } from '@config/ui';

export { difficultyStyles };

/**
 * Render the 3-segment difficulty bar as a string.
 * e.g., easy → "■□□", moderate → "■■□", challenging → "■■■"
 */
export function getDifficultyBars(difficulty: RouteDifficulty): string {
  const filled = difficultyStyles[difficulty].bars;
  return Array.from({ length: 3 }, (_, i) => (i < filled ? '■' : '□')).join('');
}
