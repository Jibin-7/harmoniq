import React from 'react';
import { X, Sparkles, Activity, Heart, Music, ShieldCheck } from 'lucide-react';
import { Song, ScoreBreakdown } from '../engine/types';

interface LyricsDrawerProps {
  song: Song | null;
  isOpen: boolean;
  onClose: () => void;
  breakdown?: ScoreBreakdown | null;
  query?: string;
}

export const LyricsDrawer: React.FC<LyricsDrawerProps> = ({
  song,
  isOpen,
  onClose,
  breakdown
}) => {
  if (!isOpen || !song) return null;

  const renderHighlightedLyrics = (text: string) => {
    if (!text) return null;
    if (!breakdown || !breakdown.matchedTerms || breakdown.matchedTerms.length === 0) {
      return <div className="lyrics-content">{text}</div>;
    }

    const terms = breakdown.matchedTerms.filter(t => t.length > 2);
    if (terms.length === 0) {
      return <div className="lyrics-content">{text}</div>;
    }

    const escapedTerms = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${escapedTerms})`, 'gi');
    const parts = text.split(regex);

    return (
      <div className="lyrics-content">
        {parts.map((part, idx) => {
          const isMatch = terms.some(t => part.toLowerCase() === t.toLowerCase());
          if (isMatch) {
            return (
              <span 
                key={idx} 
                style={{
                  background: 'rgba(16, 185, 129, 0.3)',
                  color: '#34d399',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid rgba(16, 185, 129, 0.5)'
                }}
                title="Matched by IR Tokenizer"
              >
                {part}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="lyrics-drawer-overlay" onClick={onClose}>
      <div className="lyrics-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="lyrics-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <img src={song.coverUrl} alt={song.title} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</span>
                <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent)', fontWeight: 800, padding: '2px 8px', borderRadius: '50px' }}>
                  {song.language}
                </span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>{song.artist}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Album: {song.album} ({song.releaseYear})</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ctrl-btn"
            style={{ padding: '8px', background: 'var(--bg-secondary)', borderRadius: '50%', border: '1px solid var(--border)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Lyrics & IR Highlighting Section */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Audio Features Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Activity size={14} style={{ color: 'var(--accent)' }} />
                Tempo
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{song.features.tempo} BPM</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Sparkles size={14} style={{ color: '#fbbf24' }} />
                Energy
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{Math.round(song.features.energy * 100)}%</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Heart size={14} style={{ color: '#f43f5e' }} />
                Valence
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{Math.round(song.features.valence * 100)}%</div>
            </div>
          </div>

          {/* Complete Lyrics Box */}
          <div style={{ background: 'rgba(18, 18, 21, 0.6)', padding: '20px', borderRadius: '18px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#10b981', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Music size={16} />
              <span>✨ MusicMix AI Synchronized Lyrics {breakdown && breakdown.matchedTerms.length > 0 ? '(IR Keyword Highlights)' : ''}</span>
            </div>
            {renderHighlightedLyrics(song.lyrics)}
          </div>

          {/* Clean IR Information Badge */}
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={24} style={{ color: '#10b981', flexShrink: 0 }} />
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: '#fff' }}>MusicMix Real-Time Lyrical Synthesis</strong> — Available for each & every song worldwide! Indexed in 1,048,576 Track Okapi BM25 Sharded Memory.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
