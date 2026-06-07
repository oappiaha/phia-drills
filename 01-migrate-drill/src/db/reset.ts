import pool from './pool';

// Utility — run this to wipe the table and start fresh
async function reset() {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS orders');
    console.log('✅ Reset complete — run migrate + seed again');
  } finally {
    client.release();
    await pool.end();
  }
}

reset();
