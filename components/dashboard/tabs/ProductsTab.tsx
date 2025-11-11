import Image from 'next/image';
import Link from 'next/link';
import { Plus, Eye, Heart } from 'lucide-react';
import { formatCurrency } from '@/lib';
import { ROUTES } from '@/lib';
import { SellerProduct } from '@/lib/types';

interface ProductsTabProps {
  products: SellerProduct[];
}

export default function ProductsTab({ products }: ProductsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Mis Productos</h3>
        <div className="flex gap-2">
          <Link
            href={ROUTES.PRODUCT_CREATE}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            Agregar Producto
          </Link>
          <Link
            href={ROUTES.PRODUCT_MANAGE}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold text-sm"
          >
            Gestionar Todo
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No tienes productos aún</p>
          <Link
            href={ROUTES.PRODUCT_CREATE}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Agregar Primer Producto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                {product.status === 'out_of_stock' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Agotado
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-xl font-bold text-primary-600 mb-3">
                  {formatCurrency(product.price)}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">Stock</p>
                    <p className="font-semibold text-gray-900">{product.stock}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">Vendidos</p>
                    <p className="font-semibold text-gray-900">{product.sold}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {product.views} vistas
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {product.favorites}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
