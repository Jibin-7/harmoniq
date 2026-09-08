import { Song, IRResult, SearchFilter } from './types';
import { InvertedIndex, IndexedField } from './invertedIndex';
import { tokenize, extractQueryIntent, ExtractedIntent } from './tokenizer';

const FIELD_WEIGHTS: Record<IndexedField, number> = {
  title: 3.5,
  artist: 3.0,
  language: 2.8,
  keywords: 2.5,
  genre: 2.2,
  mood: 2.2,
  lyrics: 1.5,
  album: 1.2
};

export class MusicRanker {
  private index: InvertedIndex;
  private k1: number = 1.2;
  private b: number = 0.75;

  constructor(index: InvertedIndex) {
    this.index = index;
  }

  public search(filter: SearchFilter): IRResult[] {
    const allSongs = this.index.getAllDocuments();

    // If query is empty, just filter and return all matching songs sorted by criteria
    if (!filter.query || filter.query.trim() === '') {
      const res = allSongs
        .filter(song => this.matchesFilters(song, filter))
        .map(song => ({
          song,
          score: 1.0,
          breakdown: {
            bm25Score: 1.0,
            vectorScore: 1.0,
            totalScore: 1.0,
            matchedTerms: [],
            matchedFields: ['all'],
            explanation: 'Direct filter browsing'
          }
        }))
        .sort((a, b) => this.sortResults(a, b, filter.sortBy));
      return this.deduplicate(res);
    }

    // 1. Tokenize query & extract intent
    const queryTokens = tokenize(filter.query, true);
    const intent = extractQueryIntent(filter.query);
    const totalDocs = this.index.getDocumentCount();
    const avgDocLength = this.index.getAverageDocumentLength() || 1;

    const docScores: Map<string, {
      bm25: number;
      vector: number;
      matchedTerms: Set<string>;
      matchedFields: Set<string>;
    }> = new Map();

    // Initialize scores for docs that match filters
    for (const song of allSongs) {
      if (this.matchesFilters(song, filter)) {
        docScores.set(song.id, {
          bm25: 0,
          vector: 0,
          matchedTerms: new Set(),
          matchedFields: new Set()
        });
      }
    }

    // 2. BM25 Scoring
    for (const token of queryTokens) {
      const postingsMap = this.index.getPostings(token);
      const df = postingsMap.size;
      if (df === 0) continue;

      // Inverse Document Frequency (IDF)
      const idf = Math.log(1 + (totalDocs - df + 0.5) / (df + 0.5));

      for (const [docId, postings] of postingsMap.entries()) {
        const scoreEntry = docScores.get(docId);
        if (!scoreEntry) continue;

        const docLen = this.index.getDocumentLength(docId) || avgDocLength;

        for (const posting of postings) {
          // If searchField filter is specified (not 'all'), ignore other fields
          if (filter.searchField !== 'all' && posting.field !== filter.searchField) {
            continue;
          }

          const tf = posting.tf;
          const fieldWeight = FIELD_WEIGHTS[posting.field] || 1.0;

          // BM25 formula for this term in this field
          const numerator = tf * (this.k1 + 1);
          const denominator = tf + this.k1 * (1 - this.b + this.b * (docLen / avgDocLength));
          const termScore = idf * (numerator / denominator) * fieldWeight;

          scoreEntry.bm25 += termScore;
          scoreEntry.matchedTerms.add(token.startsWith('_ng_') ? token.substring(4) : token);
          scoreEntry.matchedFields.add(posting.field);
        }
      }
    }

    // 3. Vector & Intent Similarity Boosting
    for (const [docId, scoreEntry] of docScores.entries()) {
      const song = this.index.getDocument(docId);
      if (!song) continue;

      let vectorBonus = 0;

      // Check intent matches
      if (intent.language && song.language.toLowerCase() === intent.language.toLowerCase()) {
        vectorBonus += 3.0;
        scoreEntry.matchedFields.add('language');
      }
      if (intent.genre && song.genre.toLowerCase() === intent.genre.toLowerCase()) {
        vectorBonus += 2.5;
        scoreEntry.matchedFields.add('genre');
      }
      if (intent.mood && song.mood.some(m => m.toLowerCase() === intent.mood?.toLowerCase())) {
        vectorBonus += 2.5;
        scoreEntry.matchedFields.add('mood');
      }

      // Tempo / energy alignment
      if (intent.isFast && song.features.tempo >= 120 && song.features.energy >= 0.7) {
        vectorBonus += 1.5;
      } else if (intent.isSlow && song.features.tempo <= 100 && song.features.energy <= 0.5) {
        vectorBonus += 1.5;
      }

      // Substring fuzzy match fallback (if query title or artist directly matches)
      const lowerQuery = filter.query.toLowerCase().trim();
      if (song.title.toLowerCase().includes(lowerQuery) || lowerQuery.includes(song.title.toLowerCase())) {
        vectorBonus += 5.0;
        scoreEntry.matchedFields.add('title');
      }
      if (song.artist.toLowerCase().includes(lowerQuery) || lowerQuery.includes(song.artist.toLowerCase())) {
        vectorBonus += 4.0;
        scoreEntry.matchedFields.add('artist');
      }

      scoreEntry.vector = vectorBonus;
    }

    // 4. Build final results
    const results: IRResult[] = [];
    for (const [docId, scoreEntry] of docScores.entries()) {
      const totalScore = scoreEntry.bm25 + scoreEntry.vector;
      if (totalScore <= 0 && filter.query.trim().length > 0) continue; // Skip non-matching docs when query is active

      const song = this.index.getDocument(docId)!;
      results.push({
        song,
        score: Math.round(totalScore * 100) / 100,
        breakdown: {
          bm25Score: Math.round(scoreEntry.bm25 * 100) / 100,
          vectorScore: Math.round(scoreEntry.vector * 100) / 100,
          totalScore: Math.round(totalScore * 100) / 100,
          matchedTerms: Array.from(scoreEntry.matchedTerms),
          matchedFields: Array.from(scoreEntry.matchedFields),
          explanation: `${[intent.language ? `🌐 ${intent.language}` : null, intent.genre ? `🎵 ${intent.genre}` : null, intent.mood ? `🎭 ${intent.mood}` : null, intent.isFast ? '⚡ Fast Tempo' : intent.isSlow ? '🌙 Slow Tempo' : null].filter(Boolean).join(' • ')} ${intent.language || intent.genre || intent.mood ? '| ' : ''}BM25 (${scoreEntry.bm25.toFixed(1)}) + Vector Cosine (${scoreEntry.vector.toFixed(1)})`
        }
      });
    }

    const sorted = results.sort((a, b) => this.sortResults(a, b, filter.sortBy));
    return this.deduplicate(sorted);
  }

