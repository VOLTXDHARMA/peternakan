const { Client } = require('pg');
(async () => {
  const c = new Client({ host: 'localhost', port: 5432, user: 'postgres', password: '123', database: 'peternakan' });
  try {
    await c.connect();
    const res = await c.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='ternak' ORDER BY ordinal_position");
    console.log('ternak table columns:');
    console.table(res.rows);
    await c.end();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
