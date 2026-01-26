/**
 * @fileoverview Enhanced product recommendations component.
 * Displays intelligent product recommendations in multiple sections:
 * - Similar products (same category)
 * - "You might also like" (cross-category based on shared attributes)
 * - Recently viewed products
 * Uses smart scoring algorithm for relevance.
 * @module components/product/ProductRecommendations
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { getCombinedRecommendations, getRecentlyViewedProducts } from '@/lib/utils/recommendations';
import { Sparkles, Clock, ChevronRight } from 'lucide-react';

/**
 * Props for the ProductRecommendations component
 * @interface ProductRecommendationsProps
 */
interface ProductRecommendationsProps {
  /** Current product being viewed */
  currentProduct: Product;
  /** All available products for recommendations */
  allProducts: Product[];
  /** Whether to show the recently viewed section */
  showRecentlyViewed?: boolean;
  /** Whether to show cross-category recommendations */
  showCrossCategory?: boolean;
}

/**
 * Section header component for recommendation sections
 */
function SectionHeader({
  icon,
  title,
  actionText,
  actionHref,
}: {
  icon: React.ReactNode;
  title: string;
  actionText?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="p-1.5 sm:p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">{icon}</div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
        >
          <span className="hidden sm:inline">{actionText}</span>
          <span className="sm:hidden">Ver más</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

/**
 * Product grid component for displaying recommendation cards
 */
function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductRecommendations({
  currentProduct,
  allProducts,
  showRecentlyViewed = true,
  showCrossCategory = true,
}: ProductRecommendationsProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Get static recommendations (don't depend on client-side state)
  const { similar, crossCategory } = getCombinedRecommendations(currentProduct, allProducts, {
    similarLimit: 4,
    crossCategoryLimit: 4,
  });

  // Load recently viewed on client side
  useEffect(() => {
    setIsHydrated(true);
    if (showRecentlyViewed) {
      const recent = getRecentlyViewedProducts(currentProduct.id, allProducts, 4);
      setRecentlyViewed(recent);
    }
  }, [currentProduct.id, allProducts, showRecentlyViewed]);

  // Don't render if no recommendations at all
  if (similar.length === 0 && crossCategory.length === 0 && recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Similar Products Section */}
      {similar.length > 0 && (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
          <SectionHeader
            icon={
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            }
            title="Productos Similares"
            actionText="Ver más en esta categoría"
            actionHref={`/productos?category=${encodeURIComponent(currentProduct.category)}`}
          />
          <ProductGrid products={similar} />
        </section>
      )}

      {/* Cross-Category Recommendations */}
      {showCrossCategory && crossCategory.length > 0 && (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
          <SectionHeader
            icon={
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
            }
            title="También te puede gustar"
            actionText="Explorar más"
            actionHref="/productos"
          />
          <ProductGrid products={crossCategory} />
        </section>
      )}

      {/* Recently Viewed Section */}
      {showRecentlyViewed && isHydrated && recentlyViewed.length > 0 && (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
          <SectionHeader
            icon={
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
            }
            title="Vistos Recientemente"
            actionText="Ver historial"
            actionHref="/productos"
          />
          <ProductGrid products={recentlyViewed} />
        </section>
      )}
    </div>
  );
}
