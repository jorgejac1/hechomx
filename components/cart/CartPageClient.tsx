/**
 * @fileoverview Main cart page client component for the shopping cart view.
 * Displays cart items, order summary, and recommended products based on cart contents.
 * Handles hydration state, empty cart display, and provides navigation to checkout.
 * @module components/cart/CartPageClient
 */

'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import CartItemCard from './CartItemCard';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';
import { useToast } from '@/contexts/ToastContext';
import RecommendedProducts from './RecommendedProducts';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';

export default function CartPageClient() {
  const { info } = useToast();
  const { cartItems, cartCount, clearCart } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Wait for hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch recommended products
  useEffect(() => {
    if (cartItems.length > 0) {
      fetch('/api/products')
        .then((res) => res.json())
        .then((data: { data: Product[] }) => {
          // Get products from same categories as cart items
          const cartCategories = [...new Set(cartItems.map((item) => item.category))];
          const recommended = data.data
            .filter((p) => cartCategories.includes(p.category))
            .filter((p) => !cartItems.some((item) => item.id === p.id))
            .slice(0, 4);
          setRecommendedProducts(recommended);
        })
        .catch((err) => console.error('[CartPageClient] Error fetching products:', err));
    }
  }, [cartItems]);

  // Show loading during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show empty cart
  if (cartCount === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Continuar comprando</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Carrito de Compras
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {cartCount} {cartCount === 1 ? 'producto' : 'productos'} en tu carrito
              </p>
            </div>

            <button
              onClick={() => {
                if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                  clearCart();
                  info('Carrito vaciado');
                }
              }}
              className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
            >
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Trust Banner */}
            <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <ShoppingBag className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div className="text-sm text-primary-900">
                  <p className="font-semibold mb-1">Compra segura y protegida</p>
                  <p className="text-primary-700">
                    Todos tus productos están protegidos. Envío seguro a toda la República Mexicana.
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Right: Summary - Sticky on Desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CartSummary />
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-12">
            <RecommendedProducts products={recommendedProducts} />
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-12 bg-white rounded-xl shadow-xs p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">
            ¿Por qué comprar con nosotros?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Productos Auténticos</h3>
              <p className="text-sm text-gray-600">100% hechos a mano por artesanos mexicanos</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Pago Seguro</h3>
              <p className="text-sm text-gray-600">Transacciones protegidas y encriptadas</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Envío Nacional</h3>
              <p className="text-sm text-gray-600">A toda la República Mexicana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
