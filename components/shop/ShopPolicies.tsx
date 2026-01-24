/**
 * @fileoverview Shop policies display component
 * Renders the shop's return and cancellation policies in a two-column grid layout.
 * Provides customers with important policy information before making purchases.
 * @module components/shop/ShopPolicies
 */

'use client';

import type { ExtendedMakerProfile } from '@/lib/data/mockUsers';
import { RefreshCw, XCircle } from 'lucide-react';

/**
 * Props for the ShopPolicies component
 * @interface ShopPoliciesProps
 */
interface ShopPoliciesProps {
  /** Extended maker profile containing policy information */
  profile: ExtendedMakerProfile;
}

export default function ShopPolicies({ profile }: ShopPoliciesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Return Policy */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Política de Devoluciones
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.returnPolicy}</p>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-6">
        <div className="flex items-center gap-2 mb-4">
          <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Política de Cancelación
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {profile.cancellationPolicy}
        </p>
      </div>
    </div>
  );
}
