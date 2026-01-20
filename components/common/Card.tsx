import { ReactNode, HTMLAttributes } from 'react';

type CardVariant = 'default' | 'outlined' | 'elevated';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  onClick?: () => void;
  href?: string;
  as?: 'div' | 'article' | 'section';
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
}

// Main Card component
export default function Card({
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
    default: 'bg-white rounded-xl shadow-md',
    outlined: 'bg-white rounded-xl border border-gray-200',
    elevated: 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow',
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
}

// Card Header
export function CardHeader({ children, icon, action, className = '', ...props }: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`} {...props}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary-600 shrink-0">{icon}</span>}
        <div>{children}</div>
      </div>
      {action && <div className="shrink-0 ml-4">{action}</div>}
    </div>
  );
}

// Card Title
export function CardTitle({
  children,
  as: Component = 'h3',
  className = '',
  ...props
}: CardTitleProps) {
  const baseStyles = 'font-bold text-gray-900';

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
}

// Card Description
export function CardDescription({ children, className = '', ...props }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}

// Card Content
export function CardContent({ children, className = '', ...props }: CardContentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

// Card Footer
export function CardFooter({
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
      className={`flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 ${alignStyles[align]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
