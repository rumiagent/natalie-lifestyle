import React, { useState, useEffect } from 'react';
import './MindfulObservation.css';

const OBSERVATION_PROMPTS = [
  "Find a small object within your reach.",
  "Look at it as if you've never seen it before.",
  "Notice the subtle shifts in color.",
  "Observe the texture of its surface.",
  "Notice where the light creates shadows.",
  "Observe any imperfections or unique marks.",
  "Notice how it exists in this space.",
  "Gently release your focus and return to the present."
];

const MindfulObservation: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setPromptIndex(0);
      setTimeLeft(60);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (isActive) {
      const promptInterval = setInterval(() => {
        setPromptIndex((prev) => (prev + 1) % OBSERVATION_PROMPTS.length);
      }, 7500); // Change prompt every 7.5 seconds
      return () => clearInterval(promptInterval);
    }
  }, [isActive]);

  return (
    <div className="observation-container">
      {!isActive ? (
        <button className="observation-btn" onClick={() => setIsActive(true)}>
          Practice Mindful Observation
        </button>
      ) : (
        <div className="observation-active">
          <div className="observation-timer">{timeLeft}s</div>
          <p className="observation-prompt fade-in-text">
            {OBSERVATION_PROMPTS[promptIndex]}
          </p>
          <button className="observation-cancel-btn" onClick={() => {
            setIsActive(false);
            setPromptIndex(0);
            setTimeLeft(60);
          }}>
            Gently Exit
          </button>
        </div>
      )}
    </div>
  );
};

export default MindfulObservation;
