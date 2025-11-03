import { useState, useCallback, useEffect } from 'react';
import { Product } from '@/types';

/**
 * Product comparison management hook
 * Handles adding/removing products, persistence, and analytics
 *
 * @param options - Configuration options
 * @returns Comparison state and controls
 *
 * @example
 * const { products, add, remove, clear, canAdd, isComparing } =
 *   useProductComparison({ maxProducts: 4, persistToStorage: true });
 */
export interface UseProductComparisonOptions {
  maxProducts?: number;
  persistToStorage?: boolean;
  storageKey?: string;
  onAdd?: (product: Product) => void;
  onRemove?: (productId: string) => void;
  onClear?: () => void;
  onLimitReached?: () => void;
}

export interface UseProductComparisonReturn {
  products: Product[];
  count: number;
  add: (product: Product) => boolean;
  remove: (productId: string) => void;
  clear: () => void;
  toggle: (product: Product) => void;
  isComparing: (productId: string) => boolean;
  canAdd: boolean;
  isFull: boolean;
  isEmpty: boolean;
  canCompare: boolean;
}

export function useProductComparison(
  options: UseProductComparisonOptions = {}
): UseProductComparisonReturn {
  const {
    maxProducts = 4,
    persistToStorage = true,
    storageKey = 'product-comparison',
    onAdd,
    onRemove,
    onClear,
    onLimitReached,
  } = options;

  // Initialize state from localStorage if enabled
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === 'undefined' || !persistToStorage) return [];

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('Failed to load comparison from storage:', error);
    }
    return [];
  });

  // Persist to localStorage whenever products change
  useEffect(() => {
    if (typeof window === 'undefined' || !persistToStorage) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(products));
    } catch (error) {
      console.error('Failed to save comparison to storage:', error);
    }
  }, [products, persistToStorage, storageKey]);

  // Track analytics
  const trackEvent = useCallback(
    (eventName: string, data?: Record<string, string | number | boolean>) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
          ...data,
          comparison_count: products.length,
        });
      }
    },
    [products.length]
  );

  // Add product to comparison
  const add = useCallback(
    (product: Product): boolean => {
      // Check if already in comparison
      if (products.some((p) => p.id === product.id)) {
        return false;
      }

      // Check if at max capacity
      if (products.length >= maxProducts) {
        onLimitReached?.();
        trackEvent('comparison_limit_reached', {
          max_products: maxProducts,
        });
        return false;
      }

      setProducts((prev) => [...prev, product]);
      onAdd?.(product);
      trackEvent('product_added_to_comparison', {
        product_id: product.id,
        product_name: product.name,
        product_category: product.category,
      });

      return true;
    },
    [products, maxProducts, onAdd, onLimitReached, trackEvent]
  );

  // Remove product from comparison
  const remove = useCallback(
    (productId: string): void => {
      const product = products.find((p) => p.id === productId);

      setProducts((prev) => prev.filter((p) => p.id !== productId));
      onRemove?.(productId);

      if (product) {
        trackEvent('product_removed_from_comparison', {
          product_id: productId,
          product_name: product.name,
        });
      }
    },
    [products, onRemove, trackEvent]
  );

  // Clear all products
  const clear = useCallback((): void => {
    const count = products.length;
    setProducts([]);
    onClear?.();

    trackEvent('comparison_cleared', {
      products_count: count,
    });
  }, [products.length, onClear, trackEvent]);

  // Toggle product (add if not present, remove if present)
  const toggle = useCallback(
    (product: Product): void => {
      if (products.some((p) => p.id === product.id)) {
        remove(product.id);
      } else {
        add(product);
      }
    },
    [products, add, remove]
  );

  // Check if product is in comparison
  const isComparing = useCallback(
    (productId: string): boolean => {
      return products.some((p) => p.id === productId);
    },
    [products]
  );

  // Computed properties
  const count = products.length;
  const canAdd = count < maxProducts;
  const isFull = count >= maxProducts;
  const isEmpty = count === 0;
  const canCompare = count >= 2;

  return {
    products,
    count,
    add,
    remove,
    clear,
    toggle,
    isComparing,
    canAdd,
    isFull,
    isEmpty,
    canCompare,
  };
}
