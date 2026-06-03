import { useState, useEffect } from 'react';

const futureDreams = [
  {
    year: '2025',
    icon: '🎓',
    title: 'Your Brightest Chapter',
    color: '#ff69b4',
    locked: false,
    content: "This year, you step into a future you have worked so hard for. Every challenge, every late night, every moment of doubt — it all brought you here. The world is ready for everything you are about to become. I will be cheering the loudest, always. 🌟",
    subtext: 'The present gift',
  },
  {
    year: '2026',
    icon: '✈️',
    title: 'Adventures Ahead',
    color: '#da70d6',
    locked: true,
    content: "There are sunsets you have not witnessed yet, places that do not know your name yet, moments that are being quietly prepared just for you. 2026 holds adventures written in your language — unexpected, beautiful, and full of wonder. 💫",
    subtext: 'Sealed until the time is right',
  },
  {
    year: '2027',
    icon: '💼',
    title: 'Your Empire Rising',
    color: '#9b59b6',
    locked: true,
    content: "By 2027, the seeds you planted with your determination will be blooming beyond what you imagined. Your name will stand for something powerful, something real, something that makes people proud they knew you before. I always believed this day would come. 🌸",
    subtext: 'A promise waiting to bloom',
  },
  {
    year: '2028',
    icon: '🏠',
    title: 'A Home Full of Love',
    color: '#e91e8c',
    locked: true,
    content: "You deserve a space that feels entirely like you — warm, beautiful, alive with joy. A place where your laughter echoes freely and every corner feels like a hug. May every door you open from now lead to something that makes your heart expand. 🤍",
    subtext: 'Your sanctuary awaits',
  },
  {
    year: '2030',
    icon: '⭐',
    title: 'Your Legacy',
    color: '#ff1493',
    locked: true,
    content: "Five years from now, look back at all you have quietly built. Every choice you make today writes a line in the story of your legacy. You are creating something the world will remember and something the people who love you will be endlessly proud of. 💖",
    subtext: 'The brightest chapter yet',
  },
];

const birthdayPromises = [
  { icon: '💌', text: 'Always be here — especially for the 3am thoughts', color: '#ff69b4' },
  { icon: '🎂', text: 'Celebrate every birthday like a universe built just for you', color: '#da70d6' },
  { icon: '🤝', text: 'Stand beside you through every storm and every sunrise', color: '#9b59b6' },
  { icon: '😂', text: 'Be the reason for at least one genuine laugh every day', color: '#e91e8c' },
  { icon: '🌙', text: 'Remind you of your worth on the days it feels distant', color: '#ff69b4' },
  { icon: '💫', text: 'Make sure every memory we make is worth keeping forever', color: '#da70d6' },
];

const wishesForFutureBirthdays = [
  "May every June 18 bring more joy than the last",
  "May every year add a new dream to your collection",
  "May you always find reasons to celebrate yourself",
  "May the people around you match your energy and love",
  "May every birthday feel like the universe throwing a party for you",
];

