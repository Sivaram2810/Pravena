import { useState, useEffect, useRef, useCallback } from 'react';

const FINAL_COMPATIBILITY = 99;

const loveAttributes = [
  { label: 'Soul Connection', value: 98, icon: '🫀', color: '#ff69b4', desc: 'Two souls, one rhythm' },
  { label: 'Laughter Energy', value: 97, icon: '😄', color: '#da70d6', desc: 'Joy that never fades' },
  { label: 'Trust & Safety', value: 99, icon: '🛡️', color: '#9b59b6', desc: 'A sanctuary for the heart' },
  { label: 'Memory Magic', value: 96, icon: '✨', color: '#ff1493', desc: 'Every moment golden' },
  { label: 'Heart Harmony', value: 100, icon: '💞', color: '#e91e8c', desc: 'Perfect synchronization' },
];

const heartQuotes = [
  "Your smile is the universe's most beautiful constellation 🌌",
  'In every heartbeat, your name echoes softly 💓',
  'You were written in the stars before you were born 🌟',
  'The universe conspired to make you this extraordinary ✨',
  'Every memory with you is a treasure that cannot be measured 💖',
];

interface WaveBar { height: number }

export default function LoveResonancePlanet({ onClose }: { onClose: () => void }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [attrValues, setAttrValues] = useState(loveAttributes.map(() => 0));
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'reveal'>('idle');
  const [pulseT, setPulseT] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [waveBars, setWaveBars] = useState<WaveBar[]>(Array.from({ length: 14 }, () => ({ height: 10 })));
  const [heartScale, setHeartScale] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const startScan = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('scanning');
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / 2.5, 1); // 2.5 seconds
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(eased * FINAL_COMPATIBILITY));
      setAttrValues(loveAttributes.map(a => Math.round(eased * a.value)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('reveal');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [phase]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Pulse animation
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.1;
      setPulseT(t);
      setHeartScale(1 + Math.sin(t * 3) * 0.07);
      setWaveBars(prev => prev.map((_, i) => ({
        height: 8 + Math.abs(Math.sin(t * 2.5 + i * 0.45)) * (phase === 'reveal' ? 45 : phase === 'scanning' ? 30 : 12),
      })));
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  // Quote rotation
  useEffect(() => {
    if (phase !== 'reveal') return;
    const interval = setInterval(() => {
      setQuoteIdx(i => (i + 1) % heartQuotes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [phase]);

  // Auto-start scan
  useEffect(() => {
    const timer = setTimeout(() => startScan(), 800);
    return () => clearTimeout(timer);
  }, [startScan]);

  const ringOpacity = 0.15 + Math.sin(pulseT * 2) * 0.08;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: 'linear-gradient(135deg, #060015 0%, #12002a 50%, #0a0010 100%)' }}
    >
      {/* Confetti burst */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.8}s`,
              }}
            >
              {['💕', '✨', '🌸', '💖', '⭐', '💫', '🎉', '🌟'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-sm mx-auto w-full px-4 py-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl" style={{ filter: 'drop-shadow(0 0 12px #ff69b4)' }}>💘</span>
            <div>
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Love Resonance</h2>
              <p className="text-pink-300 text-xs">Soul Compatibility Meter</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.08)' }}>✕</button>
        </div>

        {/* Central orb */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative" style={{ width: 200, height: 200 }}>
            {/* Pulsing rings */}
            {[190, 160, 130].map((size, ri) => (
              <div
                key={ri}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: (200 - size) / 2,
                  top: (200 - size) / 2,
                  border: `1.5px solid rgba(255,105,180,${ringOpacity - ri * 0.03})`,
                  boxShadow: `0 0 ${10 + ri * 5}px rgba(255,105,180,${ringOpacity * 0.5})`,
                  transform: `scale(${1 + Math.sin(pulseT * 2 + ri * 0.8) * 0.025})`,
                  transition: 'transform 0.04s ease',
                }}
              />
            ))}

            {/* Heart */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `scale(${heartScale})`, transition: 'transform 0.04s ease', filter: 'drop-shadow(0 0 20px rgba(255,105,180,0.9))' }}
            >
              <span style={{ fontSize: 80 }}>{phase === 'reveal' ? '💖' : '💗'}</span>
            </div>

            {/* Percentage */}
            <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none">
              <span
                className="font-black text-4xl tabular-nums"
                style={{
                  background: 'linear-gradient(135deg, #ff69b4, #da70d6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Georgia, serif',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                }}
              >
                {displayValue}%
              </span>
            </div>
          </div>

          {/* Status */}
          <div
            className="text-center py-3 px-5 rounded-2xl w-full"
            style={{ background: 'rgba(255,105,180,0.1)', border: '1px solid rgba(255,105,180,0.3)' }}
          >
            {phase === 'idle' && <p className="text-pink-200 text-sm">Preparing your love resonance scan...</p>}
            {phase === 'scanning' && (
              <p className="text-pink-200 text-sm" style={{ animation: 'breathe 1s ease-in-out infinite' }}>
                💫 Syncing hearts across the universe...
              </p>
            )}
            {phase === 'reveal' && (
              <div>
                <p className="text-white font-bold text-base">✨ Perfect Soulmate Match!</p>
                <p className="text-pink-300 text-xs mt-1" style={{ animation: 'fadeIn 0.5s ease', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                  {heartQuotes[quoteIdx]}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Attributes */}
        <div className="space-y-3">
          {loveAttributes.map((attr, i) => (
            <div key={i} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{attr.icon}</span>
                  <div>
                    <p className="text-pink-100 text-sm font-semibold leading-tight">{attr.label}</p>
                    <p className="text-white/30 text-xs">{attr.desc}</p>
                  </div>
                </div>
                <span className="text-sm font-black tabular-nums" style={{ color: attr.color }}>{attrValues[i]}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${attrValues[i]}%`,
                    background: `linear-gradient(90deg, ${attr.color}, ${attr.color}bb)`,
                    boxShadow: `0 0 8px ${attr.color}80`,
                    transition: 'width 0.05s linear',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Heartbeat visualizer */}
        <div className="flex items-end justify-center gap-1 h-12">
          {waveBars.map((bar, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 5,
                height: Math.max(4, bar.height),
                background: `linear-gradient(180deg, #ff69b4, #9b59b6)`,
                opacity: 0.8,
                transition: 'height 0.04s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Final revelation */}
        {phase === 'reveal' && (
          <div
            className="text-center p-5 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,105,180,0.18), rgba(155,89,182,0.18))',
              border: '1px solid rgba(255,105,180,0.5)',
              boxShadow: '0 0 30px rgba(255,105,180,0.25)',
              animation: 'fadeInUp 0.7s ease',
            }}
          >
            <p className="text-4xl mb-3">💖</p>
            <p className="text-white font-black text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Truly One of a Kind
            </p>
            <p className="text-pink-200 text-sm leading-relaxed">
              The universe measured every smile, every laugh, every moment shared — 
              and the result is undeniable. Your heart radiates a love so pure, it lights up every room. 
              Happy Birthday, Pravena! 🎂✨
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes breathe { 0%,100%{opacity:0.6;} 50%{opacity:1;} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(15px);} to{opacity:1;transform:translateY(0);} }
        @keyframes confettiFall { from{transform:translateY(0) rotate(0deg);opacity:1;} to{transform:translateY(110vh) rotate(720deg);opacity:0;} }
      `}</style>
    </div>
  );
}
