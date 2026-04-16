import React, { useEffect } from 'react';
import './MindfulPause.css';

interface MindfulPauseProps {
  onComplete: () => void;
}

const MindfulPause: React.FC<MindfulPauseProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 8000); // 8 seconds of mindful pause

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="mindful-pause-overlay">
      <div className="mindful-pause-container">
        <div className="pause-circle"></div>
        <p className="pause-text">Take a deep breath...</p>
      </div>
    </div>
  );
};

export default MindfulPause;
