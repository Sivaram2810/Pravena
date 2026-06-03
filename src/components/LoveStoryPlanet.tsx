import { useState, useEffect, useRef, useCallback } from 'react';

const storyPages = [
  { id: 1, url: 'https://i.postimg.cc/tT86XhtC/1.png', chapter: 'Chapter 1', caption: 'The Beginning', color: '#ff69b4' },
  { id: 2, url: 'https://i.postimg.cc/P5K8LGzb/2.png', chapter: 'Chapter 2', caption: 'First Smiles', color: '#da70d6' },
  { id: 3, url: 'https://i.postimg.cc/2STBqpFh/3.png', chapter: 'Chapter 3', caption: 'Growing Closer', color: '#9b59b6' },
  { id: 4, url: 'https://i.postimg.cc/Gmbyh3Yz/4.png', chapter: 'Chapter 4', caption: 'Shared Moments', color: '#e91e8c' },
  { id: 5, url: 'https://i.postimg.cc/zGpRLmST/5.png', chapter: 'Chapter 5', caption: 'Laughter & Joy', color: '#ff69b4' },
  { id: 6, url: 'https://i.postimg.cc/nLz9Bd3x/6.png', chapter: 'Chapter 6', caption: 'Adventures Together', color: '#da70d6' },
  { id: 7, url: 'https://i.postimg.cc/DzZ4LCxw/7.png', chapter: 'Chapter 7', caption: 'Unforgettable Days', color: '#9b59b6' },
  { id: 8, url: 'https://i.postimg.cc/LsXgLyx6/8.png', chapter: 'Chapter 8', caption: 'Heart Full of Love', color: '#e91e8c' },
  { id: 9, url: 'https://i.postimg.cc/6Q34nHMq/9.png', chapter: 'Chapter 9', caption: 'Beautiful Chaos', color: '#ff69b4' },
  { id: 10, url: 'https://i.postimg.cc/25Kbw4tG/11.png', chapter: 'Chapter 10', caption: 'Sweet Memories', color: '#da70d6' },
  { id: 11, url: 'https://i.postimg.cc/yd3JrDqn/12.png', chapter: 'Chapter 11', caption: 'Side by Side', color: '#9b59b6' },
  { id: 12, url: 'https://i.postimg.cc/nz9swX86/13.png', chapter: 'Chapter 12', caption: 'Through it All', color: '#e91e8c' },
  { id: 13, url: 'https://i.postimg.cc/D0VWV7n0/14.png', chapter: 'Chapter 13', caption: 'Golden Moments', color: '#ff69b4' },
  { id: 14, url: 'https://i.postimg.cc/L5dqdm2k/15.png', chapter: 'Chapter 14', caption: 'Precious Bond', color: '#da70d6' },
  { id: 15, url: 'https://i.postimg.cc/Y01vMTCN/16.png', chapter: 'Chapter 15', caption: 'Heartfelt Wishes', color: '#9b59b6' },
  { id: 16, url: 'https://i.postimg.cc/D0qSnRw6/17.png', chapter: 'Chapter 16', caption: 'Forever & Always', color: '#e91e8c' },
  { id: 17, url: 'https://i.postimg.cc/ryW01RNm/18.png', chapter: 'Chapter 17', caption: '🎂 Happy Birthday, Pravena!', color: '#ff69b4' },
];

interface Sparkle { id: number; x: number; y: number; size: number; opacity: number; life: number }

