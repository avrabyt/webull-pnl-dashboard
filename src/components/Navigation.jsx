import React from 'react'
import './Navigation.css'

function Navigation({ activeTab, setActiveTab }) {
  const tabs = ['Assets', 'P&L', 'Orders (0)', 'Transfers', 'History', 'Deposits']

  return (
    <nav className="main-navigation">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}

export default Navigation
