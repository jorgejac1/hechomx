import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { Product } from '@/types';

// Mock product for testing
const createMockProduct = (id: string, price: number = 100): Product => ({
  id,
  name: `Product ${id}`,
  description: 'Test description',
  price,
  currency: 'MXN',
  images: ['https://example.com/image.jpg'],
  category: 'Textiles',
  subcategory: 'Ropa',
  state: 'Oaxaca',
  maker: 'Test Artisan',
  inStock: true,
  rating: 4.5,
  reviewCount: 10,
  stock: 50,
  tags: ['test'],
  materials: ['cotton'],
  createdAt: '2024-01-01',
});

// Test component that uses useCart
function CartTestComponent({ product }: { product: Product }) {
  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  } = useCart();

  return (
    <div>
      <span data-testid="cart-count">{cartCount}</span>
      <span data-testid="cart-total">{cartTotal}</span>
      <span data-testid="items-count">{cartItems.length}</span>
      <span data-testid="is-in-cart">{isInCart(product.id) ? 'yes' : 'no'}</span>
      <button data-testid="add" onClick={() => addToCart(product)}>
        Add
      </button>
      <button data-testid="add-with-size" onClick={() => addToCart(product, 1, 'M')}>
        Add with Size
      </button>
      <button data-testid="add-qty-3" onClick={() => addToCart(product, 3)}>
        Add 3
      </button>
      <button data-testid="remove" onClick={() => removeFromCart(product.id)}>
        Remove
      </button>
      <button data-testid="update-qty-5" onClick={() => updateQuantity(product.id, 5)}>
        Update to 5
      </button>
      <button data-testid="update-qty-0" onClick={() => updateQuantity(product.id, 0)}>
        Update to 0
      </button>
      <button data-testid="clear" onClick={() => clearCart()}>
        Clear
      </button>
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('CartProvider', () => {
    it('provides cart context to children', () => {
      const product = createMockProduct('1');
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      expect(screen.getByTestId('cart-count').textContent).toBe('0');
      expect(screen.getByTestId('cart-total').textContent).toBe('0');
    });

    it('loads cart from localStorage on mount', async () => {
      const savedCart = [
        { ...createMockProduct('1', 100), quantity: 2 },
        { ...createMockProduct('2', 200), quantity: 1 },
      ];
      localStorage.setItem('shopping-cart', JSON.stringify(savedCart));

      render(
        <CartProvider>
          <CartTestComponent product={createMockProduct('1')} />
        </CartProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('3');
        expect(screen.getByTestId('cart-total').textContent).toBe('400');
      });
    });

    it('handles corrupted localStorage gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('shopping-cart', 'invalid-json{{{');

      render(
        <CartProvider>
          <CartTestComponent product={createMockProduct('1')} />
        </CartProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        '[CartContext] Failed to load cart from storage - data corrupted:',
        expect.any(SyntaxError)
      );
      consoleSpy.mockRestore();
    });

    it('handles localStorage save error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const product = createMockProduct('1');

      // Mock setItem to throw quota error
      const originalSetItem = localStorage.setItem.bind(localStorage);
      vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
        if (key === 'shopping-cart') {
          throw new DOMException('Quota exceeded', 'QuotaExceededError');
        }
        return originalSetItem(key, value);
      });

      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      // Add item to trigger save
      fireEvent.click(screen.getByTestId('add'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
      });

      // Should have logged error
      expect(consoleSpy).toHaveBeenCalledWith(
        '[CartContext] Failed to save cart to storage:',
        expect.any(DOMException)
      );

      consoleSpy.mockRestore();
      vi.mocked(localStorage.setItem).mockRestore();
    });
  });

  describe('useCart hook', () => {
    it('throws error when used outside CartProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within a CartProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('addToCart', () => {
    it('adds a product to cart', async () => {
      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
        expect(screen.getByTestId('cart-total').textContent).toBe('100');
        expect(screen.getByTestId('is-in-cart').textContent).toBe('yes');
      });
    });

    it('adds product with specified quantity', async () => {
      const product = createMockProduct('1', 50);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add-qty-3'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('3');
        expect(screen.getByTestId('cart-total').textContent).toBe('150');
      });
    });

    it('increases quantity for existing product', async () => {
      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add'));
      fireEvent.click(screen.getByTestId('add'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('2');
        expect(screen.getByTestId('items-count').textContent).toBe('1');
      });
    });

    it('adds product with size as separate item', async () => {
      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add'));
      fireEvent.click(screen.getByTestId('add-with-size'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('2');
        expect(screen.getByTestId('items-count').textContent).toBe('2');
      });
    });

    it('tracks analytics when gtag is available', async () => {
      const mockGtag = vi.fn();
      (window as { gtag?: typeof mockGtag }).gtag = mockGtag;

      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add'));

      await waitFor(() => {
        expect(mockGtag).toHaveBeenCalledWith('event', 'add_to_cart', {
          currency: 'MXN',
          value: 100,
          items: [
            {
              item_id: '1',
              item_name: 'Product 1',
              price: 100,
              quantity: 1,
              item_variant: undefined,
            },
          ],
        });
      });

      delete (window as { gtag?: typeof mockGtag }).gtag;
    });

    it('tracks analytics with size variant', async () => {
      const mockGtag = vi.fn();
      (window as { gtag?: typeof mockGtag }).gtag = mockGtag;

      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add-with-size'));

      await waitFor(() => {
        expect(mockGtag).toHaveBeenCalledWith('event', 'add_to_cart', {
          currency: 'MXN',
          value: 100,
          items: [
            {
              item_id: '1',
              item_name: 'Product 1',
              price: 100,
              quantity: 1,
              item_variant: 'M',
            },
          ],
        });
      });

      delete (window as { gtag?: typeof mockGtag }).gtag;
    });
  });

  describe('removeFromCart', () => {
    it('removes a product from cart', async () => {
      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add'));
      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
      });

      fireEvent.click(screen.getByTestId('remove'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
        expect(screen.getByTestId('is-in-cart').textContent).toBe('no');
      });
    });
  });

  describe('updateQuantity', () => {
    it('updates product quantity', async () => {
      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add'));
      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
      });

      fireEvent.click(screen.getByTestId('update-qty-5'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('5');
        expect(screen.getByTestId('cart-total').textContent).toBe('500');
      });
    });

    it('removes product when quantity is set to 0', async () => {
      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add'));
      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
      });

      fireEvent.click(screen.getByTestId('update-qty-0'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
        expect(screen.getByTestId('is-in-cart').textContent).toBe('no');
      });
    });
  });

  describe('clearCart', () => {
    it('removes all items from cart', async () => {
      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add'));
      fireEvent.click(screen.getByTestId('add-qty-3'));
      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('4');
      });

      fireEvent.click(screen.getByTestId('clear'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
        expect(screen.getByTestId('items-count').textContent).toBe('0');
      });
    });
  });

  describe('isInCart', () => {
    it('returns true for products in cart', async () => {
      const product = createMockProduct('1');
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      expect(screen.getByTestId('is-in-cart').textContent).toBe('no');

      fireEvent.click(screen.getByTestId('add'));

      await waitFor(() => {
        expect(screen.getByTestId('is-in-cart').textContent).toBe('yes');
      });
    });
  });

  describe('Size handling', () => {
    it('treats same product with different sizes as different items', async () => {
      const product = createMockProduct('1', 100);

      function SizeTestComponent() {
        const { addToCart, cartItems, isInCart } = useCart();
        return (
          <div>
            <span data-testid="items">{cartItems.length}</span>
            <span data-testid="in-cart-no-size">{isInCart(product.id) ? 'yes' : 'no'}</span>
            <span data-testid="in-cart-size-m">{isInCart(product.id, 'M') ? 'yes' : 'no'}</span>
            <span data-testid="in-cart-size-l">{isInCart(product.id, 'L') ? 'yes' : 'no'}</span>
            <button data-testid="add-no-size" onClick={() => addToCart(product)}>
              Add
            </button>
            <button data-testid="add-size-m" onClick={() => addToCart(product, 1, 'M')}>
              Add M
            </button>
            <button data-testid="add-size-l" onClick={() => addToCart(product, 1, 'L')}>
              Add L
            </button>
          </div>
        );
      }

      render(
        <CartProvider>
          <SizeTestComponent />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add-no-size'));
      fireEvent.click(screen.getByTestId('add-size-m'));
      fireEvent.click(screen.getByTestId('add-size-l'));

      await waitFor(() => {
        expect(screen.getByTestId('items').textContent).toBe('3');
        expect(screen.getByTestId('in-cart-no-size').textContent).toBe('yes');
        expect(screen.getByTestId('in-cart-size-m').textContent).toBe('yes');
        expect(screen.getByTestId('in-cart-size-l').textContent).toBe('yes');
      });
    });

    it('removes specific size variant', async () => {
      const product = createMockProduct('1', 100);

      function SizeRemoveTestComponent() {
        const { addToCart, removeFromCart, cartItems, isInCart } = useCart();
        return (
          <div>
            <span data-testid="items">{cartItems.length}</span>
            <span data-testid="in-cart-size-m">{isInCart(product.id, 'M') ? 'yes' : 'no'}</span>
            <span data-testid="in-cart-size-l">{isInCart(product.id, 'L') ? 'yes' : 'no'}</span>
            <button data-testid="add-size-m" onClick={() => addToCart(product, 1, 'M')}>
              Add M
            </button>
            <button data-testid="add-size-l" onClick={() => addToCart(product, 1, 'L')}>
              Add L
            </button>
            <button data-testid="remove-size-m" onClick={() => removeFromCart(product.id, 'M')}>
              Remove M
            </button>
          </div>
        );
      }

      render(
        <CartProvider>
          <SizeRemoveTestComponent />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add-size-m'));
      fireEvent.click(screen.getByTestId('add-size-l'));

      await waitFor(() => {
        expect(screen.getByTestId('items').textContent).toBe('2');
      });

      fireEvent.click(screen.getByTestId('remove-size-m'));

      await waitFor(() => {
        expect(screen.getByTestId('items').textContent).toBe('1');
        expect(screen.getByTestId('in-cart-size-m').textContent).toBe('no');
        expect(screen.getByTestId('in-cart-size-l').textContent).toBe('yes');
      });
    });

    it('updates quantity for specific size variant', async () => {
      const product = createMockProduct('1', 100);

      function SizeUpdateTestComponent() {
        const { addToCart, updateQuantity, cartItems } = useCart();
        const mItem = cartItems.find((i) => i.selectedSize === 'M');
        const lItem = cartItems.find((i) => i.selectedSize === 'L');
        return (
          <div>
            <span data-testid="m-qty">{mItem?.quantity ?? 0}</span>
            <span data-testid="l-qty">{lItem?.quantity ?? 0}</span>
            <button data-testid="add-size-m" onClick={() => addToCart(product, 1, 'M')}>
              Add M
            </button>
            <button data-testid="add-size-l" onClick={() => addToCart(product, 1, 'L')}>
              Add L
            </button>
            <button data-testid="update-m-to-5" onClick={() => updateQuantity(product.id, 5, 'M')}>
              Update M to 5
            </button>
          </div>
        );
      }

      render(
        <CartProvider>
          <SizeUpdateTestComponent />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add-size-m'));
      fireEvent.click(screen.getByTestId('add-size-l'));

      await waitFor(() => {
        expect(screen.getByTestId('m-qty').textContent).toBe('1');
        expect(screen.getByTestId('l-qty').textContent).toBe('1');
      });

      fireEvent.click(screen.getByTestId('update-m-to-5'));

      await waitFor(() => {
        expect(screen.getByTestId('m-qty').textContent).toBe('5');
        expect(screen.getByTestId('l-qty').textContent).toBe('1');
      });
    });
  });

  describe('localStorage persistence', () => {
    it('saves cart to localStorage after changes', async () => {
      const product = createMockProduct('1', 100);
      render(
        <CartProvider>
          <CartTestComponent product={product} />
        </CartProvider>
      );

      fireEvent.click(screen.getByTestId('add'));

      await waitFor(() => {
        const saved = localStorage.getItem('shopping-cart');
        expect(saved).not.toBeNull();
        const parsed = JSON.parse(saved!);
        expect(parsed).toHaveLength(1);
        expect(parsed[0].id).toBe('1');
        expect(parsed[0].quantity).toBe(1);
      });
    });
  });
});
