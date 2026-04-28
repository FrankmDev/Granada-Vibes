# Refactorización del Proyecto Granada Urban

Este documento describe las optimizaciones y refactorizaciones realizadas al proyecto Astro de Granada Urban.

## 🎯 Resumen de Mejoras

### 1. **Componetización Máxima**

Se crearon componentes reutilizables para eliminar código duplicado:

#### Componentes UI (`src/components/ui/`)
- `Icon.astro` - Sistema de iconos centralizado con 20+ iconos
- `Button.astro` - Botón con variantes (primary, secondary, ghost)
- `Card.astro` - Tarjeta contenedora reutilizable
- `Badge.astro` - Insignias con variantes de color
- `Tag.astro` - Etiquetas simples
- `Divider.astro` - Separadores visuales

#### Componentes de Layout (`src/components/layout/`)
- `PageHeader.astro` - Encabezado de página consistente
- `SectionHeader.astro` - Encabezado de sección con link opcional
- `Breadcrumbs.astro` - Navegación de migas de pan

#### Componentes de Dominio
- `EventCard.astro` - Tarjeta de evento con todas las funcionalidades
- `RouteCard.astro` - Tarjeta de ruta con variantes list/grid

#### Componentes SEO (`src/components/seo/`)
- `SEOHead.astro` - Meta tags completas y optimizadas
- `SchemaMarkup.astro` - Schema.org JSON-LD para:
  - Organization
  - WebSite
  - Event
  - TouristAttraction (Route)

### 2. **Optimizaciones SEO**

#### Meta Tags Mejoradas
- ✅ Títulos y descripciones dinámicas
- ✅ Open Graph completo (og:title, og:description, og:image, og:type, og:locale)
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Hreflang para i18n (es/en)
- ✅ Meta tags para móviles (theme-color, apple-mobile-web-app)
- ✅ Favicon y iconos optimizados

#### Schema.org Structured Data
- ✅ Organization schema
- ✅ Event schema con ofertas de precios
- ✅ TouristAttraction schema para rutas
- ✅ WebSite schema

### 3. **Mejoras de Performance**

#### Preconnect y DNS Prefetch
```html
<link rel="preconnect" href="https://api.fontshare.com" crossorigin />
<link rel="dns-prefetch" href="https://api.fontshare.com" />
```

#### Prefetch de Páginas
- Prefetch automático de la URL de cambio de idioma
- Navegación más rápida entre idiomas

### 4. **Mejoras de Accesibilidad (A11y)**

- ✅ Skip link para saltar al contenido
- ✅ Roles ARIA (banner, navigation, main, contentinfo)
- ✅ Labels aria para navegación
- ✅ Estados aria-pressed en botones de filtro
- ✅ aria-current para indicar página activa
- ✅ aria-expanded para menú móvil
- ✅ aria-labelledby para secciones
- ✅ focus-visible para navegación por teclado
- ✅ Cierre de menú móvil con tecla Escape
- ✅ address semántico en footer

### 5. **Utilidades Mejoradas**

#### `src/utils/dates.ts`
- `formatDate()` - Formato de fecha localizado
- `formatDateShort()` - Fecha corta
- `formatTime()` - Hora formateada
- `formatDuration()` - Duración legible
- `formatDistance()` - Distancia legible
- `isUpcoming()` - Verificar fechas futuras
- `sortByDate()` / `sortByDateDesc()` - Ordenamiento
- `formatDateRange()` - Rango de fechas

#### `src/utils/paths.ts`
- `getLocalizedPath()` - Generar paths localizados
- `getLocaleFromPath()` - Detectar idioma desde URL
- `generateAlternatePaths()` - Generar URLs alternativas

### 6. **Estructura de Carpetas Organizada**

```
src/
├── components/
│   ├── ui/           # Componentes UI base
│   ├── layout/       # Componentes de layout
│   ├── events/       # Componentes de eventos
│   ├── routes/       # Componentes de rutas
│   ├── seo/          # Componentes SEO
│   └── index.ts      # Exports centralizados
├── layouts/
│   └── BaseLayout.astro  # Layout principal mejorado
├── utils/
│   ├── dates.ts      # Utilidades de fecha
│   ├── paths.ts      # Utilidades de rutas
│   ├── slugs.ts      # Utilidades de slugs
│   └── index.ts      # Exports centralizados
├── i18n/
│   ├── locales/      # Traducciones
│   ├── utils.ts      # Helpers de i18n
│   └── index.ts      # Exports centralizados
├── data/
│   ├── events/       # Datos de eventos
│   ├── routes/       # Datos de rutas
│   └── index.ts      # Exports centralizados
├── types/
│   └── index.ts      # TypeScript types
└── config/
    └── site.ts       # Configuración del sitio
```

### 7. **Refactorización de Páginas**

Todas las páginas fueron refactorizadas para:
- Usar componentes reutilizables
- Eliminar código duplicado
- Mejorar consistencia visual
- Implementar SEO schema específico
- Mejorar accesibilidad

#### Páginas actualizadas:
- `index.astro` (ES) y `en/index.astro` (EN)
- `eventos/index.astro` y `en/events/index.astro`
- `eventos/[slug].astro` y `en/events/[slug].astro`
- `rutas/index.astro` y `en/routes/index.astro`
- `rutas/[slug].astro` y `en/routes/[slug].astro`
- `sobre.astro` y `en/about.astro`

### 8. **BaseLayout Mejorado**

El layout principal ahora incluye:
- Integración con SEOHead y SchemaMarkup
- Skip link para accesibilidad
- Header con navegación activa
- Menú móvil con ARIA completo
- Footer semántico
- Scripts optimizados para menú móvil

## 📊 Métricas

| Aspecto | Antes | Después |
|---------|-------|---------|
| Componentes reutilizables | 5 | 15+ |
| Líneas duplicadas | ~400 | ~0 |
| Schema.org types | 0 | 4 |
| Atributos ARIA | Mínimo | Completo |
| Exports centralizados | 0 | 4 |

## ✅ Checklist de Mejoras

- [x] Componentes reutilizables creados
- [x] Código duplicado eliminado
- [x] Schema.org markup implementado
- [x] SEO meta tags optimizados
- [x] Preconnect y prefetch añadidos
- [x] Accesibilidad mejorada (ARIA, skip links, roles)
- [x] Estructura de carpetas organizada
- [x] Exports centralizados
- [x] Build exitoso (48 páginas generadas)
- [x] Sitemap generado automáticamente

## 🚀 Comandos

```bash
# Desarrollo
bun run dev

# Build
bun run build

# Preview
bun run preview
```

## 📚 Recursos

- [Astro Docs](https://docs.astro.build)
- [Schema.org](https://schema.org)
- [A11y Project](https://www.a11yproject.com)
- [Web.dev Performance](https://web.dev/performance/)
