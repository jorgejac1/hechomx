/**
 * @fileoverview Progress components for displaying completion status.
 * Includes linear Progress bar, CircularProgress, and MultiProgress for segments.
 * Features animation, striped patterns, and multiple sizes and color variants.
 * @module components/common/Progress
 */

'use client';

import { ReactNode } from 'react';

/**
 * Available progress bar sizes
 * @typedef {'xs' | 'sm' | 'md' | 'lg'} ProgressSize
 */
type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Available progress bar color variants
 * @typedef {'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'} ProgressVariant
 */
type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * Props for the Progress component
 * @interface ProgressProps
 */
interface ProgressProps {
  /** Current progress value */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Height size of the progress bar */
  size?: ProgressSize;
  /** Color variant for the filled portion */
  variant?: ProgressVariant;
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Custom label content (overrides default percentage) */
  label?: ReactNode;
  /** Position of the label relative to the progress bar */
  labelPosition?: 'top' | 'right' | 'inside';
  /** Whether to animate width changes */
  animated?: boolean;
  /** Whether to show diagonal striped pattern */
  striped?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for the track (background) */
  trackClassName?: string;
  /** Additional CSS classes for the filled bar */
  barClassName?: string;
}

// Size configurations
const sizeStyles: Record<ProgressSize, { track: string; text: string }> = {
  xs: { track: 'h-1', text: 'text-xs' },
  sm: { track: 'h-1.5', text: 'text-xs' },
  md: { track: 'h-2', text: 'text-sm' },
  lg: { track: 'h-3', text: 'text-sm' },
};

// Variant colors
const variantStyles: Record<ProgressVariant, string> = {
  primary: 'bg-primary-600',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-gray-500',
};

export default function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  labelPosition = 'right',
  animated = false,
  striped = false,
  className = '',
  trackClassName = '',
  barClassName = '',
}: ProgressProps) {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const sizeConfig = sizeStyles[size];
  const variantColor = variantStyles[variant];

  // Striped pattern style
  const stripedStyle = striped
    ? {
        backgroundImage: `linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.15) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.15) 50%,
          rgba(255, 255, 255, 0.15) 75%,
          transparent 75%,
          transparent
        )`,
        backgroundSize: '1rem 1rem',
      }
    : {};

  const labelContent = label ?? `${Math.round(percentage)}%`;

  // Render label based on position
  const renderLabel = () => {
    if (!showLabel && !label) return null;

    if (labelPosition === 'inside' && size !== 'xs' && size !== 'sm') {
      return null; // Inside label is rendered separately
    }

    return <span className={`font-medium text-gray-700 ${sizeConfig.text}`}>{labelContent}</span>;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Top label */}
      {labelPosition === 'top' && (showLabel || label) && (
        <div className="flex justify-between mb-1">{renderLabel()}</div>
      )}

      <div className={`flex items-center gap-2 ${labelPosition === 'right' ? '' : ''}`}>
        {/* Progress track */}
        <div
          className={`
            flex-1 bg-gray-200 rounded-full overflow-hidden
            ${sizeConfig.track}
            ${trackClassName}
          `}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`Progress: ${Math.round(percentage)}%`}
        >
          {/* Progress bar */}
          <div
            className={`
              h-full rounded-full
              ${variantColor}
              ${animated ? 'transition-all duration-500 ease-out' : ''}
              ${striped && animated ? 'animate-progress-stripes' : ''}
              ${barClassName}
            `}
            style={{
              width: `${percentage}%`,
              ...stripedStyle,
            }}
          >
            {/* Inside label */}
            {labelPosition === 'inside' &&
              (showLabel || label) &&
              size !== 'xs' &&
              size !== 'sm' && (
                <span className="flex items-center justify-center h-full text-white text-xs font-medium px-1">
                  {labelContent}
                </span>
              )}
          </div>
        </div>

        {/* Right label */}
        {labelPosition === 'right' && (showLabel || label) && renderLabel()}
      </div>
    </div>
  );
}

// Circular Progress component
interface CircularProgressProps {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Size of the circular progress */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Color variant */
  variant?: ProgressVariant;
  /** Show percentage label in center */
  showLabel?: boolean;
  /** Custom label content */
  label?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 48,
  strokeWidth = 4,
  variant = 'primary',
  showLabel = false,
  label,
  className = '',
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Variant colors for stroke
  const strokeColors: Record<ProgressVariant, string> = {
    primary: 'stroke-primary-600',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    danger: 'stroke-red-500',
    info: 'stroke-blue-500',
    neutral: 'stroke-gray-500',
  };

  const labelContent = label ?? `${Math.round(percentage)}%`;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${Math.round(percentage)}%`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-gray-200"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={`${strokeColors[variant]} transition-all duration-500 ease-out`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Center label */}
      {(showLabel || label) && (
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
          {labelContent}
        </span>
      )}
    </div>
  );
}

// Multi-segment progress bar
interface ProgressSegment {
  value: number;
  variant?: ProgressVariant;
  label?: string;
}

interface MultiProgressProps {
  /** Progress segments */
  segments: ProgressSegment[];
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function MultiProgress({ segments, size = 'md', className = '' }: MultiProgressProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const sizeConfig = sizeStyles[size];

  return (
    <div
      className={`
        flex w-full bg-gray-200 rounded-full overflow-hidden
        ${sizeConfig.track}
        ${className}
      `}
      role="progressbar"
      aria-label="Multi-segment progress"
    >
      {segments.map((segment, index) => {
        const percentage = total > 0 ? (segment.value / total) * 100 : 0;
        const variantColor = variantStyles[segment.variant || 'primary'];

        return (
          <div
            key={index}
            className={`h-full ${variantColor} ${index === 0 ? '' : ''}`}
            style={{ width: `${percentage}%` }}
            title={segment.label || `${Math.round(percentage)}%`}
          />
        );
      })}
    </div>
  );
}

export type {
  ProgressSize,
  ProgressVariant,
  ProgressProps,
  CircularProgressProps,
  ProgressSegment,
  MultiProgressProps,
};
