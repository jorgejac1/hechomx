"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xs p-8 sm:p-12 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Tu carrito está vacío
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Descubre productos artesanales únicos hechos en México y comienza a llenar tu carrito.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/productos')}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Ver productos
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/')}
            >
              Ir al inicio
            </Button>
          </div>

          {/* Features */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-primary-600 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Productos Únicos</h3>
                <p className="text-sm text-gray-600">100% hechos a mano por artesanos mexicanos</p>
              </div>
              <div>
                <div className="text-primary-600 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Compra Segura</h3>
                <p className="text-sm text-gray-600">Transacciones protegidas y encriptadas</p>
              </div>
              <div>
                <div className="text-primary-600 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Envío Nacional</h3>
                <p className="text-sm text-gray-600">A toda la República Mexicana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}