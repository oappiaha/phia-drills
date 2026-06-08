# phia-drills

Isolated practice drills for Postgres migrations, seeding, and Express APIs.
No Docker build required — just `docker-compose up -d` for Postgres and you're writing code.

## Drill Order

### Migrate Drills (Postgres + TypeScript, no Express)

| Drill | Schema | What's new |
|-------|--------|-----------|
| `01-migrate-drill` | orders | baseline — CREATE TABLE, indexes, transaction seed |
| `03-migrate-drill` | products | UNIQUE constraint, BOOLEAN column, explicit ROLLBACK |
| `04-migrate-drill` | users + posts | two tables, FOREIGN KEY, RETURNING id chaining |
| `05-migrate-drill` | warehouses + inventory | timed blank — no hints, you decide the indexes |

### Express Drills (full API)

| Drill | Schema | What's new |
|-------|--------|-----------|
| `02-express-drill` | orders | baseline — 4 routes, GET/POST/DELETE, basic validation |
| `03-express-drill` | products | PATCH with dynamic SET clause, query param filters, price validation |
| `04-express-drill` | users + posts | JOIN queries, nested routes, FK existence check, action endpoint |

## Recommended Sequence

1. `01-migrate-drill` — until migrate + seed feel natural
2. `03-migrate-drill` — new column types, same rhythm
3. `02-express-drill` — first routes, get the pattern
4. `04-migrate-drill` — two tables, foreign keys
5. `03-express-drill` — PATCH, filters, validation
6. `04-express-drill` — JOINs, nested routes
7. `05-migrate-drill` — timed blank, no hints

Then: do the timed `phia-practice` run.

## Pattern (same every drill)

```bash
cp .env.example .env
docker-compose up -d
npm install
npm run migrate
npm run seed
# for express drills:
npm run dev
```

Reset anytime:
```bash
npm run reset && npm run migrate && npm run seed
```
