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

        const res = await client.query('SELECT 1 FROM pg_database WHERE datname=$1', [DB_NAME]);
        if (res.rowCount === 0) {
            console.log(`Database "${DB_NAME}" not found. Creating...`);
            await client.query(`CREATE DATABASE ${DB_NAME};`);
            console.log(`Database "${DB_NAME}" created.`);
        } else {
            console.log(`Database "${DB_NAME}" already exists.`);
        }
    } catch (err) {
        console.error('Error in setup-db:', err);
        process.exitCode = 1;
    } finally {
        await client.end();
    }
};

main();
