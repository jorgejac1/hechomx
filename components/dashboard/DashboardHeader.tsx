/**
 * @fileoverview Header component for the seller dashboard.
 * Displays the dashboard title, shop name, new order notifications,
 * and provides a link to view the public shop page.
 * @module components/dashboard/DashboardHeader
 */

import Link from 'next/link';
import { getShopSlug } from '@/lib/utils/shop-utils';
import { Store, ExternalLink, Bell } from 'lucide-react';

/**
 * @interface DashboardHeaderProps
 * Props for the DashboardHeader component.
 */
interface DashboardHeaderProps {
  /** Name of the seller's shop */
  shopName: string;
  /** Number of new orders for notification display */
  newOrderCount?: number;
}

export default function DashboardHeader({ shopName, newOrderCount = 0 }: DashboardHeaderProps) {
  return (
    <>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard de Vendedor</h1>
          <p className="text-gray-600 mt-1">{shopName}</p>
        </div>

        {/* Notification Bell */}
        {newOrderCount > 0 && (
          <div className="relative">
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <div className="relative">
                <Bell className="w-5 h-5 text-green-600" />
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-xs font-bold text-white bg-green-500 rounded-full">
                  {newOrderCount}
                </span>
              </div>
              <span className="text-sm font-medium text-green-700 hidden sm:inline">
                {newOrderCount === 1 ? 'Nuevo pedido' : 'Nuevos pedidos'}
              </span>
            </div>
          </div>
        )}
      </div>

      <Link
        href={`/tienda/${getShopSlug(shopName)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-800 transition font-semibold mb-6"
      >
        <Store className="w-5 h-5" />
        Ver Mi Tienda
        <ExternalLink className="w-4 h-4" />
      </Link>
    </>
  );
}
