# Drill 4 Express — Posts API with JOINs

Two tables. Real relationships. You'll write JOIN queries for the first time in these drills.

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

Open `src/routes/posts.ts` and implement all 5 endpoints.

## Smoke Tests

```bash
curl localhost:3000/health

# All published posts (with author info)
curl localhost:3000/posts

# All posts including drafts
curl "localhost:3000/posts?published=false"

# Single post with author
curl localhost:3000/posts/1
curl localhost:3000/posts/999           # should 404

# Posts by user
curl localhost:3000/users/1/posts
curl localhost:3000/users/999/posts     # should 404

# Create a post
curl -X POST localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"user_id":1,"title":"New Draft","body":"In progress"}'

curl -X POST localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"user_id":9999,"title":"Ghost"}'   # should 404

# Publish a post
curl -X PATCH localhost:3000/posts/2/publish
curl -X PATCH localhost:3000/posts/999/publish  # should 404
```

## What's new in this drill

- JOIN queries (posts + users together)
- Nested route: /users/:userId/posts
- Checking FK existence before insert (404 on bad user_id)
- Dedicated action endpoint (PATCH /publish — no body)
- Two tables in one API
