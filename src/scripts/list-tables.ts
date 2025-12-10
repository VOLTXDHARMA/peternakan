import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'clean_arch_db',
});

const main = async () => {
  try {
    await client.connect();
    const res = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log('Tables in public schema:');
    for (const row of res.rows) {
      console.log('- ' + row.table_name);
    }
  } catch (err) {
    console.error('Error listing tables:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
};

main();
