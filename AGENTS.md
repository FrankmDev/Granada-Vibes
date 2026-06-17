# AGENTS.md

Guía de contexto para agentes de código (OpenCode, Claude, etc.) trabajando en Granada Urban (GRN URBAN). Lee esto antes de tocar cualquier archivo.

---

## Comandos

```bash
bun run dev           # Servidor de desarrollo Astro
bun run build         # Limpia/sincroniza eventos, build estático y verifica sitemap
bun run preview       # Preview del build estático
bun run sync:events   # Flujo diario: limpia eventos, busca nuevos, build y sitemap
```

- **ESLint y Prettier** están instalados pero no tienen scripts en `package.json`.
- **No hay tests** configurados.
- Node >= 22.12.0.

---

## Stack verificado

- **Astro 6** — SSG estático (`output: 'static'` en `astro.config.mjs`).
- **TypeScript strict** — `strict: true`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.
- **Tailwind CSS v3** (no v4). Configurado vía `postcss.config.cjs` y `tailwind.config.mjs`.
- **Sin React, Vue ni frameworks de componentes**. Interactividad: Astro Islands + JS/TS vanilla únicamente.
- **Fuentes**: Fraunces + DM Sans vía `@fontsource` (importadas en `src/styles/global.css`).
- **Iconos**: SVG inline o componentes Astro. No usar librerías de iconos externas.

---

## Arquitectura

### i18n y routing

Español es locale por defecto, sin prefijo. Inglés bajo `/en/`.

| Español | Inglés |
|---|---|
| `/` | `/en/` |
| `/eventos` | `/en/events` |
| `/eventos/[slug]` | `/en/events/[slug]` |
| `/rutas` | `/en/routes` |
| `/rutas/[slug]` | `/en/routes/[slug]` |
| `/rutas/por-tiempo` | `/en/routes/by-time` |
| `/rutas/por-tiempo/[slug]` | `/en/routes/by-time/[slug]` |
| `/guias` | `/en/guides` |
| `/guias/[slug]` | `/en/guides/[slug]` |
| `/privacidad` | `/en/privacy` |
| `/aviso-legal` | `/en/legal` |

- Cada locale tiene su propio árbol en `src/pages/` y `src/pages/en/`.
- No se usa la integración i18n de Astro para el routing visible (aunque `astro.config.mjs` tiene `i18n` configurado para el sitemap).
- El locale se determina manualmente con `getLocaleFromPath(pathname)` en `src/utils/paths.ts`.
- Traducciones: `src/i18n/locales/es.ts` y `en.ts` (named exports). Usar `useTranslations(locale)` desde `src/i18n/utils.ts` para obtener `t('nav.events')` type-safe.
- **Regla estricta**: ningún texto de UI hardcodeado en componentes. Siempre `useTranslations()`.

### Data Layer

Todo el contenido son arrays TypeScript estáticos en `src/data/`:

- `src/data/events/` — `Event[]`, helpers: `getAllEvents`, `getFeaturedEvents`, `getEventBySlug`, `getUpcomingEvents`...
- `src/data/routes/` — `Route[]`, helpers: `getAllRoutes`, `getFeaturedRoutes`, `getRouteBySlug`...
- `src/data/mixed-routes/` — `MixedRoute[]`, helpers: `getAllMixedRoutes`, `getMixedRouteBySlug`, `getMixedRouteByDuration`
- `src/data/blog/` — `BlogPost[]`, helpers: `getAllPosts`, `getFeaturedPosts`, `getPostBySlug`, `getRelatedPosts` (sección pública: /guias / /en/guides)
- `src/data/venues/` — datos auxiliares de venues

Todos los helpers se re-exportan desde `src/data/index.ts`. Sin CMS ni API externa en Fase 1.

Los campos bilingües usan `LocalizedText`: `{ es: string; en: string }`. Poblar siempre ambos locales.

**Convención de imports ESM**: en `src/data/*/index.ts` se importan archivos `.ts` con extensión `.js` (ej. `from './queries.js'`). Mantener esta convención.

### Path Aliases (tsconfig.json / vite.config)

```
@/*          → src/*
@components/* → src/components/*
@layouts/*    → src/layouts/*
@utils/*      → src/utils/*
@types/*      → src/types/*
@data/*       → src/data/*
@config/*     → src/config/*
@i18n/*       → src/i18n/*
@styles/*     → src/styles/*
@assets/*     → src/assets/*
```

