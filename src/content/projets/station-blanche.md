---
titre: Station Blanche
description: Station d'assainissement de supports amovibles basée sur un double moteur antiviral ESET et ClamAV, pour neutraliser les menaces avant introduction dans un réseau sécurisé.
date: 2025-02-10
tags: [sécurité, linux, antivirus, eset, clamav, bash]
---

## Contexte

Les supports amovibles (clés USB, disques externes) constituent l'un des vecteurs d'attaque les plus sous-estimés en cybersécurité, notamment dans les environnements industriels et institutionnels déconnectés d'Internet. La **station blanche** est un poste dédié qui permet de scanner et d'assainir tout support avant son utilisation sur le réseau interne.

Ce projet s'inspire des pratiques de l'ANSSI et des exigences des environnements classifiés.

## Double moteur antiviral

L'approche repose sur la complémentarité de deux moteurs :

| Moteur | Type | Force |
|--------|------|--------|
| **ESET NOD32** | Commercial | Heuristique avancée, détection comportementale, mises à jour cloud |
| **ClamAV** | Open source | Signatures communautaires, excellent sur scripts, archives, macros |

Un fichier doit passer les deux scanners pour être déclaré sain. Cette redondance réduit significativement les faux négatifs.

## Architecture du système

```
[Support branché]
       │
  [udev rule]  ──→  montage en lecture seule
       │
  [ESET scan]  ──→  résultat OK / ALERT
       │
  [ClamAV scan] ──→  résultat OK / ALERT
       │
  [Rapport]  ──→  /var/log/station-blanche/YYYYMMDD_HHMMSS.log
       │
  [Verdict]  ──→  sain ✔  ou  quarantaine ✖
```

## Stack technique

- **OS** : Debian 12 (installation minimale, pas de GUI)
- **Automatisation** : règles `udev` + scripts Bash
- **ESET** : ESET NOD32 Antivirus for Linux
- **ClamAV** : `clamav` + `freshclam` (mises à jour quotidiennes des signatures)
- **Logs** : journaux horodatés dans `/var/log/station-blanche/`
- **Interface** : affichage terminal avec code couleur (vert/rouge)

## Fonctionnement pas à pas

1. L'opérateur branche le support USB
2. `udev` détecte l'événement et déclenche le script d'analyse
3. Le support est monté en **lecture seule** (aucune modification possible)
4. Scan ESET → en cas d'alerte, le fichier est mis en quarantaine immédiatement
5. Scan ClamAV sur les fichiers restants
6. Génération du rapport horodaté
7. Démontage propre du support
8. Affichage du verdict à l'opérateur

## État du projet

Phase de tests sur environnement de lab. Déploiement prévu dans les locaux de l'association.
