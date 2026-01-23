/**
 * @fileoverview Slideshow autoplay functionality hook
 * Manages automatic slide advancement with play, pause, and toggle controls
 * @module hooks/media/useSlideshow
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Slideshow/autoplay functionality
 *
 * @param itemCount - Total number of items
 * @param interval - Time between slides in ms
 * @param onIndexChange - Callback when index changes
 * @returns Slideshow controls
 *
 * @example
 * const { isPlaying, toggle, currentIndex } = useSlideshow(
 *   images.length,
 *   3000,
 *   setSelectedIndex
 * );
 */
export interface UseSlideshowReturn {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  currentIndex: number;
}

export function useSlideshow(
  itemCount: number,
  interval: number = 3000,
  onIndexChange?: (index: number) => void
): UseSlideshowReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isPlaying && itemCount > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % itemCount;
          onIndexChange?.(nextIndex);
          return nextIndex;
        });
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, itemCount, interval, onIndexChange]);

  return {
    isPlaying,
    play,
    pause,
    toggle,
    currentIndex,
  };
}
