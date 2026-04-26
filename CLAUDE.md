# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Granada Vibes

Guía de contexto para Claude Code. Lee esto antes de tocar cualquier archivo.
Respeta estas decisiones. No las cuestiones salvo que haya un error técnico real.

---

## Comandos

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build para producción
npm run preview    # Preview del build
```

ESLint y Prettier están instalados como devDependencies pero no tienen
scripts configurados en package.json. No hay tests configurados.

---

## Qué es este proyecto

Granada Vibes es una guía cultural web de Granada, España. Combina calendario de
eventos culturales y rutas curadas de la ciudad. Público: turistas nacionales e
internacionales. Idiomas: español (por defecto, sin prefijo) e inglés (bajo /en/).

**Objetivo estratégico real:** posicionarse en SEO local de Granada y servir como
herramienta de captación de clientes para servicios de desarrollo web y marketing
local. Diseñado para escalar: CMS (Sanity previsto en Fase 2), posiblemente
autenticación y funcionalidades de IA en Fase 3.

---

## Stack

- Astro 6 — SSG estático
- TypeScript — strict mode
- Tailwind CSS v3 — clases utilitarias + design tokens en CSS custom properties
- Sin React, Vue ni ningún framework de componentes
- Interactividad: Astro Islands + JS/TS vanilla únicamente
- Fuentes: Fraunces (headlines/display) + DM Sans (body/UI) vía @fontsource
- Iconos: astro-icon con Lucide

---

## Arquitectura

### Routing e i18n

Español es el locale por defecto, sin prefijo de URL. Inglés bajo `/en/`:

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

Cada locale tiene su propio árbol de páginas en `src/pages/` y `src/pages/en/`.
No hay integración i18n de Astro — el locale se determina con
`getLocaleFromPath(pathname)` en `src/utils/paths.ts`.

Las traducciones viven en `src/i18n/locales/es.ts` y `src/i18n/locales/en.ts`.
Usar `useTranslations(locale)` desde `src/i18n/utils.ts` para obtener una función
`t(key)` type-safe. Las claves usan dot notation: `t('nav.events')`.

**Regla:** ningún texto de UI va hardcodeado en componentes. Siempre useTranslations().

### Data Layer

Todo el contenido son arrays TypeScript estáticos en `src/data/`, con cuatro dominios:
- `src/data/events/` — `Event[]`, query helpers (`getAllEvents`, `getFeaturedEvents`, `getEventBySlug`, …)
- `src/data/routes/` — `Route[]`, query helpers (`getAllRoutes`, `getFeaturedRoutes`, `getRouteBySlug`, …)
- `src/data/mixed-routes/` — `MixedRoute[]` (planes por tiempo disponible), helpers (`getAllMixedRoutes`, `getMixedRouteBySlug`, `getMixedRouteByDuration`)
- `src/data/blog/` — `BlogPost[]`, helpers (`getAllPosts`, `getFeaturedPosts`, `getPostBySlug`, `getRelatedPosts`, `getPostsByTag`) (sección pública: /guias / /en/guides)
- `src/data/venues/` — datos de venue auxiliares (coordenadas, descripciones)

Todos los helpers se re-exportan desde `src/data/index.ts`. Sin CMS ni API externa en Fase 1.

Los campos bilingües usan el tipo `LocalizedText`: `{ es: string; en: string }`.
Poblar siempre ambos locales al añadir o editar contenido.

**Criterio de calidad de los mock:** tienen exactamente la misma forma que tendrán
los datos reales cuando venga Sanity. Al diseñar tipos, pensar en cómo los devolvería
una query GROQ: campos predecibles, localización como objeto `{ es, en }`, no arrays
paralelos. Al menos 4 eventos y 4 rutas deben tener todos los campos opcionales rellenos.

### Tipos (src/types/index.ts)

Todos los tipos compartidos exportados desde aquí:
- `Locale` — `'es' | 'en'`
- `LocalizedText` — `{ es: string; en: string }`
- `SEOMetadata`, `SiteConfig` — shapes de configuración del sitio
- `EventCategory` — union: `'concert' | 'exhibition' | 'festival' | 'market' | 'theater' | 'workshop' | 'guided-tour' | 'cinema' | 'other'`
- `EventSource` — union de fuentes de datos externas (`'ticketmaster' | 'eventbrite' | 'yuzin' | … | 'manual' | 'mock'`)
- `Neighborhood` — union: `'albaicin' | 'sacromonte' | 'centro' | 'realejo' | 'alhambra' | 'cartuja' | 'zaidin' | 'otro'` (lowercase)
- `RouteDifficulty` — union: `'easy' | 'moderate' | 'challenging'`
- `RouteCategory` — union: `'viewpoint' | 'tapas' | 'monuments' | 'hiking' | 'photography' | 'secrets' | 'history' | 'flamenco'`
- `TimeOfDay` — union: `'morning' | 'afternoon' | 'sunset' | 'evening' | 'any'`
- `Event` — eventos culturales con venue, precio, categoría, barrio + campos de trazabilidad (`source`, `sourceId`, `sourceUrl`)
- `Route` — rutas con difficulty, duration (min), distance (km), timeOfDay, neighborhoods[], highlights[], tips[]
- `TimeDuration` — union: `'2h' | '6h' | '12h' | '1day' | '2days' | '3days'`
- `MixedStopCategory` — union: `'mirador' | 'tapas' | 'monumento' | 'cultura' | 'paseo' | 'compras' | 'naturaleza' | 'flamenco'`
- `MixedRoute` — planes por tiempo disponible con `days: MixedRouteDayPlan[]` → `blocks: MixedRouteTimeBlock[]` → `stops: MixedRouteStop[]`
- `BlogCategory` — union: `'guia' | 'cultura' | 'gastronomia' | 'barrios' | 'consejos'`
- `BlogPost` — artículos con `content: { es: string; en: string }`, `publishDate`, `readingTime`, `featured`
- `ButtonVariant`, `ButtonSize`, `BadgeVariant` — UI component props

Nunca strings libres para categorías, dificultades o barrios. Siempre union types.

Campos opcionales de `Event` para páginas de detalle:
```typescript
venueDescription?: LocalizedText
highlights?: { es: string[]; en: string[] }
tips?: LocalizedText
ticketsUrl?: string
```

Campos opcionales de `Route` para páginas de detalle:
```typescript
longDescription?: LocalizedText
whatToBring?: { es: string[]; en: string[] }
bestMonths?: string[]
```

Al añadir campos, extender siempre con opcionales. No romper tipos existentes.

### Layout y estilos

`BaseLayout.astro` es el layout raíz de todas las páginas. Acepta `locale`,
props de SEO y `schemaType`/`schemaData` opcionales para JSON-LD structured data.

Los design tokens están en `src/styles/tokens.css` como CSS custom properties
(tema oscuro "Alhambra Noir" para el hero + paleta crema editorial para el resto).
Usar siempre variables de token o variables locales del componente, nunca colores hardcodeados.

### Path Aliases (tsconfig.json)

- `@types` → `src/types/index.ts`
- `@config/site` → `src/config/site.ts`
- `@components/*` → `src/components/*`

---

## Design Tokens (src/styles/tokens.css)

```css
/* Fondos oscuros (hero, NavBar) */
--color-bg:             #080808;
--color-bg-raised:      #111111;
--color-bg-card:        #171717;
--color-bg-subtle:      #1e1e1e;
--color-border:         #242424;
--color-border-subtle:  #1a1a1a;

