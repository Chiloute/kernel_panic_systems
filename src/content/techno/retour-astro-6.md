---
titre: "Retour sur Astro 6 : pourquoi on a choisi ce framework pour KPS"
description: On utilise Astro 6 avec Bun pour le site de l'asso. Voici ce qu'on en pense après quelques mois — les bons points, les limitations, et si on referait le même choix.
date: 2026-02-10
categorie: retour
tags: [astro, bun, web, static-site, nix]
---

## Pourquoi Astro ?

Quand on a lancé le refonte du site KPS, on voulait quelque chose de simple : générer du HTML statique, pas de serveur à maintenir, et un DX correct pour les membres qui touchent peu au web. Astro coche toutes ces cases.

Ce qui nous a convaincu dès le départ :

- **Zéro JS par défaut** — les pages sont du HTML pur, le JS n'est envoyé que si on le demande explicitement via les directives `client:*`
- **Contenu en markdown** — les writeups, événements et projets vivent dans `src/content/` avec un schéma TypeScript validé par Zod
- **Composants Svelte/React/Vue** — on peut injecter des îlots interactifs (filtre writeups, calendrier) sans refaire toute l'archi

## Ce qu'on aime

### Le Content Layer API (v5+)

La nouvelle API `defineCollection` + `glob()` loader est propre. On définit le schéma une fois, et Astro génère automatiquement les types TypeScript. Résultat : écrire du frontmatter invalide fait planter `bun astro check`, pas le build en prod.

```ts
const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  schema: z.object({
    difficulte: z.enum(['easy', 'medium', 'hard', 'insane']),
    // ...
  }),
});
```

### L'intégration Nix

Le site est packagé via un flake Nix avec `bun2nix`. Ça permet un build reproductible : `nix build` donne exactement le même `dist/` sur n'importe quelle machine. Pratique pour un déploiement propre sans Docker.

## Les limitations

### Pas de backend natif

Astro est pensé pour du statique. Si on veut une vraie API (formulaire de contact, authentification, données dynamiques), il faut soit ajouter un adaptateur SSR, soit passer par un service externe. Pour l'instant ce n'est pas un problème, mais ça le sera si on veut un espace membres.

### Astro DB

On a évalué Astro DB pour gérer la liste des membres. C'est du LibSQL (SQLite) côté serveur — incompatible avec un build purement statique. On a gardé un fichier TypeScript (`src/data/membres.ts`) à la place.

### Hot reload parfois capricieux

Sur quelques machines, le HMR en dev peut rater des changements dans les collections. Un `bun dev` clean règle toujours le problème, mais c'est un peu agaçant.

## Le verdict

Pour un site statique d'asso avec du contenu markdown : **Astro est le bon choix**. La courbe d'apprentissage est douce, les performances sont excellentes (Lighthouse 100 sur tout), et on n'a aucun serveur à maintenir.

Si le projet évolue vers quelque chose de plus dynamique (espace membres, inscriptions aux événements), il faudra revoir l'architecture — probablement un backend séparé plutôt que du SSR Astro.
