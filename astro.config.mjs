// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.seotory.com',
  base: '/',
  // Directory-style URLs (…/index.html) — keeps the trailing-slash URLs the
  // site has always used.
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Keep /feed/ working for existing RSS subscribers.
  redirects: { '/feed': '/feed.xml' },
  integrations: [sitemap()],
  markdown: {
    // Light theme to match the (light-only) site.
    shikiConfig: { theme: 'github-light', wrap: false },
  },
});
