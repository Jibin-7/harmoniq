import fs from 'fs';

let content = fs.readFileSync('./src/engine/dataset.ts', 'utf8');

// Replace any `}\n  {` or `}\r\n  {` or `}\s*\{` inside the array with `},\n  {`
content = content.replace(/\}\s*\{/g, '},\n  {');

fs.writeFileSync('./src/engine/dataset.ts', content, 'utf8');
console.log('Fixed missing commas in dataset.ts!');
