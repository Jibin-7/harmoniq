import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('scratch/real_urls.json', 'utf8'));
let content = fs.readFileSync('src/engine/dataset.ts', 'utf8');

for (const [id, url] of Object.entries(urls)) {
  const cleanId = id.replace(']', '');
  const regex = new RegExp(`(id:\\s*'${cleanId}',[\\s\\S]*?audioUrl:\\s*')[^']+'`, 'g');
  content = content.replace(regex, `$1${url}'`);
}

fs.writeFileSync('src/engine/dataset.ts', content, 'utf8');
console.log('Successfully updated dataset.ts with working audio URLs!');
