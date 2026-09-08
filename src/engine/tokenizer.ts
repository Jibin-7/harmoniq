import { MusicLanguage, MusicMood, MusicGenre } from './types';

// Multilingual and standard English stop words for IR token cleaning
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 
  'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 
  'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 
  'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 
  'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 
  'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 
  'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 
  'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 
  'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 
  'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 
  'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 
  'yourselves', 'song', 'songs', 'music', 'track', 'play', 'listen', 'want', 'need', 'like', 'give'
]);

// Basic lemmatization / stemming approximations for common music terms
const LEMMA_MAP: Record<string, string> = {
  'loving': 'love',
  'loved': 'love',
  'lover': 'love',
  'lovers': 'love',
  'dancing': 'dance',
  'danced': 'dance',
  'dancer': 'dance',
  'dances': 'dance',
  'party': 'parti',
  'parties': 'parti',
  'partying': 'parti',
  'feeling': 'feel',
  'feels': 'feel',
  'running': 'run',
  'runs': 'run',
  'singing': 'sing',
  'sings': 'sing',
  'singer': 'sing',
  'singers': 'sing',
  'beats': 'beat',
  'beaten': 'beat',
  'romantic': 'romanc',
  'romance': 'romanc',
  'energetic': 'energi',
  'energy': 'energi'
};

export function tokenize(text: string, removeStopWords = true): string[] {
  if (!text) return [];

  // Normalize Unicode, lowercase, remove punctuation except hyphens in words (like K-Pop, Lo-Fi)
  const cleaned = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Strip diacritics
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleaned.split(' ').filter(w => w.length > 0);

  const tokens: string[] = [];
  for (let word of words) {
    if (removeStopWords && STOP_WORDS.has(word)) continue;
    
    // Lemmatize word if present in LEMMA_MAP
    const root = LEMMA_MAP[word] || word;
    tokens.push(root);

    // If word is > 5 chars, generate character 4-grams and 5-grams for typo tolerance (e.g. bohemain -> bohem, ohema, hemai, emain)
    if (word.length >= 6) {
      for (let i = 0; i <= word.length - 4; i++) {
        tokens.push(`_ng_${word.substring(i, i + 4)}`);
      }
    }
  }

  return tokens;
}

export interface ExtractedIntent {
  language?: MusicLanguage;
  genre?: MusicGenre;
  mood?: MusicMood;
  isFast?: boolean;
  isSlow?: boolean;
  keywords: string[];
}

// Extracts semantic query intent from natural language (e.g., "fast upbeat punjabi party song")
export function extractQueryIntent(query: string): ExtractedIntent {
  const lower = query.toLowerCase();
  const intent: ExtractedIntent = {
    keywords: tokenize(query, true)
  };

  // Check language
  const languages: MusicLanguage[] = ['English', 'Hindi', 'Punjabi', 'Spanish', 'Korean', 'Japanese', 'French', 'German', 'Arabic', 'Tamil', 'Telugu', 'Malayalam', 'Mandarin', 'Portuguese', 'Russian', 'Italian'];
  for (const lang of languages) {
    if (lower.includes(lang.toLowerCase()) || (lang === 'Korean' && lower.includes('kpop')) || (lang === 'Japanese' && (lower.includes('jpop') || lower.includes('anime')))) {
      intent.language = lang;
      break;
    }
  }

  // Check genre
  const genres: MusicGenre[] = ['Pop', 'Rock', 'Hip-Hop', 'R&B', 'K-Pop', 'J-Pop', 'EDM', 'Lo-Fi', 'Classical', 'Latin', 'Indie', 'Bollywood', 'Punjabi Beats', 'Acoustic', 'Jazz'];
  for (const g of genres) {
    if (lower.includes(g.toLowerCase()) || (g === 'Hip-Hop' && lower.includes('rap')) || (g === 'EDM' && (lower.includes('electronic') || lower.includes('club') || lower.includes('rave')))) {
      intent.genre = g;
      break;
    }
  }

  // Check mood
  const moods: MusicMood[] = ['Energetic', 'Chill', 'Romantic', 'Melancholy', 'Party', 'Focus', 'Workout', 'Happy', 'Heartbreak', 'Dreamy', 'Nostalgic', 'Aggressive', 'Devotional'];
  for (const m of moods) {
    if (lower.includes(m.toLowerCase()) || (m === 'Melancholy' && (lower.includes('sad') || lower.includes('depressed'))) || (m === 'Energetic' && (lower.includes('hype') || lower.includes('upbeat')))) {
      intent.mood = m;
      break;
    }
  }

  // Check tempo intent
  if (lower.includes('fast') || lower.includes('upbeat') || lower.includes('speed') || lower.includes('high energy')) {
    intent.isFast = true;
  } else if (lower.includes('slow') || lower.includes('calm') || lower.includes('relax') || lower.includes('sleep')) {
    intent.isSlow = true;
  }

  return intent;
}
