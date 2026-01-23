/**
 * @fileoverview Seller badge component for verified artisans
 * Displays a highlighted badge for star artisans with their name
 * and a note about their responsiveness and shipping reliability.
 * @module components/product/SellerBadge
 */

'use client';

import { Award } from 'lucide-react';

/**
 * Props for the SellerBadge component
 * @interface SellerBadgeProps
 */
interface SellerBadgeProps {
  /** Whether the seller is verified */
  verified: boolean;
  /** Name of the artisan/maker */
  makerName: string;
}

export default function SellerBadge({ verified, makerName }: SellerBadgeProps) {
  if (!verified) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg w-fit">
      <Award className="w-5 h-5 text-amber-600" />
      <div className="flex flex-col">
        <span className="text-sm font-bold text-amber-900">{makerName} • Artesano Estrella</span>
        <span className="text-xs text-amber-700">Responde rápido y envía a tiempo</span>
      </div>
    </div>
  );
}
