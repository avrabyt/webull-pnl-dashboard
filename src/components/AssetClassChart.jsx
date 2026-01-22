import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import './AssetClassChart.css'

function AssetClassChart({ dateRange }) {
  const stockValue = -60.68
  const optionsValue = 457.27

  // Data for the inner ring (Stocks and Options)
  // Order: Stocks first (green, small segment), Options second (gray, large segment)
  const innerRingData = [
    { name: 'Stocks', value: Math.abs(stockValue), color: '#0CAF82' },
    { name: 'Options', value: Math.abs(optionsValue), color: '#E0E0E0' }
  ]

  // Data for the outer ring (thin blue ring - full circle)
  const outerRingData = [{ value: 100 }]

  return (
    <div className="asset-class-chart">
      <div className="asset-header">
        <h2 className="section-title">
          P&L by Asset Class
          <span className="info-icon">i</span>
        </h2>
        <div className="date-range-text">{dateRange.start} - {dateRange.end}</div>
      </div>

      <div className="chart-content">
        <div className="donut-chart-wrapper">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              {/* Outer ring - thin blue ring */}
              <Pie
                data={outerRingData}
                cx="50%"
                cy="50%"
                innerRadius={78}
                outerRadius={85}
                dataKey="value"
                fill="#2196F3"
                startAngle={0}
                endAngle={360}
              />
              
              {/* Inner ring - colored segments (Stocks green, Options gray) */}
              <Pie
                data={innerRingData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={76}
                dataKey="value"
                startAngle={90}
                paddingAngle={0}
              >
                {innerRingData.map((entry, index) => (
                  <Cell key={`inner-cell-${index}-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot stocks"></span>
            <span className="legend-label">Stocks</span>
            <span className={`legend-value ${stockValue < 0 ? 'negative' : 'positive'}`}>
              ${stockValue.toFixed(2)}
            </span>
          </div>
          <div className="legend-item">
            <span className="legend-dot options"></span>
            <span className="legend-label">Options</span>
            <span className={`legend-value ${optionsValue < 0 ? 'negative' : 'positive'}`}>
              ${optionsValue > 0 ? '+' : ''}${optionsValue.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetClassChart
