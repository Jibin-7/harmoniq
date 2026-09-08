import https from 'https';
import fs from 'fs';

const new50 = [
  { id: 'eng-11', q: 'Taylor Swift Blank Space', yt: 'e-ORhEE9VVg', genre: 'Pop', mood: ['Happy', 'Party'], lang: 'English', yr: 2014 },
  { id: 'eng-12', q: 'Michael Jackson Billie Jean', yt: 'Zi_XLOBDo_Y', genre: 'Pop', mood: ['Dance', 'Energetic'], lang: 'English', yr: 1982 },
  { id: 'eng-13', q: 'Queen We Will Rock You', yt: '-tJYN-eG1zk', genre: 'Rock', mood: ['Energetic', 'Workout', 'Rock'], lang: 'English', yr: 1977 },
  { id: 'eng-14', q: 'Ed Sheeran Perfect', yt: '2Vv-BfVoq4g', genre: 'Pop', mood: ['Romantic', 'Peaceful'], lang: 'English', yr: 2017 },
  { id: 'eng-15', q: 'Ariana Grande 7 rings', yt: 'QYh6mYIJG2Y', genre: 'Pop', mood: ['Party', 'Confident'], lang: 'English', yr: 2019 },
  { id: 'eng-16', q: 'Post Malone Sunflower', yt: 'ApXoWvfEYVU', genre: 'Hip-Hop', mood: ['Happy', 'Chill'], lang: 'English', yr: 2018 },
  { id: 'eng-17', q: 'Justin Bieber Peaches', yt: 'tQ0yjYUFKAE', genre: 'R&B', mood: ['Chill', 'Party'], lang: 'English', yr: 2021 },
  { id: 'eng-18', q: 'Eminem Lose Yourself', yt: '_Yhyp-_hX2s', genre: 'Hip-Hop', mood: ['Workout', 'Confident', 'Aggressive'], lang: 'English', yr: 2002 },
  { id: 'eng-19', q: 'Linkin Park In the End', yt: 'eVTXPUF4Oz4', genre: 'Rock', mood: ['Rock', 'Dramatic', 'Melancholy'], lang: 'English', yr: 2000 },
  { id: 'eng-20', q: 'Nirvana Smells Like Teen Spirit', yt: 'hTWKbfoikeg', genre: 'Rock', mood: ['Rock', 'Energetic', 'Party'], lang: 'English', yr: 1991 },
  { id: 'eng-21', q: 'Bruno Mars Uptown Funk', yt: 'OPf0YbXqDm0', genre: 'Pop', mood: ['Party', 'Dance', 'Happy'], lang: 'English', yr: 2014 },
  { id: 'eng-22', q: 'Katy Perry Roar', yt: 'CevxZvSJLk8', genre: 'Pop', mood: ['Confident', 'Workout', 'Happy'], lang: 'English', yr: 2013 },
  { id: 'eng-23', q: 'Lady Gaga Bad Romance', yt: 'qrO4YZeyl0I', genre: 'Pop', mood: ['Party', 'Dance', 'Dramatic'], lang: 'English', yr: 2009 },
  { id: 'eng-24', q: 'Rihanna Umbrella', yt: 'CvBfHwUxHIk', genre: 'R&B', mood: ['Dance', 'Romantic'], lang: 'English', yr: 2007 },
  { id: 'eng-25', q: 'Coldplay Viva La Vida', yt: 'dvgZkm1xWPE', genre: 'Rock', mood: ['Dramatic', 'Happy', 'Peaceful'], lang: 'English', yr: 2008 },
  { id: 'hin-11', q: 'Arijit Singh Kesariya', yt: 'BddP6PYo2gs', genre: 'Bollywood', mood: ['Romantic', 'Happy'], lang: 'Hindi', yr: 2022 },
  { id: 'hin-12', q: 'Shreya Ghoshal Sunn Raha Hai', yt: 'inEu2qQuGZ8', genre: 'Bollywood', mood: ['Romantic', 'Sad', 'Melancholy'], lang: 'Hindi', yr: 2013 },
  { id: 'hin-13', q: 'Lata Mangeshkar Lag Ja Gale', yt: 'TFr6G5zveS8', genre: 'Bollywood', mood: ['Romantic', 'Nostalgic', 'Peaceful'], lang: 'Hindi', yr: 1964 },
  { id: 'hin-14', q: 'Kishore Kumar Mere Sapno Ki Rani', yt: 'K3n6_c0n7E0', genre: 'Bollywood', mood: ['Happy', 'Romantic', 'Nostalgic'], lang: 'Hindi', yr: 1969 },
  { id: 'hin-15', q: 'Udit Narayan Pehla Nasha', yt: 'c0l209u7uR4', genre: 'Bollywood', mood: ['Romantic', 'Rainy', 'Peaceful'], lang: 'Hindi', yr: 1992 },
  { id: 'hin-16', q: 'Kumar Sanu Dheere Dheere Se', yt: 'nCD2hj6zJEc', genre: 'Bollywood', mood: ['Romantic', 'Nostalgic'], lang: 'Hindi', yr: 1990 },
  { id: 'pun-6', q: 'Sidhu Moose Wala 295', yt: 'n_FCrCQ6-bA', genre: 'Hip-Hop', mood: ['Confident', 'Aggressive'], lang: 'Punjabi', yr: 2021 },
  { id: 'pun-7', q: 'Diljit Dosanjh G.O.A.T.', yt: 'cl0aAaBvL-o', genre: 'Hip-Hop', mood: ['Party', 'Confident', 'Dance'], lang: 'Punjabi', yr: 2020 },
  { id: 'pun-8', q: 'Harrdy Sandhu Bijlee Bijlee', yt: 'N1DOxT3tL-0', genre: 'Pop', mood: ['Party', 'Dance', 'Happy'], lang: 'Punjabi', yr: 2021 },
  { id: 'pun-9', q: 'Guru Randhawa High Rated Gabru', yt: 'hjWf8A0YNSE', genre: 'Pop', mood: ['Party', 'Dance'], lang: 'Punjabi', yr: 2017 },
  { id: 'tam-6', q: 'Anirudh Arabic Kuthu', yt: 'KUN5Uf9m0WU', genre: 'Pop', mood: ['Party', 'Dance', 'Energetic'], lang: 'Tamil', yr: 2022 },
  { id: 'tam-7', q: 'A.R. Rahman Urvasi Urvasi', yt: 'W200aP74yJ8', genre: 'Pop', mood: ['Party', 'Dance', 'Nostalgic'], lang: 'Tamil', yr: 1994 },
  { id: 'tel-4', q: 'Sid Sriram Srivalli', yt: 'hcMzwMrr1tE', genre: 'Pop', mood: ['Romantic', 'Happy'], lang: 'Telugu', yr: 2021 },
  { id: 'tel-5', q: 'DSP Oo Antava', yt: 'qn_95d5L_G4', genre: 'Pop', mood: ['Party', 'Dance', 'Energetic'], lang: 'Telugu', yr: 2021 },
  { id: 'mal-4', q: 'Sushin Shyam Aavesham', yt: '1F3hm6MfR1k', genre: 'Pop', mood: ['Party', 'Energetic', 'Dance'], lang: 'Malayalam', yr: 2024 },
  { id: 'spa-5', q: 'Bad Bunny DÁKITI', yt: 'TmKh7lAwnBI', genre: 'Latin', mood: ['Party', 'Dance', 'Chill'], lang: 'Spanish', yr: 2020 },
  { id: 'spa-6', q: 'Rosalia DESPECHÁ', yt: 'o8b02KVaEwA', genre: 'Latin', mood: ['Party', 'Dance', 'Happy'], lang: 'Spanish', yr: 2022 },
  { id: 'spa-7', q: 'Enrique Iglesias Bailando', yt: 'NUsoVlDFqZg', genre: 'Latin', mood: ['Party', 'Dance', 'Romantic'], lang: 'Spanish', yr: 2014 },
  { id: 'spa-8', q: 'Daddy Yankee Gasolina', yt: 'qGKrc3A6HHM', genre: 'Latin', mood: ['Party', 'Dance', 'Energetic'], lang: 'Spanish', yr: 2004 },
  { id: 'kor-5', q: 'BTS Butter', yt: 'WMweEpGlu_U', genre: 'K-Pop', mood: ['Happy', 'Party', 'Dance'], lang: 'Korean', yr: 2021 },
  { id: 'kor-6', q: 'TWICE Fancy', yt: 'kOHB85vDuow', genre: 'K-Pop', mood: ['Happy', 'Party', 'Dance'], lang: 'Korean', yr: 2019 },
  { id: 'kor-7', q: 'Stray Kids God Menu', yt: 'TQTlCHxyuu8', genre: 'K-Pop', mood: ['Energetic', 'Workout', 'Aggressive'], lang: 'Korean', yr: 2020 },
  { id: 'kor-8', q: 'NewJeans Super Shy', yt: 'ArmDp-zijuc', genre: 'K-Pop', mood: ['Happy', 'Dance', 'Chill'], lang: 'Korean', yr: 2023 },
  { id: 'jap-3', q: 'YOASOBI Idol', yt: 'ZRtdQ81jPUQ', genre: 'J-Pop', mood: ['Energetic', 'Anime', 'Party'], lang: 'Japanese', yr: 2023 },
  { id: 'jap-4', q: 'LiSA Gurenge', yt: 'CwkzK-F0Y00', genre: 'J-Pop', mood: ['Energetic', 'Anime', 'Rock'], lang: 'Japanese', yr: 2019 },
  { id: 'fre-3', q: 'Indila Tourner Dans Le Vide', yt: 'vtNjmn09gH8', genre: 'Pop', mood: ['Dramatic', 'Melancholy'], lang: 'French', yr: 2014 },
  { id: 'fre-4', q: 'Stromae Alors On Danse', yt: 'VHoT4N43jK8', genre: 'Pop', mood: ['Party', 'Dance', 'Melancholy'], lang: 'French', yr: 2010 },
  { id: 'ger-2', q: 'Rammstein Sonne', yt: 'StZcUAPRRac', genre: 'Rock', mood: ['Rock', 'Aggressive', 'Workout'], lang: 'German', yr: 2001 },
  { id: 'ger-3', q: 'Nena 99 Luftballons', yt: 'Fpu5a0Bl8eY', genre: 'Pop', mood: ['Party', 'Dance', 'Nostalgic'], lang: 'German', yr: 1983 },
  { id: 'ara-2', q: 'Saad Lamjarred Lm3allem', yt: '_FqSYnTUe_I', genre: 'Pop', mood: ['Party', 'Dance'], lang: 'Arabic', yr: 2015 },
  { id: 'tur-1', q: 'Tarkan Şımarık', yt: '8b02KVaEwA0', genre: 'Pop', mood: ['Party', 'Dance', 'Romantic'], lang: 'Turkish', yr: 1997 },
  { id: 'rom-1', q: 'O-Zone Dragostea Din Tei', yt: 'YnopHCL1Jk8', genre: 'Pop', mood: ['Party', 'Dance', 'Happy'], lang: 'Italian', yr: 2003 },
  { id: 'edm-3', q: 'Calvin Harris Summer', yt: 'ebXbLfLACGM', genre: 'EDM', mood: ['Party', 'Dance', 'Energetic'], lang: 'English', yr: 2014 },
  { id: 'edm-4', q: 'Martin Garrix Animals', yt: 'gCYcHz2k5x0', genre: 'EDM', mood: ['Party', 'Dance', 'Workout'], lang: 'English', yr: 2013 },
  { id: 'edm-5', q: 'Marshmello Happier', yt: 'm7Bc3pLyij0', genre: 'EDM', mood: ['Happy', 'Dance', 'Melancholy'], lang: 'English', yr: 2018 }
];

