/**
 * @fileoverview Product card list view component
 * Horizontal product card layout for list view display.
 * Shows image, details, rating, price, and comparison toggle. Memoized for performance.
 * @module components/product/ProductCardList
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useComparison } from '@/contexts/ComparisonContext';
import { useState, memo } from 'react';
import { formatCurrency } from '@/lib';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import ImageSkeleton from '@/components/common/loading/ImageSkeleton';

/**
 * Props for the ProductCardList component
 * @interface ProductCardListProps
 */
interface ProductCardListProps {
  /** Product data to display */
  product: Product;
}

const ProductCardList = memo(function ProductCardList({ product }: ProductCardListProps) {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isComparing = isInComparison(product.id);

  const handleComparisonToggle = () => {
    if (isComparing) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  return (
    <article
      className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900/70 transition-shadow overflow-hidden group"
      aria-label={`Producto: ${product.name}`}
    >
      {/* Image Section */}
      <div className="relative w-full sm:w-52 h-48 sm:h-[212px] shrink-0 bg-gray-100">
        <Link
          href={`/productos/${product.id}`}
          aria-label={`Ver detalles de ${product.name}`}
          className="block w-full h-full"
        >
          {!imageLoaded && !imageError && <ImageSkeleton aspectRatio="square" rounded={false} />}
          {!imageError ? (
            <Image
              src={product.images[0]}
              alt={`Imagen de ${product.name}`}
              fill
              sizes="(max-width: 640px) 100vw, 208px"
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </Link>

        {/* Badges - UPDATED */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5" aria-live="polite">
          {product.featured && (
            <Badge variant="primary" size="sm">
              Destacado
            </Badge>
          )}
          {product.verified && (
            <Badge
              variant="success"
              size="sm"
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Verificado
            </Badge>
          )}
        </div>

        {/* Comparison Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={handleComparisonToggle}
            className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
              isComparing
                ? 'bg-primary-600 text-white'
                : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-primary-500'
            } focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
            aria-label={
              isComparing
                ? `Quitar ${product.name} de la comparación`
                : `Agregar ${product.name} a la comparación`
            }
            aria-pressed={isComparing}
          >
            {isComparing ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 sm:py-3 flex flex-col justify-between min-w-0">
        <div>
          {/* Title */}
          <Link href={`/productos/${product.id}`}>
            <h3 className="text-lg sm:text-base font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1" aria-label={`Ubicación: ${product.state}`}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{product.state}</span>
            </div>
            <span aria-hidden="true">•</span>
            <span aria-label={`Categoría: ${product.category}`}>{product.category}</span>
          </div>

          {/* Rating */}
          {product.rating && (
            <div
              className="flex items-center gap-2 mb-3"
              aria-label={`Calificación: ${product.rating} de 5 estrellas`}
            >
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="font-semibold text-gray-900">{product.rating}</span>
              </div>
              {product.reviewCount && (
                <span className="text-gray-500 text-sm">
                  ({product.reviewCount} {product.reviewCount === 1 ? 'reseña' : 'reseñas'})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom section - Price, Maker, and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mt-2">
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-1">
              <span
                className="text-2xl sm:text-xl font-bold text-gray-900"
                aria-label={`Precio: ${product.price} pesos mexicanos`}
              >
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm font-normal text-gray-500">{product.currency}</span>
            </div>
            <p className="text-xs text-gray-500">
              Por <span className="font-medium">{product.maker}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Stock Status - UPDATED */}
            {product.inStock ? (
              <Badge
                variant="success"
                size="sm"
                icon={
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                Disponible
              </Badge>
            ) : (
              <Badge variant="danger" size="sm">
                Agotado
              </Badge>
            )}

            {/* View Details Button */}
            <Button
              variant="primary"
              size="sm"
              href={`/productos/${product.id}`}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              }
              iconPosition="right"
            >
              Ver detalles
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
});

export default ProductCardList;
