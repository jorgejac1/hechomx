/**
 * @fileoverview Card component system for displaying content in contained boxes.
 * Includes Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter subcomponents.
 * Supports multiple variants, padding options, and interactive states with dark mode.
 * @module components/common/Card
 */

import { ReactNode, HTMLAttributes, memo } from 'react';

/**
 * Available card visual variants
 * @typedef {'default' | 'outlined' | 'elevated'} CardVariant
 */
type CardVariant = 'default' | 'outlined' | 'elevated';

/**
 * Available card padding sizes
 * @typedef {'none' | 'sm' | 'md' | 'lg'} CardPadding
 */
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Props for the main Card component
 * @interface CardProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to render inside the card */
  children: ReactNode;
  /** Visual style variant - affects shadows and borders */
  variant?: CardVariant;
  /** Internal padding size */
  padding?: CardPadding;
  /** Click handler - makes the card interactive with hover effects */
  onClick?: () => void;
  /** Link destination (currently unused - for future enhancement) */
  href?: string;
  /** HTML element to render as */
  as?: 'div' | 'article' | 'section';
}

/**
 * Props for the CardHeader subcomponent
 * @interface CardHeaderProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Header content (typically CardTitle and CardDescription) */
  children: ReactNode;
  /** Optional icon displayed before the header content */
  icon?: ReactNode;
  /** Optional action element displayed on the right side */
  action?: ReactNode;
}

/**
 * Props for the CardTitle subcomponent
 * @interface CardTitleProps
 * @extends {HTMLAttributes<HTMLHeadingElement>}
 */
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Title text content */
  children: ReactNode;
  /** Heading level to render - affects font size */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Props for the CardDescription subcomponent
 * @interface CardDescriptionProps
 * @extends {HTMLAttributes<HTMLParagraphElement>}
 */
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Description text content */
  children: ReactNode;
}

/**
 * Props for the CardContent subcomponent
 * @interface CardContentProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 */
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Main card content */
  children: ReactNode;
}

/**
 * Props for the CardFooter subcomponent
 * @interface CardFooterProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 */
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Footer content (typically action buttons) */
  children: ReactNode;
  /** Horizontal alignment of footer content */
  align?: 'left' | 'center' | 'right' | 'between';
}

// Main Card component
const Card = memo(function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  as: Component = 'div',
  ...props
}: CardProps) {
  // Variant styles
  const variantStyles = {
    default: 'bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50',
    outlined: 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700',
    elevated:
      'bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl transition-shadow',
  };

  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Interactive styles
  const interactiveStyles = onClick
    ? 'cursor-pointer hover:shadow-lg transition-all duration-200'
    : '';

  const combinedStyles = `
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${interactiveStyles}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  if (onClick) {
    return (
      <Component
        className={combinedStyles}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component className={combinedStyles} {...props}>
      {children}
    </Component>
  );
});

// Card Header
export const CardHeader = memo(function CardHeader({
  children,
  icon,
  action,
  className = '',
  ...props
}: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`} {...props}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary-600 shrink-0">{icon}</span>}
        <div>{children}</div>
      </div>
      {action && <div className="shrink-0 ml-4">{action}</div>}
    </div>
  );
});

// Card Title
export const CardTitle = memo(function CardTitle({
  children,
  as: Component = 'h3',
  className = '',
  ...props
}: CardTitleProps) {
  const baseStyles = 'font-bold text-gray-900 dark:text-gray-100';

  const sizeStyles = {
    h1: 'text-2xl',
    h2: 'text-xl',
    h3: 'text-lg',
    h4: 'text-base',
    h5: 'text-sm',
    h6: 'text-xs',
  };

  return (
    <Component className={`${baseStyles} ${sizeStyles[Component]} ${className}`} {...props}>
      {children}
    </Component>
  );
});

// Card Description
export const CardDescription = memo(function CardDescription({
  children,
  className = '',
  ...props
}: CardDescriptionProps) {
  return (
    <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
});

// Card Content
export const CardContent = memo(function CardContent({
  children,
  className = '',
  ...props
}: CardContentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
});

// Card Footer
export const CardFooter = memo(function CardFooter({
  children,
  className = '',
  align = 'right',
  ...props
}: CardFooterProps) {
  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      className={`flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 ${alignStyles[align]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card;
