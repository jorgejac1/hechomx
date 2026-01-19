'use client';

export interface ToggleSwitchProps {
  /** Whether the toggle is enabled */
  enabled: boolean;
  /** Callback when toggled */
  onChange: (enabled: boolean) => void;
  /** Label text */
  label: string;
  /** Optional description */
  description?: string;
  /** Disable the toggle */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
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
      className={`flex items-center justify-between py-4 border-b border-gray-100 last:border-0 ${className}`}
    >
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!enabled)}
        className={`relative ${sizes.track} rounded-full transition-colors ${
          enabled ? 'bg-purple-600' : 'bg-gray-300'
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
