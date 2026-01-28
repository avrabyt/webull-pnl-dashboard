import React, { useState, useEffect, useRef } from 'react'
import './DateRangePicker.css'

function DateRangePicker({ dateRange, setDateRange, onClose }) {
  // Get current date first
  const now = new Date()
  const todayMonth = now.getMonth() // 0-11
  const todayDay = now.getDate()
  const todayYear = now.getFullYear()
  
  // Refs for columns
  const monthColumnRef = useRef(null)
  const dayColumnRef = useRef(null)
  const yearColumnRef = useRef(null)
  
  // State for selected values
  const [selectedMonth, setSelectedMonth] = useState(todayMonth)
  const [selectedDay, setSelectedDay] = useState(todayDay)
  const [selectedYear, setSelectedYear] = useState(todayYear)
  
  // Format current date as MM/DD/YYYY
  const formatDate = (month, day, year) => {
    const monthStr = String(month + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    return `${monthStr}/${dayStr}/${year}`
  }
  
  const todayDateString = formatDate(todayMonth, todayDay, todayYear)
  
  const [startDate, setStartDate] = useState(dateRange.start || todayDateString)
  const [endDate, setEndDate] = useState(dateRange.end || todayDateString)
  const [activeField, setActiveField] = useState(null)

  // Define months, years, and days first
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December']
  const years = Array.from({ length: 8 }, (_, i) => 2021 + i)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  
  // Update the active date input when selection changes
  useEffect(() => {
    const newDate = formatDate(selectedMonth, selectedDay, selectedYear)
    if (activeField === 'start') {
      setStartDate(newDate)
    } else if (activeField === 'end') {
      setEndDate(newDate)
    }
  }, [selectedMonth, selectedDay, selectedYear, activeField])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Scroll to selected date when component mounts
  useEffect(() => {
    const attemptScroll = () => {
      const columns = [monthColumnRef.current, dayColumnRef.current, yearColumnRef.current]
      
      // Add no-snap to all columns
      columns.forEach(col => col?.classList.add('no-snap'))
      
      // Simply scroll each selected item into view
      columns.forEach(column => {
        if (!column) return
        
        const selectedItem = column.querySelector('.calendar-item.selected')
        if (!selectedItem) return
        
        // Scroll the selected item to the center of the column
        selectedItem.scrollIntoView({ block: 'center', behavior: 'instant' })
      })
      
      // Remove no-snap class after scroll completes
      setTimeout(() => {
        columns.forEach(col => col?.classList.remove('no-snap'))
      }, 50)
    }
    
    // Wait for modal animation to complete
    const timer = setTimeout(attemptScroll, 400)
    
    return () => clearTimeout(timer)
  }, []) // Only run on mount

  const handleApply = () => {
    // Use the selected date for the active field
    const selectedDate = formatDate(selectedMonth, selectedDay, selectedYear)
    if (activeField === 'start' || !activeField) {
      setDateRange({ start: selectedDate, end: endDate })
    } else {
      setDateRange({ start: startDate, end: selectedDate })
    }
    onClose()
  }

  return (
    <div className="date-picker-overlay" onClick={onClose}>
      <div className="date-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="date-picker-header">
          <h3>Custom</h3>
          <p className="picker-description">The date selection supports up to 3 year(s) prior to the current date.</p>
        </div>
        
        <div className="date-inputs">
          <input
            type="text"
            className={`date-input ${activeField === 'start' ? 'active' : ''}`}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={() => setActiveField('start')}
            placeholder="MM/DD/YYYY"
          />
          <span className="date-separator">-</span>
          <input
            type="text"
            className={`date-input ${activeField === 'end' ? 'active' : ''}`}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={() => setActiveField('end')}
            placeholder="MM/DD/YYYY"
          />
        </div>

        <div className="date-picker-calendar">
          <div className="calendar-column" ref={monthColumnRef}>
            {months.map((month, index) => (
              <div 
                key={month} 
                className={`calendar-item ${index === selectedMonth ? 'selected' : ''}`}
                onClick={() => setSelectedMonth(index)}
              >
                {month}
              </div>
            ))}
          </div>
          <div className="calendar-column" ref={dayColumnRef}>
            {days.map(day => (
              <div 
                key={day} 
                className={`calendar-item ${day === selectedDay ? 'selected' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-column" ref={yearColumnRef}>
            {years.map(year => (
              <div 
                key={year} 
                className={`calendar-item ${year === selectedYear ? 'selected' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </div>
            ))}
          </div>
        </div>

        <div className="date-picker-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="apply-btn" onClick={handleApply}>Done</button>
        </div>
      </div>
    </div>
  )
}

export default DateRangePicker