/* Texto */
--color-text-primary:   #f0ede8;
--color-text-secondary: #9a9490;
--color-text-muted:     #5a5550;
--color-text-inverse:   #080808;

/* Acento naranja (granada, el fruto) */
--color-accent:         #e8622a;
--color-accent-hover:   #f07040;
--color-accent-muted:   rgba(232, 98, 42, 0.10);

/* Acento dorado (Alhambra) */
--color-gold:           #c9a84c;
--color-gold-text:      #e6c587;
--color-gold-dim:       rgba(201, 162, 39, 0.45);
--color-gold-muted:     rgba(201, 168, 76, 0.10);

/* Semánticos */
--color-success:        #4a9e6b;
--color-error:          #c94a4a;

/* Dificultad de rutas */
--color-difficulty-easy:     var(--color-success);
--color-difficulty-moderate: #d4873a;
--color-difficulty-hard:     var(--color-error);

/* Tipografía (OJO: naming invertido respecto a convención) */
--font-display: 'DM Sans', sans-serif;   /* UI, body, labels */
--font-body:    'Fraunces', serif;       /* headlines, display */

/* Layout */
--header-height: 64px;

/* Easing */
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth:     cubic-bezier(0.4, 0, 0.2, 1);
--ease-editorial:  cubic-bezier(0.65, 0, 0.35, 1);
```

---

## Estética cinemática — Identidad visual

Las secciones home siguen una estética de **archivo editorial cinematográfico**.
Inspiración: archivo fotográfico, portal arquitectónico, ficha de película.

### Dos paletas en home

**Hero (oscuro):** fondo negro puro `#000000`, text crema, gold accent.
**Todas las demás secciones (claro):** paleta local crema:
```css
--s-bg:      #f5f0ea;   /* fondo crema */
--s-ink:     #1a1619;   /* texto principal */
--s-orange:  #e8622a;   /* accent naranja */
--s-gold:    #c9a84c;   /* accent dorado */
--s-border:  rgba(26, 22, 25, 0.12);
```

