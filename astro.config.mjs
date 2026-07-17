// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { CATEGORY_PATHS } from './src/consts';

// Posts used to be split across these sub-categories; they're all one "dev"
// category now, so send the old URLs there rather than letting indexed links
// 404. A path drops out of this list the moment it becomes a live category
// again — otherwise the redirect would silently shadow the real page.
const RETIRED_CATEGORY_PATHS = [
  'dev/java', 'dev/javascript', 'dev/python', 'dev/ruby', 'dev/linux',
  'dev/database', 'dev/jekyll', 'dev/git', 'dev/study', 'dev/etc',
  'java', 'javascript', 'python', 'ruby', 'linux', 'jekyll', 'git', 'etc',
  'talk',
];
const categoryRedirects = Object.fromEntries(
  RETIRED_CATEGORY_PATHS.filter((p) => !CATEGORY_PATHS.includes(p)).map((p) => [
    `/categories/${p}`,
    '/categories/dev/',
  ]),
);

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
    ...categoryRedirects,
  },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    // Light theme to match the (light-only) site.
    shikiConfig: { theme: 'github-light', wrap: false },
  },
});
