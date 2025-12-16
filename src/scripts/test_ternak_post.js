(async () => {
  const base = 'http://localhost:3000';
  try {
    // Login as seeded admin
    let r = await fetch(base + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'admin123' })
    });
    const login = await r.json();
    console.log('login status', r.status, login.message || login);
    if (!login.data || !login.data.token) {
      console.error('No token, abort');
      process.exit(1);
    }
    const token = login.data.token;

    const payload = {
      user_id: login.data.user.id,
      kode_ternak: 'kode' + Date.now().toString().slice(-5),
      jenis_ternak: 'kerbau',
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
