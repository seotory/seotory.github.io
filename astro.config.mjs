// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.seotory.com',
  base: '/',
  // Directory-style URLs (…/index.html) — keeps the trailing-slash URLs the
  // site has always used.
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  redirects: {
    // Keep /feed/ working for existing RSS subscribers.
    '/feed': '/feed.xml',
    // Posts used to be split across dev/* sub-categories (plus a bare segment
    // page for each). They're all one "dev" category now, so point the old
    // URLs at it rather than letting indexed links 404.
    '/categories/dev/java': '/categories/dev/',
    '/categories/dev/javascript': '/categories/dev/',
    '/categories/dev/python': '/categories/dev/',
    '/categories/dev/ruby': '/categories/dev/',
    '/categories/dev/linux': '/categories/dev/',
    '/categories/dev/database': '/categories/dev/',
    '/categories/dev/jekyll': '/categories/dev/',
    '/categories/dev/git': '/categories/dev/',
    '/categories/dev/study': '/categories/dev/',
    '/categories/dev/etc': '/categories/dev/',
    '/categories/java': '/categories/dev/',
    '/categories/javascript': '/categories/dev/',
    '/categories/python': '/categories/dev/',
    '/categories/ruby': '/categories/dev/',
    '/categories/linux': '/categories/dev/',
    '/categories/jekyll': '/categories/dev/',
    '/categories/git': '/categories/dev/',
    '/categories/etc': '/categories/dev/',
    '/categories/talk': '/categories/dev/',
  },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    // Light theme to match the (light-only) site.
    shikiConfig: { theme: 'github-light', wrap: false },
  },
});
