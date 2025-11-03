import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Generic carousel state management
 * 
 * @param itemCount - Total number of items
 * @param options - Configuration options
 * @returns Carousel controls
 * 
 * @example
 * const { currentIndex, next, previous, goTo, isFirst, isLast } = 
 *   useCarousel(products.length, { loop: true, autoPlay: false });
 */
export interface UseCarouselOptions {
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  initialIndex?: number;
}

export interface UseCarouselReturn {
  currentIndex: number;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

export function useCarousel(
  itemCount: number,
  options: UseCarouselOptions = {}
): UseCarouselReturn {
  const {
    loop = false,
    autoPlay = false,
    autoPlayInterval = 3000,
    initialIndex = 0,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= itemCount - 1) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [itemCount, loop]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return loop ? itemCount - 1 : prev;
      }
      return prev - 1;
    });
  }, [itemCount, loop]);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < itemCount) {
        setCurrentIndex(index);
      }
    },
    [itemCount]
  );

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === itemCount - 1;

  // Auto-play
  useEffect(() => {
    if (autoPlay && itemCount > 1) {
      intervalRef.current = setInterval(() => {
        next();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, next, itemCount]);

  return {
    currentIndex,
    next,
    previous,
    goTo,
    isFirst,
    isLast,
  };
}