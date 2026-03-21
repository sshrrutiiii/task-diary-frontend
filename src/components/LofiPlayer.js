import React, { useState, useRef } from 'react';

function LofiPlayer() {
  const [isOpen, setIsOpen] = useState(false); // Controls if the panel is open or closed
  const [isPlaying, setIsPlaying] = useState(false);
  const [rainVol, setRainVol] = useState(0);
  const [wavesVol, setWavesVol] = useState(0);

  const rainRef = useRef(null);
  const wavesRef = useRef(null);

  // Handle play/pause and volume instantly based on slider value
  const handleVolumeChange = (e, setVol, audioRef) => {
    const value = e.target.value;
    setVol(value);
    
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
      
      if (value > 0) {
        if (audioRef.current.paused) {
          let playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => console.log("Audio block:", err));
          }
        }
      } else {
        audioRef.current.pause();
      }
    }
  };

  const sliderStyle = { width: '100%', accentColor: '#4ecdc4', cursor: 'pointer' };
  const labelStyle = { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ccc', width: '100%', marginBottom: '2px' };

  return (
    <>
      {/* Audio elements must stay outside the conditional panel so they 
        don't stop playing when the user minimizes the mixer!
      */}
      <audio ref={rainRef} loop src="https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg" preload="auto" />
      <audio ref={wavesRef} loop src="https://cdn.freesound.org/previews/400/400632_5121236-lq.mp3" preload="auto" />

      {/* Floating Action Button - Shows when panel is CLOSED */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: '20px', right: '20px',
            background: '#4ecdc4', color: '#1a1a1a', border: 'none',
            borderRadius: '50%', width: '50px', height: '50px',
            fontSize: '24px', cursor: 'pointer', zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          🎵
        </button>
      )}

      {/* Main Mixer Panel - Hides when panel is CLOSED */}
      <div style={{
        position: 'fixed', bottom: '20px', right: '20px', background: 'rgba(20, 20, 20, 0.85)',
        backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.1)',
        display: isOpen ? 'flex' : 'none', // <--- Magic happens here
        flexDirection: 'column', alignItems: 'center', gap: '15px', zIndex: 1000, width: '220px'
      }}>
        
        {/* Header with Close Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <h4 style={{ margin: 0, color: '#ffb6b9', fontSize: '1rem' }}>🎵 Lofi & Vibe</h4>
          <button 
            onClick={() => setIsOpen(false)} 
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem', padding: '0' }}
          >
            ✖
          </button>
        </div>
        
        {isPlaying ? (
          <iframe width="100%" height="80" src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&controls=0" title="Lofi" frameBorder="0" allow="autoplay" style={{ borderRadius: '8px' }}></iframe>
        ) : (
          <div style={{ color: '#888', fontSize: '0.8rem', padding: '10px' }}>Lofi is paused.</div>
        )}

        <button onClick={() => setIsPlaying(!isPlaying)} style={{
            width: '100%', padding: '8px', borderRadius: '8px', border: 'none', background: isPlaying ? '#ff6b6b' : '#4ecdc4',
            color: '#fff', fontWeight: 'bold', cursor: 'pointer'
        }}>
          {isPlaying ? 'PAUSE LOFI' : 'PLAY LOFI'}
        </button>

        <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
          <div style={labelStyle}><span>🌧️ Rain</span></div>
          <input type="range" min="0" max="100" value={rainVol} onChange={(e) => handleVolumeChange(e, setRainVol, rainRef)} style={sliderStyle} />
          
          <div style={{...labelStyle, marginTop: '8px'}}><span>🌊 Waves</span></div>
          <input type="range" min="0" max="100" value={wavesVol} onChange={(e) => handleVolumeChange(e, setWavesVol, wavesRef)} style={sliderStyle} />
        </div>
      </div>
    </>
  );
}

export default LofiPlayer;