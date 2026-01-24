/**
 * @fileoverview Select dropdown component with option groups support.
 * Features label, error/hint messages, icons, and multiple sizes.
 * Supports both flat options and grouped options for better organization.
 * @module components/common/Select
 */

import { SelectHTMLAttributes, ReactNode, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Available select sizes
 * @typedef {'sm' | 'md' | 'lg'} SelectSize
 */
type SelectSize = 'sm' | 'md' | 'lg';

/**
 * Single select option configuration
 * @interface SelectOption
 */
interface SelectOption {
  /** The value submitted when this option is selected */
  value: string;
  /** The display text shown to the user */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

/**
 * Grouped options configuration for organizing related options
 * @interface SelectOptionGroup
 */
interface SelectOptionGroup {
  /** The group label displayed above the options */
  label: string;
  /** The options within this group */
  options: SelectOption[];
}

/**
 * Props for the Select component
 * @interface SelectProps
 * @extends {Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>}
 */
interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text displayed above the select */
  label?: string;
  /** Error message displayed below the select (replaces hint when present) */
  error?: string;
  /** Helper text displayed below the select */
  hint?: string;
  /** Size variant affecting padding and font size */
  size?: SelectSize;
  /** Whether the select should take full width of its container */
  fullWidth?: boolean;
  /** Array of options or option groups to render */
  options?: (SelectOption | SelectOptionGroup)[];
  /** Placeholder text shown when no option is selected */
  placeholder?: string;
  /** Icon element displayed on the left side of the select */
  leftIcon?: ReactNode;
  /** Whether the field is required (adds visual indicator and ARIA attribute) */
  required?: boolean;
}

function isOptionGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return 'options' in option;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      fullWidth = true,
      options = [],
      placeholder,
      leftIcon,
      required,
      className = '',
      disabled,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm pr-8',
      md: 'px-4 py-3 text-base pr-10',
      lg: 'px-5 py-4 text-lg pr-12',
    };

    const iconSizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const iconPaddingStyles = {
      sm: 'pl-9',
      md: 'pl-11',
      lg: 'pl-13',
    };

    const chevronPositionStyles = {
      sm: 'right-2',
      md: 'right-3',
      lg: 'right-4',
    };

    // Base select styles with dark mode support and improved keyboard focus
    const baseSelectStyles = `
      border rounded-lg transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 dark:focus-visible:ring-offset-gray-900
      disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500
      appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer
    `;

    // State-based styles with dark mode
    const stateStyles = error
      ? 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500'
      : 'border-gray-300 dark:border-gray-600 focus-visible:ring-primary-500 focus-visible:border-transparent';

    // Combine select styles
    const selectStyles = `
      ${baseSelectStyles}
      ${sizeStyles[size]}
      ${stateStyles}
      ${fullWidth ? 'w-full' : ''}
      ${leftIcon ? iconPaddingStyles[size] : ''}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    const renderOptions = () => {
      return options.map((option, index) => {
        if (isOptionGroup(option)) {
          return (
            <optgroup key={`group-${index}`} label={option.label}>
              {option.options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </optgroup>
          );
        }
        return (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        );
      });
    };

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={selectId}
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

          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={selectStyles}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children || renderOptions()}
          </select>

          <ChevronDown
            className={`absolute ${chevronPositionStyles[size]} top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none ${iconSizeStyles[size]}`}
          />
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
