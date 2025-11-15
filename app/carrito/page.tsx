import { Suspense } from 'react';
import CartPageClient from '@/components/cart/CartPageClient';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Carrito de Compras - Papalote Market',
  description: 'Revisa tu carrito de compras y procede al pago',
};

function CartLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartLoading />}>
      <CartPageClient />
    </Suspense>
  );
}
