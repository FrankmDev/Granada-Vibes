# AGENTS.md

Guía de contexto para agentes de código (OpenCode, Claude, etc.) trabajando en Granada Vibes. Lee esto antes de tocar cualquier archivo.

---

## Comandos

```bash
npm run dev           # Servidor de desarrollo Astro
npm run build         # Build estático para producción
npm run preview       # Preview del build estático
npm run fetch:events  # Ejecuta scripts/package.json (scraping de eventos, requiere .env)
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
| `/blog` | `/en/blog` |
| `/blog/[slug]` | `/en/blog/[slug]` |
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
- `src/data/blog/` — `BlogPost[]`, helpers: `getAllPosts`, `getFeaturedPosts`, `getPostBySlug`, `getRelatedPosts`
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
