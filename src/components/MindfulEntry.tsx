import React, { useEffect, useState } from 'react';
import './MindfulEntry.css';

interface MindfulEntryProps {
  onComplete: () => void;
}

const MindfulEntry: React.FC<MindfulEntryProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Trigger text fade-in slightly after the screen appears
    const textTimer = setTimeout(() => setTextVisible(true), 500);
    
    // Transition to main app after 4 seconds
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade-out animation
    }, 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible && textVisible) {
    // This handles the fade-out state if we want separate control, 
    // but we'll use CSS classes for smoother transitions.
  }

  return (
    <div className={`mindful-entry-overlay ${!isVisible ? 'fade-out' : ''}`}>
      <div className={`mindful-entry-content ${textVisible ? 'fade-in' : ''}`}>
        <p>Take a moment to arrive...</p>
        <div className="entry-breath-indicator"></div>
      </div>
    </div>
  );
};

export default MindfulEntry;
