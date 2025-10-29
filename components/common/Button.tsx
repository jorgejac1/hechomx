import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children?: ReactNode; // ✅ FIXED: Made optional
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
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
  ariaLabel
}: ButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed',
    secondary: 'bg-white text-primary-600 hover:bg-primary-50 focus:ring-primary-500 border-2 border-primary-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:text-gray-400 disabled:cursor-not-allowed',
    outline: 'bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500 border-2 border-gray-300 hover:border-gray-400 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed'
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5'
  };

  // Responsive size styles (for mobile optimization)
  const responsiveSizeStyles = {
    sm: 'px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm gap-1 sm:gap-1.5',
    md: 'px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base gap-1.5 sm:gap-2',
    lg: 'px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg gap-2 sm:gap-2.5'
  };

  // Icon size based on button size
  const iconSizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Combine all styles
  const combinedStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${responsiveSizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Icon wrapper with proper sizing
  const IconWrapper = ({ children }: { children: ReactNode }) => (
    <span className={`flex-shrink-0 ${iconSizeStyles[size]}`}>
      {children}
    </span>
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
      <Link
        href={href}
        className={combinedStyles}
        aria-label={ariaLabel}
      >
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