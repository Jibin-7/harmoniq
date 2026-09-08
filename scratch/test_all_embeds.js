import https from 'https';
import fs from 'fs';

const content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');
const regex = /id:\s*'([^']*)'[\s\S]*?title:\s*'([^']*)'[\s\S]*?artist:\s*'([^']*)'[\s\S]*?youtubeId:\s*'([^']*)'/g;
let match;
const songs = [];
while ((match = regex.exec(content)) !== null) {
  if (match[4] && match[4] !== '') {
    songs.push({ id: match[1], title: match[2], artist: match[3], yt: match[4] });
  }
}

async function testVideoId(id) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function run() {
  const badIds = [];
  for (const s of songs) {
    const ok = await testVideoId(s.yt);
    console.log(`${s.id} (${s.title}): ${s.yt} -> ${ok ? 'OK' : 'BLOCKED'}`);
    if (!ok) badIds.push(s.id);
  }
  console.log('Total Blocked:', badIds.length, badIds);
}
run();
