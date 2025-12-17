import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

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

        const empty = await isTableEmpty(db, table);
        if (empty) {
            await runSqlFile(db, path.join(SEEDER_PATH, file));
            console.log(`🌱 Seeded: ${file}`);
        } else {
            console.log(`✓ Skipping seeder ${file} (table '${table}' is not empty)`);
        }
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