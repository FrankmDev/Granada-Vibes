export function improveImageUrl(rawUrl: string | undefined): string | undefined {
  if (!rawUrl) return undefined;

  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed.startsWith('data:')) return undefined;

  try {
    const url = new URL(trimmed);

    // Eventbrite image URLs are signed. Changing q/w/auto can invalidate them
    // and return 403, so keep them exactly as the API provides.

    if (url.hostname === 'conciertos.club' || url.hostname === 'doc.conciertos.club') {
      url.pathname = url.pathname
        .replace('/doc/lp/', '/doc/l/')
        .replace(/_pp(?=\.)/i, '')
        .replace(/_p(?=\.)/i, '');
      return url.toString();
    }

    return url.toString();
  } catch {
    return trimmed;
  }
}
