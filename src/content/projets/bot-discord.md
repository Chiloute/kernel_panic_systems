---
titre: Bot Discord associatif
description: Bot Discord sur mesure pour la gestion de la communauté KPS — rôles, annonces d'événements, notifications CTF et outils internes.
date: 2025-01-20
tags: [discord, bot, typescript, nodejs, automation]
---

## Contexte

Avec une communauté Discord active, la gestion manuelle des rôles, des annonces et des inscriptions aux événements devenait chronophage. Le bot KPS automatise les tâches répétitives et centralise les informations importantes directement dans le serveur.

## Fonctionnalités

### Gestion des membres

- Attribution automatique des rôles à l'arrivée (membre, invité)
- Commande `/role` pour auto-attribuer les rôles de pôle (Tech, Cyber, CTF, Communication)
- Vérification de l'appartenance à l'association

### Événements

- Annonces automatiques dans `#evenements` à partir du calendrier interne
- Système de RSVP par réaction (✅ / ❌) avec comptage en temps réel
- Rappel 24h avant chaque événement via message privé aux inscrits

### CTF

- Notification dans `#ctf-alerts` lors de l'ouverture de nouvelles compétitions sur CTFtime
- Création automatique de threads temporaires par CTF avec catégories (Web, Pwn, Crypto…)
- Archivage des threads après la compétition

### Utilitaires

- `/whois @membre` — affiche le profil Discord + pôle + ancienneté
- `/challenge` — challenge de sécurité quotidien tiré aléatoirement depuis notre base
- `/doc <terme>` — recherche dans la base de connaissances interne (wiki)

## Stack technique

- **Runtime** : Node.js 22 + TypeScript
- **Framework** : Discord.js v14 (slash commands, interactions API)
- **Base de données** : SQLite (better-sqlite3) pour les données légères
- **Hébergement** : VPS auto-hébergé, démarrage via `systemd`
- **CI/CD** : GitHub Actions → déploiement automatique sur push `main`

## Architecture

```
src/
├── commands/        # Slash commands (/role, /whois, /challenge…)
├── events/          # Handlers Discord.js (messageCreate, guildMemberAdd…)
├── services/        # CTFtime API, calendar, wiki
├── database/        # Modèles SQLite
└── utils/           # Embeds builder, logger, config
```

## Exemple de commande

```typescript
// commands/role.ts
export const data = new SlashCommandBuilder()
  .setName("role")
  .setDescription("Attribue un pôle à ton profil")
  .addStringOption((opt) =>
    opt
      .setName("pole")
      .setDescription("Ton pôle d'activité")
      .setRequired(true)
      .addChoices(
        { name: "Tech", value: "tech" },
        { name: "Cyber", value: "cyber" },
        { name: "CTF", value: "ctf" },
        { name: "Communication", value: "communication" },
      ),
  );
```

## État du projet

En développement actif. Les fonctionnalités de base (rôles, annonces) sont opérationnelles en production. Les modules CTFtime et challenge quotidien sont en cours d'intégration.
