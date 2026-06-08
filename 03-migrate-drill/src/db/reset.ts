import pool from './pool';

async function reset() {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS products');
    console.log('✅ Reset complete — run migrate + seed again');
  } finally {
    client.release();
    await pool.end();
  }
}

reset();
