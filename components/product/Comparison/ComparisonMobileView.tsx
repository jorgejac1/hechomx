'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useComparison } from '@/contexts/ComparisonContext';
import { Product } from '@/types';
import Button from '@/components/common/Button';
import { ChevronLeft, ChevronRight, X, Star, ShoppingCart } from 'lucide-react';

interface ComparisonMobileViewProps {
  products: Product[];
  showOnlyDifferences: boolean;
}

export default function ComparisonMobileView({ products }: ComparisonMobileViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { removeFromComparison } = useComparison();

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const product1 = products[currentIndex];
  const product2 = products[(currentIndex + 1) % products.length];

  const showingTwoProducts = products.length >= 2;

  // Find min price
  const minPrice = Math.min(...products.map((p) => p.price));

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Navigation */}
      {products.length > 2 && (
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <button
            onClick={prevProduct}
            className="p-2.5 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Producto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Mostrando {currentIndex + 1}-{((currentIndex + 1) % products.length) + 1} de{' '}
            {products.length}
          </span>
          <button
            onClick={nextProduct}
            className="p-2.5 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Siguiente producto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Product Cards */}
      <div className={`grid ${showingTwoProducts ? 'grid-cols-2' : 'grid-cols-1'} gap-4 p-4`}>
        {/* Product 1 */}
        <ProductColumn
          product={product1}
          onRemove={removeFromComparison}
          isBestPrice={product1.price === minPrice}
        />

        {/* Product 2 */}
        {showingTwoProducts && (
          <ProductColumn
            product={product2}
            onRemove={removeFromComparison}
            isBestPrice={product2.price === minPrice}
          />
        )}
      </div>

      {/* Swipe indicator */}
      {products.length > 2 && (
        <div className="flex justify-center gap-2 py-3 bg-gray-50">
          {products.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex || index === (currentIndex + 1) % products.length
                  ? 'w-8 bg-primary-600'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Product Column Component
function ProductColumn({
  product,
  onRemove,
  isBestPrice,
}: {
  product: Product;
  onRemove: (id: string) => void;
  isBestPrice: boolean;
}) {
  const rating = product.rating || 0;

  return (
    <div className="relative border-2 border-gray-200 rounded-lg p-3">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(product.id)}
        className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md z-10"
        aria-label={`Eliminar ${product.name}`}
      >
        <X className="w-4 h-4" />
      </button>

      {/* Image */}
      <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 200px"
        />
      </div>

      {/* Product Info */}
      <h3 className="font-bold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>

      {/* Price */}
      <div className="mb-3">
        <p className="text-xl font-bold text-primary-600">
          ${product.price.toLocaleString('es-MX')}
        </p>
        {isBestPrice && (
          <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
            Mejor precio
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm font-bold ml-1">{rating.toFixed(1)}</span>
      </div>

      {/* Details - FIXED OVERFLOW */}
      <div className="space-y-1.5 mb-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-600 flex-shrink-0">Estado:</span>
          <span className="font-medium text-right truncate">{product.state}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-600 flex-shrink-0">Categoría:</span>
          <span className="font-medium text-right truncate">{product.category}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-600 flex-shrink-0 whitespace-nowrap">Disp:</span>
          <span
            className={`font-semibold text-right flex-shrink-0 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}
          >
            {product.inStock ? 'Disponible' : 'Agotado'}
          </span>
        </div>
      </div>

      {/* Actions - FIXED BUTTON TEXT */}
      <div className="space-y-2">
        <Button
          variant="primary"
          size="sm"
          href={`/productos/${product.id}`}
          className="w-full text-xs"
        >
          Ver detalles
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs px-2"
          disabled={!product.inStock}
          icon={<ShoppingCart className="w-3.5 h-3.5" />}
        >
          <span className="whitespace-nowrap">{product.inStock ? 'Agregar' : 'Agotado'}</span>
        </Button>
      </div>
    </div>
  );
}
