import React, { useState } from 'react';
import './MindfulRitualFlow.css';
import DailyIntention from './DailyIntention';
import BreathingGuide from './BreathingGuide';
import GratitudeLog from './GratitudeLog';
import PoetryCorner from './PoetryCorner';

interface MindfulRitualFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const RITUAL_STEPS = [
  {
    id: 'intention',
    title: 'Set Your Intention',
    description: 'Begin by centering your mind on a single, gentle purpose for today.',
    component: <DailyIntention />,
  },
  {
    id: 'breath',
    title: 'Calm Your Body',
    description: 'Follow the rhythm of the breath, letting go of tension with every exhale.',
    component: <BreathingGuide onClose={() => {}} />, 
  },
  {
    id: 'gratitude',
    title: 'Open Your Heart',
    description: 'Acknowledge the small glimmers of light in your life.',
    component: <GratitudeLog />,
  },
  {
    id: 'poetry',
    title: 'Feed Your Soul',
    description: 'Allow a few mindful words to wash over you.',
    component: <PoetryCorner />,
  },
  {
    id: 'completion',
    title: 'Return to Peace',
    description: 'You are now centered, grounded, and present. Carry this serenity with you.',
    component: <div className="ritual-completion-message" style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.8 }}>
      <p>The ritual is complete.</p>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Take a final deep breath before returning to your sanctuary.</p>
    </div>,
  },
];

const MindfulRitualFlow: React.FC<MindfulRitualFlowProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < RITUAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
      setCurrentStep(0);
    }
  };

  const step = RITUAL_STEPS[currentStep];

  return (
    <div className="ritual-overlay">
      <div className="ritual-progress">
        {RITUAL_STEPS.map((_, index) => (
          <div 
            key={index} 
            className={`progress-dot ${index === currentStep ? 'active' : ''}`} 
          />
        ))}
      </div>

      <div className="ritual-container">
        <header className="ritual-header">
          <h2>{step.title}</h2>
          <p>{step.description}</p>
        </header>

        <div className="ritual-step">
          {step.component}
        </div>

        <div className="ritual-nav">
          <button className="ritual-btn" onClick={nextStep}>
            {currentStep === RITUAL_STEPS.length - 1 ? 'Return to Sanctuary' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MindfulRitualFlow;
