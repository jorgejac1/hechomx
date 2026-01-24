'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import DataList from '@/components/common/DataList';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { getBuyerOrders } from '@/lib/api/sellerApi';
import type { BuyerOrder } from '@/lib/types/buyer';
import type { Product } from '@/types';
import type { User } from '@/contexts/AuthContext';
import { formatCurrency, formatRelativeTime, ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import ReviewModal from '@/components/orders/ReviewModal';
import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Star,
  RotateCcw,
  MapPin,
  Filter,
  Search,
} from 'lucide-react';
import Modal from '@/components/common/Modal';
import Alert from '@/components/common/Alert';
import Timeline, { type TimelineItem } from '@/components/common/Timeline';

const ORDER_STATUS_CONFIG = {
  processing: {
    label: 'Procesando',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmado',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: Package,
  },
  shipped: {
    label: 'Enviado',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: Truck,
  },
  delivered: {
    label: 'Entregado',
    color: 'bg-green-100 text-green-800 border-green-300',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelado',
    color: 'bg-red-100 text-red-800 border-red-300',
    icon: XCircle,
  },
};

interface OrderReview {
  itemId: string;
  rating: number;
  comment: string;
}

export default function OrdersPage() {
  return (
    <AuthPageWrapper loadingText="Cargando pedidos...">
      {(user) => <OrdersContent user={user} />}
    </AuthPageWrapper>
  );
}

