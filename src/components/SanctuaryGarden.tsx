import React, { useEffect, useRef, useState } from 'react';
import './SanctuaryGarden.css';
import StillnessBloom from './StillnessBloom';
import { getGardenState, updateGardenMetric, updateRitualStreak } from '../services/gardenService';

const SanctuaryGarden: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState(getGardenState());
  const [isTending, setIsTending] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    const drawMoss = (mossLevel: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a soft base
      ctx.fillStyle = '#e8e4d9'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mossCount = Math.min(mossLevel, 500);
      const colors = ['#7a8d6d', '#8ba37c', '#6b7d5d', '#a3b897'];

      for (let i = 0; i < mossCount; i++) {
        // Use a deterministic seed based on index to keep moss position stable
        const x = (Math.sin(i * 12.9898) * 43758.5453) % 1 * canvas.width;
        const y = (Math.cos(i * 78.233) * 43758.5453) % 1 * canvas.height;
        const radius = 5 + (Math.sin(i) * 5);
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.closePath();
      }
      ctx.globalAlpha = 1.0;
    };

    const drawStreakGlimmer = (streak: number) => {
      const glimmerCount = Math.min(streak * 5, 100);
      const colors = ['#fdfbf7', '#fefae0', '#fdf2d5'];

      for (let i = 0; i < glimmerCount; i++) {
        const x = (Math.sin(i * 987.654) * 43758.5453) % 1 * canvas.width;
        const y = (Math.cos(i * 123.456) * 43758.5453) % 1 * canvas.height;
        const radius = 1 + (Math.sin(i) * 1);
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.closePath();
      }
      ctx.globalAlpha = 1.0;
    };

    drawMoss(state.stillnessMoss);
    drawStreakGlimmer(state.ritualStreak);
  }, [state]);

  const tendGarden = () => {
    setIsTending(true);
  };

  const handleBloomComplete = () => {
    updateRitualStreak();
    const newState = updateGardenMetric('stillnessMoss', 50);
    setState({ ...newState });
    setIsTending(false);
  };

  const handleBloomCancel = () => {
    setIsTending(false);
  };

  return (
    <div className="sanctuary-garden-container">
      {isTending && (
        <StillnessBloom 
          onComplete={handleBloomComplete} 
          onCancel={handleBloomCancel} 
        />
      )}
      <div className="garden-header">
        <button className="garden-close-btn" onClick={onClose}>×</button>
        <h2>The Sanctuary Garden</h2>
        <p>A living reflection of your presence.</p>
      </div>
      
      <div className="garden-canvas-wrapper">
        <canvas ref={canvasRef} className="garden-canvas" />
      </div>
      
      <div className="garden-controls">
        <button className="garden-button" onClick={tendGarden}>
          Tend the Garden
        </button>
        <div className="garden-stats">
          <span>Stillness Moss: {state.stillnessMoss} units</span>
        </div>
      </div>
    </div>
  );
};

export default SanctuaryGarden;
