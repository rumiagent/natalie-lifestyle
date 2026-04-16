import React, { useState, useEffect, useRef } from 'react';

interface SoundOption {
  id: string;
  label: string;
  url: string;
  icon: string;
}

const SOUNDS: SoundOption[] = [
  { 
    id: 'rain', 
    label: 'Soft Rain', 
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a7657a.mp3', 
    icon: '🌧️' 
  },
  { 
    id: 'forest', 
    label: 'Quiet Forest', 
    url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c6c8a7657a.mp3', // Placeholder if not working
    icon: '🌲' 
  },
  { 
    id: 'ocean', 
    label: 'Ocean Waves', 
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a7657b.mp3', 
    icon: '🌊' 
  },
  { 
    id: 'wind', 
    label: 'Gentle Wind', 
    url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c6c8a7657b.mp3', 
    icon: '🌬️' 
  },
];

// Note: The URLs above are illustrative. In a production app, 
// we would bundle these assets or use a reliable CDN.

const AmbientSoundscapes: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && activeSound) {
      const sound = SOUNDS.find(s => s.id === activeSound);
      if (sound) {
        audioRef.current.src = sound.url;
        if (isPlaying) {
          audioRef.current.play().catch(e => console.log('Audio playback failed:', e));
        }
      }
    }
  }, [activeSound]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio playback failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleSound = (id: string) => {
    if (activeSound === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSound(id);
      setIsPlaying(true);
    }
  };

  return (
    <section className="soundscapes-container">
      <h3 className="soundscapes-title">Ambient Soundscapes</h3>
      
      <div className="sound-grid">
        {SOUNDS.map(sound => (
          <button 
            key={sound.id} 
            className={`sound-btn ${activeSound === sound.id ? 'active' : ''}`}
            onClick={() => toggleSound(sound.id)}
          >
            <span className="sound-icon">{sound.icon}</span>
            <span className="sound-label">{sound.label}</span>
          </button>
        ))}
      </div>

      {activeSound && (
        <div className="sound-controls">
          <button 
            className="play-pause-btn" 
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <div className="volume-control">
            <span className="volume-label">Volume</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default AmbientSoundscapes;
