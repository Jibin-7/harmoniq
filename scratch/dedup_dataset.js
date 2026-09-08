import fs from 'fs';

let content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');

// We can parse the array or do a regex extraction, or let's import the file if possible, or let's use a regex replacement to clean duplicates.
// Let's check how many songs are in dataset.ts right now.
console.log('Cleaning duplicate songs in dataset.ts...');

const lines = content.split('\n');
let newLines = [];
let inArray = false;
let currentSongLines = [];
const seenKeys = new Set();
let removedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('export const CURATED_SONGS: Song[] = [')) {
    inArray = true;
    newLines.push(line);
    continue;
  }
  if (inArray && line.startsWith('];')) {
    inArray = false;
    newLines.push(line);
    continue;
  }

  if (inArray) {
    currentSongLines.push(line);
    if (line.trim().startsWith('}') || line.trim().startsWith('},')) {
      const songBlock = currentSongLines.join('\n');
      const titleMatch = /title:\s*["']([^"']+)["']/.exec(songBlock);
      const artistMatch = /artist:\s*["']([^"']+)["']/.exec(songBlock);
      if (titleMatch && artistMatch) {
        const normTitle = titleMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '').trim();
        const normArtist = artistMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '').trim();
        const key = `${normTitle}:::${normArtist}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          newLines.push(songBlock);
        } else {
          removedCount++;
          // if the last added line didn't end with comma and we removed one, we might need to check commas later, but let's see
        }
      } else {
        newLines.push(songBlock);
      }
      currentSongLines = [];
    }
  } else {
    newLines.push(line);
  }
}

// Clean trailing commas in array if needed
let res = newLines.join('\n');
res = res.replace(/,\s*\];/g, '\n];');

fs.writeFileSync('./src/engine/dataset.ts', res, 'utf8');
console.log(`Removed ${removedCount} duplicate songs from dataset.ts! Total unique songs in array: ${seenKeys.size}`);
