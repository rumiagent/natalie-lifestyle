import React, { useState } from 'react';
import './MindfulReflection.css';

interface MindfulReflectionProps {
  prompt: string;
}

const MindfulReflection: React.FC<MindfulReflectionProps> = ({ prompt }) => {
  const [text, setText] = useState('');

  return (
    <div className="mindful-reflection-container">
      <p className="reflection-prompt">{prompt}</p>
      <textarea
        className="reflection-input"
        placeholder="Let your thoughts flow gently..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="reflection-hint">
        Focus on the feeling of the words as you write them.
      </div>
    </div>
  );
};

export default MindfulReflection;
