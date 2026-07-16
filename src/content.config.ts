import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional().default(''),
    image: z.string().optional().default(''),
    // Path-like category, e.g. "dev/java".
    categories: z.string().default(''),
    // Optional list of "YYYYMMDD" edit dates.
    history: z.array(z.string()).optional().default([]),
    published: z.boolean().default(true),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { posts };
