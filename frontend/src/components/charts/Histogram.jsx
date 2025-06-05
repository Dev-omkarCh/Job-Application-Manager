
export function Histogram({ data, bins = 10, width = 400, height = 300, title, color = "#3b82f6" }) {
  const padding = 60
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const min = Math.min(...data)
  const max = Math.max(...data)
  const binWidth = (max - min) / bins

  const histogram = Array(bins)
    .fill(0)
    .map((_, i) => {
      const binStart = min + i * binWidth
      const binEnd = min + (i + 1) * binWidth
      const count = data.filter((d) => d >= binStart && (i === bins - 1 ? d <= binEnd : d < binEnd)).length
      return {
        start: binStart,
        end: binEnd,
        count,
        label: `${binStart.toFixed(0)}-${binEnd.toFixed(0)}`,
      }
    })

  const maxCount = Math.max(...histogram.map((h) => h.count))

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
            {Math.round(maxCount * (1 - ratio))}
          </text>
        ))}

        {/* Bars */}
        {histogram.map((bin, i) => {
          const barWidth = chartWidth / bins
          const barHeight = (bin.count / maxCount) * chartHeight
          const x = padding + i * barWidth
          const y = padding + chartHeight - barHeight

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth - 1}
                height={barHeight}
                fill={color}
                className="hover:opacity-80 cursor-pointer"
              >
                <title>{`${bin.label}: ${bin.count} items`}</title>
              </rect>
              <text x={x + barWidth / 2} y={height - 10} textAnchor="middle" fontSize="10" fill="#6b7280">
                {bin.start.toFixed(0)}
              </text>
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
