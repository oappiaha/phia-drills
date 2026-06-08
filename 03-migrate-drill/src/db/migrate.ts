import pool from './pool';

// DRILL 3: Write a migration for a "products" table.
//
// The products table needs:
//   - id          → auto-incrementing primary key
//   - name        → required string (unique — no duplicate product names)
//   - price       → required decimal (money — not float!)
//   - stock       → required integer, default 0
//   - category    → required string (e.g. "bags", "accessories", "apparel")
//   - active      → boolean, default true
//   - created_at  → timestamp, auto-set on insert
//
// Then add:
//   - an index on category
//   - an index on active
//   - a composite index on (category, price) for filtered + sorted browsing
//
// Use CREATE TABLE IF NOT EXISTS and CREATE INDEX IF NOT EXISTS.
// Always client.release() in a finally block.

async function migrate() {
  const client = await pool.connect();
  try {
    // YOUR CODE HERE

    console.log('✅ Migration complete');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
