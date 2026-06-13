import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Starfield } from './starfield'
import { BackButton } from './back-button'
import { ORACLE_MESSAGES } from '../lib/birthday-data'

const STORAGE_KEY = 'oracle_state_v1'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function Oracle({ onBack }: { onBack: () => void }) {
  const [opened, setOpened] = useState(false)
  const [dayIndex, setDayIndex] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let day = 0
    let isOpenToday = false
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { lastDate: string; day: number }
        if (parsed.lastDate === todayKey()) {
          day = parsed.day
          isOpenToday = true
        } else {
          day = (parsed.day + 1) % ORACLE_MESSAGES.length
        }
      }
    } catch { day = 0 }
    setDayIndex(day)
    setOpened(isOpenToday)
    setReady(true)
  }, [])

  const open = () => {
    setOpened(true)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lastDate: todayKey(), day: dayIndex }))
    } catch { /* ignore */ }
  }

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 py-20">
      <Starfield density={0.9} />
      <BackButton onClick={onBack} />

      <h1 className="relative z-10 mb-2 text-2xl tracking-[0.3em] sm:text-3xl" style={{ fontFamily: 'var(--font-cinzel)', color: '#f7d774', textShadow: '0 0 18px rgba(247,215,116,0.7)' }}>
        ORACLE
      </h1>
      <p className="relative z-10 mb-10 text-sm italic" style={{ color: 'rgba(245,236,216,0.5)' }}>
        One message a day. Today's is waiting for you.
      </p>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        {!ready ? null : !opened ? (
          <button onClick={open} aria-label="Open today's message" className="group relative flex flex-col items-center">
            <div className="animate-float relative">
              <div
                className="relative flex items-end justify-center rounded-lg"
                style={{
                  width: 'clamp(240px,70vw,380px)',
                  height: 'clamp(160px,50vw,200px)',
                  background: 'linear-gradient(160deg, #f7d774, #e8b94a)',
                  boxShadow: '0 0 60px rgba(247,215,116,0.6), inset 0 -10px 30px rgba(0,0,0,0.15)',
                }}
              >
                <div
                  className="absolute left-0 top-0 h-0 w-0"
                  style={{
                    borderLeft: 'calc(clamp(240px,70vw,380px) / 2) solid transparent',
                    borderRight: 'calc(clamp(240px,70vw,380px) / 2) solid transparent',
                    borderTop: 'calc(clamp(160px,50vw,200px) * 0.45) solid #f0c95e',
                  }}
                />
                <div className="absolute bottom-6 z-10 flex items-center justify-center rounded-full text-gold shadow-lg" style={{ width: 48, height: 48, background: '#7a1d1d' }}>
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
            </div>
            <span className="mt-6 text-sm tracking-widest transition-all group-hover:text-glow-gold" style={{ fontFamily: 'var(--font-cinzel)', color: '#f7d774' }}>
              TAP TO OPEN
            </span>
          </button>
        ) : (
          <div className="glass animate-scale-in w-full rounded-3xl p-8 opacity-0 sm:p-10" style={{ boxShadow: '0 0 60px rgba(247,215,116,0.35)' }}>
            <p className="mb-4 flex items-center justify-center gap-2 text-center text-xs tracking-[0.3em]" style={{ fontFamily: 'var(--font-cinzel)', color: 'rgba(247,215,116,0.7)' }}>
              <Sparkles className="h-3.5 w-3.5" />
              TODAY'S MESSAGE
              <Sparkles className="h-3.5 w-3.5" />
            </p>
            <p className="text-center text-xl italic leading-relaxed sm:text-2xl" style={{ color: 'rgba(245,236,216,0.95)' }}>
              {ORACLE_MESSAGES[dayIndex]}
            </p>
            <p className="mt-6 text-center text-xs italic" style={{ color: 'rgba(245,236,216,0.4)' }}>
              Come back tomorrow for another.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
