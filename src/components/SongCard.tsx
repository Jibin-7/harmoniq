import React from 'react';
import { Play, Pause, Heart, FileText, Sparkles, Tv, Zap, Disc } from 'lucide-react';
import { Song, IRResult } from '../engine/types';

interface SongCardProps {
  item: IRResult;
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  isLiked: boolean;
  onToggleLike: (song: Song, e: React.MouseEvent) => void;
  onOpenLyrics: (song: Song, e: React.MouseEvent) => void;
  showScore?: boolean;
}

export const SongCard: React.FC<SongCardProps> = ({
  item,
  currentSong,
  isPlaying,
  onPlay,
  isLiked,
  onToggleLike,
  onOpenLyrics,
  showScore = false
}) => {
  const { song, score } = item;
  const isThisPlaying = currentSong?.id === song.id && isPlaying;

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const matchPercentage = showScore && score > 0
    ? Math.min(99, Math.max(68, Math.round(62 + (score / (score + 5)) * 37)))
    : null;

  return (
    <div 
      onClick={() => onPlay(song)}
      className={`song-card ${isThisPlaying ? 'playing' : ''}`}
    >
      {/* Top Image & Overlay Actions */}
      <div className="card-img-wrapper">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="card-img"
          loading="lazy"
        />

        {/* Top Right Like Heart */}
        <button
          onClick={(e) => onToggleLike(song, e)}
          className={`card-like-btn ${isLiked ? 'liked' : ''}`}
          title="Like this track"
        >
          <Heart size={16} style={{ fill: isLiked ? '#f43f5e' : 'none' }} />
        </button>

        {/* Top Left Duration & Audio Type Badge */}
        <div className="card-badge">
          {song.youtubeId ? <Tv size={12} style={{ color: '#10b981' }} /> : <Disc size={12} style={{ color: '#06b6d4' }} />}
          <span>{formatDuration(song.duration || 210)}</span>
        </div>

        {/* Center Hover / Playing Play Button */}
        <div className="card-play-overlay">
          <div className="play-btn-circle">
            {isThisPlaying ? (
              <Pause size={24} style={{ fill: '#000' }} />
            ) : (
              <Play size={24} style={{ fill: '#000', marginLeft: '3px' }} />
            )}
          </div>
        </div>

        {/* Bottom Equalizer Animation when Currently Playing */}
        {isThisPlaying && (
          <div className="playing-eq-bars">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
            <span className="bar bar-4"></span>
          </div>
        )}
      </div>

      {/* Song Info & Rich Metadata */}
      <div className="card-content">
        <div>
          <div className="card-title-row">
            <div className="card-title" title={song.title}>{song.title}</div>
            {matchPercentage && (
              <span className="ir-score-pill">
                <Zap size={10} style={{ fill: '#10b981', color: '#10b981' }} />
                {matchPercentage}%
              </span>
            )}
          </div>
          <div className="card-artist" title={song.artist}>{song.artist}</div>
        </div>

        {/* Culture, Genre & Lyrics Button */}
        <div className="card-footer">
          <div className="card-tags">
            <span className="tag-pill language-pill">{song.language}</span>
            <span className="tag-pill genre-pill">{song.genre}</span>
          </div>

          <button
            onClick={(e) => onOpenLyrics(song, e)}
            className="lyrics-trigger-btn"
            title="View Complete Lyrics & BM25 IR Vector Breakdown"
          >
            <FileText size={14} style={{ color: 'var(--accent)' }} />
            <span>Lyrics & IR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
