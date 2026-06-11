import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'

// ─── PHASE TIMELINE ───────────────────────────────────────────────────────────
// 0 → black silence, stars blink one by one (3s)
// 1 → hyperspace + spaceship flying toward planet (5s)
// 2 → everything FREEZES, comic guy slides in, dialogue types out
// 3 → cosmic wave sweeps left→right
// 4 → constellation drawing: stars connect to spell P·R·A·V·E·N·A
// 5 → taglines fade in below name
// 6 → enter button pulses in

const DIALOGUE = [
  'Whoa. Stop. Hold on.',
  "That planet? I've seen a million of those.",
  'Ordinary stars. Ordinary skies. Ordinary everything.',
  'You think she belongs there?',
  "She's the reason universes get made.",
]

// ─── STARFIELD CANVAS ─────────────────────────────────────────────────────────
function StarCanvas({ hyperspeed }: { hyperspeed: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const hsRef = useRef(hyperspeed)
  useEffect(() => { hsRef.current = hyperspeed }, [hyperspeed])

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    let w = (c.width = window.innerWidth)
    let h = (c.height = window.innerHeight)

    const onResize = () => {
      w = c.width = window.innerWidth
      h = c.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      t: Math.random() * Math.PI * 2,
      ts: Math.random() * 0.025 + 0.008,
      base: Math.random() * 0.55 + 0.25,
    }))

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const hs = hsRef.current
      stars.forEach(s => {
        s.t += s.ts
        const a = s.base + Math.sin(s.t) * 0.3
        ctx.globalAlpha = Math.max(0, Math.min(1, a))
        if (hs) {
          const len = s.r * 90
          const grad = ctx.createLinearGradient(s.x + len, s.y, s.x, s.y)
          grad.addColorStop(0, 'rgba(247,215,116,0.9)')
          grad.addColorStop(1, 'rgba(247,215,116,0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = s.r * 0.9
          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(s.x + len, s.y)
          ctx.stroke()
          s.x -= s.r * 5
          if (s.x < -300) { s.x = w + 10; s.y = Math.random() * h }
        } else {
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = s.r > 1.2 ? '#f7d774' : '#fff'
          ctx.shadowBlur = s.r > 1.2 ? 6 : 0
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}

// ─── CONSTELLATION CANVAS ─────────────────────────────────────────────────────
function ConstellationCanvas({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const doneFired = useRef(false)

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const W = (c.width = window.innerWidth)
    const H = (c.height = window.innerHeight)

    type Pt = [number, number]
    // Letter definitions: normalized points & connecting segments
    const defs: { pts: Pt[]; segs: [number, number][] }[] = [
      // P
      { pts: [[0,0],[0,.5],[0,1],[.45,0],[.45,.5]], segs: [[0,1],[1,2],[0,3],[3,4],[4,1]] },
      // R
      { pts: [[0,0],[0,.5],[0,1],[.45,0],[.45,.5],[.32,1]], segs: [[0,1],[1,2],[0,3],[3,4],[4,1],[1,5]] },
      // A
      { pts: [[0,1],[.25,0],[.5,1],[.1,.55],[.4,.55]], segs: [[0,1],[1,2],[3,4]] },
      // V
      { pts: [[0,0],[.25,1],[.5,0]], segs: [[0,1],[1,2]] },
      // E
      { pts: [[0,0],[0,.5],[0,1],[.42,0],[.32,.5],[.42,1]], segs: [[0,1],[1,2],[0,3],[1,4],[2,5]] },
      // N
      { pts: [[0,1],[0,0],[.42,1],[.42,0]], segs: [[0,1],[1,2],[2,3]] },
      // A
      { pts: [[0,1],[.25,0],[.5,1],[.1,.55],[.4,.55]], segs: [[0,1],[1,2],[3,4]] },
    ]

    const LW = Math.min(W * 0.095, 72)
    const LH = H * 0.24
    const gapX = (W - LW * 7) / 8
    const topY = H * 0.28

    const resolve = (li: number) => {
      const ox = gapX * (li + 1) + LW * li
      return defs[li].pts.map(([nx, ny]) => ({
        x: ox + nx * LW,
        y: topY + ny * LH,
      }))
    }

    type DrawnStar = { x: number; y: number; glow: number }
    type Seg = { x1: number; y1: number; x2: number; y2: number; prog: number }

    const allStars: DrawnStar[] = []
    const allSegs: Seg[] = []
    let curLetter = 0
    let curSeg = 0
    let segProg = 0
    let phase: 'stars' | 'segs' | 'done' = 'stars'

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      if (phase === 'stars') {
        const pts = resolve(curLetter)
        pts.forEach(p => allStars.push({ ...p, glow: 0 }))
        phase = 'segs'
        curSeg = 0
        segProg = 0
      } else if (phase === 'segs') {
        const def = defs[curLetter]
        if (curSeg < def.segs.length) {
          segProg = Math.min(1, segProg + 0.048)
          const [ai, bi] = def.segs[curSeg]
          const pts = resolve(curLetter)
          const last = allSegs[allSegs.length - 1]
          if (!last || last.prog >= 1) {
            allSegs.push({ x1: pts[ai].x, y1: pts[ai].y, x2: pts[bi].x, y2: pts[bi].y, prog: segProg })
          } else {
            last.prog = segProg
          }
          if (segProg >= 1) {
            allSegs[allSegs.length - 1].prog = 1
            curSeg++
            segProg = 0
          }
        } else {
          curLetter++
          if (curLetter >= defs.length) {
            phase = 'done'
            if (!doneFired.current) {
              doneFired.current = true
              setTimeout(onDone, 1600)
            }
          } else {
            phase = 'stars'
          }
        }
      }

      // Draw segs
      allSegs.forEach(s => {
        const ex = s.x1 + (s.x2 - s.x1) * s.prog
        const ey = s.y1 + (s.y2 - s.y1) * s.prog
        ctx.save()
        ctx.strokeStyle = 'rgba(247,215,116,0.55)'
        ctx.lineWidth = 1.5
        ctx.shadowColor = '#f7d774'
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.moveTo(s.x1, s.y1)
        ctx.lineTo(ex, ey)
        ctx.stroke()
        ctx.restore()
      })

      // Draw stars
      allStars.forEach(s => {
        s.glow = Math.min(1, s.glow + 0.035)
        ctx.save()
        ctx.globalAlpha = s.glow
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 12)
        g.addColorStop(0, 'rgba(247,215,116,1)')
        g.addColorStop(0.5, 'rgba(247,215,116,0.4)')
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(s.x, s.y, 12, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.shadowColor = '#f7d774'
        ctx.shadowBlur = 16
        ctx.beginPath()
        ctx.arc(s.x, s.y, 2.8, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-10 h-full w-full" />
}

// ─── COMIC CHARACTER (inline SVG so no external dep) ─────────────────────────
function ComicMe() {
  return (
    <svg
      width="220"
      height="340"
      viewBox="0 0 220 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 28px rgba(247,215,116,0.45))' }}
      aria-label="comic illustration of me"
    >
      {/* Body / suit */}
      <rect x="55" y="160" width="110" height="140" rx="12" fill="#1a1340" stroke="#f7d774" strokeWidth="2.5"/>
      {/* Tie */}
      <polygon points="110,170 103,190 110,220 117,190" fill="#f7d774"/>
      {/* Collar */}
      <polygon points="85,160 110,185 135,160" fill="#f5ecd8" opacity="0.9"/>
      {/* Arms */}
      <rect x="18" y="162" width="38" height="22" rx="10" fill="#1a1340" stroke="#f7d774" strokeWidth="2"/>
      <rect x="164" y="162" width="38" height="22" rx="10" fill="#1a1340" stroke="#f7d774" strokeWidth="2"/>
      {/* Left hand - finger snap pose */}
      <circle cx="22" cy="195" r="14" fill="#c8956a" stroke="#f7d774" strokeWidth="1.5"/>
      <line x1="10" y1="188" x2="28" y2="183" stroke="#c8956a" strokeWidth="6" strokeLinecap="round"/>
      <line x1="9" y1="198" x2="27" y2="194" stroke="#c8956a" strokeWidth="5" strokeLinecap="round"/>
      {/* Right hand - pointing up */}
      <circle cx="198" cy="195" r="14" fill="#c8956a" stroke="#f7d774" strokeWidth="1.5"/>
      <line x1="198" y1="180" x2="198" y2="165" stroke="#c8956a" strokeWidth="5" strokeLinecap="round"/>
      {/* Neck */}
      <rect x="95" y="138" width="30" height="26" rx="8" fill="#c8956a"/>
      {/* Head */}
      <ellipse cx="110" cy="115" rx="52" ry="55" fill="#c8956a" stroke="#f7d774" strokeWidth="2"/>
      {/* Hair (disheveled) */}
      <path d="M62 95 Q55 55 80 42 Q95 30 110 28 Q128 26 142 36 Q162 50 158 90" fill="#2a1a0a" stroke="#2a1a0a" strokeWidth="1"/>
      <path d="M62 85 Q48 60 65 45" stroke="#2a1a0a" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M155 80 Q168 58 155 42" stroke="#2a1a0a" strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Disheveled hair strands */}
      <path d="M72 70 Q60 50 68 35" stroke="#2a1a0a" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M148 65 Q162 45 152 32" stroke="#2a1a0a" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M105 30 Q100 12 110 8 Q120 12 115 30" fill="#2a1a0a"/>
      {/* Eyes */}
      <ellipse cx="90" cy="112" rx="11" ry="12" fill="white"/>
      <ellipse cx="130" cy="112" rx="11" ry="12" fill="white"/>
      <circle cx="91" cy="113" r="7" fill="#2a1a0a"/>
      <circle cx="131" cy="113" r="7" fill="#2a1a0a"/>
      <circle cx="93" cy="110" r="2.5" fill="white"/>
      <circle cx="133" cy="110" r="2.5" fill="white"/>
      {/* Eyebrows (raised / surprised) */}
      <path d="M78 97 Q90 89 103 95" stroke="#2a1a0a" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M117 95 Q130 89 142 97" stroke="#2a1a0a" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      {/* Mouth — slight smirk */}
      <path d="M95 135 Q110 145 125 135" stroke="#2a1a0a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Sweat drop (out of breath) */}
      <ellipse cx="155" cy="90" rx="5" ry="8" fill="rgba(155,190,255,0.7)" stroke="rgba(155,190,255,0.4)" strokeWidth="1"/>
      {/* Star sparkle near finger */}
      <text x="185" y="155" fontSize="18" fill="#f7d774" style={{ filter: 'drop-shadow(0 0 6px rgba(247,215,116,0.9))' }}>✦</text>
      {/* Legs */}
      <rect x="70" y="290" width="32" height="45" rx="8" fill="#1a1340" stroke="#f7d774" strokeWidth="2"/>
      <rect x="118" y="290" width="32" height="45" rx="8" fill="#1a1340" stroke="#f7d774" strokeWidth="2"/>
      {/* Shoes */}
      <ellipse cx="86" cy="336" rx="22" ry="10" fill="#0a0a18" stroke="#f7d774" strokeWidth="1.5"/>
      <ellipse cx="134" cy="336" rx="22" ry="10" fill="#0a0a18" stroke="#f7d774" strokeWidth="1.5"/>
    </svg>
  )
}

// ─── MAIN OPENING COMPONENT ───────────────────────────────────────────────────
export function Opening({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState(0)
  const [dlgIdx, setDlgIdx] = useState(0)
  const [shownText, setShownText] = useState('')
  const [comicIn, setComicIn] = useState(false)
  const [waveActive, setWaveActive] = useState(false)
  const [showConst, setShowConst] = useState(false)
  const [showTaglines, setShowTaglines] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [flashOp, setFlashOp] = useState(0)
  const [snapVisible, setSnapVisible] = useState(false)

  // Phase 0 → 1: pure black with blinking stars
  useEffect(() => {
    if (phase !== 0) return
    const t = setTimeout(() => setPhase(1), 3000)
    return () => clearTimeout(t)
  }, [phase])

  // Phase 1 → 2: hyperspace
  useEffect(() => {
    if (phase !== 1) return
    const t = setTimeout(() => setPhase(2), 5000)
    return () => clearTimeout(t)
  }, [phase])

  // Phase 2: comic slides in
  useEffect(() => {
    if (phase !== 2) return
    const t = setTimeout(() => setComicIn(true), 350)
    return () => clearTimeout(t)
  }, [phase])

  // Typewriter for each dialogue line
  useEffect(() => {
    if (phase !== 2 || !comicIn) return
    const line = DIALOGUE[dlgIdx]
    let i = 0
    setShownText('')
    const speed = dlgIdx === 4 ? 52 : 40
    const id = setInterval(() => {
      i++
      setShownText(line.slice(0, i))
      if (i >= line.length) {
        clearInterval(id)
        if (dlgIdx < DIALOGUE.length - 1) {
          setTimeout(() => setDlgIdx(d => d + 1), 1000)
        } else {
          // last line: show snap, then wave
          setTimeout(() => setSnapVisible(true), 400)
          setTimeout(() => {
            setWaveActive(true)
            setFlashOp(1)
            setTimeout(() => setFlashOp(0), 120)
            setTimeout(() => {
              setWaveActive(false)
              setPhase(3)
              setShowConst(true)
            }, 950)
          }, 1500)
        }
      }
    }, speed)
    return () => clearInterval(id)
  }, [dlgIdx, comicIn, phase])

  const handleConstellationDone = () => {
    setShowTaglines(true)
    setTimeout(() => setShowButton(true), 1800)
  }

  const handleEnter = () => {
    setExiting(true)
    setTimeout(onEnter, 900)
  }

  return (
    <div
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
      style={{ background: '#050816' }}
    >
      {/* ── Star canvas (hyperspeed on phase 1) ── */}
      <StarCanvas hyperspeed={phase === 1} />

      {/* ── White flash overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-50 bg-white"
        style={{
          opacity: flashOp,
          transition: flashOp === 1 ? 'opacity 0.08s ease' : 'opacity 0.55s ease',
        }}
      />

      {/* ════════════════════════════════════════════
          PHASE 0 — blinking stars appear
      ════════════════════════════════════════════ */}
      {phase === 0 && (
        <div className="relative z-10 flex flex-col items-center gap-5">
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: i === 0 ? 9 : i === 1 ? 6 : 4,
              height: i === 0 ? 9 : i === 1 ? 6 : 4,
              borderRadius: '50%',
              background: '#f7d774',
              boxShadow: '0 0 16px 4px rgba(247,215,116,0.9)',
              opacity: 0,
              animation: `blinkStar 1.3s ease-in-out ${i * 0.65}s forwards`,
            }} />
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════
          PHASE 1 — hyperspace + ship + planet
      ════════════════════════════════════════════ */}
      {phase === 1 && (
        <div
          className="relative z-10 flex flex-col items-center"
          style={{ animation: 'opFadeIn 0.5s ease forwards' }}
        >
          {/* planet */}
          <div style={{
            position: 'absolute',
            width: 'clamp(130px,30vw,320px)',
            height: 'clamp(130px,30vw,320px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 28%, #b08fff, #3a1080 60%, #120630)',
            boxShadow: '0 0 90px rgba(155,123,255,0.55)',
            animation: 'planetZoom 5s ease forwards',
            zIndex: -1,
          }} />
          {/* ship */}
          <div style={{
            fontSize: 'clamp(44px,9vw,88px)',
            filter: 'drop-shadow(0 0 28px rgba(247,215,116,0.85))',
            animation: 'shipFly 5s ease-in-out forwards',
            zIndex: 2,
          }}>🚀</div>
          <p style={{
            fontFamily: 'var(--font-cinzel)',
            color: 'rgba(247,215,116,0.6)',
            fontSize: 11,
            letterSpacing: 7,
            textTransform: 'uppercase',
            animation: 'opFadeIn 1.2s ease 0.6s forwards',
            opacity: 0,
            marginTop: 16,
          }}>Destination approaching…</p>
        </div>
      )}

      {/* ════════════════════════════════════════════
          PHASE 2 — FREEZE + COMIC + DIALOGUE
      ════════════════════════════════════════════ */}
      {phase === 2 && (
        <div className="fixed inset-0 z-10 flex items-end overflow-hidden">

          {/* frozen planet remnant */}
          <div style={{
            position: 'absolute', top: '5%', right: '5%',
            width: 'clamp(80px,16vw,180px)',
            height: 'clamp(80px,16vw,180px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 28%, #b08fff, #3a1080)',
            opacity: 0.2,
            filter: 'blur(4px)',
          }} />
          {/* frozen ship */}
          <div style={{
            position: 'absolute', top: '21%', right: '17%',
            fontSize: 'clamp(30px,5.5vw,60px)',
            opacity: 0.25,
            filter: 'blur(1.5px)',
            transform: 'rotate(-15deg)',
          }}>🚀</div>

          {/* PAUSED badge */}
          <div style={{
            position: 'absolute', top: '4%', left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-cinzel)',
            fontSize: 10, letterSpacing: 5,
            color: 'rgba(247,215,116,0.45)',
            border: '1px solid rgba(247,215,116,0.18)',
            padding: '4px 14px', borderRadius: 20,
            animation: 'opFadeIn 0.6s ease forwards',
          }}>⏸ PAUSED</div>

          {/* Comic character sliding in from left */}
          <div style={{
            transform: comicIn ? 'translateX(0)' : 'translateX(-115%)',
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            zIndex: 20,
            paddingBottom: 0,
            flexShrink: 0,
          }}>
            <ComicMe />
          </div>

          {/* Speech bubble */}
          {comicIn && (
            <div style={{
              position: 'absolute',
              bottom: 'clamp(200px,40vh,320px)',
              left: 'clamp(120px,22vw,280px)',
              maxWidth: 'min(460px,60vw)',
              background: 'rgba(5,8,22,0.92)',
              border: '1.5px solid rgba(247,215,116,0.45)',
              borderRadius: '18px 18px 18px 4px',
              padding: '18px 24px',
              backdropFilter: 'blur(16px)',
              animation: 'opFadeIn 0.4s ease forwards',
              zIndex: 30,
            }}>
              {/* bubble tail */}
              <div style={{
                position: 'absolute', bottom: -13, left: 22,
                borderLeft: '11px solid transparent',
                borderRight: '11px solid transparent',
                borderTop: '13px solid rgba(247,215,116,0.45)',
              }} />

              <p style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(13px,1.8vw,17px)',
                lineHeight: 1.75,
                color: dlgIdx === 4 ? '#f7d774' : '#f5ecd8',
                fontWeight: dlgIdx === 4 ? 600 : 400,
                textShadow: dlgIdx === 4 ? '0 0 16px rgba(247,215,116,0.8)' : 'none',
                letterSpacing: '0.03em',
                minHeight: '1.75em',
              }}>
                {shownText}
                {shownText.length < DIALOGUE[dlgIdx].length && (
                  <span style={{
                    display: 'inline-block', width: 2, height: '1em',
                    background: '#f7d774', marginLeft: 3,
                    verticalAlign: 'middle',
                    animation: 'cursorBlink 0.75s step-end infinite',
                  }} />
                )}
              </p>

              {/* finger snap on last line */}
              {snapVisible && dlgIdx === 4 && (
                <p style={{
                  marginTop: 8, textAlign: 'right', fontSize: 22,
                  animation: 'snapIn 0.45s ease forwards',
                }}>👆✨</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════
          COSMIC WAVE
      ════════════════════════════════════════════ */}
      {waveActive && (
        <div
          className="pointer-events-none fixed inset-0 z-40"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(155,123,255,0.95) 35%, rgba(247,215,116,0.92) 55%, transparent 100%)',
            animation: 'waveSweep 0.92s cubic-bezier(0.4,0,0.2,1) forwards',
          }}
        />
      )}

      {/* ════════════════════════════════════════════
          PHASE 3+ — CONSTELLATION + TAGLINES + BUTTON
      ════════════════════════════════════════════ */}
      {showConst && <ConstellationCanvas onDone={handleConstellationDone} />}

      {showTaglines && (
        <div style={{
          position: 'fixed',
          bottom: showButton ? 'clamp(80px,13vh,130px)' : 'clamp(44px,8vh,88px)',
          left: 0, right: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          padding: '0 24px',
          textAlign: 'center',
          transition: 'bottom 0.5s ease',
        }}>
          {[
            'Built from every moment you made extraordinary.',
            'Every laugh. Every glance. Every breath.',
            'This universe has only ever had one center.',
          ].map((line, i) => (
            <p key={i} style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(13px,1.7vw,18px)',
              fontStyle: 'italic',
              color: 'rgba(245,236,216,0.78)',
              opacity: 0,
              animation: `opFadeIn 1.3s ease ${i * 0.38}s forwards`,
            }}>{line}</p>
          ))}
        </div>
      )}

      {showButton && !exiting && (
        <button
          onClick={handleEnter}
          style={{
            position: 'fixed',
            bottom: 'clamp(18px,4vh,42px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 34px',
            background: 'rgba(247,215,116,0.07)',
            border: '1.5px solid rgba(247,215,116,0.65)',
            borderRadius: 40,
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(11px,1.4vw,14px)',
            letterSpacing: '0.22em',
            color: '#f7d774',
            cursor: 'pointer',
            backdropFilter: 'blur(14px)',
            animation: 'opFadeIn 1s ease forwards, buttonPulse 2.8s ease-in-out 1s infinite',
            opacity: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <Sparkles size={15} />
          ✦ Enter Your Universe, Pravena ✦
          <Sparkles size={15} />
        </button>
      )}

      {/* Exit flash */}
      {exiting && (
        <div
          className="pointer-events-none fixed inset-0 z-[60]"
          style={{
            background: '#050816',
            animation: 'exitFlash 0.9s ease forwards',
          }}
        />
      )}

      {/* All keyframes */}
      <style>{`
        @keyframes blinkStar {
          0%   { opacity:0; transform:scale(0.4); }
          45%  { opacity:1; transform:scale(1.5); }
          75%  { opacity:0.75; }
          100% { opacity:1; transform:scale(1); }
        }
        @keyframes opFadeIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shipFly {
          0%   { transform:translateX(-85vw) translateY(22px) scale(0.45) rotate(-22deg); opacity:0; }
          12%  { opacity:1; }
          68%  { transform:translateX(6vw) translateY(-12px) scale(1.18) rotate(-14deg); opacity:1; }
          100% { transform:translateX(16vw) translateY(-12px) scale(1.12) rotate(-14deg); opacity:0.55; }
        }
        @keyframes planetZoom {
          0%   { transform:scale(0.25) translateY(70px); opacity:0.15; }
          100% { transform:scale(1.7) translateY(-22px); opacity:0.5; }
        }
        @keyframes waveSweep {
          0%   { transform:translateX(-115%); }
          100% { transform:translateX(115%); }
        }
        @keyframes cursorBlink {
          0%,100% { opacity:1; }
          50%     { opacity:0; }
        }
        @keyframes snapIn {
          0%   { transform:scale(0) rotate(-35deg); opacity:0; }
          65%  { transform:scale(1.4) rotate(10deg); }
          100% { transform:scale(1) rotate(0); opacity:1; }
        }
        @keyframes buttonPulse {
          0%,100% { box-shadow:0 0 28px rgba(247,215,116,0.28); }
          50%     { box-shadow:0 0 70px rgba(247,215,116,0.72), 0 0 120px rgba(247,215,116,0.2); }
        }
        @keyframes exitFlash {
          0%   { opacity:0; }
          38%  { opacity:0.55; }
          100% { opacity:1; }
        }
      `}</style>
    </div>
  )
}
