import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, ComposedChart, ResponsiveContainer, ReferenceLine } from 'recharts'
import './TrendAnalysis.css'

// Custom Tooltip component for hover state
const CustomTooltip = ({ active, payload, label, coordinate, onHover }) => {
  if (active && payload && payload.length) {
    // Get the actual value from the payload
    const dataPoint = payload.find(p => p.payload)?.payload || payload[0].payload
    const value = dataPoint?.value || payload[0].value || 0
    const isPositive = value >= 0
    const formattedValue = Math.abs(value).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2
    })
    
    // Notify parent of hover - use the label (date) from the payload
    const hoverDate = label || dataPoint?.date
    if (onHover && hoverDate) {
      onHover(hoverDate)
    }
    
    return (
      <div className="custom-tooltip" style={{ left: 0, top: 0 }}>
        <div className="tooltip-label">
          <span className="tooltip-date">{hoverDate}</span>
          <span className={`tooltip-value ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{formattedValue}
          </span>
        </div>
      </div>
    )
  }
  
  // Notify parent when not hovering
  if (onHover) {
    onHover(null)
  }
  
  return null
}

function TrendAnalysis({ dateRange }) {
  const [hoveredDate, setHoveredDate] = useState(null)

  // Sample data matching the graph pattern from the images
  const rawData = [
    { date: '09/18/2025', value: -2000 },
    { date: '09/20/2025', value: -1500 },
    { date: '09/22/2025', value: -800 },
    { date: '09/24/2025', value: -500 },
    { date: '09/25/2025', value: 2000 },
    { date: '10/02/2025', value: 3500 },
    { date: '10/09/2025', value: 5000 },
    { date: '10/16/2025', value: 8000 },
    { date: '10/23/2025', value: 12000 },
    { date: '10/30/2025', value: 18000 },
    { date: '11/03/2025', value: 22000 },
    { date: '11/06/2025', value: 25000 },
    { date: '11/13/2025', value: 38000 },
    { date: '11/20/2025', value: 52000 },
    { date: '11/21/2025', value: 29485.62 },
    { date: '11/27/2025', value: 58000 },
    { date: '12/04/2025', value: 45000 },
    { date: '12/10/2025', value: 35000 },
    { date: '12/18/2025', value: 28000 },
    { date: '12/25/2025', value: 20000 },
    { date: '01/01/2026', value: 15000 },
    { date: '01/08/2026', value: 12000 },
    { date: '01/16/2026', value: 10000 },
  ]

  // Find zero crossing point and add it to data for smooth transition
  let dataWithZero = [...rawData]
  for (let i = 0; i < rawData.length - 1; i++) {
    if (rawData[i].value < 0 && rawData[i + 1].value > 0) {
      // Calculate interpolation ratio for zero crossing
      const ratio = Math.abs(rawData[i].value) / (rawData[i + 1].value - rawData[i].value)
      // Use the date of the negative point (will be positioned between negative and positive)
      const zeroPoint = {
        date: rawData[i].date,
        value: 0
      }
      dataWithZero.splice(i + 1, 0, zeroPoint)
      break
    }
  }

  // Transform data to separate positive and negative values for proper rendering
  const data = dataWithZero.map(item => {
    if (item.value === 0) {
      // Zero point: include in both for smooth connection
      return {
        ...item,
        positiveValue: 0,
        negativeValue: 0,
      }
    }
    return {
      ...item,
      positiveValue: item.value > 0 ? item.value : null,
      negativeValue: item.value < 0 ? item.value : null,
    }
  })

  // Calculate 3 evenly spaced dates to always show (first, middle, last)
  const totalPoints = data.length
  const dateIndices = [
    0, // First date
    Math.floor(totalPoints / 2), // Middle date
    totalPoints - 1 // Last date
  ]
  const alwaysShowDates = dateIndices.map(idx => data[idx]?.date).filter(Boolean)
  
  // Calculate interval to show approximately 3 dates with proper spacing
  // We want to show all data points but only display 3 dates
  const calculatedInterval = Math.max(0, Math.floor(totalPoints / 4))


  return (
    <div className="trend-analysis">
      <div className="trend-header">
        <div className="trend-header-left">
          <h2 className="section-title">
            Trend Analysis
            <span className="refresh-icon">↻</span>
          </h2>
          <div className="date-range-text">
            {dateRange.start} - {dateRange.end}
          </div>
        </div>
        <div className="trend-selector">
          <button className="trend-button">P&L <span className="dropdown-arrow">▼</span></button>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 20, right: 40, left: 40, bottom: 10 }}>
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16c49b" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#16c49b" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E5533D" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#E5533D" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
            <ReferenceLine y={0} stroke="#e0e0e0" strokeWidth={0.5} />
            <Area
              type="monotone"
              dataKey="negativeValue"
              stroke="none"
              fill="url(#redGradient)"
              strokeWidth={0}
              baseValue={0}
              connectNulls={true}
            />
            <Area
              type="monotone"
              dataKey="positiveValue"
              stroke="none"
              fill="url(#greenGradient)"
              strokeWidth={0}
              baseValue={0}
              connectNulls={true}
            />
            <Line 
              type="monotone" 
              dataKey="negativeValue" 
              stroke="#E5533D"
              strokeWidth={2.5}
              dot={false}
              connectNulls={true}
            />
            <Line 
              type="monotone" 
              dataKey="positiveValue" 
              stroke="#16c49b"
              strokeWidth={2.5}
              dot={false}
              connectNulls={true}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="transparent"
              strokeWidth={0}
              dot={false}
              connectNulls={true}
              activeDot={{ r: 6, fill: '#16c49b', stroke: '#fff', strokeWidth: 2 }}
            />
            <XAxis 
              dataKey="date" 
              tick={(props) => {
                const { x, y, payload } = props
                const isHovered = hoveredDate === payload.value
                const shouldShow = alwaysShowDates.includes(payload.value) || isHovered
                
                if (!shouldShow) return null
                
                // Calculate width based on date length
                const dateWidth = payload.value.length * 7
                const rectWidth = Math.max(dateWidth + 12, 70)
                
                // Calculate text position first
                const textY = 16
                const rectHeight = 20
                const rectY = textY - rectHeight / 2 - 2 // Center rectangle around text, slightly adjust
                
                return (
                  <g transform={`translate(${x},${y})`}>
                    {isHovered && (
                      <rect
                        x={-rectWidth / 2}
                        y={rectY}
                        width={rectWidth}
                        height={rectHeight}
                        fill="#16c49b"
                        rx={4}
                      />
                    )}
                    <text
                      x={0}
                      y={0}
                      dy={textY}
                      textAnchor="middle"
                      fill={isHovered ? "#fff" : "#9CA3AF"}
                      fontSize={12}
                      fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
                      fontWeight={isHovered ? 600 : 400}
                    >
                      {payload.value}
                    </text>
                  </g>
                )
              }}
              axisLine={{ stroke: '#e0e0e0', strokeWidth: 0.5 }}
              tickLine={false}
              angle={0}
              textAnchor="middle"
              height={30}
              minTickGap={120}
              interval={0}
            />
            <YAxis 
              orientation="right"
              tick={{ fill: '#9CA3AF', fontSize: 12, fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, system-ui, sans-serif' }}
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
              ticks={[0, 30000, 60000]}
              tickFormatter={(value) => value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            />
            <Tooltip 
              content={<CustomTooltip onHover={setHoveredDate} />}
              cursor={{ stroke: '#16c49b', strokeWidth: 1, strokeDasharray: '5 5' }}
              allowEscapeViewBox={{ x: true, y: true }}
              position={{ y: 0 }}
              offset={0}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="summary-metrics">
        <div className="summary-item">
          <span className="summary-label">Realized P&L <span className="arrow-icon">{'>'}</span></span>
          <span className="summary-value positive">+$396.59</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-item">
          <span className="summary-label">Dividends <span className="arrow-icon">{'>'}</span></span>
          <span className="summary-value">$0.00</span>
        </div>
      </div>
    </div>
  )
}

export default TrendAnalysis
