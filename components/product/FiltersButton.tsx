'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { formatCurrency, ROUTES } from '@/lib';

export default function QuickFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applyFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Toggle filter if already active
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset to page 1 when filtering
    params.delete('pagina');

    // ✅ Use ROUTES constant
    router.push(`${ROUTES.PRODUCTS}?${params.toString()}`);
  };

  const isActive = (key: string, value: string) => {
    return searchParams.get(key) === value;
  };

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <button
        onClick={() => applyFilter('precio', '1000')}
        className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition ${
          isActive('precio', '1000')
            ? 'border-primary-600 bg-primary-50 text-primary-700'
            : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        💰 Menos de {formatCurrency(1000)}
      </button>

      <button
        onClick={() => applyFilter('precio', '5000')}
        className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition ${
          isActive('precio', '5000')
            ? 'border-primary-600 bg-primary-50 text-primary-700'
            : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        💎 Menos de {formatCurrency(5000)}
      </button>

      <button
        onClick={() => applyFilter('destacado', 'si')}
        className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition ${
          isActive('destacado', 'si')
            ? 'border-primary-600 bg-primary-50 text-primary-700'
            : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        ⭐ Destacados
      </button>

      <button
        onClick={() => applyFilter('verificado', 'si')}
        className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition ${
          isActive('verificado', 'si')
            ? 'border-primary-600 bg-primary-50 text-primary-700'
            : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        ✓ Verificados
      </button>
    </div>
  );
}
