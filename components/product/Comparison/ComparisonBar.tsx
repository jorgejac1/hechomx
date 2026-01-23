/**
 * @fileoverview Comparison bar component
 * Fixed bottom bar showing products added for comparison with quick actions.
 * Displays thumbnail previews and navigation to comparison page.
 * @module components/product/Comparison/ComparisonBar
 */

'use client';

import { useState, useEffect } from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/common/Button';

/**
 * Renders the fixed comparison bar at the bottom of the screen
 * @returns Comparison bar with product thumbnails and actions
 */
export default function ComparisonBar() {
  const { comparisonProducts, removeFromComparison, clearComparison, isFull, canCompare } =
    useComparison();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Only render after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server or before hydration
  if (!mounted || pathname === '/comparar') return null;

  // Don't render if no products
  if (comparisonProducts.length === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 animate-slide-up"
      role="region"
      aria-label="Productos en comparación"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left: Products */}
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
              Comparar ({comparisonProducts.length}/4)
              {isFull && (
                <span className="ml-2 text-xs text-amber-600 font-normal">• Máximo alcanzado</span>
              )}
            </span>

            <div className="flex gap-3">
              {comparisonProducts.map((product) => (
                <div key={product.id} className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 bg-white">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromComparison(product.id)}
                    className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all shadow-md"
                    aria-label={`Eliminar ${product.name} de la comparación`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Product name on hover */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {product.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearComparison}
              ariaLabel="Limpiar comparación"
            >
              Limpiar
            </Button>

            <Button variant="primary" size="md" href="/comparar" disabled={!canCompare}>
              Comparar productos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
