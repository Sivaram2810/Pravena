import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  z: number
  r: number
  baseAlpha: number
  twinkle: number
  twinkleSpeed: number
}

type Dust = {
  x: number
  y: number
  vy: number
  vx: number
  r: number
  alpha: number
  hue: number
}

export function Starfield({
  density = 1,
  dust = true,
  parallax = true,
}: {
  density?: number
  dust?: boolean
  parallax?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    const starCount = Math.floor((width * height) / 4500 * density)
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1 + 0.3,
      r: Math.random() * 1.4 + 0.3,
      baseAlpha: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
    }))

    const dustCount = dust ? Math.floor((width * height) / 28000) : 0
    const dusts: Dust[] = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 47 : 330,
    }))

    let raf = 0
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05
      const px = parallax ? mouse.current.x : 0
      const py = parallax ? mouse.current.y : 0

      for (const s of stars) {
        s.twinkle += s.twinkleSpeed
        const alpha = s.baseAlpha + Math.sin(s.twinkle) * 0.35
        const ox = px * s.z * 14
        const oy = py * s.z * 14
        ctx.beginPath()
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
        ctx.fillStyle = '#ffffff'
        ctx.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const d of dusts) {
        d.y += d.vy
        d.x += d.vx
        if (d.y < -10) {
          d.y = height + 10
          d.x = Math.random() * width
        }
        ctx.beginPath()
        ctx.globalAlpha = d.alpha
        const color = d.hue === 47 ? '247,215,116' : '255,122,182'
        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4)
        grd.addColorStop(0, `rgba(${color},0.9)`)
        grd.addColorStop(1, `rgba(${color},0)`)
        ctx.fillStyle = grd
        ctx.arc(d.x, d.y, d.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }
    render()

    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / width - 0.5) * 2
      mouse.current.ty = (e.clientY / height - 0.5) * 2
    }
    const onResize = () => setSize()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [density, dust, parallax])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
