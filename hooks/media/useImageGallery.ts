import { useState, useCallback } from 'react';
import { useImageLoadingState } from '../common/useImageLoadingState';
import { useImagePreloader } from '../common/useImagePreloader';
import { useSlideshow } from './useSlideshow';
import { useZoomControls } from './useZoomControls';

/**
 * Complete image gallery state (composition hook)
 * Combines multiple hooks for full gallery functionality
 *
 * @param images - Array of image URLs
 * @param options - Configuration options
 * @returns Complete gallery controls
 *
 * @example
 * const gallery = useImageGallery(product.images, {
 *   enableZoom: true,
 *   enableSlideshow: true,
 *   slideshowInterval: 3000,
 * });
 */
export interface UseImageGalleryOptions {
  enableZoom?: boolean;
  enableSlideshow?: boolean;
  enablePreload?: boolean;
  slideshowInterval?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
}

export interface UseImageGalleryReturn {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  next: () => void;
  previous: () => void;
  isFullscreen: boolean;
  openFullscreen: () => void;
  closeFullscreen: () => void;
  zoom: ReturnType<typeof useZoomControls>;
  slideshow: ReturnType<typeof useSlideshow>;
  loading: ReturnType<typeof useImageLoadingState>;
}

export function useImageGallery(
  images: string[],
  options: UseImageGalleryOptions = {}
): UseImageGalleryReturn {
  const {
    enableZoom = true,
    enableSlideshow = true,
    enablePreload = true,
    slideshowInterval = 3000,
    minZoom = 1,
    maxZoom = 3,
    zoomStep = 0.5,
  } = options;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use composed hooks
  const loading = useImageLoadingState(images.length);

  const zoom = useZoomControls(enableZoom ? minZoom : 1, enableZoom ? maxZoom : 1, zoomStep);

  const slideshow = useSlideshow(
    images.length,
    slideshowInterval,
    enableSlideshow ? setSelectedIndex : undefined
  );

  // Always call the hook, but pass enabled option
  useImagePreloader(enablePreload ? images : [], selectedIndex, { adjacentCount: 2 });

  const next = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previous = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    slideshow.pause();
    zoom.reset();
  }, [slideshow, zoom]);

  return {
    selectedIndex,
    setSelectedIndex,
    next,
    previous,
    isFullscreen,
    openFullscreen,
    closeFullscreen,
    zoom,
    slideshow,
    loading,
  };
}
