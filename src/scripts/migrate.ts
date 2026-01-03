import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || 'postgres';
const DB_NAME = process.env.DB_NAME || 'clean_arch_db';

const MIGRATION_PATH = join(__dirname, '../database/migration');
const SEEDER_PATH = join(__dirname, '../database/seeder');

const getSqlFiles = (dir: string): string[] =>
    existsSync(dir)
        ? readdirSync(dir).filter((f: string) => f.endsWith('.sql')).sort()
        : [];

const extractTableName = (filename: string): string => {
    const match = filename.match(/^\d+_(.+?)_(migration|seeder)\.sql$/);
    return match ? match[1] : '';
};

const tableExists = async (client: Client, table: string): Promise<boolean> => {
    const res = await client.query(`SELECT to_regclass('public.${table}') AS exists`);
    return res.rows[0].exists !== null;
};

const isTableEmpty = async (client: Client, table: string): Promise<boolean> => {
    const res = await client.query(`SELECT COUNT(*) FROM ${table}`);
    return parseInt(res.rows[0].count, 10) === 0;
};

const runSqlFile = async (client: Client, filePath: string) => {
    const sql = readFileSync(filePath, 'utf-8');
    await client.query(sql);
};

const runMigrations = async (client: Client) => {
    console.log('🔄 Running migrations and seeders...');
    const migrationFiles = getSqlFiles(MIGRATION_PATH);
    const seederFiles = getSqlFiles(SEEDER_PATH);

    for (const file of migrationFiles) {
        const table = extractTableName(file);
        if (!table) continue;

        const exists = await tableExists(client, table);
        if (exists) {
            console.log(`✓ Skipping migration ${file} (table '${table}' already exists)`);
        } else {
            await runSqlFile(client, join(MIGRATION_PATH, file));
            console.log(`✅ Migrated: ${file}`);
        }
    }

    for (const file of seederFiles) {
        const table = extractTableName(file);
        if (!table) continue;

        const exists = await tableExists(client, table);
        if (!exists) {
            console.log(`⚠ Table '${table}' not found for seeder ${file}, skipping`);
            continue;
        }

        const empty = await isTableEmpty(client, table);
        if (!empty) {
            console.log(`✓ Skipping seeder ${file} (table '${table}' has data)`);
        } else {
            await runSqlFile(client, join(SEEDER_PATH, file));
            console.log(`🌱 Seeded: ${file}`);
        }
    }

    console.log('✅ Migration & seeding complete.');
};

const main = async () => {
    const client = new Client({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME
    });

    try {
        await client.connect();
        console.log('📦 Connected to PostgreSQL');
        await runMigrations(client);
    } catch (err) {
        console.error('❌ DB migration failed:', err);
        process.exitCode = 1;
    } finally {
        await client.end();
    }
};

main();
