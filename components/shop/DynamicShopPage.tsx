/**
 * @fileoverview Dynamic shop page component that handles shops stored in localStorage.
 * Used as a fallback when a shop is not found in MOCK_SELLER_USERS,
 * allowing new sellers to view their own shop even before adding products.
 * @module components/shop/DynamicShopPage
 */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getShopSlug } from '@/lib/utils/shop';
import { Package, Store, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';

interface DynamicShopPageProps {
  /** The shop slug from the URL */
  shopSlug: string;
}

export default function DynamicShopPage({ shopSlug }: DynamicShopPageProps) {
  const { user, isLoading } = useAuth();
  const [isOwnShop, setIsOwnShop] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Check if this is the current user's shop
      if (user?.makerProfile?.shopName) {
        const userShopSlug = getShopSlug(user.makerProfile.shopName);
        setIsOwnShop(userShopSlug === getShopSlug(shopSlug));
      }
      setChecked(true);
    }
  }, [user, shopSlug, isLoading]);

  if (isLoading || !checked) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando tienda..." />;
  }

  // If this is the current user's shop, show their empty shop page
  if (isOwnShop && user?.makerProfile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Shop Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Store className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.makerProfile.shopName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Tu tienda</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <Package className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¡Tu tienda está lista!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              Aún no tienes productos en tu tienda. Agrega tu primer producto para que los
              compradores puedan descubrir tu trabajo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={ROUTES.CREATE_PRODUCT}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Agregar Producto
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={ROUTES.DASHBOARD}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold"
              >
                Ir al Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If not the user's shop and not found in mock data, show 404
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
          <Store className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Tienda no encontrada
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          La tienda que buscas no existe o ya no está disponible.
        </p>
        <Link
          href={ROUTES.SHOPS}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
        >
          Ver todas las tiendas
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
