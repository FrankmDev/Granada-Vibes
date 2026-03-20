export interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  description?: string;
  info?: string;
  pleaseNote?: string;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
    };
  };
  classifications?: Array<{
    segment?: { name: string };
    genre?: { name: string };
  }>;
  _embedded?: {
    venues?: Array<{
      name: string;
      city?: { name: string };
      address?: { line1: string };
    }>;
  };
  images?: Array<{
    url: string;
    width: number;
    height: number;
    ratio?: string;
  }>;
  priceRanges?: Array<{
    min: number;
    max: number;
    currency: string;
  }>;
}

interface TicketmasterResponse {
  _embedded?: {
    events: TicketmasterEvent[];
  };
  page?: {
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

// Granada coordinates + 30km radius to catch metro area and nearby venues
const GRANADA_LAT = '37.1773';
const GRANADA_LON = '-3.5986';
const RADIUS = '30';

export async function fetchTicketmasterEvents(): Promise<TicketmasterEvent[]> {
  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) {
    throw new Error('TICKETMASTER_API_KEY environment variable is not set');
  }

  const now = new Date();
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() + 90);

  const baseParams = {
    apikey: apiKey,
    latlong: `${GRANADA_LAT},${GRANADA_LON}`,
    radius: RADIUS,
    unit: 'km',
    countryCode: 'ES',
    size: '100',
    sort: 'date,asc',
    startDateTime: now.toISOString().split('.')[0] + 'Z',
    endDateTime: endDate.toISOString().split('.')[0] + 'Z',
  };

  const allEvents: TicketmasterEvent[] = [];
  let page = 0;
  let totalPages = 1;

  // Paginate through results
  while (page < totalPages && page < 5) {
    const params = new URLSearchParams({
      ...baseParams,
      page: String(page),
    });

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(
        `Ticketmaster API error: ${response.status} ${response.statusText}. ${body}`
      );
    }

    const data = (await response.json()) as TicketmasterResponse;
    const events = data._embedded?.events ?? [];
    allEvents.push(...events);

    totalPages = data.page?.totalPages ?? 1;
    page++;
  }

  return allEvents;
}
