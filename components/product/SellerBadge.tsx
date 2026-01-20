'use client';

import { Award } from 'lucide-react';

interface SellerBadgeProps {
  verified: boolean;
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
