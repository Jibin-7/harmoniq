import https from 'https';

async function testVideoId(id) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function run() {
  const ids = ['JGwWNGJdvx8', 'fJ9rUzIMcZQ', '4NRXx6U8ABQ'];
  for (const id of ids) {
    const ok = await testVideoId(id);
    console.log(`ID ${id}: ${ok ? 'EMBEDDABLE OK' : 'BLOCKED/FAIL'}`);
  }
}
run();
