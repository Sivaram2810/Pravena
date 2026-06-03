import { useState, useEffect, useRef } from 'react';
import RomanticBackground from './components/RomanticBackground';
import BirthdayCountdown from './components/BirthdayCountdown';
import PlanetOrbit from './components/PlanetOrbit';
import LoveStoryPlanet from './components/LoveStoryPlanet';
import LoveResonancePlanet from './components/LoveResonancePlanet';
import EternityPlanet from './components/EternityPlanet';
import ReturnPlanet from './components/ReturnPlanet';
import MirrorPlanet from './components/MirrorPlanet';
import VoicesPlanet from './components/VoicesPlanet';

type ActivePlanet = 'love-story' | 'resonance' | 'eternity' | 'memories' | 'mirror' | 'voices' | null;

const planetData = [
  { id: 'love-story', name: 'Love Story', desc: 'Our magical journey together', emoji: '💕', color: '#ff69b4', glow: 'rgba(255,105,180,0.4)' },
  { id: 'mirror', name: 'The Mirror', desc: 'Things I love about you', emoji: '🪞', color: '#da70d6', glow: 'rgba(218,112,214,0.4)' },
  { id: 'resonance', name: 'Love Resonance', desc: 'Soul compatibility meter', emoji: '💘', color: '#e91e8c', glow: 'rgba(233,30,140,0.4)' },
  { id: 'eternity', name: 'Eternity', desc: 'Future dreams & promises', emoji: '🔮', color: '#9b59b6', glow: 'rgba(155,89,182,0.4)' },
  { id: 'memories', name: 'Memory Planet', desc: 'Moments worth reliving', emoji: '🎞️', color: '#e74c3c', glow: 'rgba(231,76,60,0.4)' },
  { id: 'voices', name: 'Star Voices', desc: 'Birthday wishes from your people', emoji: '🎤', color: '#ff1493', glow: 'rgba(255,20,147,0.4)' },
];

interface FloatingHeart { id: number; x: number; y: number; size: number; opacity: number; dy: number; char: string }

