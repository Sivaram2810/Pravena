export interface Planet {
  id: string;
  name: string;
  emoji: string;
  color: string;
  glow: string;
  description: string;
  x: number;
  y: number;
  size: number;
}

export interface Friend {
  name: string;
  emoji: string;
  wish: string;
  videoUrl?: string;
  color: string;
}
