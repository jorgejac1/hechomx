/**
 * @fileoverview Products grid/list display component
 * Renders a collection of products in either grid or list view layout.
 * Supports accessibility with proper ARIA roles and labels.
 * @module components/product/ProductsGrid
 */

'use client';

import ProductCard from './ProductCard';
import ProductCardList from './ProductCardList';
import { Product } from '@/types';

/**
 * Props for the ProductsGrid component
 * @interface ProductsGridProps
 */
interface ProductsGridProps {
  /** Array of products to display */
  products: Product[];
  /** Display mode - grid shows cards in a grid layout, list shows expanded cards vertically */
  view: 'grid' | 'list';
}

export default function ProductsGrid({ products, view }: ProductsGridProps) {
  return (
    <div role="region" aria-label="Listado de productos">
      {/* Products */}
      {view === 'grid' ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Productos en vista de cuadrícula"
        >
          {products.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4" role="list" aria-label="Productos en vista de lista">
          {products.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCardList product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
