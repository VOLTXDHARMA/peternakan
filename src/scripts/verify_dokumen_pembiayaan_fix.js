const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'peternakan'
});

async function verifyDokumenPembiayaanFix() {
    try {
        await client.connect();
        console.log('🔍 Verifying dokumen_pembiayaan fix...\n');

        // Check dokumen_pembiayaan data
        const dokumenRes = await client.query(`
            SELECT dp.id, dp.pembiayaan_id, p.nomor_pembiayaan, dp.jenis_dokumentasi, dp.status_verifikasi
            FROM dokumen_pembiayaan dp
            JOIN pembiayaan p ON dp.pembiayaan_id = p.id
            ORDER BY dp.id
        `);

        console.log('📋 Dokumen Pembiayaan Data:');
        console.log('Total records:', dokumenRes.rows.length);
        dokumenRes.rows.forEach((row, index) => {
            console.log(`${index + 1}. ID: ${row.id} | Pembiayaan: ${row.nomor_pembiayaan} | Jenis: ${row.jenis_dokumentasi} | Status: ${row.status_verifikasi}`);
        });

        // Check for foreign key violations
        const fkCheck = await client.query(`
            SELECT COUNT(*) as invalid_refs
            FROM dokumen_pembiayaan dp
            LEFT JOIN pembiayaan p ON dp.pembiayaan_id = p.nomor_pembiayaan
            WHERE p.nomor_pembiayaan IS NULL
        `);

        if (fkCheck.rows[0].invalid_refs === '0') {
            console.log('\n✅ Foreign Key Check: PASSED - All pembiayaan_id references are valid');
        } else {
            console.log(`\n❌ Foreign Key Check: FAILED - ${fkCheck.rows[0].invalid_refs} invalid references found`);
        }

        // Check data distribution
        const distribCheck = await client.query(`
            SELECT p.nomor_pembiayaan, COUNT(dp.id) as dokumen_count
            FROM pembiayaan p
            LEFT JOIN dokumen_pembiayaan dp ON p.nomor_pembiayaan = dp.pembiayaan_id
            GROUP BY p.id, p.nomor_pembiayaan
            ORDER BY p.nomor_pembiayaan
        `);

        console.log('\n📊 Dokumen Distribution per Pembiayaan:');
        distribCheck.rows.forEach(row => {
            console.log(`${row.nomor_pembiayaan}: ${row.dokumen_count} dokumen`);
        });

        console.log('\n🎉 Verification complete! Dokumen pembiayaan module is working correctly.');

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.end();
    }
}

verifyDokumenPembiayaanFix();
