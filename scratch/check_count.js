import fs from 'fs';
const c = fs.readFileSync('./src/engine/dataset.ts', 'utf8');
const matches = c.match(/id:\s*'[a-z0-9-]+'/g);
console.log('Total songs matching ID pattern in dataset.ts:', matches ? matches.length : 0);
