# Drill 1 — Migrate & Seed

Practice writing a Postgres migration and seed from scratch.
No Express. No Docker build. Just you and the database.

## Setup

```bash
cp .env.example .env
docker-compose up -d       # starts Postgres only
npm install
```

## Your Tasks

1. Open `src/db/migrate.ts` — create the orders table + indexes
2. Open `src/db/seed.ts` — insert 5+ rows using a transaction
3. Run them:

```bash
npm run migrate
npm run seed
```

## Verify it worked

```bash
docker-compose exec db psql -U user -d drills -c "SELECT * FROM orders;"
docker-compose exec db psql -U user -d drills -c "\d orders"   # shows table schema + indexes
```

## Reset and try again

```bash
npm run reset
npm run migrate
npm run seed
```

## What you're drilling

- CREATE TABLE with correct column types
- CREATE INDEX — single and composite
- INSERT inside a BEGIN/COMMIT transaction
- client.release() in finally
- RETURNING * after insert
