import React, { useState, useEffect } from 'react';
import './MindfulWindow.css';

const PROMPTS = [
  "Notice the way the light hits the nearest tree or plant.",
  "Find three different shades of green outside your window.",
  "Watch the clouds for a moment. Notice their shapes and how they drift.",
  "Listen to the distant sounds of the world. What's the furthest thing you can hear?",
  "Observe the movement of the wind in the leaves or the grass.",
  "Find something small and intricate in nature, like a dewdrop or a vein in a leaf.",
  "Notice the colors of the sky. How do they transition from one to another?",
  "Watch a bird or an insect for a few seconds. Notice its rhythm.",
];

interface MindfulWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const MindfulWindow: React.FC<MindfulWindowProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (isOpen) {
      const randomPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
      setPrompt(randomPrompt);
      setTimeLeft(30);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="mindful-window-overlay">
      <div className="mindful-window-content">
        <div className="mindful-window-prompt">{prompt}</div>
        <div className="mindful-window-timer">{timeLeft}s</div>
        <button className="mindful-window-exit" onClick={onClose}>
          Return to stillness
        </button>
      </div>
    </div>
  );
};

export default MindfulWindow;
