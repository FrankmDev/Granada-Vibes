import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSitemapConfig } from './src/config/sitemap.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://granadaurban.com',
  integrations: [
    sitemap(createSitemapConfig(__dirname)),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Maximum quality for event imagery. AVIF is not available in this
        // environment (Sharp built without libheif/libavif), so WebP is used
        // as the best-supported modern format. Quality 95 gives excellent
        // visual fidelity with reasonable file sizes.
        quality: 95,
        format: 'webp',
      },
    },
    domains: ['images.unsplash.com', 'upload.wikimedia.org', 'www.pcgr.org', 'conciertos.club', 'doc.conciertos.club', 'img.evbuc.com', 'cdn.dipgra.es', 's1.ticketm.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pcgr.org',
      },
      {
        protocol: 'https',
        hostname: 'conciertos.club',
      },
      {
        protocol: 'https',
        hostname: 'doc.conciertos.club',
      },
      {
        protocol: 'https',
        hostname: 'img.evbuc.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dipgra.es',
      },
      {
        protocol: 'https',
        hostname: 's1.ticketm.net',
      },
    ],
  },
  vite: {
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve('./src') },
        { find: '@components', replacement: path.resolve('./src/components') },
        { find: '@layouts', replacement: path.resolve('./src/layouts') },
        { find: '@utils', replacement: path.resolve('./src/utils') },
        { find: '@types', replacement: path.resolve('./src/types') },
        { find: '@data', replacement: path.resolve('./src/data') },
        { find: '@config', replacement: path.resolve('./src/config') },
        { find: '@i18n', replacement: path.resolve('./src/i18n') },
        { find: '@styles', replacement: path.resolve('./src/styles') },
        { find: '@assets', replacement: path.resolve('./src/assets') },
      ],
    },
    css: {
      postcss: './postcss.config.cjs',
    },
    build: {
      // CSS optimization
      cssMinify: true,
      // JS optimization
      minify: true,
      // Asset inlining threshold (10KB)
      assetsInlineLimit: 10240,
      // Code splitting
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },
  },
  // Build output configuration
  output: 'static',
  // Compress HTML in production
  compressHTML: true,
  // Enforce trailing slashes for SEO consistency
  trailingSlash: 'always',
});
