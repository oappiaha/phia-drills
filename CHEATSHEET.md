# API Scaffolding Cheat Sheet
## Skeleton → Real Logic, in tiers

The goal: get *something running* first. Then layer in real logic.
An interviewer who sees a 200 response in minute 3 is a relaxed interviewer.

---

## Step 0 — Environment check (before writing any code)

Do this the moment you sit down. Nothing works if Postgres isn't running.

```bash
# 1. Start Postgres
docker-compose up -d

# 2. Install dependencies
npm install

# 3. Copy env if not already done
cp .env.example .env

# 4. Run migrations + seed
npm run migrate
npm run seed
```

If you skip this and go straight to code, you'll hit this error when you first curl:

```
AggregateError: connect ECONNREFUSED 127.0.0.1:5432
```

That means Postgres isn't running. `docker-compose up -d` fixes it every time.

**Checklist before touching routes:**
- [ ] `docker-compose up -d` ran without errors
- [ ] `npm run migrate` passed (✅ Migration complete)
- [ ] `npm run seed` passed (✅ Seed complete)
- [ ] `.env` exists with `DATABASE_URL`

---

## Tier 0 — Server alive (60 seconds)

Do this first. Always. Before you touch the database.

```ts
// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(3000, () => console.log('🚀 on port 3000'));
```

```bash
npm run dev
curl localhost:3000/health   # → { "status": "ok" }
```

✅ Server is alive. Now the interviewer knows you can drive.

---

## Tier 1 — Router wired, hardcoded response

Wire the router. Return hardcoded data. No DB yet.

```ts
// src/routes/orders.ts
import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => {
  res.json([{ id: 1, customer: 'test', total: 99.99, status: 'pending' }]);
});

export default router;
```

```ts
// src/index.ts  — add this line
import ordersRouter from './routes/orders';
app.use('/orders', ordersRouter);
```

```bash
curl localhost:3000/orders   # → hardcoded array
```

✅ Route exists and returns the right shape. DB comes next.

---

## Tier 2 — Pool connected, real GET

Swap hardcoded data for a real query.

```ts
// src/db/pool.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export default pool;
```

```ts
// GET / — real query
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

```bash
curl localhost:3000/orders   # → real rows from DB
```

✅ One real route working. Pattern is now proven. Apply it to the others.

---

## Tier 3 — All reads done (GET all + GET one)

```ts
// GET /:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

Pattern:
1. `pool.query(SQL, [params])`
2. check `result.rows.length === 0` → 404
3. else return `result.rows[0]`

---

## Tier 4 — Write with validation (POST)

```ts
// POST /
router.post('/', async (req, res) => {
  const { customer, total, status } = req.body;

  // Validate first
  if (!customer || total == null) {
    return res.status(400).json({ error: 'customer and total are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO orders (customer, total, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [customer, total, status ?? 'pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

Pattern:
1. Destructure body
2. Validate → 400 if missing
3. INSERT with RETURNING *
4. 201 with `result.rows[0]`

---

## Tier 5 — Delete with transaction

Use a transaction for DELETE (interviewer expects this).

```ts
// DELETE /:id
router.delete('/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      'DELETE FROM orders WHERE id = $1 RETURNING id',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Not found' });
    }
    await client.query('COMMIT');
    res.status(204).send();
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});
```

Pattern:
1. `pool.connect()` → client
2. BEGIN
3. DELETE RETURNING id
4. If no rows → ROLLBACK → 404
5. COMMIT → 204
6. ROLLBACK in catch
7. `client.release()` in **finally** — always

---

## Tier 6 — PATCH (dynamic SET clause)

The tricky one. Don't hardcode column names — build SET dynamically.

```ts
// PATCH /:id
router.patch('/:id', async (req, res) => {
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  // Build: SET customer = $1, total = $2 ... WHERE id = $N
  const fields = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');

  try {
    const result = await pool.query(
      `UPDATE orders SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

The key lines:
```ts
const fields = Object.keys(updates);
const values = Object.values(updates);
const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
// → "customer = $1, total = $2"
// id goes at the end: $3
[...values, req.params.id]
```

---

## Tier 7 — Query param filters

```ts
// GET / with ?status=pending
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM orders';
    const params: any[] = [];

    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

---

## Tier 8 — JOIN query

```ts
// GET /posts — with author info
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.name as author_name, u.email as author_email
      FROM posts p
      JOIN users u ON u.id = p.user_id
      WHERE p.published = true
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

---

## The Mental Stack (memorize this order)

```
1. Server alive           → health check returns 200
2. Router wired           → hardcoded response, right shape
3. Real GET all           → pool.query, real rows
4. Real GET one           → $1 param, 404 check
5. POST with validation   → 400 → INSERT → 201
6. DELETE with tx         → BEGIN/COMMIT/ROLLBACK, 404/204
7. PATCH dynamic SET      → Object.keys, $N builder
8. Query filters          → conditional WHERE
9. JOINs                  → SELECT p.*, u.name FROM posts p JOIN users u
```

---

## Status Code Quick Reference

| Situation | Code |
|-----------|------|
| Success, returns data | 200 |
| Created | 201 |
| Success, no body (delete) | 204 |
| Bad request / missing fields | 400 |
| Not found | 404 |
| Server error | 500 |

---

## Things interviewers always check

- ✅ `client.release()` in `finally` — not in try, not in catch. **finally**.
- ✅ ROLLBACK before 404 on delete (you did BEGIN, you have to exit cleanly)
- ✅ RETURNING * on INSERT/UPDATE so you can return the row
- ✅ Parameterized queries (`$1`, `$2`) — never string concatenation
- ✅ try/catch on every async handler
- ✅ 404 before returning data, not after
- ✅ Named route params: use `req` not `_req` when you need `req.params.id`
- ✅ Single row: return `result.rows[0]`, not `result.rows`
- ✅ Parameterized query: always pass the values array — `pool.query(SQL, [val])` not just `pool.query(SQL)`

---

## When something returns `{ error: "internal error" }`

Your catch block is hiding the real error. Add this temporarily:

```ts
} catch (err) {
  console.error(err)   // ← add this line
  res.status(500).json({ error: 'Internal server error' });
}
```

The terminal will print the actual error. Common ones:

| Error | Cause | Fix |
|-------|-------|-----|
| `ECONNREFUSED 127.0.0.1:5432` | Postgres not running | `docker-compose up -d` |
| `relation "orders" does not exist` | Migration not run | `npm run migrate` |
| `null value in column violates not-null` | Missing required field in INSERT | check your body validation |
| `syntax error at or near "$1"` | Forgot to pass values array | `pool.query(SQL, [val])` |
| `bind message has N parameter formats but M parameters` | Values array length doesn’t match `$N` count | count your `$1 $2...` vs array items |
