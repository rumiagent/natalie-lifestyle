import React, { useState } from 'react';
import './MindfulRitualFlow.css';
import DailyIntention from './DailyIntention';
import BreathingGuide from './BreathingGuide';
import GratitudeLog from './GratitudeLog';
import PoetryCorner from './PoetryCorner';
import MindfulReflection from './MindfulReflection';

interface MindfulRitualFlowProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'morning' | 'nightly';
}

const MORNING_STEPS = [
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
];

const NIGHTLY_STEPS = [
  {
    id: 'reflect-well',
    title: 'Reflect on the Light',
    description: 'Consider the moments of joy and success from your day.',
    component: <MindfulReflection prompt="What is one thing that went well today?" />,
  },
  {
    id: 'reflect-release',
    title: 'Let Go of the Weight',
    description: 'Gently acknowledge and release any tension or regrets.',
    component: <MindfulReflection prompt="What is something you would like to let go of before you sleep?" />,
  },
  {
    id: 'gratitude',
    title: 'A Heart of Thanks',
    description: 'End the day by noticing what you are truly grateful for.',
    component: <GratitudeLog />,
  },
  {
    id: 'rest',
    title: 'Prepare for Rest',
    description: 'Settle your mind and body for a peaceful sleep.',
    component: <BreathingGuide onClose={() => {}} />, 
  },
];

const COMPLETION_STEP = {
  id: 'completion',
  title: 'Return to Peace',
  description: 'You are now centered, grounded, and present. Carry this serenity with you.',
  component: (
    <div className="ritual-completion-message" style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.8 }}>
      <p>The ritual is complete.</p>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Take a final deep breath before returning to your sanctuary.</p>
    </div>
  ),
};

const MindfulRitualFlow: React.FC<MindfulRitualFlowProps> = ({ isOpen, onClose, type = 'morning' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = type === 'morning' ? [...MORNING_STEPS, COMPLETION_STEP] : [...NIGHTLY_STEPS, COMPLETION_STEP];

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
      setCurrentStep(0);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="ritual-overlay">
      <div className="ritual-progress">
        {steps.map((_, index) => (
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
            {currentStep === steps.length - 1 ? 'Return to Sanctuary' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MindfulRitualFlow;
