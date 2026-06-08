import pool from './pool';

// DRILL 4: Seed users and posts.
//
// Requirements:
//   - Insert 3 users first
//   - Insert 5+ posts spread across those users
//   - Mix of published: true and published: false
//   - One post with a null body (it's a draft)
//   - All in ONE transaction: BEGIN → users → posts → COMMIT
//   - ROLLBACK in catch
//   - Use RETURNING id to get user ids, then use them for post inserts
//   - client.release() in finally

async function seed() {
  const client = await pool.connect();
  try {
    // YOUR CODE HERE
    // Hint: insert a user with RETURNING id, store the id, use it in post inserts

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
