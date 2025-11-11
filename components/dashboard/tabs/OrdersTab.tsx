import Image from 'next/image';
import { Clock, Package, Truck, CheckCircle2, XCircle, CheckCheck } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib';
import { Order } from '@/lib/types'; // Import only

const ORDER_STATUS_CONFIG = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: CheckCheck },
  processing: { label: 'Procesando', color: 'bg-blue-100 text-blue-800', icon: Package },
  shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircle },
} as const;

interface OrdersTabProps {
  orders: Order[];
}

export default function OrdersTab({ orders }: OrdersTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Todos los Pedidos</h3>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No hay pedidos</p>
      ) : (
        orders.map((order) => {
          const statusConfig = ORDER_STATUS_CONFIG[order.status];
          const StatusIcon = statusConfig.icon;
          return (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-bold text-gray-900">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-600">{formatRelativeTime(order.createdAt)}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}
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
                  <p className="text-xs text-gray-500 mt-1">Rastreo: {order.tracking}</p>
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
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">
                        {item.quantity} x {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.quantity * item.price)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-900">Total</p>
                  <p className="text-xl font-bold text-primary-600">
                    {formatCurrency(order.total)}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
