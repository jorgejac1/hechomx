import Image from 'next/image';
import {
  TrendingUp,
  Eye,
  Heart,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  CheckCheck,
} from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib';
import { SellerProduct, Order } from '@/lib/types';
import QuickActions from '../QuickActions';

const ORDER_STATUS_CONFIG = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: CheckCheck },
  processing: { label: 'Procesando', color: 'bg-blue-100 text-blue-800', icon: Package },
  shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircle },
} as const;

interface OverviewTabProps {
  userEmail: string;
  shopName: string;
  products: SellerProduct[];
  recentOrders: Order[];
}

export default function OverviewTab({
  userEmail,
  shopName,
  products,
  recentOrders,
}: OverviewTabProps) {
  // Find trending products
  const trendingProducts = products
    .filter((p) => p.views > 100)
    .sort((a, b) => b.views + b.favorites - (a.views + a.favorites))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Quick Actions Widget */}
      <QuickActions userEmail={userEmail} shopName={shopName} />

      {/* Trending Products Section */}
      {trendingProducts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Productos en Tendencia</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="bg-linear-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </span>
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <p className="font-semibold text-gray-900 mb-1 text-sm">{product.name}</p>
                <p className="text-base font-bold text-primary-600 mb-2">
                  {formatCurrency(product.price)}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {product.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {product.favorites}
                  </span>
                  <span className="font-semibold text-green-600">+{product.sold} ventas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Pedidos Recientes</h3>
        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.slice(0, 3).map((order) => {
              const statusConfig = ORDER_STATUS_CONFIG[order.status];
              const StatusIcon = statusConfig.icon;

              // Defensive: Check if items and images exist
              const firstImage = order.items?.[0]?.images?.[0] || '/placeholder.jpg';

              return (
                <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Image
                    src={firstImage}
                    alt={order.items[0]?.name || 'Product'}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{order.customer.name}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {order.items[0]?.name || 'Unknown product'}
                      {order.items.length > 1 && ` +${order.items.length - 1} más`}
                    </p>
                    <p className="text-xs text-gray-500">{formatRelativeTime(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No hay pedidos recientes</p>
        )}
      </div>

      {/* Featured Products */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Productos Destacados</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-lg p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <p className="font-semibold text-gray-900 mb-1">{product.name}</p>
              <p className="text-lg font-bold text-primary-600 mb-2">
                {formatCurrency(product.price)}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {product.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {product.favorites}
                </span>
                <span>Vendidos: {product.sold}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
