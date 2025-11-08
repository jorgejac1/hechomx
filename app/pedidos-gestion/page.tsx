'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { SellerOrder, getSellerOrders } from '@/lib/api/sellerApi';
import { formatCurrency, formatRelativeTime, ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Edit,
  Printer,
  Download,
} from 'lucide-react';

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

export default function OrdersManagementPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<SellerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<SellerOrder | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: '',
    tracking: '',
    carrier: '',
  });

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    async function loadOrders() {
      if (user) {
        setIsLoading(true);
        const data = await getSellerOrders(user.email);
        setOrders(data);
        setFilteredOrders(data);
        setIsLoading(false);
      }
    }
    loadOrders();
  }, [user]);

  // Filter orders
  useEffect(() => {
    let filtered = orders;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredOrders(filtered);
  }, [filterStatus, searchQuery, orders]);

  if (authLoading || isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando pedidos..." />;
  }

  if (!isAuthenticated || !user || !user.makerProfile) {
    return null;
  }

  const pendingCount = orders.filter((o) => o.status === 'processing').length;
  const urgentCount = orders.filter((o) => o.urgent && o.status !== 'delivered').length;

  const handleUpdateOrder = () => {
    if (!selectedOrder) return;

    console.log('Updating order:', updateData);

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id
        ? {
            ...order,
            status: (updateData.status || order.status) as SellerOrder['status'],
            tracking: updateData.tracking || order.tracking,
            carrier: updateData.carrier || order.carrier,
            timeline: [
              ...order.timeline,
              {
                status: updateData.status || order.status,
                date: new Date().toISOString(),
                description: `Estado actualizado a ${ORDER_STATUS_CONFIG[updateData.status as keyof typeof ORDER_STATUS_CONFIG]?.label || 'nuevo estado'}`,
              },
            ],
          }
        : order
    );

    setOrders(updatedOrders);
    setShowUpdateModal(false);
    setUpdateData({ status: '', tracking: '', carrier: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push(ROUTES.DASHBOARD)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Dashboard
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <p className="text-gray-600">
                  {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'} total
                </p>
                {pendingCount > 0 && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {pendingCount} pendiente{pendingCount > 1 ? 's' : ''}
                  </span>
                )}
                {urgentCount > 0 && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {urgentCount} urgente{urgentCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por número de pedido, cliente o producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-3 h-3 text-gray-600" />
                <label className="text-xs font-semibold text-gray-700">Estado</label>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No hay pedidos</h3>
            <p className="text-gray-600">
              {searchQuery || filterStatus !== 'all'
                ? 'Intenta con otros filtros'
                : 'Aún no tienes pedidos'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusConfig = ORDER_STATUS_CONFIG[order.status];
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  {/* Order Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <p className="font-bold text-gray-900">#{order.orderNumber}</p>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                          </span>
                          {order.urgent && order.status !== 'delivered' && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
                              <AlertCircle className="w-3 h-3" />
                              Urgente
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          {order.customer.avatar ? (
                            <Image
                              src={order.customer.avatar}
                              alt={order.customer.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 font-semibold text-sm">
                                {order.customer.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{order.customer.name}</p>
                            <p className="text-xs text-gray-600">
                              {formatRelativeTime(order.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          {formatCurrency(order.total)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                        </p>
                      </div>
                    </div>

                    {/* Tracking Info */}
                    {order.tracking && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-900">
                            Rastreo: {order.tracking}
                          </span>
                          {order.carrier && (
                            <span className="text-blue-700">• {order.carrier}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {order.notes && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-sm text-gray-900">
                          <strong>Nota:</strong> {order.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6">
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-600">SKU: {item.sku}</p>
                            <div className="flex items-center gap-3 text-sm mt-1">
                              <span className="text-gray-600">
                                Cantidad: <strong>{item.quantity}</strong>
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="font-bold text-primary-600">
                                {formatCurrency(item.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                      >
                        Ver Detalles
                      </button>
                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowUpdateModal(true);
                            setUpdateData({
                              status: order.status,
                              tracking: order.tracking || '',
                              carrier: order.carrier || '',
                            });
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                        >
                          <Edit className="w-4 h-4" />
                          Actualizar Estado
                        </button>
                      )}
                      <button
                        onClick={() => console.log('Downloading order:', order.orderNumber)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Descargar
                      </button>
                      <button
                        onClick={() => console.log('Printing order:', order.orderNumber)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                      >
                        <Printer className="w-4 h-4" />
                        Imprimir
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && !showUpdateModal && (
          <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}

        {/* Update Order Modal */}
        {showUpdateModal && selectedOrder && (
          <UpdateOrderModal
            order={selectedOrder}
            updateData={updateData}
            setUpdateData={setUpdateData}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedOrder(null);
            }}
            onUpdate={handleUpdateOrder}
          />
        )}
      </div>
    </div>
  );
}

// Order Detail Modal Component
function OrderDetailModal({ order, onClose }: { order: SellerOrder; onClose: () => void }) {
  const statusConfig = ORDER_STATUS_CONFIG[order.status];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Detalle del Pedido</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
              <XCircle className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-gray-900">#{order.orderNumber}</p>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${statusConfig.color}`}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Información del Cliente</h3>
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-900">{order.customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-900">{order.customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h3 className="font-bold text-gray-900">Dirección de Envío</h3>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-1">
              <p className="font-semibold">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              {order.shippingAddress.country && <p>{order.shippingAddress.country}</p>}
              <p>{order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Historial del Pedido</h3>
            <div className="space-y-4">
              {order.timeline.map((event, index) => {
                const isLast = index === order.timeline.length - 1;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${isLast ? 'bg-primary-600' : 'bg-green-600'}`}
                      />
                      {index < order.timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-gray-900">{event.description}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Productos ({order.items.length})</h3>
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
                    <p className="text-xs text-gray-600">SKU: {item.sku}</p>
                    <p className="text-xs text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary-600">{formatCurrency(item.price)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-gray-900">Total</p>
              <p className="text-2xl font-bold text-primary-600">{formatCurrency(order.total)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
}

// Update Order Modal Component
function UpdateOrderModal({
  order,
  updateData,
  setUpdateData,
  onClose,
  onUpdate,
}: {
  order: SellerOrder;
  updateData: { status: string; tracking: string; carrier: string };
  setUpdateData: (data: { status: string; tracking: string; carrier: string }) => void;
  onClose: () => void;
  onUpdate: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Actualizar Pedido</h2>
          <p className="text-sm text-gray-600 mt-1">#{order.orderNumber}</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estado del Pedido
            </label>
            <select
              value={updateData.status}
              onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="processing">Procesando</option>
              <option value="confirmed">Confirmado</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de Rastreo
            </label>
            <input
              type="text"
              value={updateData.tracking}
              onChange={(e) => setUpdateData({ ...updateData, tracking: e.target.value })}
              placeholder="MEX123456789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Paquetería</label>
            <select
              value={updateData.carrier}
              onChange={(e) => setUpdateData({ ...updateData, carrier: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Seleccionar paquetería</option>
              <option value="DHL Express">DHL Express</option>
              <option value="FedEx">FedEx</option>
              <option value="Estafeta">Estafeta</option>
              <option value="UPS">UPS</option>
              <option value="Correos de México">Correos de México</option>
              <option value="DHL International">DHL International</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={onUpdate}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
