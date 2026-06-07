import { eventHubs } from '@data/seo/event-hubs.js';
import { getRoute } from '@utils/routes';
import type { Locale } from '@types';

export interface EventDiscoveryLink {
  id: string;
  href: string;
  eyebrow: string;
  label: string;
}

export function getEventDiscoveryLinks(
  locale: Locale,
  options?: { excludeId?: string; limit?: number },
): EventDiscoveryLink[] {
  let hubs = eventHubs;
  if (options?.excludeId) {
    hubs = hubs.filter((hub) => hub.id !== options.excludeId);
  }
  if (options?.limit !== undefined) {
    hubs = hubs.slice(0, options.limit);
  }

  const hubLinks = hubs.map((hub) => ({
    id: hub.id,
    href: locale === 'en' ? hub.englishPath : hub.spanishPath,
    eyebrow: hub.eyebrow[locale],
    label: hub.displayH1[locale],
  }));

  const evergreenLinks: EventDiscoveryLink[] = [
    {
      id: 'by-time',
      href: getRoute('byTime', locale),
      eyebrow: locale === 'en' ? 'Time plans' : 'Planes por tiempo',
      label: locale === 'en' ? 'BY TIME' : 'POR TIEMPO',
    },
    {
      id: 'planner',
      href: getRoute('planner', locale),
      eyebrow: locale === 'en' ? 'Trip planner' : 'Planificador',
      label: locale === 'en' ? 'PLAN' : 'PLANIFICA',
    },
  ];

  return [...hubLinks, ...evergreenLinks];
}
