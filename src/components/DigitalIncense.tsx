import React, { useState, useEffect, useRef } from 'react';
import './DigitalIncense.css';

type Scent = 'Lavender' | 'Sandalwood' | 'Palo Santo' | 'Citrus';

interface ScentConfig {
  color: string;
  speed: number;
  drift: number;
}

const SCENT_CONFIGS: Record<Scent, ScentConfig> = {
  Lavender: { color: 'rgba(178, 178, 255, 0.4)', speed: 0.8, drift: 0.5 },
  Sandalwood: { color: 'rgba(210, 180, 140, 0.4)', speed: 0.6, drift: 0.3 },
  'Palo Santo': { color: 'rgba(178, 194, 178, 0.4)', speed: 0.7, drift: 0.4 },
  Citrus: { color: 'rgba(255, 228, 181, 0.4)', speed: 1.0, drift: 0.6 },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const DigitalIncense: React.FC = () => {
  const [isLit, setIsLit] = useState(false);
  const [selectedScent, setSelectedScent] = useState<Scent>('Sandalwood');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();

  const ignite = () => setIsLit(!isLit);

  const animate = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isLit) {
      // Emit new particles
      if (Math.random() > 0.2) {
        particlesRef.current.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 4,
          y: canvas.height - 20,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 1 - 0.5,
          life: 1,
          maxLife: Math.random() * 0.5 + 0.5,
          size: Math.random() * 3 + 2,
        });
      }
    }

    const config = SCENT_CONFIGS[selectedScent];

    particlesRef.current = particlesRef.current.filter(p => p.life > 0);
    
    particlesRef.current.forEach(p => {
      p.x += p.vx + Math.sin(time * 0.002 + p.y * 0.01) * config.drift;
      p.y += p.vy * config.speed;
      p.life -= 0.005;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - p.life), 0, Math.PI * 2);
      ctx.fillStyle = config.color.replace('0.4', (p.life * 0.4).toString());
      ctx.fill();
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isLit, selectedScent]);

  return (
    <div className="incense-container">
      <h2 className="incense-title">Digital Incense</h2>
      
      <div className="incense-visual">
        <canvas 
          ref={canvasRef} 
          width={200} 
          height={300} 
          className="incense-canvas"
        />
        <div className={`incense-stick ${isLit ? 'lit' : ''}`} onClick={ignite}>
          <div className="incense-tip">
            {isLit && <div className="incense-ember"></div>}
          </div>
          <div className="incense-body"></div>
        </div>
        <div className="incense-burner"></div>
      </div>

      <div className="scent-selector">
        {(Object.keys(SCENT_CONFIGS) as Scent[]).map(scent => (
          <button 
            key={scent}
            className={`scent-btn ${selectedScent === scent ? 'active' : ''}`}
            onClick={() => setSelectedScent(scent)}
          >
            {scent}
          </button>
        ))}
      </div>
      
      <p className="incense-hint">
        {isLit ? 'Allow the fragrance to clear your mind.' : 'Click the incense to light it.'}
      </p>
    </div>
  );
};

export default DigitalIncense;
