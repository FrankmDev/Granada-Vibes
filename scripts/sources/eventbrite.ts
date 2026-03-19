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

  return allEvents;
}
