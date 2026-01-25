/**
 * @fileoverview Product conversion metrics table for seller analytics.
 * Displays per-product views, add-to-cart, and purchase conversion rates.
 * @module components/dashboard/ProductConversions
 */

'use client';

import { Eye, ShoppingCart, Package, TrendingUp, TrendingDown } from 'lucide-react';
import type { ProductConversion } from '@/lib/types/seller-types';

/**
 * Props for the ProductConversions component
 */
interface ProductConversionsProps {
  /** Array of product conversion data */
  products: ProductConversion[];
}

/**
 * Get color class based on conversion rate
 */
function getConversionColor(rate: number, type: 'viewToCart' | 'cartToPurchase'): string {
  const thresholds = type === 'viewToCart' ? { high: 15, medium: 10 } : { high: 25, medium: 15 };

  if (rate >= thresholds.high) return 'text-green-600 dark:text-green-400';
  if (rate >= thresholds.medium) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

/**
 * Get trend indicator based on rate comparison to average
 */
function getTrendIndicator(rate: number, average: number): 'up' | 'down' | 'stable' {
  const diff = rate - average;
  if (diff > 2) return 'up';
  if (diff < -2) return 'down';
  return 'stable';
}

/**
 * ProductConversions displays a table of per-product conversion metrics
 * helping sellers identify their best and worst performing products.
 */
export default function ProductConversions({ products }: ProductConversionsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  // Calculate averages for comparison
  const avgViewToCart = products.reduce((sum, p) => sum + p.viewToCartRate, 0) / products.length;
  const avgCartToPurchase =
    products.reduce((sum, p) => sum + p.cartToPurchaseRate, 0) / products.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
            Conversión por Producto
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Métricas de conversión de tus productos principales
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Producto
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                <div className="flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" />
                  Vistas
                </div>
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                <div className="flex items-center justify-center gap-1">
                  <ShoppingCart className="w-3 h-3" />
                  Al carrito
                </div>
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                <div className="flex items-center justify-center gap-1">
                  <Package className="w-3 h-3" />
                  Compras
                </div>
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Vista → Carrito
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Carrito → Compra
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const viewToCartTrend = getTrendIndicator(product.viewToCartRate, avgViewToCart);
              const cartToPurchaseTrend = getTrendIndicator(
                product.cartToPurchaseRate,
                avgCartToPurchase
              );

              return (
                <tr
                  key={product.productId}
                  className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="py-3 px-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {product.productName}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {product.views.toLocaleString('es-MX')}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {product.addToCart.toLocaleString('es-MX')}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {product.purchases.toLocaleString('es-MX')}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className={`text-sm font-semibold ${getConversionColor(product.viewToCartRate, 'viewToCart')}`}
                      >
                        {product.viewToCartRate.toFixed(1)}%
                      </span>
                      {viewToCartTrend === 'up' && (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      )}
                      {viewToCartTrend === 'down' && (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className={`text-sm font-semibold ${getConversionColor(product.cartToPurchaseRate, 'cartToPurchase')}`}
                      >
                        {product.cartToPurchaseRate.toFixed(1)}%
                      </span>
                      {cartToPurchaseTrend === 'up' && (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      )}
                      {cartToPurchaseTrend === 'down' && (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div key={product.productId} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-3">
              {product.productName}
            </h4>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                  <Eye className="w-3 h-3" />
                  <span className="text-xs">Vistas</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {product.views.toLocaleString('es-MX')}
                </span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                  <ShoppingCart className="w-3 h-3" />
                  <span className="text-xs">Carrito</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {product.addToCart.toLocaleString('es-MX')}
                </span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                  <Package className="w-3 h-3" />
                  <span className="text-xs">Compras</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {product.purchases.toLocaleString('es-MX')}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">Vista → Carrito</span>
                <p
                  className={`text-sm font-bold ${getConversionColor(product.viewToCartRate, 'viewToCart')}`}
                >
                  {product.viewToCartRate.toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">Carrito → Compra</span>
                <p
                  className={`text-sm font-bold ${getConversionColor(product.cartToPurchaseRate, 'cartToPurchase')}`}
                >
                  {product.cartToPurchaseRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Averages Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-center">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Promedio Vista → Carrito
            </span>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {avgViewToCart.toFixed(1)}%
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Promedio Carrito → Compra
            </span>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {avgCartToPurchase.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