function OrdersContent({ user }: { user: User }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [orders, setOrders] = useState<BuyerOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<BuyerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<BuyerOrder | null>(null);
  const [reviewingOrder, setReviewingOrder] = useState<BuyerOrder | null>(null);

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);
      const data = await getBuyerOrders(user.email);
      setOrders(data);
      setFilteredOrders(data);
      setIsLoading(false);
    }
    loadOrders();
  }, [user.email]);

  // Filter orders
  useEffect(() => {
    let filtered = orders;

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredOrders(filtered);
  }, [filterStatus, searchQuery, orders]);

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando pedidos..." />;
  }

  const handleReorder = (order: BuyerOrder) => {
    let itemsAdded = 0;

    order.items.forEach((item) => {
      // Convert order item to full Product format
      const product: Product = {
        id: item.id,
        name: item.name,
        description: `Producto de ${item.artisan.shopName}`,
        price: item.price,
        currency: 'MXN',
        category: 'Artesanía',
        subcategory: '',
        state: '',
        maker: item.artisan.id,
        images: [item.image],
        inStock: true,
        featured: false,
        verified: false,
        rating: 0,
        reviewCount: 0,
      };

      addToCart(product, item.quantity);
      itemsAdded += item.quantity;
    });

    showToast(
      `${itemsAdded} ${itemsAdded === 1 ? 'producto agregado' : 'productos agregados'} al carrito`,
      'success'
    );

    router.push(ROUTES.CART);
  };

  const handleReviewSubmit = (orderId: string, reviews: OrderReview[]) => {
    console.log('Reviews submitted for order:', orderId, reviews);

    // Update order to mark as reviewed
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, canReview: false, reviewed: true } : order
      )
    );

    showToast('¡Gracias por tu reseña!', 'success');
    setReviewingOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Mis Pedidos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'} en total
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por número de pedido o producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">Todos los estados</option>
                <option value="processing">Procesando</option>
                <option value="confirmed">Confirmado</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <DataList<BuyerOrder>
          data={filteredOrders}
          keyAccessor="id"
          layout="list"
          divided={false}
          hoverable={false}
          loading={isLoading}
          loadingItems={3}
          emptyMessage={
            searchQuery || filterStatus !== 'all'
              ? 'No se encontraron pedidos'
              : 'No tienes pedidos aún'
          }
          emptyIcon={<Package className="w-16 h-16 text-gray-400" />}
          className="space-y-4"
          itemClassName="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          renderItem={(order) => {
            const statusConfig = ORDER_STATUS_CONFIG[order.status];
            const StatusIcon = statusConfig.icon;

            return (
              <>
                {/* Order Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          Pedido #{order.id}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatRelativeTime(order.date)} • {order.itemsCount}{' '}
                        {order.itemsCount === 1 ? 'producto' : 'productos'}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {formatCurrency(order.total)}
                      </p>
                      {order.tracking && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Rastreo: {order.tracking}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-6">
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {item.artisan.shopName}
                          </p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Cantidad: <strong>{item.quantity}</strong>
                            </span>
                            <span className="text-gray-400 dark:text-gray-500">•</span>
                            <span className="font-bold text-primary-600 dark:text-primary-400">
                              {formatCurrency(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  {order.status === 'shipped' && order.estimatedDelivery && (
                    <Alert
                      variant="info"
                      layout="bordered"
                      icon={Truck}
                      title="En camino a tu dirección"
                      className="mt-4"
                    >
                      Entrega estimada:{' '}
                      {new Date(order.estimatedDelivery).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Alert>
                  )}

                  {order.status === 'delivered' && order.actualDelivery && (
                    <Alert
                      variant="success"
                      layout="bordered"
                      icon={CheckCircle2}
                      title="Entregado exitosamente"
                      className="mt-4"
                    >
                      {formatRelativeTime(order.actualDelivery)}
                    </Alert>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-sm text-gray-900 dark:text-gray-100"
                    >
                      Ver Detalles
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {order.canReview && (
                      <button
                        onClick={() => setReviewingOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium text-sm"
                      >
                        <Star className="w-4 h-4" />
                        Dejar Reseña
                      </button>
                    )}

                    {order.canReorder && (
                      <button
                        onClick={() => handleReorder(order)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Volver a Pedir
                      </button>
                    )}
                  </div>
                </div>
              </>
            );
          }}
        />

        {/* Empty state CTA */}
        {filteredOrders.length === 0 && !searchQuery && filterStatus === 'all' && (
          <div className="text-center mt-6">
            <Link
              href={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              <Package className="w-5 h-5" />
              Explorar Productos
            </Link>
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}

        {/* Review Modal */}
        {reviewingOrder && (
          <ReviewModal
            order={reviewingOrder}
            onClose={() => setReviewingOrder(null)}
            onSubmit={(reviews) => handleReviewSubmit(reviewingOrder.id, reviews)}
          />
        )}
      </div>
    </div>
  );
}

// Order Detail Modal Component
function OrderDetailModal({ order, onClose }: { order: BuyerOrder; onClose: () => void }) {
  const statusConfig = ORDER_STATUS_CONFIG[order.status];

  const footer = (
    <button
      onClick={onClose}
      className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
    >
      Cerrar
    </button>
  );

  return (
    <Modal isOpen={true} onClose={onClose} title="Detalles del Pedido" size="lg" footer={footer}>
      {/* Order ID and Status */}
      <div className="flex items-center gap-2 mb-6">
        <p className="text-lg font-semibold text-gray-900">#{order.id}</p>
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${statusConfig.color}`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Estado del Pedido</h3>
        <Timeline
          items={order.timeline.map((event, index): TimelineItem => {
            const isLast = index === order.timeline.length - 1;
            const statusIcon =
              event.status === 'cancelled'
                ? XCircle
                : event.status === 'delivered'
                  ? CheckCircle2
                  : event.status === 'shipped'
                    ? Truck
                    : event.status === 'confirmed'
                      ? Package
                      : Clock;
            return {
              id: `${order.id}-${index}`,
              title: event.description,
              timestamp: new Date(event.date).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
              status: isLast ? 'current' : 'completed',
              icon: statusIcon,
              content: (
                <>
                  {event.carrier && (
                    <p className="text-sm text-gray-600 mt-1">Paquetería: {event.carrier}</p>
                  )}
                  {event.reason && (
                    <p className="text-sm text-red-600 mt-1">Motivo: {event.reason}</p>
                  )}
                </>
              ),
            };
          })}
          size="sm"
        />
      </div>

      {/* Shipping Address */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-gray-600" />
          <h3 className="font-bold text-gray-900">Dirección de Envío</h3>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p className="font-semibold">{order.shippingAddress.name}</p>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
            {order.shippingAddress.zipCode}
          </p>
          <p>{order.shippingAddress.phone}</p>
        </div>
      </div>

      {/* Items */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Productos ({order.itemsCount})</h3>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                <p className="text-xs text-gray-600">{item.artisan.shopName}</p>
                <p className="text-xs text-gray-600">Cantidad: {item.quantity}</p>
              </div>
              <p className="font-bold text-primary-600">{formatCurrency(item.price)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">Total</p>
          <p className="text-2xl font-bold text-primary-600">{formatCurrency(order.total)}</p>
        </div>
      </div>
    </Modal>
  );
}
