/**
 * @fileoverview Multi-image loading state tracker hook
 * Tracks loading and error states for multiple images with progress calculation
 * @module hooks/common/useImageLoadingState
 */

import { useState, useCallback, useMemo } from 'react';

/**
 * Track loading and error states for multiple images
 *
 * @param imageCount - Total number of images
 * @returns Object with loading/error state and handlers
 *
 * @example
 * const { loaded, errors, isLoading, handleLoad, handleError, isAllLoaded } =
 *   useImageLoadingState(images.length);
 *
 * <Image
 *   onLoad={() => handleLoad(0)}
 *   onError={() => handleError(0)}
 * />
 */
export interface UseImageLoadingStateReturn {
  loaded: Set<number>;
  errors: Set<number>;
  isLoading: (index: number) => boolean;
  hasError: (index: number) => boolean;
  handleLoad: (index: number) => void;
  handleError: (index: number) => void;
  reset: () => void;
  isAllLoaded: boolean;
  loadedCount: number;
  errorCount: number;
  loadingProgress: number;
}

export function useImageLoadingState(imageCount: number = 0): UseImageLoadingStateReturn {
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Set<number>>(new Set());

  const handleLoad = useCallback((index: number) => {
    setLoaded((prev) => new Set(prev).add(index));
    setErrors((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  }, []);

  const handleError = useCallback((index: number) => {
    setErrors((prev) => new Set(prev).add(index));
    setLoaded((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  }, []);

  const isLoading = useCallback(
    (index: number) => !loaded.has(index) && !errors.has(index),
    [loaded, errors]
  );

  const hasError = useCallback((index: number) => errors.has(index), [errors]);

  const reset = useCallback(() => {
    setLoaded(new Set());
    setErrors(new Set());
  }, []);

  // Computed values using imageCount
  const loadedCount = loaded.size;
  const errorCount = errors.size;

  const isAllLoaded = useMemo(() => {
    if (imageCount === 0) return false;
    return loaded.size === imageCount && errors.size === 0;
  }, [loaded.size, errors.size, imageCount]);

  const loadingProgress = useMemo(() => {
    if (imageCount === 0) return 0;
    return Math.round(((loaded.size + errors.size) / imageCount) * 100);
  }, [loaded.size, errors.size, imageCount]);

  return {
    loaded,
    errors,
    isLoading,
    hasError,
    handleLoad,
    handleError,
    reset,
    isAllLoaded,
    loadedCount,
    errorCount,
    loadingProgress,
  };
}
