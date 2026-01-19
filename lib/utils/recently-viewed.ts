const STORAGE_KEY = 'papalote-recently-viewed';
const MAX_ITEMS = 10;

export interface RecentlyViewedItem {
  id: string;
  viewedAt: string;
}

/**
 * Get recently viewed product IDs from localStorage
 */
export function getRecentlyViewedIds(): RecentlyViewedItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading recently viewed:', error);
    return [];
  }
}

/**
 * Add a product to recently viewed
 */
export function addToRecentlyViewed(productId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const items = getRecentlyViewedIds();

    // Remove if already exists (to move to front)
    const filtered = items.filter((item) => item.id !== productId);

    // Add to beginning
    const updated: RecentlyViewedItem[] = [
      { id: productId, viewedAt: new Date().toISOString() },
      ...filtered,
    ].slice(0, MAX_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recently viewed:', error);
  }
}

/**
 * Clear recently viewed history
 */
export function clearRecentlyViewed(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get recently viewed product IDs (excluding current product)
 */
export function getRecentlyViewedIdsExcluding(excludeId?: string): string[] {
  const items = getRecentlyViewedIds();
  return items.filter((item) => item.id !== excludeId).map((item) => item.id);
}
