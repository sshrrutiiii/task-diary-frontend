 import React, { useState } from 'react';

function TaskList({ tasks, onDelete, onToggleComplete, onReorder }) {
  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    if(onReorder) {
        onReorder(draggedIdx, index);
    }
    setDraggedIdx(null);
  };

  return (
    <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '15px', border: '1px solid var(--border-color)', minHeight: '200px' }}>
      <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-color)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Your Tasks</h3>
      
      {tasks.length === 0 ? (
        <p style={{ color: 'var(--text-color)', opacity: 0.6, fontStyle: 'italic', fontSize: '0.9rem' }}>No tasks yet. Add one above!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              draggable 
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 15px', background: 'var(--bg-color)', borderRadius: '8px',
                border: '1px solid var(--border-color)', cursor: 'grab', transition: 'background 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: 'var(--text-color)', opacity: 0.5, cursor: 'grab', fontSize: '1.2rem' }}>⋮⋮</span>
                <input 
                  type="checkbox" 
                  checked={task.isCompleted || task.completed || false} 
                  onChange={() => onToggleComplete(task.id)} 
                  style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ 
                    color: 'var(--text-color)', 
                    opacity: (task.isCompleted || task.completed) ? 0.5 : 1,
                    textDecoration: (task.isCompleted || task.completed) ? 'line-through' : 'none',
                    fontWeight: 'bold', fontSize: '1rem'
                  }}>
                    {task.title || task.text}
                  </span>
                  
                  {/* NEW: Displays description AND Time if they exist */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {task.description && <span style={{ color: 'var(--text-color)', opacity: 0.7, fontSize: '0.8rem' }}>{task.description}</span>}
                    {task.startTime && task.endTime && (
                      <span style={{ color: 'var(--primary-color)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        ⏳ {task.startTime} - {task.endTime}
                      </span>
                    )}
                  </div>

                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{
                  fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px',
                  background: 'var(--card-bg)', color: 'var(--text-color)', border: '1px solid var(--border-color)'
                }}>
                  {task.category === 'Work' ? '💻 Work' : 
                   task.category === 'Study' ? '📚 Study' : 
                   task.category === 'Personal' ? '🪴 Personal' : 
                   '📝 General'}
                </span>
                
                <button 
                  onClick={() => onDelete(task.id)} 
                  style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '1.1rem', opacity: 0.7 }}
                  onMouseOver={(e) => e.target.style.opacity = 1}
                  onMouseOut={(e) => e.target.style.opacity = 0.7}
                  title="Delete Task"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;