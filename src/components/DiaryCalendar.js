import React, { useState } from 'react';

function DiaryCalendar({ selectedDate, setSelectedDate }) {
  // Keeps track of which month we are viewing, defaults to the selected date
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  // Adjust so Monday is the first column (0 = Monday, 6 = Sunday)
  const startDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Generate blank spaces for days before the 1st of the month
  const blanks = Array.from({ length: startDayOffset }, (_, i) => (
    <div key={`blank-${i}`} className="calendar-day empty"></div>
  ));

  // Generate actual clickable days
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNumber = i + 1;
    const dateOfThisBox = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
    
    // Check if this box matches the currently selected date
    const isSelected = selectedDate &&
      dateOfThisBox.getDate() === selectedDate.getDate() &&
      dateOfThisBox.getMonth() === selectedDate.getMonth() &&
      dateOfThisBox.getFullYear() === selectedDate.getFullYear();

    return (
      <div
        key={dayNumber}
        onClick={() => setSelectedDate(dateOfThisBox)}
        // THIS IS THE HOVER TOOLTIP!
        title={isSelected ? "Add task on this date" : "Click to select date"}
        style={{
            cursor: 'pointer',
            textAlign: 'center',
            padding: '5px',
            borderRadius: '50%',
            backgroundColor: isSelected ? '#ffb703' : 'transparent',
            color: isSelected ? '#000' : 'inherit',
            fontWeight: isSelected ? 'bold' : 'normal',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
            transition: 'background-color 0.2s'
        }}
      >
        {dayNumber}
      </div>
    );
  });

  // Format the selected date for the bottom text
  const formattedSelectedDate = selectedDate 
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div className="diary-calendar" style={{ padding: '20px', background: 'var(--card-bg, rgba(255,255,255,0.1))', borderRadius: '12px', height: '100%' }}>
      
      {/* Calendar Header */}
      <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={prevMonth} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '1.2rem' }}>&lt;</button>
        <h3 style={{ margin: 0, color: '#e9c46a', fontSize: '1.1rem' }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={nextMonth} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '1.2rem' }}>&gt;</button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px 0', fontSize: '0.9rem' }}>
        {/* Day Headers */}
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.75rem', color: '#aaa', marginBottom: '10px' }}>
            {day}
          </div>
        ))}
        {blanks}
        {days}
      </div>

      {/* Selected Date Display */}
      <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.85rem', color: '#ccc' }}>
        Selected Date:<br/>
        <strong style={{ color: '#fff', fontSize: '1rem', display: 'block', marginTop: '5px' }}>
          {formattedSelectedDate}
        </strong>
      </div>

    </div>
  );
}

export default DiaryCalendar;