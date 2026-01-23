/**
 * @fileoverview Products management tab for the seller dashboard.
 * Provides a grid view of all products with bulk selection capabilities,
 * allowing sellers to mark products as out-of-stock, available, duplicate,
 * or delete them. Includes product statistics like views and favorites.
 * @module components/dashboard/tabs/ProductsTab
 */

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  Eye,
  Heart,
  Trash2,
  PackageX,
  PackageCheck,
  Copy,
  X,
  CheckSquare,
  Square,
  Minus,
} from 'lucide-react';
import { formatCurrency } from '@/lib';
import { ROUTES } from '@/lib';
import { SellerProduct } from '@/lib/types';
import { useToast } from '@/contexts/ToastContext';

/**
 * @interface ProductsTabProps
 * Props for the ProductsTab component.
 */
interface ProductsTabProps {
  /** Array of seller products to display and manage */
  products: SellerProduct[];
}

export default function ProductsTab({ products: initialProducts }: ProductsTabProps) {
  const [products, setProducts] = useState<SellerProduct[]>(initialProducts);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { showToast } = useToast();

  const allSelected = products.length > 0 && selectedIds.size === products.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < products.length;
  const noneSelected = selectedIds.size === 0;

  const selectedProducts = useMemo(
    () => products.filter((p) => selectedIds.has(p.id)),
    [products, selectedIds]
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map((p) => p.id)));
    }
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    const count = selectedIds.size;
    setProducts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
    showToast(
      `${count} producto${count > 1 ? 's' : ''} eliminado${count > 1 ? 's' : ''}`,
      'success'
    );
  };

  const handleBulkOutOfStock = () => {
    const count = selectedIds.size;
    setProducts((prev) =>
      prev.map((p) =>
        selectedIds.has(p.id) ? { ...p, stock: 0, status: 'out_of_stock' as const } : p
      )
    );
    setSelectedIds(new Set());
    showToast(
      `${count} producto${count > 1 ? 's' : ''} marcado${count > 1 ? 's' : ''} como agotado`,
      'success'
    );
  };

  const handleBulkInStock = () => {
    const count = selectedIds.size;
    setProducts((prev) =>
      prev.map((p) =>
        selectedIds.has(p.id) ? { ...p, stock: p.stock || 10, status: 'active' as const } : p
      )
    );
    setSelectedIds(new Set());
    showToast(
      `${count} producto${count > 1 ? 's' : ''} marcado${count > 1 ? 's' : ''} como disponible`,
      'success'
    );
  };

  const handleBulkDuplicate = () => {
    const count = selectedIds.size;
    const duplicates = selectedProducts.map((p) => ({
      ...p,
      id: `${p.id}-copy-${Date.now()}`,
      name: `${p.name} (Copia)`,
      sold: 0,
      views: 0,
      favorites: 0,
    }));
    setProducts((prev) => [...prev, ...duplicates]);
    setSelectedIds(new Set());
    showToast(
      `${count} producto${count > 1 ? 's' : ''} duplicado${count > 1 ? 's' : ''}`,
      'success'
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900">Mis Productos</h3>
          {products.length > 0 && (
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
            >
              {allSelected ? (
                <CheckSquare className="w-5 h-5 text-primary-600" />
              ) : someSelected ? (
                <Minus className="w-5 h-5 text-primary-600" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">
                {allSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}
              </span>
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href={ROUTES.PRODUCT_CREATE}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Agregar Producto</span>
            <span className="sm:hidden">Agregar</span>
          </Link>
          <Link
            href={ROUTES.PRODUCT_MANAGE}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold text-sm"
          >
            <span className="hidden sm:inline">Gestionar Todo</span>
            <span className="sm:hidden">Gestionar</span>
          </Link>
        </div>
      </div>

      {/* Empty State */}
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
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const isSelected = selectedIds.has(product.id);
            return (
              <div
                key={product.id}
                className={`border-2 rounded-lg overflow-hidden transition-all ${
                  isSelected
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Image with Checkbox */}
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />

                  {/* Checkbox Overlay */}
                  <button
                    onClick={() => toggleSelect(product.id)}
                    className={`absolute top-3 left-3 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'bg-white/90 border-gray-300 hover:border-primary-500'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Out of Stock Overlay */}
                  {product.status === 'out_of_stock' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Agotado
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h4>
                  <p className="text-xl font-bold text-primary-600 mb-3">
                    {formatCurrency(product.price)}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="bg-gray-50 p-2 rounded-sm">
                      <p className="text-gray-600">Stock</p>
                      <p
                        className={`font-semibold ${
                          product.stock === 0
                            ? 'text-red-600'
                            : product.stock <= 5
                              ? 'text-amber-600'
                              : 'text-gray-900'
                        }`}
                      >
                        {product.stock}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-sm">
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
            );
          })}
        </div>
      )}

      {/* Floating Bulk Action Bar */}
      {!noneSelected && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-gray-900 text-white rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3">
            {/* Selection Count */}
            <div className="flex items-center gap-2 pr-3 border-r border-gray-700">
              <span className="bg-primary-600 text-white text-sm font-bold px-2 py-0.5 rounded-sm">
                {selectedIds.size}
              </span>
              <span className="text-sm text-gray-300 hidden sm:inline">
                seleccionado{selectedIds.size > 1 ? 's' : ''}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleBulkOutOfStock}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-800 transition text-sm"
                title="Marcar como agotado"
              >
                <PackageX className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline">Agotar</span>
              </button>
              <button
                onClick={handleBulkInStock}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-800 transition text-sm"
                title="Marcar como disponible"
              >
                <PackageCheck className="w-4 h-4 text-green-400" />
                <span className="hidden md:inline">Disponible</span>
              </button>
              <button
                onClick={handleBulkDuplicate}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-800 transition text-sm"
                title="Duplicar"
              >
                <Copy className="w-4 h-4 text-blue-400" />
                <span className="hidden md:inline">Duplicar</span>
              </button>
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-900/50 transition text-sm"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                <span className="hidden md:inline">Eliminar</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={clearSelection}
              className="ml-2 p-1.5 rounded-lg hover:bg-gray-800 transition"
              title="Cancelar selección"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
