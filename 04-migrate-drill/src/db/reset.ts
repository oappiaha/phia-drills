import pool from './pool';

async function reset() {
  const client = await pool.connect();
  try {
    // Drop in reverse dependency order
    await client.query('DROP TABLE IF EXISTS posts');
    await client.query('DROP TABLE IF EXISTS users');
    console.log('✅ Reset complete — run migrate + seed again');
  } finally {
    client.release();
    await pool.end();
  }
}

reset();
