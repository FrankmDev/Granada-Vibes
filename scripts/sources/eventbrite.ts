export interface EventbriteEvent {
  id: string;
  name: string;
  summary: string;
  url: string;
  tickets_url: string;
  start_date: string;       // "2026-04-15"
  start_time: string;       // "20:30"
  end_date: string;
  end_time: string;
  is_online_event: boolean;
  is_cancelled?: boolean;
  is_free?: boolean;
  ticket_price?: {
    min: number;
    max: number;
    currency: string;
  };
  tags?: Array<{
    prefix: string;
    tag: string;
    display_name: string;
  }>;
  primary_venue?: {
    name: string;
    venue_profile_id: string | null;
    address?: {
      city: string;
      localized_address_display: string;
    };
  } | null;
  image?: {
    url: string;
  } | null;
  eventbrite_event_id?: string;
}

interface EventbriteSearchResponse {
  events: {
    results: EventbriteEvent[];
    pagination: {
      object_count: number;
      page_size: number;
      continuation: string;
    };
  };
}

interface EventbriteDetailResponse {
  logo?: {
    url?: string;
    original?: {
      url?: string;
    };
  } | null;
  is_free?: boolean;
  ticket_availability?: {
    has_available_tickets?: boolean;
    minimum_ticket_price?: {
      value: number;
      major_value: string;
      currency: string;
    };
    maximum_ticket_price?: {
      value: number;
      major_value: string;
      currency: string;
    };
  };
  ticket_classes?: Array<{
    cost?: {
      value: number;
      major_value: string;
      currency: string;
    };
    free?: boolean;
    name?: string;
  }>;
  description?: {
    text?: string;
    html?: string;
  };
}

async function enrichEventbriteEvent(
  token: string,
  event: EventbriteEvent
): Promise<void> {
  try {
    const eventId = event.eventbrite_event_id ?? event.id;
    const response = await fetch(`https://www.eventbriteapi.com/v3/events/${eventId}/?expand=ticket_classes,ticket_availability`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return;
    const data = (await response.json()) as EventbriteDetailResponse;

    // Logo / image
    if (!event.image?.url) {
      const logoUrl = data.logo?.original?.url ?? data.logo?.url;
      if (logoUrl) {
        event.image = { url: logoUrl };
      }
    }

    // Description (if summary is missing or too short)
    if ((!event.summary || event.summary.length < 20) && data.description?.text) {
      event.summary = data.description.text.slice(0, 500);
    }

    // Price: try multiple strategies
    if (data.is_free) {
      event.is_free = true;
    } else if (!event.is_free) {
      // Strategy 1: ticket_availability (aggregated min/max)
      if (data.ticket_availability?.minimum_ticket_price) {
        const minPrice = data.ticket_availability.minimum_ticket_price;
        const maxPrice = data.ticket_availability.maximum_ticket_price;
        // The API returns value in cents for some currencies, use major_value when available
        const min = minPrice.major_value
          ? parseFloat(minPrice.major_value)
          : minPrice.value / 100;
        const max = maxPrice?.major_value
          ? parseFloat(maxPrice.major_value)
          : (maxPrice?.value ?? minPrice.value) / 100;

        if (min > 0) {
          event.ticket_price = {
            min,
            max,
            currency: minPrice.currency,
          };
        }
      }

      // Strategy 2: ticket_classes (individual ticket types)
      if (!event.ticket_price && data.ticket_classes?.length) {
        const paidClasses = data.ticket_classes.filter(tc => !tc.free && tc.cost?.value);
        if (paidClasses.length > 0) {
          const costs = paidClasses.map(tc => {
            if (tc.cost!.major_value) return parseFloat(tc.cost!.major_value);
            return tc.cost!.value / 100;
          });
          const min = Math.min(...costs);
          const max = Math.max(...costs);
          event.ticket_price = {
            min,
            max,
            currency: paidClasses[0]!.cost!.currency,
          };
        } else if (data.ticket_classes.every(tc => tc.free)) {
          event.is_free = true;
        }
      }
    }
  } catch {
    // Silently fail — event will still have search-level data
  }
}

export async function fetchEventbriteEvents(): Promise<EventbriteEvent[]> {
  const token = process.env.EVENTBRITE_API_KEY;
  if (!token) {
    throw new Error('EVENTBRITE_API_KEY environment variable is not set');
  }

  const allEvents: EventbriteEvent[] = [];
  let continuation: string | undefined;
  let pages = 0;
  const MAX_PAGES = 10;

  while (pages < MAX_PAGES) {
    const body: Record<string, unknown> = {
      event_search: {
        q: 'Granada',
        dates: ['current_future'],
      },
      'expand.destination_event': ['primary_venue'],
    };

    if (continuation) {
      body.continuation = continuation;
    }

    const response = await fetch(
      'https://www.eventbriteapi.com/v3/destination/search/',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(
        `Eventbrite API error: ${response.status} ${response.statusText}. ${text}`
      );
    }

    const data = (await response.json()) as EventbriteSearchResponse;
    const results = data.events?.results ?? [];

    // Filter: only in-person events in Granada, not cancelled
    const granadaEvents = results.filter((e) => {
      if (e.is_online_event) return false;
      if (e.is_cancelled) return false;
      const city = e.primary_venue?.address?.city?.toLowerCase() ?? '';
      if (!city.includes('granada')) return false;
      return true;
    });

    allEvents.push(...granadaEvents);
    pages++;

    // Stop if no more pages
    const nextContinuation = data.events?.pagination?.continuation;
    if (!nextContinuation || results.length === 0) break;
    continuation = nextContinuation;
  }

  // Enrich with logos, prices, and descriptions from individual event API
  // The search endpoint doesn't return images or pricing; we need to fetch each event
  // Use concurrency limit to avoid rate limiting
  const CONCURRENCY = 5;
  for (let i = 0; i < allEvents.length; i += CONCURRENCY) {
    const batch = allEvents.slice(i, i + CONCURRENCY);
    await Promise.allSettled(
      batch.map(event => enrichEventbriteEvent(token, event))
    );
    if (i + CONCURRENCY < allEvents.length) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  return allEvents;
}
