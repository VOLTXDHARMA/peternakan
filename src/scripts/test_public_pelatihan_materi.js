const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
(async () => {
  try {
    // 1. GET /pelatihan
    let r = await fetch('http://localhost:3000/public/pelatihan');
    let body = await r.text();
    console.log('GET /public/pelatihan', r.status, body);

    // 2. POST /pelatihan (gunakan nilai enum yang valid)
    r = await fetch('http://localhost:3000/public/pelatihan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        judul_pelatihan: 'Test Pelatihan',
        deskripsi: 'Deskripsi test',
        kategori: 'manajemen_kandang',
        tingkat_kesulitan: 'pemula',
        durasi_menit: 60
      })
    });
    body = await r.text();
    console.log('POST /public/pelatihan', r.status, body);

    // 3. GET /materi_pelatihan
    r = await fetch('http://localhost:3000/public/materi_pelatihan');
    body = await r.text();
    console.log('GET /public/materi_pelatihan', r.status, body);

    // 4. POST /materi_pelatihan - gunakan pelatihan_id dari daftar pelatihan yang didapat
    const pelatihanJson = JSON.parse((await (await fetch('http://localhost:3000/public/pelatihan')).text()));
    const pelId = pelatihanJson && pelatihanJson.data && pelatihanJson.data[0] ? pelatihanJson.data[0].id : null;
    // determine next urutan to avoid unique constraint
    const materiListRes = await fetch('http://localhost:3000/public/materi_pelatihan/pelatihan/' + pelId);
    const materiListBody = await materiListRes.text();
    const materiListJson = JSON.parse(materiListBody);
    const nextUrutan = (materiListJson && materiListJson.data ? materiListJson.data.length : 0) + 1;

    r = await fetch('http://localhost:3000/public/materi_pelatihan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pelatihan_id: pelId,
        urutan: nextUrutan,
        judul_materi: 'Materi Test',
        tipe_konten: 'video',
        deskripsi: 'Isi materi test'
      })
    });
    body = await r.text();
    console.log('POST /public/materi_pelatihan', r.status, body);
  } catch (e) {
    console.error('ERR', e);
    process.exit(1);
  }
})();
