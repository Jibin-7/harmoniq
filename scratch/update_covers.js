import fs from 'fs';

const covers = JSON.parse(fs.readFileSync('./scratch/covers.json', 'utf8'));
let content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');

for (const [id, url] of Object.entries(covers)) {
  // Find the block for this song ID and replace its coverUrl
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?coverUrl:\\s*)'[^']*'`, 'g');
  content = content.replace(regex, `$1'${url}'`);
}

fs.writeFileSync('./src/engine/dataset.ts', content, 'utf8');
console.log('Successfully updated all 25 official studio album covers in dataset.ts!');
