import React, { useState, useEffect } from 'react';

const DailyIntention: React.FC = () => {
  const [intention, setIntention] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedIntention = localStorage.getItem(`daily-intention-${today}`);
    if (savedIntention) {
      setIntention(savedIntention);
    } else {
      setIsEditing(true);
    }
  }, []);

  const saveIntention = () => {
    if (inputValue.trim()) {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`daily-intention-${today}`, inputValue.trim());
      setIntention(inputValue.trim());
      setIsEditing(false);
    }
  };

  const startEditing = () => {
    setInputValue(intention);
    setIsEditing(true);
  };

  return (
    <section className="intention-section">
      <h2 className="intention-title">Daily Intention</h2>
      
      {isEditing ? (
        <div className="intention-form fade-in">
          <input 
            type="text" 
            className="intention-input" 
            placeholder="What is your focus for today?" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveIntention()}
          />
          <button className="intention-set-btn" onClick={saveIntention}>
            Set Intention
          </button>
        </div>
      ) : (
        <div className="intention-display fade-in">
          <p className="intention-text">"{intention}"</p>
          <button className="intention-edit-btn" onClick={startEditing}>
            Change Intention
          </button>
        </div>
      )}
    </section>
  );
};

export default DailyIntention;
