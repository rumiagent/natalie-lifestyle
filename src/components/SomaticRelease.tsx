import React, { useState, useEffect } from 'react';
import './SomaticRelease.css';

const RELEASE_STEPS = [
  "Start by noticing where you hold tension...",
  "Gently soften your jaw. Let your teeth part slightly.",
  "Drop your shoulders away from your ears.",
  "Relax the muscles around your eyes.",
  "Let your tongue fall away from the roof of your mouth.",
  "Allow your belly to soften and expand.",
  "Feel the weight of your body being supported by the earth.",
  "You are here. You are relaxed."
];

interface SomaticReleaseProps {
  onClose: () => void;
}

const SomaticRelease: React.FC<SomaticReleaseProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    if (currentStep < RELEASE_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 6000); // 6 seconds per prompt for slow, mindful pace
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="somatic-overlay">
      <div className={`somatic-card ${isVisible ? 'fade-in' : ''}`}>
        <div className="somatic-pulse"></div>
        <p className="somatic-text">{RELEASE_STEPS[currentStep]}</p>
        
        <button className="somatic-close-btn" onClick={onClose}>
          Return to Sanctuary
        </button>
      </div>
    </div>
  );
};

export default SomaticRelease;
