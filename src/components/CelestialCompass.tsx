import React, { useState, useEffect } from 'react';
import './CelestialCompass.css';

interface MoonPhase {
  name: string;
  symbol: string;
  message: string;
}

const MOON_PHASES: MoonPhase[] = [
  { name: 'New Moon', symbol: '🌑', message: 'A time for new beginnings and setting intentions.' },
  { name: 'Waxing Crescent', symbol: '🌒', message: 'Trust the process of gradual growth.' },
  { name: 'First Quarter', symbol: '🌓', message: 'Find balance and take decisive, mindful action.' },
  { name: 'Waxing Gibbous', symbol: '🌔', message: 'Refine your focus and prepare for fulfillment.' },
  { name: 'Full Moon', symbol: '🌕', message: 'A time of clarity, release, and culmination.' },
  { name: 'Waning Gibbous', symbol: '🌖', message: 'Reflect on what you have learned and let go.' },
  { name: 'Last Quarter', symbol: '🌗', message: 'Release that which no longer serves your peace.' },
  { name: 'Waning Crescent', symbol: '🌘', message: 'Rest and surrender to the quiet before the new.' },
];

const CelestialCompass: React.FC = () => {
  const [phase, setPhase] = useState<MoonPhase>(MOON_PHASES[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Calculate approximate moon phase
    // This is a simplified calculation for aesthetic purposes
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // Simplified Moon Phase calculation
    // Reference: Approximate lunar cycle is 29.53 days
    const lp = 2551443; // lunar period in seconds
    const now = new Date().getTime() / 1000;
    const newMoon = new Date('1970-01-07T20:35:00Z').getTime() / 1000;
    const phasePercent = ((now - newMoon) % lp) / lp;
    
    const phaseIndex = Math.floor(phasePercent * 8);
    setPhase(MOON_PHASES[phaseIndex]);
    setIsVisible(true);
  }, []);

  return (
    <div className={`celestial-compass ${isVisible ? 'fade-in' : ''}`}>
      <div className="compass-circle">
        <div className="moon-symbol">{phase.symbol}</div>
        <div className="phase-name">{phase.name}</div>
        <p className="phase-message">{phase.message}</p>
      </div>
    </div>
  );
};

export default CelestialCompass;
