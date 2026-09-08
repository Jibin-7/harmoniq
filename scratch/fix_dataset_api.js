import fs from 'fs';

const content = fs.readFileSync('src/engine/dataset.ts', 'utf8');
const idx = content.indexOf('// Live Apple Music API search');

if (idx !== -1) {
  const cleanSongsPart = content.slice(0, idx).trim();
  
  const cleanAPI = `

// Live Apple Music API search
export async function searchLiveMusicAPI(query: string): Promise<Song[]> {
  try {
    const response = await fetch(\`https://itunes.apple.com/search?term=\${encodeURIComponent(query)}&media=music&entity=song&limit=40\`);
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) return [];

    return data.results
      .filter((item: any) => item.trackName && item.artistName && item.previewUrl)
      .map((item: any, idx: number) => {
        const g = (item.primaryGenreName || 'Pop').toLowerCase();
        let genre: any = 'Pop';
        if (g.includes('rock') || g.includes('metal')) genre = 'Rock';
        else if (g.includes('hip-hop') || g.includes('rap')) genre = 'Hip-Hop';
        else if (g.includes('r&b') || g.includes('soul')) genre = 'R&B';
        else if (g.includes('k-pop')) genre = 'K-Pop';
        else if (g.includes('dance') || g.includes('electronic')) genre = 'EDM';
        else if (g.includes('latin') || g.includes('reggaeton')) genre = 'Latin';
        else if (g.includes('indie') || g.includes('alternative')) genre = 'Indie';
        else if (g.includes('bollywood') || g.includes('indian')) genre = 'Bollywood';
        else if (g.includes('punjabi') || g.includes('bhangra')) genre = 'Punjabi Beats';
        else if (g.includes('acoustic') || g.includes('folk')) genre = 'Acoustic';
        else if (g.includes('jazz') || g.includes('blues')) genre = 'Jazz';

        let language: any = 'English';
        const text = \`\${item.trackName} \${item.artistName} \${item.collectionName || ''}\`.toLowerCase();
        if (g.includes('bollywood') || text.includes('arijit') || text.includes('hindi') || text.includes('kumar sanu')) language = 'Hindi';
        else if (text.includes('diljit') || text.includes('punjabi') || text.includes('sidhu') || text.includes('dhillon')) language = 'Punjabi';
        else if (text.includes('anirudh') || text.includes('tamil') || text.includes('vijay')) language = 'Tamil';
        else if (text.includes('telugu') || text.includes('ram charan') || text.includes('allu arjun')) language = 'Telugu';
        else if (text.includes('malayalam') || text.includes('fahadh') || text.includes('kerala')) language = 'Malayalam';
        else if (g.includes('latin') || text.includes('bad bunny') || text.includes('fonsi') || text.includes('karol g') || text.includes('shakira')) language = 'Spanish';
        else if (g.includes('k-pop') || text.includes('bts') || text.includes('blackpink') || text.includes('korean')) language = 'Korean';

        const syntheticLyrics = \`[Verse 1]\\n\${item.trackName} by \${item.artistName} - Full worldwide song stream.\\nIndexed in real-time IR engine.\\n\\n[Chorus]\\nFeel the rhythm of \${item.trackName}\\nStreaming full length across the planet.\\n\\n[Outro]\\nHarmoniQ Global Music Engine\`;
        
        const fullDuration = item.trackTimeMillis ? Math.round(item.trackTimeMillis / 1000) : 220;

        return {
          id: \`live-\${item.trackId || idx}-\${Date.now()}\`,
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName || 'Single',
          coverUrl: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
          audioUrl: item.previewUrl,
          youtubeId: '',
          duration: fullDuration,
          lyrics: syntheticLyrics,
          genre: genre,
          mood: ['Energetic', 'Happy', 'Party'],
          language: language,
          releaseYear: item.releaseDate ? parseInt(item.releaseDate.substring(0, 4)) : 2023,
          features: {
            tempo: 120 + (idx % 40),
            energy: 0.75,
            valence: 0.65,
            danceability: 0.7
          },
          keywords: [genre.toLowerCase(), (item.artistName || '').toLowerCase(), language.toLowerCase(), "live api retrieved", "worldwide track", "ir dynamic index"],
          isExternal: true
        };
      });
  } catch (err) {
    console.error('Failed to fetch from live music API:', err);
    return [];
  }
}
`;

  fs.writeFileSync('src/engine/dataset.ts', cleanSongsPart + cleanAPI, 'utf8');
  console.log('Successfully cleaned and fixed dataset.ts!');
} else {
  console.error('Could not find API comment.');
}
