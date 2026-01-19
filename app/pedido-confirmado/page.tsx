import { Metadata } from 'next';
import { Suspense } from 'react';
import { OrderConfirmation } from '@/components/cart/checkout';

export const metadata: Metadata = {
  title: 'Pedido Confirmado | Papalote Market',
  description: 'Tu pedido ha sido procesado exitosamente.',
  robots: {
    index: false,
    follow: false,
  },
};

function OrderConfirmationLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent" />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationLoading />}>
      <OrderConfirmation />
    </Suspense>
  );
}
