'use client';

import { useComparison } from '@/contexts/ComparisonContext';
import Link from 'next/link';
import Image from 'next/image';

export default function ComparisonBar() {
  const { comparisonProducts, removeFromComparison, clearComparison } = useComparison();

  if (comparisonProducts.length === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 transition-transform"
      role="region"
      aria-label="Productos en comparación"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left: Products */}
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
              Comparar ({comparisonProducts.length}/4):
            </span>
            
            <div className="flex gap-3">
              {comparisonProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative group flex-shrink-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 bg-white">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {/* Remove button - AJUSTADO: más grande y más abajo */}
                  <button
                    onClick={() => removeFromComparison(product.id)}
                    className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all shadow-md"
                    aria-label={`Eliminar ${product.name} de la comparación`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Product name on hover */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {product.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={clearComparison}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-lg transition-colors"
              aria-label="Limpiar comparación"
            >
              Limpiar
            </button>
            
            <Link
              href="/comparar"
              className={`px-6 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors ${
                comparisonProducts.length < 2 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
              }`}
              aria-disabled={comparisonProducts.length < 2}
            >
              Comparar productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}