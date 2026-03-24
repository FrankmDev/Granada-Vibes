```markdown
# Design System Document: Editorial Brutalism

## 1. Overview & Creative North Star
**Creative North Star: The Digital Curator**

This design system is a rejection of the "templated" web. It draws inspiration from the high-contrast world of avant-garde cultural newspapers and the immersive, full-bleed storytelling of premium photography magazines. It is designed to feel architectural—built on a foundation of massive typography and a strict, yet asymmetric, grid.

The system moves beyond standard UI by embracing "Editorial Brutalism." This means we value impact over decoration. We use scale as a structural element, white space as a breathing organism, and a singular, saturated accent to guide the eye through complex, bento-style layouts. The result is an experience that feels curated, authoritative, and intentionally raw.

---

## 2. Colors
Our palette is rooted in high-contrast neutrals, utilizing a saturated golden accent to provide a "heat map" of interaction and importance.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning or containment. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit against a `surface` background to create a visual break. If you cannot see the edge, use spacing, not a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine paper.
*   **Base:** `surface` (#fcf9f8) is your canvas.
*   **Layering:** Use `surface-container-low` (#f6f3f2) for large secondary sections and `surface-container-highest` (#e5e2e1) for inset interactive elements.
*   **The Golden Punch:** `primary_container` (#ffb800) is reserved for high-impact moments: CTAs, active states, or "New" indicators.

### Glass & Gradient Rule
To prevent a "flat" digital feel, floating elements (like the navigation pill) should utilize Glassmorphism. Use semi-transparent surface colors with a `backdrop-blur` of 12px-20px. 
*   **Signature Polish:** For primary buttons or hero backgrounds, apply a subtle linear gradient from `primary` (#7c5800) to `primary_container` (#ffb800) at a 135-degree angle to add depth and "soul" to the golden accent.

---

## 3. Typography
Typography is the architecture of this system. We use **Epilogue** for its heavy, brutalist impact and **Inter** for its clinical readability.

*   **Display (Epilogue Heavy):** These are massive. Use `display-lg` (3.5rem) for hero titles. Letter spacing should be tight (-0.02em) to create a "wall of text" effect.
*   **Headline (Epilogue Medium/Bold):** Used for section headers. These should feel like newspaper headlines—direct and unyielding.
*   **Title & Body (Inter):** `body-lg` (1rem) is the standard for editorial content. It provides a modern, neutral contrast to the aggressive display type.
*   **Label (Inter Bold All-Caps):** Use `label-md` for metadata (dates, categories). This creates a "tagging" aesthetic common in archives and galleries.

---

## 4. Elevation & Depth
In Editorial Brutalism, we do not use shadows to mimic light; we use tonal layering to mimic physical presence.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift that feels like high-end stationery.
*   **Ambient Shadows:** If an element must float (e.g., a modal or floating pill), use an "Ambient Shadow":
    *   **Blur:** 40px - 60px.
    *   **Opacity:** 4% - 6%.
    *   **Color:** Use a tinted version of `on-surface` (#1c1b1b) rather than pure black to keep the shadow feeling "warm."
*   **The Ghost Border:** If a boundary is required for accessibility, use `outline-variant` (#d5c4ab) at **15% opacity**. It should be a suggestion of a border, not a hard stop.

---

## 5. Components

### Floating Navigation Pill
*   **Style:** `surface-container-lowest` with 40% opacity and 20px backdrop blur. 
*   **Shape:** Fully pill-shaped (though the rest of the system is 0px radius).
*   **Content:** Minimal icons and `label-md` typography.

### Bento Event Cards
*   **Structure:** Asymmetric containers using `surface-container-high`.
*   **The Date:** Use `display-md` (Epilogue) for the day of the month, positioned in the top-left or bottom-right corner to break the typical card flow.
*   **Imagery:** Always `full-bleed` (a sangre) within the card container.

### Buttons
*   **Primary:** `primary_container` (#ffb800) background, `on-primary-fixed` (#271900) text. 0px corner radius. Heavy Epilogue type.
*   **Secondary:** Ghost style. No background, `outline` (#837560) at 20% opacity for the border. 
*   **Interaction:** On hover, the primary button should shift to `primary` (#7c5800) with a 200ms ease-in-out transition.

### Inputs & Fields
*   **Style:** Underline only. No box. Use `outline` (#837560) for the underline.
*   **Focus:** The underline thickens to 2px and changes to `primary_container` (#ffb800).

---

## 6. Do's and Don'ts

### Do
*   **Do** use "Full-Bleed" imagery. Photos should feel like they are bursting out of their containers.
*   **Do** embrace asymmetry. If a grid has three columns, let one image take up two and leave the third empty (white space).
*   **Do** use massive type. If a headline feels too big, it’s probably the right size for this system.

### Don't
*   **Don't** use rounded corners. The `Roundedness Scale` is strictly **0px**. Any radius will break the brutalist, architectural feel.
*   **Don't** use dividers or lines to separate list items. Use `Spacing Scale 8` (2.75rem) or `10` (3.5rem) to create separation through void.
*   **Don't** use standard "Blue" for links. All interactive triggers are either Golden (#FFB800) or Deep Black (#1C1B1B).
*   **Don't** center-align long blocks of text. Stick to a left-aligned, "ragged right" editorial alignment.

---

**Director's Final Note:** This design system lives and dies by its confidence. Do not be afraid of the "empty" space—it is not a hole to be filled, but a frame for the content. Keep the edges sharp and the type loud.```