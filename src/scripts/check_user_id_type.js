const { Client } = require('pg');
const c = new Client({ host: 'localhost', port: 5432, user: 'postgres', password: '123', database: 'peternakan' });
(async () => {
  try {
    await c.connect();
    const res = await c.query("SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name='users' AND column_name='id'");
    console.log(res.rows);
    await c.end();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
