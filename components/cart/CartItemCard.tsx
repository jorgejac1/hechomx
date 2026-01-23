/**
 * @fileoverview Individual cart item card component for displaying product details in the cart.
 * Shows product image, name, origin info, quantity controls, and pricing.
 * Supports quantity adjustment, item removal with animation, and links to product detail page.
 * @module components/cart/CartItemCard
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { Product } from '@/types';
import { formatCurrency } from '@/lib';
import { Minus, Plus, Trash2, MapPin } from 'lucide-react';
import Card from '@/components/common/Card';
import ImageSkeleton from '@/components/common/loading/ImageSkeleton';

/**
 * Props for the CartItemCard component
 * @interface CartItemCardProps
 */
interface CartItemCardProps {
  /** The product item with quantity information */
  item: Product & { quantity: number };
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { info } = useToast();
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.id);
      info(`${item.name} eliminado del carrito`);
    }, 300);
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <Card
      variant="outlined"
      padding="md"
      className={`transition-all ${isRemoving ? 'opacity-0 scale-95' : ''}`}
    >
      <div className="flex gap-4 sm:gap-6">
        {/* Product Image */}
        <Link
          href={`/productos/${item.id}`}
          className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-gray-100"
        >
          {!imageLoaded && <ImageSkeleton aspectRatio="square" rounded={false} />}
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className={`object-cover hover:scale-110 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 96px, 128px"
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <Link
                href={`/productos/${item.id}`}
                className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
              >
                {item.name}
              </Link>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>{item.state}</span>
                <span className="text-gray-400">•</span>
                <span>{item.maker}</span>
              </div>
            </div>

            {/* Remove Button - Desktop */}
            <button
              onClick={handleRemove}
              className="hidden sm:block text-gray-400 hover:text-red-600 transition-colors"
              aria-label="Eliminar producto"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Price and Quantity Controls */}
          <div className="flex items-center justify-between mt-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={decreaseQuantity}
                disabled={item.quantity <= 1}
                className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>

              <span className="w-12 text-center font-semibold text-gray-900">{item.quantity}</span>

              <button
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Price - UPDATED */}
            <div className="text-right">
              <p className="text-lg sm:text-xl font-bold text-primary-600">
                {formatCurrency(itemTotal)}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs sm:text-sm text-gray-500">{formatCurrency(item.price)} c/u</p>
              )}
            </div>
          </div>

          {/* Remove Button - Mobile */}
          <button
            onClick={handleRemove}
            className="sm:hidden flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium mt-3"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </Card>
  );
}
