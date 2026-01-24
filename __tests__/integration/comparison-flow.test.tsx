/**
 * @fileoverview Integration tests for product comparison functionality.
 * Tests the complete comparison flow including add/remove, limits, and persistence.
 * @module __tests__/integration/comparison-flow.test
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComparisonProvider, useComparison } from '@/contexts/ComparisonContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { Product } from '@/types';

// Mock products for testing
const createMockProduct = (id: string, name: string, price: number): Product => ({
  id,
  name,
  price,
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

const products = [
  createMockProduct('product-1', 'Product 1', 1000),
  createMockProduct('product-2', 'Product 2', 1500),
  createMockProduct('product-3', 'Product 3', 2000),
  createMockProduct('product-4', 'Product 4', 2500),
  createMockProduct('product-5', 'Product 5', 3000),
];

// Test component that uses comparison context
function ComparisonTestComponent() {
  const {
    comparisonProducts,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
  } = useComparison();

  return (
    <div>
      <div data-testid="comparison-count">{comparisonProducts.length}</div>

      {products.map((product) => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          <span>{product.name}</span>
          <span data-testid={`in-comparison-${product.id}`}>
            {isInComparison(product.id) ? 'comparing' : 'not-comparing'}
          </span>
          <button data-testid={`add-${product.id}`} onClick={() => addToComparison(product)}>
            Add to Compare
          </button>
          <button
            data-testid={`remove-${product.id}`}
            onClick={() => removeFromComparison(product.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <button data-testid="clear-comparison" onClick={() => clearComparison()}>
        Clear All
      </button>

      <div data-testid="comparison-list">
        {comparisonProducts.map((product) => (
          <div key={product.id} data-testid={`comparing-${product.id}`}>
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
}

describe('Comparison Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Add to Comparison Flow', () => {
    it('should add a product to comparison', async () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Initially empty
      expect(screen.getByTestId('comparison-count').textContent).toBe('0');
      expect(screen.getByTestId('in-comparison-product-1').textContent).toBe('not-comparing');

      // Add product
      fireEvent.click(screen.getByTestId('add-product-1'));

      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('1');
        expect(screen.getByTestId('in-comparison-product-1').textContent).toBe('comparing');
        expect(screen.getByTestId('comparing-product-1')).toBeInTheDocument();
      });
    });

    it('should add multiple products to comparison', async () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Add three products
      fireEvent.click(screen.getByTestId('add-product-1'));
      fireEvent.click(screen.getByTestId('add-product-2'));
      fireEvent.click(screen.getByTestId('add-product-3'));

      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('3');
        expect(screen.getByTestId('comparing-product-1')).toBeInTheDocument();
        expect(screen.getByTestId('comparing-product-2')).toBeInTheDocument();
        expect(screen.getByTestId('comparing-product-3')).toBeInTheDocument();
      });
    });

    it('should not add duplicate products', async () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Add same product twice
      fireEvent.click(screen.getByTestId('add-product-1'));
      fireEvent.click(screen.getByTestId('add-product-1'));

      await waitFor(() => {
        // Should still only have 1 product (or toggle behavior)
        const count = parseInt(screen.getByTestId('comparison-count').textContent || '0');
        expect(count).toBeLessThanOrEqual(1);
      });
    });

    it('should enforce maximum 4 products limit', async () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Add 4 products
      fireEvent.click(screen.getByTestId('add-product-1'));
      fireEvent.click(screen.getByTestId('add-product-2'));
      fireEvent.click(screen.getByTestId('add-product-3'));
      fireEvent.click(screen.getByTestId('add-product-4'));

      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('4');
      });

      // Try to add 5th product
      fireEvent.click(screen.getByTestId('add-product-5'));

      // Should still be 4
      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('4');
        expect(screen.queryByTestId('comparing-product-5')).not.toBeInTheDocument();
      });
    });
  });

  describe('Remove from Comparison Flow', () => {
    it('should remove a product from comparison', async () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Add products
      fireEvent.click(screen.getByTestId('add-product-1'));
      fireEvent.click(screen.getByTestId('add-product-2'));

      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('2');
      });

      // Remove one product
      fireEvent.click(screen.getByTestId('remove-product-1'));

      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('1');
        expect(screen.queryByTestId('comparing-product-1')).not.toBeInTheDocument();
        expect(screen.getByTestId('comparing-product-2')).toBeInTheDocument();
        expect(screen.getByTestId('in-comparison-product-1').textContent).toBe('not-comparing');
      });
    });

    it('should clear all products from comparison', async () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Add products
      fireEvent.click(screen.getByTestId('add-product-1'));
      fireEvent.click(screen.getByTestId('add-product-2'));
      fireEvent.click(screen.getByTestId('add-product-3'));

      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('3');
      });

      // Clear all
      fireEvent.click(screen.getByTestId('clear-comparison'));

      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('0');
        expect(screen.queryByTestId('comparing-product-1')).not.toBeInTheDocument();
        expect(screen.queryByTestId('comparing-product-2')).not.toBeInTheDocument();
        expect(screen.queryByTestId('comparing-product-3')).not.toBeInTheDocument();
      });
    });
  });

  describe('Toggle Behavior', () => {
    it('should toggle product comparison state', async () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Add product
      fireEvent.click(screen.getByTestId('add-product-1'));

      await waitFor(() => {
        expect(screen.getByTestId('in-comparison-product-1').textContent).toBe('comparing');
      });

      // Remove via remove button
      fireEvent.click(screen.getByTestId('remove-product-1'));

      await waitFor(() => {
        expect(screen.getByTestId('in-comparison-product-1').textContent).toBe('not-comparing');
      });

      // Add again
      fireEvent.click(screen.getByTestId('add-product-1'));

      await waitFor(() => {
        expect(screen.getByTestId('in-comparison-product-1').textContent).toBe('comparing');
      });
    });
  });

  describe('localStorage Persistence', () => {
    it('should persist comparison to localStorage', async () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Add products
      fireEvent.click(screen.getByTestId('add-product-1'));
      fireEvent.click(screen.getByTestId('add-product-2'));

      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('2');
      });

      // Check localStorage
      await waitFor(() => {
        const saved = localStorage.getItem('product-comparison');
        expect(saved).not.toBeNull();
        if (saved) {
          const parsed = JSON.parse(saved);
          expect(parsed).toHaveLength(2);
        }
      });
    });

    it('should load comparison from localStorage on mount', async () => {
      // Pre-populate localStorage
      const savedData = [products[0], products[1]];
      localStorage.setItem('product-comparison', JSON.stringify(savedData));

      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Should load from localStorage
      await waitFor(() => {
        expect(screen.getByTestId('comparison-count').textContent).toBe('2');
        expect(screen.getByTestId('in-comparison-product-1').textContent).toBe('comparing');
        expect(screen.getByTestId('in-comparison-product-2').textContent).toBe('comparing');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty comparison list', () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      expect(screen.getByTestId('comparison-count').textContent).toBe('0');
      expect(screen.getByTestId('comparison-list').children).toHaveLength(0);
    });

    it('should handle removing non-existent product gracefully', async () => {
      render(
        <ToastProvider>
          <ComparisonProvider>
            <ComparisonTestComponent />
          </ComparisonProvider>
        </ToastProvider>
      );

      // Try to remove product that was never added
      fireEvent.click(screen.getByTestId('remove-product-1'));

      // Should not throw, count should still be 0
      expect(screen.getByTestId('comparison-count').textContent).toBe('0');
    });
  });
});
