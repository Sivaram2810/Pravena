import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Starfield } from './starfield'
import { BackButton } from './back-button'
import { COMIC_PAGES } from '../lib/birthday-data'

export function Chronicles({ onBack }: { onBack: () => void }) {
  const [page, setPage] = useState(0)
  const [dir, setDir] = useState(1)
  const [key, setKey] = useState(0)

  const total = COMIC_PAGES.length
  const atEnd = page >= total

  const go = (d: number) => {
    setDir(d)
    setPage((p) => Math.min(total, Math.max(0, p + d)))
    setKey((k) => k + 1)
  }

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden px-4 py-20">
      <Starfield density={0.7} dust={false} />
      <BackButton onClick={onBack} />

      <h1 className="relative z-10 mb-1 text-2xl tracking-[0.2em] sm:text-3xl" style={{ fontFamily: 'var(--font-cinzel)', color: '#f7d774', textShadow: '0 0 18px rgba(247,215,116,0.7)' }}>
        Our Story — A Comic
      </h1>
      <p className="relative z-10 mb-6 text-sm italic" style={{ color: 'rgba(245,236,216,0.5)' }}>
        {atEnd ? 'The End' : `Page ${page + 1} / ${total}`}
      </p>

      <div className="relative z-10 flex w-full max-w-2xl flex-1 items-center justify-center" style={{ perspective: '1600px' }}>
        {atEnd ? (
          <div className="animate-fade-in flex flex-col items-center gap-6 text-center opacity-0">
            <p className="max-w-md text-2xl leading-relaxed sm:text-3xl" style={{ fontFamily: 'var(--font-cinzel)', color: '#f7d774', textShadow: '0 0 18px rgba(247,215,116,0.7)' }}>
              The rest of this story?
            </p>
            <p className="max-w-md text-xl italic sm:text-2xl" style={{ color: 'rgba(245,236,216,0.85)' }}>
              We haven't written it yet.
            </p>
          </div>
        ) : (
          <div
            key={key}
            className="overflow-hidden rounded-xl"
            style={{
              border: '1px solid rgba(247,215,116,0.35)',
              boxShadow: '0 0 60px rgba(247,215,116,0.25)',
              background: 'rgba(0,0,0,0.3)',
              transformOrigin: dir > 0 ? 'left center' : 'right center',
              animation: 'flipUp 0.6s ease',
            }}
          >
            <img
              src={COMIC_PAGES[page]}
              alt={`Comic page ${page + 1}`}
              crossOrigin="anonymous"
              className="max-h-[60svh] w-auto max-w-[90vw] object-contain"
            />
          </div>
        )}
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-8">
        <button
          onClick={() => go(-1)}
          disabled={page === 0}
          aria-label="Previous page"
          className="flex items-center justify-center rounded-full border transition-all hover:scale-110 disabled:opacity-25"
          style={{ width: 56, height: 56, borderColor: 'rgba(247,215,116,0.5)', color: '#f7d774' }}
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label="Next page"
          className="flex items-center justify-center rounded-full border transition-all hover:scale-110 disabled:opacity-25"
          style={{ width: 56, height: 56, borderColor: 'rgba(247,215,116,0.5)', color: '#f7d774' }}
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  )
}
