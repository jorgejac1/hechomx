import { useState, useEffect } from 'react';

/**
 * Detects if user prefers reduced motion
 * Respects OS-level accessibility settings
 * 
 * @returns boolean - true if user prefers reduced motion
 * 
 * @example
 * const prefersReducedMotion = usePrefersReducedMotion();
 * const duration = prefersReducedMotion ? 0 : 300;
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
}