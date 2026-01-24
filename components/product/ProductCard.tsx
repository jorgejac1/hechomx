/**
 * @fileoverview Product card component for grid displays
 * Feature-rich product card with image, badges, rating, price, comparison toggle,
 * and artisan story links. Memoized for performance in product grids.
 * @module components/product/ProductCard
 */

'use client';

import { useState, useEffect, memo, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Shirt,
  Container,
  Gem,
  TreeDeciduous,
  Briefcase,
  FileText,
  Hammer,
  Package,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import { useToast } from '@/contexts/ToastContext';
import { hasArtisanStory, getArtisanIdFromMaker } from '@/lib/utils/artisan';
import { VerificationIcon } from '@/components/common/VerificationBadge';
import StarRating from '@/components/common/StarRating';
import Tooltip from '@/components/common/Tooltip';
import { Product } from '@/types';
import { formatCurrency, CATEGORY_ICONS, CATEGORY_COLORS, ROUTES } from '@/lib';

const CATEGORY_ICON_COMPONENTS: Record<string, LucideIcon> = {
  Shirt,
  Container,
  Gem,
  TreeDeciduous,
  Briefcase,
  FileText,
  Hammer,
  Sparkles,
};

/**
 * Props for the ProductCard component
 * @interface ProductCardProps
 */
interface ProductCardProps {
  /** Product data to display */
  product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { toggle, isInComparison, canAdd, isFull } = useComparison();
  const [mounted, setMounted] = useState(false);
  const hasStory = hasArtisanStory(product.maker);
  const artisanId = getArtisanIdFromMaker(product.maker);

  // Only access comparison state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const isComparing = mounted ? isInComparison(product.id) : false;

  // Use product rating if available, otherwise generate a stable fallback based on product ID
  // This ensures consistent values across re-renders
  const rating = useMemo(() => {
    if (product.rating) return product.rating;
    // Generate a deterministic rating based on product ID hash
    const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 4 + (hash % 10) / 10; // Range: 4.0 - 4.9
  }, [product.id, product.rating]);

  const reviewCount = useMemo(() => {
    if (product.reviewCount) return product.reviewCount;
    // Generate a deterministic review count based on product ID hash
    const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 50 + (hash % 450); // Range: 50 - 499
  }, [product.id, product.reviewCount]);

  // Check if product is new (added within last 7 days)
  const isNewProduct = (createdAt?: string): boolean => {
    if (!createdAt) return false;
    const created = new Date(createdAt);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return created > sevenDaysAgo;
  };

  const handleComparisonToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFull && !isComparing) {
      showToast('Ya tienes 4 productos en comparación. Quita uno para agregar otro.', 'info');
      return;
    }

    toggle(product);
  };

  // Add handler for artisan story badge
  const handleArtisanStoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (artisanId) {
      router.push(`${ROUTES.ARTISAN}/${artisanId}`);
    }
  };

  const isDisabled = mounted ? !canAdd && !isComparing : false;

  const getButtonTitle = () => {
    if (isComparing) return 'Quitar de comparación';
    if (isFull) return 'Comparación llena (máximo 4 productos)';
    return 'Agregar a comparación';
  };

  const categoryIconName = CATEGORY_ICONS[product.category] || 'Package';
  const CategoryIcon = CATEGORY_ICON_COMPONENTS[categoryIconName] || Package;
  const categoryColor = CATEGORY_COLORS[product.category] || 'bg-gray-100 text-gray-700';

  return (
    <div className="group block h-full relative">
      {/* Comparison Button - Top Right */}
      {mounted && (
        <>
          <button
            onClick={handleComparisonToggle}
            disabled={isDisabled}
            className={`absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full shadow-md transition-all duration-200 
              ${
                isComparing
                  ? 'bg-primary-600 text-white scale-100'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
              sm:opacity-0 sm:group-hover:opacity-100 opacity-100
              focus:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-primary-600 focus:ring-offset-1
            `}
            aria-label={isComparing ? 'Quitar de comparación' : 'Agregar a comparación'}
            title={getButtonTitle()}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill={isComparing ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isComparing ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6" />
                </>
              )}
            </svg>
          </button>

          {isFull && !isComparing && (
            <div className="absolute top-12 right-2 z-10 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-sm text-[10px] font-medium shadow-xs sm:opacity-0 sm:group-hover:opacity-100 opacity-100 whitespace-nowrap">
              Comparación llena
            </div>
          )}
        </>
      )}

      <Link href={`${ROUTES.PRODUCTS}/${product.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-40 sm:h-48 md:h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 45vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />

            {/* Left Side - Badges Group (New + Featured + Verified) */}
            <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 z-1 flex items-center gap-1.5 sm:gap-2">
              {/* New Badge - First Priority */}
              {isNewProduct(product.createdAt) && (
                <span className="bg-blue-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-xs">
                  Nuevo
                </span>
              )}

              {/* Featured Badge */}
              {product.featured && (
                <span className="bg-primary-600 text-white px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-xs">
                  Destacado
                </span>
              )}

              {/* Verified Badge */}
              {product.verified && (
                <Tooltip
                  content="Producto verificado por nuestro equipo"
                  placement="right"
                  size="sm"
                >
                  <div className="bg-green-500 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-xs shrink-0">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Tooltip>
              )}
            </div>

            {/* Category Badge - Bottom Left */}
            <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 z-1">
              <span
                className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium shadow-xs ${categoryColor}`}
              >
                <CategoryIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{product.category}</span>
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-2.5 sm:p-3 flex-1 flex flex-col">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight min-h-8 sm:min-h-10">
              {product.name}
            </h3>

            {/* Category - Mobile Only */}
            <div className="sm:hidden mb-1">
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${categoryColor}`}
              >
                <CategoryIcon className="w-3 h-3" />
                <span>{product.category}</span>
              </span>
            </div>

            {/* Rating & Location */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-0 mb-1.5 sm:mb-2 text-[10px] sm:text-xs">
              <StarRating
                rating={rating}
                reviewCount={reviewCount}
                size="sm"
                productId={product.id}
              />
              <span className="text-gray-500 dark:text-gray-400 truncate sm:ml-2">
                {product.state}
              </span>
            </div>

            {/* Price & Stock */}
            <div className="flex items-end justify-between mt-auto pt-1.5 sm:pt-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-0.5 sm:gap-1 mb-0.5">
                  <span className="text-base sm:text-lg font-bold text-primary-600">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    {product.currency}
                  </span>
                </div>

                {/* Maker Name + Artisan Story Badge */}
                <div className="flex items-center gap-1.5">
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate shrink">
                    {product.maker}
                  </p>

                  {product.makerProfile?.verification?.level && (
                    <VerificationIcon level={product.makerProfile.verification.level} size="sm" />
                  )}

                  {/* Artisan Story Badge - Now using button instead of Link */}
                  {hasStory && artisanId && (
                    <button
                      onClick={handleArtisanStoryClick}
                      className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 bg-linear-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-700 rounded-full text-[9px] sm:text-[10px] font-semibold transition-all duration-200 hover:scale-105 shrink-0 shadow-xs"
                      title="Ver historia del artesano"
                      type="button"
                    >
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">Historia</span>
                    </button>
                  )}
                </div>
              </div>

              {product.inStock ? (
                <span className="text-[10px] sm:text-xs text-green-600 font-medium whitespace-nowrap ml-1.5 sm:ml-2">
                  Disponible
                </span>
              ) : (
                <span className="text-[10px] sm:text-xs text-red-600 font-medium whitespace-nowrap ml-1.5 sm:ml-2">
                  Agotado
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

export default ProductCard;