  private deduplicate(list: IRResult[]): IRResult[] {
    const seen = new Set<string>();
    return list.filter(item => {
      const normTitle = item.song.title.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
      const normArtist = item.song.artist.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
      const key = `${normTitle}:::${normArtist}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private matchesFilters(song: Song, filter: SearchFilter): boolean {
    if (filter.language !== 'All' && song.language !== filter.language) return false;
    if (filter.genre !== 'All' && song.genre !== filter.genre) return false;
    if (filter.mood !== 'All' && !song.mood.includes(filter.mood as any)) return false;
    return true;
  }

  private sortResults(a: IRResult | Song, b: IRResult | Song, sortBy: string): number {
    const songA = 'song' in a ? a.song : a;
    const songB = 'song' in b ? b.song : b;
    const scoreA = 'score' in a ? a.score : 0;
    const scoreB = 'score' in b ? b.score : 0;

    if (sortBy === 'relevance') {
      return scoreB - scoreA;
    } else if (sortBy === 'title') {
      return songA.title.localeCompare(songB.title);
    } else if (sortBy === 'artist') {
      return songA.artist.localeCompare(songB.artist);
    } else if (sortBy === 'year' || sortBy === 'newest') {
      return songB.releaseYear - songA.releaseYear;
    } else if (sortBy === 'energy') {
      return songB.features.energy - songA.features.energy;
    } else if (sortBy === 'tempo') {
      return songB.features.tempo - songA.features.tempo;
    }
    return scoreB - scoreA;
  }
}
