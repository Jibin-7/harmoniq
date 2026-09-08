import React from 'react';
import { 
  Home, Compass, Heart, Cpu, Globe2, Disc, Zap, Database, Layers, Radio, User, Sparkles, LogOut
} from 'lucide-react';
import { MusicLanguage, UserProfile } from '../engine/types';
import { GLOBAL_CATALOG_STATS } from '../engine/dataset';

interface SidebarProps {
  currentTab: 'home' | 'discover' | 'liked' | 'ir-info';
  onSelectTab: (tab: 'home' | 'discover' | 'liked' | 'ir-info') => void;
  selectedLanguage: MusicLanguage | 'All';
  onSelectLanguage: (lang: MusicLanguage | 'All') => void;
  likedCount: number;
  currentUser?: UserProfile;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  selectedLanguage,
  onSelectLanguage,
  likedCount,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const languages: (MusicLanguage | 'All')[] = [
    'All', 'English', 'Hindi', 'Punjabi', 'Tamil', 'Telugu', 
    'Malayalam', 'Spanish', 'Korean', 'Japanese', 'French', 
    'German', 'Arabic', 'Russian', 'Portuguese', 'Italian', 'Mandarin'
  ];

  return (
    <aside className="sidebar">
      <div>
        {/* Premium Brand Logo */}
        <div 
          onClick={() => onSelectTab('home')}
          className="sidebar-logo"
        >
          <div className="logo-icon">
            <Disc size={26} className="spin-slow" />
          </div>
          <div>
            <div className="logo-text">
              Harmoni<span style={{ color: 'var(--accent)', textShadow: '0 0 15px rgba(16, 185, 129, 0.6)' }}>Q</span>
            </div>
            <div className="logo-subtext">1M+ Track IR Platform</div>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="sidebar-nav">
          <button
            onClick={() => onSelectTab('home')}
            className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
          >
            <div className="nav-item-left">
              <Home size={18} />
              <span>Home & Catalog</span>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('discover')}
            className={`nav-item ${currentTab === 'discover' ? 'active' : ''}`}
          >
            <div className="nav-item-left">
              <Compass size={18} />
              <span>Vibe & Mood Engine</span>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('liked')}
            className={`nav-item ${currentTab === 'liked' ? 'active' : ''}`}
          >
            <div className="nav-item-left">
              <Heart size={18} style={{ fill: currentTab === 'liked' ? '#000' : '#f43f5e', color: currentTab === 'liked' ? '#000' : '#f43f5e' }} />
              <span>Liked Favorites</span>
            </div>
            {likedCount > 0 && (
              <span className="liked-badge">{likedCount}</span>
            )}
          </button>
        </nav>

        {/* Culture & Language Filter Section */}
        <div className="culture-section">
          <div className="culture-title">
            <Globe2 size={13} style={{ color: 'var(--accent)' }} />
            <span>Culture & Language Filter</span>
          </div>

          <div className="culture-list">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  onSelectLanguage(lang);
                  if (currentTab !== 'home') onSelectTab('home');
                }}
                className={`culture-btn ${selectedLanguage === lang ? 'active' : ''}`}
              >
                <span>{lang === 'All' ? '🌐 All Cultures (1M+ Hits)' : lang}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clean Minimalism: Simple IR Architecture Link & User Profile Card */}
      <div className="sidebar-footer" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentUser && onOpenAuth && (
          <div
            onClick={onOpenAuth}
            style={{
              padding: '12px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.08))',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.35)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #10b981', flexShrink: 0 }} 
            />
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div style={{ color: '#fff', fontSize: '13px', fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentUser.name}
              </div>
              <div style={{ color: '#06b6d4', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={11} />
                <span>Active • {currentUser.listeningHours} hrs</span>
              </div>
            </div>
          </div>
        )}

        {currentUser && onLogout && (
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '12px',
              color: '#f87171',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 800,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)'; e.currentTarget.style.color = '#f87171'; }}
          >
            <LogOut size={14} />
            <span>Log Out of HarmoniQ</span>
          </button>
        )}

        <button
          onClick={() => onSelectTab('ir-info')}
          className={`ir-info-btn ${currentTab === 'ir-info' ? 'active' : ''}`}
          style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          <Cpu size={18} style={{ color: '#10b981' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#fff', fontSize: '13px', fontWeight: 800 }}>IR Architecture</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>System Diagnostics</div>
          </div>
        </button>
      </div>
    </aside>
  );
};