export default function EternityPlanet({ onClose }: { onClose: () => void }) {
  const [unlockedDreams, setUnlockedDreams] = useState<Set<number>>(new Set([0]));
  const [openDream, setOpenDream] = useState<number | null>(null);
  const [showPromises, setShowPromises] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [revealedWish, setRevealedWish] = useState<number | null>(null);
  const [floatingStars, setFloatingStars] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      setFloatingStars(prev => {
        const updated = prev
          .map(s => ({ ...s, y: s.y - 0.5, opacity: s.opacity - 0.008 }))
          .filter(s => s.opacity > 0);
        if (updated.length < 10) {
          updated.push({ id: id++, x: Math.random() * 100, y: 90 + Math.random() * 10, opacity: 0.6 });
        }
        return updated;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const unlockDream = (idx: number) => {
    setUnlockedDreams(prev => new Set([...prev, idx]));
    setOpenDream(idx);
  };

  const toggleDream = (idx: number) => {
    if (unlockedDreams.has(idx)) {
      setOpenDream(prev => prev === idx ? null : idx);
    } else {
      unlockDream(idx);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: 'linear-gradient(135deg, #030010 0%, #0c002a 40%, #180040 100%)' }}
    >
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 70 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() < 0.6 ? 2 : 3,
              height: Math.random() < 0.6 ? 2 : 3,
              background: Math.random() < 0.3 ? '#c9a0dc' : 'white',
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Floating stars */}
        {floatingStars.map(s => (
          <div
            key={s.id}
            className="absolute text-sm pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity }}
          >⭐</div>
        ))}
      </div>

      <div className="relative z-10 max-w-lg mx-auto w-full px-4 py-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl" style={{ filter: 'drop-shadow(0 0 12px #9b59b6)' }}>🔮</span>
            <div>
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                Eternity Planet
              </h2>
              <p className="text-purple-300 text-xs">Future Dreams & Promises</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >✕</button>
        </div>

        {/* Intro */}
        <div
          className="text-center p-4 rounded-2xl"
          style={{ background: 'rgba(155,89,182,0.1)', border: '1px solid rgba(155,89,182,0.3)' }}
        >
          <p className="text-purple-100 text-sm leading-relaxed">
            Every birthday opens a new door into the future. These letters are sealed — 
            written just for you, waiting for the right moment. Tap to unlock each dream. ✨
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <h3
            className="text-center text-xs font-bold tracking-widest uppercase"
            style={{ color: 'rgba(155,89,182,0.7)' }}
          >
            📅 Your Timeline of Dreams
          </h3>

          {futureDreams.map((dream, i) => {
            const isUnlocked = unlockedDreams.has(i);
            const isOpen = openDream === i;

            return (
              <div key={i} className="relative">
                {/* Timeline connector */}
                {i < futureDreams.length - 1 && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: 23,
                      top: '100%',
                      width: 2,
                      height: 12,
                      background: `linear-gradient(180deg, ${dream.color}60, transparent)`,
                    }}
                  />
                )}

                <div
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    background: isUnlocked
                      ? `linear-gradient(145deg, ${dream.color}18, rgba(0,0,0,0.55))`
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isUnlocked ? dream.color + '50' : 'rgba(255,255,255,0.09)'}`,
                    boxShadow: isOpen ? `0 0 25px ${dream.color}35` : 'none',
                  }}
                  onClick={() => toggleDream(i)}
                >
                  <div className="flex items-center gap-3 p-4">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{
                        background: isUnlocked ? `${dream.color}22` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isUnlocked ? dream.color + '40' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      {isUnlocked ? dream.icon : '🔒'}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-xs font-black"
                          style={{ color: isUnlocked ? dream.color : 'rgba(255,255,255,0.3)' }}
                        >
                          {dream.year}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: 'rgba(255,255,255,0.25)' }}
                        >
                          · {dream.subtext}
                        </span>
                      </div>
                      <p className="text-white font-semibold text-sm leading-tight">
                        {isUnlocked ? dream.title : 'Sealed Letter...'}
                      </p>
                    </div>

                    {/* Arrow */}
                    <span
                      className="text-sm flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: isUnlocked ? dream.color : 'rgba(255,255,255,0.2)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    >
                      {isUnlocked ? '▾' : '✨'}
                    </span>
                  </div>

                  {/* Content */}
                  {isOpen && isUnlocked && (
                    <div
                      className="px-4 pb-4"
                      style={{ animation: 'expandDown 0.3s ease' }}
                    >
                      <div
                        className="p-3.5 rounded-xl text-sm leading-relaxed"
                        style={{
                          background: 'rgba(0,0,0,0.4)',
                          color: '#f8d7e8',
                          fontFamily: 'Georgia, serif',
                          lineHeight: 1.8,
                        }}
                      >
                        {dream.content}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Promises section */}
        <div className="space-y-2">
          <button
            onClick={() => setShowPromises(p => !p)}
            className="w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(233,30,140,0.18), rgba(155,89,182,0.18))',
              border: '1px solid rgba(233,30,140,0.4)',
              color: '#ffb6c1',
            }}
          >
            <span>{showPromises ? '✨' : '💌'}</span>
            {showPromises ? 'Hide Promises' : 'Reveal Forever Promises'}
            <span style={{ transform: showPromises ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>▾</span>
          </button>

          {showPromises && (
            <div
              className="p-4 rounded-2xl space-y-3"
              style={{
                background: 'rgba(233,30,140,0.08)',
                border: '1px solid rgba(233,30,140,0.25)',
                animation: 'expandDown 0.35s ease',
              }}
            >
              <p className="text-center text-pink-300 font-bold text-sm mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Promises Written in the Stars
              </p>
              {birthdayPromises.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                  style={{ animation: `fadeInUp 0.4s ease ${i * 0.07}s both` }}
                >
                  <span className="text-lg flex-shrink-0">{p.icon}</span>
                  <p className="text-sm leading-relaxed" style={{ color: '#f0c4d4' }}>{p.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Future birthday wishes */}
        <div className="space-y-2">
          <button
            onClick={() => setShowWishes(w => !w)}
            className="w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(155,89,182,0.18), rgba(218,112,214,0.18))',
              border: '1px solid rgba(155,89,182,0.4)',
              color: '#c9a0dc',
            }}
          >
            <span>🌌</span>
            Wishes for Every June 18
            <span style={{ transform: showWishes ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>▾</span>
          </button>

          {showWishes && (
            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(155,89,182,0.08)',
                border: '1px solid rgba(155,89,182,0.25)',
                animation: 'expandDown 0.35s ease',
              }}
            >
              <div className="space-y-3">
                {wishesForFutureBirthdays.map((wish, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 cursor-pointer p-2 rounded-xl transition-all duration-200"
                    style={{
                      background: revealedWish === i ? 'rgba(155,89,182,0.15)' : 'transparent',
                      border: revealedWish === i ? '1px solid rgba(155,89,182,0.3)' : '1px solid transparent',
                    }}
                    onClick={() => setRevealedWish(prev => prev === i ? null : i)}
                  >
                    <span className="text-base flex-shrink-0">🌸</span>
                    <p className="text-sm leading-relaxed" style={{ color: revealedWish === i ? '#f0c4d4' : 'rgba(255,255,255,0.6)' }}>
                      {wish}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Closing message */}
        <div
          className="text-center p-5 rounded-2xl"
          style={{
            background: 'linear-gradient(145deg, rgba(155,89,182,0.18), rgba(233,30,140,0.1))',
            border: '1px solid rgba(155,89,182,0.4)',
            boxShadow: '0 0 30px rgba(155,89,182,0.15)',
          }}
        >
          <p className="text-4xl mb-3">🌌</p>
          <p className="text-white font-bold text-base mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            To Every Future Birthday
          </p>
          <p className="text-purple-200 text-sm leading-relaxed" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            May every June 18 that comes be more magical than the last. 
            May your future hold everything your heart has ever whispered to the stars at midnight. 
            Here is to eternity, Pravena. 💖
          </p>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }
        @keyframes expandDown {
          from { opacity: 0; max-height: 0; transform: translateY(-8px); }
          to { opacity: 1; max-height: 1000px; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
