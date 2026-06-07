# Drill 2 — Express API

The database is already set up. Your only job: implement the routes.

## Setup

```bash
cp .env.example .env
docker-compose up -d
npm install
npm run migrate
npm run seed
npm run dev
```

## Your Task

Open `src/routes/orders.ts` and implement all 4 endpoints.

## Smoke Tests (run these after)

```bash
curl localhost:3000/health
curl localhost:3000/orders
curl localhost:3000/orders?status=pending
curl localhost:3000/orders/1
curl localhost:3000/orders/999         # should 404
curl -X POST localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"customer":"Dave","total":99.99}'
curl -X POST localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"customer":"Dave"}'             # should 400
curl -X DELETE localhost:3000/orders/1 # should 204
curl -X DELETE localhost:3000/orders/1 # should 404 now
```

## What you're drilling

- Router setup in Express
- pool.query() for reads
- pool.connect() + transaction for delete
- 400 validation, 404 not found, 201 created, 204 no content
- try/catch on every handler
- $1/$2 parameterized queries
