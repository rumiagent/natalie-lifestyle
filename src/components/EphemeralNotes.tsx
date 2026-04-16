import React, { useState, useEffect } from 'react';

interface Note {
  id: number;
  text: string;
  timestamp: number;
}

const EphemeralNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputValue, setInputValue] = useState('');

  const NOTE_LIFESPAN = 30000; // 30 seconds for demonstration purposes

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setNotes(prevNotes => prevNotes.filter(note => now - note.timestamp < NOTE_LIFESPAN));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRelease = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      text: inputValue,
      timestamp: Date.now(),
    };

    setNotes(prevNotes => [...prevNotes, newNote]);
    setInputValue('');
  };

  return (
    <section className="ephemeral-notes-container">
      <h2 className="ephemeral-title">Ephemeral Notes</h2>
      <p className="ephemeral-subtitle">Write a thought, then let it drift away.</p>
      
      <form onSubmit={handleRelease} className="ephemeral-form">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="What's on your mind?"
          className="ephemeral-input"
        />
        <button type="submit" className="ephemeral-btn">Release</button>
      </form>

      <div className="ephemeral-notes-list">
        {notes.map(note => (
          <div 
            key={note.id} 
            className="ephemeral-note" 
            style={{ 
              opacity: 1 - (Date.now() - note.timestamp) / NOTE_LIFESPAN 
            }}
          >
            {note.text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default EphemeralNotes;
