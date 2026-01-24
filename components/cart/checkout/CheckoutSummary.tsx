/**
 * @fileoverview Checkout summary sidebar component for the checkout process.
 * Displays order summary with items, costs breakdown, gift options, coupon display,
 * shipping address preview, terms acceptance, and submit button.
 * Supports collapsible sections for items list and gift options.
 * @module components/cart/checkout/CheckoutSummary
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib';
import { calculateShippingCost, calculateEstimatedDelivery } from '@/lib/utils/orders';
import { ShippingAddress } from '@/lib/types/checkout';
import { AppliedCoupon, getCouponDisplayText } from '@/lib/utils/coupons';
import { ShoppingBag, Truck, Tag, MapPin, Package, Gift, X, CheckCircle } from 'lucide-react';
import Accordion from '@/components/common/Accordion';

/** Cost for gift wrapping in MXN */
const GIFT_WRAP_COST = 50;

/**
 * Props for the CheckoutSummary component
 * @interface CheckoutSummaryProps
 */
interface CheckoutSummaryProps {
  /** Partial shipping address for delivery estimation and display */
  shippingAddress?: Partial<ShippingAddress>;
  /** Whether the order is currently being processed */
  isProcessing?: boolean;
  /** Callback function when submit button is clicked */
  onSubmit?: () => void;
  /** Whether terms and conditions are accepted */
  acceptTerms: boolean;
  /** Callback when terms acceptance changes */
  onAcceptTermsChange: (accepted: boolean) => void;
  /** Error message for terms validation */
  termsError?: string;
  /** Whether gift wrap is enabled */
  giftWrap?: boolean;
  /** Callback when gift wrap option changes */
  onGiftWrapChange?: (enabled: boolean) => void;
  /** Gift message text */
  giftMessage?: string;
  /** Callback when gift message changes */
  onGiftMessageChange?: (message: string) => void;
  /** Currently applied coupon, if any */
  appliedCoupon?: AppliedCoupon | null;
  /** Callback to remove applied coupon */
  onRemoveCoupon?: () => void;
}

