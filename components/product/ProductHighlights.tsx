/**
 * @fileoverview Product highlights component
 * Displays key selling points about artisan products including handmade quality,
 * authentic materials, uniqueness, and community support aspects.
 * @module components/product/ProductHighlights
 */

'use client';

import { CheckCircle } from 'lucide-react';

/**
 * Renders a list of product highlight points with check icons
 * @returns Styled list of artisan product benefits
 */
export default function ProductHighlights() {
  const highlights = [
    '100% hecho a mano por verificados artesanos',
    'Materiales auténticos de la región',
    'Cada pieza es única e irrepetible',
    'Apoyo directamente a comunidades artesanales',
  ];

  return (
    <div className="bg-teal-50 rounded-lg p-6 border border-teal-100">
      <h3 className="font-bold text-gray-900 mb-4 text-lg">Detalles de la Artesanía</h3>
      <div className="space-y-3">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <span className="text-gray-700">{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
