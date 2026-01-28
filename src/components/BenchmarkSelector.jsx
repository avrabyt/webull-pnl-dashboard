import React, { useState, useRef } from 'react'
import './BenchmarkSelector.css'

function BenchmarkSelector({ selectedBenchmark, onSelect, onClose }) {
  const [isClosing, setIsClosing] = useState(false)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  const benchmarks = [
    {
      symbol: 'DJI',
      name: 'Dow Jones Industrial Average Index'
    },
    {
      symbol: 'SPX',
      name: 'S&P 500 Index'
    },
    {
      symbol: 'IXIC',
      name: 'NASDAQ'
    }
  ]

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleSelect = (symbol) => {
    onSelect(symbol)
    handleClose()
  }

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    // If swipe down more than 100px, close the modal
    if (touchEndY.current - touchStartY.current > 100) {
      handleClose()
    }
  }

  return (
    <div className="benchmark-overlay" onClick={handleClose}>
      <div 
        className={`benchmark-modal ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="benchmark-handle"></div>
        
        <div className="benchmark-header">
          <h2 className="benchmark-title">Select a Benchmark Index</h2>
          <button className="benchmark-search-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        <div className="benchmark-list">
          {benchmarks.map((benchmark) => (
            <div 
              key={benchmark.symbol}
              className={`benchmark-item ${selectedBenchmark === benchmark.symbol ? 'selected' : ''}`}
              onClick={() => handleSelect(benchmark.symbol)}
            >
              <div className="benchmark-info">
                <div className="benchmark-symbol">{benchmark.symbol}</div>
                <div className="benchmark-name">{benchmark.name}</div>
              </div>
              {selectedBenchmark === benchmark.symbol && (
                <svg className="benchmark-check" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1890ff" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BenchmarkSelector
