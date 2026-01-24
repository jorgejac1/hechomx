import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { ComparisonProvider, useComparison } from '../ComparisonContext';
import { ToastProvider } from '../ToastContext';
import { Product } from '@/types';

// Mock product for testing
const createMockProduct = (id: string): Product => ({
  id,
  name: `Product ${id}`,
  slug: `product-${id}`,
  description: 'Test description',
  price: 100,
  originalPrice: 120,
  discount: 20,
  images: ['https://example.com/image.jpg'],
  category: 'Textiles',
  subcategory: 'Ropa',
  artisan: {
    id: 'artisan-1',
    name: 'Test Artisan',
    location: 'Oaxaca',
  },
  rating: 4.5,
  reviews: 10,
  stock: 50,
  isNew: false,
  isFeatured: false,
  tags: ['test'],
  materials: ['cotton'],
  techniques: ['handwoven'],
  origin: 'Oaxaca',
  createdAt: '2024-01-01',
});

// Wrapper component that provides both contexts
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ComparisonProvider>{children}</ComparisonProvider>
    </ToastProvider>
  );
}

// Test component that uses useComparison
function ComparisonTestComponent() {
  const {
    products,
    comparisonProducts,
    count,
    isEmpty,
    isFull,
    add,
    addToComparison,
    remove,
    removeFromComparison,
    clear,
    clearComparison,
    toggle,
    isComparing,
    isInComparison,
  } = useComparison();

  const product1 = createMockProduct('1');
  const product2 = createMockProduct('2');
  const product3 = createMockProduct('3');
  const product4 = createMockProduct('4');
  const product5 = createMockProduct('5');

  return (
    <div>
      <span data-testid="count">{count}</span>
      <span data-testid="products-length">{products.length}</span>
      <span data-testid="comparison-products-length">{comparisonProducts.length}</span>
      <span data-testid="is-empty">{isEmpty ? 'yes' : 'no'}</span>
      <span data-testid="is-full">{isFull ? 'yes' : 'no'}</span>
      <span data-testid="is-comparing-1">{isComparing('1') ? 'yes' : 'no'}</span>
      <span data-testid="is-in-comparison-1">{isInComparison('1') ? 'yes' : 'no'}</span>
      <button data-testid="add-1" onClick={() => add(product1)}>
        Add 1
      </button>
      <button data-testid="add-to-comparison-2" onClick={() => addToComparison(product2)}>
        Add 2
      </button>
      <button data-testid="add-3" onClick={() => add(product3)}>
        Add 3
      </button>
      <button data-testid="add-4" onClick={() => add(product4)}>
        Add 4
      </button>
      <button data-testid="add-5" onClick={() => add(product5)}>
        Add 5 (over limit)
      </button>
      <button data-testid="remove-1" onClick={() => remove('1')}>
        Remove 1
      </button>
      <button data-testid="remove-from-comparison-2" onClick={() => removeFromComparison('2')}>
        Remove 2
      </button>
      <button data-testid="clear" onClick={clear}>
        Clear
      </button>
      <button data-testid="clear-comparison" onClick={clearComparison}>
        Clear Comparison
      </button>
      <button data-testid="toggle-1" onClick={() => toggle(product1)}>
        Toggle 1
      </button>
    </div>
  );
}

