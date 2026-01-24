/**
 * @fileoverview Delivery estimate and trust indicators component
 * Displays trust badges for secure purchase, returns policy, and response time.
 * Provides buyers with confidence indicators about the purchase experience.
 * @module components/product/DeliveryEstimate
 */

'use client';

import { Shield, RotateCcw, Clock } from 'lucide-react';

/**
 * Renders trust indicator badges for delivery and purchase security
 * @returns Grid of trust badges with icons and descriptions
 */
export default function TrustIndicators() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-2">
        <Shield className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Compra Segura</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Protección al comprador</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <RotateCcw className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Devoluciones</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Aceptadas en 30 días</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Respuesta Rápida</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Usualmente en 24 horas</p>
        </div>
      </div>
    </div>
  );
}
