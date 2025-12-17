const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
(async () => {
  try {
    // 1. GET all
    let r = await fetch('http://localhost:3000/api/pembiayaan');
    let body = await r.text();
    console.log('GET /api/pembiayaan', r.status, body);

    // 2. POST create - buat user test baru via /api/auth/register untuk mendapatkan user_id valid
    const registerRes = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'test_pemb_' + Date.now(),
        email: 'test_pemb_' + Date.now() + '@example.com',
        password: 'TestPass1234',
        nomor_hp: '0812' + Math.floor(Math.random() * 100000000)
      })
    });
    const registerBody = await registerRes.text();
    let registerJson = {};
    try { registerJson = JSON.parse(registerBody); } catch (e) { }
    const userId = registerJson && registerJson.data ? registerJson.data.id : null;
    if (!userId) {
      console.error('Register response status:', registerRes.status);
      console.error('Register response body:', registerBody);
      throw new Error('Failed to register test user to obtain user_id');
    }
    r = await fetch('http://localhost:3000/api/pembiayaan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nomor_pembiayaan: 'PB-TEST-001',
        user_id: userId,
        tujuan_pembiayaan: 'beli_pakan',
        nominal_pengajuan: 1234567,
        jangka_waktu_bulan: 12,
        status_pengajuan: 'draf',
        tanggal_pengajuan: new Date().toISOString()
      })
    });
    body = await r.text();
    console.log('POST /api/pembiayaan', r.status, body);
    const created = JSON.parse(body).data;

    // 3. PUT update
    r = await fetch('http://localhost:3000/api/pembiayaan/' + created.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alasan_penolakan: 'Test update' })
    });
    body = await r.text();
    console.log('PUT /api/pembiayaan/:id', r.status, body);

    // 4. DELETE
    r = await fetch('http://localhost:3000/api/pembiayaan/' + created.id, {
      method: 'DELETE' });
    console.log('DELETE /api/pembiayaan/:id', r.status);
  } catch (e) {
    console.error('ERR', e);
    process.exit(1);
  }
})();
