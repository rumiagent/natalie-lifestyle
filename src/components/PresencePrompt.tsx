import React, { useState, useEffect } from 'react';
import { PRESENCE_PROMPTS, type PresencePrompt } from '../mindfulness-data';

const PresencePrompt: React.FC = () => {
  const [prompt, setPrompt] = useState<PresencePrompt | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setPrompt(PRESENCE_PROMPTS[Math.floor(Math.random() * PRESENCE_PROMPTS.length)]);
  }, []);

  const refreshPrompt = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      let nextPrompt;
      do {
        nextPrompt = PRESENCE_PROMPTS[Math.floor(Math.random() * PRESENCE_PROMPTS.length)];
      } while (nextPrompt === prompt);
      
      setPrompt(nextPrompt);
      setIsTransitioning(false);
    }, 500);
  };

  if (!prompt) return null;

  return (
    <section className="presence-prompt">
      <h2 className="presence-title">Presence Check</h2>
      <div className={`presence-content ${isTransitioning ? 'fade-out' : 'fade-in-text'}`}>
        <p className="presence-text">{prompt.text}</p>
        <span className="presence-focus">Focus: {prompt.focusArea}</span>
      </div>
      <button className="presence-btn" onClick={refreshPrompt}>
        {isTransitioning ? '...' : 'Another anchor'}
      </button>
      
      <style>{`
        .presence-prompt {
          margin: 2rem 0;
          padding: 2rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.5s ease;
        }
        .presence-title {
          font-size: 1.1rem;
          font-weight: 400;
          opacity: 0.7;
          margin-bottom: 1rem;
          letter-spacing: 0.05rem;
        }
        .presence-text {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          font-style: italic;
        }
        .presence-focus {
          display: block;
          font-size: 0.85rem;
          opacity: 0.5;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          margin-bottom: 1.5rem;
        }
        .presence-btn {
          background: none;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          color: inherit;
          transition: all 0.3s ease;
          opacity: 0.6;
        }
        .presence-btn:hover {
          opacity: 1;
          background: rgba(0, 0, 0, 0.05);
        }
        .fade-out {
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.5s ease;
        }
        .fade-in-text {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.5s ease;
        }
      `}</style>
    </section>
  );
};

export default PresencePrompt;
