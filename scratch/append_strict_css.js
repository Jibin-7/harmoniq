import fs from 'fs';

const cssPath = 'src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

if (!css.includes('STRICT AUDIO PLAYER BAR')) {
  const strictCSS = `

/* ==========================================================================
   STRICT AUDIO PLAYER BAR & DISC-GRID UI OVERRIDES (ZERO OVERLAP / ZERO BLOAT)
   ========================================================================== */
.main-content {
  padding-bottom: 110px !important;
}

.audio-player {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 86px !important;
  max-height: 86px !important;
  min-height: 86px !important;
  z-index: 10000 !important;
  background: rgba(9, 9, 13, 0.96) !important;
  backdrop-filter: blur(28px) !important;
  border-top: 1px solid rgba(16, 185, 129, 0.3) !important;
  padding: 0 28px !important;
  box-shadow: 0 -10px 35px rgba(0, 0, 0, 0.85) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
}

.player-inner {
  width: 100% !important;
  max-width: 1500px !important;
  height: 100% !important;
  display: grid !important;
  grid-template-columns: 260px 1fr 300px !important;
  align-items: center !important;
  gap: 24px !important;
}
`;
  fs.writeFileSync(cssPath, css + strictCSS, 'utf8');
  console.log('Successfully appended strict UI player height overrides!');
} else {
  console.log('Strict overrides already present.');
}
