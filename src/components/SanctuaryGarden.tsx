import React, { useEffect, useRef, useState } from 'react';
import './SanctuaryGarden.css';
import { getGardenState, updateGardenMetric } from '../services/gardenService';

const SanctuaryGarden: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState(getGardenState());

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

    drawMoss(state.stillnessMoss);
  }, [state]);

  const tendGarden = () => {
    const newState = updateGardenMetric('stillnessMoss', 10);
    setState({ ...newState });
  };

  return (
    <div className=\"sanctuary-garden-container\">
      <div className=\"garden-header\">\n        <button className=\"garden-close-btn\" onClick={onClose}>×</button>\n        <h2>The Sanctuary Garden</h2>\n        <p>A living reflection of your presence.</p>\n      </div>
      
      <div className=\"garden-canvas-wrapper\">\n        <canvas ref={canvasRef} className=\"garden-canvas\" />\n      </div>

      <div className=\"garden-controls\">\n        <button className=\"garden-button\" onClick={tendGarden}>\n          Water the Moss\n        </button>\n        <div className=\"garden-stats\">\n          <span>Stillness Moss: {state.stillnessMoss} units</span>\n        </div>\n      </div>
    </div>
  );
};

export default SanctuaryGarden;
