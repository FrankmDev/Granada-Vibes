# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

No test or lint scripts are configured in `package.json`. ESLint and Prettier are installed as devDependencies but have no script entries.

## Architecture

**Granada Vibes** is a bilingual (ES/EN) cultural guide for Granada, Spain — built with Astro 6 and Tailwind CSS. It lists events and walking routes.

### Routing & i18n

Spanish is the default locale and has no URL prefix. English is prefixed with `/en/`:

| Spanish | English |
|---|---|
| `/` | `/en/` |
| `/eventos/[slug]` | `/en/events/[slug]` |
| `/rutas/[slug]` | `/en/routes/[slug]` |

Each locale has its own duplicate page tree under `src/pages/` and `src/pages/en/`. There is no Astro i18n integration — locale is determined by `getLocaleFromPath(pathname)` in `src/utils/paths.ts`.

Translations live in `src/i18n/locales/es.ts` and `src/i18n/locales/en.ts`. Use `useTranslations(locale)` from `src/i18n/utils.ts` to get a type-safe `t(key)` function. Translation keys use dot notation (e.g. `t('nav.events')`).

### Data Layer

All content is static TypeScript arrays in `src/data/`:
- `src/data/events/events.ts` — `Event[]`
- `src/data/routes/routes.ts` — `Route[]`

Both files export query helpers (`getAllEvents`, `getFeaturedEvents`, `getEventBySlug`, etc.) re-exported from `src/data/index.ts`. There is no CMS or external API.

Data fields that support both languages use the `LocalizedText` type: `{ es: string; en: string }`. Always populate both locales when adding or editing content.

### Types

All shared types are in `src/types/index.ts`:
- `Event` — cultural events with venue, price, category, neighborhood
- `Route` — walking routes with difficulty, duration, distance, highlights
- `Locale` — `'es' | 'en'`
- `LocalizedText` — `{ es: string; en: string }`
- `SEOMetadata`, `SiteConfig` — site-level config shapes

### Layout & Styling

`BaseLayout.astro` is the root layout for all pages. It accepts `locale`, SEO props, and an optional `schemaType`/`schemaData` for JSON-LD structured data.

Design tokens are defined as CSS custom properties in `src/styles/tokens.css` (dark "Alhambra Noir" theme: warm blacks, terracotta `--color-accent`, gold `--color-gold`). Always use token variables rather than hardcoded color values.

### Path Aliases

TypeScript path aliases configured (check `tsconfig.json` for exact mappings):
- `@types` → `src/types/index.ts`
- `@config/site` → `src/config/site.ts`
- `@components/*` → `src/components/*`
