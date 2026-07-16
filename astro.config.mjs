// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.seotory.com',
  base: '/',
  // Directory-style URLs (…/index.html) to match Jekyll's trailing-slash
  // permalinks for pagination/category pages; posts get a trailing slash too.
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Preserve the old Jekyll feed URL (/feed/) for existing RSS subscribers.
  redirects: { '/feed': '/feed.xml' },
  integrations: [sitemap()],
  markdown: {
    // Rouge → Shiki. Light theme to match the (light-only) site.
    shikiConfig: { theme: 'github-light', wrap: false },
  },
});
