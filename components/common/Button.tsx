/**
 * @fileoverview Button component with multiple variants, sizes, and icon support.
 * Supports both button and link rendering with full accessibility features.
 * @module components/common/Button
 */

import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Available button visual variants
 * @typedef {'primary' | 'secondary' | 'ghost' | 'outline'} ButtonVariant
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

/**
 * Available button sizes
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component
 * @interface ButtonProps
 */
interface ButtonProps {
  /** Button content/label */
  children?: ReactNode;
  /** Visual style variant - affects colors and borders */
  variant?: ButtonVariant;
  /** Size of the button - affects padding and font size */
  size?: ButtonSize;
  /** If provided, renders as a Next.js Link instead of button */
  href?: string;
  /** Click handler function */
  onClick?: () => void;
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button should take full width of container */
  fullWidth?: boolean;
  /** Optional icon element to display */
  icon?: ReactNode;
  /** Position of the icon relative to children */
  iconPosition?: 'left' | 'right';
  /** Additional CSS classes */
  className?: string;
  /** Accessibility label for screen readers */
  ariaLabel?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ariaLabel,
}: ButtonProps) {
  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2';

  // Variant styles with dark mode support
  const variantStyles = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed',
    secondary:
      'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 focus:ring-primary-500 border-2 border-primary-600 dark:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 disabled:border-gray-300 dark:disabled:border-gray-600 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 focus:ring-primary-500 disabled:text-gray-400 disabled:cursor-not-allowed',
    outline:
      'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-500 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 disabled:text-gray-400 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:cursor-not-allowed',
  };

  // Responsive size styles with minimum touch target height (44px for WCAG compliance)
  const responsiveSizeStyles = {
    sm: 'px-2.5 sm:px-3 py-1.5 sm:py-1.5 text-xs sm:text-sm gap-1 sm:gap-1.5 min-h-[36px] sm:min-h-[36px]',
    md: 'px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base gap-1.5 sm:gap-2 min-h-[44px]',
    lg: 'px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg gap-2 sm:gap-2.5 min-h-[48px] sm:min-h-[52px]',
  };

  // Icon size based on button size
  const iconSizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // Combine all styles
  const combinedStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${responsiveSizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  // Icon wrapper with proper sizing
  const IconWrapper = ({ children }: { children: ReactNode }) => (
    <span className={`shrink-0 ${iconSizeStyles[size]}`}>{children}</span>
  );

  // Content with icon positioning
  const ButtonContent = () => (
    <>
      {icon && iconPosition === 'left' && <IconWrapper>{icon}</IconWrapper>}
      {children && <span className={fullWidth ? 'flex-1 text-center' : ''}>{children}</span>}
      {icon && iconPosition === 'right' && <IconWrapper>{icon}</IconWrapper>}
    </>
  );

  // Render as Link if href is provided
  if (href && !disabled) {
    return (
      <Link href={href} className={combinedStyles} aria-label={ariaLabel}>
        <ButtonContent />
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      aria-label={ariaLabel}
    >
      <ButtonContent />
    </button>
  );
}
