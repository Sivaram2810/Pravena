import { useEffect, useState } from 'react'
import { X, Lock } from 'lucide-react'
import { Starfield } from './starfield'
import { BackButton } from './back-button'
import { ENVELOPES } from '../lib/birthday-data'

const STORAGE_KEY = 'serendipity_unlocked_v1'

export function Serendipity({ onBack }: { onBack: () => void }) {
  const [unlocked, setUnlocked] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUnlocked(Math.min(ENVELOPES.length - 1, parseInt(raw, 10) || 0))
    } catch { /* ignore */ }
    setReady(true)
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
    }
  }

  const isFinal = open === ENVELOPES.length - 1

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden px-4 py-20">
      <Starfield density={0.8} />
      <BackButton onClick={onBack} />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 className="mb-1 text-2xl tracking-[0.3em] sm:text-3xl" style={{ fontFamily: 'var(--font-cinzel)', color: '#f7d774', textShadow: '0 0 18px rgba(247,215,116,0.7)' }}>
          SERENDIPITY
        </h1>
        <p className="mb-2 text-sm italic" style={{ color: 'rgba(245,236,216,0.5)' }}>
          18 reasons. Open them in order — each one unlocks the next.
        </p>
      </div>

      {ready && (
        <div className="relative z-10 mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5 md:grid-cols-6">
          {ENVELOPES.map((_env, i) => {
            const locked = i > unlocked
            const isLast = i === ENVELOPES.length - 1
            return (
              <button
                key={i}
                onClick={() => handleOpen(i)}
                disabled={locked}
                aria-label={locked ? `Envelope ${i + 1}, locked` : `Open envelope ${i + 1}`}
                className={`group relative flex items-center justify-center rounded-lg transition-all ${locked ? 'cursor-not-allowed' : 'hover:-translate-y-1 hover:scale-105'} ${isLast ? 'col-span-3 sm:col-span-4 md:col-span-2' : ''}`}
                style={{
                  aspectRatio: isLast ? '3/1' : '4/3',
                  background: locked ? 'linear-gradient(160deg,#2a2a3a,#16161f)' : isLast ? 'linear-gradient(160deg,#f7d774,#d9a93a)' : 'linear-gradient(160deg,#f7d774,#e8b94a)',
                  boxShadow: locked ? 'inset 0 0 10px rgba(0,0,0,0.4)' : isLast ? '0 0 40px rgba(247,215,116,0.7)' : '0 0 18px rgba(247,215,116,0.4)',
                  border: isLast ? '2px solid #fff4cf' : 'none',
                }}
              >
                {!locked && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 h-0 w-0"
                    style={{
                      borderLeft: '50px solid transparent',
                      borderRight: '50px solid transparent',
                      borderTop: '28px solid rgba(0,0,0,0.08)',
                    }}
                  />
                )}
                {locked ? (
                  <Lock className="size-5" style={{ color: 'rgba(245,236,216,0.4)' }} />
                ) : (
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: isLast ? 'clamp(14px,2vw,18px)' : 18, color: '#5a3d0a' }}>
                    {isLast ? '✦ 18 ✦' : i + 1}
                  </span>
                )}
                {isLast && !locked && (
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] italic tracking-wider" style={{ color: 'rgba(247,215,116,0.8)' }}>
                    The Final Chapter
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      <p className="relative z-10 mx-auto mt-10 max-w-md text-center text-sm italic" style={{ color: 'rgba(245,236,216,0.4)' }}>
        {unlocked + 1 >= ENVELOPES.length ? 'All 18 unlocked. The final chapter awaits.' : `${unlocked + 1} of ${ENVELOPES.length} unlocked.`}
      </p>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
          onClick={() => setOpen(null)}
        >
          <div
            className={`glass animate-scale-in relative max-h-[85svh] w-full overflow-y-auto rounded-3xl p-8 opacity-0 no-scrollbar sm:p-10 ${isFinal ? 'max-w-2xl' : 'max-w-lg'}`}
            style={{
              boxShadow: isFinal ? '0 0 90px rgba(247,215,116,0.55)' : '0 0 60px rgba(247,215,116,0.35)',
              border: isFinal ? '2px solid rgba(247,215,116,0.6)' : '1px solid rgba(247,215,116,0.18)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4" style={{ color: 'rgba(245,236,216,0.6)' }}>
              <X className="size-5" />
            </button>

            {isFinal && (
              <div className="mb-6 flex justify-center">
                <div
                  className="flex items-center justify-center rounded-full text-2xl"
                  style={{
                    width: 64, height: 64,
                    background: 'radial-gradient(circle at 35% 35%, #9b2828, #5a1010)',
                    boxShadow: '0 0 30px rgba(247,215,116,0.5)',
                    color: '#f7d774',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                >✦</div>
              </div>
            )}

            <p className="mb-3 text-center text-xs tracking-[0.3em]" style={{ fontFamily: 'var(--font-cinzel)', color: 'rgba(247,215,116,0.7)' }}>
              ENVELOPE {open + 1}
            </p>
            <h2 className={`mb-5 text-center tracking-wide ${isFinal ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`} style={{ fontFamily: 'var(--font-cinzel)', color: '#f7d774', textShadow: '0 0 18px rgba(247,215,116,0.7)' }}>
              {ENVELOPES[open].title}
            </h2>
            <div
              className={`whitespace-pre-line leading-relaxed ${isFinal ? 'text-lg italic sm:text-xl' : 'text-center text-lg italic sm:text-xl'}`}
              style={{ color: 'rgba(245,236,216,0.95)' }}
            >
              {ENVELOPES[open].content}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
