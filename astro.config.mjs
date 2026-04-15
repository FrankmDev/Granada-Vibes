import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'path';

export default defineConfig({
  site: 'https://granadavibes.com',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Image optimization configuration
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80,
        format: 'webp',
      },
    },
    // Domains allowed for remote image optimization
    domains: ['images.unsplash.com', 'upload.wikimedia.org'],
    // Remote patterns for external images
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
          manualChunks: {
            // Separate vendor chunks for better caching
            'vendor': ['astro'],
          },
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
});
