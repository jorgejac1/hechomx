/**
 * @fileoverview ConfirmActionModal component for confirming user actions.
 * Displays a modal dialog with customizable title, message, and action buttons.
 * Supports danger, success, and warning variants with appropriate icons and colors.
 * @module components/common/ConfirmActionModal
 */

'use client';

import { Loader2, AlertTriangle, Ban, UserCheck } from 'lucide-react';

/**
 * Props for the ConfirmActionModal component
 * @interface ConfirmActionModalProps
 */
interface ConfirmActionModalProps {
  /** Whether the modal is currently visible */
  isOpen: boolean;
  /** Callback fired when the modal should close (cancel or backdrop click) */
  onClose: () => void;
  /** Callback fired when the confirm action is executed */
  onConfirm: () => void;
  /** Modal title text */
  title: string;
  /** Descriptive message explaining the action */
  message: string;
  /** Text for the confirm button */
  confirmLabel: string;
  /** Visual variant determining icon and button colors */
  confirmVariant: 'danger' | 'success' | 'warning';
  /** Whether an async operation is in progress */
  isLoading?: boolean;
  /** Optional username to display in the modal */
  userName?: string;
}

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  confirmVariant,
  isLoading = false,
  userName,
}: ConfirmActionModalProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: <Ban className="w-6 h-6 text-red-600" />,
      iconBg: 'bg-red-100',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    success: {
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      iconBg: 'bg-green-100',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      iconBg: 'bg-amber-100',
      button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    },
  };

  const styles = variantStyles[confirmVariant];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          {/* Icon */}
          <div
            className={`w-12 h-12 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {styles.icon}
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            {userName && (
              <p className="text-sm font-medium text-gray-700 mb-2">
                Usuario: <span className="text-purple-600">{userName}</span>
              </p>
            )}
            <p className="text-gray-600">{message}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2 ${styles.button}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
