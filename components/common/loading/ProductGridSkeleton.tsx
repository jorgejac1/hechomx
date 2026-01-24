/**
 * @fileoverview Product grid skeleton loading placeholder component.
 * Displays animated placeholder for product grid during loading.
 * Configurable count and responsive grid layout.
 * @module components/common/loading/ProductGridSkeleton
 */

import ImageSkeleton from './ImageSkeleton';
import Skeleton from './Skeleton';

interface ProductGridSkeletonProps {
  /** Number of skeleton cards to display */
  count?: number;
  /** Grid columns configuration */
  columns?: 'default' | 'compact' | 'wide';
  /** Additional CSS classes */
  className?: string;
}

const columnClasses = {
  default: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  compact: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  wide: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
};

export default function ProductGridSkeleton({
  count = 8,
  columns = 'default',
  className = '',
}: ProductGridSkeletonProps) {
  return (
    <div
      className={`grid ${columnClasses[columns]} gap-6 ${className}`}
      role="status"
      aria-label="Cargando productos..."
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <ImageSkeleton aspectRatio="square" rounded={false} />
          <div className="p-4 space-y-3">
            {/* Category badge */}
            <Skeleton className="h-5 w-20" />
            {/* Title */}
            <Skeleton className="h-5 w-3/4" />
            {/* Price and rating */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            {/* Maker name */}
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
      <span className="sr-only">Cargando productos...</span>
    </div>
  );
}
