import https from 'https';
import fs from 'fs';

const content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');

// Extract all 50 songs cleanly without JSON.parse errors
const songMatches = [];
const regex = /id:\s*'([^']*)'[\s\S]*?title:\s*("[^"]*"|'[^']*')[\s\S]*?artist:\s*("[^"]*"|'[^']*')[\s\S]*?youtubeId:\s*'([^']*)'/g;
let m;
while ((m = regex.exec(content)) !== null) {
  const id = m[1];
  const title = m[2].slice(1, -1);
  const artist = m[3].slice(1, -1);
  const yt = m[4];
  songMatches.push({ id, title, artist, yt });
}
console.log(`Successfully extracted ${songMatches.length} songs from dataset.ts!`);

async function testVideoId(id) {
  if (!id || id.trim() === '') return false;
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

// Scrape YouTube search results page to find embeddable video IDs
async function searchYouTubeScrape(query) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', async () => {
        try {
          const idMatches = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/g);
          if (idMatches) {
            const uniqueIds = [...new Set(idMatches.map(str => str.split('":"')[1].replace('"', '')))];
            for (const vid of uniqueIds.slice(0, 8)) {
              const ok = await testVideoId(vid);
              if (ok) {
                resolve(vid);
                return;
              }
            }
          }
        } catch (e) {}
        resolve(null);
      });
    });
    req.on('error', () => resolve(null));
  });
}

async function run() {
  let updatedContent = content;
  let fixedCount = 0;

  for (const s of songMatches) {
    const ok = await testVideoId(s.yt);
    if (ok) {
      console.log(`[OK] ${s.id} (${s.title}): ${s.yt} is already verified embeddable!`);
    } else {
      console.log(`[RESOLVING] ${s.id} (${s.title} by ${s.artist}) has empty/blocked ID '${s.yt}'. Searching YouTube...`);
      let foundId = await searchYouTubeScrape(`${s.title} ${s.artist} lyric video`);
      if (!foundId) foundId = await searchYouTubeScrape(`${s.title} ${s.artist} audio`);
      if (!foundId) foundId = await searchYouTubeScrape(`${s.title} ${s.artist}`);

      if (foundId) {
        console.log(`   -> [SUCCESS] Found 100% verified embeddable ID for ${s.title}: ${foundId}`);
        const songBlockRegex = new RegExp(`(id:\\s*'${s.id}'[\\s\\S]*?youtubeId:\\s*)'[^']*'`, 'g');
        updatedContent = updatedContent.replace(songBlockRegex, `$1'${foundId}'`);
        fixedCount++;
      } else {
        console.log(`   -> [FAIL] Could not resolve embeddable ID for ${s.title}`);
      }
    }
  }

  fs.writeFileSync('./src/engine/dataset.ts', updatedContent, 'utf8');
  console.log(`\nSuccessfully resolved and injected ${fixedCount} new verified embeddable video IDs into dataset.ts!`);
}
run();
