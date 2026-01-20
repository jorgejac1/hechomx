import { SelectHTMLAttributes, ReactNode, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

type SelectSize = 'sm' | 'md' | 'lg';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: SelectSize;
  fullWidth?: boolean;
  options?: (SelectOption | SelectOptionGroup)[];
  placeholder?: string;
  leftIcon?: ReactNode;
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

    // Base select styles
    const baseSelectStyles = `
      border rounded-lg transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
      appearance-none bg-white cursor-pointer
    `;

    // State-based styles
    const stateStyles = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-primary-500 focus:border-transparent';

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
          <label htmlFor={selectId} className="block text-sm font-semibold text-gray-900 mb-2">
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${iconSizeStyles[size]}`}
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
            className={`absolute ${chevronPositionStyles[size]} top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${iconSizeStyles[size]}`}
          />
        </div>

        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1.5 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
