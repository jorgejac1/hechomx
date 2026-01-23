/**
 * @fileoverview CSS media query listener hook
 * Tracks media query matches for responsive design and user preference detection
 * @module hooks/common/useMediaQuery
 */

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design
 * Listens to media query changes
 *
 * @param query - CSS media query string
 * @returns boolean - true if media query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
