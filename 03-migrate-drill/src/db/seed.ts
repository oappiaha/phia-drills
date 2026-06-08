import pool from './pool';

// DRILL 3: Seed the products table with at least 6 rows.
//
// Requirements:
//   - At least 3 different categories
//   - Mix of active: true and active: false
//   - Vary the prices and stock levels
//   - Use a transaction: BEGIN → inserts → COMMIT
//   - If anything fails → ROLLBACK
//   - Always client.release() in finally
//   - Use RETURNING * and log the inserted rows

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
