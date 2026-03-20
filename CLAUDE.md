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
- Fuentes: Fraunces (display/headings) + DM Sans (body/UI) vía @fontsource
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
| `/sobre` | `/en/about` |
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

Todo el contenido son arrays TypeScript estáticos en `src/data/`:
- `src/data/events/events.ts` — `Event[]`
- `src/data/routes/routes.ts` — `Route[]`

Ambos exportan query helpers (`getAllEvents`, `getFeaturedEvents`, `getEventBySlug`, etc.)
re-exportados desde `src/data/index.ts`. Sin CMS ni API externa en Fase 1.

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
- `EventCategory` — union: `'concierto' | 'exposicion' | 'festival' | 'mercado' | 'teatro' | 'taller' | 'visita-guiada'`
- `Neighborhood` — union: `'Albaicín' | 'Centro' | 'Realejo' | 'Sacromonte' | 'Alhambra' | 'Cartuja' | 'Zaidín' | 'Otro'`
- `Difficulty` — union: `'fácil' | 'moderada' | 'difícil'`
- `RouteType` — union: `'miradores' | 'tapeo' | 'monumentos' | 'senderismo' | 'fotografía' | 'secretos' | 'historia' | 'flamenco'`
- `BestTime` — union: `'mañana' | 'tarde' | 'atardecer' | 'noche'`
- `Event` — eventos culturales con venue, precio, categoría, barrio
- `Route` — rutas con dificultad, duración, distancia, highlights

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
(tema oscuro "Alhambra Noir": negros cálidos, terracota accent, dorado gold).
Usar siempre variables de token, nunca colores hardcodeados.

### Path Aliases (tsconfig.json)

- `@types` → `src/types/index.ts`
- `@config/site` → `src/config/site.ts`
- `@components/*` → `src/components/*`

---

## Design Tokens

```css
/* Fondos */
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

/* Acento naranja (granada, el fruto) */
--color-accent:         #e8622a;
--color-accent-hover:   #f07040;
--color-accent-muted:   rgba(232, 98, 42, 0.10);

/* Acento dorado (Alhambra) */
--color-gold:           #c9a84c;
--color-gold-muted:     rgba(201, 168, 76, 0.10);

/* Semánticos */
--color-success:        #4a9e6b;
--color-error:          #c94a4a;

/* Dificultad de rutas */
--color-difficulty-easy:     var(--color-success);
--color-difficulty-moderate: #d4873a;
--color-difficulty-hard:     var(--color-error);
```

---

## Tipografía — regla estricta

- **Fraunces**: hero headlines (mín. 64px desktop / 40px mobile, weight 900,
  letter-spacing -0.02em), títulos de sección grandes, números destacados
  (stats, precios, métricas).
- **DM Sans**: absolutamente todo lo demás — body, UI, labels, botones, nav,
  descripciones, filtros, badges.

Si es número grande o título importante → Fraunces. Si es UI funcional → DM Sans.

---

## Estructura de carpetas

```
src/
├── components/
│   ├── events/        ← EventCard, EventDetail, WeekEvents
│   ├── routes/        ← RouteCard, RouteDetail
│   ├── ui/            ← Button, Badge, Card, Tag, Divider (sin lógica de negocio)
│   └── layout/        ← NavBar, Footer, FilterBar
├── config/
│   └── site.ts        ← nombre, URL, redes, idiomas — única fuente de verdad
├── data/
│   ├── events/
│   ├── routes/
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
│   │   └── [slug].astro
│   ├── sobre.astro
│   ├── privacidad.astro
│   ├── aviso-legal.astro
│   └── en/            ← mirror exacto de todas las páginas
├── styles/
│   ├── global.css     ← reset, tipografía base, animaciones, scrollbar
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

## Home — secciones en orden

1. **Hero** — headline editorial Fraunces + grain texture + stats con count-up al entrar en viewport
2. **Esta semana** — 3-4 eventos con fecha más próxima a hoy (`WeekEvents.astro`)
3. **Eventos destacados** — grid asimétrico: 1 card grande (60%) + 2 apiladas (40%)
4. **Granada en números** — stats tipográficos sin cards sobre `--color-bg-raised`
5. **Rutas destacadas** — grid asimétrico invertido: 2 apiladas (40%) + 1 grande (60%)
6. **CTA final** — "La Alhambra ya la conoces. Granada todavía no."

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

## Animaciones (global.css, CSS puro, sin librerías)

- `fadeInUp`: opacity 0→1 + translateY(20px→0), 0.5s ease-out, delay `nth-child × 0.1s`
- Hover cards: `translateY(-2px)` + shadow elevada, 0.2s ease
- Hover botón primario: `scale(1.02)`, 0.15s ease
- Grain hero: `::after` con SVG `feTurbulence`, opacity 0.035, pointer-events none
- Badge HOY: `@keyframes pulse` en opacity
- Count-up en stats: IntersectionObserver + incremento por requestAnimationFrame

---

## Reglas de código

- Cero `any` — si el tipo es desconocido: `unknown` + narrowing explícito
- Cero colores hardcodeados — siempre `var(--color-*)`
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
