import { useEffect, useState } from 'react'
import { Starfield } from './starfield'
import { BackButton } from './back-button'
import { RELATIONSHIP_START } from '../lib/birthday-data'

function diff() {
  const now = Date.now()
  const start = RELATIONSHIP_START.getTime()
  let ms = Math.max(0, now - start)
  const days = Math.floor(ms / 86400000)
  ms -= days * 86400000
  const hours = Math.floor(ms / 3600000)
  ms -= hours * 3600000
  const minutes = Math.floor(ms / 60000)
  ms -= minutes * 60000
  const seconds = Math.floor(ms / 1000)
  return { days, hours, minutes, seconds }
}

function Unit({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(value)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    if (value !== display) {
      setFlip(true)
      const t = setTimeout(() => {
        setDisplay(value)
        setFlip(false)
      }, 220)
      return () => clearTimeout(t)
    }
  }, [value, display])

  return (
    <div className="flex flex-col items-center">
      <div
        className="glass flex items-center justify-center rounded-2xl px-3 py-4 sm:px-6 sm:py-6"
        style={{ minWidth: 'clamp(78px,15vw,120px)', boxShadow: '0 0 30px rgba(247,215,116,0.2)', perspective: '500px' }}
      >
        <span
          className={`tabular-nums text-3xl sm:text-5xl ${flip ? 'animate-flip' : ''}`}
          style={{ fontFamily: 'var(--font-cinzel)', color: '#f7d774', textShadow: '0 0 18px rgba(247,215,116,0.7)' }}
        >
          {String(display).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[10px] tracking-[0.3em] sm:text-xs" style={{ fontFamily: 'var(--font-cinzel)', color: 'rgba(245,236,216,0.6)' }}>
        {label}
      </span>
    </div>
  )
}

export function Eternity({ onBack }: { onBack: () => void }) {
  const [time, setTime] = useState(diff())

  useEffect(() => {
    const id = setInterval(() => setTime(diff()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 py-20">
      <Starfield density={1} />
      <BackButton onClick={onBack} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="mb-2 text-2xl tracking-[0.3em] sm:text-3xl" style={{ fontFamily: 'var(--font-cinzel)', color: '#f7d774', textShadow: '0 0 18px rgba(247,215,116,0.7)' }}>
          ETERNITY
        </h1>
        <p className="mb-10 text-lg tracking-wider sm:text-xl" style={{ fontFamily: 'var(--font-cinzel)', color: 'rgba(245,236,216,0.8)' }}>
          We have been us for
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <Unit value={time.days} label="DAYS" />
          <Unit value={time.hours} label="HOURS" />
          <Unit value={time.minutes} label="MINUTES" />
          <Unit value={time.seconds} label="SECONDS" />
        </div>

        <p className="mt-10 text-base tracking-widest sm:text-lg" style={{ fontFamily: 'var(--font-cinzel)', color: 'rgba(247,215,116,0.9)', textShadow: '0 0 18px rgba(247,215,116,0.5)' }}>
          Since December 19, 2022
        </p>

        <p className="mt-6 max-w-lg text-lg italic sm:text-xl" style={{ color: 'rgba(245,236,216,0.9)' }}>
          Every single second on that counter is one I chose you.
        </p>

        <p className="mt-4 text-sm italic" style={{ color: 'rgba(245,236,216,0.45)' }}>
          Current time in her heart: always.
        </p>
      </div>
    </div>
  )
}
