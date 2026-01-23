/**
 * @fileoverview Alerts section component for the seller dashboard.
 * Displays important notifications including new orders, out-of-stock products,
 * and low stock warnings. Alerts are color-coded by severity and can link
 * to relevant management pages.
 * @module components/dashboard/AlertsSection
 */

'use client';

import { AlertCircle, Package, ShoppingBag, ArrowRight } from 'lucide-react';
import { CompleteOrder } from '@/lib/types/checkout';
import { formatCurrency } from '@/lib/utils/currency';

/**
 * @interface ProductAlert
 * Represents a product with stock-related alert information.
 */
interface ProductAlert {
  /** Name of the product */
  name: string;
  /** Current stock quantity */
  stock: number;
}

/**
 * @interface AlertsSectionProps
 * Props for the AlertsSection component.
 */
interface AlertsSectionProps {
  /** Products with low stock levels */
  lowStockProducts: ProductAlert[];
  /** Products that are completely out of stock */
  outOfStockProducts: ProductAlert[];
  /** Array of new orders requiring attention */
  newOrders?: CompleteOrder[];
  /** Seller name for filtering order items */
  sellerName?: string;
  /** Callback to navigate to orders view */
  onViewOrders?: () => void;
}

export default function AlertsSection({
  lowStockProducts,
  outOfStockProducts,
  newOrders = [],
  sellerName,
  onViewOrders,
}: AlertsSectionProps) {
  const hasAlerts =
    lowStockProducts.length > 0 || outOfStockProducts.length > 0 || newOrders.length > 0;

  if (!hasAlerts) {
    return null;
  }

  // Calculate total from new orders for this seller
  const calculateSellerTotal = (order: CompleteOrder): number => {
    if (!sellerName) return order.total;
    return order.items
      .filter((item) => item.maker.toLowerCase() === sellerName.toLowerCase())
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const totalNewOrdersValue = newOrders.reduce(
    (sum, order) => sum + calculateSellerTotal(order),
    0
  );

  return (
    <div className="mb-6 space-y-3">
      {/* New Orders Alert */}
      {newOrders.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 rounded-full p-2">
              <ShoppingBag className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-green-900">
                  {newOrders.length === 1
                    ? '¡Tienes 1 nuevo pedido!'
                    : `¡Tienes ${newOrders.length} nuevos pedidos!`}
                </p>
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NUEVO
                </span>
              </div>
              <p className="text-sm text-green-800 mt-1">
                Valor total: {formatCurrency(totalNewOrdersValue)}
              </p>
              <div className="mt-3 space-y-2">
                {newOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between text-sm bg-green-100/50 rounded-md px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">{order.orderNumber}</span>
                    </div>
                    <span className="text-green-700">
                      {formatCurrency(calculateSellerTotal(order))}
                    </span>
                  </div>
                ))}
                {newOrders.length > 3 && (
                  <p className="text-sm text-green-700 pl-3">
                    +{newOrders.length - 3} pedido{newOrders.length - 3 > 1 ? 's' : ''} más
                  </p>
                )}
              </div>
              {onViewOrders && (
                <button
                  onClick={onViewOrders}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-900 transition-colors"
                >
                  Ver todos los pedidos
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Out of Stock Alert */}
      {outOfStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">
              {outOfStockProducts.length} producto
              {outOfStockProducts.length > 1 ? 's' : ''} sin stock
            </p>
            <p className="text-sm text-red-800">
              {outOfStockProducts.map((p) => p.name).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900">
              {lowStockProducts.length} producto
              {lowStockProducts.length > 1 ? 's' : ''} con poco stock
            </p>
            <p className="text-sm text-yellow-800">
              {lowStockProducts.map((p) => `${p.name} (${p.stock})`).join(', ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
