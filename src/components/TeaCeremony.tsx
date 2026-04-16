import { useState, useEffect } from 'react';
import './TeaCeremony.css';

interface CeremonyStep {
  title: string;
  instruction: string;
  icon: string;
  duration?: number; // in seconds, for steeping
}

const TEA_STEPS: CeremonyStep[] = [
  {
    title: 'Prepare the Space',
    instruction: 'Take a deep breath. Gently clear your mind and the space around you.',
    icon: '🌿',
  },
  {
    title: 'Warm the Pot',
    instruction: 'Imagine the warmth filling the pot, preparing it to receive the tea.',
    icon: '🏺',
  },
  {
    title: 'Add the Leaves',
    instruction: 'Listen to the gentle sound of the leaves falling into the pot.',
    icon: '🍃',
  },
  {
    title: 'Pour the Water',
    instruction: 'Observe the steam rising in slow, organic curls as the water meets the leaves.',
    icon: '💧',
  },
  {
    title: 'Steep in Silence',
    instruction: 'Allow the tea to brew. Be present in the stillness.',
    icon: '⏳',
    duration: 60, // Shortened for the digital experience, usually 3-5 mins
  },
  {
    title: 'The First Sip',
    instruction: 'Feel the warmth in your hands and the taste on your tongue. Be here.',
    icon: '🍵',
  },
];

const TeaCeremony = () => {
  const [stepIdx, setStepIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSteeping, setIsSteeping] = useState(false);

  const currentStep = TEA_STEPS[stepIdx];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSteeping && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isSteeping) {
      setIsSteeping(false);
    }
    return () => clearInterval(interval);
  }, [isSteeping, timer]);

  const nextStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (stepIdx < TEA_STEPS.length - 1) {
        setStepIdx((prev) => prev + 1);
        if (TEA_STEPS[stepIdx + 1].duration) {
          setTimer(TEA_STEPS[stepIdx + 1].duration!);
          setIsSteeping(true);
        }
      } else {
        setStepIdx(0); // Reset ceremony
      }
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <section className="tea-ceremony">
      <h2 className="tea-title">Digital Tea Ceremony</h2>
      <div className={`tea-card ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        <div className="tea-icon">{currentStep.icon}</div>
        <h3 className="tea-step-title">{currentStep.title}</h3>
        <p className="tea-instruction">{currentStep.instruction}</p>
        
        {isSteeping && (
          <div className="tea-timer">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </div>
        )}

        <button 
          className="tea-btn" 
          onClick={nextStep} 
          disabled={isSteeping}
        >
          {isSteeping ? 'Steeping...' : stepIdx === TEA_STEPS.length - 1 ? 'Begin Anew' : 'Continue'}
        </button>
      </div>
      <div className="tea-progress">
        {TEA_STEPS.map((_, idx) => (
          <div key={idx} className={`progress-dot ${idx === stepIdx ? 'active' : ''}`} />
        ))}
      </div>
    </section>
  );
};

export default TeaCeremony;
