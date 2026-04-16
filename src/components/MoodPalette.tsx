import React from 'react';
import './MoodPalette.css';

export type Mood = 'serene' | 'radiant' | 'deep' | 'earth';

interface MoodPaletteProps {
  mood: Mood;
  setMood: (mood: Mood) => void;
}

const MOODS: { id: Mood; label: string; icon: string }[] = [
  { id: 'serene', label: 'Serene', icon: '🌿' },
  { id: 'radiant', label: 'Radiant', icon: '☀️' },
  { id: 'deep', label: 'Deep', icon: '🌙' },
  { id: 'earth', label: 'Earth', icon: '🍂' },
];

const MoodPalette: React.FC<MoodPaletteProps> = ({ mood, setMood }) => {
  return (
    <div className="mood-palette-container">
      <div className="mood-palette-label">Current Resonance</div>
      <div className="mood-palette-options">
        {MOODS.map((m) => (
          <button
            key={m.id}
            className={`mood-btn ${mood === m.id ? 'active' : ''}`}
            onClick={() => setMood(m.id)}
            title={m.label}
          >
            <span className="mood-icon">{m.icon}</span>
            <span className="mood-text">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodPalette;
