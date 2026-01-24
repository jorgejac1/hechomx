/**
 * @fileoverview Progress statistic component with animated bar.
 * Displays a labeled progress bar with current/max values and optional percentage.
 * Supports multiple color themes and size variants.
 * @module components/charts/ProgressStat
 */

export interface ProgressStatProps {
  /** Stat label */
  label: string;
  /** Current value */
  value: number;
  /** Maximum/target value */
  maxValue: number;
  /** Format function for displaying values */
  formatValue?: (value: number) => string;
  /** Show percentage */
  showPercentage?: boolean;
  /** Bar color */
  color?: 'purple' | 'blue' | 'green' | 'amber' | 'red' | 'pink';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

const colorClasses = {
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  pink: 'bg-pink-500',
  gray: 'bg-gray-500',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export default function ProgressStat({
  label,
  value,
  maxValue,
  formatValue = (v) => v.toLocaleString(),
  showPercentage = true,
  color = 'purple',
  size = 'md',
  className = '',
}: ProgressStatProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">
          {formatValue(value)}
          {showPercentage && <span className="text-gray-400 ml-1">({percentage.toFixed(0)}%)</span>}
        </span>
      </div>
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={maxValue}
        />
      </div>
    </div>
  );
}

// Multi-progress variant for showing multiple segments
export interface MultiProgressSegment {
  value: number;
  color: 'purple' | 'blue' | 'green' | 'amber' | 'red' | 'pink' | 'gray';
  label?: string;
}

export interface MultiProgressStatProps {
  /** Stat label */
  label: string;
  /** Segments */
  segments: MultiProgressSegment[];
  /** Total/max value */
  total: number;
  /** Show legend */
  showLegend?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export function MultiProgressStat({
  label,
  segments,
  total,
  showLegend = true,
  size = 'md',
  className = '',
}: MultiProgressStatProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{total.toLocaleString()} total</span>
      </div>
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden flex`}>
        {segments.map((segment, index) => {
          const percentage = (segment.value / total) * 100;
          return (
            <div
              key={index}
              className={`${colorClasses[segment.color]} ${sizeClasses[size]} first:rounded-l-full last:rounded-r-full`}
              style={{ width: `${percentage}%` }}
            />
          );
        })}
      </div>
      {showLegend && (
        <div className="flex flex-wrap gap-3 mt-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${colorClasses[segment.color]}`} />
              <span className="text-xs text-gray-600">
                {segment.label || `Segment ${index + 1}`}: {segment.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
