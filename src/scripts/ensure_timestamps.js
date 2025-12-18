const { Client } = require('pg');
(async () => {
  const client = new Client({ host: 'localhost', port: 5432, user: 'postgres', password: '123', database: 'peternakan' });
  try {
    await client.connect();
    const tables = ['users','ternak','umkm','pelatihan','materi_pelatihan'];
    for (const t of tables) {
      console.log('Checking table', t);
      const cols = (await client.query("SELECT column_name FROM information_schema.columns WHERE table_name=$1", [t])).rows.map(r=>r.column_name);
      if (!cols.includes('created_at')) {
        console.log(`Adding created_at to ${t}`);
        await client.query(`ALTER TABLE ${t} ADD COLUMN created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()`);
      } else {
        // ensure default
        const def = (await client.query("SELECT column_default FROM information_schema.columns WHERE table_name=$1 AND column_name='created_at'", [t])).rows[0].column_default;
        if (!def) {
          console.log(`Setting default NOW() for ${t}.created_at`);
          await client.query(`ALTER TABLE ${t} ALTER COLUMN created_at SET DEFAULT NOW()`);
        }
      }

      if (!cols.includes('updated_at')) {
        console.log(`Adding updated_at to ${t}`);
        await client.query(`ALTER TABLE ${t} ADD COLUMN updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()`);
      } else {
        const def2 = (await client.query("SELECT column_default FROM information_schema.columns WHERE table_name=$1 AND column_name='updated_at'", [t])).rows[0].column_default;
        if (!def2) {
          console.log(`Setting default NOW() for ${t}.updated_at`);
          await client.query(`ALTER TABLE ${t} ALTER COLUMN updated_at SET DEFAULT NOW()`);
        }
      }

      // Fix nulls
      console.log(`Updating NULL timestamps in ${t} to NOW()`);
      await client.query(`UPDATE ${t} SET created_at = NOW() WHERE created_at IS NULL`);
      await client.query(`UPDATE ${t} SET updated_at = NOW() WHERE updated_at IS NULL`);
    }
    await client.end();
    console.log('Done ensuring timestamps');
  } catch (e) {
    console.error('ERROR', e.message || e);
    process.exit(1);
  }
})();
