/**
 * @fileoverview Product comparison context for managing side-by-side product comparisons.
 * Allows users to add up to 4 products for comparison with localStorage persistence.
 * Provides toast notifications when comparison limit is reached.
 * @module contexts/ComparisonContext
 */

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Product } from '@/types';
import {
  useProductComparison,
  UseProductComparisonReturn,
} from '@/hooks/product/useProductComparison';
import { useToast } from '@/contexts/ToastContext';

/**
 * Comparison context value type extending the useProductComparison hook
 * @typedef ComparisonContextType
 */
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
