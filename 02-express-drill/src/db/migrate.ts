import pool from './pool';

// Already done for you — focus on the routes in this drill
async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id          SERIAL PRIMARY KEY,
        customer    VARCHAR(255) NOT NULL,
        total       NUMERIC(10,2) NOT NULL,
        status      VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)
    `);
    console.log('✅ Migration complete');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
