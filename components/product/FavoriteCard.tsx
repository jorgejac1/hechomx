/**
 * @fileoverview Favorite product card component
 * Displays a favorited product with image, rating, price, and action buttons
 * for adding to cart or removing from favorites. Memoized for performance.
 * @module components/product/FavoriteCard
 */

'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Trash2 } from 'lucide-react';
import { formatCurrency, formatRelativeTime, ROUTES } from '@/lib';
import type { FavoriteProduct } from '@/lib/api/sellerApi';

/**
 * Props for the FavoriteCard component
 * @interface FavoriteCardProps
 */
interface FavoriteCardProps {
  /** Favorite product data */
  favorite: FavoriteProduct;
  /** Callback to add the product to cart */
  onAddToCart: (favorite: FavoriteProduct) => void;
  /** Callback to remove from favorites */
  onRemove: (productId: string) => void;
}

const FavoriteCard = memo(function FavoriteCard({
  favorite,
  onAddToCart,
  onRemove,
}: FavoriteCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
      {/* Image */}
      <Link href={ROUTES.PRODUCT_DETAIL(favorite.id)} className="relative block">
        <div className="relative h-64">
          <Image
            src={favorite.images[0]}
            alt={favorite.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {!favorite.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold">
                Agotado
              </span>
            </div>
          )}
          {favorite.featured && (
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-bold">
                Destacado
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={ROUTES.PRODUCT_DETAIL(favorite.id)}>
          <h3 className="font-bold text-gray-900 mb-1 hover:text-primary-600 transition line-clamp-2">
            {favorite.name}
          </h3>
        </Link>

        {/* Rating */}
        {favorite.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">
              {favorite.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-600">({favorite.reviewCount || 0})</span>
          </div>
        )}

        {/* Price */}
        <p className="text-2xl font-bold text-primary-600 mb-3">{formatCurrency(favorite.price)}</p>

        {/* Added Date */}
        <p className="text-xs text-gray-500 mb-3">
          Agregado {formatRelativeTime(favorite.addedAt)}
        </p>

        {/* Notes */}
        {favorite.notes && (
          <div className="mb-3 p-2 bg-blue-50 rounded-sm text-xs text-gray-700 italic">
            &quot;{favorite.notes}&quot;
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(favorite)}
            disabled={!favorite.inStock}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </button>
          <button
            onClick={() => onRemove(favorite.id)}
            className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default FavoriteCard;
