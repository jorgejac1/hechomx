/**
 * @fileoverview Checkbox component for binary selections.
 * Features customizable label position, error/hint messages, and multiple sizes.
 * Built with accessibility in mind including ARIA attributes and proper labeling.
 * @module components/common/Checkbox
 */

import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';

/**
 * Available checkbox sizes
 * @typedef {'sm' | 'md' | 'lg'} CheckboxSize
 */
type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Checkbox component
 * @interface CheckboxProps
 * @extends {Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>}
 */
interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text or custom JSX content */
  label?: ReactNode;
  /** Error message displayed below the checkbox */
  error?: string;
  /** Helper text displayed below the checkbox */
  hint?: string;
  /** Size variant affecting the checkbox dimensions */
  size?: CheckboxSize;
  /** Position of the checkbox relative to its label */
  labelPosition?: 'left' | 'right';
  /** Additional CSS classes for the container */
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
    const checkboxId = id || generatedId;

    // Size styles for the checkbox
    const sizeStyles: Record<CheckboxSize, string> = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    // Label text size
    const labelSizeStyles: Record<CheckboxSize, string> = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    // Checkbox base styles with dark mode support
    const checkboxStyles = `
      ${sizeStyles[size]}
      text-primary-600
      border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-800
      rounded-sm
      focus:ring-primary-500
      focus:ring-2
      focus:ring-offset-0
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

    const checkboxElement = (
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        disabled={disabled}
        className={checkboxStyles}
        aria-invalid={!!error}
        aria-describedby={error ? `${checkboxId}-error` : hint ? `${checkboxId}-hint` : undefined}
        {...props}
      />
    );

    const labelElement = label && (
      <label htmlFor={checkboxId} className={labelStyles}>
        {label}
      </label>
    );

    return (
      <div className={className}>
        <div className="flex items-start gap-2">
          {labelPosition === 'left' && labelElement}
          <div className="mt-0.5">{checkboxElement}</div>
          {labelPosition === 'right' && labelElement}
        </div>

        {/* Error message */}
        {error && (
          <p id={`${checkboxId}-error`} className={errorStyles} role="alert">
            {error}
          </p>
        )}

        {/* Hint text (only shown if no error) */}
        {!error && hint && (
          <p id={`${checkboxId}-hint`} className={hintStyles}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

// Export types for external use
export type { CheckboxSize, CheckboxProps };
