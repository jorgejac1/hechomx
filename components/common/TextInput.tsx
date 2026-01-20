import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

type InputSize = 'sm' | 'md' | 'lg';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: InputSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
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

    // Base input styles
    const baseInputStyles = `
      border rounded-lg transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
    `;

    // State-based styles
    const stateStyles = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-primary-500 focus:border-transparent';

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
          <label htmlFor={inputId} className="block text-sm font-semibold text-gray-900 mb-2">
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
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 ${iconSizeStyles[size]}`}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
