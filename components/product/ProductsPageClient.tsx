'use client';

import { useState } from 'react';
import FiltersButton from '@/components/product/FiltersButton';
import ProductsGrid from '@/components/product/ProductsGrid';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/product/EmptyState';
import { Product } from '@/types';

interface ProductsPageClientProps {
  products: Product[];
  paginatedProducts: Product[];
  categories: string[];
  states: string[];
  currentCategory?: string;
  currentState?: string;
  currentQuery?: string;
  currentSort?: string;
  currentPage: number;
  totalPages: number;
}

export default function ProductsPageClient({
  products,
  paginatedProducts,
  categories,
  states,
  currentCategory,
  currentState,
  currentQuery,
  currentSort,
  currentPage,
  totalPages,
}: ProductsPageClientProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <>
      {/* Filters Button with View Toggle */}
      <FiltersButton
        categories={categories}
        states={states}
        currentCategory={currentCategory}
        currentState={currentState}
        currentQuery={currentQuery}
        currentSort={currentSort}
        totalProducts={products.length}
        view={view}
        onViewChange={setView}
      />

      {/* Products Grid/List */}
      <div>
        {paginatedProducts.length > 0 ? (
          <>
            <ProductsGrid products={paginatedProducts} view={view} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/productos"
            />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
}