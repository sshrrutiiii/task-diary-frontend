import React, { useState, useEffect } from 'react';

function ZenMode() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inhale'); 

  useEffect(() => {
    if (!isActive) return;
    
    // Switch between Inhale and Exhale every 4 seconds
    const interval = setInterval(() => {
      setPhase(prev => prev === 'Inhale' ? 'Exhale' : 'Inhale');
    }, 4000); 
    
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <>
      <button 
        onClick={() => setIsActive(true)} 
        style={{
          background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
          padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          fontWeight: 'bold', transition: '0.3s', backdropFilter: 'blur(5px)'
        }}
      >
        🧘‍♀️ Zen Break
      </button>

      {isActive && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 15, 20, 0.9)', backdropFilter: 'blur(15px)',
          zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: 'white', transition: 'opacity 0.5s'
        }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '80px', letterSpacing: '2px', transition: 'opacity 1s' }}>
            {phase}...
          </h2>
          
          <div style={{
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(78, 205, 196, 0.8) 0%, rgba(78, 205, 196, 0) 70%)',
            transform: phase === 'Inhale' ? 'scale(2)' : 'scale(1)',
            transition: 'transform 4s ease-in-out',
            opacity: phase === 'Inhale' ? 0.8 : 0.3
          }} />

          <button 
            onClick={() => setIsActive(false)} 
            style={{ 
              marginTop: '120px', padding: '12px 35px', background: 'transparent', 
              border: '1px solid rgba(255,255,255,0.5)', color: 'white', borderRadius: '30px', 
              cursor: 'pointer', fontSize: '1rem', transition: '0.3s' 
            }}
          >
            Return to Diary
          </button>
        </div>
      )}
    </>
  );
}

export default ZenMode;