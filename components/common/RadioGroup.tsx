/**
 * @fileoverview RadioGroup component for managing multiple radio buttons.
 * Supports three variants: default (standard radios), cards (rich selection cards),
 * and buttons (toggle button style). Features horizontal/vertical layouts and icons.
 * @module components/common/RadioGroup
 */

'use client';

import { ReactNode, createContext, useContext, useId } from 'react';

/**
 * Available radio group sizes
 * @typedef {'sm' | 'md' | 'lg'} RadioGroupSize
 */
type RadioGroupSize = 'sm' | 'md' | 'lg';

/**
 * Available radio group visual variants
 * @typedef {'default' | 'cards' | 'buttons'} RadioGroupVariant
 */
type RadioGroupVariant = 'default' | 'cards' | 'buttons';

/**
 * Layout orientation for the radio group
 * @typedef {'horizontal' | 'vertical'} RadioGroupOrientation
 */
type RadioGroupOrientation = 'horizontal' | 'vertical';

/**
 * Configuration for a single radio option
 * @interface RadioGroupOption
 */
interface RadioGroupOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  size: RadioGroupSize;
  variant: RadioGroupVariant;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup.Option must be used within RadioGroup');
  }
  return context;
}

interface RadioGroupProps {
  /** Name attribute for all radio inputs */
  name?: string;
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Array of options to render */
  options?: RadioGroupOption[];
  /** Label for the group */
  label?: string;
  /** Error message */
  error?: string;
  /** Hint text */
  hint?: string;
  /** Size variant */
  size?: RadioGroupSize;
  /** Visual variant */
  variant?: RadioGroupVariant;
  /** Layout orientation */
  orientation?: RadioGroupOrientation;
  /** Disable all options */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Children for custom rendering */
  children?: ReactNode;
}

export default function RadioGroup({
  name,
  value,
  onChange,
  options,
  label,
  error,
  hint,
  size = 'md',
  variant = 'default',
  orientation = 'vertical',
  disabled = false,
  className = '',
  children,
}: RadioGroupProps) {
  const generatedId = useId();
  const groupName = name || generatedId;

  const contextValue: RadioGroupContextValue = {
    name: groupName,
    value,
    onChange,
    size,
    variant,
    disabled,
  };

  // Size styles for labels
  const labelSizeStyles: Record<RadioGroupSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Orientation styles
  const orientationStyles: Record<RadioGroupOrientation, string> = {
    horizontal: 'flex flex-wrap gap-4',
    vertical: 'flex flex-col gap-2',
  };

  // Render options if provided
  const renderOptions = () => {
    if (children) return children;
    if (!options) return null;

    return options.map((option) => (
      <RadioGroupOption
        key={option.value}
        value={option.value}
        disabled={option.disabled}
        icon={option.icon}
        description={option.description}
      >
        {option.label}
      </RadioGroupOption>
    ));
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        className={className}
        role="radiogroup"
        aria-labelledby={label ? `${groupName}-label` : undefined}
      >
        {/* Label */}
        {label && (
          <p
            id={`${groupName}-label`}
            className={`font-semibold text-gray-900 mb-3 ${labelSizeStyles[size]}`}
          >
            {label}
          </p>
        )}

        {/* Options */}
        <div className={orientationStyles[orientation]}>{renderOptions()}</div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 mt-2" role="alert">
            {error}
          </p>
        )}

        {/* Hint text */}
        {!error && hint && <p className="text-sm text-gray-500 mt-2">{hint}</p>}
      </div>
    </RadioGroupContext.Provider>
  );
}

// RadioGroup.Option component
interface RadioGroupOptionProps {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}

function RadioGroupOption({
  value,
  disabled: optionDisabled,
  icon,
  description,
  children,
  className = '',
}: RadioGroupOptionProps) {
  const {
    name,
    value: selectedValue,
    onChange,
    size,
    variant,
    disabled: groupDisabled,
  } = useRadioGroup();
  const isSelected = selectedValue === value;
  const isDisabled = groupDisabled || optionDisabled;
  const id = useId();

  // Size styles
  const sizeStyles: Record<RadioGroupSize, { radio: string; text: string; description: string }> = {
    sm: { radio: 'w-4 h-4', text: 'text-sm', description: 'text-xs' },
    md: { radio: 'w-5 h-5', text: 'text-base', description: 'text-sm' },
    lg: { radio: 'w-6 h-6', text: 'text-lg', description: 'text-base' },
  };

  const handleChange = () => {
    if (!isDisabled) {
      onChange(value);
    }
  };

  // Default variant
  if (variant === 'default') {
    return (
      <label
        className={`
          flex items-start gap-3
          ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${className}
        `}
      >
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isSelected}
          onChange={handleChange}
          disabled={isDisabled}
          className={`
            ${sizeStyles[size].radio}
            text-primary-600
            border-gray-300
            focus:ring-primary-500
            focus:ring-2
            focus:ring-offset-0
            mt-0.5
          `}
        />
        <div>
          <span className={`${sizeStyles[size].text} text-gray-700`}>{children}</span>
          {description && (
            <div className={`${sizeStyles[size].description} text-gray-500 mt-0.5`}>
              {description}
            </div>
          )}
        </div>
      </label>
    );
  }

  // Cards variant
  if (variant === 'cards') {
    return (
      <label
        className={`
          relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all
          ${isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}
          ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${className}
        `}
      >
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isSelected}
          onChange={handleChange}
          disabled={isDisabled}
          className="sr-only"
        />
        {icon && (
          <div
            className={`
              shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
              ${isSelected ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}
            `}
          >
            {icon}
          </div>
        )}
        <div className="flex-1">
          <span
            className={`
              ${sizeStyles[size].text} font-medium block
              ${isSelected ? 'text-primary-900' : 'text-gray-900'}
            `}
          >
            {children}
          </span>
          {description && (
            <div className={`${sizeStyles[size].description} text-gray-500 mt-1`}>
              {description}
            </div>
          )}
        </div>
        {/* Selected indicator */}
        <div
          className={`
            shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
            ${isSelected ? 'border-primary-600 bg-primary-600' : 'border-gray-300'}
          `}
        >
          {isSelected && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
            </svg>
          )}
        </div>
      </label>
    );
  }

  // Buttons variant
  if (variant === 'buttons') {
    return (
      <label
        className={`
          inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 transition-all
          ${
            isSelected
              ? 'border-primary-600 bg-primary-600 text-white'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
          }
          ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${className}
        `}
      >
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isSelected}
          onChange={handleChange}
          disabled={isDisabled}
          className="sr-only"
        />
        {icon && <span className="mr-2">{icon}</span>}
        <span className={`${sizeStyles[size].text} font-medium`}>{children}</span>
      </label>
    );
  }

  return null;
}

// Attach Option to RadioGroup
RadioGroup.Option = RadioGroupOption;

// Export types
export type {
  RadioGroupSize,
  RadioGroupVariant,
  RadioGroupOrientation,
  RadioGroupOption,
  RadioGroupProps,
  RadioGroupOptionProps,
};
