import { useEffect, useRef, useState } from 'react'
import { Starfield } from './starfield'
import { PLANETS, SUN_IMAGE, type PlanetId } from '../lib/birthday-data'

export function SolarHub({ onNavigate }: { onNavigate: (id: PlanetId) => void }) {
  const visiblePlanets = PLANETS.filter((p) => p.id !== 'void')
  const [voidVisible, setVoidVisible] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const arm = () => {
      setVoidVisible(false)
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setVoidVisible(true), 5000)
    }
    arm()
    const events = ['mousemove', 'touchstart', 'scroll', 'keydown']
    events.forEach((e) => window.addEventListener(e, arm))
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      events.forEach((e) => window.removeEventListener(e, arm))
    }
  }, [])

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden px-4 py-10">
      <Starfield density={1} />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 12, letterSpacing: 8, color: 'rgba(247,215,116,0.7)', marginBottom: 8 }}>
          WELCOME TO
        </p>
        <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(26px,4vw,40px)', color: '#f7d774', textShadow: '0 0 18px rgba(247,215,116,0.7)', marginBottom: 36, textAlign: 'center' }}>
          Your Universe
        </h1>

        {/* Desktop orbiting system */}
        <div className="relative hidden aspect-square w-full max-w-[620px] items-center justify-center sm:flex">
          {[0, 1, 2].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full"
              style={{
                width: `${45 + ring * 18}%`,
                height: `${45 + ring * 18}%`,
                border: '1px solid rgba(247,215,116,0.1)',
              }}
            />
          ))}

          {/* Sun */}
          <div className="animate-float absolute z-20 flex items-center justify-center">
            <div
              className="animate-pulse-glow relative overflow-hidden rounded-full"
              style={{ width: 140, height: 140 }}
            >
              <img
                src={SUN_IMAGE}
                alt="Pravena, the center of this universe"
                crossOrigin="anonymous"
                className="size-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full" style={{ background: 'linear-gradient(to top right, rgba(247,215,116,0.25), rgba(255,122,182,0.15))' }} />
            </div>
          </div>

          {/* Orbiting planets */}
          {visiblePlanets.map((planet, i) => {
            const total = visiblePlanets.length
            const ring = i % 3
            const radiusPx = 148 + ring * 54
            const duration = 30 + ring * 12
            const startAngle = (360 / total) * i
            const delay = -(startAngle / 360) * duration
            return (
              <div
                key={planet.id}
                className="absolute"
                style={{
                  left: '50%', top: '50%',
                  width: 0, height: 0,
                  animation: `spinOrbit ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                <button
                  onClick={() => onNavigate(planet.id)}
                  className="group absolute"
                  style={{ left: `${radiusPx}px`, top: 0, transform: 'translate(-50%,-50%)' }}
                  aria-label={`${planet.name} — ${planet.desc}`}
                >
                  <span
                    className="flex items-center justify-center rounded-full text-center text-white transition-transform duration-300 group-hover:scale-125"
                    style={{
                      width: 68, height: 68,
                      fontFamily: 'var(--font-cinzel)',
                      fontSize: 9,
                      letterSpacing: '0.08em',
                      background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
                      boxShadow: `0 0 24px 4px rgba(${planet.glow},0.6), inset 0 0 14px rgba(255,255,255,0.3)`,
                      animation: `spinOrbit ${duration}s linear infinite reverse`,
                      animationDelay: `${-delay}s`,
                    }}
                  >
                    {planet.name}
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        {/* Mobile grid */}
        <div className="grid w-full grid-cols-2 gap-4 sm:hidden">
          <div className="col-span-2 mb-2 flex justify-center">
            <div className="animate-pulse-glow relative overflow-hidden rounded-full" style={{ width: 112, height: 112 }}>
              <img
                src={SUN_IMAGE}
                alt="Pravena, the center of this universe"
                crossOrigin="anonymous"
                className="size-full object-cover"
              />
            </div>
          </div>
          {visiblePlanets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => onNavigate(planet.id)}
              className="glass flex flex-col items-center gap-2 rounded-2xl p-4 transition-transform active:scale-95"
            >
              <span
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 48, height: 48,
                  background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
                  boxShadow: `0 0 18px 2px rgba(${planet.glow},0.6)`,
                }}
              />
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: 11, letterSpacing: '0.15em', color: '#f5ecd8' }}>
                {planet.name}
              </span>
              <span style={{ fontSize: 12, fontStyle: 'italic', color: 'rgba(245,236,216,0.6)' }}>{planet.desc}</span>
            </button>
          ))}
        </div>

        <p style={{ marginTop: 36, textAlign: 'center', fontSize: 13, fontStyle: 'italic', color: 'rgba(245,236,216,0.4)' }}>
          Tap a planet to explore. — be still, and watch.
        </p>
      </div>

      {/* Void orb */}
      <button
        onClick={() => onNavigate('void')}
        aria-label="A hidden place"
        className="fixed bottom-4 left-4 z-40 rounded-full transition-opacity duration-[3000ms]"
        style={{
          width: 32, height: 32,
          opacity: voidVisible ? 0.55 : 0,
          pointerEvents: voidVisible ? 'auto' : 'none',
          background: 'radial-gradient(circle at 40% 40%, rgba(80,80,120,0.6), rgba(5,5,12,0.9))',
          boxShadow: '0 0 14px 2px rgba(60,60,100,0.5)',
        }}
      />

      <style>{`
        @keyframes spinOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
