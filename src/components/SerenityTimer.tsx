import React, { useState, useEffect } from 'react';
import './SerenityTimer.css';

const PRESETS = [
  { label: 'Short Pause', minutes: 5 },
  { label: 'Deep Focus', minutes: 25 },
  { label: 'Gentle Stretch', minutes: 15 },
];

const SerenityTimer: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(5 * 60);
  const [elapsed, setElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isComplete) {
      interval = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= duration) {
            setIsComplete(true);
            setIsActive(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isComplete, duration]);

  const startTimer = (minutes: number) => {
    setDuration(minutes * 60);
    setElapsed(0);
    setIsComplete(false);
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsComplete(false);
    setElapsed(0);
  };

  const progress = (elapsed / duration) * 100;
  const strokeDashoffset = 283 - (283 * progress) / 100; // 2 * PI * 45 approx 283

  return (
    <section className="serenity-timer">
      {!isActive && !isComplete && (
        <div className="timer-presets">
          <h2 className="timer-title">Intentional Focus</h2>
          <p className="timer-subtitle">Choose a window of presence</p>
          <div className="preset-buttons">
            {PRESETS.map((preset) => (
              <button 
                key={preset.label} 
                className="preset-btn" 
                onClick={() => startTimer(preset.minutes)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {(isActive || isComplete) && (
        <div className={`timer-display ${isComplete ? 'complete' : ''}`}>
          <div className="timer-circle-container">
            <svg className="timer-svg" viewBox="0 0 100 100">
              <circle 
                className="timer-bg" 
                cx="50" cy="50" r="45" 
              />
              <circle 
                className="timer-progress" 
                cx="50" cy="50" r="45" 
                style={{ strokeDashoffset }}
              />
            </svg>
            <div className="timer-center">
              {isComplete ? (
                <span className="complete-text">Peace</span>
              ) : (
                <span className="timer-status">Focusing...</span>
              )}
            </div>
          </div>
          
          <button className="timer-reset-btn" onClick={resetTimer}>
            {isComplete ? 'Return to Sanctuary' : 'Gently End'}
          </button>
        </div>
      )}
    </section>
  );
};

export default SerenityTimer;
