import { useState, useEffect, useRef } from 'react';

const mirrorShards = [
  {
    id: 1,
    label: 'Your Smile',
    emoji: '✨',
    message: "Your smile has the power to make an entire room feel warm and safe. It is genuine, bright, and completely contagious. When you smile, it is like the universe takes a deep breath and exhales in relief. The world is better because your smile exists in it. 🌟",
    color: '#ff69b4',
  },
  {
    id: 2,
    label: 'Your Courage',
    emoji: '🦁',
    message: "You face things that would make most people retreat. You do not always feel brave — but you do it anyway, quietly and completely. That is the most real kind of courage there is. Not the loud kind. The everyday, unannounced kind. That is you. 💪",
    color: '#da70d6',
  },
  {
    id: 3,
    label: 'Your Heart',
    emoji: '💖',
    message: "You care deeply — for people, for moments, for the little details that most people overlook. You love without making anyone feel like a burden. You give without keeping score. That level of warmth is rare and it is one of your greatest gifts. 🤍",
    color: '#9b59b6',
  },
  {
    id: 4,
    label: 'Your Intelligence',
    emoji: '🧠',
    message: "You see patterns others miss. You understand situations before they need explaining. You absorb everything and make it uniquely yours. Your mind is sharp, creative, and deeply perceptive. It is one of your most powerful superpowers. 💡",
    color: '#e91e8c',
  },
  {
    id: 5,
    label: 'Your Laughter',
    emoji: '😄',
    message: "Your laughter is completely unfiltered and perfectly, authentically you. It escapes before you can stop it, and that is exactly what makes it so magical and so infectious. It is the kind of laugh that makes others forget what they were worried about. 🎉",
    color: '#ff1493',
  },
  {
    id: 6,
    label: 'Your Loyalty',
    emoji: '🛡️',
    message: "Once you decide someone matters to you, you show up — every single time. No questions asked. No conditions attached. That level of loyalty is increasingly rare in this world. It is one of the most beautiful things about you. Always protect that. 🤝",
    color: '#8e44ad',
  },
  {
    id: 7,
    label: 'Your Strength',
    emoji: '⚡',
    message: "You have been through more than most people realize. You have rebuilt yourself quietly, without asking for applause, without making it a show. Every challenge you survived has added a layer of grace to you that is impossible to fake. 🌸",
    color: '#c0392b',
  },
  {
    id: 8,
    label: 'Your Magic',
    emoji: '🌙',
    message: "There is something uniquely, undeniably you — a way you move through the world, a light you carry that does not quite have a name. It draws people in without effort. It makes moments feel meaningful. Call it magic. Because that is exactly what it is. 💫",
    color: '#2980b9',
  },
  {
    id: 9,
    label: 'Your Dreams',
    emoji: '🌟',
    message: "The things you dream about are not just fantasies — they are blueprints. Your imagination is always one step ahead, building the future before your hands even catch up. The dreams you carry deserve to exist. Keep believing in them. Keep reaching. 🚀",
    color: '#27ae60',
  },
];

