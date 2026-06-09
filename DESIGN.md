---
name: "Granada Urban"
description: "Cultural guide for Granada, Spain — dark cinematic portal into warm editorial content."
colors:
  alhambra-noir: "#080808"
  raised-surface: "#111111"
  card-surface: "#171717"
  subtle-surface: "#1e1e1e"
  border-default: "#242424"
  border-subtle: "#1a1a1a"
  warm-white: "#f0ede8"
  warm-gray: "#9a9490"
  muted-gray: "#5a5550"
  terracotta: "#e8622a"
  terracotta-hover: "#f07040"
  alhambra-gold: "#c9a84c"
  gold-text: "#e6c587"
  success: "#4a9e6b"
  error: "#c94a4a"
  moderate: "#d4873a"
  granada-cream: "#f5f0ea"
  ink-brown: "#1a1619"
  ink-warm: "#5a4f47"
  ink-muted: "#8a7f77"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: "0.08em"
    textTransform: "uppercase"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "20px"
  3xl: "32px"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  2xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.alhambra-noir}"
    rounded: "0"
    padding: "0.875rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.warm-white}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "0"
    padding: "0.875rem 2rem"
  button-secondary-hover:
    backgroundColor: "{colors.raised-surface}"
    textColor: "{colors.warm-white}"
  screen-frame:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "0"
    padding: "0"
  card-dark:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.lg}"
    padding: "0"
  card-light:
    backgroundColor: "{colors.granada-cream}"
    textColor: "{colors.ink-brown}"
    rounded: "{rounded.lg}"
    padding: "0"
---

# Design System: Granada Urban

## 1. Overview

**Creative North Star: "The Alhambra After Dark"**

A palace that glows at night. The design moves from cinematic darkness into sun-lit editorial space. The hero is a portal — deep black, warm terracotta, aged gold — like standing in the Alhambra at dusk. The content sections are warm and editorial, like a beautifully printed guide left on a marble table in a boutique hotel. The transition between dark and light is the emotional journey of the site: from anticipation to discovery.

This system is precise and cinematic. It rejects generic travel templates, government tourism flatness, and personality-free UI. Every element signals curation. The design communicates Granada's character — architecture, light, material — before the user reads a word.

**Key Characteristics:**
- Dual-mode palette: dark cinematic (hero/portal) and warm editorial (content/body)
- Inverted font naming: CSS variables call DM Sans "display" and Fraunces "body"; Tailwind inverts them. The browser renders Fraunces for headlines and DM Sans for UI.
- Ambient motion only: parallax, grain, screen-frame corners, subtle glow. No performative animation.
- Signature patterns: Screen Frame, Grain Texture, Glass Dock, Corner Brackets, Char-by-Char Reveal

## 2. Colors

The palette operates in two distinct modes. Dark mode is the cinematic stage; light mode is the editorial reading room.

### Primary
- **Alhambra Noir** (`#080808`): The void. Hero backgrounds, portal base, dark section base. The deepest black with a barely perceptible warmth.
- **Terracotta** (`#e8622a`): The accent. Warm, energetic, unmistakably Granada. Used sparingly: active nav states, hover transitions, CTA emphasis, price badges. Its rarity is the point.
- **Alhambra Gold** (`#c9a84c`): The heritage accent. Decorative corners, frame tags, ornamental details. Aged gold, not bright yellow. Evokes Nasrid tilework.

### Secondary
- **Warm White** (`#f0ede8`): Primary text on dark. A warm, slightly desaturated white that avoids clinical starkness. Also used as button-primary background on dark surfaces.
- **Granada Cream** (`#f5f0ea`): The light mode background. Warm off-white, not cold paper. Creates the editorial reading environment for content sections.
- **Ink Brown** (`#1a1619`): The light mode text. Deep brown, not pure black. Harmonizes with the cream background.

