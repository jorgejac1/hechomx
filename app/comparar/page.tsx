'use client';

import { useComparison } from '@/contexts/ComparisonContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

export default function ComparePage() {
  const { comparisonProducts, clearComparison } = useComparison();
  const router = useRouter();

  if (comparisonProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No hay productos para comparar
          </h1>
          <p className="text-gray-600 mb-8">
            Selecciona productos desde el listado usando los botones de comparación
          </p>
          {/* UPDATED: Empty State Button */}
          <Button
            variant="primary"
            size="lg"
            href="/productos"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            }
            iconPosition="right"
          >
            Ver productos
          </Button>
        </div>
      </div>
    );
  }

  const features = [
    { key: 'price', label: 'Precio' },
    { key: 'state', label: 'Estado' },
    { key: 'category', label: 'Categoría' },
    { key: 'rating', label: 'Calificación' },
    { key: 'reviewCount', label: 'Reseñas' },
    { key: 'maker', label: 'Artesano' },
    { key: 'inStock', label: 'Disponibilidad' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Comparar Productos
            </h1>
            <p className="text-gray-600">
              Comparando {comparisonProducts.length} {comparisonProducts.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>
          {/* UPDATED: Header Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="md"
              onClick={clearComparison}
              ariaLabel="Limpiar todos los productos de la comparación"
            >
              Limpiar todo
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => router.back()}
              ariaLabel="Volver a la página anterior"
            >
              Volver
            </Button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Tabla de comparación de productos">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">
                    Característica
                  </th>
                  {comparisonProducts.map((product) => (
                    <th key={product.id} className="p-4 min-w-[250px]" scope="col">
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-lg overflow-hidden mb-3 border-2 border-gray-200">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 text-center mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        {/* UPDATED: Product Detail Link */}
                        <Button
                          variant="ghost"
                          size="sm"
                          href={`/productos/${product.id}`}
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          }
                          iconPosition="right"
                        >
                          Ver detalles
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={feature.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-inherit z-10" scope="row">
                      {feature.label}
                    </td>
                    {comparisonProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {/* Price */}
                        {feature.key === 'price' && (
                          <div>
                            <span className="text-2xl font-bold text-gray-900">
                              ${product.price.toLocaleString('es-MX')}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">{product.currency}</span>
                          </div>
                        )}

                        {/* State */}
                        {feature.key === 'state' && (
                          <span className="text-gray-700">{product.state}</span>
                        )}

                        {/* Category - UPDATED */}
                        {feature.key === 'category' && (
                          <Badge variant="info" size="sm">
                            {product.category}
                          </Badge>
                        )}

                        {/* Rating */}
                        {feature.key === 'rating' && product.rating && (
                          <div className="flex items-center justify-center gap-1">
                            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="font-semibold text-gray-900">{product.rating}</span>
                          </div>
                        )}

                        {/* Review Count */}
                        {feature.key === 'reviewCount' && product.reviewCount && (
                          <span className="text-gray-600">
                            {product.reviewCount.toLocaleString('es-MX')} reseñas
                          </span>
                        )}

                        {/* Maker */}
                        {feature.key === 'maker' && (
                          <span className="text-gray-700 font-medium">{product.maker}</span>
                        )}

                        {/* In Stock - UPDATED */}
                        {feature.key === 'inStock' && (
                          product.inStock ? (
                            <Badge 
                              variant="success" 
                              size="sm"
                              icon={
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              }
                            >
                              Disponible
                            </Badge>
                          ) : (
                            <Badge variant="danger" size="sm">
                              Agotado
                            </Badge>
                          )
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Descripciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonProducts.map((product) => (
              <div key={product.id} className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}