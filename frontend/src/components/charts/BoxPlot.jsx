
export function BoxPlot({ data, width = 400, height = 300, title }) {
  const padding = 60
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const allValues = data.flatMap((d) => d.values)
  const globalMin = Math.min(...allValues)
  const globalMax = Math.max(...allValues)
  const range = globalMax - globalMin || 1

  const boxData = data.map((d) => {
    const sorted = [...d.values].sort((a, b) => a - b)
    const q1 = sorted[Math.floor(sorted.length * 0.25)]
    const median = sorted[Math.floor(sorted.length * 0.5)]
    const q3 = sorted[Math.floor(sorted.length * 0.75)]
    const min = sorted[0]
    const max = sorted[sorted.length - 1]

    return {
      label: d.label,
      min,
      q1,
      median,
      q3,
      max,
      outliers: [], // Simplified - no outlier detection
    }
  })

  const boxWidth = (chartWidth / data.length) * 0.6

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <svg width={width} height={height} className="border rounded">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={padding}
            y1={padding + chartHeight * ratio}
            x2={width - padding}
            y2={padding + chartHeight * ratio}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <text
            key={ratio}
            x={padding - 10}
            y={padding + chartHeight * ratio + 4}
            textAnchor="end"
            fontSize="12"
            fill="#6b7280"
          >
            {Math.round(globalMax - range * ratio)}
          </text>
        ))}

        {/* Box plots */}
        {boxData.map((box, i) => {
          const centerX = padding + (i + 0.5) * (chartWidth / data.length)
          const getY = (value) => padding + chartHeight - ((value - globalMin) / range) * chartHeight

          const minY = getY(box.min)
          const q1Y = getY(box.q1)
          const medianY = getY(box.median)
          const q3Y = getY(box.q3)
          const maxY = getY(box.max)

          return (
            <g key={i}>
              {/* Whiskers */}
              <line x1={centerX} y1={minY} x2={centerX} y2={maxY} stroke="#374151" strokeWidth="1" />
              <line x1={centerX - 10} y1={minY} x2={centerX + 10} y2={minY} stroke="#374151" strokeWidth="2" />
              <line x1={centerX - 10} y1={maxY} x2={centerX + 10} y2={maxY} stroke="#374151" strokeWidth="2" />

              {/* Box */}
              <rect
                x={centerX - boxWidth / 2}
                y={q3Y}
                width={boxWidth}
                height={q1Y - q3Y}
                fill="#3b82f6"
                fillOpacity="0.3"
                stroke="#3b82f6"
                strokeWidth="2"
              />

              {/* Median line */}
              <line
                x1={centerX - boxWidth / 2}
                y1={medianY}
                x2={centerX + boxWidth / 2}
                y2={medianY}
                stroke="#374151"
                strokeWidth="3"
              />

              {/* Label */}
              <text x={centerX} y={height - 10} textAnchor="middle" fontSize="12" fill="#6b7280">
                {box.label}
              </text>

              {/* Tooltip */}
              <rect
                x={centerX - boxWidth / 2}
                y={maxY}
                width={boxWidth}
                height={minY - maxY}
                fill="transparent"
                className="cursor-pointer"
              >
                <title>{`${box.label}: Min: ${box.min}, Q1: ${box.q1}, Median: ${box.median}, Q3: ${box.q3}, Max: ${box.max}`}</title>
              </rect>
            </g>
          )
        })}

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#374151"
          strokeWidth="2"
        />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#374151" strokeWidth="2" />
      </svg>
    </div>
  )
}
