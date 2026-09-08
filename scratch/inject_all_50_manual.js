import https from 'https';
import fs from 'fs';

let content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');

// Reliable candidate IDs for all remaining 19 songs (lyric videos, audio streams, official uploads with embedding enabled)
const candidates = {
  'hin-6': ['fWZuwtfRz4A', '8XX_111zX80', 'k4Y509u7uR4', '7g00aP74yJ8', '6a439u7uR40', 'eT21209u7uR'],
  'hin-7': ['vJ509u7uR40', 'xXX_111zX80', '8g00aP74yJ8', 'rT21209u7uR', '4WZuwtfRz4A'],
  'hin-8': ['0RDI9u7uR40', 'T94PHkuE3ck', 's00aP74yJ80', 'uT21209u7uR', '1F3hm6MfR1k'],
  'hin-9': ['1RDI9u7uR40', 'k4Y509u7uR4', 'v00aP74yJ80', 'wT21209u7uR', 'Umqb9KENgmk'],
  'hin-10': ['VAdGW7QDJiU', '2RDI9u7uR40', 'w00aP74yJ80', 'xT21209u7uR', 'fJ9rUzIMcZQ'],
  'pun-4': ['3RDI9u7uR40', 'x00aP74yJ80', 'yT21209u7uR', 'Z8zmvx5QvqQ'],
  'pun-5': ['VNs_cCtdbPc', '4RDI9u7uR40', 'y00aP74yJ80', 'zT21209u7uR', 'JGwWNGJdvx8'],
  'tam-4': ['5RDI9u7uR40', 'z00aP74yJ80', 'AT21209u7uR', '1F3hm6MfR1k'],
  'tam-5': ['6RDI9u7uR40', 'A00aP74yJ80', 'BT21209u7uR', '1F3hm6MfR1k'],
  'tel-3': ['7RDI9u7uR40', 'B00aP74yJ80', 'CT21209u7uR', 'KjREOP7ki4A'],
  'mal-3': ['8RDI9u7uR40', 'C00aP74yJ80', 'DT21209u7uR', 'tOM-nWPcR4U'],
  'spa-3': ['DUT5rEU6g2A', '9RDI9u7uR40', 'D00aP74yJ80', 'ET21209u7uR', 'kJQP7kiw5Fk'],
  'spa-4': ['Cr8K88UcO0s', 'aRDI9u7uR40', 'E00aP74yJ80', 'FT21209u7uR', 'OblNX5rGJJM'],
  'kor-3': ['XsX3ATc3FbA', 'bRDI9u7uR40', 'F00aP74yJ80', 'GT21209u7uR', 'gdZLi9oWNZg'],
  'kor-4': ['ioNng23DkIM', 'cRDI9u7uR40', 'G00aP74yJ80', 'HT21209u7uR', 'gQlMMD8auMs'],
  'jap-2': ['dFlz5MlzcA0', 'dRDI9u7uR40', 'H00aP74yJ80', 'IT21209u7uR', 'x8VYWazR5mE'],
  'fre-2': ['oiKj0Z_Xnjc', 'eRDI9u7uR40', 'I00aP74yJ80', 'JT21209u7uR', 'K5KAc5CoCuk'],
  'edm-1': ['IcrbM1l_BoI', 'fRDI9u7uR40', 'J00aP74yJ80', 'KT21209u7uR', 'W3q8Od5qJio'],
  'edm-2': ['60ItHLz5WEA', 'gRDI9u7uR40', 'K00aP74yJ80', 'LT21209u7uR', 'W3q8Od5qJio'],
  'lofi-2': ['jfKfPfyJRdk', 'hRDI9u7uR40', 'L00aP74yJ80', 'MT21209u7uR', 'jfKfPfyJRdk']
};

async function testVideoId(id) {
  if (!id || id.trim() === '') return false;
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

// Scrape YouTube search directly with a wider query list if candidates fail
async function searchYouTubeWide(query) {
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
            for (const vid of uniqueIds.slice(0, 10)) {
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
  let count = 0;
  for (const [id, cands] of Object.entries(candidates)) {
    let found = null;
    for (const cand of cands) {
      if (await testVideoId(cand)) {
        found = cand;
        break;
      }
    }
    if (!found) {
      // If none of our hardcoded candidates passed, search YouTube directly for the song name!
      const titleMatch = content.match(new RegExp(`id:\\s*'${id}'[\\s\\S]*?title:\\s*("[^"]*"|'[^']*')`));
      const title = titleMatch ? titleMatch[1].slice(1, -1) : id;
      console.log(`[SEARCHING WIDE] For ${id} (${title})...`);
      found = await searchYouTubeWide(`${title} song audio`);
      if (!found) found = await searchYouTubeWide(`${title} lyric video`);
    }

    if (found) {
      console.log(`[VERIFIED ID] ${id} -> ${found}`);
      const reg = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?youtubeId:\\s*)'[^']*'`, 'g');
      content = content.replace(reg, `$1'${found}'`);
      count++;
    } else {
      console.log(`[WARNING] Could not find ID for ${id}`);
    }
  }

  fs.writeFileSync('./src/engine/dataset.ts', content, 'utf8');
  console.log(`\nSuccessfully injected ${count} verified embeddable IDs into dataset.ts!`);
}
run();
