/**
 * @fileoverview Product gallery image component
 * Renders individual gallery images with loading states, error handling,
 * and accessibility support. Respects reduced motion preferences.
 * @module components/product/ProductGallery/ProductGalleryImage
 */

import Image from 'next/image';
import { X } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/common/usePrefersReducedMotion';

/**
 * Props for the ProductGalleryImage component
 * @interface ProductGalleryImageProps
 */
interface ProductGalleryImageProps {
  /** Image URL */
  url: string;
  /** Alt text for accessibility */
  alt: string;
  /** Image index in the gallery */
  index: number;
  /** Whether the image has finished loading */
  isLoaded: boolean;
  /** Whether there was an error loading the image */
  hasError: boolean;
  /** Callback when image loads successfully */
  onLoad: () => void;
  /** Callback when image fails to load */
  onError: () => void;
  /** Whether to prioritize loading this image */
  priority?: boolean;
  /** Responsive sizes attribute for the image */
  sizes: string;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles for zoom/transform effects */
  style?: React.CSSProperties;
}

export function ProductGalleryImage({
  url,
  alt,
  index,
  isLoaded,
  hasError,
  onLoad,
  onError,
  priority,
  sizes,
  className = '',
  style,
}: ProductGalleryImageProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionClass = prefersReducedMotion ? 'duration-0' : 'duration-300';

  // Auto-prioritize first image if priority not explicitly set
  const shouldPrioritize = priority !== undefined ? priority : index === 0;

  return (
    <>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}

      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400">
            <X className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm">Error al cargar imagen</p>
          </div>
        </div>
      ) : (
        <Image
          src={url}
          alt={`${alt} - Imagen ${index + 1}`}
          fill
          sizes={sizes}
          className={`object-contain transition-opacity ${transitionClass} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={style}
          priority={shouldPrioritize}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </>
  );
}
