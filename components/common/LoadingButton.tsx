/**
 * @fileoverview LoadingButton component extending Button with loading state support.
 * Displays a spinner and optional loading text while async operations are in progress.
 * Automatically disables interaction during loading state.
 * @module components/common/LoadingButton
 */

'use client';

import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import Button from './Button';

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
 * Props for the LoadingButton component
 * @interface LoadingButtonProps
 */
interface LoadingButtonProps {
  /** Button content when not loading */
  children: ReactNode;
  /** Whether the button is in loading state (shows spinner) */
  isLoading?: boolean;
  /** Alternative text to display while loading (defaults to children) */
  loadingText?: string;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Click handler function */
  onClick?: () => void;
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button is disabled (independent of loading state) */
  disabled?: boolean;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Icon to show when not loading */
  icon?: ReactNode;
  /** Position of the icon relative to children */
  iconPosition?: 'left' | 'right';
  /** If provided, renders as a link (disabled during loading) */
  href?: string;
  /** Additional CSS classes */
  className?: string;
  /** Accessibility label for screen readers */
  ariaLabel?: string;
}

export default function LoadingButton({
  children,
  isLoading = false,
  loadingText,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  href,
  className = '',
  ariaLabel,
}: LoadingButtonProps) {
  // Icon sizes that match Button component
  const iconSizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <Loader2 className={`${iconSizeStyles[size]} animate-spin`} aria-hidden="true" />
  );

  // Determine the icon to show
  const displayIcon = isLoading ? <LoadingSpinner /> : icon;

  // Determine the text to show
  const displayText = isLoading && loadingText ? loadingText : children;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
      fullWidth={fullWidth}
      icon={displayIcon}
      iconPosition={iconPosition}
      href={isLoading ? undefined : href}
      className={className}
      ariaLabel={ariaLabel}
    >
      {displayText}
    </Button>
  );
}

// Export types for external use
export type { LoadingButtonProps, ButtonVariant, ButtonSize };
