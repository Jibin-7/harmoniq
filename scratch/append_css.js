import fs from 'fs';

const cssPath = 'src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

if (!css.includes('ULTRA-PREMIUM LUXURY GLASSMORPHISM')) {
  const luxuryCSS = `

/* ==========================================================================
   ULTRA-PREMIUM LUXURY GLASSMORPHISM & 1M IR CATALOG UPGRADES
   ========================================================================== */

/* Ambient Glowing Background Mesh */
.main-content {
  background: 
    radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.12), transparent 35%),
    radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.12), transparent 35%),
    radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.10), transparent 40%),
    linear-gradient(180deg, rgba(18, 18, 24, 0.7) 0%, var(--bg-primary) 100%) !important;
}

/* Discovery Pills Bar in Navbar */
.discovery-pills-bar {
  max-width: 1400px;
  margin: 14px auto 0;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}
.discovery-pills-bar::-webkit-scrollbar {
  display: none;
}

.pills-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 800;
  color: var(--text-muted);
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pills-scroll {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discovery-pill {
  padding: 6px 14px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.discovery-pill:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}
.discovery-pill.active {
  background: linear-gradient(135deg, var(--accent) 0%, #06b6d4 100%);
  color: #000;
  font-weight: 800;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

/* 1M Global Stats Card in Sidebar */
.global-stats-card {
  background: linear-gradient(145deg, rgba(24, 24, 32, 0.8) 0%, rgba(14, 14, 20, 0.9) 100%);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}
.stats-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  margin-bottom: 10px;
}
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.stat-item {
  text-align: left;
}
.stat-val {
  font-size: 16px;
  font-weight: 900;
  color: var(--accent);
}
.stat-lbl {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
}
.stats-sub {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 600;
}

/* Premium Song Card Overhaul & Equalizer Bars */
.song-card {
  background: linear-gradient(145deg, rgba(28, 28, 36, 0.7) 0%, rgba(18, 18, 24, 0.8) 100%) !important;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
}
.song-card:hover {
  background: linear-gradient(145deg, rgba(38, 38, 48, 0.85) 0%, rgba(26, 26, 36, 0.95) 100%) !important;
  border-color: rgba(16, 185, 129, 0.4) !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.15) !important;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 6px;
}
.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}
.ir-score-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 800;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.card-tags {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 4px;
}
.tag-pill {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-secondary);
}
.language-pill {
  background: rgba(6, 182, 212, 0.12);
  color: #06b6d4;
  border: 1px solid rgba(6, 182, 212, 0.25);
}
.genre-pill {
  background: rgba(139, 92, 246, 0.12);
  color: #a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.25);
}

/* Playing Equalizer Bars */
.playing-eq-bars {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 20px;
  background: rgba(0, 0, 0, 0.75);
  padding: 4px 6px;
  border-radius: 6px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(16, 185, 129, 0.4);
}
.playing-eq-bars .bar {
  width: 3px;
  background: var(--accent);
  border-radius: 2px;
  animation: eqJump 0.8s infinite ease-in-out alternate;
}
.playing-eq-bars .bar-1 { height: 6px; animation-delay: 0.1s; }
.playing-eq-bars .bar-2 { height: 14px; animation-delay: 0.3s; }
.playing-eq-bars .bar-3 { height: 10px; animation-delay: 0.2s; }
.playing-eq-bars .bar-4 { height: 16px; animation-delay: 0.4s; }

@keyframes eqJump {
  0% { height: 4px; }
  100% { height: 18px; }
}

/* Micro-animations */
.spin-slow {
  animation: spin 12s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.pulse-icon {
  animation: pulseLight 2s infinite ease-in-out;
}
@keyframes pulseLight {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.9); }
}
`;
  fs.writeFileSync(cssPath, css + luxuryCSS, 'utf8');
  console.log('Successfully appended luxury glassmorphism styles!');
} else {
  console.log('Luxury styles already present.');
}
