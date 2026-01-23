/**
 * @fileoverview RangeSlider component for selecting numeric values or ranges.
 * Features single and dual-handle modes, tooltips, marks, keyboard navigation,
 * and customizable appearance with multiple sizes and colors.
 * @module components/common/RangeSlider
 */

'use client';

import { useState, useRef, useCallback, useEffect, useMemo, useId } from 'react';

/**
 * Available slider sizes
 * @typedef {'sm' | 'md' | 'lg'} RangeSliderSize
 */
type RangeSliderSize = 'sm' | 'md' | 'lg';

/**
 * Props for the RangeSlider component
 * @interface RangeSliderProps
 */
interface RangeSliderProps {
  /** Minimum selectable value */
  min: number;
  /** Maximum selectable value */
  max: number;
  /** Value increment step */
  step?: number;
  /** Current value (single number) or range (tuple of two numbers) */
  value?: number | [number, number];
  /** Default value for uncontrolled mode */
  defaultValue?: number | [number, number];
  /** Callback fired when value changes during dragging */
  onChange?: (value: number | [number, number]) => void;
  /** Callback fired when dragging ends (final value) */
  onChangeEnd?: (value: number | [number, number]) => void;
  /** Whether to show two handles for selecting a range */
  range?: boolean;
  /** Label text displayed above the slider */
  label?: string;
  /** Whether to show min/max value labels below the track */
  showMinMax?: boolean;
  /** Whether to show value tooltip above handles */
  showTooltip?: boolean;
  /** Whether tooltip is always visible (vs only on hover/drag) */
  alwaysShowTooltip?: boolean;
  /** Custom function to format displayed values */
  formatValue?: (value: number) => string;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Size variant affecting track and handle dimensions */
  size?: RangeSliderSize;
  /** Color theme for the filled track and handles */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Whether to show tick marks (true for auto, array for specific values) */
  marks?: boolean | number[] | { value: number; label?: string }[];
  /** Additional CSS classes */
  className?: string;
  /** Form input name for hidden input elements */
  name?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

// Size styles
const sizeStyles: Record<RangeSliderSize, { track: string; thumb: string; tooltip: string }> = {
  sm: { track: 'h-1', thumb: 'w-3 h-3', tooltip: 'text-xs px-1.5 py-0.5' },
  md: { track: 'h-2', thumb: 'w-4 h-4', tooltip: 'text-sm px-2 py-1' },
  lg: { track: 'h-3', thumb: 'w-5 h-5', tooltip: 'text-base px-2.5 py-1.5' },
};

// Color styles
const colorStyles: Record<string, { track: string; thumb: string }> = {
  primary: { track: 'bg-primary-500', thumb: 'bg-primary-600 border-primary-600' },
  secondary: { track: 'bg-secondary-500', thumb: 'bg-secondary-600 border-secondary-600' },
  success: { track: 'bg-green-500', thumb: 'bg-green-600 border-green-600' },
  warning: { track: 'bg-yellow-500', thumb: 'bg-yellow-600 border-yellow-600' },
  error: { track: 'bg-red-500', thumb: 'bg-red-600 border-red-600' },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, step: number, min: number): number {
  const steps = Math.round((value - min) / step);
  return min + steps * step;
}

export default function RangeSlider({
  min,
  max,
  step = 1,
  value: controlledValue,
  defaultValue,
  onChange,
  onChangeEnd,
  range = false,
  label,
  showMinMax = true,
  showTooltip = true,
  alwaysShowTooltip = false,
  formatValue = (v) => v.toString(),
  disabled = false,
  size = 'md',
  color = 'primary',
  marks = false,
  className = '',
  name,
  ariaLabel,
}: RangeSliderProps) {
  const id = useId();
  const trackRef = useRef<HTMLDivElement>(null);

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<number | [number, number]>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return range ? [min, max] : min;
  });

  // Determine if controlled
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Get individual values
  const [lowValue, highValue] = useMemo(() => {
    if (range && Array.isArray(currentValue)) {
      return currentValue;
    }
    return [currentValue as number, currentValue as number];
  }, [range, currentValue]);

  // Track which handle is being dragged
  const [dragging, setDragging] = useState<'low' | 'high' | null>(null);
  const [hovering, setHovering] = useState<'low' | 'high' | null>(null);

  const sizes = sizeStyles[size];
  const colors = colorStyles[color];

  // Calculate position percentage
  const getPercent = useCallback(
    (value: number) => {
      return ((value - min) / (max - min)) * 100;
    },
    [min, max]
  );

  // Calculate value from position
  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;

      const rect = trackRef.current.getBoundingClientRect();
      const percent = clamp((clientX - rect.left) / rect.width, 0, 1);
      const rawValue = min + percent * (max - min);
      return snapToStep(rawValue, step, min);
    },
    [min, max, step]
  );

  // Update value
  const updateValue = useCallback(
    (newValue: number, handle: 'low' | 'high') => {
      let updated: number | [number, number];

      if (range) {
        if (handle === 'low') {
          updated = [Math.min(newValue, highValue), highValue];
        } else {
          updated = [lowValue, Math.max(newValue, lowValue)];
        }
      } else {
        updated = newValue;
      }

      if (!isControlled) {
        setInternalValue(updated);
      }
      onChange?.(updated);
    },
    [range, lowValue, highValue, isControlled, onChange]
  );

  // Handle mouse/touch events
  const handleStart = useCallback(
    (handle: 'low' | 'high') => (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(handle);
    },
    [disabled]
  );

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const newValue = getValueFromPosition(clientX);
      updateValue(newValue, dragging);
    },
    [dragging, getValueFromPosition, updateValue]
  );

  const handleEnd = useCallback(() => {
    if (dragging) {
      onChangeEnd?.(currentValue);
      setDragging(null);
    }
  }, [dragging, currentValue, onChangeEnd]);

  // Track click handler
  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      const newValue = getValueFromPosition(e.clientX);

      if (range) {
        // Determine which handle is closer
        const distToLow = Math.abs(newValue - lowValue);
        const distToHigh = Math.abs(newValue - highValue);
        updateValue(newValue, distToLow <= distToHigh ? 'low' : 'high');
      } else {
        updateValue(newValue, 'low');
      }

      onChangeEnd?.(range ? [lowValue, highValue] : newValue);
    },
    [disabled, getValueFromPosition, range, lowValue, highValue, updateValue, onChangeEnd]
  );

  // Keyboard handler
  const handleKeyDown = useCallback(
    (handle: 'low' | 'high') => (e: React.KeyboardEvent) => {
      if (disabled) return;

      const currentHandleValue = handle === 'low' ? lowValue : highValue;
      let newValue = currentHandleValue;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newValue = clamp(currentHandleValue + step, min, max);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          newValue = clamp(currentHandleValue - step, min, max);
          break;
        case 'Home':
          e.preventDefault();
          newValue = min;
          break;
        case 'End':
          e.preventDefault();
          newValue = max;
          break;
        case 'PageUp':
          e.preventDefault();
          newValue = clamp(currentHandleValue + step * 10, min, max);
          break;
        case 'PageDown':
          e.preventDefault();
          newValue = clamp(currentHandleValue - step * 10, min, max);
          break;
        default:
          return;
      }

      updateValue(newValue, handle);
      onChangeEnd?.(
        range
          ? [handle === 'low' ? newValue : lowValue, handle === 'high' ? newValue : highValue]
          : newValue
      );
    },
    [disabled, lowValue, highValue, step, min, max, updateValue, onChangeEnd, range]
  );

  // Mouse/touch event listeners
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);

      return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      };
    }
  }, [dragging, handleMove, handleEnd]);

  // Generate marks
  const markElements = useMemo(() => {
    if (!marks) return null;

    let markValues: { value: number; label?: string }[] = [];

    if (marks === true) {
      // Generate marks at step intervals
      for (let i = min; i <= max; i += step) {
        markValues.push({ value: i });
      }
    } else if (Array.isArray(marks)) {
      if (typeof marks[0] === 'number') {
        markValues = (marks as number[]).map((v) => ({ value: v }));
      } else {
        markValues = marks as { value: number; label?: string }[];
      }
    }

    return markValues.map((mark, index) => {
      const percent = getPercent(mark.value);
      const isInRange = range
        ? mark.value >= lowValue && mark.value <= highValue
        : mark.value <= lowValue;

      return (
        <div
          key={index}
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${percent}%` }}
        >
          <div
            className={`w-1 h-1 rounded-full -translate-x-1/2 ${
              isInRange ? colors.track : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
          {mark.label && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {mark.label}
            </div>
          )}
        </div>
      );
    });
  }, [marks, min, max, step, getPercent, range, lowValue, highValue, colors.track]);

  // Render handle with tooltip
  const renderHandle = (handle: 'low' | 'high', value: number) => {
    const percent = getPercent(value);
    const isActive = dragging === handle || hovering === handle;
    const showTip = showTooltip && (alwaysShowTooltip || isActive);

    return (
      <div
        key={handle}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={formatValue(value)}
        aria-label={ariaLabel || label || `${handle === 'low' ? 'Mínimo' : 'Máximo'}`}
        aria-disabled={disabled}
        className={`
          absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 bg-white
          transition-shadow cursor-grab
          ${sizes.thumb}
          ${colors.thumb}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'}
          ${dragging === handle ? 'cursor-grabbing shadow-lg scale-110' : ''}
        `}
        style={{
          left: `${percent}%`,
          zIndex: dragging === handle ? 10 : handle === 'high' ? 2 : 1,
        }}
        onMouseDown={handleStart(handle)}
        onTouchStart={handleStart(handle)}
        onMouseEnter={() => setHovering(handle)}
        onMouseLeave={() => setHovering(null)}
        onKeyDown={handleKeyDown(handle)}
      >
        {/* Tooltip */}
        {showTip && (
          <div
            className={`
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-md bg-gray-900 dark:bg-gray-700 text-white
              whitespace-nowrap pointer-events-none
              ${sizes.tooltip}
            `}
          >
            {formatValue(value)}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}

      {/* Slider container */}
      <div className="relative pt-2 pb-1">
        {/* Track */}
        <div
          ref={trackRef}
          className={`
            relative w-full rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer
            ${sizes.track}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={handleTrackClick}
        >
          {/* Filled track */}
          <div
            className={`absolute h-full rounded-full transition-all ${colors.track}`}
            style={{
              left: range ? `${getPercent(lowValue)}%` : '0%',
              width: range
                ? `${getPercent(highValue) - getPercent(lowValue)}%`
                : `${getPercent(lowValue)}%`,
            }}
          />

          {/* Marks */}
          {markElements}

          {/* Handles */}
          {range && renderHandle('low', lowValue)}
          {renderHandle(range ? 'high' : 'low', range ? highValue : lowValue)}
        </div>
      </div>

      {/* Min/Max labels */}
      {showMinMax && (
        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}

      {/* Hidden inputs for forms */}
      {name && (
        <>
          {range ? (
            <>
              <input type="hidden" name={`${name}_min`} value={lowValue} />
              <input type="hidden" name={`${name}_max`} value={highValue} />
            </>
          ) : (
            <input type="hidden" name={name} value={lowValue} />
          )}
        </>
      )}
    </div>
  );
}

export type { RangeSliderProps, RangeSliderSize };
