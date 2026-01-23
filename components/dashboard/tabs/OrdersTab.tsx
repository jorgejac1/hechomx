/**
 * @fileoverview Orders management tab component for the seller dashboard.
 * Displays all orders with their status, allows status updates, and handles
 * tracking number input for shipped orders. Supports order workflow from
 * pending through delivered or cancelled states.
 * @module components/dashboard/tabs/OrdersTab
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  CheckCheck,
  ChevronDown,
  Send,
  X,
} from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib';
import { Order } from '@/lib/types';
import { useToast } from '@/contexts/ToastContext';

/**
 * @typedef {'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'} OrderStatus
 * Represents the possible states of an order in the fulfillment workflow.
 */
type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Configuration mapping for order status display properties.
 * Each status has a label, color class, and associated icon.
 */
const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: CheckCheck },
  processing: { label: 'Procesando', color: 'bg-indigo-100 text-indigo-800', icon: Package },
  shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircle },
};

/**
 * Defines the valid state transitions for each order status.
 * Controls which status changes are allowed from the current state.
 */
const NEXT_STATUS_OPTIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
};

/**
 * @interface OrdersTabProps
 * Props for the OrdersTab component.
 */
interface OrdersTabProps {
  /** Array of orders to display and manage */
  orders: Order[];
}

export default function OrdersTab({ orders: initialOrders }: OrdersTabProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus, tracking?: string) => {
    // Validate tracking for shipped status
    if (newStatus === 'shipped' && !tracking?.trim()) {
      showToast('Ingresa el número de rastreo para marcar como enviado', 'error');
      return;
    }

    setUpdatingOrder(orderId);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              ...(tracking && { tracking: tracking.trim() }),
            }
          : order
      )
    );

    // Clear tracking input and collapse
    setTrackingInputs((prev) => ({ ...prev, [orderId]: '' }));
    setExpandedOrder(null);
    setUpdatingOrder(null);

    const statusLabel = ORDER_STATUS_CONFIG[newStatus].label.toLowerCase();
    showToast(`Pedido marcado como ${statusLabel}`, 'success');
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Todos los Pedidos</h3>
        <p className="text-sm text-gray-500">
          {orders.length} pedido{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No hay pedidos</p>
        </div>
      ) : (
        orders.map((order) => {
          const statusConfig = ORDER_STATUS_CONFIG[order.status as OrderStatus];
          const StatusIcon = statusConfig.icon;
          const nextStatuses = NEXT_STATUS_OPTIONS[order.status as OrderStatus];
          const isExpanded = expandedOrder === order.id;
          const isUpdating = updatingOrder === order.id;
          const trackingValue = trackingInputs[order.id] || '';

          return (
            <div
              key={order.id}
              className={`border rounded-xl overflow-hidden transition-all ${
                isExpanded ? 'border-primary-300 shadow-md' : 'border-gray-200'
              }`}
            >
              {/* Order Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-gray-900">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-600">{formatRelativeTime(order.createdAt)}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.color}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {statusConfig.label}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">{order.customer.name}</p>
                  <p className="text-sm text-gray-600">{order.customer.email}</p>
                  {order.tracking && (
                    <p className="text-xs text-purple-600 font-medium mt-1 flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      Rastreo: {order.tracking}
                    </p>
                  )}
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Image
                        src={item.images[0] || '/placeholder.jpg'}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(item.quantity * item.price)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total & Actions */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-900">Total</p>
                    <p className="text-xl font-bold text-primary-600">
                      {formatCurrency(order.total)}
                    </p>
                  </div>

                  {/* Status Update Button */}
                  {nextStatuses.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition font-medium text-sm"
                      >
                        {isExpanded ? (
                          <>
                            <X className="w-4 h-4" />
                            Cancelar
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Actualizar Estado
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Status Options */}
              {isExpanded && nextStatuses.length > 0 && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Cambiar estado a:</p>

                  {/* Tracking Input for Shipped */}
                  {nextStatuses.includes('shipped') && (
                    <div className="mb-4">
                      <label className="block text-sm text-gray-600 mb-1">
                        Número de rastreo (requerido para envío)
                      </label>
                      <input
                        type="text"
                        value={trackingValue}
                        onChange={(e) =>
                          setTrackingInputs((prev) => ({ ...prev, [order.id]: e.target.value }))
                        }
                        placeholder="Ej: MEX123456789"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  )}

                  {/* Status Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {nextStatuses.map((status) => {
                      const config = ORDER_STATUS_CONFIG[status];
                      const Icon = config.icon;
                      const isShipped = status === 'shipped';
                      const isCancelled = status === 'cancelled';

                      return (
                        <button
                          key={status}
                          onClick={() =>
                            handleStatusChange(
                              order.id,
                              status,
                              isShipped ? trackingValue : undefined
                            )
                          }
                          disabled={isUpdating}
                          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition disabled:opacity-50 ${
                            isCancelled
                              ? 'bg-red-100 hover:bg-red-200 text-red-700'
                              : 'bg-primary-600 hover:bg-primary-700 text-white'
                          }`}
                        >
                          {isUpdating ? (
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : isShipped ? (
                            <Send className="w-4 h-4" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                          {isShipped ? 'Marcar Enviado' : config.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Actions Info */}
                  <div className="mt-3 text-xs text-gray-500">
                    {order.status === 'pending' && (
                      <p>Confirma el pedido para comenzar a prepararlo</p>
                    )}
                    {order.status === 'confirmed' && (
                      <p>Marca como procesando cuando empieces a preparar el envío</p>
                    )}
                    {order.status === 'processing' && (
                      <p>Agrega el número de rastreo al marcar como enviado</p>
                    )}
                    {order.status === 'shipped' && (
                      <p>Marca como entregado cuando el cliente reciba el pedido</p>
                    )}
                  </div>
                </div>
              )}

              {/* Completed/Cancelled Badge */}
              {nextStatuses.length === 0 && (
                <div
                  className={`px-6 py-3 text-center text-sm font-medium ${
                    order.status === 'delivered'
                      ? 'bg-green-50 text-green-700'
                      : order.status === 'cancelled'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {order.status === 'delivered' && (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Pedido completado
                    </span>
                  )}
                  {order.status === 'cancelled' && (
                    <span className="flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Pedido cancelado
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
