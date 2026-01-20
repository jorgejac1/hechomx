'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@/hooks/common/useMediaQuery';
import ComparisonTable from './ComparisonTable';
import ComparisonMobileView from './ComparisonMobileView';
import ComparisonProsCons from './ComparisonProscons';
import ComparisonActions from './ComparisonActions';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/feedback/EmptyState';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

function ComparisonPageContent() {
  const { comparisonProducts, clearComparison } = useComparison();
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const tableRef = useRef<HTMLDivElement>(null);

  // Wait for hydration to complete
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Load products from URL if shared
  useEffect(() => {
    const productIds = searchParams?.get('products');
    if (productIds && comparisonProducts.length === 0) {
      // TODO: Load products from API and add to comparison
      // const ids = productIds.split(',');
      // loadProductsAndAddToComparison(ids);
    }
  }, [searchParams, comparisonProducts.length]);

  // Track page view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Comparison Page',
        products_count: comparisonProducts.length,
      });
    }
  }, [comparisonProducts.length]);

  const handleBack = () => {
    router.back();
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar la comparación?')) {
      clearComparison();
      router.push('/productos');
    }
  };

  // Show loading spinner during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show empty state if no products (only after hydration)
  if (comparisonProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <EmptyState
            icon="search"
            title="No hay productos para comparar"
            description="Agrega productos desde el catálogo para comenzar a compararlos."
            action={
              <Button variant="primary" href="/productos">
                Ver productos
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Comparar Productos
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Comparando {comparisonProducts.length} producto
                {comparisonProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border-2 transition-all ${
                  showOnlyDifferences
                    ? 'bg-primary-50 border-primary-600 text-primary-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {showOnlyDifferences ? '✓ ' : ''}
                <span className="hidden sm:inline">Mostrar solo diferencias</span>
                <span className="sm:hidden">Solo diferencias</span>
              </button>

              <Button variant="ghost" size="sm" onClick={handleClearAll}>
                <span className="hidden sm:inline">Limpiar todo</span>
                <span className="sm:hidden">Limpiar</span>
              </Button>

              <Button variant="secondary" size="sm" onClick={handleBack}>
                Volver
              </Button>
            </div>
          </div>
        </div>

        <ComparisonActions products={comparisonProducts} tableRef={tableRef} />

        <div ref={tableRef} id="comparison-table" className="mb-8">
          {isMobile ? (
            <ComparisonMobileView
              products={comparisonProducts}
              showOnlyDifferences={showOnlyDifferences}
            />
          ) : (
            <ComparisonTable
              products={comparisonProducts}
              showOnlyDifferences={showOnlyDifferences}
            />
          )}
        </div>

        {comparisonProducts.length >= 2 && <ComparisonProsCons products={comparisonProducts} />}

        <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6 md:p-8 mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Descripciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {comparisonProducts.map((product) => (
              <div key={product.id} className="border-l-4 border-primary-500 pl-3 sm:pl-4">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparisonPageClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        </div>
      }
    >
      <ComparisonPageContent />
    </Suspense>
  );
}
