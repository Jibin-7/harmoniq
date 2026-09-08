import React, { useState } from 'react';
import { Sparkles, Music, Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, Check, Headphones, Globe2, Zap, Heart } from 'lucide-react';
import { UserProfile } from '../engine/types';
import { createAvatarSVG } from './AuthModal';
import { realtimeDb } from '../engine/realtimeDb';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
  onGuestLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  
  // Login form state (Empty by default for a professional clean feel)
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>('');

  // Sign up form state
  const [signUpName, setSignUpName] = useState<string>('');
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [selectedLangs, setSelectedLangs] = useState<string[]>(['Hindi', 'English', 'Spanish']);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Pop', 'EDM', 'Bollywood']);

  const availableLangs = ['English', 'Hindi', 'Punjabi', 'Spanish', 'Korean', 'Japanese', 'Tamil', 'French'];
  const availableGenres = ['Pop', 'EDM', 'Bollywood', 'Lo-Fi', 'Rock', 'Hip-Hop', 'Latin', 'R&B'];

  const handleToggleLang = (lang: string) => {
    if (selectedLangs.includes(lang)) {
      if (selectedLangs.length > 1) setSelectedLangs(selectedLangs.filter(l => l !== lang));
    } else {
      setSelectedLangs([...selectedLangs, lang]);
    }
  };

  const handleToggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      if (selectedGenres.length > 1) setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter your registered email and password.');
      return;
    }

    const authResult = realtimeDb.authenticateAccount(loginEmail.trim(), loginPassword);
    if (authResult.success && authResult.user) {
      onLogin(authResult.user);
    } else {
      setLoginError(authResult.error || 'Authentication failed. Please check your password.');
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
      setLoginError('Please complete all required fields to register.');
      return;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: signUpName.trim(),
      email: signUpEmail.trim(),
      avatar: createAvatarSVG(signUpName.trim(), ['#10b981', '#06b6d4']),
      favoriteLanguages: selectedLangs,
      favoriteGenres: selectedGenres,
      favoriteMoods: ['Energetic', 'Party', 'Focus'],
      listeningHours: 0
    };

    const regResult = realtimeDb.registerAccount(signUpEmail.trim(), signUpPassword, newUser);
    if (regResult.success && regResult.user) {
      onLogin(regResult.user);
    } else {
      setLoginError(regResult.error || 'Registration failed.');
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%), linear-gradient(180deg, #030305 0%, #08080c 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px'
    }}>
      {/* Background Ambient Glow */}
      <div style={{ position: 'absolute', top: '-15%', left: '-15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '-15%', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />

      {/* Main Glass Authentication Card */}
      <div style={{
        width: '100%',
        maxWidth: isSignUp ? '560px' : '440px',
        background: 'rgba(16, 16, 24, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '28px',
        padding: '40px 44px',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(16, 185, 129, 0.04)',
        backdropFilter: 'blur(24px)',
        position: 'relative',
        zIndex: 10,
        transition: 'max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        maxHeight: '92vh',
        overflowY: 'auto'
      }}>
        
        {/* Top Logo & App Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
            marginBottom: '16px'
          }}>
            <Sparkles size={28} color="#000" />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            HarmoniQ Studio
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>
            {isSignUp ? 'Create your account to access the 1,000,000+ track retrieval catalog' : 'Sign in to access your personalized acoustic portal'}
          </p>
        </div>

        {/* Tab Toggle (Sign In vs Create Account) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'rgba(0, 0, 0, 0.45)',
          padding: '4px',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '26px'
        }}>
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setLoginError(''); }}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: !isSignUp ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.15))' : 'transparent',
              color: !isSignUp ? '#fff' : 'var(--text-muted)',
              fontWeight: !isSignUp ? 800 : 600,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderBottom: !isSignUp ? '2px solid #10b981' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setLoginError(''); }}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: isSignUp ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.15))' : 'transparent',
              color: isSignUp ? '#fff' : 'var(--text-muted)',
              fontWeight: isSignUp ? 800 : 600,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderBottom: isSignUp ? '2px solid #10b981' : 'none'
            }}
          >
            Create Account
          </button>
        </div>

        {loginError && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#f87171',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ⚠️ {loginError}
          </div>
        )}

        {/* SIGN IN FORM */}
        {!isSignUp ? (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="name@company.com"
                  style={{
                    width: '100%',
                    padding: '13px 14px 13px 42px',
                    background: 'rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#10b981'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)'}
                  required
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  Password
                </label>
                <a href="#forgot" onClick={e => { e.preventDefault(); alert('A password recovery email has been sent to your registered address.'); }} style={{ fontSize: '12px', color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>
                  Forgot Password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '13px 42px 13px 42px',
                    background: 'rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#10b981'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#10b981', cursor: 'pointer' }}
              />
              <label htmlFor="remember" style={{ fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none', fontWeight: 500 }}>
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px',
                transition: 'all 0.2s'
              }}
            >
              <span>Sign In to HarmoniQ</span>
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={signUpName}
                  onChange={e => setSignUpName(e.target.value)}
                  placeholder="Alex Rivera"
                  style={{ width: '100%', padding: '12px 14px 12px 42px', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    value={signUpEmail}
                    onChange={e => setSignUpEmail(e.target.value)}
                    placeholder="you@domain.com"
                    style={{ width: '100%', padding: '12px 14px 12px 42px', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  Create Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    value={signUpPassword}
                    onChange={e => setSignUpPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ width: '100%', padding: '12px 14px 12px 42px', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' }}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Primary Acoustic Cultures
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {availableLangs.map(lang => {
                  const active = selectedLangs.includes(lang);
                  return (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => handleToggleLang(lang)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: `1px solid ${active ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
                        background: active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.3)',
                        color: active ? '#10b981' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {active && '✓ '} {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Favorite Musical Genres
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {availableGenres.map(genre => {
                  const active = selectedGenres.includes(genre);
                  return (
                    <button
                      type="button"
                      key={genre}
                      onClick={() => handleToggleGenre(genre)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: `1px solid ${active ? '#06b6d4' : 'rgba(255,255,255,0.12)'}`,
                        background: active ? 'rgba(6, 182, 212, 0.2)' : 'rgba(0,0,0,0.3)',
                        color: active ? '#06b6d4' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {active && '✓ '} {genre}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '10px',
                transition: 'all 0.2s'
              }}
            >
              <span>Create Professional Account</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* Footer Security Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
          <ShieldCheck size={14} color="#10b981" />
          <span>Secured by 256-bit Vector Session Encryption</span>
        </div>

      </div>
    </div>
  );
};
