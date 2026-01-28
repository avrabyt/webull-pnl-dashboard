import React, { useState } from 'react'
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

  if (showPnLComponents) {
    return (
      <div className="app">
        <PnLComponents 
          dateRange={dateRange} 
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
        <div className="main-content">
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
