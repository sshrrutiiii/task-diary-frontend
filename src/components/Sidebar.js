import React from 'react';

function Sidebar({ currentFilter, setFilter }) {
  const menuItems = ['All Tasks', 'Pending', 'In Progress', 'Completed', 'Diary Notes'];

  return (
    <aside className="app-sidebar">
      {/* Upgraded Mellow Header */}
      <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '20px' }}>
        <span style={{ fontSize: '1.8rem' }}>🍵</span>
        <h2 style={{ 
          margin: 0, 
          color: '#ffb6b9', 
          fontSize: '1.8rem',
          fontWeight: '800',
          letterSpacing: '2px',
          textShadow: '0 0 15px rgba(255, 182, 185, 0.6)' 
        }}>
          Mellow
        </h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li 
              key={item} 
              className={currentFilter === item ? 'active' : ''}
              onClick={() => setFilter(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;