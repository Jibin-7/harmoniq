import https from 'https';
import fs from 'fs';

const songs = [
  { id: 'eng-1', q: 'The Weeknd Blinding Lights' },
  { id: 'eng-2', q: 'Ed Sheeran Shape of You' },
  { id: 'eng-3', q: 'Queen Bohemian Rhapsody' },
  { id: 'eng-4', q: 'Taylor Swift Love Story' },
  { id: 'eng-5', q: 'BTS Butter' },
  { id: 'hin-1', q: 'Arijit Singh Tum Kya Mile' },
  { id: 'hin-2', q: 'Arijit Singh Kesariya' },
  { id: 'hin-3', q: 'A.R. Rahman Chaiyya Chaiyya' },
  { id: 'hin-4', q: 'Arijit Singh Chaleya' },
  { id: 'hin-5', q: 'Pritam Phir Aur Kya Chahiye' },
  { id: 'pun-1', q: 'AP Dhillon Excuses' },
  { id: 'pun-2', q: 'Diljit Dosanjh Lover' },
  { id: 'pun-3', q: 'Sidhu Moose Wala 295' },
  { id: 'tam-1', q: 'Anirudh Naa Ready' },
  { id: 'tam-2', q: 'A.R. Rahman Arabic Kuthu' },
  { id: 'tam-3', q: 'Anirudh Hukum' },
  { id: 'tel-1', q: 'Kaala Bhairava Naatu Naatu' },
  { id: 'tel-2', q: 'Sid Sriram Srivalli' },
  { id: 'mal-1', q: 'Sushin Shyam Illuminati' },
  { id: 'mal-2', q: 'Hesham Abdul Wahab Darshana' },
  { id: 'spa-1', q: 'Luis Fonsi Despacito' },
  { id: 'spa-2', q: 'Rosalía La Fama' },
  { id: 'kor-1', q: 'BLACKPINK Pink Venom' },
  { id: 'kor-2', q: 'PSY Gangnam Style' },
  { id: 'jap-1', q: 'YOASOBI Idol' }
];

async function getArt(query) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=1`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0 && json.results[0].artworkUrl100) {
            resolve(json.results[0].artworkUrl100.replace('100x100bb', '600x600bb'));
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
    const art = await getArt(s.q);
    console.log(s.id, '->', art);
    if (art) results[s.id] = art;
  }
  fs.writeFileSync('./scratch/covers.json', JSON.stringify(results, null, 2));
}
run();
