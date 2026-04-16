import React, { useState, useEffect } from 'react';
import './MindfulListening.css';

type ListeningState = 'idle' | 'listening' | 'reflecting' | 'complete';

const MindfulListening: React.FC = () => {
  const [state, setState] = useState<ListeningState>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [reflections, setReflections] = useState<string[]>(['', '', '']);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state === 'listening' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (state === 'listening' && timeLeft === 0) {
      setState('reflecting');
    }
    return () => clearInterval(timer);
  }, [state, timeLeft]);

  const startListening = () => {
    setTimeLeft(60);
    setState('listening');
  };

  const handleReflectionChange = (index: number, value: string) => {
    const newReflections = [...reflections];
    newReflections[index] = value;
    setReflections(newReflections);
  };

  const completeSession = () => {
    setState('complete');
  };

  const resetSession = () => {
    setReflections(['', '', '']);
    setTimeLeft(60);
    setState('idle');
  };

  return (
    <div className="mindful-listening-container">
      {state === 'idle' && (
        <>
          <div className="mindful-listening-prompt">
            Take a moment to simply hear the world around you.
          </div>
          <button className="listening-button" onClick={startListening}>
            Begin Listening
          </button>
        </>
      )}

      {state === 'listening' && (
        <>
          <div className="mindful-listening-prompt">
            Close your eyes. Just listen.
          </div>
          <div className={`listening-circle pulsing`}>
            <div className="listening-timer">{timeLeft}s</div>
          </div>
          <div className="mindful-listening-prompt" style={{ fontSize: '1rem', opacity: 0.6 }}>
            Notice sounds near, far, inside, and outside.
          </div>
        </>
      )}

      {state === 'reflecting' && (
        <>
          <div className="mindful-listening-prompt">
            What did you notice?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}>
            {reflections.map((text, i) => (
              <input
                key={i}
                className="reflection-input"
                placeholder={`Sound ${i + 1}...`}
                value={text}
                onChange={(e) => handleReflectionChange(i, e.target.value)}
              />
            ))}
          </div>
          <button className="listening-button" onClick={completeSession} style={{ marginTop: '2rem' }}>
            Finish
          </button>
        </>
      )}

      {state === 'complete' && (
        <>
          <div className="mindful-listening-prompt">
            You are present.
          </div>
          <div className="mindful-listening-prompt" style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '3rem' }}>
            Carry this awareness with you.
          </div>
          <button className="listening-button" onClick={resetSession}>
            Return
          </button>
        </>
      )}
    </div>
  );
};

export default MindfulListening;
