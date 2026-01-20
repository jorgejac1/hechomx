'use client';

import { Shield, RotateCcw, Clock } from 'lucide-react';

export default function TrustIndicators() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-200">
      <div className="flex items-start gap-2">
        <Shield className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-gray-900">Compra Segura</p>
          <p className="text-xs text-gray-600">Protección al comprador</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <RotateCcw className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-gray-900">Devoluciones</p>
          <p className="text-xs text-gray-600">Aceptadas en 30 días</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-gray-900">Respuesta Rápida</p>
          <p className="text-xs text-gray-600">Usualmente en 24 horas</p>
        </div>
      </div>
    </div>
  );
}