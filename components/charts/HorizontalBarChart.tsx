/**
 * @fileoverview Horizontal bar chart component.
 * Renders labeled horizontal bars with optional animation and value display.
 * Supports automatic scaling and custom value formatting.
 * @module components/charts/HorizontalBarChart
 */

export interface BarChartItem {
  /** Label for the bar */
  label: string;
  /** Numeric value */
  value: number;
  /** Optional color override for this bar */
  color?: string;
}

export interface HorizontalBarChartProps {
  /** Data items to display */
  data: BarChartItem[];
  /** Maximum value for scaling (auto-calculated if not provided) */
  maxValue?: number;
  /** Bar color (Tailwind class like 'bg-purple-500') */
  color?: string;
  /** Format function for values */
  formatValue?: (value: number) => string;
  /** Show values on right side */
  showValues?: boolean;
  /** Bar height */
  barHeight?: 'sm' | 'md' | 'lg';
  /** Label width (Tailwind class) */
  labelWidth?: string;
  /** Animate bars on load */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const barHeightClasses = {
  sm: 'h-4',
  md: 'h-6',
  lg: 'h-8',
};

export default function HorizontalBarChart({
  data,
  maxValue,
  color = 'bg-purple-500',
  formatValue = (v) => `$${v.toLocaleString()}`,
  showValues = true,
  barHeight = 'md',
  labelWidth = 'w-20',
  animated = true,
  className = '',
}: HorizontalBarChartProps) {
  const calculatedMax = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div className={`space-y-3 ${className}`} role="img" aria-label="Bar chart">
      {data.map((item, index) => {
        const percentage = (item.value / calculatedMax) * 100;
        const barColor = item.color || color;

        return (
          <div key={index} className="flex items-center gap-3">
            <span
              className={`text-sm text-gray-600 dark:text-gray-400 ${labelWidth} shrink-0 truncate`}
            >
              {item.label}
            </span>
            <div
              className={`flex-1 bg-gray-200 dark:bg-gray-700 rounded-full ${barHeightClasses[barHeight]} overflow-hidden`}
              role="progressbar"
              aria-valuenow={item.value}
              aria-valuemin={0}
              aria-valuemax={calculatedMax}
              aria-label={`${item.label}: ${formatValue(item.value)}`}
            >
              <div
                className={`h-full ${barColor} rounded-full ${animated ? 'transition-all duration-500' : ''}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            {showValues && (
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-20 shrink-0 text-right">
                {formatValue(item.value)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
