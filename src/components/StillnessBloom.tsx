import React, { useState, useEffect, useRef } from 'react';
import './StillnessBloom.css';

interface StillnessBloomProps {
  onComplete: () => void;
  onCancel: () => void;
}

const StillnessBloom: React.FC<StillnessBloomProps> = ({ onComplete, onCancel }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Be still...');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastMoveRef = useRef<number>(Date.now());

  useEffect(() => {
    const handleMove = () => {
      lastMoveRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    timerRef.current = setInterval(() => {
      const now = Date.now();
      if (now - lastMoveRef.current > 200) {
        setProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            if (timerRef.current) clearInterval(timerRef.current);
            onComplete();
            return 100;
          }
          return next;
        });
      } else {
        setProgress((prev) => Math.max(0, prev - 2));
      }
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [onComplete]);

  useEffect(() => {
    if (progress > 30) setMessage('Presence is growing...');
    if (progress > 60) setMessage('Almost there...');
    if (progress > 90) setMessage('Stillness achieved.');
    if (progress < 10) setMessage('Be still...');
  }, [progress]);

  return (
    <div className="stillness-bloom-overlay">
      <div className="bloom-container">
        <div 
          className="bloom-circle" 
          style={{ 
            transform: `scale(${0.5 + progress / 100})`,
            opacity: 0.3 + progress / 100 
          }}
        />
        <div className="bloom-text">
          <p>{message}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button className="bloom-cancel-btn" onClick={onCancel}>Return</button>
      </div>
    </div>
  );
};

export default StillnessBloom;
