/**
 * @fileoverview Popover component for displaying floating content panels.
 * Supports click and hover triggers, multiple placements, controlled/uncontrolled modes,
 * headers/footers, arrows, and configurable close behaviors.
 * @module components/common/Popover
 */

'use client';

import { ReactNode, useState, useRef, useCallback, useEffect, useId } from 'react';

/**
 * Available popover placement positions
 * @typedef {'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'} PopoverPlacement
 */
type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

/**
 * Trigger method for opening the popover
 * @typedef {'click' | 'hover'} PopoverTrigger
 */
type PopoverTrigger = 'click' | 'hover';

/**
 * Props for the Popover component
 * @interface PopoverProps
 */
interface PopoverProps {
  /** The content to show in the popover */
  content: ReactNode;
  /** The element that triggers the popover */
  children: ReactNode;
  /** Placement of the popover relative to the trigger */
  placement?: PopoverPlacement;
  /** How the popover is triggered */
  trigger?: PopoverTrigger;
  /** Delay before showing popover on hover (in ms) */
  delayShow?: number;
  /** Delay before hiding popover on hover (in ms) */
  delayHide?: number;
  /** Whether the popover is open (controlled mode) */
  isOpen?: boolean;
  /** Callback when popover should open/close (controlled mode) */
  onOpenChange?: (open: boolean) => void;
  /** Whether the popover is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the popover content */
  className?: string;
  /** Whether to show the arrow */
  showArrow?: boolean;
  /** Whether clicking outside closes the popover */
  closeOnClickOutside?: boolean;
  /** Whether pressing Escape closes the popover */
  closeOnEscape?: boolean;
  /** Header content */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Width of the popover */
  width?: number | string;
}

// Placement positioning styles
const placementStyles: Record<PopoverPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
};

// Arrow position styles by placement
const arrowStyles: Record<PopoverPlacement, string> = {
  top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 border-b border-r',
  bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-t border-l',
  left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45 border-t border-r',
  right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l',
  'top-start': 'bottom-0 left-4 translate-y-1/2 rotate-45 border-b border-r',
  'top-end': 'bottom-0 right-4 translate-y-1/2 rotate-45 border-b border-r',
  'bottom-start': 'top-0 left-4 -translate-y-1/2 rotate-45 border-t border-l',
  'bottom-end': 'top-0 right-4 -translate-y-1/2 rotate-45 border-t border-l',
};

export default function Popover({
  content,
  children,
  placement = 'bottom',
  trigger = 'click',
  delayShow = 200,
  delayHide = 100,
  isOpen: controlledIsOpen,
  onOpenChange,
  disabled = false,
  className = '',
  showArrow = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  header,
  footer,
  width = 280,
}: PopoverProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  // Determine if controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Set open state (respects controlled/uncontrolled mode)
  const setIsOpen = useCallback(
    (open: boolean) => {
      if (isControlled) {
        onOpenChange?.(open);
      } else {
        setInternalIsOpen(open);
      }
    },
    [isControlled, onOpenChange]
  );

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

  // Show popover
  const show = useCallback(() => {
    if (disabled) return;
    clearTimeouts();

    if (trigger === 'hover' && delayShow > 0) {
      showTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, delayShow);
    } else {
      setIsOpen(true);
    }
  }, [disabled, trigger, delayShow, clearTimeouts, setIsOpen]);

  // Hide popover
  const hide = useCallback(() => {
    clearTimeouts();

    if (trigger === 'hover' && delayHide > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, delayHide);
    } else {
      setIsOpen(false);
    }
  }, [trigger, delayHide, clearTimeouts, setIsOpen]);

  // Toggle popover
  const toggle = useCallback(() => {
    if (disabled) return;
    if (isOpen) {
      hide();
    } else {
      show();
    }
  }, [disabled, isOpen, show, hide]);

  // Handle click outside
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        hide();
      }
    };

    // Use mousedown for better UX (closes before any other click handlers)
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickOutside, isOpen, hide]);

  // Handle Escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hide();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, hide]);

  // Clean up on unmount
  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  // Event handlers based on trigger type
  const triggerProps =
    trigger === 'click'
      ? { onClick: toggle }
      : {
          onMouseEnter: show,
          onMouseLeave: hide,
        };

  const popoverHoverProps =
    trigger === 'hover'
      ? {
          onMouseEnter: () => clearTimeouts(),
          onMouseLeave: hide,
        }
      : {};

  return (
    <div ref={containerRef} className="relative inline-block" {...triggerProps}>
      {/* Trigger element */}
      <div
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? popoverId : undefined}
        className="inline-block"
      >
        {children}
      </div>

      {/* Popover */}
      {isOpen && (
        <div
          id={popoverId}
          role="dialog"
          aria-modal="false"
          className={`
            absolute z-50
            bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700
            ${placementStyles[placement]}
            ${className}
          `}
          style={{ width }}
          {...popoverHoverProps}
        >
          {/* Arrow */}
          {showArrow && (
            <div
              className={`
                absolute w-3 h-3 bg-white border-gray-200
                ${arrowStyles[placement]}
              `}
            />
          )}

          {/* Header */}
          {header && (
            <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-900">
              {header}
            </div>
          )}

          {/* Content */}
          <div className="px-4 py-3">{content}</div>

          {/* Footer */}
          {footer && (
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
              {footer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export type { PopoverProps, PopoverPlacement, PopoverTrigger };
