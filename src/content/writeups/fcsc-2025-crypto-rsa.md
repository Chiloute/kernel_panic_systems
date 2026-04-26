---
titre: "Petite clé privée — Attaque de Wiener sur RSA"
ctf: FCSC 2025
date: 2025-04-12
categorie: crypto
difficulte: hard
tags: [rsa, wiener, cryptanalyse, python]
points: 450
---

## Description

> On nous donne `n`, `e` et un message chiffré `c`. L'exposant public `e` est anormalement grand. Retrouve le message en clair.

```python
n = 0xc3f2...  # 1024 bits
e = 0xb1a9...  # ~1020 bits — presque aussi grand que n
c = 0x4f3e...
```

## Analyse

Un `e` très grand implique, par la relation `ed ≡ 1 (mod φ(n))`, un `d` **très petit**. C'est la condition d'application de l'**attaque de Wiener (1990)**.

### Condition de vulnérabilité

L'attaque de Wiener fonctionne si :

```
d < (1/3) * n^(1/4)
```

On estime `n^(1/4) ≈ 2^256`, donc `d < 2^254` — la condition est vraisemblablement remplie.

## Exploit

L'attaque repose sur le développement en **fractions continues** de `e/n` pour trouver `k/d` :

```python
from math import isqrt

def continued_fractions(num, den):
    while den:
        yield num // den
        num, den = den, num % den

def convergents(cf):
    n0, n1 = 0, 1
    d0, d1 = 1, 0
    for a in cf:
        n0, n1 = n1, a * n1 + n0
        d0, d1 = d1, a * d1 + d0
        yield n1, d1

def wiener(e, n):
    for k, d in convergents(continued_fractions(e, n)):
        if k == 0:
            continue
        # φ(n) = (ed - 1) / k
        phi_candidate, rem = divmod(e * d - 1, k)
        if rem != 0:
            continue
        # Vérifie si φ(n) est cohérent avec n = p*q
        b = n - phi_candidate + 1
        discriminant = b * b - 4 * n
        if discriminant >= 0:
            sqrt_d = isqrt(discriminant)
            if sqrt_d * sqrt_d == discriminant:
                return d
    return None

d = wiener(e, n)
m = pow(c, d, n)
print(bytes.fromhex(hex(m)[2:]))
```

## Résultat

```
FCSC{w13n3r_4tt4ck_0n_sm4ll_d_15_cl4ss1c}
```

## Leçon

Ne jamais choisir `d` petit pour "optimiser" le déchiffrement. Utiliser l'**algorithme CRT** (théorème chinois des restes) à la place pour accélérer RSA sans compromettre la sécurité.
