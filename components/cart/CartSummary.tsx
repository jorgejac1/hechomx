"use client";

import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { ShoppingBag, Truck, Tag } from "lucide-react";

export default function CartSummary() {
  const { cartTotal, cartCount } = useCart();
  const { info } = useToast();
  const router = useRouter();

  const shippingCost = cartTotal >= 1000 ? 0 : 150;
  const subtotal = cartTotal;
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    // Show toast notification instead of alert
    info(
      `Funcionalidad de pago próximamente. Total: $${total.toLocaleString('es-MX')} MXN`,
      5000
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Resumen del Pedido</h2>

      {/* Order Details */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})</span>
          <span className="font-semibold text-gray-900">
            ${subtotal.toLocaleString('es-MX')}
          </span>
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
              `$${shippingCost.toLocaleString('es-MX')}`
            )}
          </span>
        </div>

        {cartTotal < 1000 && (
          <div className="flex items-start gap-2 text-xs text-primary-700 bg-primary-50 p-3 rounded-lg">
            <Tag className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Agrega <strong>${(1000 - cartTotal).toLocaleString('es-MX')}</strong> más para obtener <strong>envío gratis</strong>
            </p>
          </div>
        )}

        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span className="text-primary-600">
            ${total.toLocaleString('es-MX')} MXN
          </span>
        </div>
      </div>

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

      <Button
        variant="outline"
        size="md"
        onClick={() => router.push('/productos')}
        fullWidth
      >
        Seguir comprando
      </Button>

      {/* Security Info */}
      <div className="pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Pago 100% seguro y encriptado</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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