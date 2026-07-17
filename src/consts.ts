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

// Navigation. `path` is the category key used in /categories/<path>/ URLs.
export type NavItem = {
  title: string;
  path: string;
  use: boolean;
};

// Standalone page links shown before the category nav.
export const PAGES_NAV = [
  { title: 'About', path: '/about/' },
  { title: 'Tags', path: '/tags/' },
];

export const CATEGORY_NAV: NavItem[] = [{ title: 'Dev', path: 'dev', use: true }];
