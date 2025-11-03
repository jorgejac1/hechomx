'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Product } from '@/types';
import {
  useProductComparison,
  UseProductComparisonReturn,
} from '@/hooks/product/useProductComparison';
import { useToast } from '@/contexts/ToastContext';

type ComparisonContextType = UseProductComparisonReturn & {
  comparisonProducts: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
};

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const { info } = useToast();
  const comparison = useProductComparison({
    maxProducts: 4,
    persistToStorage: true,
    onLimitReached: () => {
      info('Máximo 4 productos en comparación. Quita uno para agregar otro.');
    },
  });

  // Create aliases for backward compatibility
  const contextValue: ComparisonContextType = {
    ...comparison,
    comparisonProducts: comparison.products,
    addToComparison: comparison.add,
    removeFromComparison: comparison.remove,
    clearComparison: comparison.clear,
    isInComparison: comparison.isComparing,
  };

  return <ComparisonContext.Provider value={contextValue}>{children}</ComparisonContext.Provider>;
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
