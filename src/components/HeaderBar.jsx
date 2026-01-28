import React from 'react'
import './HeaderBar.css'

function HeaderBar({ onMenuClick }) {
  return (
    <>
      <div className="header-bar">
        <div className="header-left">
          <button className="back-button">‹</button>
          <h1 className="header-title">
            Individual Cash
            <button className="apy-badge">Try 3.35% APY</button>
          </h1>
        </div>
        <div className="header-right">
          <button className="filter-button" onClick={onMenuClick}>☰</button>
        </div>
      </div>
      <div className="alert-banner-wrapper">
        <div className="alert-banner">
        <span className="alert-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 7H4C3.4 7 3 7.4 3 8V12C3 12.6 3.4 13 4 13H6L9 16V4L6 7Z" fill="#E49137"/>
            <path d="M11 8C11.3 8.3 11.5 8.7 11.5 9.2C11.5 9.7 11.3 10.1 11 10.4" stroke="#E49137" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M13 6C13.6 6.6 14 7.3 14 8.2C14 9.1 13.6 9.8 13 10.4" stroke="#E49137" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M15 4C16.1 5.1 16.5 6.5 16.5 8.2C16.5 9.9 16.1 11.3 15 12.4" stroke="#E49137" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        </span>
        <div className="ticker-container">
          <div className="ticker-content">
            <span className="alert-text">January 19, 2026, in observance of Martin Luther King</span>
            <span className="alert-text">January 19, 2026, in observance of Martin Luther King</span>
          </div>
        </div>
        <button className="alert-close">×</button>
        </div>
      </div>
    </>
  )
}

export default HeaderBar
