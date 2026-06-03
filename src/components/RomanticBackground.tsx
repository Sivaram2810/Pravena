import { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  type: 'heart' | 'star' | 'sparkle' | 'orb';
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  active: boolean;
}

export default function RomanticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    const colors = ['#ff69b4', '#ff1493', '#da70d6', '#9b59b6', '#e91e8c', '#ffb6c1', '#f8bbd0', '#ff9ff3'];
    particlesRef.current = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.6 + 0.1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.5 + 0.2),
      type: ['heart', 'star', 'sparkle', 'orb'][Math.floor(Math.random() * 4)] as Particle['type'],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
    }));

    // Init shooting stars
    shootingStarsRef.current = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.5,
      length: Math.random() * 120 + 60,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      speed: Math.random() * 8 + 4,
      opacity: 0,
      active: false,
    }));

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.3);
      ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x - size * 0.5, y + size * 0.6, x, y + size * 0.9, x, y + size);
      ctx.bezierCurveTo(x, y + size * 0.9, x + size * 0.5, y + size * 0.6, x + size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);
      ctx.closePath();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size * 0.4;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        if (i === 0) ctx.moveTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
        else ctx.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
      }
      ctx.closePath();
    };

    const animate = (time: number) => {
      timeRef.current = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebula clouds
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.3, 0,
        canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.4
      );
      nebula1.addColorStop(0, 'rgba(233, 30, 140, 0.06)');
      nebula1.addColorStop(0.5, 'rgba(156, 39, 176, 0.04)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.6, 0,
        canvas.width * 0.8, canvas.height * 0.6, canvas.width * 0.35
      );
      nebula2.addColorStop(0, 'rgba(255, 105, 180, 0.07)');
      nebula2.addColorStop(0.5, 'rgba(218, 112, 214, 0.04)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.15, 0,
        canvas.width * 0.5, canvas.height * 0.15, canvas.width * 0.3
      );
      nebula3.addColorStop(0, 'rgba(183, 28, 180, 0.05)');
      nebula3.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate particles
      particlesRef.current.forEach(p => {
        p.x += p.speedX + Math.sin(time * 0.001 + p.id) * 0.2;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.opacity += Math.sin(time * 0.002 + p.id) * 0.005;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
          p.opacity = Math.random() * 0.4 + 0.1;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0.05, Math.min(0.7, p.opacity));
        ctx.fillStyle = p.color;

        if (p.type === 'heart') {
          drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
          ctx.fill();
        } else if (p.type === 'star') {
          drawStar(ctx, 0, 0, p.size);
          ctx.fill();
        } else if (p.type === 'sparkle') {
          // Plus sign sparkle
          ctx.fillRect(-p.size / 6, -p.size / 2, p.size / 3, p.size);
          ctx.fillRect(-p.size / 2, -p.size / 6, p.size, p.size / 3);
        } else {
          // Glowing orb
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // Shooting stars
      shootingStarsRef.current.forEach(star => {
        if (!star.active) {
          if (Math.random() < 0.003) {
            star.active = true;
            star.x = Math.random() * canvas.width * 1.2;
            star.y = Math.random() * canvas.height * 0.4;
            star.opacity = 1;
          }
        } else {
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          star.opacity -= 0.015;

          if (star.opacity <= 0) {
            star.active = false;
          } else {
            ctx.save();
            ctx.globalAlpha = star.opacity;
            const gradient = ctx.createLinearGradient(
              star.x, star.y,
              star.x - Math.cos(star.angle) * star.length,
              star.y - Math.sin(star.angle) * star.length
            );
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.3, 'rgba(255, 182, 193, 0.8)');
            gradient.addColorStop(1, 'transparent');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(
              star.x - Math.cos(star.angle) * star.length,
              star.y - Math.sin(star.angle) * star.length
            );
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
