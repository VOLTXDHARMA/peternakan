(async () => {
  const base = 'http://localhost:3000';
  try {
    // Register a test user and then login to obtain token
    const username = 'auto_ternak_' + Date.now();
    const email = username + '@example.com';
    const password = 'TestPass1234';
    let r = await fetch(base + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, nomor_hp: '0812' + Math.floor(Math.random() * 100000000) })
    });
    const reg = await r.json();
    if (!reg.data || !reg.data.id) {
      console.error('Register failed', r.status, reg);
      process.exit(1);
    }
    r = await fetch(base + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const login = await r.json();
    console.log('login status', r.status, login.message || login);
    const token = (login.data && (login.data.token || login.data.accessToken || login.data.access_token)) || null;
    if (!token) {
      console.error('No token, abort');
      process.exit(1);
    }

    const payload = {
      user_id: reg.data.id,
      kode_ternak: 'kode' + Date.now().toString().slice(-5),
      jenis_ternak: 'sapi',
      ras: 'local',
      jenis_kelamin: 'jantan',
      tanggal_lahir: '2025-09-16',
      umur_bulan: 3,
      berat_awal: 7,
      berat_sekarang: 20,
      kondisi: 'sehat',
      harga_beli: 2000000,
      foto_ternak: 'string',
      status: 'aktif'
    };

    r = await fetch(base + '/api/ternak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(payload)
    });
    const body = await r.text();
    console.log('POST /api/ternak status', r.status);
    console.log('body:', body);
  } catch (e) {
    console.error('ERR', e);
    process.exit(1);
  }
})();
