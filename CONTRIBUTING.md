# Contribuer à Kernel Panic Systems

Deux types de contributions sont possibles : **contenu** (fichiers Markdown) et **code** (composants, pages, styles). Le contenu est le point d'entrée le plus simple — pas besoin de connaître Astro ou Svelte pour publier un writeup ou une formation.

---

## Contribuer au contenu

Tout le contenu éditorial vit dans `src/content/` sous forme de fichiers Markdown. Il suffit de créer un fichier avec le bon frontmatter YAML, et Astro génère automatiquement la page correspondante.

### Workflow général

1. Créer une branche depuis `main` : `git checkout -b content/mon-article`
2. Ajouter le fichier Markdown dans le bon dossier (voir ci-dessous)
3. Mettre `draft: true` pendant la rédaction — la page n'est pas publiée
4. Passer à `draft: false` quand l'article est prêt
5. Ouvrir une Pull Request vers `main`

### Writeup CTF

Dossier : `src/content/writeups/`  
Nom de fichier : `nomductf-annee-nom-du-challenge.md` (kebab-case)

```markdown
---
titre: Nom du challenge
ctf: NomDuCTF 2026
date: 2026-04-20
categorie: web            # web | crypto | pwn | reverse | forensics | misc
difficulte: medium        # easy | medium | hard | insane
tags: [jwt, bypass, web]
points: 200               # optionnel
draft: false
---

## Description

Énoncé du challenge...

## Analyse

...

## Exploitation

...

## Flag

`KPS{...}`
```

### Projet

Dossier : `src/content/projets/`  
Nom de fichier : `nom-du-projet.md`

```markdown
---
titre: Nom du projet
description: Courte description affichée dans la carte
date: 2026-01-15
tags: [python, réseau, sécurité]
draft: false
---

Présentation du projet, motivations, architecture, liens...
```

### Événement

Dossier : `src/content/evenements/`  
Nom de fichier : `nom-evenement-annee.md`

```markdown
---
titre: Nom de l'événement
description: Description courte
date: 2026-06-10
lieu: Salle TP — ESIEA    # optionnel
lien: https://...          # optionnel, lien externe
draft: false
---

Programme, intervenants, informations pratiques...
```

### Formation

Dossier : `src/content/formations/`  
Nom de fichier : `nom-formation.md`

```markdown
---
titre: Titre de la formation
description: Ce que le participant va apprendre
date: 2026-05-01
niveau: debutant          # debutant | intermediaire | avance
tags: [linux, shell]
outils: [bash, vim]       # outils nécessaires
draft: false
---

Contenu pédagogique, exercices, ressources...
```

### Article techno

Dossier : `src/content/techno/`  
Nom de fichier : `nom-article.md`

```markdown
---
titre: Titre de l'article
description: Résumé en une phrase
date: 2026-04-10
categorie: retour         # tutoriel | retour
tags: [astro, svelte]
draft: false
---

Corps de l'article...
```

---

## Contribuer au code

### Mise en place

```bash
git clone <repo>
cd kernel_panic_systems
npm install
npm run dev   # http://localhost:4321
```

### Vérification des types

```bash
npm run astro check   # type-check les fichiers .astro
```

### Conventions

**Quand créer un composant Astro vs Svelte ?**

| Besoin | Technologie |
|---|---|
| Rendu statique, pas d'interactivité | `.astro` |
| Interactivité côté client (filtres, état, événements) | `.svelte` |

Les composants Svelte sont montés avec `client:load` dans les pages Astro.

**Styles**

- Utiliser les classes Tailwind en priorité.
- Les styles spécifiques à un composant peuvent être écrits dans un bloc `<style>` — ils sont scopés automatiquement dans les fichiers `.astro`.
- Le thème global (couleurs, typographie) est défini dans `src/styles/global.css` via `@theme`.

**Ajouter une page**

Les pages suivent le routing fichier d'Astro : un fichier `src/pages/ma-section/index.astro` crée la route `/ma-section/`. Les pages dynamiques utilisent `[id].astro` et exportent `getStaticPaths()`.

**Ajouter une nouvelle collection de contenu**

1. Créer le dossier `src/content/ma-collection/`
2. Définir le schéma Zod dans `src/content.config.ts`
3. Créer les pages `src/pages/ma-collection/index.astro` et `[id].astro`

### Structure des commits

Utiliser des messages clairs et en français ou en anglais :

```
feat: ajout du filtre par niveau sur la page formations
fix: correction de l'affichage des dates en mobile
content: writeup HeroCTF v5 — web/jwt
```

### Ouvrir une Pull Request

- Branche depuis `main`
- Un sujet par PR (ne pas mélanger code et contenu)
- Décrire brièvement ce qui change et pourquoi
