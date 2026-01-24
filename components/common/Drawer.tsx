/**
 * @fileoverview Drawer component for slide-in panels from any screen edge.
 * Features accessibility support with focus management, keyboard navigation,
 * and body scroll lock. Supports multiple positions and sizes.
 * @module components/common/Drawer
 */

'use client';

import { ReactNode, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Available drawer positions (which edge it slides from)
 * @typedef {'left' | 'right' | 'top' | 'bottom'} DrawerPosition
 */
type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Available drawer sizes
 * @typedef {'sm' | 'md' | 'lg' | 'xl' | 'full'} DrawerSize
 */
type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props for the Drawer component
 * @interface DrawerProps
 */
interface DrawerProps {
  /** Whether the drawer is currently visible */
  isOpen: boolean;
  /** Callback fired when the drawer should close */
  onClose: () => void;
  /** Optional title displayed in the header */
  title?: string;
  /** Main content of the drawer */
  children: ReactNode;
  /** Which edge the drawer slides from */
  position?: DrawerPosition;
  /** Width (for left/right) or height (for top/bottom) of the drawer */
  size?: DrawerSize;
  /** Whether to show the close button in the header */
  showCloseButton?: boolean;
  /** Whether clicking the overlay should close the drawer */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape should close the drawer */
  closeOnEscape?: boolean;
  /** Optional footer content (typically action buttons) */
  footer?: ReactNode;
  /** Additional CSS classes for the drawer panel */
  className?: string;
  /** Whether to show the semi-transparent overlay behind the drawer */
  showOverlay?: boolean;
}

// Size configurations
const sizeConfig: Record<DrawerPosition, Record<DrawerSize, string>> = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[480px]',
    full: 'w-full',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[480px]',
    full: 'w-full',
  },
  top: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-96',
    full: 'h-full',
  },
  bottom: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-96',
    full: 'h-full',
  },
};

// Position styles
const positionStyles: Record<
  DrawerPosition,
  {
    container: string;
    panel: string;
    openTransform: string;
    closedTransform: string;
  }
> = {
  left: {
    container: 'inset-y-0 left-0',
    panel: 'h-full',
    openTransform: 'translate-x-0',
    closedTransform: '-translate-x-full',
  },
  right: {
    container: 'inset-y-0 right-0',
    panel: 'h-full',
    openTransform: 'translate-x-0',
    closedTransform: 'translate-x-full',
  },
  top: {
    container: 'inset-x-0 top-0',
    panel: 'w-full',
    openTransform: 'translate-y-0',
    closedTransform: '-translate-y-full',
  },
  bottom: {
    container: 'inset-x-0 bottom-0',
    panel: 'w-full',
    openTransform: 'translate-y-0',
    closedTransform: 'translate-y-full',
  },
};

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  footer,
  className = '',
  showOverlay = true,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Handle overlay click
  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Focus management and event listeners
  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Add event listener for escape key
      document.addEventListener('keydown', handleKeyDown);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Focus the drawer
      setTimeout(() => {
        drawerRef.current?.focus();
      }, 100);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';

        // Restore focus
        previousActiveElement.current?.focus();
      };
    }
    return undefined;
  }, [isOpen, handleKeyDown]);

  const positionConfig = positionStyles[position];
  const sizeClass = sizeConfig[position][size];

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          className={`
            fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Drawer container */}
      <div
        className={`
          fixed ${positionConfig.container} z-50
          ${isOpen ? '' : 'pointer-events-none'}
        `}
      >
        {/* Drawer panel */}
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'drawer-title' : undefined}
          tabIndex={-1}
          className={`
            ${positionConfig.panel}
            ${sizeClass}
            bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50 flex flex-col
            transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isOpen ? positionConfig.openTransform : positionConfig.closedTransform}
            ${className}
          `}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              {title && (
                <h2
                  id="drawer-title"
                  className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export type { DrawerProps, DrawerPosition, DrawerSize };
