import React, { useState } from 'react';
import './DigitalCandle.css';

const DigitalCandle: React.FC = () => {
  const [isLit, setIsLit] = useState(false);

  return (
    <div className="candle-container">
      <div className="candle-wrapper" onClick={() => setIsLit(!isLit)}>
        <div className={`flame ${isLit ? 'lit' : ''}`}>
          <div className="glow"></div>
        </div>
        <div className="candle-body">
          <div className="wick"></div>
        </div>
      </div>
      <p className="candle-label">{isLit ? 'The light is present' : 'Light the candle'}</p>
    </div>
  );
};

export default DigitalCandle;
