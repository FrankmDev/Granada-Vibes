# Rework Plan for [slug].astro

## Conceptual Direction
- "Apple-Inspired Cinematic" with premium editorial feel. Wait, sticking to the Granaday Vibes "CREAM REMIX" aesthetic. So warm background (`#f5f0ea`), dark text (`#1a1619`), gold (`#c9a84c`), orange (`#e8622a`).
- Right column: Instead of simple text lines, make it a massive, gorgeous "Sticky Interactive Ticket" or Bento Grid.
  - HUGE typography for Date and Time.
  - Price as a large badge.
  - Floating actions (like sticky purchase button).
  - Micro-interactions (hover effects, blur borders).
- Left column (main content):
  - Description: Big pull quotes, better paragraph typesetting.
  - Venue: Instead of just a map, make it a "Location Bento". Map expands on hover. Large venue name.
  - Highlights/Tips: Render as stacked cards or elegant timeline markers instead of standard lists.

## New Sidebar Component (Right side)
Let's rebuild the `<aside>` in `[slug].astro`:
- A `.ticket-card` which resembles a premium printed ticket or badge.
  - Large day/month calendar icon style.
  - Big price in an exclusive box.
- The Share button will have a magnetic or pulse effect.

## New Main Track Components (Left side)
- The blocks will have a more sophisticated header.
- Venue will merge text and map nicely.

## Code structure to replace
I will rewrite `src/pages/eventos/[slug].astro` using drop-in CSS (in `<style>`) to override or enhance `.det-*` inside that page specifically, allowing us to build the bento cards.
