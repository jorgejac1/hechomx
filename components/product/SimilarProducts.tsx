'use client';

import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface SimilarProductsProps {
  products: Product[];
  category: string;
}

export default function SimilarProducts({ products, category }: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Productos Similares
        </h2>
        <Link
          href={`/productos?category=${category}`}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
        >
          <span>Ver más</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}