### Neutral
- **Raised Surface** (`#111111`): Dark mode elevated surfaces. Cards, nav pill, dock backgrounds. One step above the void.
- **Card Surface** (`#171717`): Dark mode card backgrounds. Two steps above the void.
- **Subtle Surface** (`#1e1e1e`): Featured / highlighted cards in dark mode.
- **Warm Gray** (`#9a9490`): Secondary text on dark. Body copy, descriptions, meta text.
- **Muted Gray** (`#5a5550`): Tertiary text, disabled states, subtle borders on dark.
- **Ink Warm** (`#5a4f47`): Secondary text on light. Warm brown-gray for descriptions.
- **Ink Muted** (`#8a7f77`): Tertiary text on light. Muted, warm gray.
- **Border Default** (`#242424`): Structural borders on dark.
- **Border Subtle** (`#1a1a1a`): Hairline dividers on dark.
- **Light Border** (`rgba(26, 22, 25, 0.12)`): Structural borders on light backgrounds.

### Named Rules
**The Dual-Mode Rule.** Every section must commit to one mode: dark or light. No mixed-mode cards within a section. The transition between sections is the palette's punctuation.

**The Terracotta Rarity Rule.** The accent appears on ≤10% of any given screen. Its power is in restraint. A hero CTA, an active nav link, a hover state — never a background fill.

## 3. Typography

**Display Font:** Fraunces (with Georgia fallback) — a variable serif with warm, expressive shapes. Used for headlines, hero titles, display numbers, and large editorial type. The personality is "warmly architectural."

**Body Font:** DM Sans (with system-ui fallback) — a geometric sans with clean, modern lines. Used for UI, body text, labels, navigation, and all functional text. The personality is "confidently utilitarian."

**The Naming Inversion:** In CSS custom properties (`--font-display` and `--font-body`), the names are inverted from their semantic roles. `--font-display` holds DM Sans (for UI/body use); `--font-body` holds Fraunces (for headline/display use). In Tailwind, `font-display` maps to Fraunces and `font-body` maps to DM Sans — the semantic naming you would expect. When writing CSS directly, use the variables; when using Tailwind classes, use the semantic names. The rule is: **headlines and large type → Fraunces; UI and body text → DM Sans.**

### Hierarchy
- **Display** (700, clamp(2.5rem, 7vw, 5rem), 1.1 line-height, -0.02em letter-spacing): Hero headlines, monumental lockup. The largest type on the page. Used with `font-family: var(--font-body)` (Fraunces) in CSS or `font-display` in Tailwind.
- **Headline** (700, clamp(2rem, 5vw, 3.5rem), 1.1 line-height, -0.02em letter-spacing): Section headers, page titles. Fraunces.
- **Title** (700, clamp(1.25rem, 2.5vw, 1.75rem), 1.1 line-height, -0.02em letter-spacing): Card titles, sub-section headers. Fraunces.
- **Body** (400, 1rem, 1.6 line-height): Paragraphs, descriptions, content text. DM Sans. Max line length: 65–75ch.
- **Label** (700, 0.75rem, 1.6 line-height, 0.08em letter-spacing, uppercase): Buttons, nav links, category badges, frame tags. DM Sans. The uppercase treatment is reserved for short labels only; never used for body text.

### Named Rules
**The One-Voice Rule.** The Fraunces + DM Sans pairing is the only font pairing. Never add a third font. Weight and size contrast create hierarchy, not font switches.

**The Letter-Spacing Floor.** Display headings must have letter-spacing ≥ -0.04em. Anything tighter and letters touch; cramped, not designed.

## 4. Elevation

This system uses tonal layering, not structural shadows. Depth is conveyed through background color steps (Noir → Raised → Card → Subtle) and subtle ambient glows. Surfaces are flat at rest. Shadows appear only as a response to state (hover glow on accent elements) or as decorative atmosphere (grain texture, light leak).

### Shadow Vocabulary
- **Ambient Soft** (`0 4px 16px rgba(10, 10, 10, 0.2)`): Diffuse, subtle shadow for mild lift on dark surfaces.
- **Ambient Medium** (`0 8px 24px rgba(10, 10, 10, 0.25)`): Moderate lift for cards or modals.
- **Accent Glow** (`0 12px 40px var(--color-accent-glow)`): Hover glow on accent-colored elements. Atmospheric, not structural.
- **Gold Glow** (`0 12px 40px var(--color-gold-muted)`): Hover glow on gold-accented elements. Decorative.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Borders (`1px solid var(--color-border)`) and background color steps create hierarchy. Drop shadows are reserved for interactive states and atmospheric effects.

**The No-Shadow-On-Light Rule.** Light-mode sections use tonal layering through background color and subtle borders. No drop shadows on cream surfaces. The contrast between cream and ink-brown is sufficient.

