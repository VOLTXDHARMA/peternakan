const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'peternakan'
});

async function seedDokumenPembiayaan() {
    try {
        await client.connect();
        console.log('Connected to DB');

        // Truncate table first
        await client.query('TRUNCATE TABLE dokumen_pembiayaan RESTART IDENTITY CASCADE');
        console.log('Truncated dokumen_pembiayaan table');

        // Run the seeder
        const seederSQL = `
INSERT INTO dokumen_pembiayaan (
    pembiayaan_id, jenis_dokumentasi, url_file, status_verifikasi, catatan_verifikasi
) VALUES
-- Dokumen untuk pembiayaan pertama (ambil UUID dari pembiayaan dengan nomor_pembiayaan terkecil)
(
    (SELECT id FROM pembiayaan ORDER BY created_at LIMIT 1), 'ktp', 'uploads/dokumen/ktp_1.jpg', 'diterima', 'KTP valid dan sesuai'
),
(
    (SELECT id FROM pembiayaan ORDER BY created_at LIMIT 1), 'kk', 'uploads/dokumen/kk_1.jpg', 'diterima', 'Kartu Keluarga lengkap'
),
(
    (SELECT id FROM pembiayaan ORDER BY created_at LIMIT 1), 'surat_usaha', 'uploads/dokumen/surat_usaha_1.pdf', 'pending', NULL
),
(
    (SELECT id FROM pembiayaan ORDER BY created_at LIMIT 1), 'npwp', 'uploads/dokumen/npwp_1.jpg', 'ditolak', 'NPWP tidak terbaca dengan jelas'
),

-- Dokumen untuk pembiayaan kedua (ambil UUID dari pembiayaan kedua berdasarkan created_at)
(
    (SELECT id FROM pembiayaan ORDER BY created_at LIMIT 1 OFFSET 1), 'ktp', 'uploads/dokumen/ktp_2.jpg', 'diterima', 'KTP valid'
),
(
    (SELECT id FROM pembiayaan ORDER BY created_at LIMIT 1 OFFSET 1), 'rekening_koran', 'uploads/dokumen/rekening_2.pdf', 'pending', NULL
);
        `;

        await client.query(seederSQL);
        console.log('Seeded dokumen_pembiayaan table successfully');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

seedDokumenPembiayaan();
