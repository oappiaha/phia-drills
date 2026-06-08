import pool from './pool';

// DRILL 5 — TIMED BLANK
//
// No hints. No column list. Just the spec:
//
// Build a "inventory" system with two tables:
//
//   "warehouses"
//     - id, name (unique), location, created_at
//
//   "inventory_items"
//     - id, warehouse_id (FK → warehouses, cascade delete)
//     - sku (string, unique)
//     - quantity (integer, default 0)
//     - unit_cost (decimal, money)
//     - created_at
//
// Add indexes where a real app would need them.
// You decide which columns get indexed — think about query patterns.
//
// Time yourself. Goal: under 8 minutes from blank to `npm run migrate` passing.

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
