---
titre: Introduction à la ligne de commande Linux
description: Maîtriser le terminal pour naviguer, manipuler des fichiers et enchaîner des commandes — base indispensable pour tous les pôles.
date: 2026-03-12
niveau: debutant
tags: [linux, cli, bash, terminal]
outils: [bash, vim]
---

## Objectifs

À l'issue de cette formation tu sauras :

- naviguer dans l'arborescence (`cd`, `ls`, `pwd`, `find`)
- manipuler des fichiers et répertoires (`cp`, `mv`, `rm`, `mkdir`)
- lire et filtrer du texte (`cat`, `less`, `grep`, `cut`, `sort`)
- enchaîner des commandes avec pipes et redirections
- écrire un script bash simple

## Prérequis

Aucun. Un terminal Linux ou WSL2 suffit.

## Programme

### 1. L'arborescence Unix

```bash
/
├── etc/      # configuration système
├── home/     # répertoires utilisateurs
├── var/      # données variables (logs, BDD…)
└── tmp/      # fichiers temporaires
```

### 2. Navigation et fichiers

```bash
ls -la          # liste avec permissions
cd /tmp && pwd  # changer de dossier
cp -r src/ dst/ # copie récursive
find . -name "*.log" -mtime -7  # fichiers récents
```

### 3. Pipes et redirections

```bash
cat /etc/passwd | cut -d: -f1 | sort   # extraire les usernames
grep -r "error" /var/log/ 2>/dev/null  # chercher dans les logs
command > out.txt 2>&1                  # rediriger stdout + stderr
```

## Exercices

### Exercice 1 — Navigation

1. Crée l'arborescence `~/kps/formations/linux/exercices/`
2. Dans `exercices/`, crée 5 fichiers nommés `flag_01.txt` à `flag_05.txt`
3. Liste-les triés par taille, affiche leurs permissions

### Exercice 2 — Grep & pipes

Le fichier `/var/log/syslog` (ou `/var/log/messages`) contient des milliers de lignes.  
Trouve toutes les lignes contenant `"error"` (insensible à la casse), compte-les et affiche les 10 premières.

```bash
# Ta commande ici
grep -ic "error" /var/log/syslog
grep -i "error" /var/log/syslog | head -10
```

### Exercice 3 — Script bash

Écris un script `backup.sh` qui :
1. Prend un dossier en argument
2. Crée une archive `.tar.gz` horodatée dans `~/backups/`
3. Affiche la taille de l'archive créée

## Ressources

- [explainshell.com](https://explainshell.com) — décompose n'importe quelle commande
- [tldr.sh](https://tldr.sh) — man pages simplifiées
- *The Linux Command Line* — William Shotts (gratuit en ligne)
