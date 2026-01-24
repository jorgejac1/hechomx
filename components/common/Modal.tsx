/**
 * @fileoverview Modal dialog component with accessibility features.
 * Includes focus trapping, escape key handling, backdrop click, and body scroll lock.
 * Supports multiple sizes and optional header/footer sections.
 * @module components/common/Modal
 */

'use client';

import { ReactNode, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Available modal width sizes
 * @typedef {'sm' | 'md' | 'lg' | 'xl' | 'full'} ModalSize
 */
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props for the Modal component
 * @interface ModalProps
 */
interface ModalProps {
  /** Whether the modal is currently visible */
  isOpen: boolean;
  /** Callback fired when the modal should close */
  onClose: () => void;
  /** Main content of the modal */
  children: ReactNode;
  /** Optional title displayed in the header */
  title?: string;
  /** Optional description displayed below the title */
  description?: string;
  /** Maximum width of the modal dialog */
  size?: ModalSize;
  /** Whether to show the close button in the header */
  showCloseButton?: boolean;
  /** Whether clicking the backdrop should close the modal */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape should close the modal */
  closeOnEscape?: boolean;
  /** Additional CSS classes for the modal panel */
  className?: string;
  /** Optional footer content (typically action buttons) */
  footer?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = '',
  footer,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Size styles - responsive with mobile-friendly defaults
  const sizeStyles = {
    sm: 'max-w-[calc(100%-2rem)] sm:max-w-sm',
    md: 'max-w-[calc(100%-2rem)] sm:max-w-md',
    lg: 'max-w-[calc(100%-2rem)] sm:max-w-lg',
    xl: 'max-w-[calc(100%-2rem)] sm:max-w-xl',
    full: 'max-w-[calc(100%-2rem)] sm:max-w-4xl',
  };

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Focus trap and body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Lock body scroll
      document.body.style.overflow = 'hidden';

      // Add escape key listener
      document.addEventListener('keydown', handleKeyDown);

      // Focus the first focusable element or modal
      setTimeout(() => {
        if (modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstFocusable = focusableElements[0] as HTMLElement;
          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            modalRef.current.focus();
          }
        }
      }, 0);

      return () => {
        // Restore body scroll
        document.body.style.overflow = '';

        // Remove escape key listener
        document.removeEventListener('keydown', handleKeyDown);

        // Restore focus
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown]);

  // Focus trap
  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 animate-fade-in"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div
        className="flex min-h-full items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Modal panel */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          tabIndex={-1}
          onKeyDown={handleTabKey}
          className={`
            relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 w-full
            animate-scale-in
            ${sizeStyles[size]}
            ${className}
          `
            .trim()
            .replace(/\s+/g, ' ')}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-4 sm:p-6 pb-0">
              <div className="flex-1 min-w-0 pr-2">
                {title && (
                  <h2
                    id="modal-title"
                    className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    {description}
                  </p>
                )}
              </div>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-6">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">{footer}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
