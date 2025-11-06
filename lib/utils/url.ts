/**
 * URL manipulation utilities
 */

/**
 * Build URL with query parameters
 */
export function buildUrl(
  base: string,
  params: Record<string, string | number | boolean | undefined | null>
): string {
  const url = new URL(base, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Parse query string to object
 */
export function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Get query parameter from URL
 */
export function getQueryParam(key: string): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/**
 * Update URL query parameters without reload
 */
export function updateQueryParams(
  params: Record<string, string | number | boolean | undefined | null>,
  replace: boolean = false
): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    } else {
      url.searchParams.delete(key);
    }
  });

  if (replace) {
    window.history.replaceState({}, '', url.toString());
  } else {
    window.history.pushState({}, '', url.toString());
  }
}

/**
 * Get absolute URL from relative path
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return new URL(path, baseUrl).toString();
}

/**
 * Check if URL is external
 */
export function isExternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
}
