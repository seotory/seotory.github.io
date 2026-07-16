import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => data.published !== false);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Category keys a post belongs to: the full path plus each segment, so that
 * /categories/dev/ lists everything under dev/. "dev/java" -> ["dev/java","dev","java"]
 */
export function categoryKeys(categories: string): string[] {
  const full = (categories || '').trim();
  if (!full) return [];
  const segs = full.split('/').filter(Boolean);
  return Array.from(new Set([full, ...segs]));
}

export function postsInCategory(posts: Post[], key: string): Post[] {
  return posts.filter((p) => categoryKeys(p.data.categories).includes(key));
}

/** Related posts: same full category path, excluding the current post. */
export function relatedPosts(posts: Post[], current: Post, limit = 4): Post[] {
  return posts
    .filter((p) => p.id !== current.id && p.data.categories === current.data.categories)
    .slice(0, limit);
}

/** Plain-text excerpt from raw markdown body. */
export function excerpt(body: string, words = 40): string {
  const text = (body || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*`_~]|^\s*[-+]\s/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const arr = text.split(' ').filter(Boolean);
  return arr.length > words ? arr.slice(0, words).join(' ') + '...' : text;
}

/** YYYY-MM-DD in the site's timezone (Asia/Seoul). */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  }).format(date);
}
