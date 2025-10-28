'use client';

import { CheckCircle, MessageCircle, Store } from 'lucide-react';

interface SellerProfileProps {
  maker: string;
  verified: boolean;
  state: string;
}

export default function SellerProfile({ maker, verified, state }: SellerProfileProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Conoce al Artesano
      </h2>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {maker.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{maker}</h3>
            {verified && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
          </div>
          <p className="text-gray-600 text-sm">{state}, México</p>
        </div>
      </div>

      <p className="text-gray-700 mb-6 text-sm leading-relaxed">
        Artesanos verificados dedicados a preservar las tradiciones mexicanas mediante 
        la creación de piezas únicas hechas a mano con técnicas ancestrales.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">50+</div>
          <div className="text-xs text-gray-600">Productos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">4.8</div>
          <div className="text-xs text-gray-600">Calificación</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">200+</div>
          <div className="text-xs text-gray-600">Ventas</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors">
          <Store className="w-5 h-5" />
          <span>Ver tienda</span>
        </button>
        <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span>Contactar</span>
        </button>
      </div>
    </div>
  );
}