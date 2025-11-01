import { ReactNode } from "react";

type BadgeVariant =
  | "primary" // Teal/Blue - Destacado
  | "success" // Green - Verificado, Disponible
  | "warning" // Yellow/Orange - Alerts
  | "danger" // Red - Agotado, Error
  | "info" // Blue - Info
  | "neutral" // Gray - Default
  | "category"; // Custom colors for categories

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  rounded?: "default" | "full" | "none";
  className?: string;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
}

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  icon,
  iconPosition = "left",
  rounded = "full",
  className = "",
  onClick,
  removable = false,
  onRemove,
}: BadgeProps) {
  // Variant styles
  const variantStyles = {
    primary: "bg-primary-600 text-white",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    danger: "bg-red-100 text-red-800 border border-red-200",
    info: "bg-blue-100 text-blue-800 border border-blue-200",
    neutral: "bg-gray-100 text-gray-800 border border-gray-200",
    category: "bg-purple-100 text-purple-800 border border-purple-200",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-1.5 text-base gap-2",
  };

  // Icon sizes
  const iconSizeStyles = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  // Rounded styles
  const roundedStyles = {
    default: "rounded-lg",
    full: "rounded-full",
    none: "rounded-none",
  };

  // Combined styles
  const combinedStyles = `
  inline-flex items-center justify-center font-medium transition-colors
  ${variantStyles[variant]}
  ${sizeStyles[size]}
  ${roundedStyles[rounded]}
  ${onClick ? "cursor-pointer hover:opacity-80" : ""}
  ${className}
`
    .trim()
    .replace(/\s+/g, " ");

  const IconWrapper = ({ children }: { children: ReactNode }) => (
    <span className={`flex-shrink-0 ${iconSizeStyles[size]}`}>{children}</span>
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <IconWrapper>{icon}</IconWrapper>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <IconWrapper>{icon}</IconWrapper>}
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-current opacity-70 hover:opacity-100"
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
        </button>
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
}
