import fs from 'fs';
import path from 'path';

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes('%') || line.includes('features') || line.includes('energy') || line.includes('valence') || line.includes('score')) {
          if (line.includes('3000') || line.includes('* 100') || line.includes('* 1000') || line.includes('round')) {
            console.log(`${fullPath}:${idx + 1} -> ${line.trim()}`);
          }
        }
      });
    }
  }
}
searchDir('./src');
