import React, { useState, useEffect } from 'react';

interface GratitudeNote {
  id: string;
  text: string;
  date: string;
}

const GratitudeLog: React.FC = () => {
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState<GratitudeNote[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem('natalie-gratitude-logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const saveNote = () => {
    if (!note.trim()) return;

    const newNote: GratitudeNote = {
      id: Date.now().toString(),
      text: note.trim(),
      date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
    };

    const updatedLogs = [newNote, ...logs].slice(0, 7);
    setLogs(updatedLogs);
    localStorage.setItem('natalie-gratitude-logs', JSON.stringify(updatedLogs));
    setNote('');
  };

  return (
    <section className="gratitude-section">
      <h2 className="gratitude-title">Daily Gratitude</h2>
      <p className="gratitude-subtitle">What is one small thing that brought you peace today?</p>
      
      <div className="gratitude-form">
        <input
          type="text"
          className="gratitude-input"
          placeholder="I am grateful for..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && saveNote()}
        />
        <button className="gratitude-add-btn" onClick={saveNote}>
          Save
        </button>
      </div>

      <div className="gratitude-list">
        {logs.map((log) => (
          <div key={log.id} className="gratitude-item">
            <span className="gratitude-date">{log.date}</span>
            <span className="gratitude-text">{log.text}</span>
          </div>
        ))}
        {logs.length === 0 && <p className="gratitude-empty">No gratitude notes yet. Start your day with a thankful heart.</p>}
      </div>
    </section>
  );
};

export default GratitudeLog;
