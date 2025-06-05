
export function ScatterPlot({
  data,
  width = 400,
  height = 300,
  title,
  xLabel = "X Axis",
  yLabel = "Y Axis",
}) {
  const padding = 60
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const xMax = Math.max(...data.map((d) => d.x))
  const xMin = Math.min(...data.map((d) => d.x))
  const yMax = Math.max(...data.map((d) => d.y))
  const yMin = Math.min(...data.map((d) => d.y))

  const xRange = xMax - xMin || 1
  const yRange = yMax - yMin || 1

  const points = data.map((d) => ({
    ...d,
    plotX: padding + ((d.x - xMin) / xRange) * chartWidth,
    plotY: padding + chartHeight - ((d.y - yMin) / yRange) * chartHeight,
  }))

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <svg width={width} height={height} className="border rounded">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <g key={ratio}>
            <line
              x1={padding}
              y1={padding + chartHeight * ratio}
              x2={width - padding}
              y2={padding + chartHeight * ratio}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <line
              x1={padding + chartWidth * ratio}
              y1={padding}
              x2={padding + chartWidth * ratio}
              y2={height - padding}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          </g>
        ))}

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

        {/* Axis labels */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="14" fill="#374151">
          {xLabel}
        </text>
        <text
          x={20}
          y={height / 2}
          textAnchor="middle"
          fontSize="14"
          fill="#374151"
          transform={`rotate(-90 20 ${height / 2})`}
        >
          {yLabel}
        </text>

        {/* Scale labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <g key={ratio}>
            <text
              x={padding - 10}
              y={padding + chartHeight * (1 - ratio) + 4}
              textAnchor="end"
              fontSize="12"
              fill="#6b7280"
            >
              {Math.round(yMin + yRange * ratio)}
            </text>
            <text
              x={padding + chartWidth * ratio}
              y={height - padding + 15}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {Math.round(xMin + xRange * ratio)}
            </text>
          </g>
        ))}

        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.plotX}
            cy={point.plotY}
            r="6"
            fill={point.color || "#3b82f6"}
            stroke="white"
            strokeWidth="2"
            className="hover:r-8 cursor-pointer"
          >
            <title>{`${point.label}: (${point.x}, ${point.y})`}</title>
          </circle>
        ))}
      </svg>
    </div>
  )
}
