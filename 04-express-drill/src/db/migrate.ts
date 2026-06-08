import pool from './pool';

// Already done for you — focus on the routes
async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id         SERIAL PRIMARY KEY,
        email      VARCHAR(255) NOT NULL UNIQUE,
        name       VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title      VARCHAR(255) NOT NULL,
        body       TEXT,
        published  BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published)`);
    console.log('✅ Migration complete');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