**Motion Tokens.**
- **ease-out-expo** (`cubic-bezier(0.16, 1, 0.3, 1)`): Primary easing. Reveals, entrances, hover transitions. The default for most motion.
- **ease-spring** (`cubic-bezier(0.34, 1.56, 0.64, 1)`): Playful bounce. Used sparingly for micro-interactions: hamburger menu hover, pill states, playful feedback. This is intentional brand voice — not a default. All other transitions use ease-out-expo.
- **ease-smooth** (`cubic-bezier(0.4, 0, 0.2, 1)`): Standard material easing. Subtle transitions.
- **ease-editorial** (`cubic-bezier(0.65, 0, 0.35, 1)`): Slow, dramatic reveals. Hero boot sequence.

## 5. Components

### Buttons
- **Shape:** Sharp corners (0px radius). The button is a precise rectangle, not a pill.
- **Primary:** Background Warm White (`#f0ede8`), text Alhambra Noir (`#080808`), 1px solid border matching background. Padding: 0.875rem 2rem. Label: 0.75rem, 700 weight, uppercase, 0.08em letter-spacing.
- **Hover / Focus:** Background transitions to Terracotta (`#e8622a`), text becomes Warm White. Transition: 100ms ease.
- **Secondary:** Transparent background, Warm White text, 1px solid border. Hover: background fills to Raised Surface (`#111111`).
- **States:** Focus-visible uses a 2px solid Terracotta outline with 3px offset.

### Screen Frame
- **Shape:** A 1px border inset 1.5rem from all edges, color `rgba(255, 255, 255, 0.06)` on dark; `rgba(26, 22, 25, 0.12)` on light.
- **Corners:** Four L-shaped corner brackets (12px × 1px and 1px × 12px) in Gold Dim (`rgba(201, 162, 39, 0.45)`) on dark; Ink with 15% opacity on light.
- **Tags:** Optional text labels at the four corners of the frame. 0.6rem, 600 weight, 0.15em letter-spacing, uppercase, color `rgba(255, 255, 255, 0.25)` on dark; Ink Muted on light.
- **Usage:** Wraps cinematic sections (hero, blog, featured content). Hidden on mobile (`max-width: 768px`).
- **Behavior:** Opacity transitions from 0 to 1 during the hero boot sequence.

### Cards / Containers
- **Corner Style:** Mostly 0px (sharp) or 12px (`--radius-lg`) depending on context. The hero portal uses a dramatic 40vw radius (pill/portal shape). Standard cards are sharp or gently rounded.
- **Background:** Card Surface (`#171717`) on dark; Granada Cream (`#f5f0ea`) on light.
- **Shadow Strategy:** None at rest. Tonal layering provides hierarchy.
- **Border:** 1px solid Border Default (`#242424`) on dark; 1px solid Light Border on light.
- **Internal Padding:** 1.5rem to 2.5rem depending on content density.
- **Corner Brackets (hover):** On hover, cards reveal four corner bracket marks (18px × 18px, 1px solid white, opacity 0 → 0.8). This is the signature hover interaction.
- **Image Treatment:** Images at rest have `grayscale(25%) contrast(1.05) brightness(0.8)` with `scale(1.08)`. On hover: `grayscale(0%) brightness(0.88)` with `scale(1.0)`. Transition: 1.2s cubic-bezier(0.19, 1, 0.22, 1).

### Navigation
- **Style:** Two-state system. Transparent over hero (gradient black overlay for legibility); compact pill (capsule) when scrolled.
- **Typography:** DM Sans, 0.75rem, 700 weight, uppercase, 0.08em letter-spacing. Links are numbered: `[01] EVENTOS`, `[02] RUTAS`.
- **Default:** Warm White text, no underline.
- **Hover:** Text color shifts to Terracotta. An underline animates in via `scaleX(0) → scaleX(1)`.
- **Active:** Terracotta text color + visible underline. `is-active` class.
- **Mobile:** Compact abbreviations and a full-screen "Grand Gate" overlay menu.
- **Filmstrip Ticks:** Seven vertical tick marks along the top edge of the nav bar (1px wide, 4px tall, spaced 12px apart). A decorative film-sprocket motif.

