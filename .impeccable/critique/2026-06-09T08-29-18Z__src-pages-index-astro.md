---
timestamp: 2026-06-09T08-29-18Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Boot sequence gives clear feedback; live time/weather update; no loading states on content transitions |
| 2 | Match System / Real World | 4 | Natural language (es/en i18n); local context (Granada time, weather); cultural references |
| 3 | User Control and Freedom | 3 | Filter clear buttons, nav back, Grand Gate menu; no undo on interactions |
| 4 | Consistency and Standards | 4 | Strong design system; dual-mode palette applied consistently; component patterns repeat predictably |
| 5 | Error Prevention | 3 | No destructive actions; empty states present; no form validation needed for this content site |
| 6 | Recognition Rather Than Discoverability | 4 | Categories visible; filter chips clear; images and labels on all cards; no hidden features |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts; no bulk actions; no power-user features; single-path navigation |
| 8 | Aesthetic and Minimalist Design | 3 | Strong visual hierarchy; cinematic restraint; some sections have dense CSS noise |
| 9 | Error Recovery | 3 | 404 page exists; no broken workflows; but no clear error messaging for failed weather API |
| 10 | Help and Documentation | 2 | No contextual help; no tooltips; guide content is the help but not integrated |
| **Total** | | **31/40** | **Good — solid foundation with targeted improvements needed** |

## Anti-Patterns Verdict

**LLM assessment:** This does NOT look AI-generated. The "Alhambra After Dark" aesthetic is distinctive and locally rooted. The cinematic boot sequence, portal lens, glass dock, and grain texture give the site a strong POV. The dual-mode palette (dark hero + light editorial) is a deliberate design choice, not a default. The numbered nav links, filmstrip ticks, and nazari star motif are brand-specific details that break the generic template pattern.

**Deterministic scan:** The detector found 44 warnings across the codebase:
- **14 bounce-easing warnings** (`cubic-bezier(0.34, 1.56, 0.64, 1)`): This is the `ease-spring` token defined in `tokens.css` and used for playful micro-interactions (pill hover, menu animation). This is intentional design voice, not a slop tell. However, the detector flags it because it matches the pattern. Recommendation: document this as intentional in the design system.
- **16 layout-transition warnings** (`transition: width` or `transition: padding-left`): These are used for hover effects on the back-to-top button, footer hover states, and accordion patterns. Some of these (like the back-to-top arrow line expansion) are legitimately using width for a line-draw effect. Others (accordion) might benefit from grid-template-rows or scale transforms. The footer and navbar width transitions are the most concerning for performance.
- **4 side-stripe warnings** (`border-left: 3px solid` or `border-right: 3px solid`): These are used for blockquotes in blog detail and the back-to-top arrow in the footer. The blockquote side-stripe is a classic editorial pattern that the detector flags as an AI tell. The footer arrow is a decorative element. Recommendation: replace the blockquote side-stripe with a subtle left padding + background tint or a full border treatment.
- **1 broken-image warning** (`<img>` with no src in OptimizedImage.astro): This is a placeholder component that receives src via props. The detector is flagging the component definition, not a rendered instance. False positive.

**Visual overlays:** Browser visualization not performed for this critique (no browser automation available). The CLI findings are the primary evidence.

## Overall Impression

This is a strong, opinionated design with a clear identity. The "Alhambra After Dark" concept is well-executed through the cinematic hero, warm editorial content sections, and distinctive signature patterns (Screen Frame, Glass Dock, Grain Texture). The design system is comprehensive and documented. The main opportunities are in performance optimization (layout transitions), minor accessibility polish, and some detector-flagged patterns that are intentional but could be documented or refined.

## What's Working

1. **The cinematic hero experience**: The boot sequence, portal lens, parallax, and glass dock create a memorable first impression. The live time (Europe/Madrid) and weather (Open-Meteo) add local context. The char-by-char title reveal is a distinctive touch.
2. **Dual-mode palette execution**: The dark-to-light transitions between sections are smooth and purposeful. The cream editorial sections feel like a different world from the noir hero, which is exactly the intent.
3. **Signature patterns**: The Screen Frame with corner brackets and frame tags, the grain texture overlay, the corner bracket hover reveals on cards, and the nazari star motif in the logo all reinforce the brand identity. These are not generic UI patterns.

## Priority Issues

