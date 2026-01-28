import React, { useState, useRef } from 'react'
import HeaderBar from './components/HeaderBar'
import Navigation from './components/Navigation'
import PnLOverview from './components/PnLOverview'
import TrendAnalysis from './components/TrendAnalysis'
import AssetClassChart from './components/AssetClassChart'
import PnLCalendar from './components/PnLCalendar'
import PnLComponents from './components/PnLComponents'
import NavigationDrawer from './components/NavigationDrawer'
import BenchmarkSelector from './components/BenchmarkSelector'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('P&L')
  const [activeSubTab, setActiveSubTab] = useState('Account P&L')
  const [showPnLComponents, setShowPnLComponents] = useState(false)
  const [showNavigationDrawer, setShowNavigationDrawer] = useState(false)
  const [showBenchmarkSelector, setShowBenchmarkSelector] = useState(false)
  const [selectedBenchmark, setSelectedBenchmark] = useState('SPX')
  const [dateRange, setDateRange] = useState({
    start: '09/18/2025',
    end: '01/16/2026'
  })

  // Swipe detection for mobile
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)
  const mainContentRef = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
    touchEndY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    const swipeDistanceX = touchStartX.current - touchEndX.current
    const swipeDistanceY = touchStartY.current - touchEndY.current
    
    // Determine if it's more of a horizontal or vertical swipe
    const isHorizontalSwipe = Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)
    
    if (isHorizontalSwipe) {
      // If swipe left more than 80px, show P&L Components
      if (swipeDistanceX > 80) {
        setShowPnLComponents(true)
      }
    } else {
      // For swipe up: only trigger if started from bottom 120px of screen
      // This prevents conflict with normal scrolling
      const screenHeight = window.innerHeight
      const startedFromBottom = touchStartY.current > screenHeight - 120
      
      if (swipeDistanceY > 80 && startedFromBottom) {
        setShowBenchmarkSelector(true)
      }
    }
    
    // Reset
    touchStartX.current = 0
    touchEndX.current = 0
    touchStartY.current = 0
    touchEndY.current = 0
  }

  if (showPnLComponents) {
    return (
      <div className="app">
        <PnLComponents 
          dateRange={dateRange}
          setDateRange={setDateRange}
          onBack={() => setShowPnLComponents(false)} 
        />
      </div>
    )
  }

  return (
    <>
      <div className="app">
        <HeaderBar onMenuClick={() => setShowNavigationDrawer(true)} />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div 
          className="main-content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="sub-navigation">
            <button 
              className={`sub-nav-btn ${activeSubTab === 'Account P&L' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('Account P&L')}
            >
              Account P&L
            </button>
            <button 
              className={`sub-nav-btn ${activeSubTab === 'Symbol P&L' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('Symbol P&L')}
            >
              Symbol P&L
            </button>
          </div>

          <PnLOverview 
            dateRange={dateRange} 
            setDateRange={setDateRange}
            onShowComponents={() => setShowPnLComponents(true)}
            onShowBenchmark={() => setShowBenchmarkSelector(true)}
            selectedBenchmark={selectedBenchmark}
          />
          <TrendAnalysis dateRange={dateRange} />
          <AssetClassChart dateRange={dateRange} />
          <PnLCalendar />
        </div>

        <NavigationDrawer 
          isOpen={showNavigationDrawer}
          onClose={() => setShowNavigationDrawer(false)}
        />
      </div>

      {showBenchmarkSelector && (
        <BenchmarkSelector
          selectedBenchmark={selectedBenchmark}
          onSelect={setSelectedBenchmark}
          onClose={() => setShowBenchmarkSelector(false)}
        />
      )}
    </>
  )
}

export default App
