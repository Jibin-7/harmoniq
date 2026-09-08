import React, { useState } from 'react';
import { UserProfile } from '../engine/types';
import { Sparkles, Check, User, Mail, Shield, Award, Globe, Music, Heart, X, LogIn, UserPlus, Sliders, CheckCircle2, Zap } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const AVATAR_GRADIENTS: [string, string][] = [
  ['#10b981', '#06b6d4'], // Emerald / Cyan
  ['#8b5cf6', '#ec4899'], // Violet / Pink
  ['#f59e0b', '#ef4444'], // Amber / Red
  ['#3b82f6', '#1d4ed8'], // Blue / Deep Blue
  ['#14b8a6', '#0f766e'], // Teal / Deep Teal
  ['#6366f1', '#a855f7'], // Indigo / Purple
  ['#ec4899', '#f43f5e'], // Pink / Rose
  ['#eab308', '#ca8a04']  // Yellow / Gold
];

export const createAvatarSVG = (name: string, bgColors: [string, string]): string => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'HQ';
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <linearGradient id="g-${initials}-${bgColors[0].replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgColors[0]}" />
        <stop offset="100%" stop-color="${bgColors[1]}" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="50" fill="url(#g-${initials}-${bgColors[0].replace('#','')})" />
    <text x="50" y="58" font-family="Inter, -apple-system, sans-serif" font-size="38" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  </svg>`;
  
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const ALL_LANGUAGES = ['English', 'Hindi', 'Punjabi', 'Spanish', 'Korean', 'Japanese', 'Tamil', 'Telugu', 'Malayalam', 'Arabic'];
const ALL_GENRES = ['Pop', 'Bollywood', 'Punjabi Beats', 'EDM', 'Rock', 'Hip-Hop', 'R&B', 'K-Pop', 'Lo-Fi', 'Latin'];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentUser, onUpdateUser }) => {
  const [name, setName] = useState<string>(currentUser.name);
  const [email, setEmail] = useState<string>(currentUser.email);
  const [avatar, setAvatar] = useState<string>(currentUser.avatar);
  const [favLanguages, setFavLanguages] = useState<string[]>(currentUser.favoriteLanguages || ['English', 'Hindi']);
  const [favGenres, setFavGenres] = useState<string[]>(currentUser.favoriteGenres || ['Pop', 'EDM']);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleToggleLang = (lang: string) => {
    if (favLanguages.includes(lang)) {
      if (favLanguages.length > 1) setFavLanguages(favLanguages.filter(l => l !== lang));
    } else {
      setFavLanguages([...favLanguages, lang]);
    }
  };

  const handleToggleGenre = (genre: string) => {
    if (favGenres.includes(genre)) {
      if (favGenres.length > 1) setFavGenres(favGenres.filter(g => g !== genre));
    } else {
      setFavGenres([...favGenres, genre]);
    }
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      name: name.trim() || 'Music Explorer',
      email: email.trim() || 'user@harmoniq.ai',
      avatar,
      favoriteLanguages: favLanguages,
      favoriteGenres: favGenres
    };
    onUpdateUser(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '580px',
        backgroundColor: 'rgba(18, 18, 26, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '28px',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(16, 185, 129, 0.05)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900, boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)' }}>
              <Sliders size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>Account Preferences</h2>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Personalize your acoustic vector profile & studio identity</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
          <form onSubmit={handleSavePreferences} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Display Name & Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px' }}>Display Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                      // Auto-update initials avatar when name changes if current avatar is an SVG
                      if (avatar.startsWith('data:image/svg+xml')) {
                        setAvatar(createAvatarSVG(e.target.value || 'User', ['#10b981', '#06b6d4']));
                      }
                    }}
                    placeholder="Your Name"
                    style={{ width: '100%', padding: '12px 14px 12px 40px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', color: '#fff', fontSize: '14px', fontWeight: 600, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px' }}>Registered Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@company.com"
                    style={{ width: '100%', padding: '12px 14px 12px 40px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', color: '#fff', fontSize: '14px', fontWeight: 600, outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* Studio Initials Avatar Selector */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '10px' }}>Studio Initials Avatar Style</label>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', alignItems: 'center' }}>
                {AVATAR_GRADIENTS.map((pair, i) => {
                  const svgUrl = createAvatarSVG(name || 'User', pair);
                  const isSelected = avatar === svgUrl;
                  return (
                    <img
                      key={i}
                      src={svgUrl}
                      alt=""
                      onClick={() => setAvatar(svgUrl)}
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: isSelected ? '3px solid #10b981' : '2px solid rgba(255, 255, 255, 0.1)',
                        opacity: isSelected ? 1 : 0.75,
                        transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none',
                        flexShrink: 0
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Favorite Languages */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <Globe size={14} color="#06b6d4" />
                <span>Primary Acoustic Languages (Vector Boost)</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ALL_LANGUAGES.map(lang => {
                  const isFav = favLanguages.includes(lang);
                  return (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => handleToggleLang(lang)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '50px',
                        border: isFav ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isFav ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                        color: isFav ? '#06b6d4' : 'var(--text-secondary)',
                        fontSize: '13px',
                        fontWeight: isFav ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isFav ? `✓ ${lang}` : lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Favorite Genres */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <Music size={14} color="#10b981" />
                <span>Favorite Genres (Recommendation Engine)</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ALL_GENRES.map(genre => {
                  const isFav = favGenres.includes(genre);
                  return (
                    <button
                      type="button"
                      key={genre}
                      onClick={() => handleToggleGenre(genre)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '50px',
                        border: isFav ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isFav ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                        color: isFav ? '#10b981' : 'var(--text-secondary)',
                        fontSize: '13px',
                        fontWeight: isFav ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isFav ? `✓ ${genre}` : genre}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSaved}
              style={{
                width: '100%',
                padding: '16px',
                background: isSaved ? '#10b981' : 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: 900,
                cursor: isSaved ? 'default' : 'pointer',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                marginTop: '12px'
              }}
            >
              {isSaved ? (
                <>
                  <Check size={20} />
                  <span>Preferences Saved to Profile!</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Save Account Preferences</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
