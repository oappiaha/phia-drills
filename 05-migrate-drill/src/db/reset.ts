import pool from './pool';

async function reset() {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS inventory_items');
    await client.query('DROP TABLE IF EXISTS warehouses');
    console.log('✅ Reset complete');
  } finally {
    client.release();
    await pool.end();
  }
}

reset();
