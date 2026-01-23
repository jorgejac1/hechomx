/**
 * @fileoverview Cart summary component displaying order totals, shipping costs, and coupon functionality.
 * Shows subtotal, shipping calculation (free shipping over $1000 MXN), discount application,
 * and provides checkout navigation. Supports coupon code input and validation.
 * @module components/cart/CartSummary
 */

'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency } from '@/lib';
import { ROUTES } from '@/lib/constants/routes';
import Button from '@/components/common/Button';
import { ShoppingBag, Truck, Tag, X, CheckCircle, Loader2 } from 'lucide-react';
import { applyCoupon, AppliedCoupon, getCouponDisplayText } from '@/lib/utils/coupons';

export default function CartSummary() {
  const { cartTotal, cartCount } = useCart();
  const router = useRouter();

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Calculate shipping
  const baseShippingCost = cartTotal >= 1000 ? 0 : 150;

  // Calculate discount
  const couponDiscount = appliedCoupon?.discountAmount || 0;
  const isFreeShippingCoupon = appliedCoupon?.type === 'free_shipping';
  const shippingCost = isFreeShippingCoupon ? 0 : baseShippingCost;
  const productDiscount =
    appliedCoupon && appliedCoupon.type !== 'free_shipping' ? couponDiscount : 0;

  const subtotal = cartTotal;
  const total = subtotal + shippingCost - productDiscount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Ingresa un código de cupón');
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError('');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = applyCoupon(couponCode, subtotal, baseShippingCost);

    if (result.success && result.appliedCoupon) {
      setAppliedCoupon(result.appliedCoupon);
      setCouponCode('');
      setCouponError('');
    } else {
      setCouponError(result.error || 'Cupón no válido');
    }

    setIsApplyingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const handleCheckout = () => {
    // Store coupon in sessionStorage to use in checkout
    if (appliedCoupon) {
      sessionStorage.setItem('checkout-coupon', JSON.stringify(appliedCoupon));
    } else {
      sessionStorage.removeItem('checkout-coupon');
    }
    router.push(ROUTES.CHECKOUT);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Resumen del Pedido</h2>

      {/* Order Details */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>
            Subtotal ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})
          </span>
          <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
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

        {/* Applied Coupon Display */}
        {appliedCoupon && (
          <div className="flex justify-between items-center text-green-600 bg-green-50 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {appliedCoupon.code}: {getCouponDisplayText(appliedCoupon)}
              </span>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="p-1 hover:bg-green-100 rounded-full transition-colors"
              aria-label="Eliminar cupón"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Discount Line */}
        {productDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Descuento</span>
            <span className="font-semibold">-{formatCurrency(productDiscount)}</span>
          </div>
        )}

        {cartTotal < 1000 && !isFreeShippingCoupon && (
          <div className="flex items-start gap-2 text-xs text-primary-700 bg-primary-50 p-3 rounded-lg">
            <Tag className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              Agrega <strong>{formatCurrency(1000 - cartTotal)}</strong> más para obtener{' '}
              <strong>envío gratis</strong>
            </p>
          </div>
        )}

        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span className="text-primary-600">{formatCurrency(total)} MXN</span>
        </div>
      </div>

      {/* Coupon Code Input */}
      {!appliedCoupon && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ¿Tienes un cupón de descuento?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                setCouponError('');
              }}
              placeholder="Ej: PRIMERA10"
              className={`flex-1 px-4 py-2 border rounded-lg text-sm uppercase focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                couponError ? 'border-red-300' : 'border-gray-300'
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyCoupon();
                }
              }}
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={isApplyingCoupon || !couponCode.trim()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplyingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Aplicar'}
            </button>
          </div>
          {couponError && <p className="text-sm text-red-600">{couponError}</p>}
          <p className="text-xs text-gray-500">Prueba: PRIMERA10, ENVIOGRATIS</p>
        </div>
      )}

      {/* Checkout Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleCheckout}
        icon={<ShoppingBag className="w-5 h-5" />}
        fullWidth
      >
        Proceder al pago
      </Button>

      <Link href="/productos" className="block">
        <Button variant="outline" size="md" fullWidth>
          Seguir comprando
        </Button>
      </Link>

      {/* Security Info */}
      <div className="pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Pago 100% seguro y encriptado</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Garantía de satisfacción</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
          </svg>
          <span>Envío asegurado y rastreable</span>
        </div>
      </div>
    </div>
  );
}
