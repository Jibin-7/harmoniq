import https from 'https';
import fs from 'fs';

const content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');
const regex = /id:\s*'([^']+)',\s*title:\s*'([^']+)',[\s\S]*?audioUrl:\s*'([^']+)'/g;
let match;
const songs = [];
while ((match = regex.exec(content)) !== null) {
  songs.push({ id: match[1], title: match[2], url: match[3] });
}

async function checkUrl(song) {
  return new Promise((resolve) => {
    https.get(song.url, (res) => {
      resolve({ ...song, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ ...song, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log(`Checking ${songs.length} URLs...`);
  for (const s of songs) {
    const res = await checkUrl(s);
    if (res.status !== 200 && res.status !== 206) {
      console.log(`❌ [${res.id}] "${res.title}" -> Status: ${res.status}`);
    } else {
      console.log(`✅ [${res.id}] "${res.title}" -> Status: ${res.status}`);
    }
  }
}
run();
