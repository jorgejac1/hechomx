'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types';

interface ComparisonContextType {
  comparisonProducts: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);

  const addToComparison = (product: Product) => {
    if (comparisonProducts.length < 4 && !isInComparison(product.id)) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(comparisonProducts.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonProducts([]);
  };

  const isInComparison = (productId: string) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonProducts,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}