export default function App() {
  const [activePlanet, setActivePlanet] = useState<ActivePlanet>(null);
  const [introVisible, setIntroVisible] = useState(true);
  const [introPhase, setIntroPhase] = useState(0);
  const [mainVisible, setMainVisible] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [clickedPlanet, setClickedPlanet] = useState<string | null>(null);
  const heartIdRef = useRef(0);

  // Intro sequence
  useEffect(() => {
    const t0 = setTimeout(() => setIntroPhase(1), 200);
    const t1 = setTimeout(() => setIntroPhase(2), 1000);
    const t2 = setTimeout(() => setIntroPhase(3), 2400);
    const t3 = setTimeout(() => {
      setIntroVisible(false);
      setTimeout(() => setMainVisible(true), 100);
    }, 3800);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Floating hearts (only when main is visible)
  useEffect(() => {
    if (!mainVisible) return;
    const chars = ['❤️', '💕', '🌸', '✨', '💫', '🌟'];
    const interval = setInterval(() => {
      setFloatingHearts(prev => {
        const updated = prev
          .map(h => ({ ...h, y: h.y - h.dy, opacity: h.opacity - 0.006 }))
          .filter(h => h.opacity > 0);
        if (updated.length < 12) {
          updated.push({
            id: heartIdRef.current++,
            x: Math.random() * 100,
            y: 108,
            size: 14 + Math.random() * 16,
            opacity: 0.25 + Math.random() * 0.35,
            dy: 0.12 + Math.random() * 0.2,
            char: chars[Math.floor(Math.random() * chars.length)],
          });
        }
        return updated;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [mainVisible]);

  const handlePlanetClick = (id: string) => {
    setClickedPlanet(id);
    setTimeout(() => {
      setActivePlanet(id as ActivePlanet);
      setClickedPlanet(null);
    }, 200);
  };

  const handleClose = () => setActivePlanet(null);

  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{
        minHeight: '100dvh',
        background: 'radial-gradient(ellipse at 50% 0%, #1e0040 0%, #0d0020 40%, #050010 70%, #000008 100%)',
      }}
    >
      {/* Animated romantic background canvas */}
      <RomanticBackground />

      {/* Floating hearts */}
      <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
        {floatingHearts.map(h => (
          <div
            key={h.id}
            style={{
              position: 'absolute',
              left: `${h.x}%`,
              top: `${h.y}%`,
              fontSize: h.size,
              opacity: h.opacity,
              transform: 'translate(-50%, -50%)',
              lineHeight: 1,
              filter: `drop-shadow(0 0 ${h.size * 0.25}px rgba(255,105,180,0.4))`,
              pointerEvents: 'none',
            }}
          >{h.char}</div>
        ))}
      </div>

      {/* ═══════════════════════ INTRO SCREEN ═══════════════════════ */}
      {introVisible && (
        <div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, #220050 0%, #0c001e 50%, #000 100%)',
            opacity: introPhase >= 3 ? 0 : 1,
            transition: 'opacity 0.9s ease',
            pointerEvents: introPhase >= 3 ? 'none' : 'all',
          }}
        >
          {/* Starfield */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: Math.random() < 0.8 ? 2 : 3,
                  height: Math.random() < 0.8 ? 2 : 3,
                  background: Math.random() < 0.3 ? '#ffb6c1' : 'white',
                  opacity: Math.random() * 0.7 + 0.1,
                  animation: `twinkle ${1.5 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Nebula blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute" style={{ width: '60%', height: '60%', top: '10%', left: '20%', background: 'radial-gradient(ellipse, rgba(180,0,120,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
            <div className="absolute" style={{ width: '40%', height: '40%', top: '40%', left: '5%', background: 'radial-gradient(ellipse, rgba(100,0,180,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
            <div className="absolute" style={{ width: '35%', height: '35%', top: '30%', right: '5%', background: 'radial-gradient(ellipse, rgba(255,100,150,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
          </div>

          {/* Content */}
          <div
            className="relative text-center px-6 max-w-md"
            style={{
              opacity: introPhase >= 1 ? 1 : 0,
              transform: introPhase >= 1 ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Heartbeat icon */}
            <div
              className="text-8xl sm:text-9xl mb-6 inline-block"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(255,105,180,0.9)) drop-shadow(0 0 80px rgba(255,20,147,0.5))',
                animation: introPhase >= 1 ? 'heartbeat 1.5s ease-in-out infinite' : 'none',
              }}
            >
              💖
            </div>

            {/* Birthday text */}
            <div
              style={{
                opacity: introPhase >= 2 ? 1 : 0,
                transform: introPhase >= 2 ? 'translateY(0)' : 'translateY(15px)',
                transition: 'all 0.7s ease 0.15s',
              }}
            >
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: 'rgba(255,182,193,0.7)' }}
              >
                A Universe Made Just For You
              </p>
              <h1
                className="font-black mb-1 leading-tight"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                  background: 'linear-gradient(135deg, #ff69b4 0%, #da70d6 50%, #fff0f5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Happy Birthday
              </h1>
              <h2
                className="font-black leading-tight mb-5"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(2.5rem, 10vw, 5rem)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffb6c1 50%, #ff69b4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Pravena ✨
              </h2>
              <p
                className="text-base"
                style={{
                  color: 'rgba(255,182,193,0.7)',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                }}
              >
                June 18 · Your magical day has arrived
              </p>
            </div>

            {/* Animated icons */}
            <div
              className="mt-8 flex justify-center gap-3"
              style={{
                opacity: introPhase >= 2 ? 1 : 0,
                transition: 'opacity 0.6s ease 0.5s',
              }}
            >
              {['🌸', '💕', '🌟', '💫', '🌸'].map((e, i) => (
                <span
                  key={i}
                  className="text-xl inline-block"
                  style={{
                    animation: `bounce 1.6s ease-in-out infinite`,
                    animationDelay: `${i * 0.18}s`,
                  }}
                >{e}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════ MAIN UNIVERSE ═══════════════════════ */}
      <div
        className="relative z-10 flex flex-col items-center w-full"
        style={{
          minHeight: '100dvh',
          opacity: mainVisible ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      >
        {/* ── Header ── */}
        <header className="w-full max-w-xl mx-auto text-center pt-8 pb-2 px-4">
          <div
            className="inline-block text-5xl mb-3"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255,105,180,0.8))',
              animation: 'gentlePulse 3s ease-in-out infinite',
            }}
          >🌸</div>

          <h1
            className="font-black mb-1 leading-tight"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              background: 'linear-gradient(135deg, #ff69b4, #da70d6, #fff0f5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Happy Birthday, Pravena
          </h1>

          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            style={{ color: 'rgba(255,182,193,0.5)' }}
          >
            June 18 · Your Birthday Universe ✨
          </p>

          {/* Countdown */}
          <BirthdayCountdown />
        </header>

        {/* ── Hint ── */}
        <p
          className="hidden sm:block text-xs text-center px-4 mt-3 mb-0"
          style={{ color: 'rgba(255,105,180,0.45)', animation: 'breathe 3s ease-in-out infinite' }}
        >
          ✨ Click any planet to begin your journey ✨
        </p>

        {/* ── DESKTOP / TABLET: Orbit ── */}
        <div
          className="hidden sm:flex items-center justify-center w-full py-6"
          style={{ flex: 1 }}
        >
          <PlanetOrbit onPlanetClick={handlePlanetClick} />
        </div>

        {/* ── MOBILE: Compact orbit + grid ── */}
        <div className="sm:hidden w-full flex flex-col items-center gap-3 pt-4">
          {/* Mini orbit */}
          <div className="flex items-center justify-center" style={{ height: 200 }}>
            <PlanetOrbit onPlanetClick={handlePlanetClick} />
          </div>

          <p
            className="text-xs text-center"
            style={{ color: 'rgba(255,105,180,0.5)' }}
          >
            ✨ Explore all planets below ✨
          </p>

          {/* Mobile planet cards */}
          <div className="w-full px-4 pb-4 grid grid-cols-2 gap-3 max-w-sm mx-auto">
            {planetData.map(planet => (
              <button
                key={planet.id}
                onClick={() => handlePlanetClick(planet.id)}
                className="relative flex flex-col items-center gap-2 py-4 px-3 rounded-2xl overflow-hidden transition-all duration-200 active:scale-95"
                style={{
                  background: `linear-gradient(145deg, ${planet.color}18, rgba(0,0,0,0.6))`,
                  border: `1px solid ${planet.color}35`,
                  boxShadow: clickedPlanet === planet.id ? `0 0 25px ${planet.glow}` : `0 0 8px ${planet.color}15`,
                }}
              >
                {/* Glow orb */}
                <div
                  className="absolute top-0 right-0 w-10 h-10 rounded-full opacity-20 blur-xl pointer-events-none"
                  style={{ background: planet.color }}
                />
                <span className="text-3xl relative z-10">{planet.emoji}</span>
                <div className="relative z-10 text-center">
                  <p className="text-white text-xs font-bold leading-tight">{planet.name}</p>
                  <p className="text-xs leading-tight mt-0.5" style={{ color: `${planet.color}aa` }}>{planet.desc}</p>
                </div>
                <div
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: `${planet.color}20`, color: planet.color, border: `1px solid ${planet.color}35` }}
                >
                  Explore →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="w-full text-center py-6 px-4">
          <div className="flex items-center justify-center gap-2 mb-2 opacity-30">
            {['💕', '🌸', '✨', '🌸', '💕'].map((e, i) => <span key={i} className="text-sm">{e}</span>)}
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,105,180,0.25)' }}>
            Made with 💖 for Pravena · June 18
          </p>
        </footer>
      </div>

      {/* ═══════════════════════ PLANET SCREENS ═══════════════════════ */}
      {activePlanet === 'love-story' && <LoveStoryPlanet onClose={handleClose} />}
      {activePlanet === 'resonance' && <LoveResonancePlanet onClose={handleClose} />}
      {activePlanet === 'eternity' && <EternityPlanet onClose={handleClose} />}
      {activePlanet === 'memories' && <ReturnPlanet onClose={handleClose} />}
      {activePlanet === 'mirror' && <MirrorPlanet onClose={handleClose} />}
      {activePlanet === 'voices' && <VoicesPlanet onClose={handleClose} />}

      <style>{`
        @keyframes heartbeat {
          0%, 70%, 100% { transform: scale(1); }
          14% { transform: scale(1.2); }
          28% { transform: scale(1.05); }
          42% { transform: scale(1.12); }
        }
        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px rgba(255,105,180,0.8)); }
          50% { transform: scale(1.07); filter: drop-shadow(0 0 32px rgba(255,105,180,1)); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.75; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
