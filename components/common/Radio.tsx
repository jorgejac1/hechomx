/**
 * @fileoverview Radio button component for single-option selection within a group.
 * Features customizable sizes, label positioning, error states, and hint text.
 * Supports form accessibility with proper ARIA attributes.
 * @module components/common/Radio
 */

import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';

/**
 * Available radio button sizes
 * @typedef {'sm' | 'md' | 'lg'} RadioSize
 */
type RadioSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Radio component
 * @interface RadioProps
 */
interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text or JSX content */
  label?: ReactNode;
  /** Error message to display */
  error?: string;
  /** Hint text shown below the radio */
  hint?: string;
  /** Size variant */
  size?: RadioSize;
  /** Position of the radio relative to label */
  labelPosition?: 'left' | 'right';
  /** Additional CSS classes for the container */
  className?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      labelPosition = 'right',
      className = '',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const radioId = id || generatedId;

    // Size styles for the radio
    const sizeStyles: Record<RadioSize, string> = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    // Label text size
    const labelSizeStyles: Record<RadioSize, string> = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    // Radio base styles with dark mode support and improved keyboard focus
    const radioStyles = `
      ${sizeStyles[size]}
      text-primary-600
      border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-800
      focus:outline-none
      focus-visible:ring-primary-500
      focus-visible:ring-2
      focus-visible:ring-offset-0
      dark:focus-visible:ring-offset-gray-900
      disabled:opacity-50
      disabled:cursor-not-allowed
      cursor-pointer
    `
      .trim()
      .replace(/\s+/g, ' ');

    // Label styles with dark mode
    const labelStyles = `
      ${labelSizeStyles[size]}
      ${disabled ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 cursor-pointer'}
      select-none
    `
      .trim()
      .replace(/\s+/g, ' ');

    // Error styles with dark mode
    const errorStyles = 'text-sm text-red-600 dark:text-red-400 mt-1';

    // Hint styles with dark mode
    const hintStyles = 'text-sm text-gray-500 dark:text-gray-400 mt-1';

    const radioElement = (
      <input
        ref={ref}
        type="radio"
        id={radioId}
        disabled={disabled}
        className={radioStyles}
        aria-invalid={!!error}
        aria-describedby={error ? `${radioId}-error` : hint ? `${radioId}-hint` : undefined}
        {...props}
      />
    );

    const labelElement = label && (
      <label htmlFor={radioId} className={labelStyles}>
        {label}
      </label>
    );

    return (
      <div className={className}>
        <div className="flex items-start gap-2">
          {labelPosition === 'left' && labelElement}
          <div className="mt-0.5">{radioElement}</div>
          {labelPosition === 'right' && labelElement}
        </div>

        {/* Error message */}
        {error && (
          <p id={`${radioId}-error`} className={errorStyles} role="alert">
            {error}
          </p>
        )}

        {/* Hint text (only shown if no error) */}
        {!error && hint && (
          <p id={`${radioId}-hint`} className={hintStyles}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;

// Export types for external use
export type { RadioSize, RadioProps };
