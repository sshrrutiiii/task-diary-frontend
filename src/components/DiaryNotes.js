import React, { useState, useEffect } from 'react';

const MOODS = ['✨', '🌸', '☁️', '🌧️', '☕'];

function DiaryNotes({ selectedDate }) {
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  const dateKey = selectedDate ? selectedDate.toISOString().split('T')[0] : 'default';

  useEffect(() => {
    const savedNote = localStorage.getItem(`diary_${dateKey}`);
    const savedMood = localStorage.getItem(`mood_${dateKey}`);
    
    setNote(savedNote || '');
    setMood(savedMood || '');
    setIsSaved(true);
  }, [dateKey]);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    setIsSaved(false);
  };

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(`diary_${dateKey}`, note);
    localStorage.setItem(`mood_${dateKey}`, mood);
    setIsSaved(true);
  };

  // Removed the window.confirm popup!
  const handleClear = () => {
    setNote('');
    setMood('');
    localStorage.removeItem(`diary_${dateKey}`);
    localStorage.removeItem(`mood_${dateKey}`);
    setIsSaved(true);
  };

  return (
    <div style={{
      background: 'var(--card-bg, rgba(255,255,255,0.1))', padding: '25px', borderRadius: '12px', 
      marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '450px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
         <h3 style={{ margin: 0, color: 'var(--primary-color, #ffb6b9)', fontSize: '1.5rem' }}>📓 Dear Diary...</h3>
         <span style={{ fontSize: '0.9rem', color: '#ccc' }}>
           {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Today'}
         </span>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
        <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Today's Vibe:</span>
        {MOODS.map(m => (
          <button 
            key={m} 
            onClick={() => handleMoodSelect(m)}
            style={{
              background: mood === m ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: 'none', fontSize: '1.5rem', cursor: 'pointer', borderRadius: '50%', padding: '5px',
              transition: 'transform 0.2s', transform: mood === m ? 'scale(1.2)' : 'scale(1)'
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <textarea 
        value={note} onChange={handleNoteChange}
        placeholder="How was your day? What are you thinking about? Write anything here..."
        style={{
          flex: 1, width: '100%', padding: '15px', borderRadius: '8px', border: 'none', 
          background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none',
          resize: 'none', fontSize: '1.1rem', lineHeight: '1.6', fontFamily: 'inherit', boxSizing: 'border-box'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px', gap: '10px' }}>
        <button onClick={handleClear} style={{
          padding: '10px 25px', background: 'rgba(255, 107, 107, 0.2)', 
          color: '#ff6b6b', border: '1px solid rgba(255, 107, 107, 0.4)', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s'
        }}>
          🗑️ CLEAR
        </button>
        
        <button onClick={handleSave} style={{
          padding: '10px 25px', background: isSaved ? 'rgba(255,255,255,0.2)' : 'var(--primary-color, #4ecdc4)', 
          color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: isSaved ? 'default' : 'pointer', transition: '0.3s'
        }}>
          {isSaved ? '✓ SAVED' : 'SAVE ENTRY'}
        </button>
      </div>
    </div>
  );
}

export default DiaryNotes;