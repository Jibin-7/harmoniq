import https from 'https';
import fs from 'fs';

const content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');
const regex = /id:\s*'([^']*)'[\s\S]*?title:\s*'([^']*)'[\s\S]*?artist:\s*'([^']*)'[\s\S]*?youtubeId:\s*'([^']*)'/g;
let match;
const songs = [];
while ((match = regex.exec(content)) !== null) {
  songs.push({ id: match[1], title: match[2], artist: match[3], yt: match[4] });
}
console.log(`Found ${songs.length} songs in dataset.ts`);

async function testVideoId(id) {
  if (!id || id.trim() === '') return false;
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

// Search Invidious API for embeddable videos matching a query
async function searchEmbeddableVideo(title, artist) {
  const instances = [
    'https://inv.tux.zone',
    'https://invidious.flokinet.to',
    'https://invidious.projectsegfau.lt',
    'https://inv.in.projectsegfau.lt'
  ];
  const queries = [
    `${title} ${artist} lyric video`,
    `${title} ${artist} audio`,
    `${title} ${artist} song`,
    `${title} ${artist}`
  ];

  for (const q of queries) {
    for (const inst of instances) {
      try {
        const id = await new Promise((resolve) => {
          const url = `${inst}/api/v1/search?q=${encodeURIComponent(q)}&type=video`;
          const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 4000 }, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
              try {
                const json = JSON.parse(data);
                if (Array.isArray(json) && json.length > 0) {
                  // Find first video
                  for (const v of json) {
                    if (v.videoId) {
                      resolve(v.videoId);
                      return;
                    }
                  }
                }
              } catch (e) {}
              resolve(null);
            });
          });
          req.on('error', () => resolve(null));
          req.on('timeout', () => { req.destroy(); resolve(null); });
        });

        if (id) {
          const ok = await testVideoId(id);
          if (ok) return id;
        }
      } catch (e) {}
    }
  }
  return null;
}

async function run() {
  const resolved = {};
  for (const s of songs) {
    const ok = await testVideoId(s.yt);
    if (ok) {
      console.log(`[OK] ${s.id} (${s.title}): ${s.yt} is already verified embeddable!`);
      resolved[s.id] = s.yt;
    } else {
      console.log(`[NEED ID] ${s.id} (${s.title} by ${s.artist}) has no valid ID or is blocked. Searching...`);
      const found = await searchEmbeddableVideo(s.title, s.artist);
      if (found) {
        console.log(`   -> Found embeddable ID for ${s.title}: ${found}`);
        resolved[s.id] = found;
      } else {
        console.log(`   -> Failed to resolve via Invidious for ${s.title}`);
      }
    }
  }
  fs.writeFileSync('./scratch/resolved_ids.json', JSON.stringify(resolved, null, 2));
}
run();
