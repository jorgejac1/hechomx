/**
 * @fileoverview ToggleSwitch component for binary on/off settings.
 * Displays a switch control with label and optional description text.
 * Supports multiple sizes and accessible switch role.
 * @module components/common/ToggleSwitch
 */

'use client';

/**
 * Props for the ToggleSwitch component
 * @interface ToggleSwitchProps
 */
export interface ToggleSwitchProps {
  /** Current enabled/disabled state of the toggle */
  enabled: boolean;
  /** Callback fired when the toggle state changes */
  onChange: (enabled: boolean) => void;
  /** Primary label text displayed next to the toggle */
  label: string;
  /** Optional secondary description text below the label */
  description?: string;
  /** Whether the toggle is disabled and non-interactive */
  disabled?: boolean;
  /** Size variant affecting switch dimensions */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes for the container */
  className?: string;
}

const sizeClasses = {
  sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
  md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' },
  lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
};

export default function ToggleSwitch({
  enabled,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className = '',
}: ToggleSwitchProps) {
  const sizes = sizeClasses[size];

  return (
    <div
      className={`flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0 ${className}`}
    >
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!enabled)}
        className={`relative ${sizes.track} rounded-full transition-colors ${
          enabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        disabled={disabled}
      >
        <span
          className={`absolute top-0.5 left-0.5 ${sizes.thumb} bg-white rounded-full shadow transition-transform ${
            enabled ? sizes.translate : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
