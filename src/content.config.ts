import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_PATHS } from './consts';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional().default(''),
    image: z.string().optional().default(''),
    // One category path, e.g. "dev" — or "dev/java" once a second level exists.
    // Validated against the nav so typos can't invent a category.
    category: z.enum(CATEGORY_PATHS),
    // Optional list of "YYYYMMDD" edit dates.
    history: z.array(z.string()).optional().default([]),
    published: z.boolean().default(true),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { posts };
