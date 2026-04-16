import React, { useState, useEffect } from 'react';
import './ReflectionOrb.css';

interface ReflectionOrbProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReflectionOrb: React.FC<ReflectionOrbProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'releasing' | 'dissolved' | 'complete'>('idle');
  const [particles, setParticles] = useState<{ id: number; tx: string; ty: string }[]>([]);

  useEffect(() => {
    if (isOpen && status === 'complete') {
      const timer = setTimeout(() => {
        setStatus('idle');
        setInputValue('');
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, status, onClose]);

  const handleRelease = () => {
    if (!inputValue.trim()) return;
    
    setStatus('releasing');
    
    setTimeout(() => {
      createParticles();
      setStatus('dissolved');
      
      setTimeout(() => {
        setStatus('complete');
      }, 2000);
    }, 2000);
  };

  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 150;
      newParticles.push({
        id: i,
        tx: `${Math.cos(angle) * dist}px`,
        ty: `${Math.sin(angle) * dist}px`,
      });
    }
    setParticles(newParticles);
  };

  if (!isOpen) return null;

  return (
    <div className="reflection-overlay" onClick={status === 'idle' ? onClose : undefined}>
      <div className="orb-container" onClick={(e) => e.stopPropagation()}>
        <div className={`reflection-orb ${status === 'releasing' ? 'releasing' : ''} ${status === 'dissolved' ? 'dissolved' : ''}`}>
          {status === 'releasing' && (
            <div className="floating-thought">
              {inputValue}
            </div>
          )}
        </div>

        {status === 'idle' && (
          <div className="thought-input-container">
            <input 
              type="text" 
              className="thought-input" 
              placeholder="What is on your mind?" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRelease()}
              autoFocus
            />
            <button className="release-btn" onClick={handleRelease}>
              Release into the ether
            </button>
          </div>
        )}

        {status === 'dissolved' && particles.map(p => (
          <div 
            key={p.id} 
            className="star-particle" 
            style={{ '--tx': p.tx, '--ty': p.ty } as React.CSSProperties} 
          />
        ))}

        {status === 'complete' && (
          <div className="completion-message">
            Released into the ether.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReflectionOrb;
