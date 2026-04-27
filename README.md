# Kernel Panic Systems — Site officiel

Site web de l'association d'informatique et de cybersécurité **Kernel Panic Systems** (ESIEA Paris, Ivry-sur-Seine). Construit avec Astro 6, Svelte 5 et TailwindCSS v4.

---

## Stack technique

| Outil | Rôle |
|---|---|
| [Astro 6](https://astro.build) | Framework SSG — routing fichier, Content Collections, build statique |
| [Svelte 5](https://svelte.dev) | Composants interactifs (filtres, calendrier, navigation mobile) |
| [TailwindCSS v4](https://tailwindcss.com) | CSS utilitaire — configuration CSS-first via `@theme` |
| [Bun](https://bun.sh) | Gestionnaire de paquets et runtime (alternatif à npm) |

---

## Structure du projet

```
kernel_panic_systems/
├── public/
│   ├── logo.svg                  # Logo KPS (gradient bleu→rouge)
│   └── avatars/
│       └── default.svg           # Avatar placeholder membres
│
├── src/
│   ├── pages/                    # Routing fichier Astro
│   │   ├── index.astro           # Page d'accueil
│   │   ├── projets/
│   │   │   ├── index.astro       # Liste des projets
│   │   │   └── [id].astro        # Page projet individuelle
│   │   ├── evenements/
│   │   │   ├── index.astro       # Calendrier + liste événements
│   │   │   └── [id].astro        # Page événement individuelle
│   │   ├── writeups/
│   │   │   ├── index.astro       # Writeups CTF avec filtres
│   │   │   └── [id].astro        # Page writeup individuelle
│   │   ├── formations/
│   │   │   ├── index.astro       # Liste des formations
│   │   │   └── [id].astro        # Page formation individuelle
│   │   ├── techno/
│   │   │   ├── index.astro       # Articles tech et tutoriels
│   │   │   └── [id].astro        # Page article individuelle
│   │   ├── equipe/
│   │   │   └── index.astro       # Organigramme + membres
│   │   └── rejoindre.astro       # Page "Rejoindre KPS"
│   │
│   ├── layouts/
│   │   ├── Layout.astro          # Shell HTML global (Header + Footer)
│   │   └── BlogPost.astro        # Layout partagé pages Markdown
│   │
│   ├── components/
│   │   ├── Header.svelte         # Navigation principale (Svelte 5)
│   │   ├── Footer.astro          # Pied de page
│   │   ├── MemberCard.svelte     # Carte membre avec avatar Discord
│   │   ├── MembresGrid.svelte    # Grille membres avec onglets par pôle
│   │   ├── CalendrierEvenements.svelte  # Calendrier interactif
│   │   └── WriteupFilter.svelte  # Filtres CTF/catégorie/difficulté
│   │
│   ├── content/                  # Collections Markdown (contenu éditorial)
│   │   ├── projets/              # Articles projets (.md)
│   │   ├── evenements/           # Articles événements (.md)
│   │   ├── writeups/             # Writeups CTF (.md)
│   │   ├── formations/           # Guides et ateliers (.md)
│   │   └── techno/               # Articles tech et retours d'expérience (.md)
│   │
│   ├── data/
│   │   └── membres.ts            # Bureau et membres (pseudos + avatars)
│   │
│   ├── styles/
│   │   └── global.css            # Thème Tailwind + typo .prose-kps
│   │
│   └── content.config.ts         # Schémas Content Collections (Zod)
│
├── astro.config.mjs              # Config Astro (Svelte + Tailwind)
└── package.json
```

---

## Développement

### Prérequis

- **Node.js** ≥ 22.12.0 — [nodejs.org](https://nodejs.org)
- **npm** ≥ 10 (inclus avec Node.js)
- ou **Bun** ≥ 1.x — [bun.sh](https://bun.sh/docs/installation) (alternatif, plus rapide)

### Démarrage rapide

```bash
# Avec npm
npm install
npm run dev        # Serveur de dev sur http://localhost:4321

# Avec Bun (alternatif)
bun install
bun dev
```

### Commandes disponibles

| Commande | Action |
|---|---|
| `npm run dev` | Serveur de développement sur `localhost:4321` (hot-reload) |
| `npm run build` | Build de production dans `./dist/` |
| `npm run preview` | Prévisualisation du build de production |
| `npm run astro check` | Type-checking des fichiers `.astro` |

---

## Gestion du contenu

Tout le contenu éditorial est dans `src/content/` sous forme de fichiers Markdown avec un frontmatter YAML. Les schémas sont définis dans `src/content.config.ts` via Zod.

### Ajouter un projet

Créer `src/content/projets/mon-projet.md` :

```markdown
---
titre: Nom du projet
description: Courte description (affichée dans les cartes)
date: 2026-01-15
tags: [python, sécurité, réseau]
draft: false          # true = non publié
---

Contenu Markdown complet ici...
```

### Ajouter un événement

Créer `src/content/evenements/nom-evenement.md` :

```markdown
---
titre: Nom de l'événement
description: Description courte
date: 2026-06-10
lieu: Salle TP — ESIEA    # optionnel
lien: https://...          # optionnel, lien externe
draft: false
---

Programme détaillé en Markdown...
```

### Ajouter un writeup CTF

Créer `src/content/writeups/ctf-nom-challenge.md` :

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
...

## Exploitation
...
```

### Ajouter une formation

Créer `src/content/formations/nom-formation.md` :

```markdown
---
titre: Introduction à la CLI Linux
description: Prise en main du terminal pour débutants
date: 2026-05-01
niveau: debutant          # debutant | intermediaire | avance
tags: [linux, shell, bash]
outils: [bash, vim]
draft: false
---

Contenu de la formation...
```

### Ajouter un article techno

Créer `src/content/techno/nom-article.md` :

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

### Mettre à jour les membres

Éditer `src/data/membres.ts` :

```typescript
export const bureau: BureauMember[] = [
  {
    pseudo: 'MonPseudoDiscord',
    role: 'Président',
    // URL Discord CDN : https://cdn.discordapp.com/avatars/{user_id}/{hash}.png?size=256
    avatar: 'https://cdn.discordapp.com/avatars/123456789/abcdef.png?size=256',
    poles: ['tech', 'ctf'],
  },
  // ...
];

export const membres: Member[] = [
  { pseudo: 'Pseudo', avatar: '/avatars/default.svg', poles: ['cyber'] },
  // ...
];
```

Les pôles disponibles sont : `tech` (bleu), `cyber` (rouge), `ctf` (violet), `communication` (sky).

### Mettre à jour les liens réseaux sociaux

Éditer `src/components/Footer.astro`, section `socials` :

```javascript
const socials = [
  { label: 'Discord', href: 'https://discord.gg/votre-invite', icon: `...` },
  { label: 'Instagram', href: 'https://instagram.com/kps_esiea', icon: `...` },
  { label: 'GitHub', href: 'https://github.com/KernelPanicSystems', icon: `...` },
];
```

---

## Déploiement en production

Le site Astro génère des **fichiers statiques** dans `./dist/` : HTML, CSS, JS, images. N'importe quel serveur HTTP peut les servir.

### 1. Build

```bash
npm run build
# Les fichiers sont dans ./dist/
```

### 2. Nginx

Copier `dist/` sur le serveur puis configurer Nginx :

```bash
npm run build
rsync -av dist/ utilisateur@serveur:/var/www/kps/
```

Configuration Nginx minimale :

```nginx
server {
    listen 80;
    server_name kps.example.com;

    root /var/www/kps;
    index index.html;

    # Nécessaire pour le routing Astro (pages avec sous-dossiers)
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Cache agressif pour les assets avec hash de contenu
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

Pour HTTPS, ajouter Certbot : `certbot --nginx -d kps.example.com`

### 3. Caddy (recommandé — HTTPS automatique)

```bash
npm run build
rsync -av dist/ utilisateur@serveur:/var/www/kps/
```

`Caddyfile` :

```
kps.example.com {
    root * /var/www/kps
    file_server
    try_files {path} {path}.html {path}/ =404
    encode gzip
}
```

Caddy gère le certificat Let's Encrypt automatiquement, sans configuration supplémentaire.

### 4. GitHub Pages / Netlify / Vercel

Le site étant 100% statique, il est compatible avec toutes ces plateformes.

**GitHub Actions** (exemple `.github/workflows/deploy.yml`) :

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Netlify** : connecter le dépôt, build command `npm run build`, publish directory `dist`.

**Vercel** : même config, framework preset `Astro`.

---

## Design system

La charte graphique suit la dualité **Red Team / Blue Team** :

| Élément | Couleur | Usage |
|---|---|---|
| Fond | `zinc-950` | Arrière-plan global |
| Rouge `#ef4444` | Red team | Writeups CTF, boutons principaux, liens actifs |
| Bleu `#3b82f6` | Blue team | Projets, tech, liens secondaires |
| Gradient rouge→violet→bleu | Signature | Bordures décoratives, titres hero |
| `zinc-800/900` | Neutre | Cartes, bordures, texte secondaire |

Le thème est défini dans `src/styles/global.css` via la directive `@theme` de Tailwind v4.

---

## Licence

MIT — Kernel Panic Systems, ESIEA Paris.
