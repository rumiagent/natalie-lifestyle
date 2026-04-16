import React, { useState, useEffect } from 'react';
import MindfulPause from './MindfulPause';

interface FocusItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodayFocus: React.FC = () => {
  const [items, setItems] = useState<FocusItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('natalies-focus');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('natalies-focus', JSON.stringify(items));
  }, [items]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (items.length >= 3) {
      alert('Focus on a few things at a time. Try to keep it to three.');
      return;
    }
    const newItem: FocusItem = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
    };
    setItems([...items, newItem]);
    setInputValue('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState) {
          setIsPausing(true);
        }
        return { ...item, completed: nextState };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <section className="focus-section">
      <h2 className="focus-title">Today's Focus</h2>
      <p className="focus-subtitle">Intentionality over productivity. Limit yourself to three.</p>
      
      <form onSubmit={addItem} className="focus-form">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="What is one intentional focus for today?"
          className="focus-input"
        />
        {items.length < 3 && (
          <button type="submit" className="focus-add-btn">+</button>
        )}
      </form>

      <ul className="focus-list">
        {items.map(item => (
          <li key={item.id} className={`focus-item ${item.completed ? 'completed' : ''}`}>
            <div className="focus-item-content" onClick={() => toggleItem(item.id)}>
              <span className="focus-checkbox">{item.completed ? '✓' : ''}</span>
              <span className="focus-text">{item.text}</span>
            </div>
            <button className="focus-remove-btn" onClick={() => removeItem(item.id)}>×</button>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="focus-empty">The day is open. What truly matters right now?</p>
      )}

      {isPausing && (
        <MindfulPause onComplete={() => setIsPausing(false)} />
      )}
    </section>
  );
};

export default TodayFocus;
