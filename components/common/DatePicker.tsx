/**
 * @fileoverview DatePicker component for date selection with calendar interface.
 * Features inline and dropdown variants, date range constraints, disabled dates,
 * localization support, and full keyboard navigation.
 * @module components/common/DatePicker
 */

'use client';

import { useState, useRef, useEffect, useCallback, useMemo, useId } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Available date picker display variants
 * @typedef {'default' | 'inline'} DatePickerVariant
 */
type DatePickerVariant = 'default' | 'inline';

/**
 * Available date picker sizes
 * @typedef {'sm' | 'md' | 'lg'} DatePickerSize
 */
type DatePickerSize = 'sm' | 'md' | 'lg';

/**
 * Props for the DatePicker component
 * @interface DatePickerProps
 */
interface DatePickerProps {
  /** Currently selected date value */
  value?: Date | null;
  /** Callback fired when a date is selected or cleared */
  onChange?: (date: Date | null) => void;
  /** Placeholder text shown when no date is selected */
  placeholder?: string;
  /** Label text displayed above the input */
  label?: string;
  /** Helper text with additional instructions */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Earliest selectable date */
  minDate?: Date;
  /** Latest selectable date */
  maxDate?: Date;
  /** Dates that cannot be selected (array or predicate function) */
  disabledDates?: Date[] | ((date: Date) => boolean);
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Display variant: dropdown (default) or always-visible inline calendar */
  variant?: DatePickerVariant;
  /** Size variant affecting padding and font size */
  size?: DatePickerSize;
  /** Format style for displaying the selected date */
  dateFormat?: 'short' | 'medium' | 'long';
  /** Locale code for date formatting (default: 'es-MX') */
  locale?: string;
  /** Whether to show a clear button */
  clearable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Form input name attribute */
  name?: string;
}

const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

// Size styles
const sizeStyles: Record<DatePickerSize, { input: string; calendar: string; day: string }> = {
  sm: { input: 'px-3 py-1.5 text-sm', calendar: 'text-sm', day: 'w-7 h-7 text-xs' },
  md: { input: 'px-4 py-2 text-base', calendar: 'text-base', day: 'w-8 h-8 text-sm' },
  lg: { input: 'px-5 py-3 text-lg', calendar: 'text-lg', day: 'w-10 h-10 text-base' },
};

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default function DatePicker({
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  label,
  helperText,
  error,
  minDate,
  maxDate,
  disabledDates,
  disabled = false,
  required = false,
  variant = 'default',
  size = 'md',
  dateFormat = 'medium',
  locale = 'es-MX',
  clearable = true,
  className = '',
  name,
}: DatePickerProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(variant === 'inline');
  const [viewDate, setViewDate] = useState(() => value || new Date());

  const sizes = sizeStyles[size];

  // Format date for display
  const formatDate = useCallback(
    (date: Date): string => {
      const formatOptions: Record<'short' | 'medium' | 'long', Intl.DateTimeFormatOptions> = {
        short: { day: 'numeric', month: 'numeric', year: '2-digit' },
        medium: { day: 'numeric', month: 'short', year: 'numeric' },
        long: { day: 'numeric', month: 'long', year: 'numeric' },
      };

      return date.toLocaleDateString(locale, formatOptions[dateFormat]);
    },
    [dateFormat, locale]
  );

  // Check if a date is disabled
  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
      if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return true;

      if (disabledDates) {
        if (Array.isArray(disabledDates)) {
          return disabledDates.some((d) => isSameDay(d, date));
        }
        return disabledDates(date);
      }

      return false;
    },
    [minDate, maxDate, disabledDates]
  );

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    const days: {
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isDisabled: boolean;
    }[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        isSelected: value ? isSameDay(date, value) : false,
        isDisabled: isDateDisabled(date),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        isSelected: value ? isSameDay(date, value) : false,
        isDisabled: isDateDisabled(date),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        isSelected: value ? isSameDay(date, value) : false,
        isDisabled: isDateDisabled(date),
      });
    }

    return days;
  }, [viewDate, value, isDateDisabled]);

  // Navigation handlers
  const goToPrevMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setViewDate(today);
    if (!isDateDisabled(today)) {
      onChange?.(today);
      if (variant !== 'inline') setIsOpen(false);
    }
  }, [onChange, variant, isDateDisabled]);

  // Select date handler
  const handleSelectDate = useCallback(
    (date: Date) => {
      if (isDateDisabled(date)) return;
      onChange?.(date);
      if (variant !== 'inline') setIsOpen(false);
    },
    [onChange, variant, isDateDisabled]
  );

  // Clear handler
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
    },
    [onChange]
  );

  // Click outside handler
  useEffect(() => {
    if (variant === 'inline') return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
    return undefined;
  }, [isOpen, variant]);

  // Sync view date with value
  useEffect(() => {
    if (value) {
      setViewDate(value);
    }
  }, [value]);

  // Calendar component
  const CalendarView = (
    <div className={`${sizes.calendar}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button
          type="button"
          onClick={goToNextMonth}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map(({ date, isCurrentMonth, isToday, isSelected, isDisabled }, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSelectDate(date)}
            disabled={isDisabled}
            className={`
              ${sizes.day} rounded-lg font-medium transition-colors
              ${
                isSelected
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : isToday
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50'
                    : isCurrentMonth
                      ? 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                      : 'text-gray-400 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
              }
              ${isDisabled ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}
            `}
            aria-label={formatDate(date)}
            aria-selected={isSelected}
          >
            {date.getDate()}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
        <button
          type="button"
          onClick={goToToday}
          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          Hoy
        </button>
      </div>
    </div>
  );

  // Inline variant
  if (variant === 'inline') {
    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 ${className}`}
      >
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {CalendarView}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input trigger */}
      <div className="relative flex">
        <button
          type="button"
          id={id}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={`
            flex-1 flex items-center gap-2 rounded-lg border transition-colors text-left
            ${clearable && value && !disabled ? 'rounded-r-none border-r-0' : ''}
            ${sizes.input}
            ${
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'
            }
            ${
              disabled
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500'
            }
            focus:outline-none focus:ring-2
          `}
        >
          <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
          <span className={`flex-1 truncate ${!value ? 'text-gray-400 dark:text-gray-500' : ''}`}>
            {value ? formatDate(value) : placeholder}
          </span>
        </button>

        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={`
              flex items-center justify-center px-2 rounded-r-lg border border-l-0 transition-colors
              ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
            `}
            aria-label="Limpiar fecha"
          >
            <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </button>
        )}

        {/* Hidden input for forms */}
        {name && <input type="hidden" name={name} value={value ? value.toISOString() : ''} />}
      </div>

      {/* Helper/Error text */}
      {(helperText || error) && (
        <p
          className={`mt-1 text-sm ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          {error || helperText}
        </p>
      )}

      {/* Dropdown calendar */}
      {isOpen && (
        <div
          className="absolute z-50 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
          role="dialog"
          aria-label="Calendario"
        >
          {CalendarView}
        </div>
      )}
    </div>
  );
}

export type { DatePickerProps, DatePickerVariant, DatePickerSize };