**[P1] Layout property animations causing performance issues**
- **What**: Multiple CSS files use `transition: width` and `transition: padding-left` for hover effects. The worst offenders are in `Footer.astro` (3 instances), `navbar.css` (3 instances), `blog-archive.css` (4 instances), `routes-archive.css` (2 instances), and `time-routes-archive.css` (2 instances).
- **Why it matters**: Animating width and padding causes layout thrash on every frame, leading to janky 60fps performance, especially on mobile. This is the #1 performance issue in the design system.
- **Fix**: Replace width transitions with `transform: scaleX()` for line-draw effects. Replace padding transitions with `transform: translateX()` for slide effects. Use `grid-template-rows` for accordion height animations. Where the effect genuinely requires width (like the back-to-top arrow), use `transform: scaleX()` on a pseudo-element instead.
- **Suggested command**: `/impeccable optimize` or `/impeccable polish`

**[P1] Spring easing used across the codebase — intentional but un-documented**
- **What**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (the spring easing) appears in 14 files. The detector flags this as a bounce/elastic easing which is a known anti-pattern.
- **Why it matters**: While this easing is used for playful micro-interactions (menu hover, pill bounce), the detector correctly identifies that bounce easing feels dated and can cause motion discomfort. The Tailwind config also defines this as `spring` and uses it for float animations.
- **Fix**: Document in DESIGN.md that this easing is used only for specific playful micro-interactions. Reduce usage to only those interactions (menu hover, pill states). Replace with `ease-out-expo` for all other transitions. Consider adding a `prefers-reduced-motion` override that converts spring easing to `ease-out-expo` for users sensitive to motion.
- **Suggested command**: `/impeccable document` (update DESIGN.md) + `/impeccable polish`

**[P2] Side-stripe borders on blockquotes and footer**
- **What**: The detector found 4 side-stripe instances: blog detail blockquote (`border-left: 3px solid rgba(201,168,76,0.4)`), blog detail gold blockquote (`border-left: 3px solid var(--s-gold)`), footer back-to-top arrow (`border-left: 3px solid var(--s-orange)`), and time-routes archive (`border-left-width: 3px`).
- **Why it matters**: Thick colored borders on one side are the #1 recognized AI-generated UI tell. The blockquote stripes, while editorial, trigger the anti-pattern detector. The footer arrow stripe is decorative.
- **Fix**: For blockquotes: use a subtle left padding (2rem) + a background tint (`rgba(201,168,76,0.06)`) or a top border instead. For the footer arrow: replace the CSS triangle with an SVG icon or use `transform: translateX()` for the hover effect.
- **Suggested command**: `/impeccable polish`

**[P2] Very large CSS-in-component files**
- **What**: `Footer.astro` has 1922 lines of CSS (in `<style>`), `BlogSection.astro` has 856 lines, `TimeRoutesSection.astro` has 1001 lines, `HomeCTA.astro` has 830 lines, `PlannerSection.astro` has 904 lines. These are single components with massive CSS.
- **Why it matters**: This makes the components hard to maintain, increases bundle size, and violates the separation of concerns. CSS should live in `.css` files, not inline in components.
- **Fix**: Extract CSS from components into dedicated `.css` files under `src/styles/components/` or `src/styles/sections/`. The Tailwind config already references CSS variables; the component CSS should be external.
- **Suggested command**: `/impeccable distill` (strip and simplify) or manual refactor

**[P2] Wikipedia images as blog placeholders**
- **What**: The `BlogSection` component uses hardcoded Wikipedia image URLs for blog post images (`BLOG_IMAGES` map with Wikimedia Commons URLs).
- **Why it matters**: Hotlinking to Wikimedia Commons is not a production-ready image strategy. Images may break, have inconsistent quality, or violate usage policies. The `OptimizedImage` component has a broken-image detector warning.
- **Fix**: Use local optimized images or a proper CDN. The `OptimizedImage` component should receive proper src values. If these are placeholder images, they should be clearly marked as such and replaced before launch.
- **Suggested command**: `/impeccable harden`

**[P3] Missing keyboard navigation for Grand Gate menu**
- **What**: The Grand Gate overlay menu (`GrandGate.astro`) uses `role="dialog"` and `aria-expanded`, but the focus trap and keyboard navigation (Esc to close, Tab cycling) need verification.
- **Why it matters**: The `NavBar` component uses `IntersectionObserver` for the scroll state, which is good. The Grand Gate menu needs to be fully keyboard accessible for WCAG AAA compliance.
- **Fix**: Verify that the Grand Gate menu traps focus when open, closes on Escape, and cycles through links with Tab. Add `aria-hidden="true"` to the underlying page when the menu is open.
- **Suggested command**: `/impeccable audit`

## Persona Red Flags

