# Design System: Sacrom Monochrome

### 1. Overview & Creative North Star
**Creative North Star: The Brutalist Archive**

Sacrom Monochrome is a design system that rejects the "softness" of modern SaaS interfaces in favor of high-impact editorial storytelling. It draws inspiration from avant-garde print journalism and historical archives. The aesthetic is defined by its architectural rigor: sharp 0px corners, heavy 2px strokes, and a stark black-and-white palette.

The system breaks the "template" look through **Extreme Typographic Scale** and **Structural Tension**. By using fluid viewport-based units (vw) for headings and strict monochromatic layering, the design achieves a sense of monumental weight and cultural authority.

### 2. Colors
The palette is strictly monochromatic, relying on the interplay between deep blacks (`#000000`), architectural grays (`#5F5E5E`), and a warm, paper-like neutral (`#FCF9F4`).

- **The "No-Line" Rule:** While structural dividers use 2px solid strokes to mimic print broadsheets, internal sectioning and content grouping must avoid 1px lines. Instead, transitions are handled by shifting between `Surface` and `Surface-Container` variants.
- **Surface Hierarchy:**
    - `Surface (Base)`: The primary "paper" texture for the experience.
    - `Surface-Container`: Used for subtle differentiation in bento-style grids.
    - `Surface-Container-High`: Used for sticky headers or high-contrast callouts.
- **Glass & Gradient:** Gradients are reserved for legibility over imagery (e.g., bottom-weighted black-to-transparent fades) rather than decorative flares. Backdrop blurs (10px+) are used on navigation bars to maintain depth during scroll.

### 3. Typography
The system utilizes a dual-font approach: **Inter** for structural and data-heavy elements, and **Lora** for narrative texture.

**Typography Scale:**
- **Display (Hero):** 18vw – Massive, tight-kerned, and often "bleeding" off the container or using negative margins to create a sense of scale.
- **Section Headers:** 12vw to 15vw – Defines the start of new narrative chapters.
- **Headline (Large):** 6rem to 8rem – Used for featured titles within grids.
- **Body (Serif):** 1.125rem to 1.875rem (Lora) – Used for pull-quotes and editorial descriptions to provide a rhythmic "rest" for the eyes.
- **Labels/Meta:** 0.5rem to 0.75rem – Heavy tracking (0.3em to 0.5em) and 900 weight. These are the functional "tags" of the archive.

*Note: The system frequently uses "kerning-v-tight" (-0.08em) for large headings to create a dense, block-like typographic texture.*

### 4. Elevation & Depth
Sacrom Monochrome eschews traditional shadows in favor of **Tonal Stacking**.

- **The Layering Principle:** Depth is created by placing high-contrast elements (Black backgrounds) directly against the neutral base.
- **Ambient Shadows:** Standard box-shadows are prohibited. Instead, the "Bleed Text" effect uses a soft white text-shadow (`0 0 10px rgba(252, 249, 244, 0.5)`) to ensure legibility when high-contrast headings overlap complex imagery.
- **The "Ghost Border":** All borders are 2px solid. There are no "soft" borders. If an element needs to feel secondary, use `Outline-Variant` or reduce the opacity of the stroke rather than thinning the line.

### 5. Components
- **Buttons:** Sharp 0px corners. Primary buttons are solid black with white text; secondary buttons are transparent with a 2px black border. Hover states should invert the colors entirely.
- **Bento Grids:** Content is organized into a rigid, multi-span grid. Every cell must share a common border, creating a cohesive "sheet" of information.
- **Marquee:** Used in the footer or for urgent announcements to introduce motion into an otherwise static, architectural layout.
- **Sticky Dividers:** Section headers (e.g., "01 CURATED EXPERIENCES") stick to the top of the viewport with a backdrop blur, acting as a persistent navigation anchor.

### 6. Do's and Don'ts
- **Do** use massive typographic scales that might feel "uncomfortably large" in traditional UI.
- **Do** apply `grayscale` filters to all imagery by default, revealing color only on hover.
- **Don't** use rounded corners. Every element must be a sharp rectangle.
- **Don't** use 1px lines. They appear weak in this system; stick to 2px for structural integrity.
- **Do** use intentional asymmetry (e.g., negative margins on headings) to break the grid's rigidity.