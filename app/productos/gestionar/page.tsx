'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { ROUTES } from '@/lib/constants/routes';
import { formatCurrency } from '@/lib';
import type { User } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Eye, Package, AlertCircle, Search, Filter } from 'lucide-react';

export default function ManageProductsPage() {
  return (
    <AuthPageWrapper requireSeller loadingText="Cargando...">
      {(user) => <ManageProductsContent user={user} />}
    </AuthPageWrapper>
  );
}

function ManageProductsContent({ user }: { user: User }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const products = user.makerProfile!.products || [];
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestionar Productos</h1>
            <p className="text-gray-600">{products.length} productos en total</p>
          </div>
          <Link
            href={ROUTES.PRODUCT_CREATE}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Agregar Producto
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Products List */}
        {filteredProducts.length > 0 ? (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-primary-600 mb-2">
                      {formatCurrency(product.price)}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        Stock: {product.stock}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {product.views} vistas
                      </span>
                      <span>Vendidos: {product.sold}</span>
                    </div>

                    {product.stock === 0 && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                        <AlertCircle className="w-4 h-4" />
                        Sin Stock
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2">
                    <button
                      onClick={() => router.push(`/productos/${product.id}`)}
                      className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                      title="Ver"
                    >
                      <Eye className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => router.push(`/productos/editar/${product.id}`)}
                      className="flex-1 sm:flex-none px-4 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition text-sm font-medium"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('¿Estás seguro de eliminar este producto?')) {
                          // TODO: Delete product
                          console.log('Delete:', product.id);
                        }
                      }}
                      className="flex-1 sm:flex-none px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchQuery ? 'No se encontraron productos' : 'Aún no tienes productos'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Intenta con otra búsqueda' : 'Comienza agregando tu primer producto'}
            </p>
            {!searchQuery && (
              <Link
                href={ROUTES.PRODUCT_CREATE}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                <Plus className="w-5 h-5" />
                Crear Producto
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
