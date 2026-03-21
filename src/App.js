import React, { useState, useEffect } from 'react';
import PomodoroTimer from './components/PomodoroTimer';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import DiaryCalendar from './components/DiaryCalendar';
import LofiPlayer from './components/LofiPlayer'; 
import DiaryNotes from './components/DiaryNotes'; 
import ZenMode from './components/ZenMode'; 
import Login from './components/Login'; 
import SignUp from './components/SignUp'; 
import './App.css';

// Import your videos
import bg1 from './assets/background1.mp4';
import bg2 from './assets/background2.mp4';
import bg3 from './assets/background3.mp4';
import bg4 from './assets/background4.mp4';
import bg5 from './assets/background5.mp4';
import bg6 from './assets/background6.mp4';
import bg7 from './assets/background7.mp4';

const videoMap = {
  'video-1': bg1, 'video-2': bg2, 'video-3': bg3, 
  'video-4': bg4, 'video-5': bg5, 'video-6': bg6, 'video-7': bg7,
};

const API_URL = 'http://localhost:8080/api/tasks';
const TEST_USER_ID = 1; 

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false); 

  const [colorTheme, setColorTheme] = useState(() => localStorage.getItem('colorTheme') || 'theme-beige');
  const [videoTheme, setVideoTheme] = useState(() => localStorage.getItem('videoTheme') || '');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('isDarkMode');
      return savedMode !== null ? JSON.parse(savedMode) : false;
    } catch (e) {
      return false; 
    }
  });
  
  const [filter, setFilter] = useState('All Tasks');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  
  // NEW: State to toggle the reminders popup
  const [showReminders, setShowReminders] = useState(false);

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
    localStorage.setItem('videoTheme', videoTheme);
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [colorTheme, videoTheme, isDarkMode]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}?userId=${TEST_USER_ID}`);
      const taskData = await response.json(); 
      if (Array.isArray(taskData)) {
        setTasks(taskData);
      } else {
        setTasks([]); 
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch(`${API_URL}?userId=${TEST_USER_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...newTask, 
          isCompleted: false, 
          status: 'In Progress',
          date: selectedDate.toISOString() 
        })
      });
      
      const savedTask = await response.json();
      if (savedTask && savedTask.id) {
        setTasks([...tasks, savedTask]);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (taskId) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;

    const currentStatus = taskToUpdate.isCompleted || taskToUpdate.completed || false;
    const updatedCompletionStatus = !currentStatus;
    const updatedStatusText = updatedCompletionStatus ? 'Completed' : 'In Progress';

    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, isCompleted: updatedCompletionStatus, status: updatedStatusText } : t
    ));

    try {
      await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...taskToUpdate, 
          isCompleted: updatedCompletionStatus, 
          status: updatedStatusText 
        })
      });
    } catch (error) {
      console.error("Error updating task:", error);
      fetchTasks();
    }
  };

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  
  const filteredTasks = safeTasks.filter(task => {
    const matchesStatus = (filter === 'All Tasks' || filter === 'Diary Notes') ? true : task.status === filter;
    const taskDate = task.date ? new Date(task.date) : new Date();
    const isSameDate = 
      taskDate.getFullYear() === selectedDate.getFullYear() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getDate() === selectedDate.getDate();

    return matchesStatus && isSameDate;
  });

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(t => t.isCompleted || t.completed).length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // NEW: Calculate pending tasks for the reminders menu
  const pendingTasks = safeTasks.filter(t => !t.isCompleted && !t.completed);

  return (
    <>
      {videoTheme && (
        <video key={videoTheme} autoPlay loop muted className="video-background">
          <source src={videoMap[videoTheme]} type="video/mp4" />
        </video>
      )}

      {!loggedInUser ? (
        showSignUp ? (
          <SignUp 
            setLoggedInUser={setLoggedInUser} 
            onNavigateToLogin={() => setShowSignUp(false)} 
          />
        ) : (
          <Login 
            setLoggedInUser={setLoggedInUser} 
            onNavigateToSignUp={() => setShowSignUp(true)} 
          />
        )
      ) : (
        <div className={`app-container ${colorTheme} ${videoTheme ? 'video-mode' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
          <Sidebar currentFilter={filter} setFilter={setFilter} />
          
          <div className="main-content" style={{ position: 'relative' }}>
            {/* NEW: Passed onRemindersClick to Header */}
            <Header 
              colorTheme={colorTheme} setColorTheme={setColorTheme} 
              videoTheme={videoTheme} setVideoTheme={setVideoTheme}
              isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} 
              onRemindersClick={() => setShowReminders(!showReminders)}
            />

            {/* NEW: The Reminders Dropdown Menu */}
            {showReminders && (
              <div style={{
                position: 'absolute', top: '80px', right: '20px', zIndex: 1000,
                background: 'var(--card-bg, rgba(20, 20, 20, 0.9))', backdropFilter: 'blur(10px)',
                padding: '15px 20px', borderRadius: '15px', border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)', minWidth: '250px', color: 'var(--text-color, #fff)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary-color, #ffb6b9)' }}>🔔 Pending Tasks</h3>
                  <button onClick={() => setShowReminders(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                </div>
                
                {pendingTasks.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
                    {pendingTasks.map(task => (
                      <li key={task.id} style={{ padding: '8px 0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#ffb6b9' }}>•</span> {task.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ margin: '10px 0', fontSize: '0.9rem', color: '#aaa', textAlign: 'center' }}>All caught up! 🎉</p>
                )}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
              <ZenMode />
            </div>
            
            <div className="dashboard-layout">
              <div className="task-section">
                {filter === 'Diary Notes' ? (
                  <DiaryNotes selectedDate={selectedDate} />
                ) : (
                  <>
                    <AddTask onAdd={handleAddTask} selectedDate={selectedDate} />
                    
                    <div className="progress-container">
                      <div className="progress-header">
                        <span>Daily Progress</span>
                        <span>{progressPercentage}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${progressPercentage}%`, transition: 'width 0.3s ease' }}></div>
                      </div>
                    </div>

                    <TaskList 
                      tasks={filteredTasks} 
                      onDelete={handleDeleteTask} 
                      onToggleComplete={toggleComplete} 
                    />
                  </>
                )}
              </div>
              
              <div className="calendar-section">
                <DiaryCalendar 
                  selectedDate={selectedDate} 
                  setSelectedDate={setSelectedDate} 
                />
                <PomodoroTimer />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {loggedInUser && <LofiPlayer />}
    </>
  );
}

export default App;