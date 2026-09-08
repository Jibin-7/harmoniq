import { CURATED_SONGS } from '../src/engine/dataset.ts';

console.log(`Total songs in dataset: ${CURATED_SONGS.length}`);
for (const s of CURATED_SONGS) {
  console.log(`${s.id} | ${s.title} | ${s.audioUrl}`);
}