### Tipografía — regla estricta

- **Fraunces** (`--font-body`): hero headlines (mín. 64px desktop / 40px mobile),
  títulos de sección grandes, números destacados. Weight 300–900, letter-spacing -0.02em.
- **DM Sans** (`--font-display`): absolutamente todo lo demás — body, UI, labels,
  botones, nav, descripciones, filtros, badges, eyebrows.

Si es número grande o título de sección → Fraunces. Si es UI funcional → DM Sans.

### Regla de CSS en secciones home

Componentes de sección home: **CSS puro en `<style>`**, sin clases Tailwind.
Cada sección define sus propias CSS custom properties locales (`--s-*`).

---

## Patrones visuales (global.css)

### Screen Frame

Clase global `.cin-screen-frame` + componente `ScreenFrame.astro` (wraps the classes):

```css
.cin-screen-frame {
  position: absolute;
  top: 1.5rem; left: 1.5rem; right: 1.5rem; bottom: 1.5rem;
  border: 1px solid rgba(255,255,255,0.06);
  pointer-events: none;
  z-index: 20;
}
```

Corners (`.cin-corner` + modificador posición):
```css
.cin-corner::before { width: 12px; height: 1px; background: var(--color-gold-dim); }
.cin-corner::after  { width: 1px; height: 12px; background: var(--color-gold-dim); }
/* Posicionados a -1px offset por esquina */
```

Frame tags (`.cin-frame-tag`):
```css
font-size: 0.6rem; font-weight: 600; letter-spacing: 0.15em;
text-transform: uppercase; color: rgba(255,255,255,0.25);
```

