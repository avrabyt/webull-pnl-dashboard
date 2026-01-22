import React, { useState } from 'react'
import './PnLCalendar.css'

function PnLCalendar() {
  const [selectedMonth, setSelectedMonth] = useState('2026-01')
  const [viewMode, setViewMode] = useState('Month')

  // Sample calendar data
  const generateCalendarData = () => {
    const days = []
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    
    // Get first day of month and number of days
    const [year, month] = selectedMonth.split('-').map(Number)
    const firstDay = new Date(year, month - 1, 1).getDay()
    const daysInMonth = new Date(year, month, 0).getDate()
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, value: null, isToday: false, isSelected: false })
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day)
      const isToday = false // You can add logic to check if it's today
      const isSelected = day === 20 && month === 12 && year === 2025 // Highlighted date from image
      
      // Sample P&L values
      let value = 0.00
      if (day === 29 && month === 1 && year === 2026) {
        value = -2.00
      }
      
      days.push({ day, value, isToday, isSelected })
    }
    
    return { daysOfWeek, days }
  }

  const { daysOfWeek, days } = generateCalendarData()

  return (
    <div className="pnl-calendar">
      <div className="calendar-header">
        <div>
          <h2 className="section-title">
            P&L Calendar
            <span className="info-icon">i</span>
            <span className="refresh-icon">↻</span>
          </h2>
        </div>
        <div className="calendar-controls">
          <select 
            className="month-selector"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="2025-12">2025-12</option>
            <option value="2026-01">2026-01</option>
            <option value="2026-02">2026-02</option>
          </select>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'Month' ? 'active' : ''}`}
              onClick={() => setViewMode('Month')}
            >
              Month
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'Year' ? 'active' : ''}`}
              onClick={() => setViewMode('Year')}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {daysOfWeek.map(day => (
            <div key={day} className="weekday-header">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {days.map((item, index) => (
            <div 
              key={index} 
              className={`calendar-day ${item.isSelected ? 'selected' : ''} ${item.value !== null && item.value !== 0 ? item.value < 0 ? 'negative' : 'positive' : ''}`}
            >
              {item.day && (
                <>
                  <div className="day-number">{item.day}</div>
                  <div className="day-value">{item.value !== null ? item.value.toFixed(2) : '0.00'}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PnLCalendar
