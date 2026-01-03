const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'peternakan'
});

async function verifyFix() {
    try {
        await client.connect();
        console.log('🔍 Verifying database fix...\n');

        // Check pelatihan data
        console.log('📚 Checking pelatihan data:');
        const pelatihanRes = await client.query('SELECT id, judul_pelatihan FROM pelatihan ORDER BY id');
        pelatihanRes.rows.forEach(row => {
            console.log(`  ID ${row.id}: ${row.judul_pelatihan}`);
        });

        // Check materi_pelatihan data
        console.log('\n📖 Checking materi_pelatihan data:');
        const materiRes = await client.query(`
            SELECT mp.id, mp.pelatihan_id, mp.judul_materi, p.judul_pelatihan
            FROM materi_pelatihan mp
            JOIN pelatihan p ON mp.pelatihan_id = p.id
            ORDER BY mp.pelatihan_id, mp.urutan
        `);
        materiRes.rows.forEach(row => {
            console.log(`  Materi ID ${row.id}: pelatihan_id=${row.pelatihan_id} (${row.judul_pelatihan}) - ${row.judul_materi}`);
        });

        // Check dokumen_pembiayaan data
        console.log('\n📄 Checking dokumen_pembiayaan data:');
        const dokumenRes = await client.query(`
            SELECT dp.id, dp.pembiayaan_id, dp.jenis_dokumentasi, pb.nomor_pembiayaan
            FROM dokumen_pembiayaan dp
            JOIN pembiayaan pb ON dp.pembiayaan_id = pb.id
            ORDER BY dp.pembiayaan_id
        `);
        dokumenRes.rows.forEach(row => {
            console.log(`  Dokumen ID ${row.id}: pembiayaan_id=${row.pembiayaan_id} (${row.nomor_pembiayaan}) - ${row.jenis_dokumentasi}`);
        });

        // Verify foreign key constraints
        console.log('\n🔗 Verifying foreign key constraints:');
        const fkCheck = await client.query(`
            SELECT
                COUNT(*) as total_materi,
                COUNT(CASE WHEN p.id IS NOT NULL THEN 1 END) as valid_fk
            FROM materi_pelatihan mp
            LEFT JOIN pelatihan p ON mp.pelatihan_id = p.id
        `);
        console.log(`  Materi pelatihan: ${fkCheck.rows[0].valid_fk}/${fkCheck.rows[0].total_materi} valid FK`);

        const fkCheck2 = await client.query(`
            SELECT
                COUNT(*) as total_dokumen,
                COUNT(CASE WHEN pb.id IS NOT NULL THEN 1 END) as valid_fk
            FROM dokumen_pembiayaan dp
            LEFT JOIN pembiayaan pb ON dp.pembiayaan_id = pb.id
        `);
        console.log(`  Dokumen pembiayaan: ${fkCheck2.rows[0].valid_fk}/${fkCheck2.rows[0].total_dokumen} valid FK`);

        console.log('\n✅ Database verification complete!');

    } catch (err) {
        console.error('❌ Verification failed:', err);
    } finally {
        await client.end();
    }
}

verifyFix();
