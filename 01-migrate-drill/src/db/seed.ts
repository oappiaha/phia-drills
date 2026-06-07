import pool from './pool';

// DRILL 2: Seed the orders table with at least 5 rows.
//
// Requirements:
//   - At least 3 different customers
//   - At least 3 different statuses (pending, shipped, delivered)
//   - Use a transaction: BEGIN → inserts → COMMIT
//   - If anything fails → ROLLBACK
//   - Always client.release() in finally

async function seed() {
  const client = await pool.connect();
  try {
    // YOUR CODE HERE

    console.log('✅ Seed complete');
  } catch (err) {
    console.error('❌ Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
