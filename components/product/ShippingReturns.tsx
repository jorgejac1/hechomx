'use client';

import { Truck, RotateCcw, Shield } from 'lucide-react';

export default function ShippingReturns() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Envío y Devoluciones</h2>
      
      <div className="space-y-6">
        {/* Shipping */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Envío Nacional</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Envío a toda la República Mexicana en 7-10 días hábiles. 
              El costo de envío se calcula al finalizar la compra según tu ubicación.
            </p>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-700">
                <strong>Envío gratis</strong> en compras mayores a $1,000 MXN
              </p>
            </div>
          </div>
        </div>

        {/* Returns */}
        <div className="flex items-start gap-4 pt-6 border-t border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <RotateCcw className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Devoluciones y Cambios</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Aceptamos devoluciones dentro de los 30 días posteriores a la entrega. 
              El producto debe estar en su estado original sin usar.
            </p>
            <button className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium underline">
              Ver política completa de devoluciones →
            </button>
          </div>
        </div>

        {/* Secure Purchase */}
        <div className="flex items-start gap-4 pt-6 border-t border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Compra Protegida</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tu compra está 100% protegida. Si algo no está correcto, 
              te ayudamos a resolverlo o te devolvemos tu dinero.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}