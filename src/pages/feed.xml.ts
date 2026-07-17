import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, excerpt } from '../utils/posts';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../consts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site?.toString() ?? SITE_URL,
    items: posts.slice(0, 20).map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || excerpt(post.body ?? '', 60),
      link: `/post/${post.id}/`,
      categories: [...post.data.tags, post.data.category].filter(Boolean),
    })),
  });
}
