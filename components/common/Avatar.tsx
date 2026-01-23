/**
 * @fileoverview Avatar component for displaying user profile images and initials.
 * Supports multiple sizes, shapes, online status indicators, fallback initials,
 * and colored rings. Includes AvatarGroup for stacked avatar displays.
 * @module components/common/Avatar
 */

'use client';

import { ReactNode, useState, memo } from 'react';
import Image from 'next/image';

/**
 * Available avatar sizes
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} AvatarSize
 */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Avatar shape variants
 * @typedef {'circular' | 'rounded' | 'square'} AvatarVariant
 */
type AvatarVariant = 'circular' | 'rounded' | 'square';

/**
 * Online presence status options
 * @typedef {'online' | 'offline' | 'busy' | 'away'} AvatarStatus
 */
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

/**
 * Props for the Avatar component
 * @interface AvatarProps
 */
interface AvatarProps {
  /** Image source URL */
  src?: string | null;
  /** Alt text for the image */
  alt?: string;
  /** Display name for generating initials */
  name?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Shape variant */
  variant?: AvatarVariant;
  /** Online status indicator */
  status?: AvatarStatus;
  /** Custom fallback content */
  fallback?: ReactNode;
  /** Border ring color */
  ring?: 'primary' | 'success' | 'warning' | 'danger' | 'white' | 'none';
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

// Size configurations
const sizeStyles: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-xs', status: 'w-1.5 h-1.5' },
  sm: { container: 'w-8 h-8', text: 'text-sm', status: 'w-2 h-2' },
  md: { container: 'w-10 h-10', text: 'text-base', status: 'w-2.5 h-2.5' },
  lg: { container: 'w-12 h-12', text: 'text-lg', status: 'w-3 h-3' },
  xl: { container: 'w-16 h-16', text: 'text-xl', status: 'w-3.5 h-3.5' },
  '2xl': { container: 'w-20 h-20', text: 'text-2xl', status: 'w-4 h-4' },
};

// Variant styles
const variantStyles: Record<AvatarVariant, string> = {
  circular: 'rounded-full',
  rounded: 'rounded-xl',
  square: 'rounded-none',
};

// Ring styles
const ringStyles: Record<string, string> = {
  primary: 'ring-2 ring-primary-500',
  success: 'ring-2 ring-green-500',
  warning: 'ring-2 ring-yellow-500',
  danger: 'ring-2 ring-red-500',
  white: 'ring-2 ring-white',
  none: '',
};

// Status colors
const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
};

// Generate initials from name
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// Generate consistent background color from name
function getColorFromName(name: string): string {
  const colors = [
    'bg-primary-100 text-primary-700',
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-yellow-100 text-yellow-700',
    'bg-purple-100 text-purple-700',
    'bg-pink-100 text-pink-700',
    'bg-indigo-100 text-indigo-700',
    'bg-teal-100 text-teal-700',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

const Avatar = memo(function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  variant = 'circular',
  status,
  fallback,
  ring = 'none',
  className = '',
  onClick,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = src && !imageError;

  const sizeConfig = sizeStyles[size];
  const variantClass = variantStyles[variant];
  const ringClass = ringStyles[ring];

  // Determine fallback content
  const renderFallback = () => {
    if (fallback) {
      return fallback;
    }

    if (name) {
      const initials = getInitials(name);
      const colorClass = getColorFromName(name);
      return (
        <div
          className={`
            flex items-center justify-center w-full h-full font-semibold
            ${colorClass}
            ${variantClass}
          `}
        >
          {initials}
        </div>
      );
    }

    // Default user icon
    return (
      <div className={`flex items-center justify-center w-full h-full bg-gray-200 ${variantClass}`}>
        <svg className="w-1/2 h-1/2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    );
  };

  const avatarContent = (
    <div
      className={`
        relative inline-flex shrink-0 overflow-hidden
        ${sizeConfig.container}
        ${sizeConfig.text}
        ${variantClass}
        ${ringClass}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt || name || 'Avatar'}
          fill
          className={`object-cover ${variantClass}`}
          onError={() => setImageError(true)}
        />
      ) : (
        renderFallback()
      )}

      {/* Status indicator */}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 block border-2 border-white
            ${sizeConfig.status}
            ${statusColors[status]}
            ${variant === 'circular' ? 'rounded-full' : 'rounded-sm'}
          `}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );

  return avatarContent;
});

// Avatar Group component
interface AvatarGroupProps {
  /** Maximum number of avatars to show */
  max?: number;
  /** Size of avatars */
  size?: AvatarSize;
  /** Children avatars */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function AvatarGroup({ max = 4, size = 'md', children, className = '' }: AvatarGroupProps) {
  const childArray = Array.isArray(children) ? children : [children];
  const visibleChildren = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  const overlapStyles: Record<AvatarSize, string> = {
    xs: '-ml-1.5',
    sm: '-ml-2',
    md: '-ml-2.5',
    lg: '-ml-3',
    xl: '-ml-4',
    '2xl': '-ml-5',
  };

  return (
    <div className={`flex items-center ${className}`}>
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          className={`${index > 0 ? overlapStyles[size] : ''} ring-2 ring-white rounded-full`}
        >
          {child}
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={`
            ${overlapStyles[size]}
            ${sizeStyles[size].container}
            ${sizeStyles[size].text}
            flex items-center justify-center rounded-full
            bg-gray-100 text-gray-600 font-medium ring-2 ring-white
          `}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export default Avatar;

export type { AvatarSize, AvatarVariant, AvatarStatus, AvatarProps, AvatarGroupProps };
