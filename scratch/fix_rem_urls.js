import https from 'https';
import fs from 'fs';

function fetchItunes(query) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=1`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results[0].previewUrl);
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
  const rus = await fetchItunes('Tri Poloski');
  const por = await fetchItunes('Garota de Ipanema Astrud Gilberto');
  console.log('rus:', rus);
  console.log('por:', por);

  let content = fs.readFileSync('src/engine/dataset.ts', 'utf8');
  if (rus) content = content.replace(/(id:\s*'rus-1',[\s\S]*?audioUrl:\s*')[^']+'/, `$1${rus}'`);
  if (por) content = content.replace(/(id:\s*'por-1',[\s\S]*?audioUrl:\s*')[^']+'/, `$1${por}'`);
  fs.writeFileSync('src/engine/dataset.ts', content, 'utf8');
}
run();
