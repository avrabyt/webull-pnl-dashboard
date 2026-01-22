import React, { useState, useEffect } from 'react'
import './DateRangePicker.css'

function DateRangePicker({ dateRange, setDateRange, onClose }) {
  // Get current date first
  const now = new Date()
  const currentMonth = now.getMonth() // 0-11
  const currentDay = now.getDate()
  const currentYear = now.getFullYear()
  
  // Format current date as MM/DD/YYYY
  const formatDate = (month, day, year) => {
    const monthStr = String(month + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    return `${monthStr}/${dayStr}/${year}`
  }
  
  const todayDateString = formatDate(currentMonth, currentDay, currentYear)
  
  const [startDate, setStartDate] = useState(dateRange.start || todayDateString)
  const [endDate, setEndDate] = useState(dateRange.end || todayDateString)
  const [activeField, setActiveField] = useState(null)

  // Define months, years, and days first
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December']
  const years = Array.from({ length: 8 }, (_, i) => 2021 + i)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Scroll to current date when component mounts
  useEffect(() => {
    setTimeout(() => {
      const monthColumn = document.querySelector('.calendar-column:first-child')
      const dayColumn = document.querySelector('.calendar-column:nth-child(2)')
      const yearColumn = document.querySelector('.calendar-column:last-child')
      
      if (monthColumn) {
        const monthItem = monthColumn.children[currentMonth + 1] // +1 for header
        if (monthItem) {
          monthItem.scrollIntoView({ behavior: 'auto', block: 'center' })
        }
      }
      
      if (dayColumn) {
        const dayItem = dayColumn.children[currentDay] // header is at 0, day 1 is at 1, so currentDay is correct
        if (dayItem) {
          dayItem.scrollIntoView({ behavior: 'auto', block: 'center' })
        }
      }
      
      if (yearColumn) {
        const yearIndex = years.indexOf(currentYear)
        if (yearIndex >= 0) {
          const yearItem = yearColumn.children[yearIndex + 1] // +1 for header
          if (yearItem) {
            yearItem.scrollIntoView({ behavior: 'auto', block: 'center' })
          }
        }
      }
    }, 100)
  }, [currentMonth, currentDay, currentYear, years])

  const handleApply = () => {
    setDateRange({ start: startDate, end: endDate })
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
          <div className="calendar-column">
            <div className="column-header">Month</div>
            {months.map((month, index) => (
              <div key={month} className={`calendar-item ${index === currentMonth ? 'selected' : ''}`}>
                {month}
              </div>
            ))}
          </div>
          <div className="calendar-column">
            <div className="column-header">Day</div>
            {days.map(day => (
              <div key={day} className={`calendar-item ${day === currentDay ? 'selected' : ''}`}>
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-column">
            <div className="column-header">Year</div>
            {years.map(year => (
              <div key={year} className={`calendar-item ${year === currentYear ? 'selected' : ''}`}>
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