### Glass Dock
- **Shape:** A floating pill-shaped bar (border-radius: 100px). Centered at the bottom of the hero.
- **Background:** `rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(40px) saturate(140%)` and `border: 1px solid rgba(255, 255, 255, 0.08)`.
- **Content:** Live Europe/Madrid time (with pulsing red dot), weather from Open-Meteo, and a CTA link.
- **Typography:** DM Sans for all text. Time is large and prominent; weather is icon + temperature.
- **Behavior:** Rises into view with a `dock-rise` animation after the boot sequence completes.

### Grain Texture Overlay
- **Shape:** Absolute-positioned full-bleed overlay, `pointer-events: none`, `z-index: 1`.
- **Background:** Inline SVG feTurbulence noise filter, opacity 0.035, `mix-blend-mode: soft-light`.
- **Usage:** Applied to hero sections, CTA sections, and any dark surface that needs analog texture. The noise prevents the digital black from feeling flat.

### Filter Pills / Chips
- **Shape:** Pill-shaped (border-radius: 100px). Small, compact.
- **Unselected:** Transparent background, Warm White text, 1px solid border.
- **Selected:** Terracotta background, Warm White text, no border.
- **Typography:** DM Sans, 0.75rem, 700 weight, uppercase.

## 6. Do's and Don'ts

### Do:
- **Do** use the dual-mode palette consistently: dark sections for cinematic/hero moments, light sections for editorial content.
- **Do** cap the accent color at ≤10% of any screen surface. Terracotta is an exclamation point, not a paragraph.
- **Do** use the Screen Frame on cinematic sections. It is the signature spatial device.
- **Do** use Fraunces for headlines and DM Sans for UI/body. The inversion is documented; do not add a third font.
- **Do** apply `text-wrap: balance` on h1–h3 for even line lengths.
- **Do** use `text-wrap: pretty` on long prose paragraphs to reduce orphans.
- **Do** cap body line length at 65–75ch.
- **Do** use `0.05–0.1` extra line-height on light text against dark backgrounds. Light type reads lighter and needs more breathing room.
- **Do** use the grain texture overlay on dark sections that feel too flat. The analog noise adds depth without shadow.
- **Do** implement `@media (prefers-reduced-motion: reduce)` for all animations. The alternative is a crossfade or instant transition.
- **Do** use `focus-visible: 2px solid var(--color-accent)` with `3px offset` for all interactive elements.
- **Do** verify contrast: body text ≥4.5:1, large text ≥3:1. The WCAG AAA target is non-negotiable.

### Don't:
- **Don't** use generic travel-blog templates, cookie-cutter card grids, or stock hero imagery. The design must be unmistakably Granada.
- **Don't** create flat, personality-free UI that could be any city anywhere. Every choice must signal local curation.
- **Don't** use side-stripe borders (`border-left` or `border-right` > 1px) as colored accents on cards or list items. Use full borders, background tints, or nothing.
- **Don't** use gradient text (`background-clip: text` with gradient). Decorative, never meaningful. Use a single solid color.
- **Don't** use glassmorphism as a default. Blurs are rare and purposeful; the Glass Dock is the one exception.
- **Don't** use the hero-metric template (big number + small label + gradient). Not a SaaS product.
- **Don't** use tiny uppercase tracked eyebrow text above every section heading. One deliberate kicker is voice; repeating it as grammar is AI scaffolding.
- **Don't** use numbered section markers (`01 · About / 02 · Process`) as default scaffolding. Numbers earn their place only when order carries information.
- **Don't** use all-caps body copy. Uppercase is reserved for short labels only.
- **Don't** animate CSS layout properties (width, height, top, left) unless truly needed. Use `transform` and `opacity`.
- **Don't** use `9999` or arbitrary z-index values. Build a semantic scale: dropdown → sticky → modal-backdrop → modal → toast → tooltip.
- **Don't** use em dashes in copy. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** use marketing buzzwords: streamline, empower, supercharge, leverage, unleash, transform, seamless, world-class, enterprise-grade, next-generation, cutting-edge, game-changer, mission-critical.
- **Don't** rely on color alone for difficulty indicators or category tags. Always pair with icon or text for color blindness accessibility.
- **Don't** let text overflow its container. Test headings at every breakpoint. If a long word plus a large clamp scale causes overflow, reduce the clamp max or rewrite the copy.
