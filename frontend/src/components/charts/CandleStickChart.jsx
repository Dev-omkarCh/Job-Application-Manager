
export function CandlestickChart({ data, width = 600, height = 400, title }) {
  const padding = 60
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2 - 60 // Extra space for volume

  const allValues = data.flatMap((d) => [d.open, d.high, d.low, d.close])
  const minPrice = Math.min(...allValues)
  const maxPrice = Math.max(...allValues)
  const priceRange = maxPrice - minPrice || 1

  const maxVolume = Math.max(...data.map((d) => d.volume || 0))
  const volumeHeight = 60

  const candleWidth = Math.max(2, (chartWidth / data.length) * 0.8)
  const candleSpacing = chartWidth / data.length

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <svg width={width} height={height} className="border rounded bg-gray-900">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={padding}
            y1={padding + chartHeight * ratio}
            x2={width - padding}
            y2={padding + chartHeight * ratio}
            stroke="#374151"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        ))}

        {/* Price axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <text
            key={ratio}
            x={padding - 10}
            y={padding + chartHeight * ratio + 4}
            textAnchor="end"
            fontSize="12"
            fill="#9ca3af"
          >
            ${Math.round(maxPrice - priceRange * ratio).toLocaleString()}
          </text>
        ))}

        {/* Candlesticks */}
        {data.map((candle, i) => {
          const x = padding + i * candleSpacing + candleSpacing / 2
          const openY = padding + chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight
          const closeY = padding + chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight
          const highY = padding + chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight
          const lowY = padding + chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight

          const isGreen = candle.close > candle.open
          const bodyTop = Math.min(openY, closeY)
          const bodyHeight = Math.abs(closeY - openY)

          return (
            <g key={i}>
              {/* High-Low line */}
              <line x1={x} y1={highY} x2={x} y2={lowY} stroke={isGreen ? "#10b981" : "#ef4444"} strokeWidth="1" />

              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(1, bodyHeight)}
                fill={isGreen ? "#10b981" : "#ef4444"}
                stroke={isGreen ? "#10b981" : "#ef4444"}
                className="hover:opacity-80 cursor-pointer"
              >
                <title>
                  {`${candle.date}
Open: $${candle.open}
High: $${candle.high}
Low: $${candle.low}
Close: $${candle.close}
${candle.volume ? `Volume: ${candle.volume}` : ""}`}
                </title>
              </rect>

              {/* Volume bar */}
              {candle.volume && (
                <rect
                  x={x - candleWidth / 2}
                  y={height - padding - volumeHeight}
                  width={candleWidth}
                  height={(candle.volume / maxVolume) * volumeHeight}
                  fill="#6b7280"
                  fillOpacity="0.5"
                />
              )}

              {/* Date labels (every few candles) */}
              {i % Math.ceil(data.length / 6) === 0 && (
                <text x={x} y={height - 10} textAnchor="middle" fontSize="10" fill="#9ca3af">
                  {candle.date}
                </text>
              )}
            </g>
          )
        })}

        {/* Volume axis */}
        <text x={width - 10} y={height - padding - volumeHeight / 2} textAnchor="end" fontSize="10" fill="#9ca3af">
          Vol: {maxVolume.toLocaleString()}
        </text>

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#6b7280"
          strokeWidth="1"
        />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#6b7280" strokeWidth="1" />
      </svg>
    </div>
  )
}
