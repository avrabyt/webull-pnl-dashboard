import React, { useState, useRef, useEffect } from 'react'
import './PnLCalendar.css'

function PnLCalendar() {
  const [selectedMonth, setSelectedMonth] = useState('2025-12')
  const [viewMode, setViewMode] = useState('Month')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Month options
  const monthOptions = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02']

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // Sample calendar data matching the screenshot
  const calendarData = {
    '2025-12': {
      1: -12060, 2: -4740, 3: -794.11, 4: 83.93, 5: -156.03,
      8: -4.52,
      15: 2050, 16: -7330, 17: -10940, 18: -189.03, 19: -2.69,
      22: -993.56, 23: -6700, 24: -1090, 26: -212.02,
      29: -2.00
    }
  }

  const generateCalendarData = () => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const days = []
    
    const [year, month] = selectedMonth.split('-').map(Number)
    const firstDay = new Date(year, month - 1, 1).getDay()
    const daysInMonth = new Date(year, month, 0).getDate()
    const prevMonthDays = new Date(year, month - 1, 0).getDate()
    
    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ 
        day: prevMonthDays - i, 
        value: 0, 
        isOtherMonth: true 
      })
    }
    
    // Add days of current month
    const monthData = calendarData[selectedMonth] || {}
    for (let day = 1; day <= daysInMonth; day++) {
      const value = monthData[day] || 0
      days.push({ day, value, isOtherMonth: false })
    }
    
    // Add days from next month to complete the grid (6 rows)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, value: 0, isOtherMonth: true })
    }
    
    return { daysOfWeek, days }
  }

  const formatValue = (value) => {
    if (value === 0) return '0.00'
    const absValue = Math.abs(value)
    if (absValue >= 1000) {
      return (value < 0 ? '-' : '+') + (absValue / 1000).toFixed(2) + 'K'
    }
    return (value < 0 ? '' : '+') + value.toFixed(2)
  }

  const { daysOfWeek, days } = generateCalendarData()

  return (
    <div className="pnl-calendar">
      <div className="calendar-header">
        <h2 className="section-title">
          P&L Calendar
          <span className="info-icon">i</span>
          <span className="refresh-icon">↻</span>
        </h2>
      </div>
      
      <div className="calendar-controls">
        <div 
          className="month-selector-wrapper" 
          ref={dropdownRef}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <button 
            className="month-selector"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedMonth} <span className="dropdown-arrow">▼</span>
          </button>
          {showDropdown && (
            <div className="month-dropdown">
              {monthOptions.map(month => (
                <button
                  key={month}
                  className={`month-option ${selectedMonth === month ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedMonth(month)
                    setShowDropdown(false)
                  }}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
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
              className={`calendar-day ${item.isOtherMonth ? 'other-month' : ''} ${!item.isOtherMonth && item.value !== 0 ? (item.value < 0 ? 'negative' : 'positive') : ''}`}
            >
              <div className={`day-number ${item.isOtherMonth ? 'muted' : ''}`}>{item.day}</div>
              <div className={`day-value ${item.value < 0 ? 'negative' : item.value > 0 ? 'positive' : ''}`}>
                {formatValue(item.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PnLCalendar
