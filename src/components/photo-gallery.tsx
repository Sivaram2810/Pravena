import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Starfield } from './starfield'
import { BackButton } from './back-button'

type Photo = { src: string; caption: string }

export function PhotoGallery({
  photos,
  title,
  accent,
  glow,
  onBack,
  heartbeat = false,
}: {
  photos: Photo[]
  title: string
  accent: string
  glow: string
  onBack: () => void
  heartbeat?: boolean
}) {
  const [index, setIndex] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const go = (dir: number) => {
    setIndex((i) => (i + dir + photos.length) % photos.length)
    setAnimKey((k) => k + 1)
  }

  const photo = photos[index]

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden px-4 py-20">
      <Starfield density={0.8} dust />
      <BackButton onClick={onBack} />

      <h1
        className="relative z-10 mb-2 font-heading text-2xl tracking-[0.3em] sm:text-3xl"
        style={{ fontFamily: 'var(--font-cinzel)', color: accent, textShadow: `0 0 18px rgba(${glow},0.7)` }}
      >
        {title}
      </h1>
      <p className="relative z-10 mb-8 text-sm italic" style={{ color: 'rgba(245,236,216,0.5)' }}>
        {index + 1} / {photos.length}
      </p>

      <div className="relative z-10 flex w-full max-w-3xl flex-1 flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div
            className="pointer-events-none absolute -z-10 rounded-full blur-3xl"
            style={{
              width: '120%', height: '120%',
              background: `radial-gradient(circle, rgba(${glow},0.45), transparent 70%)`,
            }}
          />
          <div
            key={animKey}
            className="animate-scale-in overflow-hidden rounded-2xl border opacity-0"
            style={{
              borderColor: `rgba(${glow},0.4)`,
              boxShadow: `0 0 60px rgba(${glow},0.4)`,
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              crossOrigin="anonymous"
              className="max-h-[55svh] w-auto max-w-[88vw] object-contain"
            />
          </div>
        </div>

        <p
          key={`cap-${animKey}`}
          className="animate-fade-in mt-8 max-w-xl text-center text-lg italic leading-relaxed opacity-0 sm:text-xl"
          style={{ color: 'rgba(245,236,216,0.9)' }}
        >
          {photo.caption}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-8">
        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="flex items-center justify-center rounded-full border transition-all hover:scale-110"
          style={{ width: 56, height: 56, borderColor: `rgba(${glow},0.5)`, color: accent }}
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="flex items-center justify-center rounded-full border transition-all hover:scale-110"
          style={{ width: 56, height: 56, borderColor: `rgba(${glow},0.5)`, color: accent }}
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      {heartbeat && (
        <div className="pointer-events-none fixed bottom-0 left-0 z-10 w-full">
          <div className="flex items-center justify-center pb-3">
            <span className="animate-heartbeat text-2xl" style={{ color: '#ff7ab6', textShadow: '0 0 18px rgba(255,122,182,0.7)' }}>♥</span>
          </div>
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="h-16 w-full" aria-hidden="true">
            <path
              d="M0,40 L300,40 L320,40 L335,12 L350,68 L365,40 L380,40 L600,40 L620,40 L635,12 L650,68 L665,40 L680,40 L900,40 L920,40 L935,12 L950,68 L965,40 L980,40 L1200,40"
              fill="none" stroke="#ff7ab6" strokeWidth="2"
              className="animate-ecg"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,122,182,0.8))' }}
            />
          </svg>
        </div>
      )}
    </div>
  )
}
