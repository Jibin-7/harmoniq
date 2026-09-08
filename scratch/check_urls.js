import fs from 'fs';

const content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');
const regex = /id:\s*'([^']+)',\s*title:\s*'([^']+)',[\s\S]*?audioUrl:\s*'([^']+)'/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  console.log(`${count}. [${match[1]}] "${match[2]}" -> ${match[3]}`);
}
console.log(`Total songs found: ${count}`);
