import React, { useState, useRef } from 'react'
import DateRangePicker from './DateRangePicker'
import './PnLComponents.css'

function PnLComponents({ dateRange, setDateRange, onBack }) {
  const [isClosing, setIsClosing] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showRangeDropdown, setShowRangeDropdown] = useState(false)
  const [selectedRange, setSelectedRange] = useState('Custom')
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const predefinedRanges = ['5D', '1M', '3M', '6M', 'YTD', '1Y', 'All']

  const handleBack = () => {
    setIsClosing(true)
    setTimeout(() => {
      onBack()
    }, 300) // Match animation duration
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    // If swipe right more than 100px, close the panel
    if (touchEndX.current - touchStartX.current > 100) {
      handleBack()
    }
  }
  const symbolLevelItems = [
    {
      iconType: 'chart',
      iconBg: '#f5f5f5',
      label: 'Cumulative Symbol P&L',
      value: '+$396.59',
      isPositive: true
    }
  ]

  const accountLevelItems = [
    {
      iconType: 'percent',
      iconBg: '#f5f5f5',
      label: 'Margin Interest',
      value: '$0.00',
      isPositive: null
    },
    {
      iconType: 'money',
      iconBg: '#f5f5f5',
      label: 'Interest Income',
      value: '$0.00',
      isPositive: null
    },
    {
      iconType: 'document',
      iconBg: '#f5f5f5',
      label: 'Fees & Others',
      value: '-$78.51',
      isPositive: false
    },
    {
      iconType: 'gift',
      iconBg: '#f5f5f5',
      label: 'Platform Rewards',
      value: '$0.00',
      isPositive: null
    }
  ]

  const renderIcon = (iconType) => {
    switch(iconType) {
      case 'chart':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        )
      case 'percent':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="5" x2="5" y2="19"></line>
            <circle cx="6.5" cy="6.5" r="2.5"></circle>
            <circle cx="17.5" cy="17.5" r="2.5"></circle>
          </svg>
        )
      case 'money':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        )
      case 'document':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        )
      case 'gift':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
        )
      default:
        return null
    }
  }

  const totalPnL = '+$318.08'
  const isPnLPositive = true

  return (
    <div 
      className={`pnl-components-page ${isClosing ? 'closing' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="cumulative-section">
        <div className="pnl-components-header">
          <button className="back-button" onClick={handleBack}>
            <span className="back-arrow">‹</span>
          </button>
          <h1 className="page-title">P&L Components</h1>
        </div>
        <div className="cumulative-header">
          <div>
            <div className="cumulative-label">Cumulative P&L</div>
            <div className={`cumulative-value ${isPnLPositive ? 'positive' : 'negative'}`}>
              {totalPnL}
            </div>
            <div className="cumulative-range">Range: {dateRange.start} - {dateRange.end}</div>
          </div>
          <div className="date-range-selector">
            <button 
              className="custom-dropdown-btn"
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
                  className="range-option custom-option"
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
        <div className="cumulative-description">
          Cumulative P&L represents the total profit and loss over a selected time period. 
          Symbol level includes tradi<span className="learn-more">Learn More</span>
        </div>
      </div>

      <div className="components-section">
        <h2 className="section-header">Symbol Level</h2>
        <div className="components-list">
          {symbolLevelItems.map((item, index) => (
            <div key={index} className="component-item">
              <div className="item-left">
                <span className="item-icon" style={{ backgroundColor: item.iconBg }}>
                  {renderIcon(item.iconType)}
                </span>
                <span className="item-label">{item.label}</span>
              </div>
              <div className="item-right">
                <span className={`item-value ${item.isPositive ? 'positive' : item.isPositive === false ? 'negative' : ''}`}>
                  {item.value}
                </span>
                <span className="chevron-right">›</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="components-section">
        <h2 className="section-header">Account Level</h2>
        <div className="components-list">
          {accountLevelItems.map((item, index) => (
            <div key={index} className="component-item">
              <div className="item-left">
                <span className="item-icon" style={{ backgroundColor: item.iconBg }}>
                  {renderIcon(item.iconType)}
                </span>
                <span className="item-label">{item.label}</span>
              </div>
              <div className="item-right">
                <span className={`item-value ${item.isPositive ? 'positive' : item.isPositive === false ? 'negative' : ''}`}>
                  {item.value}
                </span>
                <span className="chevron-right">›</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDatePicker && (
        <DateRangePicker
          dateRange={dateRange}
          setDateRange={(newRange) => {
            setDateRange(newRange)
            setSelectedRange('Custom')
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  )
}

export default PnLComponents
