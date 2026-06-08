import pool from './pool';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`
      INSERT INTO products (name, price, stock, category, active) VALUES
        ('Leather Bellypack',  190.00, 12, 'bags',        true),
        ('Canvas Duffle',      150.00,  5, 'bags',        true),
        ('Bebe Bow Clutch',     90.00,  8, 'bags',        true),
        ('Stripe Toe Socks',    24.00, 50, 'accessories', true),
        ('Hooded Scarf',        85.00,  3, 'apparel',     true),
        ('Archive Tote',       220.00,  0, 'bags',        false)
      ON CONFLICT (name) DO NOTHING
    `);
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
