/**
 * @fileoverview Badge component for displaying status indicators, labels, and tags.
 * Supports multiple variants, sizes, icons, and interactive features like click and remove.
 * @module components/common/Badge
 */

import { ReactNode, memo } from 'react';

/**
 * Available badge color variants
 * @typedef {'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'category'} BadgeVariant
 */
type BadgeVariant =
  | 'primary' // Teal/Blue - Destacado
  | 'success' // Green - Verificado, Disponible
  | 'warning' // Yellow/Orange - Alerts
  | 'danger' // Red - Agotado, Error
  | 'info' // Blue - Info
  | 'neutral' // Gray - Default
  | 'category'; // Custom colors for categories

/**
 * Available badge sizes
 * @typedef {'sm' | 'md' | 'lg'} BadgeSize
 */
type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Badge component
 * @interface BadgeProps
 */
interface BadgeProps {
  /** Content to display inside the badge */
  children: ReactNode;
  /** Color variant - determines the badge's color scheme */
  variant?: BadgeVariant;
  /** Size of the badge - affects padding and font size */
  size?: BadgeSize;
  /** Optional icon element to display */
  icon?: ReactNode;
  /** Position of the icon relative to content */
  iconPosition?: 'left' | 'right';
  /** Border radius style */
  rounded?: 'default' | 'full' | 'none';
  /** Additional CSS classes */
  className?: string;
  /** Click handler - makes the badge interactive */
  onClick?: () => void;
  /** Whether to show a remove/close button */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
}

const Badge = memo(function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  iconPosition = 'left',
  rounded = 'full',
  className = '',
  onClick,
  removable = false,
  onRemove,
}: BadgeProps) {
  // Variant styles with dark mode support
  const variantStyles = {
    primary: 'bg-primary-600 text-white',
    success:
      'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800',
    warning:
      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800',
    danger:
      'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    neutral:
      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600',
    category:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  };

  // Icon sizes
  const iconSizeStyles = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // Rounded styles
  const roundedStyles = {
    default: 'rounded-lg',
    full: 'rounded-full',
    none: 'rounded-none',
  };

  // Combined styles
  const combinedStyles = `
  inline-flex items-center justify-center font-medium transition-colors
  ${variantStyles[variant]}
  ${sizeStyles[size]}
  ${roundedStyles[rounded]}
  ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
  ${className}
`
    .trim()
    .replace(/\s+/g, ' ');

  const IconWrapper = ({ children }: { children: ReactNode }) => (
    <span className={`shrink-0 ${iconSizeStyles[size]}`}>{children}</span>
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <IconWrapper>{icon}</IconWrapper>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <IconWrapper>{icon}</IconWrapper>}
      {removable && onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }
          }}
          className="ml-1 hover:text-current opacity-70 hover:opacity-100 cursor-pointer"
          aria-label="Eliminar"
        >
          <svg
            className={iconSizeStyles[size]}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={combinedStyles}>
        {content}
      </button>
    );
  }

  return <span className={combinedStyles}>{content}</span>;
});

export default Badge;
