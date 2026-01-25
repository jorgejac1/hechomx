/**
 * @fileoverview Quick edit modal for inline product editing from dashboard.
 * Allows sellers to quickly update product name, price, and stock without
 * navigating away from the dashboard.
 * @module components/dashboard/QuickEditModal
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Save, Loader2, Package, DollarSign, Hash, AlertCircle } from 'lucide-react';
import { SellerProduct } from '@/lib/types';
import { formatCurrency } from '@/lib';

/**
 * Data returned when saving quick edit changes
 */
export interface QuickEditData {
  name: string;
  price: number;
  stock: number;
}

/**
 * Props for the QuickEditModal component
 */
interface QuickEditModalProps {
  /** Product to edit */
  product: SellerProduct | null;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when save is triggered */
  onSave: (productId: string, data: QuickEditData) => Promise<void>;
}

/**
 * QuickEditModal provides a lightweight inline editing experience for products.
 * Sellers can quickly update name, price, and stock without leaving the dashboard.
 */
export default function QuickEditModal({ product, isOpen, onClose, onSave }: QuickEditModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; price?: string; stock?: string }>({});

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setErrors({});
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSaving) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isSaving, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validate = useCallback((): boolean => {
    const newErrors: { name?: string; price?: string; stock?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = 'Ingresa un precio válido mayor a 0';
    }

    const stockNum = parseInt(stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      newErrors.stock = 'El stock debe ser 0 o mayor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, price, stock]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product || !validate()) return;

    setIsSaving(true);
    try {
      await onSave(product.id, {
        name: name.trim(),
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      });
      onClose();
    } catch {
      setErrors({ name: 'Error al guardar. Inténtalo de nuevo.' });
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges =
    product &&
    (name !== product.name ||
      parseFloat(price) !== product.price ||
      parseInt(stock, 10) !== product.stock);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={isSaving ? undefined : onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-md transform rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-edit-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <h2
              id="quick-edit-title"
              className="text-lg font-bold text-gray-900 dark:text-gray-100"
            >
              Edición Rápida
            </h2>
            <button
              onClick={onClose}
              disabled={isSaving}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Preview */}
          <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-900/50">
            <Image
              src={product.image}
              alt={product.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {product.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatCurrency(product.price)} · Stock: {product.stock}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="quick-edit-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                <Package className="w-4 h-4 inline mr-1.5" />
                Nombre del Producto
              </label>
              <input
                id="quick-edit-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSaving}
                className={`w-full px-3 py-2 rounded-lg border text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition
                  ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'
                  }
                  focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                placeholder="Nombre del producto"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Price and Stock Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label
                  htmlFor="quick-edit-price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  <DollarSign className="w-4 h-4 inline mr-1.5" />
                  Precio (MXN)
                </label>
                <input
                  id="quick-edit-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isSaving}
                  className={`w-full px-3 py-2 rounded-lg border text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition
                    ${
                      errors.price
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'
                    }
                    focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="quick-edit-stock"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  <Hash className="w-4 h-4 inline mr-1.5" />
                  Stock
                </label>
                <input
                  id="quick-edit-stock"
                  type="number"
                  min="0"
                  step="1"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  disabled={isSaving}
                  className={`w-full px-3 py-2 rounded-lg border text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition
                    ${
                      errors.stock
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'
                    }
                    focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.stock}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving || !hasChanges}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Guardar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
