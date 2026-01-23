/**
 * @fileoverview EmptyState component for displaying placeholder content when no data is available.
 * Provides consistent empty state UI with customizable icons, titles, descriptions, and action buttons.
 * Supports multiple sizes and optional bordered styling.
 * @module components/common/EmptyState
 */

import { ReactNode } from 'react';
import { Package } from 'lucide-react';

/**
 * Available empty state sizes
 * @typedef {'sm' | 'md' | 'lg'} EmptyStateSize
 */
type EmptyStateSize = 'sm' | 'md' | 'lg';

/**
 * Configuration for an action button in the empty state
 * @interface EmptyStateAction
 */
interface EmptyStateAction {
  /** Text displayed on the button */
  label: string;
  /** Click handler (for button behavior) */
  onClick?: () => void;
  /** Link destination (renders as anchor if provided) */
  href?: string;
  /** Visual style of the button */
  variant?: 'primary' | 'secondary';
  /** Optional icon to display before the label */
  icon?: ReactNode;
}

/**
 * Props for the EmptyState component
 * @interface EmptyStateProps
 */
interface EmptyStateProps {
  /** Main heading text */
  title: string;
  /** Explanatory text below the title */
  description?: string;
  /** Custom icon element (defaults to Package icon) */
  icon?: ReactNode;
  /** Size variant affecting spacing and typography */
  size?: EmptyStateSize;
  /** Primary call-to-action button */
  action?: EmptyStateAction;
  /** Secondary action button */
  secondaryAction?: EmptyStateAction;
  /** Additional content rendered below the actions */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show a dashed border around the component */
  bordered?: boolean;
}

// Size configurations
const sizeConfig: Record<
  EmptyStateSize,
  {
    container: string;
    iconWrapper: string;
    icon: string;
    title: string;
    description: string;
    button: string;
  }
> = {
  sm: {
    container: 'py-8 px-4',
    iconWrapper: 'w-12 h-12 mb-3',
    icon: 'w-6 h-6',
    title: 'text-base font-semibold',
    description: 'text-sm',
    button: 'px-4 py-2 text-sm',
  },
  md: {
    container: 'py-12 px-6',
    iconWrapper: 'w-16 h-16 mb-4',
    icon: 'w-8 h-8',
    title: 'text-xl font-bold',
    description: 'text-base',
    button: 'px-6 py-3 text-base',
  },
  lg: {
    container: 'py-16 px-8',
    iconWrapper: 'w-20 h-20 mb-6',
    icon: 'w-10 h-10',
    title: 'text-2xl font-bold',
    description: 'text-lg',
    button: 'px-8 py-4 text-lg',
  },
};

function ActionButton({
  action,
  size,
  isPrimary,
}: {
  action: EmptyStateAction;
  size: EmptyStateSize;
  isPrimary: boolean;
}) {
  const sizes = sizeConfig[size];
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors
    ${sizes.button}
  `;

  const variantClasses =
    action.variant === 'secondary' || !isPrimary
      ? 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
      : 'bg-primary-600 text-white hover:bg-primary-700';

  const content = (
    <>
      {action.icon}
      {action.label}
    </>
  );

  if (action.href) {
    return (
      <a href={action.href} className={`${baseClasses} ${variantClasses}`}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={`${baseClasses} ${variantClasses}`}>
      {content}
    </button>
  );
}

export default function EmptyState({
  title,
  description,
  icon,
  size = 'md',
  action,
  secondaryAction,
  children,
  className = '',
  bordered = false,
}: EmptyStateProps) {
  const sizes = sizeConfig[size];

  return (
    <div
      className={`
        text-center
        ${sizes.container}
        ${bordered ? 'border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800' : ''}
        ${className}
      `}
    >
      {/* Icon */}
      <div
        className={`
          ${sizes.iconWrapper}
          mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center
        `}
      >
        {icon || <Package className={`${sizes.icon} text-gray-400 dark:text-gray-500`} />}
      </div>

      {/* Title */}
      <h3 className={`${sizes.title} text-gray-900 dark:text-gray-100 mb-2`}>{title}</h3>

      {/* Description */}
      {description && (
        <p
          className={`${sizes.description} text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto`}
        >
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {action && <ActionButton action={action} size={size} isPrimary={true} />}
          {secondaryAction && (
            <ActionButton action={secondaryAction} size={size} isPrimary={false} />
          )}
        </div>
      )}

      {/* Additional content */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

export type { EmptyStateProps, EmptyStateAction, EmptyStateSize };
