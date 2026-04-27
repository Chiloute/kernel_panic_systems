import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: z.object({
    titre: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const evenements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/evenements' }),
  schema: z.object({
    titre: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lieu: z.string().optional(),
    lien: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  schema: z.object({
    titre: z.string(),
    ctf: z.string(),
    date: z.coerce.date(),
    categorie: z.string(),
    difficulte: z.enum(['easy', 'medium', 'hard', 'insane']),
    tags: z.array(z.string()).default([]),
    points: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const formations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/formations' }),
  schema: z.object({
    titre: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    niveau: z.enum(['debutant', 'intermediaire', 'avance']).default('debutant'),
    tags: z.array(z.string()).default([]),
    outils: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    titre: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    categorie: z.enum(['avis', 'tutoriel', 'retour']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projets, evenements, writeups, formations, articles };