**Jordan (First-Timer)**:
- The hero boot sequence (700ms max) might feel slow or confusing. A first-timer might not understand what is happening. The boot text is in the user's locale (Spanish/English) which helps, but the technical aesthetic (progress bar, build info) could feel alienating.
- The nav links use numbered labels (`[01] EVENTOS`) which are cool but might not be immediately understood as navigation. The abbreviations (`RT`, `GU`, `PL`, `EV`) on mobile are cryptic.
- No visible help or guidance for what the site does. The hero CTA says "EXPLORAR EVENTOS" but a first-timer might not know what kind of events.
- The filter chips on event pages have no clear "clear all" button until filters are active. A first-timer might not know how to reset.

**Casey (Distracted Mobile User)**:
- The hero is a full-viewport cinematic experience. On mobile, the video is replaced with a poster image, but the Screen Frame is hidden. The mobile experience is functional but loses much of the cinematic impact.
- Touch targets on the filter chips are small (0.5rem 1rem padding). The minimum recommended is 44×44pt.
- The accordion routes grid on desktop (5 panes) collapses to stacked cards on mobile, but the transition is a significant layout change. The mobile stacked cards are fine but the desktop experience doesn't gracefully degrade.
- The weather API call is deferred, but if the user is on a slow connection, the weather might never load. No fallback state is shown.

**Sam (Accessibility-Dependent User)**:
- The char-by-char title reveal animation in the hero uses `animation: char-rise` with opacity and transform. If `prefers-reduced-motion` is enabled, the hero should still show the text immediately. The `global.css` has `@media (prefers-reduced-motion: reduce)` that sets `animation-duration: 0.01ms` — this is correct but might not be sufficient for the hero boot sequence which gates content visibility.
- The parallax effect on the hero uses mousemove + `requestAnimationFrame`. This is disabled for non-fine pointers (touch devices), which is good. However, the IntersectionObserver for the parallax might not be accessible to screen readers.
- The `OptimizedImage` component has a detector warning for broken images. If images fail to load, there is no alt text fallback or error state visible to screen readers.
- The route difficulty indicators use color bars (`[■□□]`). These are paired with text labels in the UI, which is good. The color alone is not the only indicator.

## Minor Observations

1. The `SectionHeader` component is well-designed with split title animation and theme switching, but the eyebrow text is small (0.65rem) which might be hard to read on mobile.
2. The `Footer` component has a massive wordmark animation (character-by-character with staggered delays) that is impressive but adds 50+ lines of CSS. Consider simplifying or extracting.
3. The `PlannerSection` has a beautiful portal rings animation but the CTA button is not prominent enough. The section is dark and the button is dark — the contrast is low.
4. The `EventsGridSection` uses masonry with 3 columns, but the column heights are hardcoded in flex units (`COL_HEIGHTS`). This might cause overflow on small screens or when content is shorter than expected.
5. The `RoutesGridSection` uses a flex accordion on desktop (5 panes) but collapses to a simple stacked layout on mobile. The accordion interaction (hover expand) is not accessible on touch devices.
6. The `HomeCTA` has three headline lines with char-by-char animation. The third line is very long (`"GRANADA TE ESPERA"`) and might wrap awkwardly on mobile. Test at 320px width.
7. The `TimeRoutesSection` has beautiful gradient cards but the gradient colors are hardcoded (`#4a9e6b`, `#d4873a`, etc.) rather than using CSS variables. This makes the design system less maintainable.
8. The `BlogSection` uses a dark background but the blog detail pages use a light background. The transition between the blog section (dark) and the blog detail page (light) might be jarring. Consider a consistent dark theme for all blog content or a smoother transition.
9. The `NavBar` has a filmstrip tick motif (7 vertical ticks) at the top. This is a beautiful detail but on very wide screens (2560px+) the ticks might not be evenly distributed.
10. The `global.css` has a `::selection` style that inverts colors (background: white, text: black). This is fine but the contrast might be too stark on light sections. Consider using the terracotta or gold for selection instead.

## Questions to Consider

1. The site has a very strong desktop experience but the mobile experience loses many of the cinematic effects. Should mobile have its own "cinematic moments" (e.g., a simplified boot sequence, a vertical portal)?
2. The spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) is used as a brand voice element (playful, bouncy). But it is flagged by automated detectors as an anti-pattern. Is this a hill to die on, or should the design system document it as an intentional exception?
3. The CSS-in-component pattern (massive `<style>` blocks in `.astro` files) creates maintainability issues. Would the team be open to extracting CSS into dedicated files, or is the co-location preferred for developer experience?
4. The weather API and live time are delightful details but they add JS overhead. On a content-heavy site, should these be deferred or lazy-loaded? The current implementation already defers the weather fetch, which is good.
5. The dual-mode palette (dark + light) is the brand's signature. But on the blog detail pages, the transition from the dark blog section to the light detail page is abrupt. Should there be a transition page or a dark-mode detail page option?

## Trend

First run for this target, no trend yet.
