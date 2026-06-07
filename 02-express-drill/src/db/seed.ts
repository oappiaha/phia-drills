import pool from './pool';

// Already done for you — focus on the routes in this drill
async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('TRUNCATE orders RESTART IDENTITY');
    const rows = [
      ['Alice', 120.00, 'pending'],
      ['Bob',   340.50, 'shipped'],
      ['Alice', 89.99,  'delivered'],
      ['Carol', 210.00, 'pending'],
      ['Bob',   55.00,  'delivered'],
    ];
    for (const [customer, total, status] of rows) {
      await client.query(
        'INSERT INTO orders (customer, total, status) VALUES ($1, $2, $3)',
        [customer, total, status]
      );
    }
    await client.query('COMMIT');
    console.log('✅ Seed complete');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
