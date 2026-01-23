/**
 * @fileoverview Favorite product list item component
 * Displays a favorited product in list format with horizontal layout.
 * Shows image, details, rating, price, and action buttons. Memoized for performance.
 * @module components/product/FavoriteListItem
 */

'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Trash2 } from 'lucide-react';
import { formatCurrency, formatRelativeTime, ROUTES } from '@/lib';
import type { FavoriteProduct } from '@/lib/api/sellerApi';

/**
 * Props for the FavoriteListItem component
 * @interface FavoriteListItemProps
 */
interface FavoriteListItemProps {
  /** Favorite product data */
  favorite: FavoriteProduct;
  /** Callback to add the product to cart */
  onAddToCart: (favorite: FavoriteProduct) => void;
  /** Callback to remove from favorites */
  onRemove: (productId: string) => void;
}

const FavoriteListItem = memo(function FavoriteListItem({
  favorite,
  onAddToCart,
  onRemove,
}: FavoriteListItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Image */}
        <Link href={ROUTES.PRODUCT_DETAIL(favorite.id)} className="relative shrink-0">
          <div className="relative h-48 sm:h-32 sm:w-32 rounded-lg overflow-hidden">
            <Image
              src={favorite.images[0]}
              alt={favorite.name}
              fill
              sizes="(max-width: 640px) 100vw, 128px"
              className="object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {!favorite.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold">
                  Agotado
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link href={ROUTES.PRODUCT_DETAIL(favorite.id)}>
              <h3 className="font-bold text-lg text-gray-900 mb-1 hover:text-primary-600 transition">
                {favorite.name}
              </h3>
            </Link>

            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{favorite.description}</p>

            {favorite.rating && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-900">
                  {favorite.rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-600">({favorite.reviewCount || 0} reseñas)</span>
              </div>
            )}

            <p className="text-xs text-gray-500">Agregado {formatRelativeTime(favorite.addedAt)}</p>

            {favorite.notes && (
              <div className="mt-2 p-2 bg-blue-50 rounded-sm text-xs text-gray-700 italic">
                &quot;{favorite.notes}&quot;
              </div>
            )}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
          <p className="text-2xl font-bold text-primary-600">{formatCurrency(favorite.price)}</p>

          <div className="flex sm:flex-col gap-2">
            <button
              onClick={() => onAddToCart(favorite)}
              disabled={!favorite.inStock}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Agregar al Carrito</span>
            </button>
            <button
              onClick={() => onRemove(favorite.id)}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FavoriteListItem;
