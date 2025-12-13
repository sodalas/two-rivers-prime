import { Pool } from 'pg';
import { ENV } from './src/env.js';

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

async function main() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Postgres connected:', res.rows[0]);
    
    // Check tables
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables:', tables.rows.map(r => r.table_name));
    
    await pool.end();
  } catch (err) {
    console.error('Postgres error:', err);
    process.exit(1);
  }
}

main();
