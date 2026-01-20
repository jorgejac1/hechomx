'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency } from '@/lib';
import Button from '@/components/common/Button';

interface StickyCartBarProps {
  product: Product;
  selectedQuantity: number;
  onAddToCart: () => void;
}

export default function StickyCartBar({
  product,
  selectedQuantity,
  onAddToCart,
}: StickyCartBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || !product.inStock) return null;

  const totalPrice = product.price * selectedQuantity;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 md:hidden animate-slide-up pb-safe">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 truncate text-xs">{product.name}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-base font-bold text-teal-600">{formatCurrency(totalPrice)}</p>
            {selectedQuantity > 1 && (
              <span className="text-xs text-gray-600">
                ({selectedQuantity} × {formatCurrency(product.price)})
              </span>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onAddToCart}
          icon={<ShoppingCart className="w-4 h-4" />}
          className="shrink-0"
        >
          {selectedQuantity > 1 ? `Agregar (${selectedQuantity})` : 'Agregar'}
        </Button>
      </div>
    </div>
  );
}
