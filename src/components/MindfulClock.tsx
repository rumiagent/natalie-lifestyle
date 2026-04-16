import React, { useState, useEffect } from 'react';
import './MindfulClock.css';

interface MindfulClockProps {
  time: Date;
}

const MindfulClock: React.FC<MindfulClockProps> = ({ time }) => {
  const [displayTime, setDisplayTime] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevMinute, setPrevMinute] = useState(time.getMinutes());

  useEffect(() => {
    const currentMinute = time.getMinutes();
    
    if (currentMinute !== prevMinute) {
      setIsTransitioning(true);
      
      // Brief delay to allow fade-out animation to complete
      setTimeout(() => {
        setDisplayTime(formatMindfulTime(time));
        setPrevMinute(currentMinute);
        setIsTransitioning(false);
      }, 800);
    } else if (!displayTime) {
      setDisplayTime(formatMindfulTime(time));
    }
  }, [time, prevMinute, displayTime]);

  function formatMindfulTime(date: Date) {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }).toLowerCase();
  }

  return (
    <div className="mindful-clock-container">
      <span className={`mindful-clock-text ${isTransitioning ? 'clock-fade-out' : 'clock-fade-in'}`}>
        {displayTime}
      </span>
    </div>
  );
};

export default MindfulClock;
