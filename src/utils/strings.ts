/**
 * Truncates a title to a maximum number of words, appending "..." if truncated.
 */
export function truncateTitle(title: string, maxWords = 9): string {
  const words = title.trim().split(/\s+/);
  if (words.length <= maxWords) return title;
  return words.slice(0, maxWords).join(' ') + '…';
}
