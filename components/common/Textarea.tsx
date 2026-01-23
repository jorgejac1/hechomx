/**
 * @fileoverview Textarea component for multi-line text entry.
 * Features auto-resize, character count, and comprehensive form field styling.
 * Built with accessibility in mind including ARIA attributes and proper labeling.
 * @module components/common/Textarea
 */

'use client';

import { TextareaHTMLAttributes, forwardRef, useState, useEffect } from 'react';

/**
 * Available textarea sizes
 * @typedef {'sm' | 'md' | 'lg'} TextareaSize
 */
type TextareaSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Textarea component
 * @interface TextareaProps
 * @extends {Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>}
 */
interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message displayed below the textarea (replaces hint when present) */
  error?: string;
  /** Helper text displayed below the textarea */
  hint?: string;
  /** Size variant affecting padding and font size */
  size?: TextareaSize;
  /** Whether the textarea should take full width of its container */
  fullWidth?: boolean;
  /** Whether the field is required (adds visual indicator and ARIA attribute) */
  required?: boolean;
  /** Whether to show character count indicator */
  showCharCount?: boolean;
  /** Maximum number of characters allowed */
  maxLength?: number;
  /** Whether to automatically resize based on content */
  autoResize?: boolean;
  /** Minimum number of visible rows */
  minRows?: number;
  /** Maximum number of visible rows (for auto-resize) */
  maxRows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      fullWidth = true,
      required,
      showCharCount = false,
      maxLength,
      autoResize = false,
      minRows = 3,
      maxRows = 10,
      className = '',
      disabled,
      id,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const [charCount, setCharCount] = useState(0);
    const [internalRef, setInternalRef] = useState<HTMLTextAreaElement | null>(null);

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    // Base textarea styles with dark mode support
    const baseTextareaStyles = `
      border rounded-lg transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500
      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
      placeholder:text-gray-400 dark:placeholder:text-gray-500
      resize-none
    `;

    // State-based styles with dark mode
    const stateStyles = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-transparent';

    // Combine textarea styles
    const textareaStyles = `
      ${baseTextareaStyles}
      ${sizeStyles[size]}
      ${stateStyles}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    // Handle auto-resize
    useEffect(() => {
      if (autoResize && internalRef) {
        const lineHeight = parseInt(getComputedStyle(internalRef).lineHeight) || 24;
        const minHeight = lineHeight * minRows;
        const maxHeight = lineHeight * maxRows;

        internalRef.style.height = 'auto';
        const scrollHeight = internalRef.scrollHeight;
        internalRef.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
      }
    }, [value, autoResize, minRows, maxRows, internalRef]);

    // Update character count
    useEffect(() => {
      const currentValue = value || defaultValue || '';
      setCharCount(String(currentValue).length);
    }, [value, defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const setRefs = (element: HTMLTextAreaElement | null) => {
      setInternalRef(element);
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"
          >
            {label}
            {required && <span className="text-red-600 dark:text-red-400 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={setRefs}
          id={textareaId}
          disabled={disabled}
          className={textareaStyles}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          rows={minRows}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...props}
        />

        <div className="flex justify-between items-center mt-1.5">
          <div>
            {error && (
              <p
                id={`${textareaId}-error`}
                className="text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                {error}
              </p>
            )}

            {hint && !error && (
              <p id={`${textareaId}-hint`} className="text-sm text-gray-500 dark:text-gray-400">
                {hint}
              </p>
            )}
          </div>

          {showCharCount && (
            <p
              className={`text-xs ${maxLength && charCount >= maxLength ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}
              aria-live="polite"
              aria-atomic="true"
            >
              {charCount}
              {maxLength && ` / ${maxLength}`} caracteres
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
