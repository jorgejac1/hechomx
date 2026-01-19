'use client';

import { Loader2, AlertTriangle, Ban, UserCheck } from 'lucide-react';

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel: string;
  confirmVariant: 'danger' | 'success' | 'warning';
  isLoading?: boolean;
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
