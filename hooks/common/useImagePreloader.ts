import { useEffect } from 'react';

/**
 * Preloads adjacent images for better UX
 * 
 * @param urls - Array of image URLs
 * @param currentIndex - Current active index
 * @param options - Configuration options
 * 
 * @example
 * useImagePreloader(imageUrls, selectedIndex, { adjacentCount: 2 });
 */
export interface UseImagePreloaderOptions {
  adjacentCount?: number; // How many adjacent images to preload (default: 1)
  priority?: 'low' | 'high';
}

export function useImagePreloader(
  urls: string[],
  currentIndex: number,
  options: UseImagePreloaderOptions = {}
): void {
  const { adjacentCount = 1, priority = 'low' } = options;

  useEffect(() => {
    if (!urls.length) return;

    // Calculate indices to preload
    const indicesToPreload: number[] = [];
    
    for (let i = 1; i <= adjacentCount; i++) {
      // Next images
      const nextIndex = (currentIndex + i) % urls.length;
      indicesToPreload.push(nextIndex);
      
      // Previous images
      const prevIndex = (currentIndex - i + urls.length) % urls.length;
      indicesToPreload.push(prevIndex);
    }

    // Preload images
    indicesToPreload.forEach((index) => {
      const img = new Image();
      
      if (priority === 'high') {
        img.loading = 'eager';
      }
      
      img.src = urls[index];
    });
  }, [urls, currentIndex, adjacentCount, priority]);
}