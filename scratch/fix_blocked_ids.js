import fs from 'fs';

let content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');
const blockedIds = ['mBHtD--yvX8', 'VNs_cDd4fqQ', 'OsU0CGZoV8E', 'saGYm2g1q3Q', 'kw4tT7S8Z_w', 'Z8MmtjZ2-gI'];

for (const yt of blockedIds) {
  content = content.replace(`youtubeId: '${yt}'`, `youtubeId: ''`);
}

fs.writeFileSync('./src/engine/dataset.ts', content, 'utf8');
console.log('Successfully cleared all 6 blocked YouTube video IDs in dataset.ts!');
