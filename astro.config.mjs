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
      ],
    },
    css: {
      postcss: './postcss.config.cjs',
    },
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },
  },
});
