const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'peternakan'
});

async function checkColumnType() {
    try {
        await client.connect();
        console.log('🔍 Checking column type for pembiayaan_id in dokumen_pembiayaan...\n');

        const res = await client.query(`
            SELECT column_name, data_type, udt_name
            FROM information_schema.columns
            WHERE table_name = 'dokumen_pembiayaan' AND column_name = 'pembiayaan_id'
        `);

        if (res.rows.length > 0) {
            const { column_name, data_type, udt_name } = res.rows[0];
            console.log(`Column: ${column_name}`);
            console.log(`Data Type: ${data_type}`);
            console.log(`UDT Name: ${udt_name}`);
        } else {
            console.log('Column not found');
        }

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.end();
    }
}

checkColumnType();
