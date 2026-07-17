// Site-wide configuration.

export const SITE_TITLE = 'Seotory';
export const SITE_DESCRIPTION =
  '서토리의 고분고투 개발 스토리를 담은 블로그입니다.';
export const SITE_URL = 'https://blog.seotory.com';

// Google AdSense.
export const ADSENSE_CLIENT = 'ca-pub-1634875166425349';

// Google Analytics 4 measurement ID (stream: seotory blog - GA4).
export const GA4_MEASUREMENT_ID = 'G-6S4LG3QJ26';

// Posts per page.
export const PAGE_SIZE = 10;

// Standalone page links shown before the category nav.
export const PAGES_NAV = [
  { title: 'About', path: '/about/' },
  { title: 'Tags', path: '/tags/' },
];

// Navigation. `path` is the category key used in /categories/<path>/ URLs.
// A category may gain `items` (a second level) at any time; the nav renders a
// dropdown on desktop and an indented group in the drawer when it does.
export type NavItem = {
  title: string;
  path: string;
  use: boolean;
  items?: NavItem[];
};

export const CATEGORY_NAV: NavItem[] = [{ title: 'Dev', path: 'dev', use: true }];

// Every category path the nav knows about, flattened. The content schema
// validates against this, so a typo — or a category with posts but no home in
// the nav — fails the build instead of silently creating an orphan.
export const CATEGORY_PATHS = CATEGORY_NAV.flatMap((c) => [
  c.path,
  ...(c.items?.map((i) => i.path) ?? []),
]) as [string, ...string[]];
