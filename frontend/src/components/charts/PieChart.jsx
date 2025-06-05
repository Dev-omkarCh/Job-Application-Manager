
export function PieChart({ data, width = 300, height = 300, title }) {
  const radius = Math.min(width, height) / 2 - 40
  const centerX = width / 2
  const centerY = height / 2

  const total = data.reduce((sum, d) => sum + d.value, 0)
  let currentAngle = -Math.PI / 2

  const slices = data.map((d) => {
    const sliceAngle = (d.value / total) * 2 * Math.PI
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle
    currentAngle = endAngle

    const x1 = centerX + radius * Math.cos(startAngle)
    const y1 = centerY + radius * Math.sin(startAngle)
    const x2 = centerX + radius * Math.cos(endAngle)
    const y2 = centerY + radius * Math.sin(endAngle)

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ")

    const labelAngle = startAngle + sliceAngle / 2
    const labelRadius = radius * 0.7
    const labelX = centerX + labelRadius * Math.cos(labelAngle)
    const labelY = centerY + labelRadius * Math.sin(labelAngle)

    return {
      ...d,
      pathData,
      labelX,
      labelY,
      percentage: ((d.value / total) * 100).toFixed(1),
    }
  })

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="flex items-center gap-6">
        <svg width={width} height={height}>
          {slices.map((slice, i) => (
            <g key={i}>
              <path
                d={slice.pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 cursor-pointer"
              >
                <title>{`${slice.label}: ${slice.value} (${slice.percentage}%)`}</title>
              </path>
              <text x={slice.labelX} y={slice.labelY} textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">
                {slice.percentage}%
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="space-y-2">
          {slices.map((slice, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: slice.color }} />
              <span className="text-sm">{slice.label}</span>
              <span className="text-sm text-gray-500">({slice.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