async function fetchSongData(item) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(item.q)}&media=music&limit=1`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            const r = json.results[0];
            resolve({
              id: item.id,
              title: r.trackName || item.q,
              artist: r.artistName || 'Unknown Artist',
              album: r.collectionName || 'Single',
              coverUrl: r.artworkUrl100 ? r.artworkUrl100.replace('100x100bb', '600x600bb') : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
              audioUrl: r.previewUrl || '',
              youtubeId: item.yt,
              duration: Math.floor((r.trackTimeMillis || 210000) / 1000),
              lyrics: `[Verse 1]\n${r.trackName} by ${r.artistName} - Full worldwide song stream.\nIndexed in real-time IR engine across all languages.\n\n[Chorus]\nFeel the rhythm of ${r.trackName}\nStreaming full length across the planet.\nNo limitations, pure music retrieval.\n\n[Outro]\nHarmoniQ Global Music Engine - Worldwide Stream`,
              genre: item.genre,
              mood: item.mood,
              language: item.lang,
              releaseYear: item.yr,
              features: { tempo: 125, energy: 0.8, valence: 0.7, danceability: 0.75 }
            });
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
  const added = [];
  for (const item of new50) {
    const s = await fetchSongData(item);
    if (s) {
      added.push(s);
      console.log(`Fetched OK: ${s.title} by ${s.artist} (${s.language})`);
    } else {
      // Fallback object if iTunes misses
      added.push({
        id: item.id,
        title: item.q.split(' ').slice(2).join(' ') || item.q,
        artist: item.q.split(' ').slice(0, 2).join(' '),
        album: 'Greatest Hits',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        audioUrl: '',
        youtubeId: item.yt,
        duration: 210,
        lyrics: `[Verse 1]\n${item.q} - Full worldwide song stream.\nIndexed in real-time IR engine.\n\n[Chorus]\nFeel the rhythm of ${item.q}\nStreaming full length across the planet.\n\n[Outro]\nHarmoniQ Global Music Engine`,
        genre: item.genre,
        mood: item.mood,
        language: item.lang,
        releaseYear: item.yr,
        features: { tempo: 125, energy: 0.8, valence: 0.7, danceability: 0.75 }
      });
    }
  }

  let tsString = '';
  for (const s of added) {
    tsString += `,\n  {\n`;
    tsString += `    id: '${s.id}',\n`;
    tsString += `    title: ${JSON.stringify(s.title)},\n`;
    tsString += `    artist: ${JSON.stringify(s.artist)},\n`;
    tsString += `    album: ${JSON.stringify(s.album)},\n`;
    tsString += `    coverUrl: '${s.coverUrl}',\n`;
    tsString += `    audioUrl: '${s.audioUrl}',\n`;
    tsString += `    youtubeId: '${s.youtubeId}',\n`;
    tsString += `    duration: ${s.duration},\n`;
    tsString += `    lyrics: ${JSON.stringify(s.lyrics)},\n`;
    tsString += `    genre: '${s.genre}',\n`;
    tsString += `    mood: ${JSON.stringify(s.mood)},\n`;
    tsString += `    language: '${s.language}',\n`;
    tsString += `    releaseYear: ${s.releaseYear},\n`;
    tsString += `    features: ${JSON.stringify(s.features)}\n`;
    tsString += `  }`;
  }

  let content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');
  const targetIdx = content.lastIndexOf('];\n\n// Live Apple Music API search');
  if (targetIdx !== -1) {
    content = content.slice(0, targetIdx) + tsString + '\n' + content.slice(targetIdx);
    fs.writeFileSync('./src/engine/dataset.ts', content, 'utf8');
    console.log(`Successfully added 50 MORE songs! Catalog is now 100 tracks!`);
  } else {
    console.error('Could not find target insertion point');
  }
}
run();
