# Setup / Onboarding

This guide gets a new developer from a fresh clone to a logged-in dashboard.

## 1. Prerequisites

- Node.js 20 LTS
- npm (the repo uses `package-lock.json`)
- A free [Supabase](https://supabase.com) account (each developer creates their own project for local dev)

## 2. Install dependencies

```bash
npm install
```

This also runs `nuxt prepare` (the `postinstall` script), which generates Nuxt's `.nuxt` types. It does **not** generate the Prisma client — that's a separate step below.

## 3. Create a Supabase project and get connection strings

1. Create a new project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard, go to **Project Settings → Database**.
3. Copy two connection strings:
   - **Connection pooling** (transaction mode, port 6543) → this is `DATABASE_URL`, used by the app at runtime.
   - **Direct connection** (port 5432) → this is `DIRECT_URL`, used by Prisma for migrations.

## 4. Configure environment variables

```bash
cp .env.example .env
```

Fill in `DATABASE_URL` and `DIRECT_URL` with the values from step 3.

## 5. Set up the database schema

The schema lives in `prisma/schema.prisma` (`User`, `Client`, `Products` models). There are no migrations checked in yet, so the first one needs to be created:

```bash
npx prisma migrate dev --name init
```

This applies the schema to your Supabase database and generates the Prisma client into `app/generated/prisma` (gitignored). If you ever pull schema changes from someone else without a new migration, or just need to resync the client, run:

```bash
npx prisma generate
```

## 6. Start the dev server

```bash
npm run dev
```

The app runs at `http://localhost:3000`.