---

## Sistema de diseño

### Tokens (`src/styles/tokens.css`)

Tema oscuro "Alhambra Noir" (hero + nav) + paleta crema editorial (resto de secciones).

```css
/* Oscuro */
--color-bg: #080808;
--color-bg-raised: #111111;
--color-bg-card: #171717;
--color-text-primary: #f0ede8;
--color-text-secondary: #9a9490;
--color-accent: #e8622a;
--color-gold: #c9a84c;

/* Crema (secciones home no-hero) */
--s-bg: #f5f0ea;
--s-ink: #1a1619;
--s-orange: #e8622a;
--s-gold: #c9a84c;
--s-border: rgba(26, 22, 25, 0.12);
```

### Tipografía — TRAMPA CRÍTICA

En **CSS tokens** (`tokens.css` / `global.css`):
- `--font-display: 'DM Sans', sans-serif` → UI, body, labels, nav.
- `--font-body: 'Fraunces', serif` → headlines, display, números grandes.

En **Tailwind config** (`tailwind.config.mjs`) el naming está **invertido**:
- `fontFamily: { display: ['Fraunces'], body: ['DM Sans'] }`

**Regla práctica**: si es título grande, hero, o número destacado → usar `font-family: var(--font-body)` (Fraunces) directamente en CSS, o ser consciente de la inversión si usas clases Tailwind.

### CSS: pura vs Tailwind

- **Componentes de sección home** (`src/components/home/*`): **CSS puro en `<style>`**, sin clases Tailwind. Definen sus propias CSS custom properties locales (`--s-*`).
- **Componentes UI y layout** (`src/components/ui/*`, `src/components/layout/*`): pueden usar Tailwind + CSS puro en `<style>` cuando sea necesario.
- **Páginas y layouts**: Tailwind permitido.

---

## Patrones visuales globales (`global.css`)

Reutilizados en múltiples componentes. No reinventar:

### Screen Frame
```css
.cin-screen-frame { position: absolute; inset: 1.5rem; border: 1px solid rgba(255,255,255,0.06); pointer-events: none; z-index: 20; }
.cin-corner::before { width: 12px; height: 1px; background: var(--color-gold-dim); }
.cin-corner::after  { width: 1px; height: 12px; background: var(--color-gold-dim); }
```
Componente: `ScreenFrame.astro`.

### Glass morphism
```css
background: rgba(255,255,255,0.03–0.08);
backdrop-filter: blur(20–40px) saturate(140%);
border: 1px solid rgba(255,255,255,0.08–0.15);
border-radius: 100px; /* pills */
```

### Char-by-char title reveal
```astro
{title.split('').map((char, i) => (
  <span class="title-char" style={`--delay: ${i * 0.1}s`}>{char === ' ' ? '\u00A0' : char}</span>
))}
```
```css
.title-char { display: inline-block; opacity: 0; transform: translateY(40px); animation: char-rise 1.5s var(--ease-out-expo) var(--delay) forwards; }
```

### Cell Grid (gap visible como fondo)
```css
.grid { display: grid; gap: 1px; background: rgba(26,22,25,0.12); }
.cell { background: var(--s-bg); }
```

### Corner Brackets (hover en cards)
```css
.corner-bracket { position: absolute; width: 18px; height: 18px; border-color: white; border-style: solid; border-width: 0; opacity: 0; transition: opacity 0.4s ease; }
.card:hover .corner-bracket { opacity: 0.8; }
```

### Imágenes en cards
```css
/* Reposo */
filter: grayscale(25%) contrast(1.05) brightness(0.8); transform: scale(1.08);
/* Hover */
filter: grayscale(0%) brightness(0.88); transform: scale(1.0);
transition: 1.2s cubic-bezier(0.19, 1, 0.22, 1);
```

### Grain texture
```css
.cin-grain { position: absolute; inset: 0; pointer-events: none; z-index: 1; background-image: url("data:image/svg+xml,...feTurbulence..."); mix-blend-mode: soft-light; opacity: 0.03; }
```

---

## Home — secciones actuales

`src/pages/index.astro` compone:

