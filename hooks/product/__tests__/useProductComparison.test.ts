/**
 * @fileoverview Unit tests for useProductComparison hook.
 * Tests localStorage persistence, error handling, analytics, and toggle functionality.
 * @module hooks/product/__tests__/useProductComparison.test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useProductComparison } from '../useProductComparison';
import { Product } from '@/types';

// Mock product factory
const createMockProduct = (id: string, name: string = `Product ${id}`): Product => ({
  id,
  name,
  price: 1000,
  currency: 'MXN',
  description: `Description for ${name}`,
  images: [`https://example.com/${id}.jpg`],
  category: 'Textiles',
  state: 'Oaxaca',
  maker: 'Test Artisan',
  inStock: true,
  stock: 10,
  rating: 4.5,
  reviewCount: 25,
});

describe('useProductComparison', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    // Clear gtag mock
    delete (window as { gtag?: unknown }).gtag;
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('Basic Functionality', () => {
    it('should initialize with empty products', () => {
      const { result } = renderHook(() => useProductComparison());

      expect(result.current.products).toEqual([]);
      expect(result.current.count).toBe(0);
      expect(result.current.isEmpty).toBe(true);
      expect(result.current.canAdd).toBe(true);
      expect(result.current.isFull).toBe(false);
      expect(result.current.canCompare).toBe(false);
    });

    it('should add a product', () => {
      const { result } = renderHook(() => useProductComparison());
      const product = createMockProduct('1');

      act(() => {
        const added = result.current.add(product);
        expect(added).toBe(true);
      });

      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].id).toBe('1');
      expect(result.current.count).toBe(1);
      expect(result.current.isEmpty).toBe(false);
    });

    it('should not add duplicate products', () => {
      const { result } = renderHook(() => useProductComparison());
      const product = createMockProduct('1');

      act(() => {
        result.current.add(product);
      });

      let addedAgain: boolean;
      act(() => {
        addedAgain = result.current.add(product);
      });

      expect(addedAgain!).toBe(false);
      expect(result.current.products).toHaveLength(1);
    });

    it('should remove a product', () => {
      const { result } = renderHook(() => useProductComparison());
      const product = createMockProduct('1');

      act(() => {
        result.current.add(product);
      });

      expect(result.current.products).toHaveLength(1);

      act(() => {
        result.current.remove('1');
      });

      expect(result.current.products).toHaveLength(0);
      expect(result.current.isEmpty).toBe(true);
    });

    it('should clear all products', () => {
      const { result } = renderHook(() => useProductComparison());

      act(() => {
        result.current.add(createMockProduct('1'));
        result.current.add(createMockProduct('2'));
        result.current.add(createMockProduct('3'));
      });

      expect(result.current.count).toBe(3);

      act(() => {
        result.current.clear();
      });

      expect(result.current.products).toHaveLength(0);
      expect(result.current.isEmpty).toBe(true);
    });

    it('should check if product is comparing', () => {
      const { result } = renderHook(() => useProductComparison());
      const product = createMockProduct('1');

      expect(result.current.isComparing('1')).toBe(false);

      act(() => {
        result.current.add(product);
      });

      expect(result.current.isComparing('1')).toBe(true);
      expect(result.current.isComparing('2')).toBe(false);
    });
  });

  describe('Toggle Functionality (Lines 175-178)', () => {
    it('should add product when toggling non-comparing product', () => {
      const { result } = renderHook(() => useProductComparison());
      const product = createMockProduct('1');

      expect(result.current.isComparing('1')).toBe(false);

      act(() => {
        result.current.toggle(product);
      });

      expect(result.current.isComparing('1')).toBe(true);
      expect(result.current.products).toHaveLength(1);
    });

    it('should remove product when toggling comparing product', () => {
      const { result } = renderHook(() => useProductComparison());
      const product = createMockProduct('1');

      // First add the product
      act(() => {
        result.current.add(product);
      });

      expect(result.current.isComparing('1')).toBe(true);

      // Now toggle should remove it
      act(() => {
        result.current.toggle(product);
      });

      expect(result.current.isComparing('1')).toBe(false);
      expect(result.current.products).toHaveLength(0);
    });

    it('should toggle between add and remove states', () => {
      const { result } = renderHook(() => useProductComparison());
      const product = createMockProduct('1');

      // Toggle on
      act(() => {
        result.current.toggle(product);
      });
      expect(result.current.isComparing('1')).toBe(true);

      // Toggle off
      act(() => {
        result.current.toggle(product);
      });
      expect(result.current.isComparing('1')).toBe(false);

      // Toggle on again
      act(() => {
        result.current.toggle(product);
      });
      expect(result.current.isComparing('1')).toBe(true);
    });
  });

  describe('Max Products Limit', () => {
    it('should enforce max products limit', () => {
      const { result } = renderHook(() => useProductComparison({ maxProducts: 3 }));

      act(() => {
        result.current.add(createMockProduct('1'));
        result.current.add(createMockProduct('2'));
        result.current.add(createMockProduct('3'));
      });

      expect(result.current.count).toBe(3);
      expect(result.current.isFull).toBe(true);
      expect(result.current.canAdd).toBe(false);

      act(() => {
        const added = result.current.add(createMockProduct('4'));
        expect(added).toBe(false);
      });

      expect(result.current.count).toBe(3);
    });

    it('should call onLimitReached when limit is reached', () => {
      const onLimitReached = vi.fn();
      const { result } = renderHook(() => useProductComparison({ maxProducts: 2, onLimitReached }));

      act(() => {
        result.current.add(createMockProduct('1'));
        result.current.add(createMockProduct('2'));
      });

      expect(onLimitReached).not.toHaveBeenCalled();

      act(() => {
        result.current.add(createMockProduct('3'));
      });

      expect(onLimitReached).toHaveBeenCalledTimes(1);
    });

    it('should set canCompare to true when 2 or more products', () => {
      const { result } = renderHook(() => useProductComparison());

      expect(result.current.canCompare).toBe(false);

      act(() => {
        result.current.add(createMockProduct('1'));
      });

      expect(result.current.canCompare).toBe(false);

      act(() => {
        result.current.add(createMockProduct('2'));
      });

      expect(result.current.canCompare).toBe(true);
    });
  });

  describe('Callbacks', () => {
    it('should call onAdd when product is added', () => {
      const onAdd = vi.fn();
      const { result } = renderHook(() => useProductComparison({ onAdd }));
      const product = createMockProduct('1');

      act(() => {
        result.current.add(product);
      });

      expect(onAdd).toHaveBeenCalledWith(product);
    });

    it('should call onRemove when product is removed', () => {
      const onRemove = vi.fn();
      const { result } = renderHook(() => useProductComparison({ onRemove }));
      const product = createMockProduct('1');

      act(() => {
        result.current.add(product);
        result.current.remove('1');
      });

      expect(onRemove).toHaveBeenCalledWith('1');
    });

    it('should call onClear when comparison is cleared', () => {
      const onClear = vi.fn();
      const { result } = renderHook(() => useProductComparison({ onClear }));

      act(() => {
        result.current.add(createMockProduct('1'));
        result.current.clear();
      });

      expect(onClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('localStorage Persistence', () => {
    it('should save to localStorage when products change', async () => {
      const { result } = renderHook(() => useProductComparison({ storageKey: 'test-comparison' }));

      act(() => {
        result.current.add(createMockProduct('1'));
      });

      await waitFor(() => {
        const stored = localStorage.getItem('test-comparison');
        expect(stored).not.toBeNull();
        const parsed = JSON.parse(stored!);
        expect(parsed).toHaveLength(1);
        expect(parsed[0].id).toBe('1');
      });
    });

    it('should load from localStorage on init', () => {
      const product = createMockProduct('pre-saved');
      localStorage.setItem('test-comparison', JSON.stringify([product]));

      const { result } = renderHook(() => useProductComparison({ storageKey: 'test-comparison' }));

      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].id).toBe('pre-saved');
    });

    it('should not persist when persistToStorage is false', async () => {
      const { result } = renderHook(() =>
        useProductComparison({ persistToStorage: false, storageKey: 'no-persist' })
      );

      act(() => {
        result.current.add(createMockProduct('1'));
      });

      // Wait a tick for any potential async operations
      await waitFor(() => {
        const stored = localStorage.getItem('no-persist');
        expect(stored).toBeNull();
      });
    });
  });

  describe('Corrupted localStorage Handling (Lines 70-76)', () => {
    it('should handle corrupted localStorage data gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Set corrupted data
      localStorage.setItem('corrupted-comparison', 'not-valid-json{{{');

      const { result } = renderHook(() =>
        useProductComparison({ storageKey: 'corrupted-comparison' })
      );

      // Should start with empty products despite corrupted data
      expect(result.current.products).toEqual([]);
      expect(result.current.isEmpty).toBe(true);

      // Should have logged error
      expect(consoleSpy).toHaveBeenCalledWith(
        '[useProductComparison] Failed to load comparison from storage - data corrupted:',
        expect.any(SyntaxError)
      );

      // The useEffect will then save the empty array, so we check that it was cleaned up
      // by verifying the state is empty (the localStorage will be overwritten with '[]')
      await waitFor(() => {
        const stored = localStorage.getItem('corrupted-comparison');
        // After state init, useEffect saves the empty array
        expect(stored === null || stored === '[]').toBe(true);
      });

      consoleSpy.mockRestore();
    });

    it('should handle non-array JSON in localStorage', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Set valid JSON but not an array
      localStorage.setItem('non-array-comparison', JSON.stringify({ notAnArray: true }));

      const { result } = renderHook(() =>
        useProductComparison({ storageKey: 'non-array-comparison' })
      );

      // Should return empty array when stored data is not an array
      expect(result.current.products).toEqual([]);

      consoleSpy.mockRestore();
    });
  });

  describe('localStorage Quota Error Handling (Lines 92-93)', () => {
    it('should handle QuotaExceededError by name when saving', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Mock localStorage.setItem to throw QuotaExceededError by name
      const quotaError = new DOMException('Storage quota exceeded', 'QuotaExceededError');
      const originalSetItem = localStorage.setItem.bind(localStorage);
      vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
        if (key === 'quota-test') {
          throw quotaError;
        }
        return originalSetItem(key, value);
      });

      const { result } = renderHook(() => useProductComparison({ storageKey: 'quota-test' }));

      act(() => {
        result.current.add(createMockProduct('1'));
      });

      // Wait for the useEffect to run
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          '[useProductComparison] Failed to save comparison - storage quota exceeded:',
          quotaError
        );
      });

      // Product should still be added to state
      expect(result.current.products).toHaveLength(1);

      consoleSpy.mockRestore();
    });

    it('should handle generic localStorage errors when saving', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Mock localStorage.setItem to throw generic error
      const genericError = new Error('Generic storage error');
      const originalSetItem = localStorage.setItem.bind(localStorage);
      vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
        if (key === 'generic-error-test') {
          throw genericError;
        }
        return originalSetItem(key, value);
      });

      const { result } = renderHook(() =>
        useProductComparison({ storageKey: 'generic-error-test' })
      );

      act(() => {
        result.current.add(createMockProduct('1'));
      });

      // Wait for the useEffect to run
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          '[useProductComparison] Failed to save comparison:',
          genericError
        );
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Analytics/gtag Integration (Line 104)', () => {
    it('should call gtag when adding a product', () => {
      const mockGtag = vi.fn();
      (window as { gtag?: typeof mockGtag }).gtag = mockGtag;

      const { result } = renderHook(() => useProductComparison());
      const product = createMockProduct('1', 'Test Product');

      act(() => {
        result.current.add(product);
      });

      // The trackEvent is called with products.length at time of callback creation
      // which is 0 (before the add completes in state)
      expect(mockGtag).toHaveBeenCalledWith('event', 'product_added_to_comparison', {
        product_id: '1',
        product_name: 'Test Product',
        product_category: 'Textiles',
        comparison_count: 0,
      });
    });

    it('should call gtag when removing a product', () => {
      const mockGtag = vi.fn();
      (window as { gtag?: typeof mockGtag }).gtag = mockGtag;

      const { result } = renderHook(() => useProductComparison());
      const product = createMockProduct('1', 'Test Product');

      act(() => {
        result.current.add(product);
      });

      mockGtag.mockClear();

      act(() => {
        result.current.remove('1');
      });

      // The trackEvent is called with products.length at time of callback creation
      // which is 1 (before the remove completes in state)
      expect(mockGtag).toHaveBeenCalledWith('event', 'product_removed_from_comparison', {
        product_id: '1',
        product_name: 'Test Product',
        comparison_count: 1,
      });
    });

    it('should call gtag when clearing comparison', () => {
      const mockGtag = vi.fn();
      (window as { gtag?: typeof mockGtag }).gtag = mockGtag;

      const { result } = renderHook(() => useProductComparison());

      act(() => {
        result.current.add(createMockProduct('1'));
        result.current.add(createMockProduct('2'));
      });

      mockGtag.mockClear();

      act(() => {
        result.current.clear();
      });

      // The trackEvent is called with products.length at time of callback creation
      // which is 2 (before the clear completes in state)
      expect(mockGtag).toHaveBeenCalledWith('event', 'comparison_cleared', {
        products_count: 2,
        comparison_count: 2,
      });
    });

    it('should call gtag when limit is reached', () => {
      const mockGtag = vi.fn();
      (window as { gtag?: typeof mockGtag }).gtag = mockGtag;

      const { result } = renderHook(() => useProductComparison({ maxProducts: 2 }));

      act(() => {
        result.current.add(createMockProduct('1'));
        result.current.add(createMockProduct('2'));
      });

      mockGtag.mockClear();

      act(() => {
        result.current.add(createMockProduct('3'));
      });

      expect(mockGtag).toHaveBeenCalledWith('event', 'comparison_limit_reached', {
        max_products: 2,
        comparison_count: 2,
      });
    });

    it('should not call gtag when window.gtag is undefined', () => {
      // Ensure gtag is not defined
      delete (window as { gtag?: unknown }).gtag;

      const { result } = renderHook(() => useProductComparison());

      // Should not throw
      act(() => {
        result.current.add(createMockProduct('1'));
        result.current.remove('1');
        result.current.clear();
      });

      expect(result.current.isEmpty).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle removing non-existent product', () => {
      const { result } = renderHook(() => useProductComparison());

      act(() => {
        result.current.add(createMockProduct('1'));
      });

      act(() => {
        result.current.remove('non-existent');
      });

      expect(result.current.products).toHaveLength(1);
    });

    it('should use custom storage key', async () => {
      const { result } = renderHook(() => useProductComparison({ storageKey: 'custom-key' }));

      act(() => {
        result.current.add(createMockProduct('1'));
      });

      await waitFor(() => {
        expect(localStorage.getItem('custom-key')).not.toBeNull();
        expect(localStorage.getItem('product-comparison')).toBeNull();
      });
    });
  });
});