export default function LoveStoryPlanet({ onClose }: { onClose: () => void }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const [showPageHint, setShowPageHint] = useState(true);
  const audioRef = useRef<AudioContext | null>(null);
  const sparkleIdRef = useRef(0);

  const playPageTurnSound = useCallback(() => {
    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (_e) { /* silent */ }
  }, []);

  const goToPage = useCallback((idx: number, dir: 'left' | 'right') => {
    if (isTransitioning) return;
    setDirection(dir);
    setIsTransitioning(true);
    setShowPageHint(false);
    playPageTurnSound();
    setTimeout(() => {
      setCurrentPage(idx);
      setIsTransitioning(false);
    }, 320);
  }, [isTransitioning, playPageTurnSound]);

  const nextPage = useCallback(() => {
    if (currentPage < storyPages.length - 1) goToPage(currentPage + 1, 'right');
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) goToPage(currentPage - 1, 'left');
  }, [currentPage, goToPage]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextPage, prevPage, onClose]);

  // Sparkle burst on page change
  useEffect(() => {
    const burst: Sparkle[] = Array.from({ length: 8 }, () => ({
      id: sparkleIdRef.current++,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      size: 10 + Math.random() * 14,
      opacity: 1,
      life: 1,
    }));
    setSparkles(burst);
  }, [currentPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev =>
        prev
          .map(s => ({ ...s, life: s.life - 0.05, opacity: s.opacity - 0.04 }))
          .filter(s => s.life > 0)
      );
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) diff > 0 ? nextPage() : prevPage();
    setTouchStart(null);
  };

  const progress = ((currentPage + 1) / storyPages.length) * 100;
  const currentData = storyPages[currentPage];
  const isLastPage = currentPage === storyPages.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: `radial-gradient(ellipse at center, ${currentData.color}15 0%, #0a0015 60%, #000 100%)`, transition: 'background 0.5s ease' }}
    >
      {/* Sparkle burst */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparkles.map(s => (
          <div
            key={s.id}
            className="absolute pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size, opacity: s.opacity, transform: 'translate(-50%,-50%)', lineHeight: 1 }}
          >✨</div>
        ))}
      </div>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 sm:px-6 z-10"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${currentData.color}40` }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl flex-shrink-0">📖</span>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate" style={{ fontFamily: 'Georgia, serif' }}>Our Love Story</p>
            <p className="text-xs truncate" style={{ color: currentData.color }}>{currentData.chapter}: {currentData.caption}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs font-bold" style={{ color: currentData.color }}>{currentPage + 1}/{storyPages.length}</span>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.1)' }}>✕</button>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 relative z-10" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${currentData.color}, ${currentData.color}99)`, boxShadow: `0 0 8px ${currentData.color}` }}
        />
      </div>

      {/* Image area */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient glow behind image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${currentData.color}12 0%, transparent 70%)` }}
        />

        {/* Image */}
        <div
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning
              ? `translateX(${direction === 'right' ? '-40px' : '40px'}) scale(0.97)`
              : 'translateX(0) scale(1)',
            transition: 'all 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 52px',
            height: '100%',
            width: '100%',
          }}
        >
          <div className="relative">
            {/* Frame glow */}
            <div
              className="absolute -inset-2 rounded-2xl pointer-events-none"
              style={{ boxShadow: `0 0 40px ${currentData.color}50, 0 0 80px ${currentData.color}25`, borderRadius: 20 }}
            />
            {/* Loading shimmer */}
            {!imagesLoaded.has(currentPage) && (
              <div
                className="absolute inset-0 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,105,180,0.08)', border: `1px solid ${currentData.color}30`, minWidth: 200, minHeight: 200 }}
              >
                <div className="text-4xl" style={{ animation: 'pulse 1s ease-in-out infinite' }}>💕</div>
              </div>
            )}
            <img
              src={currentData.url}
              alt={currentData.caption}
              onLoad={() => setImagesLoaded(prev => new Set([...prev, currentPage]))}
              className="rounded-xl object-contain"
              style={{
                maxHeight: 'calc(100vh - 180px)',
                maxWidth: '100%',
                display: 'block',
                boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
                opacity: imagesLoaded.has(currentPage) ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Nav arrows */}
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
            style={{ background: `rgba(0,0,0,0.6)`, border: `1px solid ${currentData.color}50`, backdropFilter: 'blur(8px)' }}
          >
            <span className="text-white text-lg">‹</span>
          </button>
        )}
        {currentPage < storyPages.length - 1 && (
          <button
            onClick={nextPage}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
            style={{ background: `rgba(0,0,0,0.6)`, border: `1px solid ${currentData.color}50`, backdropFilter: 'blur(8px)' }}
          >
            <span className="text-white text-lg">›</span>
          </button>
        )}

        {/* Touch hint */}
        {showPageHint && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40 pointer-events-none"
            style={{ animation: 'breathe 2s ease-in-out infinite' }}
          >
            ← Swipe to turn pages →
          </div>
        )}

        {/* Last page celebration */}
        {isLastPage && !isTransitioning && (
          <div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            style={{ animation: 'fadeInUp 0.6s ease' }}
          >
            <p className="text-white text-sm font-bold px-4 py-2 rounded-full" style={{ background: 'rgba(255,105,180,0.3)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,105,180,0.5)' }}>
              🎂 The End — Happy Birthday, Pravena! 💕
            </p>
          </div>
        )}
      </div>

      {/* Chapter dots */}
      <div
        className="flex items-center justify-center gap-1.5 py-2.5 flex-wrap px-4"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
      >
        {storyPages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx, idx > currentPage ? 'right' : 'left')}
            className="transition-all duration-300"
            title={page.caption}
            style={{
              width: idx === currentPage ? 18 : 7,
              height: 7,
              borderRadius: 4,
              background: idx === currentPage
                ? currentData.color
                : idx < currentPage
                ? `${currentData.color}70`
                : 'rgba(255,255,255,0.18)',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Preload adjacent */}
      <div className="hidden" aria-hidden="true">
        {currentPage + 1 < storyPages.length && (
          <img src={storyPages[currentPage + 1].url} alt="" onLoad={() => setImagesLoaded(prev => new Set([...prev, currentPage + 1]))} />
        )}
        {currentPage + 2 < storyPages.length && (
          <img src={storyPages[currentPage + 2].url} alt="" onLoad={() => setImagesLoaded(prev => new Set([...prev, currentPage + 2]))} />
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes breathe { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
    </div>
  );
}
