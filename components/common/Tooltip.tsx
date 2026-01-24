/**
 * @fileoverview Tooltip component for displaying contextual information on hover or click.
 * Features configurable placement, delay timings, variants, and accessibility support.
 * Supports both hover and click activation modes for desktop and touch devices.
 * @module components/common/Tooltip
 */

'use client';

import { ReactNode, useState, useRef, useCallback, useEffect, useId } from 'react';

/**
 * Available tooltip placement positions
 * @typedef {'top' | 'bottom' | 'left' | 'right'} TooltipPlacement
 */
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Available tooltip color variants
 * @typedef {'dark' | 'light'} TooltipVariant
 */
type TooltipVariant = 'dark' | 'light';

/**
 * Available tooltip sizes
 * @typedef {'sm' | 'md' | 'lg'} TooltipSize
 */
type TooltipSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Tooltip component
 * @interface TooltipProps
 */
interface TooltipProps {
  /** Content displayed inside the tooltip popup */
  content: ReactNode;
  /** The element that triggers the tooltip on interaction */
  children: ReactNode;
  /** Position of the tooltip relative to the trigger element */
  placement?: TooltipPlacement;
  /** Color scheme variant */
  variant?: TooltipVariant;
  /** Size affecting padding and font size */
  size?: TooltipSize;
  /** Delay in milliseconds before showing the tooltip */
  delayShow?: number;
  /** Delay in milliseconds before hiding the tooltip */
  delayHide?: number;
  /** Whether the tooltip is disabled and won't show */
  disabled?: boolean;
  /** Additional CSS classes for the tooltip popup */
  className?: string;
  /** Whether to activate on click instead of hover (for touch devices) */
  clickable?: boolean;
  /** Whether to show an arrow pointing to the trigger */
  arrow?: boolean;
  /** Maximum width of the tooltip content */
  maxWidth?: number | string;
}

// Variant styles
const variantStyles: Record<TooltipVariant, string> = {
  dark: 'bg-gray-900 text-white',
  light:
    'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/50',
};

// Arrow styles by variant and placement
const getArrowStyles = (variant: TooltipVariant, placement: TooltipPlacement): string => {
  const baseArrow = 'absolute w-2 h-2 rotate-45';

  const variantArrow =
    variant === 'dark' ? 'bg-gray-900' : 'bg-white border-gray-200 border-l border-t';

  const placementArrow: Record<TooltipPlacement, string> = {
    top: '-bottom-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0',
    bottom: '-top-1 left-1/2 -translate-x-1/2 border-b-0 border-r-0',
    left: '-right-1 top-1/2 -translate-y-1/2 border-l-0 border-b-0',
    right: '-left-1 top-1/2 -translate-y-1/2 border-r-0 border-t-0',
  };

  return `${baseArrow} ${variantArrow} ${placementArrow[placement]}`;
};

// Size styles
const sizeStyles: Record<TooltipSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

// Placement positioning
const placementStyles: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export default function Tooltip({
  content,
  children,
  placement = 'top',
  variant = 'dark',
  size = 'md',
  delayShow = 200,
  delayHide = 0,
  disabled = false,
  className = '',
  clickable = false,
  arrow = true,
  maxWidth = 250,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  // Clean up timeouts
  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Show tooltip
  const show = useCallback(() => {
    if (disabled) return;
    clearTimeouts();

    if (delayShow > 0) {
      showTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delayShow);
    } else {
      setIsVisible(true);
    }
  }, [disabled, delayShow, clearTimeouts]);

  // Hide tooltip
  const hide = useCallback(() => {
    clearTimeouts();

    if (delayHide > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, delayHide);
    } else {
      setIsVisible(false);
    }
  }, [delayHide, clearTimeouts]);

  // Toggle for click mode
  const toggle = useCallback(() => {
    if (disabled) return;
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }, [disabled, isVisible, show, hide]);

  // Handle click outside for clickable mode
  useEffect(() => {
    if (!clickable || !isVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        hide();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clickable, isVisible, hide]);

  // Handle Escape key
  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hide();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible, hide]);

  // Clean up on unmount
  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  // Event handlers based on mode
  const triggerProps = clickable
    ? {
        onClick: toggle,
      }
    : {
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
      };

  return (
    <div ref={triggerRef} className="relative inline-block" {...triggerProps}>
      {/* Trigger element */}
      <div
        aria-describedby={isVisible ? tooltipId : undefined}
        className="inline-block"
        tabIndex={clickable ? 0 : undefined}
      >
        {children}
      </div>

      {/* Tooltip */}
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`
            absolute z-50 rounded-lg whitespace-normal
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            ${placementStyles[placement]}
            ${className}
          `}
          style={{ maxWidth }}
        >
          {content}
          {arrow && <div className={getArrowStyles(variant, placement)} />}
        </div>
      )}
    </div>
  );
}

export type { TooltipPlacement, TooltipVariant, TooltipSize, TooltipProps };
