# Drill 5 — Migrate & Seed: Timed Blank

No hints. No column list. Just a spec and a timer.

This is the closest thing to the real interview condition.

## Setup

```bash
cp .env.example .env
docker-compose up -d
npm install
```

## Your Tasks

1. Read the spec in `migrate.ts` — then close this file and write it from memory
2. Seed in `seed.ts` — two tables, one transaction, RETURNING id chaining
3. Run:

```bash
npm run migrate
npm run seed
```

## Time Goals

| Task | Target |
|------|--------|
| migrate.ts | under 8 min |
| seed.ts | under 6 min |
| full cycle (reset → migrate → seed → verify) | under 20 min |

## Verify

```bash
docker-compose exec db psql -U user -d drills -c "\d inventory_items"
docker-compose exec db psql -U user -d drills -c "SELECT i.sku, i.quantity, w.name as warehouse FROM inventory_items i JOIN warehouses w ON w.id = i.warehouse_id;"
```

## Reset

```bash
npm run reset && npm run migrate && npm run seed
```
