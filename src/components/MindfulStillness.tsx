import { useState, useEffect } from 'react'
import './MindfulStillness.css'

const STILLNESS_THRESHOLD = 30000; // 30 seconds

const MindfulStillness = () => {
  const [isStill, setIsStill] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      setIsStill(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsStill(true);
      }, STILLNESS_THRESHOLD);
    };

    // Listen for any interaction
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    // Initialize timer
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="stillness-overlay">
      <div className={`stillness-bloom ${isStill ? 'visible' : ''}`}>
        <div className="bloom-petal petal-1" />
        <div className="bloom-petal petal-2" />
        <div className="bloom-petal petal-3" />
        <div className="bloom-petal petal-4" />
        <div className="bloom-petal petal-5" />
        <div className={`stillness-message ${isStill ? 'visible' : ''}`}>
          A moment of stillness...
        </div>
      </div>
    </div>
  );
};

export default MindfulStillness;
