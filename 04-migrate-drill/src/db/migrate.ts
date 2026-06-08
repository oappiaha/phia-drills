import pool from './pool';

// DRILL 4: Two tables with a foreign key relationship.
//
// Table 1: "users"
//   - id         → auto-incrementing primary key
//   - email      → required, unique
//   - name       → required string
//   - created_at → timestamp, auto-set on insert
//
// Table 2: "posts"
//   - id         → auto-incrementing primary key
//   - user_id    → integer, NOT NULL, references users(id) ON DELETE CASCADE
//   - title      → required string
//   - body       → TEXT (can be null — drafts exist)
//   - published  → boolean, default false
//   - created_at → timestamp, auto-set on insert
//
// Indexes to add:
//   - index on posts(user_id)    — we'll look up posts by user constantly
//   - index on posts(published)  — filter published vs drafts
//
// Important: create users BEFORE posts (foreign key dependency).
// Use CREATE TABLE IF NOT EXISTS and CREATE INDEX IF NOT EXISTS.
// Always client.release() in finally.

async function migrate() {
  const client = await pool.connect();
  try {
    // YOUR CODE HERE

    console.log('✅ Migration complete');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
