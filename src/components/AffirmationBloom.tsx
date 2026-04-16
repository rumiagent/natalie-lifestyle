import React, { useState, useEffect, useRef } from 'react';
import './AffirmationBloom.css';

const AFFIRMATIONS = [
  "I am at peace with where I am.",
  "Every breath is a fresh beginning.",
  "I allow myself to simply be.",
  "Peace begins with a single mindful breath.",
  "I trust the flow of my life.",
  "I am enough, exactly as I am.",
  "Gentleness is my strength.",
  "My mind is a calm ocean."
];

const AffirmationBloom: React.FC = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isBloomed, setIsBloomed] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startBlooming = () => {
    setIsHolding(true);
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current!);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);
  };

  const stopBlooming = () => {
    setIsHolding(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (!isBloomed) {
      setProgress(0);
    }
  };

  useEffect(() => {
    if (progress >= 100 && !isBloomed) {
      setIsBloomed(true);
      setCurrentAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);
    }
  }, [progress, isBloomed]);

  const resetBloom = () => {
    setIsBloomed(false);
    setProgress(0);
    setCurrentAffirmation("");
  };

  return (
    <div className="bloom-container">
      {!isBloomed ? (
        <>
          <button 
            className="bloom-trigger" 
            onMouseDown={startBlooming} 
            onMouseUp={stopBlooming}
            onMouseLeave={stopBlooming}
            onTouchStart={startBlooming}
            onTouchEnd={stopBlooming}
          >
            Plant a Seed of Peace
          </button>
          
          <div className="flower-stage">
            <svg className="bloom-progress-ring" width="92" height="92">
              <circle 
                className="progress-circle" 
                cx="46" cy="46" r="45" 
                style={{ strokeDashoffset: 283 - (283 * progress) / 100 }} 
              />
            </svg>
            <svg className="flower-svg" viewBox="0 0 100 100">
              <line 
                x1="50" y1="90" x2="50" y2="50" 
                className={`stem ${progress > 20 ? 'grown' : ''}`} 
                style={{ strokeDashoffset: 100 - (progress * 100 / 100) }}
              />
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse 
                  key={i} 
                  cx="50" cy="40" rx="10" ry="20" 
                  transform={`rotate(${angle} 50 50)`}
                  className={`petal ${progress > 60 + (i * 5) ? 'bloomed' : ''}`} 
                />
              ))}
              <circle cx="50" cy="50" r="5" fill="var(--accent-soft)" opacity={progress > 80 ? 1 : 0} style={{ transition: 'opacity 0.5s' }} />
            </svg>
          </div>
        </>
      ) : (
        <div className="bloom-result">
          <div className="flower-stage">
            <svg className="flower-svg" viewBox="0 0 100 100">
              <line x1="50" y1="90" x2="50" y2="50" className="stem grown" style={{ strokeDashoffset: 0 }} />
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse 
                  key={i} 
                  cx="50" cy="40" rx="10" ry="20" 
                  transform={`rotate(${angle} 50 50)`}
                  className="petal bloomed" 
                />
              ))}
              <circle cx="50" cy="50" r="5" fill="var(--accent-soft)" />
            </svg>
          </div>
          <p className={`affirmation-text ${isBloomed ? 'visible' : ''}`}>
            {currentAffirmation}
          </p>
          <button className="bloom-trigger" onClick={resetBloom} style={{ marginTop: '2rem' }}>
            Let it Fade
          </button>
        </div>
      )}
    </div>
  );
};

export default AffirmationBloom;
