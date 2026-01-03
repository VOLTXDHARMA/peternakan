const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'peternakan'
});

async function checkPelatihan() {
    try {
        await client.connect();
        console.log('Connected to DB');

        const res = await client.query('SELECT id, judul_pelatihan FROM pelatihan ORDER BY id');
        console.log('Pelatihan data:');
        res.rows.forEach(row => {
            console.log(`${row.id}: ${row.judul_pelatihan}`);
        });
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

checkPelatihan();
