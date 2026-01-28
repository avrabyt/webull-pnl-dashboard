import React, { useState, useRef } from 'react'
import './NavigationDrawer.css'

function NavigationDrawer({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    // If swipe left more than 100px, close the drawer
    if (touchStartX.current - touchEndX.current > 100) {
      handleClose()
    }
  }

  const menuItems = [
    { icon: '📊', label: 'Account Overview', section: 'ACCOUNTS' },
    { icon: '💰', label: 'Individual Cash', section: 'ACCOUNTS', active: true },
    { icon: '📈', label: 'Stocks', section: 'TRADING' },
    { icon: '📉', label: 'Options', section: 'TRADING' },
    { icon: '🌐', label: 'Crypto', section: 'TRADING' },
    { icon: '💸', label: 'Transfers', section: 'BANKING' },
    { icon: '📋', label: 'Statements', section: 'BANKING' },
    { icon: '⚙️', label: 'Settings', section: 'OTHER' },
    { icon: '❓', label: 'Help & Support', section: 'OTHER' }
  ]

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = []
    }
    acc[item.section].push(item)
    return acc
  }, {})

  if (!isOpen) return null

  return (
    <div className="drawer-overlay" onClick={handleClose}>
      <div 
        className={`drawer-menu ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="drawer-header">
          <div className="drawer-user-info">
            <div className="user-avatar">AB</div>
            <div className="user-details">
              <div className="user-name">Account User</div>
              <div className="user-email">user@example.com</div>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="drawer-content">
          {Object.entries(groupedItems).map(([section, items]) => (
            <div key={section} className="menu-section">
              <div className="section-label">{section}</div>
              {items.map((item, index) => (
                <div 
                  key={index} 
                  className={`menu-item ${item.active ? 'active' : ''}`}
                  onClick={handleClose}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  {item.active && <span className="active-indicator"></span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="drawer-footer">
          <div className="app-version">Version 1.0.0</div>
        </div>
      </div>
    </div>
  )
}

export default NavigationDrawer
