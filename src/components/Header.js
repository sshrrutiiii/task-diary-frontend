import React, { useRef } from 'react';

function Header({ colorTheme, setColorTheme, videoTheme, setVideoTheme, onVideoUpload, onRemindersClick, onZenBreakClick }) {
  const fileInputRef = useRef(null);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', background: 'var(--card-bg, rgba(20, 20, 20, 0.5))', backdropFilter: 'blur(10px)', borderRadius: '15px', marginBottom: '20px', border: '1px solid var(--border-color, rgba(255,255,255,0.1))' }}>
      <h1 style={{ margin: 0, color: 'var(--primary-color, #ffb6b9)', fontSize: '1.5rem', fontWeight: 'bold' }}>My Task Diary</h1>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        
        {/* Color Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ color: 'var(--text-color, #fff)', fontSize: '0.9rem', fontWeight: 'bold' }}>Color:</label>
          <select value={colorTheme} onChange={(e) => setColorTheme(e.target.value)} style={{ background: 'var(--bg-color, rgba(0,0,0,0.5))', color: 'var(--text-color, #fff)', border: '1px solid var(--border-color, rgba(255,255,255,0.2))', padding: '5px 10px', borderRadius: '8px', outline: 'none', cursor: 'pointer' }}>
            <option value="theme-beige">Beige</option>
            <option value="theme-pink">Pink</option>
            <option value="theme-dark">Dark</option>
            <option value="theme-matchagreen">Matcha Green</option>
            <option value="theme-oceanblue">Ocean Blue</option>
          </select>
        </div>

        {/* Video Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ color: 'var(--text-color, #fff)', fontSize: '0.9rem', fontWeight: 'bold' }}>Video:</label>
          <select value={videoTheme} onChange={(e) => setVideoTheme(e.target.value)} style={{ background: 'var(--bg-color, rgba(0,0,0,0.5))', color: 'var(--text-color, #fff)', border: '1px solid var(--border-color, rgba(255,255,255,0.2))', padding: '5px 10px', borderRadius: '8px', outline: 'none', cursor: 'pointer' }}>
            <option value="">None</option>
            <option value="video-1">Anime Study 1</option>
            <option value="video-2">Anime Study 2</option>
            <option value="video-3">Anime Nature</option>
            <option value="video-4">Anime Night 4</option>
            <option value="video-5">Anime Cozy 5</option>
            <option value="video-6">Anime Room 6</option>
            <option value="video-7">Anime Desk 7</option>
            <option value="custom">Custom Upload...</option>
          </select>
          
          <input type="file" accept="video/mp4" ref={fileInputRef} style={{ display: 'none' }} onChange={onVideoUpload} />
          <button 
            onClick={() => fileInputRef.current.click()}
            style={{ background: 'transparent', border: '1px solid var(--primary-color, #4ecdc4)', color: 'var(--primary-color, #4ecdc4)', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
            title="Upload your own background video (.mp4)"
          >
            + Upload MP4
          </button>
        </div>

        {/* Restored Reminders & Zen Break Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
          <button 
            onClick={onRemindersClick}
            style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 15px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            🔔 Reminders <span style={{ background: '#ff6b6b', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 'bold' }}>1</span>
          </button>
          
        </div>

      </div>
    </div>
  );
}

export default Header;