1. **HeroSection** — Portal arquitectónico oscuro. Video ambiental blur, título colosal con `char-rise`, portal lens (`border-radius: 40vw`), glass dock (reloj Europe/Madrid + clima Open-Meteo + CTA), parallax/glare con mousemove (desktop), boot screen fade.
2. **EventsGridSection** — Masonry 3 columnas, fondo crema. Alturas variables por columna. Overlays con gradiente `linear-gradient(to top, rgba(0,0,0,0.92), transparent)`.
3. **RoutesGridSection** — Acordeón flex cinemático. Desktop: 5+ rutas como flex items, hover expande a `flex: 7`, inactivas `flex: 1` con `grayscale(100%) brightness(0.5)`. Labels verticales con `writing-mode: vertical-rl`.
4. **TimeRoutesSection** — Planes por tiempo disponible. Cards con gradiente propio por duración (`2h`, `1day`, `2days`).
5. **BlogSection** — Editorial de artículos, fondo oscuro. 1 featured + 2 recientes. `ScreenFrame` con tags `EDITORIAL / GRANADA`.
6. **HomeCTA** — CTA final, fondo crema con grain. Headline char reveal en dos filas. Estrella nazarí SVG.

---

## Layout y componentes clave

### BaseLayout (`src/layouts/BaseLayout.astro`)

Layout raíz. Acepta `locale`, props SEO y `schemaType`/`schemaData` opcionales para JSON-LD.

Incluye scripts inline para:
- **Scroll reveal**: observa `.scroll-animate` y les añade `.is-visible`.
- **Section in-view**: observa `.editorial-section`, `.seasonal`, `.routes-section`, `.cta-hero` y les añade `.in-view`.
- **View transitions / reduced motion**: detecta `prefers-reduced-motion`.

### NavBar (`src/components/layout/NavBar.astro`)

Doble estado:
- **Transparente sobre hero**: barra superior con gradiente negro, filmstrip ticks, links centrales numerados `[01] EVENTOS`, idioma pill, trigger de menú.
- **Scrolled capsule**: pill flotante centrada (`nb-capsule`) que aparece al hacer scroll, detectada por **IntersectionObserver** sobre un `.nb-sentinel` de 1px (no scroll listener).

**Grand Gate**: overlay fullscreen (`role="dialog"`) con curtain panels, grain, números fantasma, estrella nazarí y links grandes. Se controla vía clases `is-open` y atributos `aria-expanded`.

**Links activos**: clase `is-active` + color accent + underline animado con `scaleX`.

### FilterBar (eventos y rutas)

Lógica combinada con AND. Cada card tiene `data-category`, `data-neighborhood`, `data-price`, `data-date` (eventos) o `data-type`, `data-difficulty`, `data-duration`, `data-timeofday` (rutas).

- **Eventos**: chips categoría + dropdown barrio + dropdown cuándo (hoy / semana / finde / mes) + toggle solo gratis.
- **Rutas**: chips tipo + chips dificultad (verde/ámbar/rojo) + dropdown duración + dropdown mejor momento.

Botón "Limpiar filtros" solo visible con filtros activos. Contador dinámico. Empty state obligatorio — nunca grid vacío.

### EventCard

- Badge proximidad: HOY (accent pulsante) / MAÑANA / ESTA SEMANA.
- Featured: `border-left: 3px solid var(--color-accent)` + fondo `--color-bg-subtle`.
- Precio: badge `--color-success` si free, neutro si pagado, muted con "?" si unknown.

### RouteCard

- Dificultad con color: `--color-difficulty-easy/moderate/hard`.
- Barra visual: `[■□□]` fácil, `[■■□]` moderada, `[■■■]` difícil.
- Mejor momento: icono sol (mañana/tarde) o luna (atardecer/noche).

### Páginas de detalle `[slug]`

- Layout 70/30 desktop (contenido + sidebar sticky), stack mobile.
- Web Share API en "Compartir", fallback a copiar URL al clipboard.
- JSON-LD: schema `Event` para eventos, `TouristAttraction` para rutas.
- Sección "relacionados" en sidebar: 2-3 items del mismo tipo/categoría.

---

## SEO

`BaseLayout` genera `title`, `meta description`, `canonical`, `og:*`, `hreflang es↔en`, `lang` en `<html>`.

- Patrón evento: `"[Nombre] en Granada — [fecha]. [Lugar]. [Precio]."`
- Patrón ruta: `"Ruta de [tipo] por [barrio]: [duración], [distancia]. Dificultad [nivel]."`
- `og:image` placeholder: `https://placehold.co/1200x630/080808/f0ede8?text=Granada+Vibes`
- `@astrojs/sitemap` activado. `robots.txt` incluido.
- JSON-LD en todas las páginas de detalle vía `SchemaMarkup.astro`.

