const { Client } = require('pg');
(async () => {
  const c = new Client({ host: 'localhost', port: 5432, user: 'postgres', password: '123', database: 'peternakan' });
  try {
    await c.connect();
    const res = await c.query("SELECT conname, pg_get_constraintdef(oid) as def FROM pg_constraint WHERE conrelid = 'public.users'::regclass AND contype='c'");
    console.log('check constraints for users:');
    console.table(res.rows);
    const enumRes = await c.query("SELECT typname, enumlabel FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' ORDER BY e.enumsortorder");
    console.log('user_role enum values:');
    console.table(enumRes.rows);
    await c.end();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