export default function CheckoutSummary({
  shippingAddress,
  isProcessing = false,
  onSubmit,
  acceptTerms,
  onAcceptTermsChange,
  termsError,
  giftWrap = false,
  onGiftWrapChange,
  giftMessage = '',
  onGiftMessageChange,
  appliedCoupon,
  onRemoveCoupon,
}: CheckoutSummaryProps) {
  const { cartItems, cartTotal, cartCount } = useCart();

  // Calculate costs
  const baseShippingCost = calculateShippingCost(
    cartTotal,
    shippingAddress?.state as string | undefined
  );

  // Apply coupon discounts
  const isFreeShippingCoupon = appliedCoupon?.type === 'free_shipping';
  const shippingCost = isFreeShippingCoupon ? 0 : baseShippingCost;
  const couponDiscount = appliedCoupon?.discountAmount || 0;
  const productDiscount = appliedCoupon && !isFreeShippingCoupon ? couponDiscount : 0;

  // Gift wrap cost
  const giftWrapFee = giftWrap ? GIFT_WRAP_COST : 0;

  const total = cartTotal + shippingCost + giftWrapFee - productDiscount;
  const amountToFreeShipping = Math.max(0, 1000 - cartTotal);

  const estimatedDelivery = shippingAddress?.state
    ? calculateEstimatedDelivery(shippingAddress.state)
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 overflow-hidden sticky top-4">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-600" />
            Resumen del pedido
          </h2>
          <span className="text-sm text-gray-500">
            {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Collapsible Sections */}
        <Accordion
          allowMultiple
          defaultExpanded={giftWrap || !!giftMessage ? ['gift-options'] : []}
        >
          {/* Items List */}
          <Accordion.Item
            itemId="items"
            title={<span className="text-sm text-gray-600">Ver productos</span>}
          >
            <div className="space-y-3 pb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.maker}</p>
                    <p className="text-sm text-primary-600 font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                href="/carrito"
                className="block text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Editar carrito
              </Link>
            </div>
          </Accordion.Item>

          {/* Gift Options */}
          <Accordion.Item
            itemId="gift-options"
            title={
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <Gift className="w-4 h-4" />
                Opciones de regalo
              </span>
            }
          >
            <div className="space-y-4">
              {/* Gift Wrap Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer p-3 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 transition-colors">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => onGiftWrapChange?.(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded-sm border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Envolver para regalo</span>
                    <span className="text-sm font-semibold text-pink-600">
                      +{formatCurrency(GIFT_WRAP_COST)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Incluye papel de regalo artesanal y moño decorativo
                  </p>
                </div>
              </label>

              {/* Gift Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje para el regalo (opcional)
                </label>
                <textarea
                  value={giftMessage}
                  onChange={(e) => onGiftMessageChange?.(e.target.value)}
                  placeholder="Escribe un mensaje personal para quien recibe el regalo..."
                  rows={3}
                  maxLength={200}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                />
                <p className="text-xs text-gray-500 text-right mt-1">{giftMessage.length}/200</p>
              </div>
            </div>
          </Accordion.Item>
        </Accordion>

        {/* Costs Breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900">{formatCurrency(cartTotal)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              <span>Envío</span>
            </div>
            <span className="font-semibold text-gray-900">
              {shippingCost === 0 ? (
                <span className="text-green-600">GRATIS</span>
              ) : (
                formatCurrency(shippingCost)
              )}
            </span>
          </div>

          {/* Gift Wrap Fee */}
          {giftWrap && (
            <div className="flex justify-between text-gray-600">
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4 text-pink-500" />
                <span>Envoltorio de regalo</span>
              </div>
              <span className="font-semibold text-gray-900">{formatCurrency(giftWrapFee)}</span>
            </div>
          )}

          {/* Applied Coupon Display */}
          {appliedCoupon && (
            <div className="flex justify-between items-center text-green-600 bg-green-50 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {appliedCoupon.code}: {getCouponDisplayText(appliedCoupon)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  -{formatCurrency(appliedCoupon.discountAmount)}
                </span>
                {onRemoveCoupon && (
                  <button
                    onClick={onRemoveCoupon}
                    className="p-1 hover:bg-green-100 rounded-full transition-colors"
                    aria-label="Eliminar cupón"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {amountToFreeShipping > 0 && !isFreeShippingCoupon && (
            <div className="flex items-start gap-2 text-xs text-primary-700 bg-primary-50 p-3 rounded-lg">
              <Tag className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                Agrega <strong>{formatCurrency(amountToFreeShipping)}</strong> más para obtener{' '}
                <strong>envío gratis</strong>
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span className="text-primary-600">{formatCurrency(total)} MXN</span>
          </div>
        </div>

        {/* Estimated Delivery */}
        {estimatedDelivery && (
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Package className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">Entrega estimada</p>
              <p className="text-xs text-green-700">{estimatedDelivery}</p>
            </div>
          </div>
        )}

        {/* Gift Message Preview */}
        {giftMessage && (
          <div className="flex items-start gap-3 p-3 bg-pink-50 border border-pink-200 rounded-lg">
            <Gift className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-pink-800">Mensaje de regalo</p>
              <p className="text-xs text-pink-700 italic">"{giftMessage}"</p>
            </div>
          </div>
        )}

        {/* Shipping Address Preview */}
        {shippingAddress?.street && (
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p className="text-gray-600">
                {shippingAddress.street} {shippingAddress.streetNumber}
                {shippingAddress.apartment && `, Int. ${shippingAddress.apartment}`}
              </p>
              <p className="text-gray-600">
                {shippingAddress.neighborhood}, {shippingAddress.city}
              </p>
              <p className="text-gray-600">
                {shippingAddress.state} {shippingAddress.postalCode}
              </p>
            </div>
          </div>
        )}

        {/* Terms Checkbox */}
        <div className="pt-4 border-t">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => onAcceptTermsChange(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded-sm border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600">
              Acepto los{' '}
              <Link
                href="/politicas/terminos"
                className="text-primary-600 hover:underline"
                target="_blank"
              >
                términos y condiciones
              </Link>{' '}
              y la{' '}
              <Link
                href="/politicas/privacidad"
                className="text-primary-600 hover:underline"
                target="_blank"
              >
                política de privacidad
              </Link>
            </span>
          </label>
          {termsError && <p className="mt-1 text-sm text-red-600 ml-7">{termsError}</p>}
        </div>

        {/* Submit Button */}
        {onSubmit && (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isProcessing}
            className={`
              w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
              ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Procesando...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Confirmar pedido</span>
              </>
            )}
          </button>
        )}

        {/* Trust Indicators */}
        <div className="pt-4 space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Pago seguro y encriptado</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Garantía de satisfacción</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
            <span>Envío asegurado y rastreable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
