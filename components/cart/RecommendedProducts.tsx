/**
 * @fileoverview Recommended products section for displaying related items in the cart page.
 * Shows a grid of product cards for items that may interest the user based on their cart contents.
 * @module components/cart/RecommendedProducts
 */

'use client';

import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

/**
 * Props for the RecommendedProducts component
 * @interface RecommendedProductsProps
 */
interface RecommendedProductsProps {
  /** Array of recommended products to display */
  products: Product[];
}

export default function RecommendedProducts({ products }: RecommendedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        También te puede interesar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
