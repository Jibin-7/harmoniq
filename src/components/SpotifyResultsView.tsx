import React from 'react';
import { IRResult, Song } from '../engine/types';
import { Play, Pause, Heart, Disc, Mic, Sparkles, Clock, Music, CheckCircle } from 'lucide-react';

interface SpotifyResultsViewProps {
  results: IRResult[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  likedSongs: Set<string>;
  onToggleLike: (song: Song, e: React.MouseEvent) => void;
  onOpenLyrics: (song: Song, e: React.MouseEvent) => void;
  onSelectFilter: (query: string) => void;
}

export const SpotifyResultsView: React.FC<SpotifyResultsViewProps> = ({
  results,
  currentSong,
  isPlaying,
  onPlaySong,
  likedSongs,
  onToggleLike,
  onOpenLyrics,
  onSelectFilter,
}) => {
  if (!results || results.length === 0) return null;

  const topResult = results[0];
  const displayTracks = results.slice(0, 40);
  const uniqueArtists = Array.from(new Set(results.map(r => r.song.artist))).slice(0, 5);
  const uniqueAlbums = Array.from(
    new Map(results.map(r => [r.song.album, r.song])).values()
  ).slice(0, 5);

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return "3:40";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isTopPlaying = currentSong?.id === topResult.song.id && isPlaying;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', marginTop: '12px' }}>
      
      {/* 1. ULTRA-CLEAN FULL-WIDTH SPOTIFY HEADER BANNER */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(14, 165, 233, 0.1))',
          padding: '32px', 
          borderRadius: '24px', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img 
            src={topResult.song.coverUrl} 
            alt={topResult.song.title} 
            style={{ width: '150px', height: '150px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 12px 30px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)' }} 
          />
          <button
            onClick={() => onPlaySong(topResult.song)}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#10b981',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(16,185,129,0.6)',
              cursor: 'pointer',
              color: '#000',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isTopPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" style={{ marginLeft: '2px' }} />}
          </button>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ 
              background: '#10b981', 
              color: '#000', 
              fontSize: '11px', 
              fontWeight: 800, 
              padding: '4px 12px', 
              borderRadius: '20px', 
              textTransform: 'uppercase',
              letterSpacing: '0.8px'
            }}>
              Top Match ({topResult.score} IR Score)
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>
              ✨ MusicMix AI Synchronized Lyrics Ready
            </span>
          </div>

          {topResult.breakdown && topResult.breakdown.explanation && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.4)', padding: '6px 14px', borderRadius: '14px', marginBottom: '10px', color: '#06b6d4', fontSize: '12px', fontWeight: 700 }}>
              <Sparkles size={14} />
              <span>IR Intent Recognized:</span>
              <span style={{ color: '#fff' }}>{topResult.breakdown.explanation}</span>
            </div>
          )}

          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#fff', margin: '4px 0 8px 0', letterSpacing: '-1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {topResult.song.title}
          </h1>

          <div style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '20px' }}>
            <strong style={{ color: '#fff' }}>{topResult.song.artist}</strong> • {topResult.song.album} ({topResult.song.releaseYear}) • <span style={{ color: '#10b981' }}>{topResult.song.genre}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => onPlaySong(topResult.song)}
              style={{
                padding: '12px 28px',
                background: '#10b981',
                color: '#000',
                border: 'none',
                borderRadius: '50px',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isTopPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              <span>{isTopPlaying ? 'Pause Top Match' : 'Play Top Match'}</span>
            </button>

            <button
              onClick={(e) => onOpenLyrics(topResult.song, e)}
              style={{
                padding: '12px 22px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
            >
              <Music size={16} style={{ color: '#10b981' }} />
              <span>✨ View MusicMix Lyrics & IR</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH SPACIOUS TRACKLIST TABLE (Shows up to 40 tracks cleanly without squishing!) */}
      <div>
        <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Complete Tracklist ({results.length} Songs Available)</span>
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>⚡ 1,048,576 Track Sharded Okapi BM25 Index Active</span>
        </div>
        
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '20px', border: '1px solid var(--border)', overflow: 'hidden', padding: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                <th style={{ padding: '14px 16px', width: '50px' }}>#</th>
                <th style={{ padding: '14px 16px' }}>Title / Artist</th>
                <th style={{ padding: '14px 16px' }}>Album</th>
                <th style={{ padding: '14px 16px', textAlign: 'center' }}>MusicMix AI Lyrics</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}><Clock size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></th>
              </tr>
            </thead>
            <tbody>
              {displayTracks.map((item, index) => {
                const isThisPlaying = currentSong?.id === item.song.id && isPlaying;
                const isLiked = likedSongs.has(item.song.id);
                return (
                  <tr 
                    key={item.song.id}
                    onClick={() => onPlaySong(item.song)}
                    style={{ 
                      borderBottom: index < displayTracks.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      background: isThisPlaying ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = isThisPlaying ? 'rgba(16, 185, 129, 0.1)' : 'transparent'}
                  >
                    <td style={{ padding: '14px 16px', color: isThisPlaying ? '#10b981' : 'var(--text-muted)', fontWeight: 700, fontSize: '13px' }}>
                      {isThisPlaying ? <Pause size={14} fill="currentColor" /> : index + 1}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img src={item.song.coverUrl} alt={item.song.title} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ color: isThisPlaying ? '#10b981' : '#fff', fontWeight: 800, fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.song.title}
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                            {item.song.artist}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
                      {item.song.album}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLyrics(item.song, e);
                        }}
                        style={{
                          padding: '6px 14px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '20px',
                          color: '#10b981',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#10b981';
                          e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                          e.currentTarget.style.color = '#10b981';
                        }}
                      >
                        <Music size={12} />
                        <span>✨ MusicMix Lyrics</span>
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '14px' }}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleLike(item.song, e);
                          }}
                          style={{ background: 'transparent', border: 'none', color: isLiked ? '#f43f5e' : 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                          title={isLiked ? "Remove from Liked" : "Like Song"}
                        >
                          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                        </button>
                        <span style={{ minWidth: '36px' }}>{formatTime(item.song.duration || 230)}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. CLEAN CIRCULAR ARTIST GRID */}
      {uniqueArtists.length > 0 && (
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mic size={18} style={{ color: '#a855f7' }} />
            Featuring Artists
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
            {uniqueArtists.map((artistName, idx) => {
              const sampleSong = results.find(r => r.song.artist === artistName)?.song;
              return (
                <div
                  key={idx}
                  onClick={() => onSelectFilter(artistName)}
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img 
                      src={sampleSong?.coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80'} 
                      alt={artistName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '130px' }}>
                      {artistName}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                      Artist Profile
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. CLEAN ALBUM GRID */}
      {uniqueAlbums.length > 0 && (
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Disc size={18} style={{ color: '#3b82f6' }} />
            Albums & Singles
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
            {uniqueAlbums.map((albumSong, idx) => (
              <div
                key={idx}
                onClick={() => onSelectFilter(albumSong.album)}
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '14px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img 
                  src={albumSong.coverUrl} 
                  alt={albumSong.album} 
                  style={{ width: '100%', aspectRatio: '1', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 4px 14px rgba(0,0,0,0.4)' }} 
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {albumSong.album}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {albumSong.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
