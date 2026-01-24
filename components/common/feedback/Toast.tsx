/**
 * @fileoverview Toast notification component for user feedback.
 * Displays temporary messages with auto-dismiss and close button.
 * Supports success, error, info, and warning variants.
 * @module components/common/feedback/Toast
 */

'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({
  id,
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const styles = {
    success:
      'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700',
    error:
      'bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700',
    warning:
      'bg-yellow-50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700',
    info: 'bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700',
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg min-w-[300px] max-w-md animate-slide-in ${styles[type]}`}
      role="alert"
    >
      <div className="shrink-0">{icons[type]}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
