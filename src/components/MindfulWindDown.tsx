import React, { useState, useEffect } from 'react';
import './MindfulWindDown.css';

const WIND_DOWN_PROMPTS = [
  "Take a deep breath and let go of today's worries.",
  "Reflect on one small moment of peace you experienced.",
  "Gently prepare your space for a restful night.",
  "Wishing you a deep and restorative sleep."
];

interface MindfulWindDownProps {
  isActive: boolean;
  onClose: () => void;
}

const MindfulWindDown: React.FC<MindfulWindDownProps> = ({ isActive, onClose }) => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setStep(0);
      setIsVisible(false);
      
      // Trigger first prompt visibility after a short delay to allow overlay transition
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && isVisible && step < WIND_DOWN_PROMPTS.length - 1) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Fade out current prompt
        setTimeout(() => {
          setStep(prev => prev + 1);
          setIsVisible(true); // Fade in next prompt
        }, 2000); // Wait for fade out
      }, 6000); // Time to read prompt

      return () => clearTimeout(timer);
    } else if (isActive && step === WIND_DOWN_PROMPTS.length - 1 && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(), 2000);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isActive, isVisible, step]);

  if (!isActive) return null;

  return (
    <div className={`wind-down-overlay active`}>
      <div className={`wind-down-content ${isVisible ? 'visible' : ''}`}>
        {WIND_DOWN_PROMPTS[step]}
      </div>
      <div className="wind-down-footer">
        Tap anywhere to exit early
      </div>
      <div onClick={onClose} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
    </div>
  );
};

export default MindfulWindDown;
