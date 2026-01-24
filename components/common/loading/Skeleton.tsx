/**
 * @fileoverview Base skeleton loading placeholder component.
 * Displays animated placeholder for content during loading.
 * Supports text, circular, and rectangular variants with pulse or wave animation.
 * @module components/common/loading/Skeleton
 */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded-sm',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div
      className={`
        bg-gray-200 dark:bg-gray-700
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${className}
      `}
      style={style}
      aria-busy="true"
      aria-live="polite"
      {...props}
    />
  );
}
