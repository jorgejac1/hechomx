/**
 * @fileoverview Quick actions widget for the seller dashboard.
 * Displays actionable items including pending orders, low stock alerts,
 * unanswered messages, pending reviews, and promotional features like
 * artisan story creation and pricing calculator access.
 * @module components/dashboard/QuickActions
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPendingActions } from '@/lib/api/sellerApi';
import type { PendingActionsData } from '@/lib/types';
import { getShopSlug } from '@/lib/utils/shop-utils';
import { getArtisanStoryByEmail } from '@/lib';
import { formatCurrency, ROUTES } from '@/lib';
import {
  Package,
  AlertTriangle,
  MessageSquare,
  Star,
  TrendingUp,
  ArrowRight,
  Loader2,
  Sparkles,
  Calculator,
  Store,
  ExternalLink,
} from 'lucide-react';

/**
 * @interface QuickActionsProps
 * Props for the QuickActions component.
 */
interface QuickActionsProps {
  /** Email of the seller for loading pending actions */
  userEmail: string;
  /** Name of the shop for generating shop links */
  shopName: string;
}

export default function QuickActions({ userEmail, shopName }: QuickActionsProps) {
  const [data, setData] = useState<PendingActionsData | null>(null);
  const [hasStory, setHasStory] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [actionsData, storyData] = await Promise.all([
        getPendingActions(userEmail),
        getArtisanStoryByEmail(userEmail),
      ]);
      setData(actionsData);
      setHasStory(storyData !== null);
      setIsLoading(false);
    }
    loadData();
  }, [userEmail]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const urgentActions = data.recommendedActions.filter(
    (a) => a.priority === 'high' || a.priority === 'critical'
  );
  const totalPendingTasks =
    data.pendingOrders.length +
    data.lowStockProducts.filter((p) => p.urgency === 'critical').length +
    data.unansweredMessages +
    data.pendingReviews.filter((r) => r.needsResponse).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Acciones Rápidas</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {totalPendingTasks === 0 ? 'Todo al día' : `${totalPendingTasks} pendientes`}
          </p>
        </div>
        {totalPendingTasks > 0 && (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm font-semibold rounded-full">
            {totalPendingTasks}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Mi Historia Artesanal - Show if they don't have a story yet */}
        {hasStory === false && (
          <Link
            href={ROUTES.MY_STORY}
            className="block w-full p-4 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border-2 border-purple-300 dark:border-purple-600 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Comparte Tu Historia Artesanal
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Conecta emocionalmente con tus clientes mostrando tu herencia y proceso
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            </div>
          </Link>
        )}

        {/* Pricing Calculator Promo */}
        <Link
          href={ROUTES.PRICING_CALCULATOR}
          className="block w-full p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border-2 border-blue-300 dark:border-blue-600 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/50 dark:hover:to-cyan-900/50 transition text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Calcula Precios Justos
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Herramienta para calcular precios con salario digno
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          </div>
        </Link>

        {/* View My Shop */}
        <Link
          href={`/tienda/${getShopSlug(shopName)}`}
          target="_blank"
          className="block w-full p-4 bg-linear-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-lg border-2 border-emerald-300 dark:border-emerald-600 hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/50 dark:hover:to-green-900/50 transition text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Store className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Vista de Cliente</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ve cómo los clientes ven tu tienda
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          </div>
        </Link>

        {/* Edit Story - Show if they already have a story */}
        {hasStory === true && (
          <Link
            href={ROUTES.MY_STORY}
            className="block w-full p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-500 dark:border-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Editar Mi Historia
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Actualiza tu historia artesanal y fotos
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            </div>
          </Link>
        )}

        {/* Pending Orders */}
        {data.pendingOrders.length > 0 && (
          <Link
            href={ROUTES.ORDERS_MANAGEMENT}
            className="block w-full p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500 dark:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {data.pendingOrders.length} pedido{data.pendingOrders.length > 1 ? 's' : ''} por
                    procesar
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {data.pendingOrders[0].customerName} -{' '}
                    {formatCurrency(data.pendingOrders[0].total)}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            </div>
          </Link>
        )}

        {/* Low Stock */}
        {data.lowStockProducts.filter((p) => p.urgency === 'critical').length > 0 && (
          <Link
            href={`${ROUTES.DASHBOARD}?tab=products`}
            className="block w-full p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-500 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Productos sin stock
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {data.lowStockProducts.filter((p) => p.urgency === 'critical')[0].name}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            </div>
          </Link>
        )}

        {/* Unanswered Messages */}
        {data.unansweredMessages > 0 && (
          <Link
            href={ROUTES.MESSAGES}
            className="block w-full p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border-l-4 border-yellow-500 dark:border-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <MessageSquare className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {data.unansweredMessages} mensaje{data.unansweredMessages > 1 ? 's' : ''} sin
                    responder
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Responde para mantener tu tasa de respuesta
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
            </div>
          </Link>
        )}

        {/* Pending Reviews */}
        {data.pendingReviews.filter((r) => r.needsResponse).length > 0 && (
          <Link
            href={ROUTES.REVIEWS_MANAGEMENT}
            className="block w-full p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-500 dark:border-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {data.pendingReviews.filter((r) => r.needsResponse).length} reseña
                    {data.pendingReviews.filter((r) => r.needsResponse).length > 1 ? 's' : ''} por
                    responder
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {data.pendingReviews[0].buyerName} - {data.pendingReviews[0].daysAgo} días
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            </div>
          </Link>
        )}

        {/* Recommended Actions */}
        {urgentActions.length > 0 && (
          <Link
            href={ROUTES.ORDERS_MANAGEMENT}
            className="block w-full p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-500 dark:border-green-600 hover:bg-green-100 dark:hover:bg-green-900/50 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {urgentActions[0].title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {urgentActions[0].description}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
            </div>
          </Link>
        )}

        {/* All Clear */}
        {totalPendingTasks === 0 && hasStory === true && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              ¡Todo al día!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No hay acciones pendientes en este momento
            </p>
          </div>
        )}

        {/* View All Tasks Button */}
        <Link
          href={ROUTES.TASKS_CENTER}
          className="block w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition text-center"
        >
          <p className="font-semibold text-gray-700 dark:text-gray-300">Ver Todas las Tareas</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Centro completo de gestión
          </p>
        </Link>
      </div>
    </div>
  );
}
