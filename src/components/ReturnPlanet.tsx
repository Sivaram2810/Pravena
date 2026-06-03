import { useState, useEffect, useRef } from 'react';

const memories = [
  {
    id: 1,
    emoji: '🌸',
    title: 'The Day Everything Changed',
    time: 'Once upon a time...',
    color: '#ff69b4',
    feeling: 'Magical',
    content: "That first conversation that somehow turned into hours without either of you noticing. You did not know it then, but that moment quietly changed everything. You have a way of making ordinary time feel like scenes from a movie that was made just for you. 🎬",
  },
  {
    id: 2,
    emoji: '😂',
    title: 'That Laugh You Cannot Fake',
    time: 'The golden hours',
    color: '#da70d6',
    feeling: 'Joyful',
    content: "There is a specific laugh you have when something is genuinely, helplessly funny — uncontrollable, completely contagious, utterly beautiful. Hearing it is one of the greatest gifts. It is impossible to be sad when that laugh exists. Never let anyone silence it. 💫",
  },
  {
    id: 3,
    emoji: '🌙',
    title: 'Late Night Conversations',
    time: 'When the world went to sleep',
    color: '#9b59b6',
    feeling: 'Cherished',
    content: "Those conversations that started casually at midnight and somehow accidentally became morning. The ones where things got real — where you shared thoughts you had never said aloud before. Raw. Honest. The kind of conversations that change you quietly. 🤍",
  },
  {
    id: 4,
    emoji: '🍃',
    title: 'The Quiet Moments',
    time: 'Between all the noise',
    color: '#27ae60',
    feeling: 'Peaceful',
    content: "Not every memory needs noise or drama. Some of the most precious ones are just being together — saying nothing, needing nothing. Your presence has always been enough. Not just enough. It has always been everything. 🌿",
  },
  {
    id: 5,
    emoji: '⚡',
    title: 'When You Stood Your Ground',
    time: 'A brave, quiet moment',
    color: '#f39c12',
    feeling: 'Inspiring',
    content: "That moment when you chose yourself — when you said what needed to be said and did not shrink to make others comfortable. Watching you find your voice and use it has been one of the most quietly inspiring things to witness. So incredibly proud of you. 💪",
  },
  {
    id: 6,
    emoji: '🎉',
    title: 'Celebrations & Beautiful Chaos',
    time: 'Every party, every messy moment',
    color: '#e91e8c',
    feeling: 'Euphoric',
    content: "Every celebration became something better because you were there. The chaos, the dancing, the completely unexpected detours and the laughter that could not be contained — they are all permanently saved in the best part of my memory. 🎊",
  },
  {
    id: 7,
    emoji: '💙',
    title: 'The Hard Days You Survived',
    time: 'When it was not easy',
    color: '#2980b9',
    feeling: 'Resilient',
    content: "There were days when everything felt heavy and uncertain. And you kept going anyway — not perfectly, not without feeling it, but you kept going. Those days matter just as much as the good ones. They are proof of something beautiful: your strength. 🌊",
  },
  {
    id: 8,
    emoji: '🌟',
    title: 'The Little Things',
    time: 'A thousand small moments',
    color: '#f1c40f',
    feeling: 'Warm',
    content: "It is not always the big moments that make a bond real. It is the small, ordinary ones — a random voice note, a meme that made you think of someone, a check-in when nothing was wrong. Those little things added up to something that cannot be replaced. 💛",
  },
];

interface FloatingEmoji { id: number; emoji: string; x: number; y: number; opacity: number }

