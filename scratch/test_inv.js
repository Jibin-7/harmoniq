import https from 'https';

async function searchInv(query) {
  return new Promise((resolve) => {
    const url = `https://inv.tux.zone/api/v1/search?q=${encodeURIComponent(query + ' official audio')}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (Array.isArray(json) && json.length > 0) {
            resolve(json[0].videoId);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const vid = await searchInv('Taylor Swift Love Story');
  console.log('Video ID:', vid);
}
run();
