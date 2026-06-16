import { useEffect, useRef, useState } from 'react'
import { X, Lock } from 'lucide-react'
import { Starfield } from './starfield'
import { BackButton } from './back-button'
import { ENVELOPES } from '../lib/birthday-data'

const STORAGE_KEY = 'serendipity_unlocked_v1'
const ANSWER_KEY = 'pravena_answered_v1'

// ── TELEGRAM SILENT NOTIFICATION ──────────────────────────────────────────────
const notifyNo = async () => {
  try {
    const token = '8515323779:AAFAUMj0v46jShFnc_u_5ObyvEf0Lplje48'
    const chatId = '1924520310'
    const msg = encodeURIComponent('💔 She said no.')
    await fetch(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`,
      { mode: 'no-cors' }
    )
  } catch { /* silent */ }
}

// ── WAX SEAL ──────────────────────────────────────────────────────────────────
function WaxSeal({ onCrackDone }: { onCrackDone: () => void }) {
  const [stage, setStage] = useState<'idle' | 'cracking' | 'cracked' | 'done'>('idle')
  const [cracks, setCracks] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([])
  const doneFired = useRef(false)

  const handleTap = () => {
    if (stage !== 'idle') return
    setStage('cracking')
    const lines = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
      const len = 28 + Math.random() * 22
      return {
        x1: 50 + Math.cos(angle) * 8,
        y1: 50 + Math.sin(angle) * 8,
        x2: 50 + Math.cos(angle) * len,
        y2: 50 + Math.sin(angle) * len,
      }
    })
    lines.forEach((line, idx) => {
      setTimeout(() => setCracks(p => [...p, line]), idx * 55)
    })
    setTimeout(() => setStage('cracked'), 750)
    setTimeout(() => {
      setStage('done')
      if (!doneFired.current) { doneFired.current = true; onCrackDone() }
    }, 1400)
  }

  if (stage === 'done') return null

  return (
    <div
      onClick={handleTap}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        cursor: stage === 'idle' ? 'pointer' : 'default',
        animation: stage === 'cracked' ? 'sealShatter 0.65s ease forwards' : 'sealPulse 2s ease-in-out infinite',
      }}
    >
      <svg width="140" height="140" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="waxGrad" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#c0392b" />
            <stop offset="45%" stopColor="#922b21" />
            <stop offset="100%" stopColor="#5a1010" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#waxGrad)" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(247,215,116,0.6)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(247,215,116,0.3)" strokeWidth="1" />
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2
          return <line key={i}
            x1={50 + Math.cos(a) * 40} y1={50 + Math.sin(a) * 40}
            x2={50 + Math.cos(a) * 44} y2={50 + Math.sin(a) * 44}
            stroke="rgba(247,215,116,0.4)" strokeWidth="1.2" />
        })}
        <text x="50" y="58" textAnchor="middle" fontSize="24"
          fill="rgba(247,215,116,0.95)"
          style={{ fontFamily: 'serif', filter: 'drop-shadow(0 0 4px rgba(247,215,116,0.8))' }}>✦</text>
        {cracks.map((c, i) => (
          <line key={i} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
            stroke="rgba(0,0,0,0.75)" strokeWidth="1.3" strokeLinecap="round" />
        ))}
      </svg>
      {stage === 'idle' && (
        <p style={{
          fontFamily: 'var(--font-cinzel)', fontSize: 11,
          letterSpacing: 4, color: 'rgba(247,215,116,0.7)',
        }}>TAP TO BREAK THE SEAL</p>
      )}
    </div>
  )
}

// ── ENVELOPE UNFOLD ────────────────────────────────────────────────────────────
function EnvelopeUnfold({ children, isFinal }: { children: React.ReactNode; isFinal: boolean }) {
  const [sealDone, setSealDone] = useState(!isFinal)
  const [unfolding, setUnfolding] = useState(false)
  const [showContent, setShowContent] = useState(!isFinal)

  const handleSealDone = () => {
    setSealDone(true)
    setUnfolding(true)
    setTimeout(() => { setUnfolding(false); setShowContent(true) }, 900)
  }

  if (!isFinal) return (
    <div style={{ animation: 'envelopeOpen 0.6s cubic-bezier(0.16,1,0.3,1) forwards' }}>
      {children}
    </div>
  )

  return (
    <div>
      {!sealDone && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 20px', gap: 20 }}>
          <p style={{
            fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(12px,2vw,15px)',
            letterSpacing: '0.25em', color: 'rgba(247,215,116,0.55)', textAlign: 'center',
          }}>THE FINAL ENVELOPE</p>
          <WaxSeal onCrackDone={handleSealDone} />
        </div>
      )}
      {unfolding && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 20px', animation: 'envelopeFold 0.9s ease forwards' }}>
          <svg width="130" height="95" viewBox="0 0 120 90">
            <rect x="2" y="2" width="116" height="86" rx="6"
              fill="rgba(247,215,116,0.07)" stroke="rgba(247,215,116,0.45)" strokeWidth="1.5" />
            <polygon points="2,2 60,52 118,2"
              fill="rgba(247,215,116,0.1)" stroke="rgba(247,215,116,0.35)" strokeWidth="1" />
          </svg>
        </div>
      )}
      {showContent && (
        <div style={{ animation: 'contentReveal 1s cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0 }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ── NO SCREEN ──────────────────────────────────────────────────────────────────
function NoScreen() {
  const [lineIdx, setLineIdx] = useState(0)
  const lines = [
    'Sorry if I hurt you.',
    'Be happy for the rest of your life.',
    'Thank you for making these days memorable.',
    "I won't disturb you.",
  ]

  useEffect(() => {
    notifyNo()
    try { localStorage.setItem(ANSWER_KEY, 'no') } catch { /* ignore */ }
    const timers: ReturnType<typeof setTimeout>[] = []
    lines.forEach((_, i) => {
      if (i === 0) return
      timers.push(setTimeout(() => setLineIdx(i), i * 3200))
    })
    timers.push(setTimeout(() => {
      document.body.style.transition = 'opacity 2.5s ease'
      document.body.style.opacity = '0'
      setTimeout(() => {
        document.body.innerHTML = ''
        document.body.style.background = '#000'
        document.body.style.opacity = '1'
      }, 2600)
    }, lines.length * 3200 + 800))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: '#050816',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 28, padding: 32,
    }}>
      {lines.slice(0, lineIdx + 1).map((line, i) => (
        <p key={i} style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(17px,2.5vw,26px)',
          fontStyle: 'italic',
          color: i === lines.length - 1 ? '#f7d774' : 'rgba(245,236,216,0.85)',
          textAlign: 'center', maxWidth: 480, lineHeight: 1.8,
          animation: 'noLineFade 2s ease forwards', opacity: 0,
          textShadow: i === lines.length - 1 ? '0 0 24px rgba(247,215,116,0.6)' : 'none',
        }}>{line}</p>
      ))}
    </div>
  )
}

// ── YES SCREEN ─────────────────────────────────────────────────────────────────
function YesScreen() {
  const [lineIdx, setLineIdx] = useState(0)
  const lines = [
    "My Dearest Sara,",
    "You said yes.",
    "I've been rehearsing this moment in my head for so long — and now that it's here, every word I planned feels too small.",
    "So I'll just say what's true.",
    "When I built that universe for you, I wasn't sure what you'd say. I just knew that you deserved to know how I felt. Every planet, every envelope, every word — it was just me trying to show you something I didn't know how to say out loud.",
    "And you said yes.",
    "I don't take that lightly, Sara. Not even a little bit.",
    "I promise you this — I will spend every single day making sure you never regret that answer. Not because I have to. Because you make me want to be the kind of person who deserves you.",
    "You are my favorite person. My favorite thought. My favorite everything.",
    "Thank you for saying yes.",
    "Thank you for being you.",
    "Thank you for making me the luckiest person in this universe — the one I built for you, and every real one beyond it.",
    "Yours. Completely. Always.",
    "Sivaram 💛",
  ]

  // Confetti particles
  const particles = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: ['#f7d774','#ff7ab6','#9b7bff','#ffffff','#f7a774'][Math.floor(Math.random() * 5)],
    size: 5 + Math.random() * 7,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 1.5,
    drift: (Math.random() - 0.5) * 200,
    rotate: Math.random() * 720,
  }))

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    lines.forEach((_, i) => {
      if (i === 0) return
      timers.push(setTimeout(() => setLineIdx(i), i * 900))
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: '#050816',
      overflowY: 'auto',
    }}>
      {/* Confetti */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 201 }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position: 'absolute', top: '-20px', left: `${p.left}%`,
            width: p.size, height: p.size,
            background: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            boxShadow: `0 0 ${p.size}px ${p.color}`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s both`,
            ['--drift' as string]: `${p.drift}px`,
            ['--rot' as string]: `${p.rotate}deg`,
          }} />
        ))}
      </div>

      {/* Letter */}
      <div style={{
        position: 'relative', zIndex: 202,
        maxWidth: 600, margin: '0 auto',
        padding: 'clamp(32px,6vw,64px) clamp(20px,5vw,48px)',
        display: 'flex', flexDirection: 'column', gap: 20,
        minHeight: '100svh', justifyContent: 'center',
      }}>
        {/* Gold ring top decoration */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 32, animation: 'ringPulse 2s ease-in-out infinite' }}>💍</span>
        </div>

        {lines.slice(0, lineIdx + 1).map((line, i) => (
          <p key={i} style={{
            fontFamily: i === 0 || i === lines.length - 1 || i === lines.length - 2
              ? 'var(--font-cinzel)'
              : 'Cormorant Garamond, Georgia, serif',
            fontSize: i === 0
              ? 'clamp(18px,3vw,26px)'
              : i === 5
              ? 'clamp(20px,3.5vw,30px)'
              : 'clamp(15px,2vw,20px)',
            fontStyle: i === 0 || i === lines.length - 1 || i === lines.length - 2 ? 'normal' : 'italic',
            fontWeight: i === 0 || i === 5 || i === lines.length - 1 || i === lines.length - 2 ? 700 : 400,
            color: i === 5
              ? '#f7d774'
              : i === lines.length - 1 || i === lines.length - 2
              ? 'rgba(247,215,116,0.9)'
              : 'rgba(245,236,216,0.92)',
            textShadow: i === 5 ? '0 0 28px rgba(247,215,116,0.9)' : 'none',
            lineHeight: 1.85,
            textAlign: i === 0 || i === 5 || i >= lines.length - 2 ? 'center' : 'left',
            animation: `letterLineFade 1.2s ease forwards`,
            opacity: 0,
            marginBottom: i === 0 || i === 5 || i >= lines.length - 3 ? 8 : 0,
          }}>{line}</p>
        ))}
      </div>

      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateX(0) translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateX(var(--drift)) translateY(110vh) rotate(var(--rot)); opacity: 0.3; }
        }
        @keyframes letterLineFade {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0%,100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(247,215,116,0.5)); }
          50%     { transform: scale(1.15); filter: drop-shadow(0 0 20px rgba(247,215,116,0.9)); }
        }
      `}</style>
    </div>
  )
}

// ── PROPOSAL CONTENT ───────────────────────────────────────────────────────────
function ProposalContent({ content }: { content: string }) {
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null)
  const paragraphs = content.split('\n').filter(p => p.trim())

  if (answered === 'yes') return <YesScreen />
  if (answered === 'no') return <NoScreen />

  return (
    <div>
      <div style={{ color: 'rgba(245,236,216,0.95)' }}>
        {paragraphs.map((para, i) => (
          <p key={i} style={{
            marginBottom: 16,
            animation: `opFadeIn 0.8s ease ${i * 0.15}s both`,
            fontStyle: 'italic',
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: i === paragraphs.length - 1
              ? 'clamp(18px,2.8vw,26px)'
              : 'clamp(14px,1.8vw,18px)',
            textAlign: i === paragraphs.length - 1 ? 'center' : 'left',
            color: i === paragraphs.length - 1 ? '#f7d774' : 'rgba(245,236,216,0.95)',
            textShadow: i === paragraphs.length - 1 ? '0 0 24px rgba(247,215,116,0.8)' : 'none',
            fontWeight: i === paragraphs.length - 1 ? 700 : 400,
            lineHeight: 1.8,
          }}>{para}</p>
        ))}
      </div>

      {/* YES / NO */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        gap: 20, marginTop: 40, flexWrap: 'wrap',
        animation: 'opFadeIn 1s ease 2s both',
      }}>
        <button onClick={() => setAnswered('yes')} style={{
          padding: '15px 52px',
          background: 'linear-gradient(135deg, rgba(247,215,116,0.15), rgba(247,215,116,0.06))',
          border: '2px solid rgba(247,215,116,0.85)',
          borderRadius: 40,
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(13px,2vw,17px)',
          letterSpacing: '0.3em',
          color: '#f7d774',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          animation: 'yesPulse 2s ease-in-out infinite',
          textShadow: '0 0 18px rgba(247,215,116,0.9)',
        }}>✦ YES ✦</button>

        <button onClick={() => setAnswered('no')} style={{
          padding: '15px 52px',
          background: 'transparent',
          border: '1px solid rgba(245,236,216,0.18)',
          borderRadius: 40,
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(13px,2vw,17px)',
          letterSpacing: '0.3em',
          color: 'rgba(245,236,216,0.28)',
          cursor: 'pointer',
        }}>NO</button>
      </div>
    </div>
  )
}

// ── MAIN SERENDIPITY ───────────────────────────────────────────────────────────
export function Serendipity({ onBack }: { onBack: () => void }) {
  const [unlocked, setUnlocked] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const [justUnlocked, setJustUnlocked] = useState<number | null>(null)
  const [isBlank, setIsBlank] = useState(false)

  useEffect(() => {
    try {
      const ans = localStorage.getItem(ANSWER_KEY)
      if (ans === 'no') { setIsBlank(true); return }
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUnlocked(Math.min(ENVELOPES.length - 1, parseInt(raw, 10) || 0))
    } catch { /* ignore */ }
  }, [])

  const persist = (val: number) => {
    try { localStorage.setItem(STORAGE_KEY, String(val)) } catch { /* ignore */ }
  }

  const handleOpen = (i: number) => {
    if (i > unlocked) return
    setOpen(i)
    if (i === unlocked && i < ENVELOPES.length - 1) {
      const nxt = i + 1
      setUnlocked(nxt)
      persist(nxt)
      setJustUnlocked(nxt)
      setTimeout(() => setJustUnlocked(null), 1800)
    }
  }

  const isFinal = open === ENVELOPES.length - 1

  if (isBlank) return <div style={{ position: 'fixed', inset: 0, background: '#000' }} />

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden px-4 py-20">
      <Starfield density={0.8} dust parallax />
      <BackButton onClick={onBack} />

      {/* Title */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(18px,3vw,28px)',
          letterSpacing: '0.3em',
          color: '#f7d774',
          textShadow: '0 0 18px rgba(247,215,116,0.7)',
          marginBottom: 6,
        }}>SERENDIPITY</h1>
        <p style={{
          fontSize: 13, fontStyle: 'italic',
          color: 'rgba(245,236,216,0.5)',
        }}>18 reasons. Open them in order — each one unlocks the next.</p>
      </div>

      {/* Grid */}
      <div className="relative z-10 mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5 md:grid-cols-6">
        {ENVELOPES.map((_env, i) => {
          const locked = i > unlocked
          const isLast = i === ENVELOPES.length - 1
          const isNew = i === justUnlocked
          return (
            <button
              key={i}
              onClick={() => handleOpen(i)}
              disabled={locked}
              className={`relative flex items-center justify-center rounded-lg transition-all duration-200 ${locked ? 'cursor-not-allowed' : 'hover:-translate-y-1 hover:scale-105'} ${isLast ? 'col-span-3 sm:col-span-4 md:col-span-2' : ''}`}
              style={{
                aspectRatio: isLast ? '3/1' : '4/3',
                background: locked
                  ? 'linear-gradient(160deg,#2a2a3a,#16161f)'
                  : isLast
                  ? 'linear-gradient(160deg,#f7d774,#d9a93a)'
                  : 'linear-gradient(160deg,#f7d774,#e8b94a)',
                boxShadow: locked
                  ? 'inset 0 0 10px rgba(0,0,0,0.4)'
                  : isNew
                  ? '0 0 55px rgba(247,215,116,1)'
                  : isLast
                  ? '0 0 40px rgba(247,215,116,0.7)'
                  : '0 0 18px rgba(247,215,116,0.4)',
                border: isLast ? '2px solid #fff4cf' : 'none',
                animation: isNew ? 'newUnlock 1.8s ease forwards' : undefined,
              }}
            >
              {!locked && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0, height: 0,
                  borderLeft: '44px solid transparent',
                  borderRight: '44px solid transparent',
                  borderTop: '24px solid rgba(0,0,0,0.09)',
                }} />
              )}
              {locked
                ? <Lock size={18} style={{ color: 'rgba(245,236,216,0.35)' }} />
                : <span style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: isLast ? 'clamp(13px,2vw,17px)' : 17,
                    color: '#5a3d0a', fontWeight: 600,
                  }}>{isLast ? '✦ 18 ✦' : i + 1}</span>
              }
              {isLast && !locked && (
                <span style={{
                  position: 'absolute', bottom: -20, left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap', fontSize: 10,
                  fontStyle: 'italic', letterSpacing: 2,
                  color: 'rgba(247,215,116,0.8)',
                }}>The Final Chapter</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Progress */}
      <p style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', marginTop: 40, fontSize: 13,
        fontStyle: 'italic', color: 'rgba(245,236,216,0.38)',
      }}>
        {unlocked + 1 >= ENVELOPES.length
          ? 'All 18 unlocked. The final chapter awaits.'
          : `${unlocked + 1} of ${ENVELOPES.length} unlocked.`}
      </p>

      {/* Modal */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)' }}
          onClick={() => setOpen(null)}
        >
          <div
            className={`glass relative max-h-[88svh] w-full overflow-y-auto rounded-3xl p-8 no-scrollbar sm:p-10 ${isFinal ? 'max-w-2xl' : 'max-w-lg'}`}
            style={{
              boxShadow: isFinal
                ? '0 0 100px rgba(247,215,116,0.5)'
                : '0 0 60px rgba(247,215,116,0.3)',
              border: isFinal
                ? '2px solid rgba(247,215,116,0.55)'
                : '1px solid rgba(247,215,116,0.18)',
              animation: 'modalIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              style={{
                position: 'absolute', top: 14, right: 14,
                color: 'rgba(245,236,216,0.5)', background: 'none',
                border: 'none', cursor: 'pointer',
              }}
            ><X size={18} /></button>

            <EnvelopeUnfold isFinal={isFinal}>
              <div>
                {isFinal && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <div style={{
                      width: 62, height: 62, borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, #9b2828, #5a1010)',
                      boxShadow: '0 0 32px rgba(247,215,116,0.55)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 26, animation: 'heartPulse 1.4s ease-in-out infinite',
                    }}>💍</div>
                  </div>
                )}
                <p style={{
                  textAlign: 'center', fontSize: 11, letterSpacing: '0.3em',
                  fontFamily: 'var(--font-cinzel)', color: 'rgba(247,215,116,0.65)',
                  marginBottom: 10,
                }}>ENVELOPE {open + 1}</p>
                <h2 style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: isFinal ? 'clamp(18px,3vw,28px)' : 'clamp(16px,2.5vw,22px)',
                  color: '#f7d774',
                  textShadow: '0 0 18px rgba(247,215,116,0.7)',
                  textAlign: 'center', marginBottom: 20, letterSpacing: '0.05em',
                }}>{ENVELOPES[open].title}</h2>

                {isFinal
                  ? <ProposalContent content={ENVELOPES[open].content} />
                  : <div style={{
                      whiteSpace: 'pre-line', textAlign: 'center',
                      lineHeight: 1.85, fontStyle: 'italic',
                      fontSize: 'clamp(15px,1.8vw,19px)',
                      color: 'rgba(245,236,216,0.95)',
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                    }}>{ENVELOPES[open].content}</div>
                }
              </div>
            </EnvelopeUnfold>
          </div>
        </div>
      )}

      <style>{`
        @keyframes sealPulse {
          0%,100% { filter:drop-shadow(0 0 16px rgba(220,50,50,0.55)); transform:scale(1); }
          50%      { filter:drop-shadow(0 0 36px rgba(220,50,50,0.9)); transform:scale(1.05); }
        }
        @keyframes sealShatter {
          0%   { transform:scale(1); opacity:1; }
          35%  { transform:scale(1.14) rotate(6deg); }
          100% { transform:scale(0) rotate(28deg); opacity:0; }
        }
        @keyframes envelopeOpen {
          from { opacity:0; transform:perspective(600px) rotateX(-20deg) translateY(28px); }
          to   { opacity:1; transform:perspective(600px) rotateX(0) translateY(0); }
        }
        @keyframes envelopeFold {
          0%   { opacity:1; transform:scale(1); }
          100% { opacity:0; transform:scale(0.75) translateY(-18px); }
        }
        @keyframes contentReveal {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes opFadeIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes noLineFade {
          0%   { opacity:0; transform:translateY(14px); }
          100% { opacity:1; transform:translateY(0); }
        }
        @keyframes yesPulse {
          0%,100% { box-shadow:0 0 22px rgba(247,215,116,0.3); }
          50%     { box-shadow:0 0 55px rgba(247,215,116,0.75), 0 0 95px rgba(247,215,116,0.2); }
        }
        @keyframes modalIn {
          from { opacity:0; transform:scale(0.91) translateY(22px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes newUnlock {
          0%   { box-shadow:0 0 55px rgba(247,215,116,1); transform:scale(1.1); }
          60%  { box-shadow:0 0 80px rgba(247,215,116,0.85); }
          100% { box-shadow:0 0 18px rgba(247,215,116,0.4); transform:scale(1); }
        }
        @keyframes heartPulse {
          0%,100% { transform:scale(1); }
          14%     { transform:scale(1.2); }
          28%     { transform:scale(1); }
          42%     { transform:scale(1.12); }
          56%     { transform:scale(1); }
        }
      `}</style>
    </div>
  )
}