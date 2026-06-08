import pool from './pool';

// DRILL 5 — TIMED BLANK
//
// No hints. Seed the warehouses + inventory_items tables.
//
// Requirements you define:
//   - At least 2 warehouses
//   - At least 4 inventory items spread across them
//   - One transaction, proper ROLLBACK in catch
//   - Use RETURNING id to chain warehouse → item inserts
//
// Time yourself. Goal: under 6 minutes.

async function seed() {
  const client = await pool.connect();
  try {
    // YOUR CODE HERE

    console.log('✅ Seed complete');
  } catch (err) {
    console.error('❌ Seed failed:', err);
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
