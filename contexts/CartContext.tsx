/**
 * @fileoverview Shopping cart context for managing cart state across the application.
 * Handles adding, removing, and updating cart items with localStorage persistence.
 * Includes Google Analytics tracking for add_to_cart events.
 * @module contexts/CartContext
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

/**
 * Cart item extending Product with quantity and optional size
 * @interface CartItem
 */
interface CartItem extends Product {
  /** Number of this product in the cart */
  quantity: number;
  /** Selected size for clothing/shoes/rings (if applicable) */
  selectedSize?: string;
}

/**
 * Generate a unique cart item ID that includes size
 * Products with different sizes are treated as different items
 */
function getCartItemId(productId: string, size?: string): string {
  return size ? `${productId}-${size}` : productId;
}

/**
 * Cart context value type
 * @interface CartContextType
 */
interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  isInCart: (productId: string, selectedSize?: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('[CartContext] Failed to load cart from storage - data corrupted:', err);
        localStorage.removeItem('shopping-cart');
        // Cart will start empty - silent fail on initial load is acceptable
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
      } catch (err) {
        console.error('[CartContext] Failed to save cart to storage:', err);
        // Storage might be full - continue without persistence
      }
    }
  }, [cartItems, isHydrated]);

  // Calculate totals
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string) => {
    const cartItemId = getCartItemId(product.id, selectedSize);

    setCartItems((prev) => {
      // Find existing item with same product ID AND size
      const existingItem = prev.find(
        (item) => getCartItemId(item.id, item.selectedSize) === cartItemId
      );

      if (existingItem) {
        // Update quantity if already in cart with same size
        return prev.map((item) =>
          getCartItemId(item.id, item.selectedSize) === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item with size
        return [...prev, { ...product, quantity, selectedSize }];
      }
    });

    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'MXN',
        value: product.price * quantity,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: quantity,
            item_variant: selectedSize,
          },
        ],
      });
    }
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    const cartItemId = getCartItemId(productId, selectedSize);
    setCartItems((prev) =>
      prev.filter((item) => getCartItemId(item.id, item.selectedSize) !== cartItemId)
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    const cartItemId = getCartItemId(productId, selectedSize);
    setCartItems((prev) =>
      prev.map((item) =>
        getCartItemId(item.id, item.selectedSize) === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (productId: string, selectedSize?: string) => {
    const cartItemId = getCartItemId(productId, selectedSize);
    return cartItems.some((item) => getCartItemId(item.id, item.selectedSize) === cartItemId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
