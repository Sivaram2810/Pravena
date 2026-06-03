import { useState, useEffect, useRef } from 'react';

interface PlanetData {
  id: string;
  name: string;
  emoji: string;
  color: string;
  glow: string;
  orbitRadius: number;
  size: number;
  speed: number;
  startAngle: number;
  description: string;
}

const planets: PlanetData[] = [
  {
    id: 'love-story',
    name: 'Love Story',
    emoji: '💕',
    color: '#ff69b4',
    glow: 'rgba(255,105,180,0.7)',
    orbitRadius: 90,
    size: 46,
    speed: 6,
    startAngle: 0,
    description: 'Our Love Story',
  },
  {
    id: 'mirror',
    name: 'Mirror',
    emoji: '🪞',
    color: '#da70d6',
    glow: 'rgba(218,112,214,0.7)',
    orbitRadius: 150,
    size: 42,
    speed: 4,
    startAngle: 72,
    description: 'Things I Love',
  },
  {
    id: 'resonance',
    name: 'Resonance',
    emoji: '💘',
    color: '#e91e8c',
    glow: 'rgba(233,30,140,0.7)',
    orbitRadius: 210,
    size: 40,
    speed: 2.8,
    startAngle: 144,
    description: 'Love Meter',
  },
  {
    id: 'eternity',
    name: 'Eternity',
    emoji: '🔮',
    color: '#9b59b6',
    glow: 'rgba(155,89,182,0.7)',
    orbitRadius: 265,
    size: 44,
    speed: 2,
    startAngle: 216,
    description: 'Future Dreams',
  },
  {
    id: 'memories',
    name: 'Memories',
    emoji: '🎞️',
    color: '#e74c3c',
    glow: 'rgba(231,76,60,0.7)',
    orbitRadius: 320,
    size: 40,
    speed: 1.4,
    startAngle: 288,
    description: 'Memory Rewind',
  },
  {
    id: 'voices',
    name: 'Voices',
    emoji: '🎤',
    color: '#ff1493',
    glow: 'rgba(255,20,147,0.7)',
    orbitRadius: 375,
    size: 42,
    speed: 1,
    startAngle: 30,
    description: 'Star Wishes',
  },
];

interface Props {
  onPlanetClick: (id: string) => void;
}

export default function PlanetOrbit({ onPlanetClick }: Props) {
  const [angles, setAngles] = useState<number[]>(planets.map(p => p.startAngle));
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(820);
  const [isMobile, setIsMobile] = useState(false);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const anglesRef = useRef<number[]>(planets.map(p => p.startAngle));

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setContainerWidth(mobile ? Math.min(window.innerWidth - 16, 440) : 820);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      anglesRef.current = anglesRef.current.map((angle, i) => (angle + planets[i].speed * delta) % 360);
      setAngles([...anglesRef.current]);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const maxOrbit = Math.max(...planets.map(p => p.orbitRadius));
  const viewBoxSize = (maxOrbit + 50) * 2;
  const centerSize = isMobile ? 52 : 72;

  return (
    <div
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerWidth,
        flexShrink: 0,
      }}
    >
      {/* SVG for orbit rings */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
        viewBox={`${-viewBoxSize / 2} ${-viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`}
      >
        <defs>
          {planets.map(planet => (
            <radialGradient key={`grad-${planet.id}`} id={`orbGrad-${planet.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="50%" stopColor={planet.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={planet.color} stopOpacity="0.4" />
            </radialGradient>
          ))}
        </defs>

        {/* Orbit rings */}
        {planets.map(planet => (
          <circle
            key={planet.id}
            cx={0}
            cy={0}
            r={planet.orbitRadius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={1}
            strokeDasharray="3 9"
          />
        ))}

        {/* Planet bodies */}
        {planets.map((planet, i) => {
          const angleRad = (angles[i] * Math.PI) / 180;
          const px = Math.cos(angleRad) * planet.orbitRadius;
          const py = Math.sin(angleRad) * planet.orbitRadius;
          const isHovered = hoveredPlanet === planet.id;
          const r = (planet.size / 2) * (isHovered ? 1.25 : 1);

          return (
            <g key={planet.id}>
              {/* Glow */}
              <circle
                cx={px}
                cy={py}
                r={r + 8}
                fill={planet.glow}
                opacity={isHovered ? 0.5 : 0.25}
                style={{ transition: 'all 0.2s ease', filter: 'blur(4px)' }}
              />
              {/* Planet circle */}
              <circle
                cx={px}
                cy={py}
                r={r}
                fill={`url(#orbGrad-${planet.id})`}
                style={{
                  cursor: 'pointer',
                  transition: 'r 0.2s ease',
                  filter: isHovered ? `drop-shadow(0 0 8px ${planet.color})` : 'none',
                }}
                onClick={() => onPlanetClick(planet.id)}
                onMouseEnter={() => setHoveredPlanet(planet.id)}
                onMouseLeave={() => setHoveredPlanet(null)}
              />
              {/* Label below planet */}
              {!isMobile && (
                <text
                  x={px}
                  y={py + r + 18}
                  textAnchor="middle"
                  fill={isHovered ? planet.color : 'rgba(255,255,255,0.5)'}
                  fontSize={10}
                  fontWeight={isHovered ? 'bold' : 'normal'}
                  style={{ transition: 'fill 0.2s ease', pointerEvents: 'none', userSelect: 'none' }}
                >
                  {planet.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Emoji overlay - rendered separately for click targets */}
        {planets.map((planet, i) => {
          const angleRad = (angles[i] * Math.PI) / 180;
          const px = Math.cos(angleRad) * planet.orbitRadius;
          const py = Math.sin(angleRad) * planet.orbitRadius;
          const isHovered = hoveredPlanet === planet.id;
          const r = (planet.size / 2) * (isHovered ? 1.25 : 1);

          return (
            <text
              key={`emoji-${planet.id}`}
              x={px}
              y={py + r * 0.4}
              textAnchor="middle"
              fontSize={r * 1.1}
              style={{ cursor: 'pointer', userSelect: 'none', pointerEvents: 'none' }}
            >
              {planet.emoji}
            </text>
          );
        })}
      </svg>

      {/* Central sun */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: centerSize,
          height: centerSize,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fff5f9 0%, #ffcce0 35%, #ff69b4 65%, #e91e8c 100%)',
          boxShadow: '0 0 30px rgba(255,105,180,0.9), 0 0 60px rgba(255,105,180,0.5), 0 0 100px rgba(255,105,180,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          animation: 'sunPulse 3s ease-in-out infinite',
          fontSize: centerSize * 0.5,
          cursor: 'default',
        }}
      >
        🌸
      </div>

      {/* Hover tooltip for mobile (tap info) */}
      {isMobile && hoveredPlanet && (
        <div
          style={{
            position: 'absolute',
            bottom: -36,
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            pointerEvents: 'none',
          }}
        >
          {planets.find(p => p.id === hoveredPlanet)?.name}
        </div>
      )}

      <style>{`
        @keyframes sunPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(255,105,180,0.9), 0 0 60px rgba(255,105,180,0.5), 0 0 100px rgba(255,105,180,0.25); }
          50% { box-shadow: 0 0 45px rgba(255,105,180,1), 0 0 80px rgba(255,105,180,0.6), 0 0 130px rgba(255,105,180,0.35); }
        }
      `}</style>
    </div>
  );
}
