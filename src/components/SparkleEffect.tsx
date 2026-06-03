import { useState, useEffect } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
}

export default function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      setSparkles(prev => {
        const updated = prev
          .map(s => ({ ...s, life: s.life - 0.03, opacity: s.opacity - 0.025 }))
          .filter(s => s.life > 0);

        // Add new sparkles
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) {
          updated.push({
            id: id++,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 10 + 4,
            opacity: 0.8 + Math.random() * 0.2,
            life: 1,
          });
        }
        return updated.slice(-40);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {sparkles.map(s => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
            opacity: s.opacity,
            transform: 'translate(-50%, -50%)',
            lineHeight: 1,
          }}
        >
          {['✨', '⭐', '💫', '🌟'][Math.floor(s.life * 3.99)]}
        </div>
      ))}
    </div>
  );
}
