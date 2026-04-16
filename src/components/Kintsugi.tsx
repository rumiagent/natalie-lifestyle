import React, { useState, useEffect } from 'react';
import './Kintsugi.css';

const Kintsugi = () => {
  const [repairedPaths, setRepairedPaths] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const cracks = [
    { id: 'crack1', d: 'M 100,100 Q 150,120 200,100' },
    { id: 'crack2', d: 'M 200,100 Q 220,150 200,200' },
    { id: 'crack3', d: 'M 200,200 Q 150,220 100,200' },
    { id: 'crack4', d: 'M 100,200 Q 80,150 100,100' },
    { id: 'crack5', d: 'M 100,150 L 200,150' },
    { id: 'crack6', d: 'M 150,100 L 150,200' },
  ];

  const handleMouseMove = (id) => {
    setRepairedPaths((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const totalCracks = cracks.length;
    const repairedCount = Object.keys(repairedPaths).length;
    if (repairedCount === totalCracks) {
      setIsComplete(true);
    }
  }, [repairedPaths, cracks.length]);

  return (
    <div className="kintsugi-container">
      <div className="kintsugi-header">
        <h2>Digital Kintsugi</h2>
        <p className="kintsugi-subtitle">
          {isComplete 
            ? "There is beauty in the broken and the mended." 
            : "Gently trace the cracks to mend the vessel."}
        </p>
      </div>
      
      <div className="kintsugi-canvas">
        <svg viewBox="0 0 300 300" className="kintsugi-svg">
          {/* The Bowl Shape */}
          <path 
            d="M 50,100 A 100,100 0 0,0 250,100 L 230,220 A 60,60 0 0,1 70,220 Z" 
            className="kintsugi-bowl" 
          />
          
          {/* The Cracks */}
          {cracks.map((crack) => (
            <path
              key={crack.id}
              d={crack.d}
              className={`kintsugi-crack ${repairedPaths[crack.id] ? 'repaired' : ''}`}
              onMouseMove={() => handleMouseMove(crack.id)}
              onTouchMove={() => handleMouseMove(crack.id)}
            />
          ))}
        </svg>
      </div>

      {isComplete && (
        <div className="kintsugi-message">
          <p>Your imperfections make you unique and resilient.</p>
          <button onClick={() => { setRepairedPaths({}); setIsComplete(false); }} className="kintsugi-reset">
            Begin Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Kintsugi;
