/**
 * @fileoverview Product gallery information badges component
 * Displays trust badges and interaction hints below the product gallery.
 * Shows handmade certification, verified artisan, national shipping, and artisan support badges.
 * @module components/product/ProductGalleryInfo
 */

'use client';

import { Sparkles, Package, Shield, Heart } from 'lucide-react';

/**
 * Renders trust badges and gallery interaction tips
 * @returns Trust badges grid with hover/click instructions
 */
export default function ProductGalleryInfo() {
  return (
    <div className="mt-6 space-y-4">
      {/* Trust Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="flex flex-col items-center text-center p-3 bg-primary-50 rounded-lg border border-primary-100">
          <Sparkles className="w-5 h-5 text-primary-600 mb-1" />
          <span className="text-xs font-medium text-gray-900">100% Hecho</span>
          <span className="text-xs text-gray-600">a Mano</span>
        </div>

        <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-lg border border-green-100">
          <Shield className="w-5 h-5 text-green-600 mb-1" />
          <span className="text-xs font-medium text-gray-900">Artesano</span>
          <span className="text-xs text-gray-600">Verificado</span>
        </div>

        <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
          <Package className="w-5 h-5 text-blue-600 mb-1" />
          <span className="text-xs font-medium text-gray-900">Envío</span>
          <span className="text-xs text-gray-600">Nacional</span>
        </div>

        <div className="flex flex-col items-center text-center p-3 bg-amber-50 rounded-lg border border-amber-100">
          <Heart className="w-5 h-5 text-amber-600 mb-1" />
          <span className="text-xs font-medium text-gray-900">Apoyas al</span>
          <span className="text-xs text-gray-600">Artesano</span>
        </div>
      </div>

      {/* Hover Tip - Subtle */}
      <p className="text-xs text-center text-gray-500">
        Pasa el cursor para zoom • Clic para vista completa
      </p>
    </div>
  );
}
