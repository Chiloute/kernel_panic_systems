---
titre: Site web Kernel Panic Systems
description: Conception et développement du site officiel de l'association — vitrine publique, blog, organigramme et espace CTF.
date: 2025-01-15
tags: [web, astro, svelte, tailwindcss, nix]
---

## Contexte

L'association avait besoin d'une présence en ligne centralisée pour présenter ses activités, publier ses projets, partager ses writeups CTF et présenter les membres du bureau. L'objectif était également d'avoir un pipeline de déploiement reproductible via Nix.

## Stack technique

- **Astro 6** — framework SSG avec routing basé sur les fichiers et content collections pour le blog
- **Svelte 5** — composants interactifs (navigation, filtres, organigramme) avec la nouvelle API runes
- **TailwindCSS v4** — configuration CSS-first, thème personnalisé rouge/bleu (référence red team / blue team)
- **Bun** — gestionnaire de paquets et runtime
- **Nix / bun2nix** — build reproductible, packaging déclaratif via flake

## Architecture

```
src/
├── pages/          # Routing fichier : /, /projets, /writeups, /ctf, /bureau…
├── layouts/        # Layout global + BlogPost partagé
├── components/     # Header, MemberCard, MembresGrid (Svelte)
├── content/        # Collections Markdown : projets, evenements, writeups
├── data/           # Données statiques : membres du bureau
└── styles/         # Tailwind + variables CSS
```

## Design

La charte graphique s'articule autour de la dualité **red team / blue team** :
- Fond noir (`zinc-950`) pour l'ambiance sécurité
- Rouge pour les éléments offensifs (CTF, writeups, boutons principaux)
- Bleu pour les éléments défensifs/constructifs (projets, tech)
- Gradient rouge → violet → bleu comme signature visuelle

## État du projet

En production — le site que tu lis en ce moment.
