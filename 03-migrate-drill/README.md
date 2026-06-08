# Drill 3 — Migrate & Seed: Products

Different schema, same muscle. This time: a products table with a UNIQUE constraint and a boolean column.

## Setup

```bash
cp .env.example .env
docker-compose up -d
npm install
```

## Your Tasks

1. Open `src/db/migrate.ts` — create the products table + indexes
2. Open `src/db/seed.ts` — insert 6+ rows using a transaction
3. Run them:

```bash
npm run migrate
npm run seed
```

## Verify it worked

```bash
docker-compose exec db psql -U user -d drills -c "SELECT * FROM products;"
docker-compose exec db psql -U user -d drills -c "\d products"
```

## Reset and try again

```bash
npm run reset
npm run migrate
npm run seed
```

## What's new in this drill (vs Drill 1)

- UNIQUE constraint on a column
- BOOLEAN column with a default
- INTEGER column (stock) with a default
- Mixing active/inactive rows in seed
- ROLLBACK explicitly in catch (vs just re-throwing)
