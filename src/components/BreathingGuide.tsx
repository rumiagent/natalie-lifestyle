import React, { useState, useEffect, useRef } from 'react';
import './BreathingGuide.css';

type BreathingPhase = 'Inhale' | 'Hold' | 'Exhale' | 'Pause';

interface PhaseConfig {
  name: BreathingPhase;
  duration: number;
  targetScale: number;
}

interface BreathingPattern {
  id: string;
  name: string;
  phases: PhaseConfig[];
  description: string;
}

const PATTERNS: Record<string, BreathingPattern> = {
  calm: {
    id: 'calm',
    name: 'Calm',
    description: 'Balanced rhythm for general serenity',
    phases: [
      { name: 'Inhale', duration: 4000, targetScale: 1.5 },
      { name: 'Hold', duration: 4000, targetScale: 1.5 },
      { name: 'Exhale', duration: 4000, targetScale: 1 },
      { name: 'Pause', duration: 4000, targetScale: 1 },
    ],
  },
  energy: {
    id: 'energy',
    name: 'Energy',
    description: 'Short, crisp breaths to awaken the mind',
    phases: [
      { name: 'Inhale', duration: 2000, targetScale: 1.4 },
      { name: 'Hold', duration: 1000, targetScale: 1.4 },
      { name: 'Exhale', duration: 2000, targetScale: 1 },
      { name: 'Pause', duration: 1000, targetScale: 1 },
    ],
  },
  sleep: {
    id: 'sleep',
    name: 'Sleep',
    description: 'Deep, slow rhythms for deep relaxation',
    phases: [
      { name: 'Inhale', duration: 4000, targetScale: 1.6 },
      { name: 'Hold', duration: 7000, targetScale: 1.6 },
      { name: 'Exhale', duration: 8000, targetScale: 1 },
      { name: 'Pause', duration: 2000, targetScale: 1 },
    ],
  },
};

interface BreathingGuideProps {
  onClose: () => void;
}

const BreathingGuide: React.FC<BreathingGuideProps> = ({ onClose }) => {
  const [patternId, setPatternId] = useState('calm');
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [scale, setScale] = useState(1);
  const [phaseName, setPhaseName] = useState<BreathingPhase>('Inhale');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentPattern = PATTERNS[patternId];

  useEffect(() => {
    // Reset when pattern changes
    setPhaseIdx(0);
    
    const runCycle = () => {
      const phase = currentPattern.phases[phaseIdx];
      setPhaseName(phase.name);
      setScale(phase.targetScale);

      // Dynamic transition timing based on phase duration
      const circleElement = document.querySelector('.breathing-circle') as HTMLElement;
      if (circleElement) {
        circleElement.style.transition = `transform ${phase.duration}ms ease-in-out`;
      }

      timerRef.current = setTimeout(() => {
        setPhaseIdx((prev) => (prev + 1) % currentPattern.phases.length);
      }, phase.duration);
    };

    runCycle();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [patternId, phaseIdx]);

  const handlePatternChange = (id: string) => {
    setPatternId(id);
  };

  return (
    <div className="breathing-overlay">
      <div className="breathing-container">
        <button className="breathing-close-btn" onClick={onClose}>✕</button>
        
        <div className="breathing-content">
          <div 
            className="breathing-circle" 
            style={{ transform: `scale(${scale})` }}
          />
          <p className="breathing-text">{phaseName}</p>
        </div>
        
        <p className="breathing-subtext">
          {currentPattern.description}
        </p>

        <div className="pattern-selector">
          {Object.values(PATTERNS).map((p) => (
            <button 
              key={p.id}
              className={`pattern-btn ${patternId === p.id ? 'active' : ''}`}
              onClick={() => handlePatternChange(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreathingGuide;
