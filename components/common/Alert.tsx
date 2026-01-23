/**
 * @fileoverview Alert component for displaying informational, success, warning, and error messages.
 * Supports multiple layout styles, custom icons, dismissible option, and action buttons.
 * Includes dark mode support and full accessibility features.
 * @module components/common/Alert
 */

import { ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X, type LucideIcon } from 'lucide-react';

/**
 * Available alert color variants
 * @typedef {'info' | 'success' | 'warning' | 'error'} AlertVariant
 */
type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Available alert layout styles
 * @typedef {'default' | 'bordered' | 'sidebar'} AlertLayout
 */
type AlertLayout = 'default' | 'bordered' | 'sidebar';

/**
 * Props for the Alert component
 * @interface AlertProps
 */
interface AlertProps {
  /** Color variant - determines the alert's color scheme and default icon */
  variant?: AlertVariant;
  /** Layout style: default (full border), bordered (rounded with border), sidebar (left accent border) */
  layout?: AlertLayout;
  /** Optional title displayed in bold above the content */
  title?: string;
  /** Main content/description of the alert */
  children: ReactNode;
  /** Custom icon component - overrides the default variant icon */
  icon?: LucideIcon;
  /** Whether to hide the icon completely */
  hideIcon?: boolean;
  /** Whether to show a dismiss/close button */
  dismissible?: boolean;
  /** Callback fired when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Action buttons or links to render at the bottom */
  actions?: ReactNode;
}

const variantConfig: Record<
  AlertVariant,
  {
    icon: LucideIcon;
    containerStyles: string;
    iconStyles: string;
    titleStyles: string;
    textStyles: string;
    borderStyles: string;
    sidebarStyles: string;
  }
> = {
  info: {
    icon: Info,
    containerStyles: 'bg-blue-50 dark:bg-blue-900/20',
    iconStyles: 'text-blue-500 dark:text-blue-400',
    titleStyles: 'text-blue-800 dark:text-blue-200',
    textStyles: 'text-blue-700 dark:text-blue-300',
    borderStyles: 'border-blue-200 dark:border-blue-800',
    sidebarStyles: 'border-l-4 border-l-blue-600 dark:border-l-blue-500',
  },
  success: {
    icon: CheckCircle,
    containerStyles: 'bg-green-50 dark:bg-green-900/20',
    iconStyles: 'text-green-500 dark:text-green-400',
    titleStyles: 'text-green-800 dark:text-green-200',
    textStyles: 'text-green-700 dark:text-green-300',
    borderStyles: 'border-green-200 dark:border-green-800',
    sidebarStyles: 'border-l-4 border-l-green-600 dark:border-l-green-500',
  },
  warning: {
    icon: AlertTriangle,
    containerStyles: 'bg-amber-50 dark:bg-amber-900/20',
    iconStyles: 'text-amber-500 dark:text-amber-400',
    titleStyles: 'text-amber-800 dark:text-amber-200',
    textStyles: 'text-amber-700 dark:text-amber-300',
    borderStyles: 'border-amber-200 dark:border-amber-800',
    sidebarStyles: 'border-l-4 border-l-amber-600 dark:border-l-amber-500',
  },
  error: {
    icon: AlertCircle,
    containerStyles: 'bg-red-50 dark:bg-red-900/20',
    iconStyles: 'text-red-500 dark:text-red-400',
    titleStyles: 'text-red-800 dark:text-red-200',
    textStyles: 'text-red-700 dark:text-red-300',
    borderStyles: 'border-red-200 dark:border-red-800',
    sidebarStyles: 'border-l-4 border-l-red-600 dark:border-l-red-500',
  },
};

export default function Alert({
  variant = 'info',
  layout = 'default',
  title,
  children,
  icon,
  hideIcon = false,
  dismissible = false,
  onDismiss,
  className = '',
  actions,
}: AlertProps) {
  const config = variantConfig[variant];
  const IconComponent = icon || config.icon;

  // Build container styles based on layout
  const getContainerStyles = () => {
    const base = `${config.containerStyles} p-4`;

    switch (layout) {
      case 'bordered':
        return `${base} border ${config.borderStyles} rounded-xl`;
      case 'sidebar':
        return `${base} ${config.sidebarStyles} rounded-r-lg`;
      default:
        return `${base} border ${config.borderStyles} rounded-lg`;
    }
  };

  return (
    <div className={`${getContainerStyles()} ${className}`} role="alert">
      <div className="flex items-start gap-3">
        {/* Icon */}
        {!hideIcon && (
          <IconComponent
            className={`w-5 h-5 ${config.iconStyles} mt-0.5 shrink-0`}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && <h4 className={`font-semibold ${config.titleStyles}`}>{title}</h4>}
          <div className={`text-sm ${config.textStyles} ${title ? 'mt-1' : ''}`}>{children}</div>
          {actions && <div className="mt-3 flex items-center gap-3">{actions}</div>}
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className={`shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors ${config.textStyles}`}
            aria-label="Cerrar alerta"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Export types for external use
export type { AlertVariant, AlertLayout, AlertProps };
