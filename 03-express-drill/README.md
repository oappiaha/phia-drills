# Drill 3 Express — Products API

5 endpoints. New challenges: PATCH with dynamic SET clause, query param filtering, price validation.

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

Open `src/routes/products.ts` and implement all 5 endpoints.

## Smoke Tests

```bash
curl localhost:3000/health
curl localhost:3000/products
curl "localhost:3000/products?category=bags"
curl "localhost:3000/products?active=false"
curl localhost:3000/products/1
curl localhost:3000/products/999          # should 404

curl -X POST localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Bag","price":120.00,"category":"bags"}'

curl -X POST localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Bad","price":-5,"category":"bags"}'  # should 400

curl -X PATCH localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":199.00,"stock":20}'

curl -X PATCH localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{}'                                # should 400

curl -X DELETE localhost:3000/products/1 # should 204
curl -X DELETE localhost:3000/products/1 # should 404
```

## What's new in this drill

- PATCH with a dynamic SET clause (don't hardcode the column names)
- Query param filtering (?category=, ?active=)
- Price validation (must be positive number)
- 5 endpoints instead of 4
