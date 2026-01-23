/**
 * @fileoverview Add to cart button component with animation feedback
 * Provides a customizable button for adding products to the shopping cart.
 * Supports multiple variants, sizes, and displays contextual text based on cart state.
 * @module components/product/AddToCartButton
 */

'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';

/**
 * Props for the AddToCartButton component
 * @interface AddToCartButtonProps
 */
interface AddToCartButtonProps {
  /** The product to add to cart */
  product: Product;
  /** Quantity to add when clicked (defaults to 1) */
  quantity?: number;
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
  /** Whether to show the shopping cart icon */
  showIcon?: boolean;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  showIcon = true,
}: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);

    // Reset animation
    setTimeout(() => setIsAdding(false), 600);
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600',
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`
        flex items-center justify-center gap-2 rounded-lg font-medium transition-all
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${isAdding ? 'scale-95' : ''}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {showIcon && (
        <ShoppingCart
          className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} ${isAdding ? 'animate-bounce' : ''}`}
        />
      )}
      <span>{isInCart(product.id) ? 'Agregar más' : 'Agregar al carrito'}</span>
    </button>
  );
}
