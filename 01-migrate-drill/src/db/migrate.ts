import pool from './pool';

// DRILL 1: Write a migration that creates an "orders" table.
//
// The orders table needs:
//   - id         → auto-incrementing primary key
//   - customer   → required string
//   - total      → required decimal (money — not float!)
//   - status     → required string (e.g. "pending", "shipped", "delivered")
//   - created_at → timestamp, auto-set on insert
//
// Then add:
//   - an index on status  (we'll filter orders by status constantly)
//   - an index on (status, total) composite  (for filtered + sorted queries)
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
