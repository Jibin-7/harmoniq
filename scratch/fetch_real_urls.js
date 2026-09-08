import https from 'https';
import fs from 'fs';

const songs = [
  { id: 'eng-1', query: 'Blinding Lights The Weeknd' },
  { id: 'eng-2', query: 'Shape of You Ed Sheeran' },
  { id: 'eng-3', query: 'Bohemian Rhapsody Queen' },
  { id: 'eng-4', query: 'Cruel Summer Taylor Swift' },
  { id: 'hin-1', query: 'Tum Hi Ho Arijit Singh' },
  { id: 'hin-2', query: 'Chaleya Arijit Singh' },
  { id: 'pun-1', query: 'Lover Diljit Dosanjh' },
  { id: 'pun-2', query: 'Brown Munde AP Dhillon' },
  { id: 'tam-1', query: 'Hukum Anirudh' },
  { id: 'tel-1', query: 'Naatu Naatu Rahul Sipligunj' },
  { id: 'mal-1', query: 'Illuminati Sushin Shyam' },
  { id: 'spa-1', query: 'Despacito Luis Fonsi' },
  { id: 'spa-2', query: 'Me Porto Bonito Bad Bunny' },
  { id: 'kor-1', query: 'Dynamite BTS' },
  { id: 'kor-2', query: 'Pink Venom BLACKPINK' },
  { id: 'jap-1', query: 'Yoru ni Kakeru YOASOBI' },
  { id: 'fre-1', query: 'Derniere Danse Indila' },
  { id: 'ger-1', query: 'Du Hast Rammstein' },
  { id: 'ara-1', query: 'Saad Lamjarred Lm3allem' },
  { id: 'rus-1] ', query: 'Tri Poloski Davay' },
  { id: 'por-1', query: 'Garota de Ipanema Tom Jobim' },
  { id: 'ita-1', query: 'Zitti e Buoni Maneskin' },
  { id: 'man-1', query: 'Qing Hua Ci Jay Chou' },
  { id: 'eng-lofi', query: 'Lofi Study Chill' },
  { id: 'eng-5', query: 'Starboy The Weeknd' }
];

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
  const results = {};
  for (const s of songs) {
    const url = await fetchItunes(s.query);
    console.log(`${s.id}: ${url || 'FAILED'}`);
    results[s.id] = url;
  }
  fs.writeFileSync('scratch/real_urls.json', JSON.stringify(results, null, 2));
}
run();
