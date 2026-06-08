import pool from './pool';

// Already done for you — focus on the routes
async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(255) NOT NULL UNIQUE,
        price      NUMERIC(10,2) NOT NULL,
        stock      INTEGER NOT NULL DEFAULT 0,
        category   VARCHAR(100) NOT NULL,
        active     BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_products_active ON products(active)`);
    console.log('✅ Migration complete');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
