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
    url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c6c8a7657a.mp3', 
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
  { 
    id: 'fire', 
    label: 'Crackling Fire', 
    url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0c6ff5787.mp3', 
    icon: '🔥' 
  },
];

const AmbientSoundscapes: React.FC = () => {
  const [activeSounds, setActiveSounds] = useState<Record<string, number>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    // Initialize audio objects
    SOUNDS.forEach(sound => {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audioRefs.current[sound.id] = audio;
    });

    return () => {
      // Cleanup all audio objects
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  useEffect(() => {
    // Sync audio playback and volume with state
    SOUNDS.forEach(sound => {
      const audio = audioRefs.current[sound.id];
      if (!audio) return;

      const volume = activeSounds[sound.id];
      if (volume !== undefined) {
        audio.volume = volume;
        if (audio.paused) {
          audio.play().catch(e => console.log(`Audio playback failed for ${sound.id}:`, e));
        }
      } else {
        audio.pause();
      }
    });
  }, [activeSounds]);

  const toggleSound = (id: string) => {
    setActiveSounds(prev => {
      const next = { ...prev };
      if (next[id] !== undefined) {
        delete next[id];
      } else {
        next[id] = 0.5; // Default volume when turning on
      }
      return next;
    });
  };

  const updateVolume = (id: string, volume: number) => {
    setActiveSounds(prev => ({
      ...prev,
      [id]: volume
    }));
  };

  return (
    <section className="soundscapes-container">
      <h3 className="soundscapes-title">Ambient Sound Mixer</h3>
      <p className="soundscapes-subtitle">Blend your sanctuary</p>
      
      <div className="sound-mixer-grid">
        {SOUNDS.map(sound => {
          const isActive = activeSounds[sound.id] !== undefined;
          const volume = activeSounds[sound.id] || 0;

          return (
            <div key={sound.id} className={`sound-mixer-row ${isActive ? 'active' : ''}`}>
              <div className="sound-info" onClick={() => toggleSound(sound.id)}>
                <span className="sound-icon">{sound.icon}</span>
                <span className="sound-label">{sound.label}</span>
                <div className={`toggle-indicator ${isActive ? 'on' : 'off'}`} />
              </div>
              
              {isActive && (
                <div className="sound-volume-slider">
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={(e) => updateVolume(sound.id, parseFloat(e.target.value))}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {Object.keys(activeSounds).length > 0 && (
        <button className="stop-all-btn" onClick={() => setActiveSounds({})}>
          Clear All
        </button>
      )}
    </section>
  );
};

export default AmbientSoundscapes;
