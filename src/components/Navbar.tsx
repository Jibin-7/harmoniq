import React, { useState } from 'react';
import { Search, SlidersHorizontal, Globe, Sparkles, X, Filter, Zap, Compass, Flame, Music2, User, LogOut } from 'lucide-react';
import { SearchFilter, UserProfile } from '../engine/types';

interface NavbarProps {
  filter: SearchFilter;
  onFilterChange: React.Dispatch<React.SetStateAction<SearchFilter>>;
  onSearchLiveAPI: (query: string) => Promise<void>;
  isSearchingLive: boolean;
  totalResults: number;
  currentUser?: UserProfile;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  filter,
  onFilterChange,
  onSearchLiveAPI,
  isSearchingLive,
  totalResults,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onFilterChange(prev => ({ ...prev, query: val }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filter.query.trim().length >= 1) {
      onSearchLiveAPI(filter.query);
    }
  };

  const clearSearch = () => {
    onFilterChange(prev => ({ ...prev, query: '' }));
  };

  const handlePillClick = (queryText: string) => {
    onFilterChange(prev => ({ ...prev, query: queryText, language: 'All', genre: 'All' }));
    onSearchLiveAPI(queryText);
  };

  const discoveryPills = [
    { label: '⚡ 1M Global Hits', q: 'Global Hits 2024' },
    { label: '🔥 2024–2025 Viral Pop', q: 'Sabrina Carpenter' },
    { label: '🎸 1970s Classic Rock', q: 'Rock Legend 1970' },
    { label: '💕 Bollywood Romance', q: 'Arijit Singh Love' },
    { label: '🥁 Punjabi Club Beats', q: 'Karan Aujla Tauba' },
    { label: '🎧 Chill & Focus', q: 'Peaceful Acoustic' },
    { label: '🎤 90s Grunge & Pop', q: 'Nirvana 1990s' },
    { label: '🌟 K-Pop Superstars', q: 'BTS K-Pop' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            value={filter.query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            placeholder="Search 1,000,000+ tracks by song title, lyrics, artist, mood, language..."
            className="search-input"
          />
          <div className="search-actions">
            {filter.query && (
              <button
                onClick={clearSearch}
                className="clear-btn"
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions & Filter Toggle */}
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {currentUser && onOpenAuth && (
            <button
              onClick={onOpenAuth}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 14px 4px 5px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(6, 182, 212, 0.12))',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '50px',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
              }}
              title="Click to Personalize Account & Switch Profiles"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #10b981' }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{currentUser.name}</span>
                <span style={{ fontSize: '9px', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🎵 Music Persona
                </span>
              </div>
            </button>
          )}

          {currentUser && onLogout && (
            <button
              onClick={onLogout}
              style={{
                padding: '8px 12px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '20px',
                color: '#f87171',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 800,
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; e.currentTarget.style.color = '#f87171'; }}
              title="Log Out and return to Login Screen"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          )}

          <div className="index-badge" style={{ padding: '6px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ fontWeight: 700, color: '#fff', fontSize: '12px' }}>
              1M+ IR Index <span style={{ color: '#10b981' }}>(0.4ms)</span>
            </span>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
          >
            <SlidersHorizontal size={15} />
            <span>Search Options</span>
          </button>
        </div>
      </div>

      {/* One-Click Discovery Pills (Only shown when not searching for ultra-clean UI) */}
      {!filter.query && (
        <div className="discovery-pills-bar">
          <span className="pills-label">
            <Compass size={14} style={{ color: 'var(--accent)' }} />
            <span>Quick Explore:</span>
          </span>
          <div className="pills-scroll">
            {discoveryPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handlePillClick(pill.q)}
                className={`discovery-pill ${filter.query.toLowerCase().includes(pill.q.toLowerCase().split(' ')[0]) ? 'active' : ''}`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Expandable Search Options Panel */}
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group">
            <span className="filter-label">
              <Filter size={14} style={{ color: 'var(--accent)' }} />
              Target Field:
            </span>
            {(['all', 'title', 'artist', 'lyrics', 'genre', 'mood'] as SearchFilter['searchField'][]).map(field => (
              <button
                key={field}
                onClick={() => onFilterChange(prev => ({ ...prev, searchField: field }))}
                className={`filter-pill ${filter.searchField === field ? 'active' : ''}`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span className="filter-label">Sort By:</span>
            {(['relevance', 'title', 'artist', 'newest', 'tempo'] as SearchFilter['sortBy'][]).map(sort => (
              <button
                key={sort}
                onClick={() => onFilterChange(prev => ({ ...prev, sortBy: sort }))}
                className={`filter-pill ${filter.sortBy === sort ? 'active' : ''}`}
              >
                {sort === 'relevance' ? '🚀 BM25 Vibe Score' : sort === 'newest' ? '📅 Newest Release' : sort.charAt(0).toUpperCase() + sort.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
