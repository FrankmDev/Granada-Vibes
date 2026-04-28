# Granada Urban

Tu guía cultural e inteligente de Granada, España. Descubre eventos, rutas y experiencias únicas en la ciudad de la Alhambra.

## 🚀 Stack Tecnológico

- **Astro 6.x** - Framework web moderno para sitios estáticos
- **TypeScript** - Tipado estricto con `strict: true`
- **Tailwind CSS 4.x** - Estilos utilitarios
- **Sistema de diseño propio** - Sin dependencias de componentes externas

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes Astro
│   ├── events/         # Componentes específicos de eventos
│   ├── routes/         # Componentes específicos de rutas
│   ├── ui/             # Componentes UI base (Button, Card, Badge, etc.)
│   └── layout/         # Componentes de layout
├── config/             # Configuración del sitio
│   └── site.ts
├── data/               # Capa de datos
│   ├── events/         # Datos de eventos
│   ├── routes/         # Datos de rutas
│   └── index.ts        # Exportaciones
├── i18n/               # Internacionalización type-safe
│   ├── locales/
│   │   ├── es.ts
│   │   └── en.ts
│   └── utils.ts        # useTranslations()
├── layouts/            # Layouts de Astro
│   └── BaseLayout.astro
├── pages/              # Páginas de Astro
│   ├── index.astro           # Home (ES)
│   ├── eventos/              # Eventos (ES)
│   ├── rutas/                # Rutas (ES)
│   ├── sobre.astro           # Sobre nosotros (ES)
│   └── en/                   # Mirror en inglés
├── styles/             # Estilos globales
│   ├── global.css
│   └── tokens.css      # Design tokens
├── types/              # Tipos TypeScript globales
│   └── index.ts
└── utils/              # Utilidades
    ├── dates.ts
    └── slugs.ts
```

## 🎨 Sistema de Diseño

### Paleta de Colores (Dark Mode Base)

- **Background**: `#080808` → `#171717`
- **Texto**: Blanco cálido `#f0ede8`, secundario `#9a9490`
- **Acento**: Naranja Granada `#e8622a`
- **Dorado**: Alhambra Gold `#c9a84c`

### Tipografía

- **Display**: Fraunces (Google Fonts) - Serif variable, expresiva
- **Body**: DM Sans (Google Fonts) - Geométrica, legible

## 🌍 Internacionalización (i18n)

Soporte completo para español e inglés:
- Rutas: `/` (es) y `/en/` (en)
- Traducciones type-safe con autocompletado
- hreflang correcto para SEO

## 📄 Páginas

### Español (rutas canónicas)
- `/` - Home
- `/eventos` - Listado de eventos
- `/eventos/[slug]` - Detalle de evento
- `/rutas` - Listado de rutas
- `/rutas/[slug]` - Detalle de ruta
- `/sobre` - Sobre nosotros

### Inglés (espejo)
- `/en/`, `/en/events`, `/en/events/[slug]`, `/en/routes`, `/en/routes/[slug]`, `/en/about`

## 🛠️ Scripts

```bash
# Desarrollo
bun run dev

# Construcción
bun run build

# Preview
bun run preview
```

## 📊 Datos

### Eventos (12)
- Festival Internacional de Música y Danza
- Concierto Rosalía
- Exposición Picasso
- Yerma - Teatro
- Y más...

### Rutas (8)
- Atardecer en los Miradores del Albaicín
- Ruta de Tapeo Tradicional
- Senderismo por el Río Darro
- Granada Monumental
- Rincones Secretos del Realejo
- Ruta de Fotografía en el Sacromonte
- Huellas de Isabel la Católica
- Ruta del Flamenco Auténtico

## 🔍 SEO

- Canonical URLs
- Open Graph / Twitter Cards
- hreflang es↔en
- Sitemap automático
- robots.txt

## 📦 Dependencias

```json
{
  "astro": "^6.0.4",
  "@astrojs/sitemap": "^3.7.1"
}
```

## 📝 Licencia

Proyecto privado - Granada Urban
# Granada-Urban
