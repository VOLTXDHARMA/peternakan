const { Client } = require('pg');
(async () => {
  const c = new Client({ host: 'localhost', port: 5432, user: 'postgres', password: '123', database: 'peternakan' });
  try {
    await c.connect();
    const queries = [
      `ALTER TABLE users RENAME COLUMN create_at TO created_at;`,
      `ALTER TABLE users RENAME COLUMN update_at TO updated_at;`,
      `ALTER TABLE ternak RENAME COLUMN create_at TO created_at;`,
      `ALTER TABLE ternak RENAME COLUMN update_at TO updated_at;`,
      `ALTER TABLE umkm RENAME COLUMN create_at TO created_at;`,
      `ALTER TABLE umkm RENAME COLUMN update_at TO updated_at;`,
      `ALTER TABLE pelatihan RENAME COLUMN create_at TO created_at;`,
      `ALTER TABLE pelatihan RENAME COLUMN update_at TO updated_at;`,
      `ALTER TABLE materi_pelatihan RENAME COLUMN create_at TO created_at;`,
      `ALTER TABLE materi_pelatihan RENAME COLUMN update_at TO updated_at;`
    ];
    for (const q of queries) {
      try {
        await c.query(q);
        console.log('OK:', q);
      } catch (e) {
        console.log('SKIP/ERR:', q, e.message);
      }
    }
    await c.end();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
