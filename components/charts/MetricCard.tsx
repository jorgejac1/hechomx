/**
 * @fileoverview Metric card component for KPI display.
 * Shows a single metric with optional trend indicator, icon, and change percentage.
 * Supports multiple color variants for different metric types.
 * @module components/charts/MetricCard
 */

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
  default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
  warning: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800',
  purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
  blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
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
      className={`rounded-xl border-2 p-6 transition-shadow hover:shadow-md dark:hover:shadow-gray-900/50 ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
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
              {changeLabel && (
                <span className="text-gray-500 dark:text-gray-400">{changeLabel}</span>
              )}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-xs dark:shadow-gray-900/30">
            {icon}
          </div>
        )}
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
