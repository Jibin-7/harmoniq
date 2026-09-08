import fs from 'fs';

const content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');
// match objects in CURATED_SONGS
const titleRegex = /title:\s*["']([^"']+)["']/g;
const artistRegex = /artist:\s*["']([^"']+)["']/g;

const titles = [];
let match;
while ((match = titleRegex.exec(content)) !== null) {
  titles.push(match[1].trim().toLowerCase());
}

const seen = new Set();
const dups = new Set();
for (const t of titles) {
  if (seen.has(t)) dups.add(t);
  seen.add(t);
}

console.log('Total title occurrences found:', titles.length);
console.log('Duplicate titles in dataset.ts:', Array.from(dups));
