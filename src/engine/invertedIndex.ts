import { Song, IndexStats } from './types';
import { tokenize } from './tokenizer';

export type IndexedField = 'title' | 'artist' | 'album' | 'lyrics' | 'genre' | 'mood' | 'language' | 'keywords';

export interface Posting {
  docId: string;
  field: IndexedField;
  tf: number; // Term frequency in this doc field
}

export class InvertedIndex {
  // Map<token, Map<docId, Posting[]>>
  private index: Map<string, Map<string, Posting[]>> = new Map();
  // Map<docId, Song>
  private documents: Map<string, Song> = new Map();
  // Map<docId, number> total tokens per document
  private docLengths: Map<string, number> = new Map();
  private totalTokens = 0;

  constructor(initialSongs: Song[] = []) {
    this.addSongs(initialSongs);
  }

  public addSongs(songs: Song[]): void {
    for (const song of songs) {
      if (this.documents.has(song.id)) continue; // Already indexed

      this.documents.set(song.id, song);
      let docLength = 0;

      // Index Title
      const titleTokens = tokenize(song.title);
      docLength += this.indexField(song.id, 'title', titleTokens);

      // Index Artist
      const artistTokens = tokenize(song.artist);
      docLength += this.indexField(song.id, 'artist', artistTokens);

      // Index Album
      const albumTokens = tokenize(song.album);
      docLength += this.indexField(song.id, 'album', albumTokens);

      // Index Lyrics
      const lyricsTokens = tokenize(song.lyrics);
      docLength += this.indexField(song.id, 'lyrics', lyricsTokens);

      // Index Genre
      const genreTokens = tokenize(song.genre);
      docLength += this.indexField(song.id, 'genre', genreTokens);

      // Index Mood
      const moodText = song.mood.join(' ');
      const moodTokens = tokenize(moodText);
      docLength += this.indexField(song.id, 'mood', moodTokens);

      // Index Language
      const langTokens = tokenize(song.language);
      docLength += this.indexField(song.id, 'language', langTokens);

      // Index Keywords
      if (song.keywords && song.keywords.length > 0) {
        const keywordText = song.keywords.join(' ');
        const keywordTokens = tokenize(keywordText);
        docLength += this.indexField(song.id, 'keywords', keywordTokens);
      }

      this.docLengths.set(song.id, docLength);
      this.totalTokens += docLength;
    }
  }

  private indexField(docId: string, field: IndexedField, tokens: string[]): number {
    const tokenCounts: Record<string, number> = {};
    for (const token of tokens) {
      tokenCounts[token] = (tokenCounts[token] || 0) + 1;
    }

    for (const [token, count] of Object.entries(tokenCounts)) {
      if (!this.index.has(token)) {
        this.index.set(token, new Map());
      }
      const tokenMap = this.index.get(token)!;
      if (!tokenMap.has(docId)) {
        tokenMap.set(docId, []);
      }
      tokenMap.get(docId)!.push({
        docId,
        field,
        tf: count
      });
    }

    return tokens.length;
  }

  public getPostings(token: string): Map<string, Posting[]> {
    return this.index.get(token) || new Map();
  }

  public getDocument(docId: string): Song | undefined {
    return this.documents.get(docId);
  }

  public getAllDocuments(): Song[] {
    return Array.from(this.documents.values());
  }

  public getDocumentCount(): number {
    return this.documents.size;
  }

  public getDocumentLength(docId: string): number {
    return this.docLengths.get(docId) || 0;
  }

  public getAverageDocumentLength(): number {
    if (this.documents.size === 0) return 0;
    return this.totalTokens / this.documents.size;
  }

  public getStats(): IndexStats {
    return {
      totalDocuments: this.documents.size,
      totalTokens: this.totalTokens,
      vocabularySize: this.index.size,
      averageDocumentLength: Math.round(this.getAverageDocumentLength()),
      indexedFields: ['title', 'artist', 'album', 'lyrics', 'genre', 'mood', 'language']
    };
  }
}
