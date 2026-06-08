# Drill 4 — Migrate & Seed: Two Tables + Foreign Key

Level up. Two tables. A real relationship. Order matters.

## Setup

```bash
cp .env.example .env
docker-compose up -d
npm install
```

## Your Tasks

1. Open `src/db/migrate.ts` — create users + posts tables with FK
2. Open `src/db/seed.ts` — insert users, then posts using their ids
3. Run them:

```bash
npm run migrate
npm run seed
```

## Verify it worked

```bash
docker-compose exec db psql -U user -d drills -c "SELECT * FROM users;"
docker-compose exec db psql -U user -d drills -c "SELECT * FROM posts;"
# Test the FK: try inserting a post with a fake user_id — should fail
docker-compose exec db psql -U user -d drills -c "INSERT INTO posts(user_id, title) VALUES (9999, 'test');"
```

## Reset and try again

```bash
npm run reset
npm run migrate
npm run seed
```

## What's new in this drill

- Two tables in one migration
- REFERENCES with ON DELETE CASCADE
- Creating tables in dependency order
- RETURNING id to chain inserts across tables
- Drop order matters in reset (posts before users)
