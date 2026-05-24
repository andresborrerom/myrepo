// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Site URL: baristapath.com (registrado 2026-05-14 en Cloudflare Registrar).
// Sitemap, canonical tags y og URLs lo usan.
export default defineConfig({
  site: 'https://baristapath.com',
  integrations: [mdx(), sitemap()],
  output: 'static',
  build: {
    format: 'directory',
  },
});
