/**
 * @fileoverview Empty cart state component displayed when the shopping cart has no items.
 * Provides call-to-action buttons to browse products and features trust badges
 * highlighting unique products, secure checkout, and national shipping.
 * @module components/cart/EmptyCart
 */

'use client';

import { useRouter } from 'next/navigation';
import EmptyState from '@/components/common/EmptyState';
import Divider from '@/components/common/Divider';
import { ShoppingCart, ArrowRight, Gift, ShieldCheck, Truck } from 'lucide-react';

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xs p-8 sm:p-12">
          <EmptyState
            title="Tu carrito está vacío"
            description="Descubre productos artesanales únicos hechos en México y comienza a llenar tu carrito."
            icon={<ShoppingCart className="w-12 h-12" />}
            size="lg"
            action={{
              label: 'Ver productos',
              onClick: () => router.push('/productos'),
              icon: <ArrowRight className="w-5 h-5" />,
            }}
            secondaryAction={{
              label: 'Ir al inicio',
              onClick: () => router.push('/'),
            }}
          />

          <Divider spacing="lg" />

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-primary-600 dark:text-primary-400 mb-2">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Productos Únicos
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                100% hechos a mano por artesanos mexicanos
              </p>
            </div>
            <div>
              <div className="text-primary-600 dark:text-primary-400 mb-2">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Compra Segura</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Transacciones protegidas y encriptadas
              </p>
            </div>
            <div>
              <div className="text-primary-600 dark:text-primary-400 mb-2">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Envío Nacional
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A toda la República Mexicana
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
