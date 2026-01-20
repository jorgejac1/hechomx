import { TrendingUp, TrendingDown } from 'lucide-react';

export interface MetricCardProps {
  /** Card title */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Percentage change (positive or negative) */
  change?: number;
  /** Label for the change (e.g., "vs last month") */
  changeLabel?: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'purple' | 'blue';
  /** Optional link */
  href?: string;
  /** Additional CSS classes */
  className?: string;
}

const variantStyles = {
  default: 'bg-white border-gray-200',
  success: 'bg-green-50 border-green-200',
  warning: 'bg-amber-50 border-amber-200',
  purple: 'bg-purple-50 border-purple-200',
  blue: 'bg-blue-50 border-blue-200',
};

export default function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  variant = 'default',
  href,
  className = '',
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const hasChange = change !== undefined;

  const content = (
    <div
      className={`rounded-xl border-2 p-6 transition-shadow hover:shadow-md ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {hasChange && (
            <p
              className={`mt-1 text-sm flex items-center gap-1 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
              ) : (
                <TrendingDown className="w-4 h-4" aria-hidden="true" />
              )}
              <span>
                {isPositive ? '+' : ''}
                {change}%
              </span>
              {changeLabel && <span className="text-gray-500">{changeLabel}</span>}
            </p>
          )}
        </div>
        {icon && <div className="p-3 bg-white rounded-lg shadow-xs">{icon}</div>}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
