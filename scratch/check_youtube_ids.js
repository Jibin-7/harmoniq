import fs from 'fs';

const content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');

// Match all youtubeId fields
const idRegex = /youtubeId:\s*["']([^"']*)["']/g;
let match;
let total = 0;
let empty = 0;
const ids = [];

while ((match = idRegex.exec(content)) !== null) {
  total++;
  const id = match[1].trim();
  if (!id) empty++;
  else ids.push(id);
}

console.log(`Total songs checked in dataset.ts: ${total}`);
console.log(`Songs with empty youtubeId: ${empty}`);
console.log(`Songs with valid youtubeId: ${ids.length}`);

// Let's check if there are any obvious fake or repeated IDs
const idCounts = {};
for (const id of ids) {
  idCounts[id] = (idCounts[id] || 0) + 1;
}

const repeatedIds = Object.entries(idCounts).filter(([id, count]) => count > 1);
console.log(`Repeated YouTube IDs:`, repeatedIds);
