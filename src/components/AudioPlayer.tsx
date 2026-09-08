import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Heart, Repeat, Shuffle, FileText, Sparkles
} from 'lucide-react';
import { Song } from '../engine/types';

interface AudioPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  isLiked: boolean;
  onToggleLike: (song: Song, e: React.MouseEvent) => void;
  onOpenLyrics: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  isLiked,
  onToggleLike,
  onOpenLyrics,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Sync play/pause state with HTML5 audio element
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.warn('Audio play prevented by browser policy:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // Sync volume & mute adjustments
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Handle track switching
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    setProgress(0);
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(Math.floor(audioRef.current.currentTime));
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    const dur = Math.floor(audioRef.current.duration);
    if (dur && !isNaN(dur) && dur > 0) {
      setDuration(dur);
    } else {
      setDuration(30);
    }
  };

  // Seek slider drag handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setProgress(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  if (!currentSong) return null;

  return (
    <div 
      className="audio-player" 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '86px',
        maxHeight: '86px',
        minHeight: '86px',
        zIndex: 9999,
        background: 'rgba(9, 9, 13, 0.95)',
        backdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(16, 185, 129, 0.3)',
        padding: '0 32px',
        boxShadow: '0 -10px 35px rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      {/* HTML5 Audio Player for reliable, instant 30-sec preview streaming */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNext}
      />

      <div 
        className="player-inner" 
        style={{
          width: '100%',
          maxWidth: '1500px',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '260px 1fr 300px',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Left: Cover Art & Metadata */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ position: 'relative', flexShrink: 0, width: '54px', height: '54px' }}>
            <img 
              src={currentSong.coverUrl} 
              alt={currentSong.title} 
              className="player-cover-img"
              style={{ width: '54px', height: '54px', minWidth: '54px', minHeight: '54px', borderRadius: '10px', objectFit: 'cover', backgroundColor: '#18181b', boxShadow: isPlaying ? '0 0 15px rgba(16, 185, 129, 0.4)' : '0 4px 12px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', display: 'block', transition: 'box-shadow 0.3s' }} 
            />
            {isPlaying && (
              <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', background: '#10b981', borderRadius: '50%', padding: '2px', display: 'flex', boxShadow: '0 0 10px #10b981' }}>
                <Sparkles size={10} color="#000" />
              </div>
            )}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '14px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={currentSong.title}>
              {currentSong.title}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }} title={currentSong.artist}>
              {currentSong.artist} • <span style={{ color: '#10b981', fontWeight: 700 }}>30s Preview</span>
            </div>
          </div>
          <button 
            onClick={(e) => onToggleLike(currentSong, e)} 
            style={{ background: 'transparent', border: 'none', color: isLiked ? '#f43f5e' : 'var(--text-muted)', cursor: 'pointer', padding: '6px', transition: 'transform 0.2s', flexShrink: 0 }}
            title={isLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Center: Horizontal Controls & Seek Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', gap: '6px', width: '100%', maxWidth: '620px', margin: '0 auto' }}>
          {/* Strict Horizontal Button Row */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '24px', width: '100%' }}>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }} title="Shuffle (IR Randomizer)">
              <Shuffle size={16} />
            </button>
            <button onClick={onPrev} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }} title="Previous Track">
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button 
              onClick={onTogglePlay} 
              style={{ 
                width: '42px', height: '42px', borderRadius: '50%', 
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', color: '#000', border: 'none', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                cursor: 'pointer', boxShadow: isPlaying ? '0 0 20px rgba(16, 185, 129, 0.6)' : 'none',
                transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.2s', flexShrink: 0
              }}
              title={isPlaying ? "Pause Preview" : "Play Preview"}
            >
              {isPlaying ? <Pause size={20} fill="#000" /> : <Play size={20} fill="#000" style={{ marginLeft: '2px' }} />}
            </button>
            <button onClick={onNext} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }} title="Next Track">
              <SkipForward size={20} fill="currentColor" />
            </button>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }} title="Repeat">
              <Repeat size={16} />
            </button>
          </div>

          {/* Seek Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
            <span style={{ minWidth: '32px', textAlign: 'right' }}>
              {formatTime(progress)}
            </span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <input 
                type="range" 
                min={0} 
                max={duration || 30} 
                value={progress} 
                onChange={handleSeek}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#10b981', height: '4px' }}
              />
            </div>
            <span style={{ minWidth: '32px' }}>
              {formatTime(duration || 30)}
            </span>
          </div>
        </div>

        {/* Right: Equalizer, Lyrics Drawer Trigger, Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'flex-end' }}>
          {/* HD Audio Spectrum Analyzer Visualizer */}
          <div 
            className={`hd-audio-spectrum ${isPlaying ? 'playing' : 'paused'}`}
            title={isPlaying ? "Click to Pause Audio" : "Click to Play Audio"}
            onClick={onTogglePlay}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((barNum) => (
              <div
                key={barNum}
                className={`spectrum-bar spectrum-bar-${barNum}`}
              />
            ))}
          </div>

          <button 
            onClick={onOpenLyrics} 
            style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '50px', color: '#10b981', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            title="Open Synchronized Lyrics Drawer"
          >
            <FileText size={15} color="#10b981" />
            <span>Lyrics & IR</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input 
              type="range" 
              min={0} 
              max={1} 
              step={0.01} 
              value={isMuted ? 0 : volume} 
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              style={{ width: '75px', cursor: 'pointer', accentColor: '#10b981', height: '4px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
