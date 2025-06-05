export function LineChart({ data, width = 400, height = 200, color = "#3b82f6", title }) {
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const valueRange = maxValue - minValue || 1

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth
    const y = padding + chartHeight - ((d.value - minValue) / valueRange) * chartHeight
    return { x, y, value: d.value, label: d.label }
  })

  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")

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
            <text x={padding - 10} y={padding + chartHeight * ratio + 4} textAnchor="end" fontSize="12" fill="#6b7280">
              {Math.round(maxValue - (maxValue - minValue) * ratio)}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {points.map((point, i) => (
          <text key={i} x={point.x} y={height - 10} textAnchor="middle" fontSize="12" fill="#6b7280">
            {point.label}
          </text>
        ))}

        {/* Line */}
        <path d={pathData} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Area under curve */}
        <path
          d={`${pathData} L ${points[points.length - 1].x} ${padding + chartHeight} L ${points[0].x} ${padding + chartHeight} Z`}
          fill={color}
          fillOpacity="0.1"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <g key={i}>
            <circle cx={point.x} cy={point.y} r="4" fill={color} stroke="white" strokeWidth="2" />
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="transparent"
              className="hover:fill-black hover:fill-opacity-10 cursor-pointer"
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}
