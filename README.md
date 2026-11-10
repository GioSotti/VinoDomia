<div align="center">

# 🍷 VinoDomia

**L'application de gestion pensée pour les cavistes.**

Clients, produits, stock, commandes, caisse : tout le quotidien d'une cave réuni au même endroit.

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=flat-square&logo=nuxt&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-compose-2496ED?style=flat-square&logo=docker&logoColor=white)

</div>

---

## ✨ Fonctionnalités

| | Module | Description |
|---|---|---|
| 👥 | **Clients** | Fiches clients et coordonnées |
| 🍾 | **Produits & tarifs** | Catalogue, familles, fournisseurs, prix HT / TVA |
| 📦 | **Stock** | Sorties de stock et suivi des mouvements |
| 🧾 | **Commandes** | Nouvelles commandes et bons de commande fournisseurs |
| 💶 | **Caisse & factures** | Entrées / sorties de caisse, factures impayées |
| 📣 | **Actions commerciales** | Suivi des opérations commerciales |
| 🔐 | **Authentification** | Inscription, connexion (JWT) |

## 🛠️ Stack technique

| Couche | Technologies |
|---|---|
| **Front** | [Nuxt 4](https://nuxt.com) · [Vue 3](https://vuejs.org) · [Tailwind CSS 4](https://tailwindcss.com) · [Shuriken UI](https://shurikenui.com) |
| **Back** | Nuxt server routes (Nitro) · JWT · bcrypt |
| **Base de données** | [PostgreSQL 17](https://www.postgresql.org) · [Prisma 7](https://www.prisma.io) |
| **Outillage** | pnpm · Docker Compose |

## 🚀 Démarrage rapide

> **Prérequis :** Node.js `22.21+` ou `24.11+`, [pnpm](https://pnpm.io) et [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
# 1. Installer les dépendances
pnpm install

# 2. Configurer l'environnement
cp .env.example .env

# 3. Lancer la base de données et créer les tables
pnpm db:up
pnpm db:push

# 4. Démarrer l'app
pnpm dev
```

L'app est disponible sur **http://localhost:3000**.

## 🗄️ Base de données

PostgreSQL tourne en local dans Docker (`localhost:5432`, identifiants `vinodomia` / `vinodomia`).

| Commande | Rôle |
|---|---|
| `pnpm db:up` | Démarre le conteneur Postgres |
| `pnpm db:down` | Arrête la base (les données sont conservées) |
| `pnpm db:push` | Synchronise les tables avec `prisma/schema.prisma` |
| `pnpm db:generate` | Régénère le client Prisma |
| `pnpm db:studio` | Ouvre Prisma Studio pour explorer les données |
| `pnpm db:reset` | ⚠️ **Efface toutes les données** et recrée la base |

## 📁 Structure

Un seul projet Nuxt full-stack : `app/` est le **front**, `server/` est l'**API**, `shared/` contient ce qui sert aux deux.

```
VinoDomia/
├── app/                    # 🎨 Front
│   ├── components/         # Composants réutilisables (préfixe App*)
│   ├── composables/        # Logique réutilisable (useAuth...)
│   ├── middleware/         # Garde de navigation (auth)
│   ├── pages/              # Une page = une route
│   ├── utils/              # Fonctions utilitaires
│   └── generated/          # Client Prisma (généré, non versionné)
├── server/                 # ⚙️ API
│   ├── api/                # Routes HTTP : lisent la requête, appellent un service, répondent
│   ├── services/           # Logique métier (auth, users...), sans dépendance à Nuxt
│   └── utils/              # Client Prisma, JWT
├── shared/
│   └── types/              # Types communs front / API
├── prisma/
│   └── schema.prisma       # Modèles de données
├── tests/unit/             # Tests Vitest
└── docker-compose.yaml     # Base PostgreSQL locale
```

> 💡 **Ajouter une fonctionnalité côté API :** la logique va dans `server/services/xxx.service.ts` (testable sans base de données), et la route dans `server/api/` se contente de l'appeler.

## 📦 Production

```bash
pnpm build     # Build de production
pnpm preview   # Prévisualiser le build en local
```

## 🏷️ Versions & releases

Les versions sont publiées **uniquement via un tag Git**. Un push sur `main` ou `develop` ne publie rien : il lance seulement la CI (lint et tests).

### Publier une version

```bash
git tag -a v1.2.0 -m "Description de la version"
git push origin v1.2.0
```

> 💡 Le message du tag (`-m`) apparaît en tête de la release. Utilise toujours un tag **annoté** (`-a`), et ne crée pas la release à la main depuis GitHub : le workflow s'en occupe.

### Ce qui se passe ensuite

Le workflow [`release.yml`](.github/workflows/release.yml) enchaîne trois étapes :

| # | Étape | Résultat |
|---|---|---|
| 1 | **CI** | Lint et tests unitaires. En cas d'échec, rien n'est publié |
| 2 | **Image Docker** | Construite et poussée sur le GitHub Container Registry (GHCR) |
| 3 | **Release GitHub** | Description du tag, notes générées (PR et commits depuis la version précédente) et code source en `.zip` / `.tar.gz` |

### Tags de l'image Docker

Pour la version `v1.2.0`, l'image est publiée sous plusieurs tags :

| Tag | Pointe vers |
|---|---|
| `ghcr.io/giosotti/vinodomia:1.2.0` | cette version exacte, ne change jamais |
| `ghcr.io/giosotti/vinodomia:1.2` | le dernier patch de la 1.2 |
| `ghcr.io/giosotti/vinodomia:1` | la dernière 1.x |
| `ghcr.io/giosotti/vinodomia:latest` | la dernière version stable |

Un tag avec suffixe, par exemple `v1.2.0-beta.1`, crée une **pré-release** et ne modifie pas `latest`.

### Numérotation (semver)

Format `vMAJEUR.MINEUR.PATCH` :

- **MAJEUR** : changement incompatible (ex. `v1.4.2` → `v2.0.0`)
- **MINEUR** : nouvelle fonctionnalité (ex. `v1.4.2` → `v1.5.0`)
- **PATCH** : correctif (ex. `v1.4.2` → `v1.4.3`)

### Récupérer et lancer une version

L'image a la même visibilité que le repo : si le repo est privé, il faut y avoir accès.

```bash
# Connexion au registre (token GitHub avec le droit read:packages)
echo <TOKEN> | docker login ghcr.io -u <utilisateur-github> --password-stdin

docker pull ghcr.io/giosotti/vinodomia:1.2.0
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NUXT_JWT_SECRET="$(openssl rand -hex 32)" \
  ghcr.io/giosotti/vinodomia:1.2.0
```

---

<div align="center">
<sub>Fait avec 🍷 par l'équipe VinoDomia</sub>
</div>
