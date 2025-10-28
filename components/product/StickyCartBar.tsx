'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

interface StickyCartBarProps {
  product: Product;
  selectedQuantity: number;
  onAddToCart: () => void;
}

export default function StickyCartBar({ product, selectedQuantity, onAddToCart }: StickyCartBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || !product.inStock) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-40 md:hidden animate-slide-up">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 truncate text-sm">{product.name}</p>
          <p className="text-lg font-bold text-teal-600">
            ${product.price.toLocaleString('es-MX')} {product.currency}
          </p>
        </div>
        <button
          onClick={onAddToCart}
          className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Agregar</span>
        </button>
      </div>
    </div>
  );
}