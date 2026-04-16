import React, { useState, useEffect } from 'react';

const BODY_SCAN_STEPS = [
  "Begin by noticing the weight of your feet on the floor.",
  "Bring your attention to your legs, feeling them relax into the surface beneath you.",
  "Soften your hips and lower back, letting go of any stored tension.",
  "Allow your shoulders to drop away from your ears, feeling a sense of release.",
  "Relax your jaw and the small muscles around your eyes.",
  "Take one deep, intentional breath. You are present. You are here."
];

const MindfulBodyScan = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let fadeTimer: NodeJS.Timeout;

    if (isActive) {
      // Trigger fade in
      setIsVisible(true);

      // Timer to transition to next step or finish
      timer = setTimeout(() => {
        setIsVisible(false); // Fade out
        
        fadeTimer = setTimeout(() => {
          if (currentStep < BODY_SCAN_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            setIsVisible(true);
          } else {
            // End of scan
            setTimeout(() => {
              setIsActive(false);
              setCurrentStep(0);
              setIsVisible(false);
            }, 1000);
          }
        }, 800); // Wait for fade out animation
      }, 6000); // Time each prompt is visible
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [isActive, currentStep]);

  return (
    <section className="moment-of-peace" style={{ margin: '4rem 0' }}>
      <h2 className="moment-title">Mindful Body Scan</h2>
      <div className="moment-content">
        {!isActive ? (
          <div className="fade-in-text">
            <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>
              Gently return your awareness to the physical body.
            </p>
            <button 
              className="moment-btn" 
              onClick={() => setIsActive(true)}
              style={{ marginTop: '1rem' }}
            >
              Begin Scan
            </button>
          </div>
        ) : (
          <div className={isVisible ? 'fade-in-text' : 'fade-out'}>
            <p>{BODY_SCAN_STEPS[currentStep]}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MindfulBodyScan;
