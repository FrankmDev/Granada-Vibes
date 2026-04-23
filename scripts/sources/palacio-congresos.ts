/**
 * Scraper: Palacio de Congresos de Granada
 * Each event card has:
 *   - img src with agenda/{ID}.png — this ID maps to ?seccion=evento&idEvento={ID}
 *   - h5 (title), h6 (date), h4 (time), p (description)
 *
 * Prices live in the detail pages (?seccion=evento&idEvento=X), NOT in the listing cards.
 * We extract the ID from the image src and fetch each detail page for price info.
 */
import { fetchHTML } from '../utils/scraper-helpers.js';
import { parseSpanishDate, parseSpanishTime } from '../utils/date-parser.js';

export interface PalacioEvent {
  title: string;
  date: string;
  time: string;
  url: string;
  price?: string;
  imageUrl?: string;
  description?: string;
}

const BASE_URL = 'https://www.pcgr.org';
const LISTING_URL = `${BASE_URL}/?seccion=eventosCulturales`;

/**
 * Fetch a detail page for price extraction.
 * Detail URL: https://www.pcgr.org/?seccion=evento&idEvento=470
 */
async function fetchDetailPrice(eventId: string): Promise<string> {
  try {
    const url = `${BASE_URL}/?seccion=evento&idEvento=${eventId}`;
    const $ = await fetchHTML(url, { timeout: 12_000, retries: 1 });
    const text = $('body').text();

    // Look for price patterns in the detail page
    const pricePatterns = [
      /PRECIOS?[\s\S]{0,200}?(\d+(?:[,.]\d+)?)\s*€/i,
      /precio[s]?[:\s]+(\d+(?:[,.]\d+)?)\s*€/i,
      /desde\s+(\d+(?:[,.]\d+)?)\s*€/i,
      /(\d+(?:[,.]\d+)?)\s*€\s*(?:anticipada|general|butaca|platea|anfiteatro|zona)/i,
    ];

    for (const pattern of pricePatterns) {
      const match = text.match(pattern);
      if (match) {
        return `${match[1]!.replace(',', '.')}€`;
      }
    }

    // Check for free
    if (/\b(entrada\s+libre|gratis|acceso\s+libre|acceso\s+gratuito)\b/i.test(text)) {
      return 'Gratis';
    }
  } catch {
    // Silent fail — keep without price
  }
  return '';
}

export async function fetchPalacioEvents(): Promise<PalacioEvent[]> {
  const $ = await fetchHTML(LISTING_URL);
  const events: PalacioEvent[] = [];
  const seen = new Set<string>();

  // Each event card: div.card.card-profile (or div.card.hoverCard)
  $('div.card').each((_, cardEl) => {
    const $card = $(cardEl);

    // Title from h5 within card
    const title = $card.find('h5').first().text().replace(/\s+/g, ' ').trim();
    if (!title || title.length < 2 || seen.has(title)) return;
    seen.add(title);

    // Skip cancelled events
    if (/cancelad/i.test($card.find('h5').first().html() ?? '')) return;

    // Date from h6.text-info
    const dateText = $card.find('h6').first().text().trim();
    // Handle multi-date: "20 y 21 Marzo 2026" — take first
    const cleanDate = dateText.replace(/\s+y\s+\d+/g, '');
    const date = parseSpanishDate(cleanDate) ?? parseSpanishDate(dateText) ?? '';
    if (!date) return;

    // Time from h4
    const timeText = $card.find('h4').first().text().trim() || $card.text();
    const time = parseSpanishTime(timeText);

    // Image & Event ID: extract from agenda image src
    // Pattern: src="./assets/img/curved-images/agenda/470.png"
    let imageUrl: string | undefined;
    let eventId: string | undefined;

    $card.find('img').each((_, imgEl) => {
      const src = $(imgEl).attr('src') ?? '';
      if (src.includes('curved-images/agenda')) {
        imageUrl = src.startsWith('http')
          ? src
          : `${BASE_URL}/${src.replace(/^\.\//, '')}`;

        // Extract the numeric ID from the image filename
        const idMatch = src.match(/agenda\/(\d+)\.\w+$/);
        if (idMatch) {
          eventId = idMatch[1];
        }
        return false; // stop iteration
      }
    });

    // Build the detail URL from the event ID
    const detailUrl = eventId
      ? `${BASE_URL}/?seccion=evento&idEvento=${eventId}`
      : LISTING_URL;

    // Description from paragraph
    const descText = $card.find('p').first().text().trim();
    const description = descText && descText.length > 5 ? descText.slice(0, 400) : undefined;

    events.push({
      title,
      date,
      time,
      url: detailUrl,
      imageUrl,
      description,
    });
  });

  // Fallback: h5-based scan if card approach found nothing
  if (events.length === 0) {
    $('h5').each((_, el) => {
      const $h5 = $(el);
      const title = $h5.text().replace(/\s+/g, ' ').trim();
      if (!title || title.length < 2 || seen.has(title)) return;
      seen.add(title);

      const $section = $h5.closest('div[class*="col"]').parent().parent();
      const dateText = $section.find('h6').first().text().trim();
      const date = parseSpanishDate(dateText.replace(/\s+y\s+\d+/g, '')) ?? '';
      if (!date) return;

      const time = parseSpanishTime($section.find('h4').first().text().trim() || $section.text());

      let imageUrl: string | undefined;
      let eventId: string | undefined;
      const imgSrc = $section.find('img[src*="agenda"]').first().attr('src');
      if (imgSrc) {
        imageUrl = imgSrc.startsWith('http') ? imgSrc : `${BASE_URL}/${imgSrc.replace(/^\.\//, '')}`;
        const idMatch = imgSrc.match(/agenda\/(\d+)\.\w+$/);
        if (idMatch) eventId = idMatch[1];
      }

      const detailUrl = eventId
        ? `${BASE_URL}/?seccion=evento&idEvento=${eventId}`
        : LISTING_URL;

      const descText = $section.find('p').first().text().trim();
      const description = descText && descText.length > 5 ? descText.slice(0, 400) : undefined;

      events.push({ title, date, time, url: detailUrl, imageUrl, description });
    });
  }

  // ── Enrich ALL events with prices from their detail pages ──
  // Each detail page has the real price that the listing doesn't show
  const CONCURRENCY = 3;

  for (let i = 0; i < events.length; i += CONCURRENCY) {
    const batch = events.slice(i, i + CONCURRENCY);
    await Promise.allSettled(
      batch.map(async (event) => {
        // Extract eventId from URL
        const idMatch = event.url.match(/idEvento=(\d+)/);
        if (!idMatch) return;

        const price = await fetchDetailPrice(idMatch[1]!);
        if (price) {
          event.price = price;
        }
      })
    );
    // Small delay between batches to avoid hammering
    if (i + CONCURRENCY < events.length) {
      await new Promise(r => setTimeout(r, 400));
    }
  }

  return events.filter((e) => e.date.length === 10);
}
