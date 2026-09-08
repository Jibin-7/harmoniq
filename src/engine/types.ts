export type MusicLanguage = 
  | 'English'
  | 'Hindi'
  | 'Punjabi'
  | 'Spanish'
  | 'Korean'
  | 'Japanese'
  | 'French'
  | 'German'
  | 'Arabic'
  | 'Tamil'
  | 'Telugu'
  | 'Malayalam'
  | 'Mandarin'
  | 'Portuguese'
  | 'Russian'
  | 'Italian'
  | 'Instrumental'
  | 'Bengali'
  | 'Gujarati'
  | 'Marathi'
  | 'Turkish';

export type MusicGenre = 
  | 'Pop'
  | 'Rock'
  | 'Hip-Hop'
  | 'R&B'
  | 'K-Pop'
  | 'J-Pop'
  | 'EDM'
  | 'Lo-Fi'
  | 'Classical'
  | 'Latin'
  | 'Indie'
  | 'Bollywood'
  | 'Punjabi Beats'
  | 'Acoustic'
  | 'Jazz';

export type MusicMood = 
  | 'Energetic'
  | 'Chill'
  | 'Romantic'
  | 'Melancholy'
  | 'Party'
  | 'Focus'
  | 'Workout'
  | 'Happy'
  | 'Heartbreak'
  | 'Dark'
  | 'Peaceful'
  | 'Dramatic'
  | 'Sad'
  | 'Spiritual'
  | 'Rainy'
  | 'Dance'
  | 'Confident'
  | 'Atmospheric'
  | 'Study'
  | 'Rock'
  | 'Nostalgic'
  | 'Dreamy'
  | 'Aggressive'
  | 'Devotional'
  | 'Anime';

export interface AudioFeatures {
  tempo: number; // BPM (e.g. 120)
  energy: number; // 0.0 to 1.0
  valence: number; // 0.0 to 1.0 (musical positiveness)
  danceability: number; // 0.0 to 1.0
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  youtubeId?: string; // YouTube Video ID for 100% full length song playback
  duration: number; // in seconds
  lyrics: string;
  genre: MusicGenre;
  mood: MusicMood[];
  language: MusicLanguage;
  releaseYear: number;
  features: AudioFeatures;
  keywords?: string[]; // IR keywords (e.g. 1960s classic, 80s synth, heartbreak rain, club banger)
  isExternal?: boolean; // True if dynamically fetched from live iTunes/Kaggle API
}

export interface ScoreBreakdown {
  bm25Score: number;
  vectorScore: number;
  totalScore: number;
  matchedTerms: string[];
  matchedFields: string[];
  explanation: string;
}

export interface IRResult {
  song: Song;
  score: number;
  breakdown: ScoreBreakdown;
}

export interface SearchFilter {
  query: string;
  language: MusicLanguage | 'All';
  genre: MusicGenre | 'All';
  mood: MusicMood | 'All';
  searchField: 'all' | 'title' | 'artist' | 'lyrics' | 'genre' | 'mood' | 'keywords';
  sortBy: 'relevance' | 'title' | 'artist' | 'year' | 'energy' | 'newest' | 'tempo';
}

export interface IndexStats {
  totalDocuments: number;
  totalTokens: number;
  vocabularySize: number;
  indexedFields: string[];
  averageDocumentLength: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favoriteLanguages: string[];
  favoriteGenres: string[];
  favoriteMoods: string[];
  listeningHours: number;
}
