import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || '123';
const DB_NAME = process.env.DB_NAME || 'peternakan';

const main = async () => {
    const client = new Client({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS,
        database: 'postgres'
    });

    try {
        await client.connect();
        console.log('Connected to postgres server');

        // Terminate connections to allow drop
        await client.query(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid();`, [DB_NAME]);
        console.log(`Terminated connections to database ${DB_NAME}`);

        await client.query(`DROP DATABASE IF EXISTS ${DB_NAME};`);
        console.log(`Dropped database ${DB_NAME}`);

        await client.query(`CREATE DATABASE ${DB_NAME};`);
        console.log(`Created database ${DB_NAME}`);
    } catch (err) {
        console.error('Error in reset-db:', err);
        process.exitCode = 1;
    } finally {
        await client.end();
    }
};

main();
