export interface DonutSegment {
  /** Segment label */
  label: string;
  /** Segment value */
  value: number;
  /** Segment color (Tailwind color like 'purple-500') */
  color: string;
}

export interface DonutChartProps {
  /** Segments data */
  segments: DonutSegment[];
  /** Size of the chart */
  size?: 'sm' | 'md' | 'lg';
  /** Show center value */
  centerValue?: string | number;
  /** Center label */
  centerLabel?: string;
  /** Show legend */
  showLegend?: boolean;
  /** Legend position */
  legendPosition?: 'bottom' | 'right';
  /** Additional CSS classes */
  className?: string;
}

const sizeClasses = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
};

const colorMap: Record<string, string> = {
  'purple-500': '#a855f7',
  'purple-600': '#9333ea',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'green-500': '#22c55e',
  'green-600': '#16a34a',
  'amber-500': '#f59e0b',
  'amber-600': '#d97706',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'pink-500': '#ec4899',
  'indigo-500': '#6366f1',
  'teal-500': '#14b8a6',
  'gray-400': '#9ca3af',
};

export default function DonutChart({
  segments,
  size = 'md',
  centerValue,
  centerLabel,
  showLegend = true,
  legendPosition = 'bottom',
  className = '',
}: DonutChartProps) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);

  // Calculate conic gradient
  let currentAngle = 0;
  const gradientStops = segments
    .map((segment) => {
      const percentage = (segment.value / total) * 100;
      const color = colorMap[segment.color] || segment.color;
      const start = currentAngle;
      currentAngle += percentage;
      return `${color} ${start}% ${currentAngle}%`;
    })
    .join(', ');

  const containerClass =
    legendPosition === 'right'
      ? 'flex flex-row items-center gap-6'
      : 'flex flex-col items-center gap-4';

  return (
    <div className={`${containerClass} ${className}`}>
      {/* Donut */}
      <div
        className={`${sizeClasses[size]} rounded-full relative`}
        style={{
          background: `conic-gradient(${gradientStops})`,
        }}
        role="img"
        aria-label="Donut chart"
      >
        {/* Inner circle (creates donut hole) */}
        <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
          {centerValue !== undefined && (
            <span className="text-2xl font-bold text-gray-900">{centerValue}</span>
          )}
          {centerLabel && <span className="text-xs text-gray-500">{centerLabel}</span>}
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div
          className={`flex flex-wrap gap-3 ${
            legendPosition === 'bottom' ? 'justify-center' : 'flex-col'
          }`}
        >
          {segments.map((segment, index) => {
            const color = colorMap[segment.color] || segment.color;
            const percentage = ((segment.value / total) * 100).toFixed(1);

            return (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-600">
                  {segment.label} <span className="text-gray-400">({percentage}%)</span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
