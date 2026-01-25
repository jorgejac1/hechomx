/**
 * @fileoverview Conversion funnel visualization component for seller analytics.
 * Displays the customer journey from store visits through to completed purchases
 * with visual representation of drop-off rates at each stage.
 * @module components/dashboard/ConversionFunnel
 */

'use client';

import { Filter, Eye, ShoppingCart, CreditCard, Package, ArrowDown } from 'lucide-react';

/**
 * Single stage in the conversion funnel
 */
export interface FunnelStage {
  /** Stage identifier */
  id: string;
  /** Display label for the stage */
  label: string;
  /** Total count at this stage */
  count: number;
  /** Conversion rate from previous stage (percentage) */
  conversionFromPrevious: number;
}

/**
 * Props for the ConversionFunnel component
 */
interface ConversionFunnelProps {
  /** Array of funnel stages from top to bottom */
  stages: FunnelStage[];
  /** Time period label for display */
  periodLabel?: string;
}

/**
 * Icon mapping for funnel stages
 */
const stageIcons: Record<string, React.ReactNode> = {
  store_visits: <Eye className="w-4 h-4" />,
  product_views: <Filter className="w-4 h-4" />,
  add_to_cart: <ShoppingCart className="w-4 h-4" />,
  checkout_started: <CreditCard className="w-4 h-4" />,
  purchases: <Package className="w-4 h-4" />,
};

/**
 * Color mapping for funnel stages (gradient from blue to green)
 */
const stageColors: Record<string, string> = {
  store_visits: 'bg-blue-500',
  product_views: 'bg-cyan-500',
  add_to_cart: 'bg-teal-500',
  checkout_started: 'bg-emerald-500',
  purchases: 'bg-green-500',
};

/**
 * Background color mapping for cards
 */
const stageBackgrounds: Record<string, string> = {
  store_visits: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  product_views: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
  add_to_cart: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
  checkout_started:
    'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
  purchases: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
};

/**
 * Format large numbers with K/M suffixes
 */
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString('es-MX');
}

/**
 * ConversionFunnel displays a visual representation of the customer journey
 * through the purchase funnel, showing drop-off rates at each stage.
 */
export default function ConversionFunnel({
  stages,
  periodLabel = 'Este período',
}: ConversionFunnelProps) {
  if (!stages || stages.length === 0) {
    return null;
  }

  const maxCount = stages[0]?.count || 1;

  // Calculate overall conversion rate
  const overallConversion =
    stages.length > 1
      ? ((stages[stages.length - 1].count / stages[0].count) * 100).toFixed(2)
      : '0';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
            De Visita a Compra
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Cómo llegan tus clientes a comprarte · {periodLabel}
          </p>
        </div>
        <div className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <span className="text-xs sm:text-sm font-semibold text-green-700 dark:text-green-400">
            Conversión total: {overallConversion}%
          </span>
        </div>
      </div>

      {/* Visual Funnel */}
      <div className="space-y-2">
        {stages.map((stage, index) => {
          const widthPercentage = Math.max((stage.count / maxCount) * 100, 15);
          const icon = stageIcons[stage.id] || <Filter className="w-4 h-4" />;
          const barColor = stageColors[stage.id] || 'bg-gray-500';
          const bgColor =
            stageBackgrounds[stage.id] ||
            'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600';
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id}>
              {/* Stage Card */}
              <div
                className={`relative p-3 sm:p-4 rounded-lg border ${bgColor} transition-all hover:shadow-md`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${barColor} text-white shrink-0`}>{icon}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {stage.label}
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 shrink-0">
                        {formatNumber(stage.count)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${widthPercentage}%` }}
                      />
                    </div>

                    {/* Percentage from total */}
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {((stage.count / maxCount) * 100).toFixed(1)}% del total
                      </span>
                      {index > 0 && (
                        <span
                          className={`text-xs font-semibold ${
                            stage.conversionFromPrevious >= 50
                              ? 'text-green-600 dark:text-green-400'
                              : stage.conversionFromPrevious >= 25
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {stage.conversionFromPrevious}% del anterior
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow between stages */}
              {!isLast && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Abandono carrito</p>
            <p className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400">
              {stages.length >= 4
                ? (100 - ((stages[3]?.count || 0) / (stages[2]?.count || 1)) * 100).toFixed(1)
                : '0'}
              %
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tasa checkout</p>
            <p className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
              {stages.length >= 5
                ? (((stages[4]?.count || 0) / (stages[3]?.count || 1)) * 100).toFixed(1)
                : '0'}
              %
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Vista a compra</p>
            <p className="text-sm sm:text-base font-bold text-green-600 dark:text-green-400">
              {stages.length >= 5
                ? (((stages[4]?.count || 0) / (stages[1]?.count || 1)) * 100).toFixed(2)
                : '0'}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
