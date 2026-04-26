# Kernel Panic Systems — Site officiel

Site web de l'association d'informatique et de cybersécurité **Kernel Panic Systems** (ESIEA Paris, Ivry-sur-Seine). Construit avec Astro 6, Svelte 5 et TailwindCSS v4, packagé de façon reproductible via Nix/bun2nix.

---

## Stack technique

| Outil | Rôle |
|---|---|
| [Astro 6](https://astro.build) | Framework SSG — routing fichier, Content Collections, build statique |
| [Svelte 5](https://svelte.dev) | Composants interactifs (filtres, calendrier, navigation mobile) |
| [TailwindCSS v4](https://tailwindcss.com) | CSS utilitaire — configuration CSS-first via `@theme` |
| [Bun](https://bun.sh) | Gestionnaire de paquets et runtime |
| [Nix / bun2nix](https://github.com/nix-community/bun2nix) | Build reproductible via flake |

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
│   │   └── bureau/
│   │       └── index.astro       # Organigramme + membres
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
│   ├── content/                  # Collections Markdown
│   │   ├── projets/              # Articles projets (.md)
│   │   ├── evenements/           # Articles événements (.md)
│   │   └── writeups/             # Writeups CTF (.md)
│   │
│   ├── data/
│   │   └── membres.ts            # Bureau et membres (pseudos + avatars)
│   │
│   ├── styles/
│   │   └── global.css            # Thème Tailwind + typo .prose-kps
│   │
│   └── content.config.ts         # Schémas Content Collections
│
├── flake.nix                     # Package Nix reproductible
├── astro.config.mjs              # Config Astro (Svelte + Tailwind)
└── package.json
```

---

## Développement

### Prérequis

- **Bun** ≥ 1.x — [installation](https://bun.sh/docs/installation)
- ou **Nix** avec flakes activés (environnement complet via `nix develop`)

### Démarrage rapide

```bash
# Avec Bun directement
bun install
bun dev        # Serveur de dev sur http://localhost:4321

# Avec Nix (fournit bun automatiquement)
nix develop
bun dev
```

### Commandes disponibles

| Commande | Action |
|---|---|
| `bun dev` | Serveur de développement sur `localhost:4321` (hot-reload) |
| `bun run build` | Build de production dans `./dist/` |
| `bun preview` | Prévisualisation du build de production |
| `nix build` | Build reproductible via Nix (nécessite `bun.nix` à jour) |

> **Note Nix** : si `bun.nix` est absent ou que `bun.lock` a changé, régénérer avec `nix develop -c bun2nix` avant de commiter.

---

## Gestion du contenu

Tout le contenu éditorial est dans `src/content/` sous forme de fichiers Markdown avec un frontmatter YAML.

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

### Mettre à jour les membres

Éditer `src/data/membres.ts` :

```typescript
// Bureau — remplacer les pseudos et avatars Discord
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

// Membres simples
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

### 1. Build standard (Bun)

```bash
bun run build
# Les fichiers sont dans ./dist/
```

### 2. Nginx

```bash
bun run build
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

    # Cache agressif pour les assets avec hash
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
bun run build
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

Caddy gère le certificat Let's Encrypt automatiquement.

### 4. Build Nix (reproductible)

Pour un déploiement sur NixOS ou via `nix copy` :

```bash
# Générer bun.nix si absent ou après mise à jour des dépendances
nix develop -c bun2nix

# Build
nix build
# Résultat dans ./result/share/blog/
```

Le résultat peut être servi directement ou intégré dans une configuration NixOS :

```nix
# configuration.nix
services.nginx.virtualHosts."kps.example.com" = {
  root = "${pkgs.callPackage ./kernel_panic_systems {}}/share/blog";
};
```

### 5. GitHub Pages / Netlify / Vercel

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
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Netlify** : connecter le dépôt, build command `bun run build`, publish directory `dist`.

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
