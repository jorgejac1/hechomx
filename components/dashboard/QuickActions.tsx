'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPendingActions } from '@/lib/api/sellerApi';
import type { PendingActionsData } from '@/lib/types';
import { getShopSlug } from '@/lib/utils/shop';
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

interface QuickActionsProps {
  userEmail: string;
  shopName: string; // Added prop
}

export default function QuickActions({ userEmail, shopName }: QuickActionsProps) {
  const router = useRouter();
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
      <div className="bg-white rounded-xl shadow-md p-6">
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
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Acciones Rápidas</h3>
          <p className="text-sm text-gray-600">
            {totalPendingTasks === 0 ? 'Todo al día' : `${totalPendingTasks} pendientes`}
          </p>
        </div>
        {totalPendingTasks > 0 && (
          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
            {totalPendingTasks}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Mi Historia Artesanal - Show if they don't have a story yet */}
        {hasStory === false && (
          <button
            onClick={() => router.push(ROUTES.MY_STORY)}
            className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300 hover:from-purple-100 hover:to-pink-100 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">✨ Comparte Tu Historia Artesanal</p>
                  <p className="text-sm text-gray-600">
                    Conecta emocionalmente con tus clientes mostrando tu herencia y proceso
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0" />
            </div>
          </button>
        )}

        {/* Pricing Calculator Promo */}
        <button
          onClick={() => router.push(ROUTES.PRICING_CALCULATOR)}
          className="w-full p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300 hover:from-blue-100 hover:to-cyan-100 transition text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Calculator className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">💰 Calcula Precios Justos</p>
                <p className="text-sm text-gray-600">
                  Herramienta para calcular precios con salario digno
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
          </div>
        </button>

        {/* View My Shop - FIXED */}
        <button
          onClick={() => window.open(`/tienda/${getShopSlug(shopName)}`, '_blank')}
          className="w-full p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-300 hover:from-emerald-100 hover:to-green-100 transition text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Store className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">🏪 Vista de Cliente</p>
                <p className="text-sm text-gray-600">Ve cómo los clientes ven tu tienda</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          </div>
        </button>

        {/* Edit Story - Show if they already have a story */}
        {hasStory === true && (
          <button
            onClick={() => router.push(ROUTES.MY_STORY)}
            className="w-full p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500 hover:bg-purple-100 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Editar Mi Historia</p>
                  <p className="text-sm text-gray-600">Actualiza tu historia artesanal y fotos</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0" />
            </div>
          </button>
        )}

        {/* Pending Orders */}
        {data.pendingOrders.length > 0 && (
          <button
            onClick={() => router.push(ROUTES.ORDERS_MANAGEMENT)}
            className="w-full p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 hover:bg-blue-100 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Package className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {data.pendingOrders.length} pedido{data.pendingOrders.length > 1 ? 's' : ''} por
                    procesar
                  </p>
                  <p className="text-sm text-gray-600">
                    {data.pendingOrders[0].customerName} -{' '}
                    {formatCurrency(data.pendingOrders[0].total)}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
            </div>
          </button>
        )}

        {/* Low Stock */}
        {data.lowStockProducts.filter((p) => p.urgency === 'critical').length > 0 && (
          <button
            onClick={() => router.push(`${ROUTES.DASHBOARD}?tab=products`)}
            className="w-full p-4 bg-red-50 rounded-lg border-l-4 border-red-500 hover:bg-red-100 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Productos sin stock</p>
                  <p className="text-sm text-gray-600">
                    {data.lowStockProducts.filter((p) => p.urgency === 'critical')[0].name}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-red-600 flex-shrink-0" />
            </div>
          </button>
        )}

        {/* Unanswered Messages */}
        {data.unansweredMessages > 0 && (
          <button
            onClick={() => router.push(ROUTES.MESSAGES)}
            className="w-full p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500 hover:bg-yellow-100 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <MessageSquare className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {data.unansweredMessages} mensaje{data.unansweredMessages > 1 ? 's' : ''} sin
                    responder
                  </p>
                  <p className="text-sm text-gray-600">
                    Responde para mantener tu tasa de respuesta
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            </div>
          </button>
        )}

        {/* Pending Reviews */}
        {data.pendingReviews.filter((r) => r.needsResponse).length > 0 && (
          <button
            onClick={() => router.push(ROUTES.REVIEWS_MANAGEMENT)}
            className="w-full p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500 hover:bg-purple-100 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Star className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {data.pendingReviews.filter((r) => r.needsResponse).length} reseña
                    {data.pendingReviews.filter((r) => r.needsResponse).length > 1 ? 's' : ''} por
                    responder
                  </p>
                  <p className="text-sm text-gray-600">
                    {data.pendingReviews[0].buyerName} - {data.pendingReviews[0].daysAgo} días
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0" />
            </div>
          </button>
        )}

        {/* Recommended Actions */}
        {urgentActions.length > 0 && (
          <button
            onClick={() => router.push(ROUTES.ORDERS_MANAGEMENT)}
            className="w-full p-4 bg-green-50 rounded-lg border-l-4 border-green-500 hover:bg-green-100 transition text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">{urgentActions[0].title}</p>
                  <p className="text-sm text-gray-600">{urgentActions[0].description}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0" />
            </div>
          </button>
        )}

        {/* All Clear */}
        {totalPendingTasks === 0 && hasStory === true && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-1">¡Todo al día!</p>
            <p className="text-sm text-gray-600">No hay acciones pendientes en este momento</p>
          </div>
        )}

        {/* View All Tasks Button */}
        <button
          onClick={() => router.push(ROUTES.TASKS_CENTER)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-center"
        >
          <p className="font-semibold text-gray-700">Ver Todas las Tareas</p>
          <p className="text-sm text-gray-600 mt-1">Centro completo de gestión</p>
        </button>
      </div>
    </div>
  );
}