export default function ReturnPlanet({ onClose }: { onClose: () => void }) {
  const [revealedMemories, setRevealedMemories] = useState<Set<number>>(new Set());
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const [rewindMode, setRewindMode] = useState(false);
  const [rewindProgress, setRewindProgress] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const rewindRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const emojis = ['💫', '✨', '🌸', '💕', '⭐', '🌟', '🎞️'];
    let id = 0;
    const interval = setInterval(() => {
      setFloatingEmojis(prev => {
        const updated = prev
          .map(e => ({ ...e, y: e.y - 0.7, opacity: e.opacity - 0.012 }))
          .filter(e => e.opacity > 0);
        if (updated.length < 8) {
          updated.push({
            id: id++,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            x: 5 + Math.random() * 90,
            y: 95 + Math.random() * 8,
            opacity: 0.5 + Math.random() * 0.4,
          });
        }
        return updated;
      });
    }, 350);
    return () => clearInterval(interval);
  }, []);

  const revealMemory = (id: number) => {
    const newRevealed = new Set([...revealedMemories, id]);
    setRevealedMemories(newRevealed);
    setActiveMemory(id);
  };

  const toggleMemory = (id: number) => {
    if (revealedMemories.has(id)) {
      setActiveMemory(prev => prev === id ? null : id);
    } else {
      revealMemory(id);
    }
  };

  const startRewind = () => {
    if (rewindMode) return;
    setRewindMode(true);
    setRewindProgress(0);
    let p = 0;
    rewindRef.current = setInterval(() => {
      p += 1.2;
      setRewindProgress(Math.min(p, 100));
      if (p >= 100) {
        if (rewindRef.current) clearInterval(rewindRef.current);
        setRewindMode(false);
        setRevealedMemories(new Set(memories.map(m => m.id)));
        setTimeout(() => setShowFinalMessage(true), 500);
      }
    }, 25);
  };

  useEffect(() => () => { if (rewindRef.current) clearInterval(rewindRef.current); }, []);

  const allRevealed = revealedMemories.size === memories.length;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: 'linear-gradient(135deg, #000810 0%, #050a25 40%, #0a0518 100%)' }}
    >
      {/* Floating emojis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingEmojis.map(e => (
          <div
            key={e.id}
            className="absolute text-base pointer-events-none"
            style={{ left: `${e.x}%`, top: `${e.y}%`, opacity: e.opacity }}
          >{e.emoji}</div>
        ))}

        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() < 0.7 ? 1 : 2,
              height: Math.random() < 0.7 ? 1 : 2,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg mx-auto w-full px-4 py-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl" style={{ filter: 'drop-shadow(0 0 12px #ff69b4)' }}>🎞️</span>
            <div>
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Memory Planet</h2>
              <p className="text-pink-300 text-xs">Moments Worth Reliving Forever</p>
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
          style={{ background: 'rgba(255,105,180,0.08)', border: '1px solid rgba(255,105,180,0.2)' }}
        >
          <p className="text-pink-100 text-sm leading-relaxed">
            Every memory is a fragment of something beautiful and irreplaceable. 
            Tap each one to relive it — or hit Rewind to unlock them all at once. ✨
          </p>
        </div>

        {/* Rewind button */}
        {!allRevealed && (
          <button
            onClick={startRewind}
            disabled={rewindMode}
            className="relative overflow-hidden py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: rewindMode
                ? 'rgba(255,105,180,0.1)'
                : 'linear-gradient(135deg, rgba(255,105,180,0.22), rgba(155,89,182,0.22))',
              border: '1px solid rgba(255,105,180,0.4)',
              color: '#ffb6c1',
            }}
          >
            {/* Progress fill */}
            {rewindMode && (
              <div
                className="absolute inset-0 left-0 pointer-events-none"
                style={{
                  width: `${rewindProgress}%`,
                  background: 'rgba(255,105,180,0.15)',
                  transition: 'width 0.05s linear',
                }}
              />
            )}
            <span className="relative z-10">
              {rewindMode
                ? `⏪ Rewinding memories... ${Math.round(rewindProgress)}%`
                : '⏪ Memory Rewind — Unlock All'}
            </span>
          </button>
        )}

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs" style={{ color: 'rgba(255,105,180,0.6)' }}>
            <span>Memories Discovered</span>
            <span>{revealedMemories.size} / {memories.length}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(revealedMemories.size / memories.length) * 100}%`,
                background: 'linear-gradient(90deg, #ff69b4, #da70d6)',
                boxShadow: '0 0 8px rgba(255,105,180,0.5)',
              }}
            />
          </div>
        </div>

        {/* Memory fragments */}
        <div className="space-y-2.5">
          {memories.map(memory => {
            const isRevealed = revealedMemories.has(memory.id);
            const isActive = activeMemory === memory.id;

            return (
              <div
                key={memory.id}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: isRevealed
                    ? `linear-gradient(145deg, ${memory.color}18, rgba(0,0,0,0.55))`
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isRevealed ? memory.color + '45' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive ? `0 0 20px ${memory.color}35` : 'none',
                }}
                onClick={() => toggleMemory(memory.id)}
              >
                <div className="flex items-center gap-4 p-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 relative"
                    style={{
                      background: isRevealed ? `${memory.color}20` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isRevealed ? memory.color + '35' : 'rgba(255,255,255,0.07)'}`,
                    }}
                  >
                    {isRevealed ? memory.emoji : '❓'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight">
                      {isRevealed ? memory.title : 'Hidden Memory...'}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: isRevealed ? `${memory.color}aa` : 'rgba(255,255,255,0.2)' }}>
                      {isRevealed ? memory.time : '??? ??'}
                    </p>
                    {isRevealed && (
                      <div className="flex items-center gap-1 mt-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${memory.color}20`, color: memory.color, border: `1px solid ${memory.color}30` }}
                        >
                          {memory.feeling}
                        </span>
                      </div>
                    )}
                  </div>
                  <span
                    className="flex-shrink-0 text-sm"
                    style={{
                      color: isRevealed ? memory.color : 'rgba(255,255,255,0.2)',
                      transform: isActive ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {isRevealed ? '▾' : '🔮'}
                  </span>
                </div>

                {isActive && isRevealed && (
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
                        lineHeight: 1.85,
                      }}
                    >
                      {memory.content}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final message */}
        {showFinalMessage && (
          <div
            className="text-center p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(255,105,180,0.15), rgba(155,89,182,0.12))',
              border: '1px solid rgba(255,105,180,0.45)',
              boxShadow: '0 0 40px rgba(255,105,180,0.2)',
              animation: 'fadeInUp 0.7s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <p className="text-5xl mb-4">🎞️💖</p>
            <p className="text-white font-bold text-base mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Every Memory Is a Gift
            </p>
            <p className="text-pink-200 text-sm leading-relaxed" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              These moments do not just live in the past — they live in who you have become. 
              Every memory with you is one I would choose again, without hesitation, 
              a thousand times over. Happy Birthday, Pravena. 💖
            </p>
          </div>
        )}

        {allRevealed && !showFinalMessage && (
          <p className="text-center text-sm" style={{ color: 'rgba(255,105,180,0.6)' }}>
            ✨ All memories unlocked — each one real, each one cherished 💕
          </p>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.6; }
        }
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
