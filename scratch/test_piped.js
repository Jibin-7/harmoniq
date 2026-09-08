import https from 'https';

const instances = [
  'https://pipedapi.kavin.rocks',
  'https://piped-api.garudalinux.org',
  'https://api.piped.privacydev.net',
  'https://pipedapi.in.projectsegfau.lt',
  'https://api.invidious.io/instances.json'
];

async function testInstance(base, query) {
  return new Promise((resolve) => {
    const url = `${base}/streams?q=${encodeURIComponent(query)}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (Array.isArray(json) && json.length > 0) {
            resolve({ base, id: json[0].url.replace('/watch?v=', '') });
          } else if (json.items && json.items.length > 0) {
            resolve({ base, id: json.items[0].url.replace('/watch?v=', '') });
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
  for (const inst of instances) {
    const res = await testInstance(inst, 'Taylor Swift Love Story official audio');
    console.log(inst, '->', res);
  }
}
run();
