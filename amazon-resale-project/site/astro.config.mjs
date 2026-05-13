// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// TODO: replace site URL once final domain is registered (ADR 0004).
// Sitemap & canonical tags pick this up.
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  output: 'static',
  build: {
    format: 'directory',
  },
});
