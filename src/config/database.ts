import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const db = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'clean_arch_db'
});

// Helper functions
const MIGRATION_PATH = path.join(__dirname, '../database/migration');
const SEEDER_PATH = path.join(__dirname, '../database/seeder');

const getSqlFiles = (dir: string): string[] =>
    fs.existsSync(dir)
        ? fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort()
        : [];

const extractTableName = (filename: string): string => {
    // Match filenames like `004_pelatihan_migration.sql`.
    // Capture the full table name between the leading number and the final suffix
    // (either `_migration.sql` or `_seeder.sql`).
    const match = filename.match(/^\d+_(.+?)_(?:migration|seeder)\.sql$/);
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
    const sql = fs.readFileSync(filePath, 'utf-8');
    await client.query(sql);
};

// Main migration function
const runMigrations = async () => {
    console.log('🔄 Running migrations and seeders...');
    const migrationFiles = getSqlFiles(MIGRATION_PATH);
    const seederFiles = getSqlFiles(SEEDER_PATH);

    for (const file of migrationFiles) {
        const table = extractTableName(file);
        if (!table) continue;

        const filePath = path.join(MIGRATION_PATH, file);
        const sql = fs.readFileSync(filePath, 'utf-8');
        console.log(`-- Executing migration file: ${file}`);
        console.log(sql.split('\n').slice(0,5).join('\n'));
        try {
            await db.query(sql);
            console.log(`✅ Migrated: ${file}`);
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            console.error(`❌ Error running migration ${file}:`, msg);
            throw err;
        }
    }

    for (const file of seederFiles) {
        const table = extractTableName(file);
        if (!table) continue;

        // Always truncate and seed to ensure data consistency
        await db.query(`TRUNCATE TABLE ${table} CASCADE;`);
        // Reset sequence to start from 1 (only for SERIAL columns)
        await db.query(`ALTER SEQUENCE IF EXISTS ${table}_id_seq RESTART WITH 1;`);
        await runSqlFile(db, path.join(SEEDER_PATH, file));
        // Synchronize sequence to max id after seeding (only for integer SERIAL columns)
        const seqExists = await db.query(`SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = '${table}_id_seq';`);
        if (seqExists.rows.length > 0) {
            await db.query(`SELECT setval('${table}_id_seq', (SELECT COALESCE(MAX(id), 1) FROM ${table}));`);
        }
        console.log(`🌱 Seeded: ${file}`);
    }

    console.log('✅ Migration & seeding complete.');
};

// Connect and migrate
db.connect()
    .then(async () => {
        console.log('📦 Connected to PostgreSQL');
        await runMigrations(); // << jalankan migrasi otomatis
    })
    .catch((err) => {
        console.error('❌ DB connection failed:', err.stack);
    });