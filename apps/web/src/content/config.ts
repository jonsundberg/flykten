import { defineCollection, z } from 'astro:content';

const releases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.string(),
    releaseDate: z.union([z.string(), z.date()]).transform((d) =>
      typeof d === 'string' ? d : d.toISOString().slice(0, 10)
    ),
    cover: z.string().optional(),
    links: z.object({
      spotify: z.string().optional(),
      youtube: z.string().optional(),
    }).optional(),
    tracks: z.array(z.object({
      title: z.string(),
    })).optional(),
  }),
});

const press = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  releases,
  press,
};
