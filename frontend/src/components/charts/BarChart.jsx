
export function BarChart({ data, width = 400, height = 300, title, horizontal = false }) {
  const padding = 60
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <svg width={width} height={height} className="border rounded">
        {!horizontal ? (
          // Vertical bars
          <>
            {data.map((d, i) => {
              const barWidth = (chartWidth / data.length) * 0.8
              const barHeight = (d.value / maxValue) * chartHeight
              const x = padding + (i * chartWidth) / data.length + (chartWidth / data.length - barWidth) / 2
              const y = padding + chartHeight - barHeight

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={d.color || "#3b82f6"}
                    rx="4"
                    className="hover:opacity-80 cursor-pointer"
                  >
                    <title>{`${d.label}: ${d.value}`}</title>
                  </rect>
                  <text x={x + barWidth / 2} y={height - 10} textAnchor="middle" fontSize="12" fill="#6b7280">
                    {d.label}
                  </text>
                  <text
                    x={x + barWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#374151"
                    fontWeight="bold"
                  >
                    {d.value}
                  </text>
                </g>
              )
            })}
          </>
        ) : (
          // Horizontal bars
          <>
            {data.map((d, i) => {
              const barHeight = (chartHeight / data.length) * 0.8
              const barWidth = (d.value / maxValue) * chartWidth
              const x = padding
              const y = padding + (i * chartHeight) / data.length + (chartHeight / data.length - barHeight) / 2

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={d.color || "#3b82f6"}
                    rx="4"
                    className="hover:opacity-80 cursor-pointer"
                  >
                    <title>{`${d.label}: ${d.value}`}</title>
                  </rect>
                  <text x={padding - 10} y={y + barHeight / 2 + 4} textAnchor="end" fontSize="12" fill="#6b7280">
                    {d.label}
                  </text>
                  <text
                    x={x + barWidth + 5}
                    y={y + barHeight / 2 + 4}
                    textAnchor="start"
                    fontSize="12"
                    fill="#374151"
                    fontWeight="bold"
                  >
                    {d.value}
                  </text>
                </g>
              )
            })}
          </>
        )}
      </svg>
    </div>
  )
}
