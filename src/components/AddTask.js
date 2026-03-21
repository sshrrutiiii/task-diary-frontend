 import React, { useState } from 'react';

function AddTask({ onAdd, selectedDate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium Priority');
  const [category, setCategory] = useState('Study'); 
  
  // Time states
  const [hasTime, setHasTime] = useState(false);
  const [startHour, setStartHour] = useState('09');
  const [startMin, setStartMin] = useState('00');
  const [startAmPm, setStartAmPm] = useState('AM');
  const [endHour, setEndHour] = useState('10');
  const [endMin, setEndMin] = useState('30');
  const [endAmPm, setEndAmPm] = useState('AM');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    // Package up the task data
    const newTaskData = { title, description, priority, category };
    
    // Add time if the box is checked
    if (hasTime) {
      newTaskData.startTime = `${startHour}:${startMin} ${startAmPm}`;
      newTaskData.endTime = `${endHour}:${endMin} ${endAmPm}`;
    }
    
    onAdd(newTaskData);
    
    // Reset form
    setTitle('');
    setDescription('');
    setHasTime(false);
  };

  return (
    <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '15px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input 
            type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', outline: 'none' }}
          />
          <input 
            type="text" value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (Optional)"
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '8px', borderRadius: '8px', background: 'var(--bg-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)', outline: 'none' }}>
            <option value="High Priority">High Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="Low Priority">Low Priority</option>
          </select>
          
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px', borderRadius: '8px', background: 'var(--bg-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)', outline: 'none' }}>
            <option value="Study">📚 Study</option>
            <option value="Work">💻 Work</option>
            <option value="Personal">🪴 Personal</option>
            <option value="General">📝 General</option>
          </select>

          {/* Set Time Checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-color)', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={hasTime} onChange={(e) => setHasTime(e.target.checked)} style={{ accentColor: 'var(--primary-color)', cursor: 'pointer' }} />
            Set Time?
          </label>

          {/* Time Selectors (Only shows if checked) */}
          {hasTime && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{color: 'var(--text-color)'}}>⏳</span>
              <select value={startHour} onChange={e => setStartHour(e.target.value)} style={timeSelectStyle}>
                {['01','02','03','04','05','06','07','08','09','10','11','12'].map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              <select value={startMin} onChange={e => setStartMin(e.target.value)} style={timeSelectStyle}>
                {['00','15','30','45'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={startAmPm} onChange={e => setStartAmPm(e.target.value)} style={timeSelectStyle}>
                <option value="AM">AM</option><option value="PM">PM</option>
              </select>
              <span style={{ color: 'var(--text-color)', margin: '0 5px' }}>—</span>
              <span style={{color: 'var(--text-color)'}}>⏳</span>
              <select value={endHour} onChange={e => setEndHour(e.target.value)} style={timeSelectStyle}>
                {['01','02','03','04','05','06','07','08','09','10','11','12'].map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              <select value={endMin} onChange={e => setEndMin(e.target.value)} style={timeSelectStyle}>
                {['00','15','30','45'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={endAmPm} onChange={e => setEndAmPm(e.target.value)} style={timeSelectStyle}>
                <option value="AM">AM</option><option value="PM">PM</option>
              </select>
            </div>
          )}

          <button type="submit" style={{ marginLeft: 'auto', padding: '10px 25px', borderRadius: '8px', border: 'none', background: 'var(--primary-color, #f4d068)', color: '#1a1a1a', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}

const timeSelectStyle = {
  padding: '5px', borderRadius: '5px', background: 'var(--bg-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)', outline: 'none', cursor: 'pointer'
};

export default AddTask;