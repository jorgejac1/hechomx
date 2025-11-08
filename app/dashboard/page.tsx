'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import QuickActions from '@/components/dashboard/QuickActions';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import CustomerInsights from '@/components/dashboard/CustomerInsights';
import {
  Package,
  TrendingUp,
  Star,
  DollarSign,
  Eye,
  Heart,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  AlertCircle,
  MessageSquare,
  Store,
  ShoppingBag,
  BarChart3,
  Users,
} from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib';

const ORDER_STATUS_CONFIG = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  processing: { label: 'Procesando', color: 'bg-blue-100 text-blue-800', icon: Package },
  shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'customers' | 'orders' | 'products' | 'reviews'
  >('overview');

  // Redirect if not authenticated or no seller profile
  if (!isAuthenticated && !isLoading) {
    router.push(ROUTES.LOGIN);
    return null;
  }

  if (isLoading || !user) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando dashboard..." />;
  }

  if (!user.makerProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sin Tienda Activa</h2>
          <p className="text-gray-600 mb-6">
            Necesitas activar tu tienda para acceder al dashboard de vendedor.
          </p>
          <button
            onClick={() => router.push(ROUTES.PROFILE)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            Ir a Mi Perfil
          </button>
        </div>
      </div>
    );
  }

  const { makerProfile } = user;

  // Check for low stock products
  const lowStockProducts = makerProfile.products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStockProducts = makerProfile.products.filter((p) => p.stock === 0);

  // Find trending products (high views/favorites ratio)
  const trendingProducts = makerProfile.products
    .filter((p) => p.views > 100)
    .sort((a, b) => b.views + b.favorites - (a.views + a.favorites))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard de Vendedor</h1>
          <p className="text-gray-600 mt-1">{makerProfile.shopName}</p>
        </div>

        {/* Alerts Section */}
        {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
          <div className="mb-6 space-y-3">
            {outOfStockProducts.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">
                    {outOfStockProducts.length} producto{outOfStockProducts.length > 1 ? 's' : ''}{' '}
                    sin stock
                  </p>
                  <p className="text-sm text-red-800">
                    {outOfStockProducts.map((p) => p.name).join(', ')}
                  </p>
                </div>
              </div>
            )}

            {lowStockProducts.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900">
                    {lowStockProducts.length} producto{lowStockProducts.length > 1 ? 's' : ''} con
                    poco stock
                  </p>
                  <p className="text-sm text-yellow-800">
                    {lowStockProducts.map((p) => `${p.name} (${p.stock})`).join(', ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Sales */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{makerProfile.stats.salesCount}</p>
            <p className="text-sm text-gray-600">Ventas Totales</p>
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{makerProfile.stats.productsCount}</p>
            <p className="text-sm text-gray-600">Productos</p>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {makerProfile.stats.rating.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">{makerProfile.stats.reviewsCount} reseñas</p>
          </div>

          {/* Response Rate */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-purple-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{makerProfile.stats.responseRate}%</p>
            <p className="text-sm text-gray-600">Tasa de respuesta</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Resumen
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === 'analytics'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Análisis
                </span>
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === 'customers'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Clientes
                </span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === 'orders'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Pedidos ({makerProfile.recentOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === 'products'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Productos ({makerProfile.products.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === 'reviews'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Reseñas ({makerProfile.reviews.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Actions Widget */}
                <QuickActions userEmail={user.email} />

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
                          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200"
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
                            <span className="font-semibold text-green-600">
                              +{product.sold} ventas
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Pedidos Recientes</h3>
                  {makerProfile.recentOrders.length > 0 ? (
                    <div className="space-y-3">
                      {makerProfile.recentOrders.slice(0, 3).map((order) => {
                        const statusConfig = ORDER_STATUS_CONFIG[order.status];
                        const StatusIcon = statusConfig.icon;
                        return (
                          <div
                            key={order.id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <Image
                              src={order.items[0].image}
                              alt={order.items[0].name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 truncate">
                                {order.customer.name}
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {order.items[0].name}
                                {order.items.length > 1 && ` +${order.items.length - 1} más`}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatRelativeTime(order.date)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                {formatCurrency(order.total)}
                              </p>
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

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Productos Destacados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {makerProfile.products.slice(0, 3).map((product) => (
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
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && <AnalyticsDashboard userEmail={user.email} />}

            {/* Customer Insights Tab */}
            {activeTab === 'customers' && <CustomerInsights userEmail={user.email} />}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Todos los Pedidos</h3>
                {makerProfile.recentOrders.map((order) => {
                  const statusConfig = ORDER_STATUS_CONFIG[order.status];
                  const StatusIcon = statusConfig.icon;
                  return (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-bold text-gray-900">Pedido #{order.id}</p>
                          <p className="text-sm text-gray-600">{formatRelativeTime(order.date)}</p>
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
                              src={item.image}
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
                })}
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Mis Productos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {makerProfile.products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
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
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Reseñas de Clientes</h3>
                {makerProfile.reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      {review.buyerAvatar && (
                        <Image
                          src={review.buyerAvatar}
                          alt={review.buyerName}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-bold text-gray-900">{review.buyerName}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{review.productName}</p>
                        <p className="text-gray-900 mb-2">{review.comment}</p>
                        <p className="text-xs text-gray-500">{formatRelativeTime(review.date)}</p>

                        {review.response && (
                          <div className="mt-4 ml-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <p className="text-sm font-semibold text-blue-900 mb-1">
                              Tu respuesta:
                            </p>
                            <p className="text-sm text-gray-900">{review.response.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatRelativeTime(review.response.date)}
                            </p>
                          </div>
                        )}

                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                          <span>{review.helpful} personas encontraron esto útil</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
