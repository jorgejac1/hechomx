'use client';

import ProductCard from './ProductCard';
import ProductCardList from './ProductCardList';
import { Product } from '@/types';

interface ProductsGridProps {
  products: Product[];
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
        <div 
          className="flex flex-col gap-4"
          role="list"
          aria-label="Productos en vista de lista"
        >
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