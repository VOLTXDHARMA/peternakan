import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'peternakan'
});

async function testDokumenPembiayaan() {
    try {
        await client.connect();
        console.log('🔍 Getting valid pembiayaan IDs for testing...\n');

        // Get pembiayaan data
        const pembiayaanRes = await client.query('SELECT id, nomor_pembiayaan FROM pembiayaan ORDER BY nomor_pembiayaan');
        console.log('📋 Valid Pembiayaan IDs:');
        pembiayaanRes.rows.forEach((row, index) => {
            console.log(`${index + 1}. ${row.nomor_pembiayaan} → UUID: ${row.id}`);
        });

        console.log('\n🛠️  Curl Commands for Testing:\n');

        console.log('1. Login to get JWT token:');
        console.log(`curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'`);

        console.log('\n2. Create Dokumen Pembiayaan:');
        console.log(`curl -X POST http://localhost:3000/api/dokumen_pembiayaan \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \\
  -d '{
    "pembiayaan_id": "${pembiayaanRes.rows[0].nomor_pembiayaan}",
    "jenis_dokumentasi": "ktp",
    "url_file": "uploads/dokumen/ktp_user1.pdf",
    "status_verifikasi": "pending",
    "catatan_verifikasi": "Dokumen KTP baru diunggah"
  }'`);

        console.log('\n3. Get All Dokumen Pembiayaan:');
        console.log(`curl -X GET http://localhost:3000/api/dokumen_pembiayaan \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"`);

        console.log('\n✅ Ready for testing! Use the UUID above for pembiayaan_id.');

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.end();
    }
}

testDokumenPembiayaan();
