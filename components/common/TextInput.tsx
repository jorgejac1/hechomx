/**
 * @fileoverview TextInput component for single-line text entry.
 * Features label, error/hint messages, icons, and multiple sizes.
 * Built with accessibility in mind including ARIA attributes and proper labeling.
 * @module components/common/TextInput
 */

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

/**
 * Available input sizes
 * @typedef {'sm' | 'md' | 'lg'} InputSize
 */
type InputSize = 'sm' | 'md' | 'lg';

/**
 * Props for the TextInput component
 * @interface TextInputProps
 * @extends {Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>}
 */
interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input (replaces hint when present) */
  error?: string;
  /** Helper text displayed below the input */
  hint?: string;
  /** Size variant affecting padding and font size */
  size?: InputSize;
  /** Whether the input should take full width of its container */
  fullWidth?: boolean;
  /** Icon element displayed on the left side of the input */
  leftIcon?: ReactNode;
  /** Icon element displayed on the right side of the input */
  rightIcon?: ReactNode;
  /** Whether the field is required (adds visual indicator and ARIA attribute) */
  required?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      fullWidth = true,
      leftIcon,
      rightIcon,
      required,
      className = '',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const iconSizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const iconPaddingStyles = {
      sm: { left: 'pl-9', right: 'pr-9' },
      md: { left: 'pl-11', right: 'pr-11' },
      lg: { left: 'pl-13', right: 'pr-13' },
    };

    // Base input styles with dark mode support and improved keyboard focus
    const baseInputStyles = `
      border rounded-lg transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 dark:focus-visible:ring-offset-gray-900
      disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500
      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
      placeholder:text-gray-400 dark:placeholder:text-gray-500
    `;

    // State-based styles with dark mode
    const stateStyles = error
      ? 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500'
      : 'border-gray-300 dark:border-gray-600 focus-visible:ring-primary-500 focus-visible:border-transparent';

    // Combine input styles
    const inputStyles = `
      ${baseInputStyles}
      ${sizeStyles[size]}
      ${stateStyles}
      ${fullWidth ? 'w-full' : ''}
      ${leftIcon ? iconPaddingStyles[size].left : ''}
      ${rightIcon ? iconPaddingStyles[size].right : ''}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"
          >
            {label}
            {required && <span className="text-red-600 dark:text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none ${iconSizeStyles[size]}`}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputStyles}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {rightIcon && (
            <div
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 ${iconSizeStyles[size]}`}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
