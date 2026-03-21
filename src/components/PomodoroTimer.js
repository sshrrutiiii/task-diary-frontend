import React, { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [startHour, setStartHour] = useState('09');
  const [startMin, setStartMin] = useState('00');
  const [startPeriod, setStartPeriod] = useState('AM');
  
  const [endHour, setEndHour] = useState('10');
  const [endMin, setEndMin] = useState('30');
  const [endPeriod, setEndPeriod] = useState('AM');

  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) {
      const getMinutes = (h, m, period) => {
        let hours = parseInt(h);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return (hours * 60) + parseInt(m);
      };

      const startMins = getMinutes(startHour, startMin, startPeriod);
      const endMins = getMinutes(endHour, endMin, endPeriod);

      let diff = endMins - startMins;
      if (diff < 0) diff += 24 * 60; // fixes overnight calculation

      if (!isNaN(diff)) {
        setTimeLeft(diff * 60); 
      } else {
        setTimeLeft(0);
      }
    }
  }, [startHour, startMin, startPeriod, endHour, endMin, endPeriod, isActive]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
      alert("Study Time is up!");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setStartHour('09'); setStartMin('00'); setStartPeriod('AM');
    setEndHour('10'); setEndMin('30'); setEndPeriod('AM');
  };

  return (
    <div style={{ background: 'var(--card-bg, rgba(20,20,20,0.6))', padding: '20px', borderRadius: '15px', textAlign: 'center', marginTop: '20px' }}>
      <h3 style={{ color: 'var(--primary-color, #ffb6b9)', margin: '0 0 15px 0' }}>🧠 Study Time</h3>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
        <span>⏳</span>
        <select value={startHour} onChange={(e) => setStartHour(e.target.value)} disabled={isActive} style={{ background: '#333', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px' }}>
          {['01','02','03','04','05','06','07','08','09','10','11','12'].map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        <select value={startMin} onChange={(e) => setStartMin(e.target.value)} disabled={isActive} style={{ background: '#333', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px' }}>
          {['00','15','30','45'].map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)} disabled={isActive} style={{ background: '#333', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px' }}>
          <option value="AM">AM</option><option value="PM">PM</option>
        </select>
        
        <span style={{ margin: '0 10px', color: '#888' }}>—</span>
        
        <span>⏳</span>
        <select value={endHour} onChange={(e) => setEndHour(e.target.value)} disabled={isActive} style={{ background: '#333', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px' }}>
          {['01','02','03','04','05','06','07','08','09','10','11','12'].map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        <select value={endMin} onChange={(e) => setEndMin(e.target.value)} disabled={isActive} style={{ background: '#333', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px' }}>
          {['00','15','30','45'].map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)} disabled={isActive} style={{ background: '#333', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px' }}>
          <option value="AM">AM</option><option value="PM">PM</option>
        </select>
      </div>

      <h1 style={{ fontSize: '3rem', margin: '10px 0', color: '#fff', fontWeight: 'bold' }}>
        {formatTime(timeLeft)}
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
        <button onClick={toggleTimer} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: isActive ? '#ff6b6b' : 'var(--primary-color, #4ecdc4)', color: '#1a1a1a', fontWeight: 'bold', cursor: 'pointer' }}>
          {isActive ? 'PAUSE' : 'START'}
        </button>
        <button onClick={resetTimer} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer;