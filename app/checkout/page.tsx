import { Metadata } from 'next';
import { CheckoutPageClient } from '@/components/cart/checkout';

export const metadata: Metadata = {
  title: 'Checkout | Papalote Market',
  description: 'Completa tu compra de artesanías mexicanas auténticas.',
  robots: {
    index: false, // Don't index checkout pages
    follow: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
