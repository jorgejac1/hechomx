'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CompleteOrder } from '@/lib/types/checkout';
import { getOrderById } from '@/lib/utils/orders';
import { formatCurrency } from '@/lib';
import { ROUTES } from '@/lib/constants/routes';
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Calendar,
  Copy,
  Check,
  ArrowRight,
  ShoppingBag,
  Clock,
  Store,
  Building2,
  AlertCircle,
} from 'lucide-react';

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<CompleteOrder | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [orderId]);

  const copyOrderNumber = async () => {
    if (order?.orderNumber) {
      await navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedido no encontrado</h1>
          <p className="text-gray-600 mb-6">No pudimos encontrar información sobre este pedido.</p>
          <Link
            href={ROUTES.ORDERS}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
          >
            Ver mis pedidos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const isPendingPayment = order.paymentStatus === 'pending';

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Gracias por tu compra!</h1>
          <p className="text-gray-600">
            {isPendingPayment
              ? 'Tu pedido ha sido registrado. Completa el pago para procesarlo.'
              : 'Tu pedido ha sido confirmado y está siendo preparado.'}
          </p>
        </div>

        {/* Order Number Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Número de pedido</p>
              <p className="text-2xl font-bold text-gray-900">{order.orderNumber}</p>
            </div>
            <button
              onClick={copyOrderNumber}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Hemos enviado los detalles de tu pedido a <strong>{order.shippingAddress.email}</strong>
          </p>
        </div>

        {/* Payment Pending Notice */}
        {isPendingPayment && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              {order.paymentMethod === 'oxxo' ? (
                <Store className="w-8 h-8 text-amber-600 shrink-0" />
              ) : (
                <Building2 className="w-8 h-8 text-amber-600 shrink-0" />
              )}
              <div>
                <h3 className="font-bold text-amber-800 mb-2">
                  {order.paymentMethod === 'oxxo'
                    ? 'Completa tu pago en OXXO'
                    : 'Completa tu transferencia SPEI'}
                </h3>
                {order.paymentMethod === 'oxxo' ? (
                  <>
                    <p className="text-amber-700 text-sm mb-4">
                      Tienes <strong>72 horas</strong> para realizar el pago. Presenta el siguiente
                      código en cualquier tienda OXXO:
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <p className="text-xs text-gray-500 mb-1">Código de pago</p>
                      <p className="text-2xl font-mono font-bold text-gray-900">
                        1234 5678 9012 3456
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Monto a pagar: <strong>{formatCurrency(order.total)} MXN</strong>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-amber-700 text-sm mb-4">
                      Realiza la transferencia a la siguiente cuenta:
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-amber-200 space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">CLABE</p>
                        <p className="font-mono font-bold text-gray-900">012345678901234567</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Banco</p>
                        <p className="font-medium text-gray-900">BBVA México</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Beneficiario</p>
                        <p className="font-medium text-gray-900">Papalote Market SA de CV</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Monto exacto</p>
                        <p className="font-bold text-gray-900">{formatCurrency(order.total)} MXN</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Referencia</p>
                        <p className="font-mono font-medium text-gray-900">{order.orderNumber}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary-600" />
              Resumen del pedido
            </h2>
          </div>

          {/* Products */}
          <div className="p-6 border-b">
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                    <p className="text-primary-600 font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="p-6 bg-gray-50 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío</span>
              <span className="font-medium">
                {order.shippingCost === 0 ? (
                  <span className="text-green-600">GRATIS</span>
                ) : (
                  formatCurrency(order.shippingCost)
                )}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Descuento</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-primary-600">{formatCurrency(order.total)} MXN</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary-600" />
              Dirección de envío
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>
                {order.shippingAddress.street} {order.shippingAddress.streetNumber}
                {order.shippingAddress.apartment && `, Int. ${order.shippingAddress.apartment}`}
              </p>
              <p>
                {order.shippingAddress.neighborhood}, {order.shippingAddress.city}
              </p>
              <p>
                {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Delivery & Payment */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-primary-600" />
              Entrega estimada
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Calendar className="w-4 h-4" />
              <span>{order.estimatedDelivery}</span>
            </div>

            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-primary-600" />
              Método de pago
            </h3>
            <p className="text-sm text-gray-600">
              {order.paymentMethod === 'card' && 'Tarjeta de crédito/débito'}
              {order.paymentMethod === 'mercadopago' && 'Mercado Pago'}
              {order.paymentMethod === 'oxxo' && 'Pago en OXXO'}
              {order.paymentMethod === 'spei' && 'Transferencia SPEI'}
              {order.paymentMethod === 'paypal' && 'PayPal'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.paymentStatus === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : order.paymentStatus === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-700'
                }`}
              >
                {order.paymentStatus === 'completed' && 'Pagado'}
                {order.paymentStatus === 'pending' && 'Pendiente'}
                {order.paymentStatus === 'processing' && 'Procesando'}
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-primary-50 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-primary-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            ¿Qué sigue?
          </h3>
          <ol className="space-y-3 text-sm text-primary-800">
            {isPendingPayment && (
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary-200 text-primary-800 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </span>
                <span>
                  <strong>Completa tu pago</strong> -{' '}
                  {order.paymentMethod === 'oxxo'
                    ? 'Presenta el código en cualquier OXXO'
                    : 'Realiza la transferencia SPEI'}
                </span>
              </li>
            )}
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-200 text-primary-800 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                {isPendingPayment ? '2' : '1'}
              </span>
              <span>
                <strong>Preparación</strong> - Los artesanos prepararán tu pedido con cuidado
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-200 text-primary-800 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                {isPendingPayment ? '3' : '2'}
              </span>
              <span>
                <strong>Envío</strong> - Recibirás un correo con el número de rastreo
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-200 text-primary-800 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                {isPendingPayment ? '4' : '3'}
              </span>
              <span>
                <strong>Entrega</strong> - ¡Disfruta de tu artesanía mexicana auténtica!
              </span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={ROUTES.ORDERS}
            className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors"
          >
            <Package className="w-5 h-5" />
            Ver mis pedidos
          </Link>
          <Link
            href={ROUTES.PRODUCTS}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 px-6 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Seguir comprando
          </Link>
        </div>

        {/* Support Link */}
        <p className="text-center text-sm text-gray-500 mt-8">
          ¿Tienes preguntas?{' '}
          <Link href={ROUTES.HELP} className="text-primary-600 hover:underline">
            Visita nuestro centro de ayuda
          </Link>{' '}
          o{' '}
          <Link href={ROUTES.CONTACT} className="text-primary-600 hover:underline">
            contáctanos
          </Link>
        </p>
      </div>
    </div>
  );
}
