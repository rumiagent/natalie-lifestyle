import React, { useState, useEffect } from 'react';
import './WaterReminder.css';

const WaterReminder: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // For the purpose of the app, we'll trigger it every 15 minutes.
    // In a real production app, this might be configurable.
    const reminderInterval = setInterval(() => {
      setIsVisible(true);
    }, 15 * 60 * 1000);

    // Initial trigger after a short delay to show it's working during initial use
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    return () => {
      clearInterval(reminderInterval);
      clearTimeout(initialDelay);
    };
  }, []);

  const handleTriggerClick = () => {
    setShowMessage(true);
    
    // Hide message and trigger after a few seconds
    setTimeout(() => {
      setShowMessage(false);
      setIsVisible(false);
    }, 5000);
  };

  if (!isVisible) return null;

  return (
    <div className="water-reminder-container">
      <div className={`water-message ${showMessage ? 'visible' : ''}`}>
        A sip of water for your body,<br/>
        a moment of peace for your mind.
      </div>
      <button 
        className="water-drop-trigger" 
        onClick={handleTriggerClick}
        aria-label="Mindful Hydration Reminder"
      />
    </div>
  );
};

export default WaterReminder;
