'use client';

import { ExtendedMakerProfile } from '@/lib/data/mockUsers';
import { RefreshCw, XCircle } from 'lucide-react';

interface ShopPoliciesProps {
  profile: ExtendedMakerProfile;
}

export default function ShopPolicies({ profile }: ShopPoliciesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Return Policy */}
      <div className="bg-white rounded-xl shadow-xs p-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Política de Devoluciones</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{profile.returnPolicy}</p>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-white rounded-xl shadow-xs p-6">
        <div className="flex items-center gap-2 mb-4">
          <XCircle className="w-6 h-6 text-red-600" />
          <h3 className="text-xl font-bold text-gray-900">Política de Cancelación</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{profile.cancellationPolicy}</p>
      </div>
    </div>
  );
}
