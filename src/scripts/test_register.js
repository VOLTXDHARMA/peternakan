(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'auto_reg_test3', email: 'auto_reg_test3@example.com', password: 'pass123', nomor_hp: '081234567899', role: 'zz' })
    });
    const body = await res.text();
    console.log('status', res.status);
    console.log('body', body);
  } catch (e) {
    console.error('Request failed:', e.message || e);
    process.exit(1);
  }
})();
