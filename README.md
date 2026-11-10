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

```
VinoDomia/
├── app/
│   ├── pages/          # Pages de l'application (une par module)
│   └── generated/      # Client Prisma (généré, non versionné)
├── components/         # Composants Vue réutilisables
├── server/
│   ├── api/            # Routes API (auth, ...)
│   └── utils/          # Client Prisma partagé
├── prisma/
│   └── schema.prisma   # Modèles de données
└── docker-compose.yaml # Base PostgreSQL locale
```

## 📦 Production

```bash
pnpm build     # Build de production
pnpm preview   # Prévisualiser le build en local
```

---

<div align="center">
<sub>Fait avec 🍷 par l'équipe VinoDomia</sub>
</div>