### Checklist de lanzamiento SEO (día D)

Ejecutar **el mismo día** que se apunte el dominio definitivo a Vercel/Netlify:

1. **Verificar dominio en Google Search Console**
   - Añade la propiedad de dominio (o URL prefix) en [https://search.google.com/search-console](https://search.google.com/search-console).
   - Copia el código de verificación (meta tag HTML).
   - Pégalo en `src/config/site.ts` como `googleSiteVerification: 'TU_CODIGO_AQUI'`.
   - Pasa esa propiedad a `BaseLayout` desde la página raíz o el layout global si se decide hacerlo global.
   - Haz `bun run build` y despliega.
   - Pulsa "Verificar" en GSC.

2. **Enviar sitemap**
   - En GSC, ve a *Sitemaps*.
   - Añade `sitemap-index.xml` y envía.
   - Confirma que el estado es "Correcto" (puede tardar unos minutos).

3. **Solicitar indexación manual de la home**
   - Inspecciona la URL `https://<dominio>/`.
   - Pulsa "Solicitar indexación".
   - Repite para `/eventos/`, `/rutas/`, `/guias/`.

4. **Comprobar OG en redes sociales**
   - Facebook: [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
   - LinkedIn: [https://www.linkedin.com/post-inspector/](https://www.linkedin.com/post-inspector/)
   - Twitter/X: [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
   - WhatsApp: comparte un enlace en un chat contigo mismo y comprueba la preview.

5. **Rich Results Test**
   - Valida al menos una ruta (`TouristAttraction`) y un artículo (`Article`) en [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results).

6. **Verificar hreflang**
   - Usa [https://technicalseo.com/tools/hreflang/](https://technicalseo.com/tools/hreflang/) para confirmar que no hay errores entre `/` y `/en/`.

> Nota: `robots.txt` apunta a `https://www.granadaurban.com/sitemap-index.xml`. Si el dominio definitivo cambia, actualiza `astro.config.mjs` (`site`), `robots.txt` y `src/config/site.ts` (`url`) **antes** del build de producción.

---

## Animaciones

- **CSS puro únicamente**. Cero librerías de animación JS.
- **IntersectionObserver** para activar clases (scroll reveal, section in-view). Cero scroll listeners.
- Stagger via CSS custom properties (`--delay`, `--card-index`).
- Keyframes globales en `global.css`: `char-rise`, `cell-reveal`, `portal-reveal`, `dock-rise`, `cin-fade-in`, `fadeInUp`.
- `@media (prefers-reduced-motion: reduce)` en `global.css` reduce duraciones a 0.01ms.

---

## Reglas de código (forzadas por eslint/config)

- **Cero `any`** — eslint: `@typescript-eslint/no-explicit-any: error`. Usar `unknown` + narrowing.
- **Cero `console.log`** — eslint: `no-console: warn` (solo `warn`/`error` permitidos).
- **Cero colores hardcodeados** — siempre `var(--color-*)` o variables locales del componente (`--s-*`).
- **Cero strings literales** para categorías, dificultades, barrios, timeOfDay — siempre union types de `src/types/index.ts`.
- **Cero librerías JS externas** para interactividad — vanilla TS únicamente.
- **Cero scroll listeners** — usar IntersectionObserver.
- **Variables y funciones**: inglés. Contenido y UI: español/inglés según locale.
- **Archivos de data**: importar con extensión `.js` aunque el archivo sea `.ts` (convención ESM del proyecto).
- **Commits semánticos**: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`.

---

## Lo que NO hacer

- No uses React, Vue, ni ningún framework de componentes.
- No uses librerías de componentes externas (shadcn, daisyUI, Flowbite...).
- No uses CSS-in-JS.
- No dejes TODOs sin contexto — escribe `TODO: [descripción accionable]`.
- No inventes dependencias npm innecesarias.
- No uses `any` ni `as unknown as X` para evadir el tipado.
- No rompas tipos existentes — extiende siempre con campos opcionales.
- No hardcodees textos en componentes — siempre `useTranslations()`.
- No repitas el tagline "ciudad de la Alhambra" más de una vez por página.
- No implementes nada de Fase 2 o 3 — deja los tipos preparados, no las dependencias.

---

## Fases del proyecto

- **Fase 1 (actual)**: Web estática con datos mock. Filtros funcionales. Páginas de detalle completas. SEO bien trabajado.
- **Fase 2**: CMS Sanity. Formulario de contacto con Resend. Mapa interactivo (Mapbox o Leaflet).
- **Fase 3**: IA contextual ("tengo 2h en el Albaicín, qué hago"). Autenticación. Rutas guardadas. Modo Semana Santa.

---

## BlogDetailHero — v15 "ALHAMBRA SPREAD · Refined" (integrada)

`src/components/blog/BlogDetailHero.astro` es el hero oscuro de las páginas de detalle de guías (`/guias/[slug]/`). v15 es un **spread editorial de revista**: la imagen de portada a la izquierda con tratamiento cinematográfico (corner brackets, vignette, glare, stamp, glow, shadow) y el título monumental a la derecha con lead + italic accent focal, decorado con un aura radial y un mark diamante. Sin data dock, sin ghost label, sin folio PLIEGO.

### Concepto

Un spread abierto: la imagen de portada actúa como "cover photo" y el título como "cover title". La asimetría (grid 38fr / 62fr) crea tensión. El **title aura** (gradiente radial detrás del título) y el **title mark** (diamante rotado 45° a la derecha) dan carácter editorial sin romper la limpieza. La brújula y el eje en la capa decorativa aportan profundidad cartográfica.

### Reglas de integración obligatorias

- **Tokens globales**: usar SIEMPRE `var(--color-*)` de `src/styles/tokens.css`. NUNCA tokens locales `--s-*`.
- **Header spacing real**: la NavBar fija mide **72px** (no usar `var(--header-height)` que es 64px). Back link y REF a `top: 2.25rem` desde la sección (bhero). Stage con `padding-top: 4.5rem` (bhero + 4.5rem clearance bajo el back-link).
- **ScreenFrame**: importar `<ScreenFrame />` de `@components/ui/ScreenFrame.astro`. TL = `ARCHIVO · {archiveRef}`, TR = `categoryLabel`, BL = `GRN URBAN`, BR = `coordinates`. Frame inset: `1.5rem` en los 4 lados.
- **Capas atmosféricas (6)**: `bhero-mesh` (3 radial gradients sobre `#0a0a0a`), `bhero-radial` (2 spotlights gold/orange), `bhero-shaft` (gradiente diagonal 118° en screen blend), `bhero-grid` (cuadrícula 80px enmascarada con radial), `bhero-vignette` (corners darken), `bhero-grain` (SVG turbulence mix-blend soft-light).
- **Capa decorativa (7)**: `deco-ring r1/r2`, `deco-dot d1`, `deco-line v1/h1`, `deco-compass c1` (doble cuadrado rotado), `deco-axis a1` (línea con remates diamante). Sin ghost label.
- **Cover image treatment**: `OptimizedImage` con `aspect-ratio: 3/4`, `width: 100%`, `max-height: calc(100svh - 220px)`, `object-fit: cover`, `filter: saturate(1.05) contrast(1.08) brightness(0.92)`. Wrapper con `border-radius: 14px`, shadow 3-layer, corner brackets 22px (crecen a 36px en hover con gold), vignette radial + glare sweep. Stamp "CULTURA Nº 003" rotated -1.5deg top-left. Ribbon "DESTACADA" orange top-right si `featured`. Glow gold radial detrás.
- **Title decorations**: `bhero-title-aura` (gradiente radial orange/gold detrás del título con `filter: blur(14px)` y `opacity: 0`). `bhero-title-mark` (cuadrado rotado 45° con `border: 1px solid gold`, `position: absolute` a la derecha del título, 96-170px responsive).
- **Title char-by-char** con stagger y NBSP para espacios. `text-wrap: pretty`. Lead en Fraunces Thin (100), focal en Fraunces ExtraLight italic (200) orange con hanging indent, `::before` swipe gradient bajo focal, `::after` small rule sobre focal.
- **Bottom bar**: `categoryLabel ◆ VOL. I · 2026 ◆ 37°10′N · 3°35′W`. `align-items: flex-start` + `padding-bottom: 1.5rem` (matching frame inset) para evitar que el texto del bar pise la línea inferior del ScreenFrame.
- **Sin gimmicks eliminados**: NO data dock, NO ghost label, NO bento card, NO numeral romano, NO eyebrow rule triple, NO ornament, NO PLIEGO folio.

### Estructura del template

```
<section class="bhero" data-bhero>
  <ScreenFrame ... />

  <!-- 6 capas atmosféricas (z-index 1) -->
  <div class="bhero-canvas">
    <div class="bhero-mesh" /> <div class="bhero-radial" /> <div class="bhero-shaft" />
    <div class="bhero-grid" /> <div class="bhero-vignette" /> <div class="bhero-grain" />
  </div>

  <!-- Capa decorativa (z-index 2) -->
  <div class="bhero-deco">
    <span class="deco-ring r1/r2" /> <span class="deco-dot d1" />
    <span class="deco-line v1" /> <span class="deco-line h1" />
    <span class="deco-compass c1" /> <span class="deco-axis a1" />
  </div>

  <!-- Nav scrim (z-index 5) -->
  <div class="bhero-nav-scrim" />

  <!-- Back link top-left a top: 2.25rem (z-index 30) -->
  <a class="bhero-back">← {backLabel}</a>

  <!-- Archive REF top-right (z-index 30) -->
  <div class="bhero-ref">REF. {archiveRef}</div>

  <!-- Main spread 38fr/62fr (z-index 10) -->
  <div class="bhero-stage">
    <div class="bhero-spread">
      <!-- LEFT: Cover image -->
      <figure class="bhero-figure">
        <div class="bhero-figure-wrap">
          <OptimizedImage /> | <fallback nazarí SVG />
          <span class="bhero-figure-vignette" />
          <span class="bhero-figure-glare" />
          <span class="bracket tl/tr/bl/br" /> <!-- 4 corner brackets -->
          <div class="bhero-stamp">{category} · Nº {ref}</div>
          {featured && <div class="bhero-ribbon">★ {featuredLabel}</div>}
        </div>
        <div class="bhero-figure-glow" /> <div class="bhero-figure-shadow" />
        <figcaption class="bhero-caption">ARCHIVO · {ref} · coords</figcaption>
      </figure>

      <!-- RIGHT: Editorial lockup -->
      <div class="bhero-text">
        <div class="lockup-rule" />
        <div class="bhero-eyebrow">line + EDICIÓN · GUÍA / {category} + line</div>
        <div class="bhero-meta">
          <span class="bhero-cat">{category}</span>
          <span class="bhero-sections">{N} secciones</span>
        </div>
        <h1 class="bhero-title">
          <span class="bhero-title-aura" />   <!-- radial gradient behind title -->
          <span class="bhero-title-mark" />   <!-- diamond mark on right -->
          <span class="bhero-title-lead">{lead}</span>     <!-- huge regular cream -->
          <span class="bhero-title-focal">{focal}</span>   <!-- huge italic accent hanging -->
        </h1>
        <p class="bhero-lead">"{description}"</p>
      </div>
    </div>
  </div>

  <!-- Bottom bar (hidden on mobile) — content above ScreenFrame bottom line -->
  <div class="bhero-bottom-bar">categoryLabel ◆ VOL. I · 2026 ◆ 37°10′N · 3°35′W</div>

  <!-- Scroll hint (mobile only) -->
  <div class="scroll-hint">line + scroll text</div>
</section>
```

### Stagger de animaciones (todos usan `var(--ease-expo)`)

| Delay | Elemento |
|---|---|
| 0.20s | `.bhero-back` |
| 0.30s | `.bhero-ref` |
| 0.35s | `.lockup-rule` |
| 0.40s | `.bhero-figure` (slide + rotate) |
| 0.45s | `.bhero-eyebrow` |
| 0.55s | `.bhero-meta` |
| 0.65s | `.bhero-title-aura` (fade-in) |
| 0.82s | `.bhero-title-mark` (scale + rotate-in) |
| 0.35s + i·0.028s | `.bhero-char` (todos los chars del lead) |
| + i·0.028s (continuación) | `.bhero-char--focal` (chars del focal) |
| 0.95s | `.bhero-lead` |
| 1.00s | `.bhero-stamp` (rotate-in) |
| 1.05s | `.bhero-title-focal::before` (focal swipe) |
| 1.10s | `.bhero-ribbon` (drop-in) |
| 1.15s | `.bhero-title-focal::after` (focal rule) |
| 1.20s | `.bhero-bottom-bar` |
| 1.30s | `.bhero-caption` |
| 1.8s | `.deco-compass` (rotate + scale-in) |
| 1.4s | `.deco-axis` (scaleX-in) |
| 6-9s loop | `.bhero-figure-glow` (breathe), `.deco-dot` (float) |

### Title char-by-char y `text-wrap: pretty`

El título se renderiza palabra por palabra, char por char con stagger. Los espacios entre palabras son `<span class="bhero-space">{'\u00A0'}</span>` con NBSP (`\u00A0`) porque Astro colapsa espacios normales dentro de spans. CSS: `.bhero-space { display: inline-block; width: 0.24em; min-width: 0.24em; }`.

`text-wrap: pretty` se aplica al título y al lead. Adicionalmente: `word-break: normal; overflow-wrap: normal; hyphens: none;`.

### Title split (lead + focal)

Frontmatter logic — skip words ES+EN, strong words ≥5 chars, isSkip/isStrong helpers. Resultado:
- "Miradores de Granada" → `Miradores` / `de Granada` ✓
- "Sierra Nevada desde Granada" → `Sierra Nevada` / `desde Granada` ✓
- "Tapas gratis en Granada" → `Tapas gratis` / `en Granada` ✓
- "Carocas de Granada" → `Carocas` / `de Granada` ✓
- "Albaicín a pie" → `Albaicín` / `a pie` ✓

### Title decorations (aura + mark)

- **`.bhero-title-aura`**: `position: absolute`, `z-index: -2`, `inset: -0.22em -0.18em -0.08em -0.14em`, doble radial gradient (orange 67% 58% + gold 28% 38%), `filter: blur(14px)`, fade-in 0.65s.
- **`.bhero-title-mark`**: `position: absolute`, `z-index: -1`, `width: clamp(96px, 10vw, 170px)`, `aspect-ratio: 1`, `right: clamp(0rem, 4vw, 2rem)`, `top: 50%`, `transform: translateY(-50%) rotate(45deg) scale(0.88)`, `border: 1px solid gold`, con `::before` y `::after` para capas internas, scale-in 0.82s.

### Title focal enhancements

- `padding-left: clamp(0.85rem, 5.9vw, 4.35rem)` — hanging indent
- `width: fit-content` — focal se ajusta al contenido
- `::before` — gradient swipe bajo el focal (skewX -18deg, scaleX 0→1)
- `::after` — small gold rule encima del focal (rotate -18deg, scaleX 0→1)

### Cover image fallback

Si `post.image` es undefined, se muestra un SVG nazarí centrado con fondo gradiente `#1a1410 → #2a1f15`. Sin corner brackets ni stamp.

### Geometry constraints

- **Hero height**: `height: calc(100svh - 72px)` — exact fit, no scroll
- **Stage padding**: `4.5rem top / 1.5rem bottom` — keeps image below back-link area
- **Spread**: `align-items: center` — both columns visually balanced
- **Figure-wrap**: `aspect-ratio: 3/4` + `max-height: calc(100svh - 220px)` — never overflows, never stretches
- **Bottom bar**: `align-items: flex-start` + `padding-bottom: 1.5rem` — bar text above frame line

### Responsive

- **Desktop ≥1024px**: spread 38fr/62fr, title max 7.85rem, mark 96-170px
- **Tablet 768-1024px**: spread 34fr/66fr, title 4.45rem, mark scaled down
- **Mobile <768px**: stack vertical (image on top, text below), title 3.4rem, mark width 104px
- **Mobile <480px**: image max-width 260px, title 2.72rem, focal `::after` hidden

### Props del componente

```typescript
interface Props {
  post: BlogPost;
  locale: Locale;
  readingMinutes: number;     // legacy, ya no se usa (sin dock)
  sectionCount: number;       // usado en bhero-sections badge
  displayTitle?: string;      // ya aplicado getBlogDisplayTitle
}
```

### Archivos relacionados (NO modificar al extender)

- `src/components/ui/ScreenFrame.astro` — componente global del marco cinematic
- `src/components/ui/OptimizedImage.astro` — usado para la cover image (soporta local + remote)
- `src/styles/tokens.css` — tokens `--color-*`, `--ease-out-expo`, `--font-display/body`
- `src/styles/global.css` — `.cin-screen-frame`, `.cin-corner`, `.cin-frame-tag`, `.cin-grain`, `@keyframes char-rise`
- `src/components/events/EventDetailHero.astro` — referencia para el tratamiento cinematográfico de la imagen (corner brackets, vignette, glare, stamp, ribbon)
- `src/styles/pages/blog-detail.css` — estilos del artículo cream debajo del hero (NO tocar)
