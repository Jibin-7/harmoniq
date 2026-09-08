import React from 'react';
import { Sparkles, Compass, User, Globe2, Music, Heart, Play, Sliders, Award, Zap, Radio, Flame, ShieldCheck, ArrowRight } from 'lucide-react';
import { MusicGenre, MusicMood, MusicLanguage, UserProfile } from '../engine/types';

interface DiscoverViewProps {
  onSelectVibe: (vibe: { genre?: MusicGenre; mood?: MusicMood; language?: MusicLanguage; query?: string }) => void;
  currentUser?: UserProfile;
  onOpenAuth?: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({ onSelectVibe, currentUser, onOpenAuth }) => {
  // Dynamic Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const name = currentUser ? currentUser.name : 'Music Explorer';
  const favLangs = currentUser?.favoriteLanguages || ['Hindi', 'Punjabi', 'English'];
  const favGenres = currentUser?.favoriteGenres || ['Bollywood', 'EDM', 'Pop'];

  const vibes = [
    {
      title: '⚡ High Energy Party Beats',
      desc: 'Upbeat club anthems, EDM drops, and dance floor hits',
      color: 'linear-gradient(135deg, rgba(217, 119, 6, 0.45) 0%, rgba(120, 53, 15, 0.8) 100%)',
      borderColor: 'rgba(245, 158, 11, 0.4)',
      action: () => onSelectVibe({ mood: 'Party', query: 'party energetic dance' })
    },
    {
      title: '🔥 Punjabi Bhangra & Desi Trap',
      desc: 'Diljit Dosanjh, AP Dhillon, Karan Aujla, and bass-boosted hits',
      color: 'linear-gradient(135deg, rgba(234, 88, 12, 0.45) 0%, rgba(153, 27, 27, 0.8) 100%)',
      borderColor: 'rgba(249, 115, 22, 0.4)',
      action: () => onSelectVibe({ genre: 'Punjabi Beats', language: 'Punjabi', query: 'punjabi lover brown munde' })
    },
    {
      title: '💖 Bollywood Romantic Melodies',
      desc: 'Arijit Singh, Shreya Ghoshal, and soulful acoustic heartbreak songs',
      color: 'linear-gradient(135deg, rgba(225, 29, 72, 0.45) 0%, rgba(136, 19, 55, 0.8) 100%)',
      borderColor: 'rgba(244, 63, 94, 0.4)',
      action: () => onSelectVibe({ genre: 'Bollywood', mood: 'Romantic', language: 'Hindi', query: 'arijit romantic tum hi ho' })
    },
    {
      title: '🌟 K-Pop & J-Pop Icons',
      desc: 'BTS, BLACKPINK, YOASOBI, and high-tempo anime melodies',
      color: 'linear-gradient(135deg, rgba(147, 51, 234, 0.45) 0%, rgba(79, 70, 229, 0.8) 100%)',
      borderColor: 'rgba(168, 85, 247, 0.4)',
      action: () => onSelectVibe({ query: 'kpop jpop bts blackpink yoasobi' })
    },
    {
      title: '🧘 Lo-Fi & Deep Focus Rain',
      desc: 'Calm instrumental beats for studying and coding in the rain',
      color: 'linear-gradient(135deg, rgba(8, 145, 178, 0.45) 0%, rgba(22, 78, 99, 0.8) 100%)',
      borderColor: 'rgba(6, 182, 212, 0.4)',
      action: () => onSelectVibe({ genre: 'Lo-Fi', mood: 'Focus', query: 'lo-fi study focus midnight' })
    },
    {
      title: '🎸 Heavy Rock & Workout Mass',
      desc: 'Queen, Rammstein, Anirudh mass beats, and intense guitar riffs',
      color: 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(6, 78, 59, 0.8) 100%)',
      borderColor: 'rgba(16, 185, 129, 0.4)',
      action: () => onSelectVibe({ mood: 'Workout', query: 'rock workout mass energy' })
    },
    {
      title: '💃 Reggaeton & Latin Romance',
      desc: 'Luis Fonsi, Bad Bunny, and Puerto Rican dance floor rhythms',
      color: 'linear-gradient(135deg, rgba(202, 138, 4, 0.45) 0%, rgba(113, 63, 18, 0.8) 100%)',
      borderColor: 'rgba(234, 179, 8, 0.4)',
      action: () => onSelectVibe({ genre: 'Latin', language: 'Spanish', query: 'despacito latin bad bunny' })
    },
    {
      title: '🌐 Global Viral Top 50 Index',
      desc: 'Trending international hits across French, Arabic, and Russian',
      color: 'linear-gradient(135deg, rgba(79, 70, 229, 0.45) 0%, rgba(49, 46, 129, 0.8) 100%)',
      borderColor: 'rgba(99, 102, 241, 0.4)',
      action: () => onSelectVibe({ query: 'indila saad rammstein maneskin global' })
    }
  ];

