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
    console.log('Connected to DB — dropping table `pengguna` if exists...');
    await client.query('DROP TABLE IF EXISTS pengguna CASCADE;');
    console.log('Dropped table `pengguna` (if it existed).');
  } catch (err) {
    console.error('Error dropping table pengguna:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
};

main();
