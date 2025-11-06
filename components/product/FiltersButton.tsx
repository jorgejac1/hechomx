'use client';

import { Suspense } from 'react';
import { Filter } from 'lucide-react';

interface FiltersButtonProps {
  onClick: () => void;
  activeCount?: number;
}

function FiltersButtonContent({ onClick, activeCount = 0 }: FiltersButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-primary-500 hover:text-primary-600 transition"
    >
      <Filter className="w-5 h-5" />
      Filtros
      {activeCount > 0 && (
        <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-primary-600 text-white rounded-full">
          {activeCount}
        </span>
      )}
    </button>
  );
}

export default function FiltersButton(props: FiltersButtonProps) {
  return (
    <Suspense
      fallback={
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700">
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      }
    >
      <FiltersButtonContent {...props} />
    </Suspense>
  );
}
