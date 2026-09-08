import https from 'https';
import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('scratch/real_urls.json', 'utf8'));

async function checkUrl(id, url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ id, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ id, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  for (const [id, url] of Object.entries(urls)) {
    if (!url) {
      console.log(`❌ ${id}: NO URL`);
      continue;
    }
    const res = await checkUrl(id, url);
    console.log(`${res.status === 200 || res.status === 206 ? '✅' : '❌'} [${id}] -> Status: ${res.status}`);
  }
}
run();