describe('ComparisonContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('ComparisonProvider', () => {
    it('provides comparison context to children', () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('count').textContent).toBe('0');
      expect(screen.getByTestId('is-empty').textContent).toBe('yes');
    });

    it('has max of 4 products (isFull becomes true at 4)', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      // Add 4 products
      fireEvent.click(screen.getByTestId('add-1'));
      fireEvent.click(screen.getByTestId('add-to-comparison-2'));
      fireEvent.click(screen.getByTestId('add-3'));
      fireEvent.click(screen.getByTestId('add-4'));

      await waitFor(() => {
        expect(screen.getByTestId('is-full').textContent).toBe('yes');
      });
    });
  });

  describe('useComparison hook', () => {
    it('throws error when used outside ComparisonProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useComparison());
      }).toThrow('useComparison must be used within a ComparisonProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('add / addToComparison', () => {
    it('adds a product to comparison', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));

      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('1');
        expect(screen.getByTestId('is-empty').textContent).toBe('no');
        expect(screen.getByTestId('is-comparing-1').textContent).toBe('yes');
      });
    });

    it('addToComparison works as alias for add', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-to-comparison-2'));

      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('1');
      });
    });

    it('adds multiple products', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));
      fireEvent.click(screen.getByTestId('add-to-comparison-2'));
      fireEvent.click(screen.getByTestId('add-3'));

      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('3');
      });
    });

    it('shows toast when limit is reached', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      // Add 4 products
      fireEvent.click(screen.getByTestId('add-1'));
      fireEvent.click(screen.getByTestId('add-to-comparison-2'));
      fireEvent.click(screen.getByTestId('add-3'));
      fireEvent.click(screen.getByTestId('add-4'));

      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('4');
        expect(screen.getByTestId('is-full').textContent).toBe('yes');
      });

      // Try to add 5th product
      fireEvent.click(screen.getByTestId('add-5'));

      // Should show toast notification
      await waitFor(() => {
        expect(
          screen.getByText('Máximo 4 productos en comparación. Quita uno para agregar otro.')
        ).toBeInTheDocument();
      });

      // Count should still be 4
      expect(screen.getByTestId('count').textContent).toBe('4');
    });
  });

  describe('remove / removeFromComparison', () => {
    it('removes a product from comparison', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));
      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('1');
      });

      fireEvent.click(screen.getByTestId('remove-1'));

      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('0');
        expect(screen.getByTestId('is-comparing-1').textContent).toBe('no');
      });
    });

    it('removeFromComparison works as alias for remove', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-to-comparison-2'));
      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('1');
      });

      fireEvent.click(screen.getByTestId('remove-from-comparison-2'));

      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('0');
      });
    });
  });

  describe('clear / clearComparison', () => {
    it('clears all products from comparison', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));
      fireEvent.click(screen.getByTestId('add-to-comparison-2'));
      fireEvent.click(screen.getByTestId('add-3'));

      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('3');
      });

      fireEvent.click(screen.getByTestId('clear'));

      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('0');
        expect(screen.getByTestId('is-empty').textContent).toBe('yes');
      });
    });

    it('clearComparison works as alias for clear', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));
      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('1');
      });

      fireEvent.click(screen.getByTestId('clear-comparison'));

      await waitFor(() => {
        expect(screen.getByTestId('count').textContent).toBe('0');
      });
    });
  });

  describe('toggle', () => {
    it('adds product when not in comparison', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('is-comparing-1').textContent).toBe('no');

      fireEvent.click(screen.getByTestId('toggle-1'));

      await waitFor(() => {
        expect(screen.getByTestId('is-comparing-1').textContent).toBe('yes');
        expect(screen.getByTestId('count').textContent).toBe('1');
      });
    });

    it('removes product when already in comparison', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));
      await waitFor(() => {
        expect(screen.getByTestId('is-comparing-1').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('toggle-1'));

      await waitFor(() => {
        expect(screen.getByTestId('is-comparing-1').textContent).toBe('no');
        expect(screen.getByTestId('count').textContent).toBe('0');
      });
    });
  });

  describe('isComparing / isInComparison', () => {
    it('returns correct value for products', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('is-comparing-1').textContent).toBe('no');
      expect(screen.getByTestId('is-in-comparison-1').textContent).toBe('no');

      fireEvent.click(screen.getByTestId('add-1'));

      await waitFor(() => {
        expect(screen.getByTestId('is-comparing-1').textContent).toBe('yes');
        expect(screen.getByTestId('is-in-comparison-1').textContent).toBe('yes');
      });
    });
  });

  describe('products / comparisonProducts aliases', () => {
    it('both return the same product list', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));
      fireEvent.click(screen.getByTestId('add-to-comparison-2'));

      await waitFor(() => {
        expect(screen.getByTestId('products-length').textContent).toBe('2');
        expect(screen.getByTestId('comparison-products-length').textContent).toBe('2');
      });
    });
  });

  describe('isEmpty and isFull', () => {
    it('isEmpty is true when no products', () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('is-empty').textContent).toBe('yes');
    });

    it('isEmpty is false when products exist', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));

      await waitFor(() => {
        expect(screen.getByTestId('is-empty').textContent).toBe('no');
      });
    });

    it('isFull is false when under limit', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));

      await waitFor(() => {
        expect(screen.getByTestId('is-full').textContent).toBe('no');
      });
    });

    it('isFull is true when at limit', async () => {
      render(
        <TestWrapper>
          <ComparisonTestComponent />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('add-1'));
      fireEvent.click(screen.getByTestId('add-to-comparison-2'));
      fireEvent.click(screen.getByTestId('add-3'));
      fireEvent.click(screen.getByTestId('add-4'));

      await waitFor(() => {
        expect(screen.getByTestId('is-full').textContent).toBe('yes');
      });
    });
  });
});