  return (
    <div className="view-container" style={{ paddingBottom: '60px' }}>
      
      {/* 1. PERSONALIZED LUXURY HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.12), rgba(168, 85, 247, 0.1))',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        borderRadius: '28px',
        padding: '36px',
        marginBottom: '36px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(16, 185, 129, 0.1)'
      }}>
        {/* Decorative Background Glow */}
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {currentUser && (
              <div style={{ position: 'relative' }}>
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  style={{ width: '92px', height: '92px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #10b981', boxShadow: '0 8px 30px rgba(16, 185, 129, 0.5)' }} 
                />
                <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'linear-gradient(135deg, #10b981, #06b6d4)', borderRadius: '50%', padding: '6px', display: 'flex', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                  <Sparkles size={14} color="#000" />
                </div>
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 12px', borderRadius: '50px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                  🎵 ACTIVE MUSIC PERSONA
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  • 1,000,000+ Track IR Engine Ready
                </span>
              </div>

              <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#fff', margin: '0 0 10px 0', letterSpacing: '-1px', textShadow: '0 4px 15px rgba(0,0,0,0.6)' }}>
                {getGreeting()}, {name}!
              </h1>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Your Acoustic Focus:</span>
                {favLangs.map((l, i) => (
                  <span key={i} style={{ fontSize: '12px', fontWeight: 800, background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4', padding: '3px 10px', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>{l}</span>
                ))}
                {favGenres.map((g, i) => (
                  <span key={i} style={{ fontSize: '12px', fontWeight: 800, background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '3px 10px', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>{g}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                style={{
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '15px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Sliders size={18} />
                <span>Personalize Account & Mix</span>
              </button>
            )}
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>Tailoring hybrid vector cosine weights</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. "MADE FOR YOU" DAILY CURATED MIXES */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '24px', background: 'linear-gradient(180deg, #10b981, #06b6d4)', borderRadius: '4px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', margin: 0 }}>
              Made For {name} • Daily AI Curations
            </h2>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Based on your listening history & culture prefs</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          {/* Daily Mix 1 */}
          <div 
            onClick={() => onSelectVibe({ query: favLangs[0] || 'Hindi' })}
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.15))',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '22px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
              <span style={{ background: '#10b981', color: '#000', fontWeight: 900, fontSize: '10px', padding: '4px 10px', borderRadius: '10px', textTransform: 'uppercase' }}>Daily Mix #1</span>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                <Play size={20} color="#000" style={{ marginLeft: '2px' }} />
              </div>
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', margin: '0 0 6px 0' }}>{favLangs[0]} & {favGenres[0]} Mix</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Curated hits matching your primary language token and rhythmic tempo.</p>
          </div>

          {/* Daily Mix 2 */}
          <div 
            onClick={() => onSelectVibe({ query: `${favLangs[1] || 'Punjabi'} ${favGenres[1] || 'EDM'}` })}
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.15))',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '22px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#c084fc';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(168, 85, 247, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
              <span style={{ background: '#c084fc', color: '#000', fontWeight: 900, fontSize: '10px', padding: '4px 10px', borderRadius: '10px', textTransform: 'uppercase' }}>Daily Mix #2</span>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                <Play size={20} color="#000" style={{ marginLeft: '2px' }} />
              </div>
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', margin: '0 0 6px 0' }}>{favLangs[1] || 'Punjabi'} Bass & Trap</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>High-energy drops and acoustic melodies tailored for your workout and focus.</p>
          </div>

          {/* Daily Mix 3 */}
          <div 
            onClick={() => onSelectVibe({ query: 'global viral acoustic' })}
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.15))',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              borderRadius: '22px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#06b6d4';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
              <span style={{ background: '#06b6d4', color: '#000', fontWeight: 900, fontSize: '10px', padding: '4px 10px', borderRadius: '10px', textTransform: 'uppercase' }}>1M Index Mix</span>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                <Play size={20} color="#000" style={{ marginLeft: '2px' }} />
              </div>
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', margin: '0 0 6px 0' }}>1,000,000+ Global Radar</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Explore international chart-toppers across Spanish, Korean, and Japanese.</p>
          </div>

        </div>
      </div>

      {/* 3. EXPLORE BY MOOD & CULTURE SECTION */}
      <div className="section-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '28px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Compass size={14} />
            HarmoniQ Vibe Engine
          </span>
          <div className="section-title" style={{ fontSize: '28px', fontWeight: 900 }}>
            Explore Global Cultures & Acoustic Moods
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.6 }}>
          Clicking any card structures a semantic IR search query, using vector cosine similarity and BM25 indexing to retrieve matching tracks!
        </p>
      </div>

      <div className="discover-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
        {vibes.map((vibe, idx) => (
          <div
            key={idx}
            onClick={vibe.action}
            className="vibe-card"
            style={{ 
              background: vibe.color,
              border: `1px solid ${vibe.borderColor}`,
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '180px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 18px 45px rgba(0, 0, 0, 0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            }}
          >
            <div>
              <div className="vibe-title" style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>{vibe.title}</div>
              <div className="vibe-desc" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{vibe.desc}</div>
            </div>

            <div className="vibe-action-btn" style={{ 
              alignSelf: 'flex-start',
              marginTop: '20px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '8px 16px',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 800,
              color: '#fff'
            }}>
              <Sparkles size={14} style={{ color: '#10b981' }} />
              <span>Launch Vibe 🚀</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
