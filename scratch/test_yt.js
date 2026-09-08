import https from 'https';

// Test searching for a youtube video ID using iTunes or Invidious or public APIs
async function searchYouTube(query) {
  return new Promise((resolve) => {
    // Invidious / Piped / iTunes search test
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=5`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const res = await searchYouTube('Taylor Swift Love Story');
  console.log('Found:', res.length);
  if (res.length > 0) {
    console.log(res[0].trackName, res[0].artistName, res[0].previewUrl);
  }
}
run();