### Glass morphism (docks, pills, CTAs flotantes)

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
.title-char {
  display: inline-block; opacity: 0; transform: translateY(40px);
  animation: char-rise 1.5s cubic-bezier(0.16, 1, 0.3, 1) var(--delay) forwards;
}
```

### Cell Grid (grids con 1px gap como separador)

```css
.grid {
  display: grid; gap: 1px;
  background: rgba(26,22,25,0.12); /* el gap visible es el fondo */
}
.cell { background: var(--s-bg); }
```

### Corner Brackets (en cards al hover)

```css
.corner-bracket {
  position: absolute; width: 18px; height: 18px;
  border-color: white; border-style: solid; border-width: 0;
  opacity: 0; transition: opacity 0.4s ease;
}
.card:hover .corner-bracket { opacity: 0.8; }
/* top-left: border-top-width: 1px; border-left-width: 1px; etc. */
```

### Imágenes en cards

```css
/* Reposo: */
filter: grayscale(25%) contrast(1.05) brightness(0.8);
transform: scale(1.08);
/* Hover: */
filter: grayscale(0%) brightness(0.88);
transform: scale(1.0);
transition: 1.2s cubic-bezier(0.19, 1, 0.22, 1);
```

### Grain texture

```css
.cin-grain {
  position: absolute; inset: 0; pointer-events: none; z-index: 1;
  background-image: url("data:image/svg+xml,...feTurbulence...");
  mix-blend-mode: soft-light; opacity: 0.03;
}
```

---

## Keyframes globales (global.css)

- `char-rise`: opacity 0 + translateY(40px) → 1 + 0
- `cell-reveal`: opacity 0 + translateY(20px) → 1 + 0, con `--card-index` stagger
- `portal-reveal`: opacity 0 + scale(0.95) + translateY(20px) → 1 + scale(1) + 0
- `dock-rise`: opacity 0 + translateX(-50%) + translateY(40px) → 1 + translateX(-50%) + 0
- `cin-fade-in`: opacity 0 → 1
- `fadeInUp`: opacity 0 + translateY(20px) → 1 + 0
- `fade-in-panel`: opacity 0 + translateY(10px) + blur(4px) → 1 + 0

---

## Home — secciones actuales (index.astro)

```
src/pages/index.astro
  ├── HeroSection.astro        ← portal arquitectónico oscuro
  ├── EventsGridSection.astro  ← masonry de eventos, fondo crema
  ├── RoutesGridSection.astro  ← acordeón flex de rutas, fondo crema
  ├── TimeRoutesSection.astro  ← planes por tiempo disponible, fondo crema
  ├── BlogSection.astro        ← editorial de artículos, fondo oscuro
  └── HomeCTA.astro            ← CTA final con estrella nazarí, fondo crema