export default function MirrorPlanet({ onClose }: { onClose: () => void }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [activeShard, setActiveShard] = useState<number | null>(null);
  const [glowingShard, setGlowingShard] = useState<number | null>(null);
  const [mirrorComplete, setMirrorComplete] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const glowIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    glowIntervalRef.current = setInterval(() => {
      const unrevealed = mirrorShards.filter(s => !revealed.has(s.id));
      if (unrevealed.length > 0) {
        const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        setGlowingShard(pick.id);
        setTimeout(() => setGlowingShard(null), 700);
      }
    }, 1800);
    return () => { if (glowIntervalRef.current) clearInterval(glowIntervalRef.current); };
  }, [revealed]);

  const revealShard = (id: number) => {
    const newRevealed = new Set([...revealed, id]);
    setRevealed(newRevealed);
    setActiveShard(id);
    setRippleKey(k => k + 1);
    if (newRevealed.size === mirrorShards.length) {
      setTimeout(() => setMirrorComplete(true), 800);
    }
  };

  const toggleShard = (id: number) => {
    if (revealed.has(id)) {
      setActiveShard(prev => prev === id ? null : id);
    } else {
      revealShard(id);
    }
  };

  const activeShardData = mirrorShards.find(s => s.id === activeShard);
  const progress = (revealed.size / mirrorShards.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: 'linear-gradient(135deg, #020010 0%, #08001f 50%, #110030 100%)' }}
    >
      {/* Mirror shimmer background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(218,112,214,0.06) 0%, transparent 60%)',
          }}
        />
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 2,
              height: 2,
              background: '#da70d6',
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
            <span className="text-3xl" style={{ filter: 'drop-shadow(0 0 12px #da70d6)' }}>🪞</span>
            <div>
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                The Mirror
              </h2>
              <p className="text-purple-300 text-xs">Things I Love About You</p>
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
          style={{ background: 'rgba(218,112,214,0.08)', border: '1px solid rgba(218,112,214,0.25)' }}
        >
          <p className="text-purple-100 text-sm leading-relaxed">
            This mirror reflects the most beautiful truths — things you might not always 
            see in yourself. Tap each shard to reveal what makes you extraordinary. 💕
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs" style={{ color: 'rgba(218,112,214,0.7)' }}>
            <span>✨ {revealed.size} of {mirrorShards.length} shards revealed</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #ff69b4, #da70d6, #9b59b6)',
                boxShadow: '0 0 8px rgba(218,112,214,0.6)',
              }}
            />
          </div>
        </div>

        {/* Shards grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {mirrorShards.map(shard => {
            const isRevealed = revealed.has(shard.id);
            const isActive = activeShard === shard.id;
            const isGlowing = glowingShard === shard.id;

            return (
              <button
                key={shard.id}
                onClick={() => toggleShard(shard.id)}
                className="relative aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 overflow-hidden transition-all duration-300 active:scale-90"
                style={{
                  background: isRevealed
                    ? `linear-gradient(145deg, ${shard.color}22, rgba(0,0,0,0.6))`
                    : isGlowing
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isRevealed ? shard.color + '55' : isGlowing ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.09)'}`,
                  boxShadow: isActive
                    ? `0 0 25px ${shard.color}60, inset 0 1px 0 rgba(255,255,255,0.08)`
                    : isGlowing
                    ? '0 0 15px rgba(218,112,214,0.4)'
                    : 'none',
                  transform: isActive ? 'scale(1.06)' : isGlowing ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                {/* Inner glow */}
                {isRevealed && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${shard.color}18 0%, transparent 70%)` }}
                  />
                )}

                <span className="text-2xl relative z-10">
                  {isRevealed ? shard.emoji : '🔮'}
                </span>
                <span
                  className="text-xs text-center px-1 leading-tight relative z-10 font-medium"
                  style={{ color: isRevealed ? shard.color : 'rgba(255,255,255,0.3)', fontSize: 9 }}
                >
                  {isRevealed ? shard.label : '???'}
                </span>

                {!isRevealed && (
                  <span className="text-xs relative z-10" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 9 }}>
                    tap ✨
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active shard message */}
        {activeShardData && revealed.has(activeShardData.id) && (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${activeShardData.color}18, rgba(0,0,0,0.6))`,
              border: `1px solid ${activeShardData.color}45`,
              boxShadow: `0 0 30px ${activeShardData.color}30`,
              animation: 'shardReveal 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            key={`shard-${activeShardData.id}-${rippleKey}`}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{activeShardData.emoji}</span>
                <div>
                  <p className="text-white font-bold text-base">{activeShardData.label}</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} style={{ fontSize: 10 }}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#f8d7e8', fontFamily: 'Georgia, serif', lineHeight: 1.8 }}
              >
                {activeShardData.message}
              </p>
            </div>
          </div>
        )}

        {/* Completion */}
        {mirrorComplete && (
          <div
            className="text-center p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(218,112,214,0.18), rgba(255,105,180,0.12))',
              border: '1px solid rgba(218,112,214,0.5)',
              boxShadow: '0 0 50px rgba(218,112,214,0.3)',
              animation: 'fadeInUp 0.8s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <p className="text-5xl mb-4">🪞💖</p>
            <p className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              The Mirror Is Complete
            </p>
            <p className="text-pink-200 text-sm leading-relaxed" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              Now you see what I see every single day — someone truly extraordinary. 
              Every quality that makes you who you are is worth celebrating. 
              You are enough. You are more than enough. You are everything. 
              Happy Birthday, Pravena. 💖✨
            </p>
          </div>
        )}

        {/* Hint for unrevealed */}
        {!mirrorComplete && revealed.size < mirrorShards.length && (
          <p
            className="text-center text-xs"
            style={{ color: 'rgba(218,112,214,0.4)', animation: 'breathe 3s ease-in-out infinite' }}
          >
            {mirrorShards.length - revealed.size} shards still waiting to be discovered ✨
          </p>
        )}
      </div>

      <style>{`
        @keyframes shardReveal {
          0% { opacity: 0; transform: scale(0.94) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
