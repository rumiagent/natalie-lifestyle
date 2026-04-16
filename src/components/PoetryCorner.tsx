import React, { useState, useEffect } from 'react';
import { MINDFUL_POEMS, Poem } from '../poetry-data';
import './PoetryCorner.css';

const PoetryCorner: React.FC = () => {
  const [currentPoemIdx, setCurrentPoemIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentPoem = MINDFUL_POEMS[currentPoemIdx];

  useEffect(() => {
    if (visibleLines < currentPoem.lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 3000); // Reveal a line every 3 seconds
      return () => clearTimeout(timer);
    }
  }, [visibleLines, currentPoem]);

  const nextPoem = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPoemIdx((prev) => (prev + 1) % MINDFUL_POEMS.length);
      setVisibleLines(0);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className={`poetry-corner ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <div className="poetry-content">
        <h2 className="poetry-title">{currentPoem.title}</h2>
        <div className="poetry-lines">
          {currentPoem.lines.map((line, index) => (
            <p 
              key={index} 
              className={`poetry-line ${index < visibleLines ? 'visible' : 'hidden'}`}
            >
              {line}
            </p>
          ))}
        </div>
        {currentPoem.author && (
          <span className={`poetry-author ${currentPoem.lines.length <= visibleLines ? 'visible' : 'hidden'}`}>
            — {currentPoem.author}
          </span>
        )}
      </div>
      <button className="poetry-btn" onClick={nextPoem}>
        {isTransitioning ? '...' : 'Seek another poem'}
      </button>
    </div>
  );
};

export default PoetryCorner;