```

### 1. HeroSection (`src/components/home/HeroSection.astro`)

Portal cinematográfico oscuro. Fondo negro, video ambiental blur.
- Título colosal con `char-rise` (delay 0.1s por char)
- Portal lens: `border-radius: 40vw` arriba, `box-shadow` con gold glow
- Glass dock: reloj en vivo (Europe/Madrid), clima (Open-Meteo API), CTA
- Parallax + glare con mouse move (desktop only, IntersectionObserver)
- Animaciones: `cin-fade-in`, `portal-reveal`, `dock-rise`

### 2. EventsGridSection (`src/components/home/EventsGridSection.astro`)

Masonry 3 columnas, fondo crema, estética de archivo editorial.
- Eyebrow `[AGENDA / 2025 — 2026]`, título "EVENTOS"/"EVENTS" en Fraunces
- Columnas con alturas variables: left/right [58,72,58,72]vh, center [72,58,72,58]vh
- Cada item: imagen (grayscale hover), date badge (glass crema), overlay gradient, categoría, título, venue+precio
- Overlays: `linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 80%)`

### 3. RoutesGridSection (`src/components/home/RoutesGridSection.astro`)

Acordeón flex cinemático. Fondo crema.
- Eyebrow `[CARTOGRAFÍA / RUTAS / ATLAS URBANO]`, masthead en Fraunces
- Desktop: 5 rutas como flex items, 75vh altura. Hover/click expande a `flex: 7` (inactivas `flex: 1`)
- Inactiva: imagen en `grayscale(100%) brightness(0.5)`, label vertical (`writing-mode: vertical-rl`)
- Activa: imagen color, HUD completo con glass metadata (duración, distancia, dificultad)
- Transición: 0.9s `cubic-bezier(0.19, 1, 0.22, 1)`

### 4. TimeRoutesSection (`src/components/home/TimeRoutesSection.astro`)

Planes por tiempo disponible. Fondo crema.
- Muestra 3 planes seleccionados (`'2h'`, `'1day'`, `'2days'`) de `getAllMixedRoutes()`
- Cada plan: card con gradiente propio por duración, número grande (Fraunces), label tipo "Quick Tour" / "Weekend"
- Enlaza a `/rutas/por-tiempo` (es) o `/en/routes/by-time` (en)
- Datos: `MixedRoute[]` con `days → blocks → stops`, `totalHours`, `neighborhoods[]`

### 5. BlogSection (`src/components/home/BlogSection.astro`)

Editorial de artículos. Fondo oscuro (contraste con secciones crema).
- Muestra 1 featured + 2 recientes. `ScreenFrame` con tags `EDITORIAL / GRANADA`
- Eyebrow `[ GUÍAS ]`, headline "Historias de Granada" en Fraunces
- Categorías con iconos simbólicos (◈ guia, ◎ cultura, ◐ gastronomia, ○ barrios, ◆ consejos) y colores propios
- Enlaza a `/guias` (es) o `/en/guides` (en)

### 6. HomeCTA (`src/components/home/HomeCTA.astro`)

CTA final. Fondo crema con grain.
- Headline con char reveal en dos filas, chars coloreados (muted/bright/accent)
- Estrella nazarí SVG decorativa
- CTA secundario: "Ver rutas"
- Ornamento inferior con diamante

---

## Estructura de carpetas

```
src/
├── components/
│   ├── events/        ← EventCard, EventDetail, WeekEvents
│   ├── routes/        ← RouteCard, RouteDetail
│   ├── home/          ← secciones de la página principal
│   │   ├── HeroSection.astro
│   │   ├── EventsGridSection.astro
│   │   ├── RoutesGridSection.astro
│   │   ├── TimeRoutesSection.astro
│   │   ├── TimeSelector.astro
│   │   ├── BlogSection.astro
│   │   └── HomeCTA.astro
│   ├── ui/            ← Button, Badge, Card, Tag, Divider, ScreenFrame (sin lógica de negocio)
│   └── layout/        ← NavBar, Footer, FilterBar
├── config/
│   └── site.ts        ← nombre, URL, redes, idiomas — única fuente de verdad
├── data/
│   ├── events/
│   ├── routes/
│   ├── mixed-routes/  ← planes por tiempo disponible (MixedRoute[])
│   ├── blog/          ← artículos (BlogPost[]) + content/ con archivos por post (ruta pública: /guias / /en/guides)
│   ├── venues/        ← datos auxiliares de venues (coordenadas, etc.)
│   └── index.ts       ← exports centralizados + query helpers
├── i18n/
│   ├── locales/
│   │   ├── es.ts
│   │   └── en.ts
│   └── utils.ts       ← useTranslations() type-safe
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── eventos/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── rutas/
│   │   ├── index.astro
│   │   ├── [slug].astro
│   │   └── por-tiempo/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── guias/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── privacidad.astro
│   ├── aviso-legal.astro
│   └── en/            ← mirror de todas las páginas (events/, routes/by-time/, guides/)
├── styles/
│   ├── global.css     ← reset, tipografía base, keyframes cin-*, scrollbar
│   └── tokens.css     ← SOLO variables CSS
├── types/
│   └── index.ts
└── utils/
    ├── paths.ts       ← getLocaleFromPath y helpers de rutas
    ├── dates.ts       ← formateo de fechas, badges de proximidad temporal
    ├── filters.ts     ← lógica de filtrado combinable (AND logic)
    └── seo.ts         ← helpers para meta descriptions y structured data
