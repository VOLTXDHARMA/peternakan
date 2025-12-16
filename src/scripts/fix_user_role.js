const { Client } = require('pg');
(async () => {
  const client = new Client({ host: 'localhost', port: 5432, user: 'postgres', password: '123', database: 'peternakan' });
  try {
    await client.connect();
    await client.query('BEGIN');

    // 1) Create a backup table (name: users_backup_YYYYMMDD)
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const backupTable = `users_backup_${y}${m}${d}`;
    console.log('Creating backup table:', backupTable);
    await client.query(`CREATE TABLE IF NOT EXISTS ${backupTable} AS TABLE users`);

    // 2) Get allowed enum values for user_role
    const enumRes = await client.query("SELECT enumlabel FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' ORDER BY e.enumsortorder");
    const allowed = enumRes.rows.map(r => r.enumlabel);
    console.log('Allowed enum values:', allowed);

    // 3) Drop check constraint if exists FIRST (it may block updates)
    console.log('Dropping constraint users_role_check if exists');
    await client.query(`ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check`);

    // 4) Normalize invalid roles -> 'peternak'
    const invalidCondition = allowed.length ? `role NOT IN (${allowed.map((_,i)=>`$${i+1}`).join(',')})` : "role IS NULL";
    console.log('Updating invalid roles to peternak...');
    await client.query(`UPDATE users SET role = 'peternak' WHERE ${invalidCondition}`, allowed);
    const updated = (await client.query("SELECT COUNT(*)::int AS c FROM users WHERE role = 'peternak' ")).rows[0].c;
    console.log('Rows now with role=peternak:', updated);

    // 5) Drop any column default then Alter column type to user_role
    console.log('Dropping default for column role (if any)');
    await client.query(`ALTER TABLE users ALTER COLUMN role DROP DEFAULT`);
    console.log('Altering column type to user_role');
    await client.query(`ALTER TABLE users ALTER COLUMN role TYPE user_role USING role::user_role`);

    // 6) Set a safe default of 'peternak' for new rows
    console.log("Setting default role to 'peternak'");
    await client.query(`ALTER TABLE users ALTER COLUMN role SET DEFAULT 'peternak'::user_role`);

    await client.query('COMMIT');
    console.log('Done: role normalization and type change completed.');
    await client.end();
  } catch (err) {
    console.error('ERROR:', err.message || err);
    try { await client.query('ROLLBACK'); } catch(e){}
    process.exit(1);
  }
})();
