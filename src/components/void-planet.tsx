import { useEffect, useRef, useState } from 'react'
import { VOID_LINES, VOID_PHOTO } from '../lib/birthday-data'

export function Void({ onLeave }: { onLeave: () => void }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [showPhoto, setShowPhoto] = useState(false)
  const [showFinal, setShowFinal] = useState(false)
  const [canLeave, setCanLeave] = useState(false)
  const startScroll = useRef<number | null>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    VOID_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLineIndex(i), i * 5000))
    })
    const afterLines = VOID_LINES.length * 5000
    timers.push(setTimeout(() => setShowPhoto(true), afterLines + 1000))
    timers.push(setTimeout(() => setShowFinal(true), afterLines + 1000 + 10000))
    timers.push(setTimeout(() => setCanLeave(true), afterLines + 1000 + 12000))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!canLeave) return
    const onWheel = (e: WheelEvent) => { if (Math.abs(e.deltaY) > 10) onLeave() }
    const onTouchStart = (e: TouchEvent) => { startScroll.current = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      if (startScroll.current === null) return
      if (Math.abs(e.touches[0].clientY - startScroll.current) > 40) onLeave()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [canLeave, onLeave])

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 text-center" style={{ background: '#02020a' }}>
      {!showPhoto && (
        <div className="flex flex-col items-center gap-6">
          {VOID_LINES.slice(0, lineIndex + 1).map((line, i) => (
            <p
              key={i}
              className={`text-xl italic leading-relaxed sm:text-2xl ${i === lineIndex ? 'animate-fade-in-slow opacity-0' : ''}`}
              style={{ color: i === lineIndex ? 'rgba(245,236,216,0.9)' : 'rgba(245,236,216,0.25)' }}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {showPhoto && (
        <div className="flex flex-col items-center gap-10">
          <div className="animate-fade-in-slow overflow-hidden rounded-2xl opacity-0" style={{ boxShadow: '0 0 80px rgba(155,123,255,0.3)' }}>
            <img
              src={VOID_PHOTO}
              alt="What I see when I close my eyes"
              crossOrigin="anonymous"
              className="max-h-[60svh] w-auto max-w-[88vw] object-contain"
            />
          </div>
          {showFinal && (
            <p className="animate-fade-in-slow text-xl italic opacity-0 sm:text-2xl" style={{ color: 'rgba(245,236,216,0.9)' }}>
              This is what I see when I close my eyes.
            </p>
          )}
        </div>
      )}

      {canLeave && (
        <p className="animate-fade-in-slow fixed bottom-8 left-1/2 -translate-x-1/2 text-xs italic opacity-0" style={{ color: 'rgba(245,236,216,0.2)' }}>
          scroll to leave
        </p>
      )}
    </div>
  )
}
