/**
 * @fileoverview Cache utilities for API responses
 * Provides helper functions for setting appropriate cache headers on API responses.
 * @module lib/utils/cache
 */

/**
 * Cache duration presets in seconds
 */
export const CACHE_DURATIONS = {
  /** No caching - for user-specific or frequently changing data */
  NONE: 0,
  /** Short cache - 1 minute - for semi-dynamic data */
  SHORT: 60,
  /** Medium cache - 5 minutes - for moderately dynamic data */
  MEDIUM: 300,
  /** Long cache - 1 hour - for mostly static data */
  LONG: 3600,
  /** Extended cache - 24 hours - for static reference data */
  EXTENDED: 86400,
} as const;

/**
 * Creates cache control headers for API responses
 * @param duration - Cache duration in seconds (use CACHE_DURATIONS presets)
 * @param options - Additional cache options
 * @returns Headers object with appropriate cache control settings
 *
 * @example
 * // Short cache for product listings
 * return NextResponse.json(data, {
 *   headers: createCacheHeaders(CACHE_DURATIONS.SHORT)
 * });
 *
 * @example
 * // Private cache for user-specific data
 * return NextResponse.json(data, {
 *   headers: createCacheHeaders(CACHE_DURATIONS.MEDIUM, { private: true })
 * });
 */
export function createCacheHeaders(
  duration: number,
  options?: {
    /** Mark as private (not cached by CDN/proxy) */
    private?: boolean;
    /** Allow serving stale content while revalidating */
    staleWhileRevalidate?: number;
  }
): HeadersInit {
  if (duration === 0) {
    return {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Pragma: 'no-cache',
    };
  }

  const directives: string[] = [];

  // Public vs private
  directives.push(options?.private ? 'private' : 'public');

  // Max age
  directives.push(`max-age=${duration}`);

  // CDN cache (s-maxage)
  if (!options?.private) {
    directives.push(`s-maxage=${duration}`);
  }

  // Stale while revalidate
  if (options?.staleWhileRevalidate) {
    directives.push(`stale-while-revalidate=${options.staleWhileRevalidate}`);
  }

  return {
    'Cache-Control': directives.join(', '),
  };
}

/**
 * Common cache header presets for different data types
 */
export const CACHE_HEADERS = {
  /** For public product/shop listings - 1 min cache, 5 min stale */
  PUBLIC_LISTINGS: createCacheHeaders(CACHE_DURATIONS.SHORT, {
    staleWhileRevalidate: CACHE_DURATIONS.MEDIUM,
  }),

  /** For user-specific data (orders, favorites) - no cache */
  USER_DATA: createCacheHeaders(CACHE_DURATIONS.NONE),

  /** For reference data (categories, states) - 1 hour cache */
  REFERENCE_DATA: createCacheHeaders(CACHE_DURATIONS.LONG, {
    staleWhileRevalidate: CACHE_DURATIONS.EXTENDED,
  }),

  /** For analytics/insights - 5 min cache, private */
  ANALYTICS: createCacheHeaders(CACHE_DURATIONS.MEDIUM, {
    private: true,
    staleWhileRevalidate: CACHE_DURATIONS.LONG,
  }),
} as const;
