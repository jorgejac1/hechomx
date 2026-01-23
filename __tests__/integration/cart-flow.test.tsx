/**
 * @fileoverview Integration tests for cart functionality.
 * Tests the complete add-to-cart flow including context, localStorage, and UI updates.
 * @module __tests__/integration/cart-flow.test
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { Product } from '@/types';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock window.gtag for analytics
const mockGtag = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

// Test product data
const mockProduct: Product = {
  id: 'test-product-1',
  name: 'Artesanía de Oaxaca',
  price: 1500,
  description: 'Beautiful handcrafted item',
  images: ['https://example.com/image.jpg'],
  category: 'Textiles',
  state: 'Oaxaca',
  maker: {
    name: 'María García',
    location: 'Oaxaca',
    verified: true,
  },
  stock: 10,
  rating: 4.5,
  reviewCount: 25,
};

const mockProduct2: Product = {
  id: 'test-product-2',
  name: 'Talavera Poblana',
  price: 2500,
  description: 'Traditional Puebla pottery',
  images: ['https://example.com/talavera.jpg'],
  category: 'Cerámica',
  state: 'Puebla',
  maker: {
    name: 'Juan Hernández',
    location: 'Puebla',
    verified: true,
  },
  stock: 5,
  rating: 4.8,
  reviewCount: 42,
};

// Test component that uses cart
function CartTestComponent({ product }: { product: Product }) {
  const { addToCart, cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, isInCart } =
    useCart();

  return (
    <div>
      <div data-testid="cart-count">{cartCount}</div>
      <div data-testid="cart-total">{cartTotal}</div>
      <div data-testid="in-cart">{isInCart(product.id) ? 'yes' : 'no'}</div>

      <button data-testid="add-to-cart" onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <button data-testid="add-multiple" onClick={() => addToCart(product, 3)}>
        Add 3 to Cart
      </button>

      <button data-testid="remove-from-cart" onClick={() => removeFromCart(product.id)}>
        Remove from Cart
      </button>

      <div data-testid="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} data-testid={`cart-item-${item.id}`}>
            <span data-testid={`item-name-${item.id}`}>{item.name}</span>
            <span data-testid={`item-quantity-${item.id}`}>{item.quantity}</span>
            <span data-testid={`item-price-${item.id}`}>{item.price}</span>
            <button
              data-testid={`increase-${item.id}`}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button
              data-testid={`decrease-${item.id}`}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Multi-product test component
function MultiProductCartComponent() {
  const { addToCart, clearCart, cartItems, cartCount, cartTotal } = useCart();

  return (
    <div>
      <div data-testid="cart-count">{cartCount}</div>
      <div data-testid="cart-total">{cartTotal}</div>

      <button data-testid="add-product-1" onClick={() => addToCart(mockProduct)}>
        Add Product 1
      </button>
      <button data-testid="add-product-2" onClick={() => addToCart(mockProduct2)}>
        Add Product 2
      </button>
      <button data-testid="clear-cart" onClick={() => clearCart()}>
        Clear Cart
      </button>

      <div data-testid="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} data-testid={`cart-item-${item.id}`}>
            {item.name} x {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
}

describe('Cart Integration Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    mockGtag.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Add to Cart Flow', () => {
    it('should add a product to the cart', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      // Initially cart should be empty
      expect(screen.getByTestId('cart-count').textContent).toBe('0');
      expect(screen.getByTestId('cart-total').textContent).toBe('0');
      expect(screen.getByTestId('in-cart').textContent).toBe('no');

      // Add product to cart
      fireEvent.click(screen.getByTestId('add-to-cart'));

      // Verify cart updated
      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
        expect(screen.getByTestId('cart-total').textContent).toBe('1500');
        expect(screen.getByTestId('in-cart').textContent).toBe('yes');
      });

      // Verify item appears in cart
      expect(screen.getByTestId(`cart-item-${mockProduct.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`item-name-${mockProduct.id}`).textContent).toBe(mockProduct.name);
      expect(screen.getByTestId(`item-quantity-${mockProduct.id}`).textContent).toBe('1');
    });

    it('should add multiple quantities at once', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('add-multiple'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('3');
        expect(screen.getByTestId('cart-total').textContent).toBe('4500');
        expect(screen.getByTestId(`item-quantity-${mockProduct.id}`).textContent).toBe('3');
      });
    });

    it('should increment quantity when adding same product again', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      // Add once
      fireEvent.click(screen.getByTestId('add-to-cart'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
      });

      // Add again
      fireEvent.click(screen.getByTestId('add-to-cart'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('2');
        expect(screen.getByTestId(`item-quantity-${mockProduct.id}`).textContent).toBe('2');
        expect(screen.getByTestId('cart-total').textContent).toBe('3000');
      });
    });

    it('should track analytics on add to cart', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('add-to-cart'));

      await waitFor(() => {
        expect(mockGtag).toHaveBeenCalledWith('event', 'add_to_cart', {
          currency: 'MXN',
          value: 1500,
          items: [
            {
              item_id: mockProduct.id,
              item_name: mockProduct.name,
              price: mockProduct.price,
              quantity: 1,
            },
          ],
        });
      });
    });
  });

  describe('Update Quantity Flow', () => {
    it('should increase item quantity', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      // Add product first
      fireEvent.click(screen.getByTestId('add-to-cart'));

      await waitFor(() => {
        expect(screen.getByTestId(`item-quantity-${mockProduct.id}`).textContent).toBe('1');
      });

      // Increase quantity
      fireEvent.click(screen.getByTestId(`increase-${mockProduct.id}`));

      await waitFor(() => {
        expect(screen.getByTestId(`item-quantity-${mockProduct.id}`).textContent).toBe('2');
        expect(screen.getByTestId('cart-count').textContent).toBe('2');
        expect(screen.getByTestId('cart-total').textContent).toBe('3000');
      });
    });

    it('should decrease item quantity', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      // Add multiple
      fireEvent.click(screen.getByTestId('add-multiple'));

      await waitFor(() => {
        expect(screen.getByTestId(`item-quantity-${mockProduct.id}`).textContent).toBe('3');
      });

      // Decrease quantity
      fireEvent.click(screen.getByTestId(`decrease-${mockProduct.id}`));

      await waitFor(() => {
        expect(screen.getByTestId(`item-quantity-${mockProduct.id}`).textContent).toBe('2');
        expect(screen.getByTestId('cart-count').textContent).toBe('2');
      });
    });

    it('should remove item when quantity reaches 0', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      // Add product
      fireEvent.click(screen.getByTestId('add-to-cart'));

      await waitFor(() => {
        expect(screen.getByTestId(`cart-item-${mockProduct.id}`)).toBeInTheDocument();
      });

      // Decrease to 0
      fireEvent.click(screen.getByTestId(`decrease-${mockProduct.id}`));

      await waitFor(() => {
        expect(screen.queryByTestId(`cart-item-${mockProduct.id}`)).not.toBeInTheDocument();
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
        expect(screen.getByTestId('in-cart').textContent).toBe('no');
      });
    });
  });

  describe('Remove from Cart Flow', () => {
    it('should remove item from cart', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      // Add product
      fireEvent.click(screen.getByTestId('add-to-cart'));

      await waitFor(() => {
        expect(screen.getByTestId(`cart-item-${mockProduct.id}`)).toBeInTheDocument();
      });

      // Remove product
      fireEvent.click(screen.getByTestId('remove-from-cart'));

      await waitFor(() => {
        expect(screen.queryByTestId(`cart-item-${mockProduct.id}`)).not.toBeInTheDocument();
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
        expect(screen.getByTestId('cart-total').textContent).toBe('0');
      });
    });
  });

  describe('Multiple Products Flow', () => {
    it('should handle multiple different products', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <MultiProductCartComponent />
          </CartProvider>
        </ToastProvider>
      );

      // Add first product
      fireEvent.click(screen.getByTestId('add-product-1'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
        expect(screen.getByTestId('cart-total').textContent).toBe('1500');
      });

      // Add second product
      fireEvent.click(screen.getByTestId('add-product-2'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('2');
        expect(screen.getByTestId('cart-total').textContent).toBe('4000'); // 1500 + 2500
      });

      // Both products should be in cart
      expect(screen.getByTestId(`cart-item-${mockProduct.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`cart-item-${mockProduct2.id}`)).toBeInTheDocument();
    });

    it('should clear all items from cart', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <MultiProductCartComponent />
          </CartProvider>
        </ToastProvider>
      );

      // Add both products
      fireEvent.click(screen.getByTestId('add-product-1'));
      fireEvent.click(screen.getByTestId('add-product-2'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('2');
      });

      // Clear cart
      fireEvent.click(screen.getByTestId('clear-cart'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
        expect(screen.getByTestId('cart-total').textContent).toBe('0');
        expect(screen.queryByTestId(`cart-item-${mockProduct.id}`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`cart-item-${mockProduct2.id}`)).not.toBeInTheDocument();
      });
    });
  });

  describe('localStorage Persistence', () => {
    it('should persist cart to localStorage', async () => {
      const { unmount } = render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      // Add product
      fireEvent.click(screen.getByTestId('add-to-cart'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
      });

      // Wait for localStorage to be updated
      await waitFor(() => {
        const savedCart = localStorage.getItem('shopping-cart');
        expect(savedCart).not.toBeNull();
        const parsedCart = JSON.parse(savedCart!);
        expect(parsedCart).toHaveLength(1);
        expect(parsedCart[0].id).toBe(mockProduct.id);
      });

      unmount();
    });

    it('should load cart from localStorage on mount', async () => {
      // Pre-populate localStorage
      const cartData = [{ ...mockProduct, quantity: 2 }];
      localStorage.setItem('shopping-cart', JSON.stringify(cartData));

      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      // Cart should be loaded from localStorage
      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('2');
        expect(screen.getByTestId('cart-total').textContent).toBe('3000');
        expect(screen.getByTestId('in-cart').textContent).toBe('yes');
      });
    });

    it('should handle corrupted localStorage gracefully', async () => {
      // Set corrupted data
      localStorage.setItem('shopping-cart', 'not-valid-json');

      render(
        <ToastProvider>
          <CartProvider>
            <CartTestComponent product={mockProduct} />
          </CartProvider>
        </ToastProvider>
      );

      // Cart should start empty despite corrupted data
      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
      });
    });
  });

  describe('Cart Total Calculations', () => {
    it('should calculate correct total with multiple items and quantities', async () => {
      render(
        <ToastProvider>
          <CartProvider>
            <MultiProductCartComponent />
          </CartProvider>
        </ToastProvider>
      );

      // Add product 1 twice (1500 x 2 = 3000)
      fireEvent.click(screen.getByTestId('add-product-1'));
      fireEvent.click(screen.getByTestId('add-product-1'));

      // Add product 2 once (2500)
      fireEvent.click(screen.getByTestId('add-product-2'));

      await waitFor(() => {
        expect(screen.getByTestId('cart-count').textContent).toBe('3'); // 2 + 1
        expect(screen.getByTestId('cart-total').textContent).toBe('5500'); // 3000 + 2500
      });
    });
  });
});
