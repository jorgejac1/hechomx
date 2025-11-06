'use client';

import { Suspense } from 'react';
import { useUrlState } from '@/hooks/common/useUrlState';
import { FILTER_PARAM_NAMES, FILTER_PARAM_VALUES } from '@/lib/constants/filters';
import { formatCurrency } from '@/lib';

function QuickFiltersContent() {
  const { searchParams, setUrlParams } = useUrlState('/productos');

  const applyFilter = (key: string, value: string) => {
    const currentValue = searchParams.get(key);

    setUrlParams({
      [key]: currentValue === value ? undefined : value,
      [FILTER_PARAM_NAMES.PAGE]: undefined,
    });
  };

  const isActive = (key: string, value: string) => {
    return searchParams.get(key) === value;
  };

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <button
        onClick={() => applyFilter(FILTER_PARAM_NAMES.PRICE, '1000')}
        className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition ${
          isActive(FILTER_PARAM_NAMES.PRICE, '1000')
            ? 'border-primary-600 bg-primary-50 text-primary-700'
            : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        💰 Menos de {formatCurrency(1000)}
      </button>

      <button
        onClick={() => applyFilter(FILTER_PARAM_NAMES.PRICE, '5000')}
        className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition ${
          isActive(FILTER_PARAM_NAMES.PRICE, '5000')
            ? 'border-primary-600 bg-primary-50 text-primary-700'
            : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        💎 Menos de {formatCurrency(5000)}
      </button>

      <button
        onClick={() => applyFilter(FILTER_PARAM_NAMES.FEATURED, FILTER_PARAM_VALUES.YES)}
        className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition ${
          isActive(FILTER_PARAM_NAMES.FEATURED, FILTER_PARAM_VALUES.YES)
            ? 'border-primary-600 bg-primary-50 text-primary-700'
            : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        ⭐ Destacados
      </button>

      <button
        onClick={() => applyFilter(FILTER_PARAM_NAMES.VERIFIED, FILTER_PARAM_VALUES.YES)}
        className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition ${
          isActive(FILTER_PARAM_NAMES.VERIFIED, FILTER_PARAM_VALUES.YES)
            ? 'border-primary-600 bg-primary-50 text-primary-700'
            : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        ✓ Verificados
      </button>
    </div>
  );
}

export default function QuickFilters() {
  return (
    <Suspense fallback={<div className="h-12 animate-pulse bg-gray-100 rounded-lg" />}>
      <QuickFiltersContent />
    </Suspense>
  );
}
