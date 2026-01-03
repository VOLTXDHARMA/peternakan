const fetch = require('node-fetch');

async function testAPI() {
    try {
        // Login
        console.log('Logging in...');
        const loginRes = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@example.com',
                password: '123456'
            })
        });
        const loginData = await loginRes.json();
        console.log('Login response:', loginData);

        if (!loginData.data || !loginData.data.token) {
            console.error('Login failed');
            return;
        }

        const token = loginData.data.token;

        // Create dokumen pembiayaan
        console.log('Creating dokumen pembiayaan...');
        const createRes = await fetch('http://localhost:3000/api/dokumen_pembiayaan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                pembiayaan_id: 'PB-20251217001',
                jenis_dokumentasi: 'ktp',
                url_file: 'https://example.com/dokumen/ktp-test.jpg',
                status_verifikasi: 'pending',
                catatan_verifikasi: ''
            })
        });
        const createData = await createRes.json();
        console.log('Create response:', createData);

        if (createData.status === 'success') {
            console.log('✅ API test successful - data inserted without errors');
        } else {
            console.log('❌ API test failed:', createData.message);
        }

    } catch (error) {
        console.error('Test error:', error.message);
    }
}

testAPI();
