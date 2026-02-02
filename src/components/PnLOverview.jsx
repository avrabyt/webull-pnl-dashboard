import React, { useState, useEffect, useRef } from 'react'
import DateRangePicker from './DateRangePicker'
import './PnLOverview.css'

function PnLOverview({ dateRange, setDateRange, onShowComponents, onShowBenchmark, selectedBenchmark }) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showRangeDropdown, setShowRangeDropdown] = useState(false)
  const [selectedRange, setSelectedRange] = useState('Custom')
  const dropdownOpenTime = useRef(0)

  const predefinedRanges = ['5D', '1M', '3M', '6M', 'YTD', '1Y', 'All']

  const openDropdown = () => {
    dropdownOpenTime.current = Date.now()
    setShowRangeDropdown(true)
  }

  const handleOptionClick = (range) => {
    // Ignore clicks within 300ms of dropdown opening (prevents ghost clicks on mobile)
    if (Date.now() - dropdownOpenTime.current < 300) return
    setSelectedRange(range)
    setShowRangeDropdown(false)
  }

  const handleCustomClick = () => {
    // Ignore clicks within 300ms of dropdown opening (prevents ghost clicks on mobile)
    if (Date.now() - dropdownOpenTime.current < 300) return
    setShowRangeDropdown(false)
    setShowDatePicker(true)
  }

  return (
    <div className="pnl-overview">
      <div className="pnl-overview-header">
        <div>
          <h2 className="section-title">P&L Overview</h2>
          <div className="date-range-text">Range: {dateRange.start} - {dateRange.end}</div>
        </div>
        <div 
          className="date-range-selector"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <button 
            className="range-button"
            onClick={() => showRangeDropdown ? setShowRangeDropdown(false) : openDropdown()}
          >
            {selectedRange} <span className="dropdown-arrow">▼</span>
          </button>
          {showRangeDropdown && (
            <div className="range-dropdown">
              {predefinedRanges.map(range => (
                <button
                  key={range}
                  className={`range-option ${selectedRange === range ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(range)}
                >
                  {range}
                </button>
              ))}
              <button
                className="range-option custom-button"
                onClick={handleCustomClick}
              >
                Custom
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pnl-metrics">
        <div className="metric-item" onClick={onShowComponents} style={{ cursor: 'pointer' }}>
          <div className="metric-label">
            P&L <span className="arrow-icon">{'>'}</span>
          </div>
          <div className="metric-value positive">+$318.08</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">
            P&L% <span className="info-icon">i</span>
          </div>
          <div className="metric-value positive">+4.48%</div>
        </div>
        <div className="metric-item" onClick={onShowBenchmark} style={{ cursor: 'pointer' }}>
          <div className="metric-label">
            <span className={selectedBenchmark === 'SPX' ? 'spx-indicator' : 'dji-indicator'}></span> {selectedBenchmark} <span className="dropdown-arrow">▼</span>
          </div>
          <div className="metric-value positive">+3.78%</div>
        </div>
      </div>

      {showDatePicker && (
        <DateRangePicker
          dateRange={dateRange}
          setDateRange={setDateRange}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  )
}

export default PnLOverview