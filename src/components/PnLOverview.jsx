import React, { useState } from 'react'
import DateRangePicker from './DateRangePicker'
import './PnLOverview.css'

function PnLOverview({ dateRange, setDateRange }) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showRangeDropdown, setShowRangeDropdown] = useState(false)
  const [selectedRange, setSelectedRange] = useState('Custom')

  const predefinedRanges = ['5D', '1M', '3M', '6M', 'YTD', '1Y', 'All']

  return (
    <div className="pnl-overview">
      <div className="pnl-overview-header">
        <div>
          <h2 className="section-title">P&L Overview</h2>
          <div className="date-range-text">Range: {dateRange.start} - {dateRange.end}</div>
        </div>
        <div className="date-range-selector">
          <button 
            className="range-button"
            onClick={() => setShowRangeDropdown(!showRangeDropdown)}
          >
            {selectedRange} <span className="dropdown-arrow">▼</span>
          </button>
          {showRangeDropdown && (
            <div className="range-dropdown">
              {predefinedRanges.map(range => (
                <button
                  key={range}
                  className={`range-option ${selectedRange === range ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedRange(range)
                    setShowRangeDropdown(false)
                  }}
                >
                  {range}
                </button>
              ))}
              <button
                className="range-option custom-button"
                onClick={() => {
                  setShowRangeDropdown(false)
                  setShowDatePicker(true)
                }}
              >
                Custom
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pnl-metrics">
        <div className="metric-item">
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
        <div className="metric-item">
          <div className="metric-label">
            <span className="dji-indicator"></span> DJI <span className="dropdown-arrow">▼</span>
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