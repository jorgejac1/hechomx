/**
 * @fileoverview Divider component for visual separation of content sections.
 * Supports horizontal/vertical orientation, multiple line styles, colors,
 * and optional centered text labels. Customizable spacing and thickness.
 * @module components/common/Divider
 */

import { ReactNode } from 'react';

/**
 * Divider orientation
 * @typedef {'horizontal' | 'vertical'} DividerOrientation
 */
type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider line style variant
 * @typedef {'solid' | 'dashed' | 'dotted'} DividerVariant
 */
type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Divider thickness size
 * @typedef {'sm' | 'md' | 'lg'} DividerSize
 */
type DividerSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Divider component
 * @interface DividerProps
 */
interface DividerProps {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Visual variant */
  variant?: DividerVariant;
  /** Size (thickness for horizontal, width for vertical) */
  size?: DividerSize;
  /** Text or content to display in the middle */
  children?: ReactNode;
  /** Position of the label */
  labelPosition?: 'left' | 'center' | 'right';
  /** Color variant */
  color?: 'default' | 'light' | 'dark' | 'primary';
  /** Spacing around the divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

// Size configurations
const horizontalSizeConfig: Record<DividerSize, string> = {
  sm: 'border-t',
  md: 'border-t-2',
  lg: 'border-t-4',
};

const verticalSizeConfig: Record<DividerSize, string> = {
  sm: 'border-l',
  md: 'border-l-2',
  lg: 'border-l-4',
};

// Variant styles
const variantStyles: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

// Color styles
const colorStyles: Record<string, string> = {
  default: 'border-gray-200',
  light: 'border-gray-100',
  dark: 'border-gray-400',
  primary: 'border-primary-200',
};

// Spacing styles
const spacingStyles: Record<string, { horizontal: string; vertical: string }> = {
  none: { horizontal: '', vertical: '' },
  sm: { horizontal: 'my-2', vertical: 'mx-2' },
  md: { horizontal: 'my-4', vertical: 'mx-4' },
  lg: { horizontal: 'my-8', vertical: 'mx-8' },
};

// Label position styles
const labelPositionStyles: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export default function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  size = 'sm',
  children,
  labelPosition = 'center',
  color = 'default',
  spacing = 'md',
  className = '',
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';
  const sizeClass = isHorizontal ? horizontalSizeConfig[size] : verticalSizeConfig[size];
  const spacingClass = isHorizontal
    ? spacingStyles[spacing].horizontal
    : spacingStyles[spacing].vertical;

  // Vertical divider without content
  if (!isHorizontal && !children) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`
          inline-block h-full min-h-4
          ${sizeClass}
          ${variantStyles[variant]}
          ${colorStyles[color]}
          ${spacingClass}
          ${className}
        `}
      />
    );
  }

  // Horizontal divider without content
  if (isHorizontal && !children) {
    return (
      <hr
        role="separator"
        aria-orientation="horizontal"
        className={`
          w-full
          ${sizeClass}
          ${variantStyles[variant]}
          ${colorStyles[color]}
          ${spacingClass}
          ${className}
        `}
      />
    );
  }

  // Horizontal divider with content
  if (isHorizontal && children) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={`
          flex items-center w-full
          ${spacingClass}
          ${labelPositionStyles[labelPosition]}
          ${className}
        `}
      >
        {labelPosition !== 'left' && (
          <div
            className={`
              flex-1
              ${sizeClass}
              ${variantStyles[variant]}
              ${colorStyles[color]}
              ${labelPosition === 'center' ? 'mr-4' : ''}
            `}
          />
        )}
        <span className="px-3 text-sm text-gray-500 whitespace-nowrap">{children}</span>
        {labelPosition !== 'right' && (
          <div
            className={`
              flex-1
              ${sizeClass}
              ${variantStyles[variant]}
              ${colorStyles[color]}
              ${labelPosition === 'center' ? 'ml-4' : ''}
            `}
          />
        )}
      </div>
    );
  }

  // Vertical divider with content (rare case)
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className={`
        flex flex-col items-center h-full
        ${spacingClass}
        ${className}
      `}
    >
      <div
        className={`
          flex-1
          ${sizeClass}
          ${variantStyles[variant]}
          ${colorStyles[color]}
        `}
      />
      <span className="py-2 text-sm text-gray-500">{children}</span>
      <div
        className={`
          flex-1
          ${sizeClass}
          ${variantStyles[variant]}
          ${colorStyles[color]}
        `}
      />
    </div>
  );
}

export type { DividerProps, DividerOrientation, DividerVariant, DividerSize };
