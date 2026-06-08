import pool from './pool';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const u1 = await client.query(
      `INSERT INTO users (email, name) VALUES ('obed@rei.com', 'Obed') RETURNING id`
    );
    const u2 = await client.query(
      `INSERT INTO users (email, name) VALUES ('sydney@rei.com', 'Sydney') RETURNING id`
    );
    const u3 = await client.query(
      `INSERT INTO users (email, name) VALUES ('cienna@rei.com', 'Cienna') RETURNING id`
    );

    const [id1, id2, id3] = [u1.rows[0].id, u2.rows[0].id, u3.rows[0].id];

    await client.query(`
      INSERT INTO posts (user_id, title, body, published) VALUES
        ($1, 'Season 1 Vision',      'The opening collection is rooted in contrast.', true),
        ($1, 'Leather Sourcing',     null,                                             false),
        ($2, 'Shoot Concepts',       'Three looks. One location. Natural light.',      true),
        ($2, 'Editorial Draft',      'Still working on the narrative arc.',            false),
        ($3, 'Color Study Notes',    'Considering earth tones for the capsule.',       true)
    `, [id1, id2, id3]);

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
