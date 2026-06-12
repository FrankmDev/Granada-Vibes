/* global document, Element, HTMLAnchorElement, URL, window */
type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: 'event', eventName: string, params?: AnalyticsEventParams) => void;
    grnTrackEvent?: (eventName: string, params?: AnalyticsEventParams) => void;
  }
}

function isExternalUrl(url: URL): boolean {
  return url.origin !== window.location.origin;
}

function contentTypeFromPath(pathname: string): string | undefined {
  if (/^\/(?:en\/guides|guias)\//.test(pathname)) return 'guide';
  if (/^\/(?:en\/events|eventos)\//.test(pathname)) return 'event';
  if (/^\/(?:en\/routes|rutas)\//.test(pathname)) return 'route';
  if (/^\/(?:en\/venues|salas)\//.test(pathname)) return 'venue';
  return undefined;
}

function contentIdFromPath(pathname: string): string {
  return pathname.split('/').filter(Boolean).at(-1) ?? 'home';
}

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackContentClick(anchor: HTMLAnchorElement, url: URL): void {
  const contentType = anchor.dataset.contentType ?? contentTypeFromPath(url.pathname);
  if (!contentType) return;

  trackEvent('select_content', {
    content_type: contentType,
    item_id: anchor.dataset.contentId ?? contentIdFromPath(url.pathname),
    link_url: url.pathname,
    link_text: anchor.textContent.replace(/\s+/g, ' ').trim().slice(0, 120),
  });
}

export function trackOutboundClick(anchor: HTMLAnchorElement, url: URL): void {
  trackEvent('outbound_click', {
    link_url: url.href,
    link_domain: url.hostname,
    link_text: anchor.textContent.replace(/\s+/g, ' ').trim().slice(0, 120),
  });
}

export function initAnalyticsTracking(): void {
  window.grnTrackEvent = trackEvent;

  const pageContentType = contentTypeFromPath(window.location.pathname);
  if (pageContentType) {
    trackEvent('view_item', {
      content_type: pageContentType,
      item_id: contentIdFromPath(window.location.pathname),
      page_location: window.location.href,
    });
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest('a');
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const rawHref = anchor.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#')) return;

    let url: URL;
    try {
      url = new URL(rawHref, window.location.origin);
    } catch {
      return;
    }

    if (anchor.dataset.track === 'generate_lead' || url.protocol === 'mailto:') {
      trackEvent('generate_lead', {
        method: url.protocol === 'mailto:' ? 'email' : 'link',
        link_url: url.href,
      });
      return;
    }

    if (anchor.dataset.track === 'click_ticket') {
      trackEvent('click_ticket', {
        link_url: url.href,
        link_domain: url.hostname,
      });
    }

    if (isExternalUrl(url)) {
      trackOutboundClick(anchor, url);
      return;
    }

    trackContentClick(anchor, url);
  });

}
