import fs from 'fs';

let content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');

// Let's see which songs have ID 1F3hm6MfR1k
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('1F3hm6MfR1k')) {
    console.log(`Line ${i}:`, lines[i - 4], lines[i - 3], lines[i - 2], lines[i - 1], lines[i]);
  }
}
