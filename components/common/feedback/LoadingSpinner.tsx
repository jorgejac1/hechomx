/**
 * @fileoverview Loading spinner component for async operations.
 * Displays animated spinner with optional text and full-screen mode.
 * Supports multiple sizes and color variants.
 * @module components/common/feedback/LoadingSpinner
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
};

const colorClasses = {
  primary: 'border-primary-600 border-t-transparent',
  white: 'border-white border-t-transparent',
  gray: 'border-gray-300 border-t-transparent',
};

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = '',
  fullScreen = false,
  text,
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={`
        ${sizeClasses[size]}
        ${colorClasses[color]}
        rounded-full
        animate-spin
        ${className}
      `}
      role="status"
      aria-label="Cargando..."
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          {spinner}
          {text && <p className="mt-4 text-gray-600 dark:text-gray-400">{text}</p>}
        </div>
      </div>
    );
  }

  return spinner;
}