```

Regla: ningún archivo supera 250 líneas. Si crece, dividir.

---

## Comportamiento esperado de componentes clave

### NavBar
- Transparente sobre hero → opaco (`rgba(8,8,8,0.85)` + `backdrop-filter: blur(12px)`) al scroll
- Detección con IntersectionObserver sobre sentinel de 1px al final del hero, no scroll listener
- Link activo: `--color-accent` + `::after` underline con `scaleX` animado

### FilterBar — eventos y rutas
Filtros combinables con AND logic. `data-attributes` en cada card:
`data-category`, `data-neighborhood`, `data-price`, `data-date`.
Botón "Limpiar filtros" solo visible cuando hay filtros activos.
Contador "X resultados" actualizado dinámicamente. Empty state cuando no hay
resultados — nunca mostrar grid vacío.

**Filtros de /eventos:** chips categoría + dropdown Barrio + dropdown Cuándo
(Hoy / Esta semana / Este fin de semana / Este mes) + toggle Solo gratis.

**Filtros de /rutas:** chips tipo + chips dificultad (con color verde/ámbar/rojo)
+ dropdown Duración + dropdown Mejor momento.

### EventCard
- Badge de proximidad: HOY (accent pulsante) / MAÑANA / ESTA SEMANA / sin badge
- Featured: `border-left: 3px solid var(--color-accent)` + fondo `--color-bg-subtle`
- Precio: badge `--color-success` si free, neutro si pagado, muted con "?" si unknown

### RouteCard
- Dificultad con color: `--color-difficulty-easy/moderate/hard`
- Barra visual 3 segmentos: `[■□□]` fácil, `[■■□]` moderada, `[■■■]` difícil
- Mejor momento con icono sol (mañana/tarde) o luna (atardecer/noche)

### Páginas de detalle [slug]
- Layout 70/30 desktop (contenido + sidebar sticky), stack en mobile
- Web Share API en "Compartir", fallback a copiar URL al clipboard
- JSON-LD: schema `Event` para eventos, `TouristAttraction` para rutas
- Sección "relacionados" en sidebar: 2-3 items del mismo tipo/categoría

---

## SEO

`BaseLayout.astro` genera: `title`, `meta description`, `canonical`, `og:title`,
`og:description`, `og:locale`, `og:image`, `hreflang es↔en`, `lang` en `<html>`.
Cada página define sus propios valores como props. Nunca el mismo meta description
en dos páginas.

- Patrón evento: `"[Nombre] en Granada — [fecha]. [Lugar]. [Precio]."`
- Patrón ruta: `"Ruta de [tipo] por [barrio]: [duración], [distancia]. Dificultad [nivel]."`
- JSON-LD en todas las páginas de detalle
- `og:image` placeholder: `https://placehold.co/1200x630/080808/f0ede8?text=Granada+Vibes`
- `@astrojs/sitemap` activado, `robots.txt` incluido

---

## Animaciones (CSS puro, sin librerías)

Solo `IntersectionObserver` para activar clases. Cero scroll listeners. Cero librerías de animación.

Todos los keyframes cinemáticos viven en `global.css` con prefijo `cin-` o nombre descriptivo.
Stagger via CSS custom property `--delay` o `--card-index` en cada elemento.

`@media (prefers-reduced-motion: reduce)` en global.css reduce todas las duraciones a 0.01ms.

---

## Reglas de código

- Cero `any` — si el tipo es desconocido: `unknown` + narrowing explícito
- Cero colores hardcodeados — siempre `var(--color-*)` o variables locales del componente (`--s-*`)
- Componentes de sección home: CSS puro en `<style>`, sin clases Tailwind
- Cero strings literales para categorías/tipos/barrios — siempre union types
- Cero `console.log` en código final
- Cero librerías JS externas para interactividad — vanilla TS únicamente
- Cero scroll listeners — usar IntersectionObserver
- Variables y funciones: inglés. Contenido y UI: español/inglés según locale
- Comentarios solo donde la lógica no es obvia
- Archivos: máximo 250 líneas. Si supera, dividir
- Commits semánticos: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`

---

## Lo que NO hacer

- No uses React, Vue ni ningún framework de componentes
- No uses librerías de componentes externas (shadcn, daisyUI, Flowbite...)
- No uses CSS-in-JS
- No dejes TODOs sin contexto — escribe `TODO: [descripción accionable]`
- No inventes dependencias npm innecesarias
- No uses `any` ni `as unknown as X` para evadir el tipado
- No rompas tipos existentes — extiende siempre con campos opcionales
- No hardcodees textos en componentes — siempre `useTranslations()`
- No repitas el tagline "ciudad de la Alhambra" más de una vez por página
- No implementes nada de Fase 2 o 3 — deja los tipos preparados, no las dependencias

---

## Fases del proyecto

- **Fase 1 (actual):** Web estática con datos mock. Filtros funcionales.
  Páginas de detalle completas. SEO bien trabajado.
- **Fase 2:** CMS Sanity. Formulario de contacto con Resend.
  Mapa interactivo (Mapbox o Leaflet).
- **Fase 3:** IA contextual ("tengo 2h en el Albaicín, qué hago").
  Autenticación. Rutas guardadas. Modo Semana Santa.
