'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useComparison } from '@/contexts/ComparisonContext';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import Button from '@/components/common/Button';
import { X, Star, ShoppingCart } from 'lucide-react';

interface ComparisonTableProps {
  products: Product[];
  showOnlyDifferences: boolean;
}

export default function ComparisonTable({ products, showOnlyDifferences }: ComparisonTableProps) {
  const { removeFromComparison } = useComparison();
  const { addToCart, isInCart } = useCart();
  const [stickyHeader, setStickyHeader] = useState(false);

  // Calculate if values are different - using generic type instead of any
  const hasDifferentValues = <T,>(getAttribute: (p: Product) => T): boolean => {
    const values = products.map(getAttribute);
    return new Set(values).size > 1;
  };

  // Find best price
  const minPrice = Math.min(...products.map((p) => p.price));

  // Find winner (highest rating)
  const bestProduct = products.reduce((best, current) =>
    (current.rating || 0) > (best.rating || 0) ? current : best
  );

  // Scroll handler for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setStickyHeader(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create grid template for dynamic columns
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `250px repeat(${products.length}, 1fr)`,
    gap: '1rem',
  };

  // Reusable component for row labels
  const RowLabel = ({ label, hasDifference }: { label: string; hasDifference: boolean }) => (
    <div className="font-semibold text-gray-900 flex items-center justify-between pr-4">
      <span>{label}</span>
      {hasDifference && (
        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-medium whitespace-nowrap">
          Diferente
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Sticky Header */}
      <div
        style={gridStyle}
        className={`p-4 border-b-2 transition-all ${
          stickyHeader ? 'sticky top-0 z-20 bg-white shadow-md' : ''
        }`}
      >
        <div className="font-bold text-lg text-gray-900">Característica</div>
        {products.map((product) => (
          <div key={product.id} className="text-center relative">
            {/* Winner Badge */}
            {product.id === bestProduct.id && products.length > 2 && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 whitespace-nowrap">
                🏆 Recomendado
              </div>
            )}

            {/* Remove Button */}
            <button
              onClick={() => removeFromComparison(product.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all shadow-md z-10"
              aria-label={`Eliminar ${product.name}`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-32 h-32 mx-auto mb-3 mt-6">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                sizes="128px"
              />
            </div>
            <h3 className="font-bold text-sm line-clamp-2 px-2">{product.name}</h3>
            <a
              href={`/productos/${product.id}`}
              className="text-xs text-primary-600 hover:underline mt-1 inline-block"
            >
              Ver detalles →
            </a>
          </div>
        ))}
      </div>

      {/* Comparison Rows */}
      <div className="divide-y">
        {/* Price */}
        <div
          style={gridStyle}
          className={`p-4 transition-colors ${
            hasDifferentValues((p) => p.price) ? 'bg-yellow-50' : 'hover:bg-gray-50'
          }`}
        >
          <RowLabel label="Precio" hasDifference={hasDifferentValues((p) => p.price)} />
          {products.map((p) => (
            <div key={p.id} className="text-center flex items-center justify-center">
              <div>
                <p className="text-2xl font-bold text-primary-600">
                  ${p.price.toLocaleString('es-MX')}
                </p>
                <p className="text-xs text-gray-500">{p.currency}</p>
                {p.price === minPrice && products.length > 1 && (
                  <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                    Mejor precio
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Estado */}
        {(!showOnlyDifferences || hasDifferentValues((p) => p.state)) && (
          <div
            style={gridStyle}
            className={`p-4 transition-colors ${
              hasDifferentValues((p) => p.state) ? 'bg-yellow-50' : 'hover:bg-gray-50'
            }`}
          >
            <RowLabel label="Estado" hasDifference={hasDifferentValues((p) => p.state)} />
            {products.map((p) => (
              <div key={p.id} className="text-center flex items-center justify-center">
                <span className="text-gray-700">{p.state}</span>
              </div>
            ))}
          </div>
        )}

        {/* Categoría */}
        {(!showOnlyDifferences || hasDifferentValues((p) => p.category)) && (
          <div
            style={gridStyle}
            className={`p-4 transition-colors ${
              hasDifferentValues((p) => p.category) ? 'bg-yellow-50' : 'hover:bg-gray-50'
            }`}
          >
            <RowLabel label="Categoría" hasDifference={hasDifferentValues((p) => p.category)} />
            {products.map((p) => (
              <div key={p.id} className="text-center flex items-center justify-center">
                <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Calificación */}
        {(!showOnlyDifferences || hasDifferentValues((p) => p.rating)) && (
          <div
            style={gridStyle}
            className={`p-4 transition-colors ${
              hasDifferentValues((p) => p.rating) ? 'bg-yellow-50' : 'hover:bg-gray-50'
            }`}
          >
            <RowLabel label="Calificación" hasDifference={hasDifferentValues((p) => p.rating)} />
            {products.map((p) => {
              const rating = p.rating || 0;
              return (
                <div key={p.id} className="text-center flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-gray-900">{rating.toFixed(1)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reseñas */}
        {(!showOnlyDifferences || hasDifferentValues((p) => p.reviewCount)) && (
          <div
            style={gridStyle}
            className={`p-4 transition-colors ${
              hasDifferentValues((p) => p.reviewCount) ? 'bg-yellow-50' : 'hover:bg-gray-50'
            }`}
          >
            <RowLabel label="Reseñas" hasDifference={hasDifferentValues((p) => p.reviewCount)} />
            {products.map((p) => (
              <div key={p.id} className="text-center flex items-center justify-center">
                <span className="text-gray-700">{p.reviewCount || 0} reseñas</span>
              </div>
            ))}
          </div>
        )}

        {/* Artesano */}
        {(!showOnlyDifferences || hasDifferentValues((p) => p.maker)) && (
          <div
            style={gridStyle}
            className={`p-4 transition-colors ${
              hasDifferentValues((p) => p.maker) ? 'bg-yellow-50' : 'hover:bg-gray-50'
            }`}
          >
            <RowLabel label="Artesano" hasDifference={hasDifferentValues((p) => p.maker)} />
            {products.map((p) => (
              <div key={p.id} className="text-center flex items-center justify-center">
                <span className="text-gray-700">{p.maker}</span>
              </div>
            ))}
          </div>
        )}

        {/* Disponibilidad */}
        {(!showOnlyDifferences || hasDifferentValues((p) => p.inStock)) && (
          <div
            style={gridStyle}
            className={`p-4 transition-colors ${
              hasDifferentValues((p) => p.inStock) ? 'bg-yellow-50' : 'hover:bg-gray-50'
            }`}
          >
            <RowLabel label="Disponibilidad" hasDifference={hasDifferentValues((p) => p.inStock)} />
            {products.map((p) => (
              <div key={p.id} className="text-center flex items-center justify-center">
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                  <span className={`font-medium ${p.inStock ? 'text-green-700' : 'text-red-700'}`}>
                    {p.inStock ? 'Disponible' : 'Agotado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Verificado */}
        {(!showOnlyDifferences || hasDifferentValues((p) => p.verified)) && (
          <div
            style={gridStyle}
            className={`p-4 transition-colors ${
              hasDifferentValues((p) => p.verified) ? 'bg-yellow-50' : 'hover:bg-gray-50'
            }`}
          >
            <RowLabel label="Verificado" hasDifference={hasDifferentValues((p) => p.verified)} />
            {products.map((p) => (
              <div key={p.id} className="text-center flex items-center justify-center">
                {p.verified ? (
                  <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verificado
                  </span>
                ) : (
                  <span className="text-gray-500">No verificado</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions Row */}
        <div style={gridStyle} className="p-4 bg-gray-50">
          <div className="font-semibold text-gray-900">Acciones</div>
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                href={`/productos/${product.id}`}
                className="w-full whitespace-nowrap"
              >
                Ver detalles
              </Button>
              <button
                className={`w-full px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                  product.inStock
                    ? 'bg-white border-primary-600 text-primary-600 hover:bg-primary-50'
                    : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!product.inStock}
                onClick={() => addToCart(product, 1)}
              >
                <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {product.inStock
                    ? isInCart(product.id)
                      ? 'Agregar más'
                      : 'Agregar al carrito'
                    : 'Agotado'}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
