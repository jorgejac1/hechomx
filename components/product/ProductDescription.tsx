/**
 * @fileoverview Product description section component
 * Displays detailed product information including description, key features,
 * specifications, materials, care instructions, and usage suggestions.
 * @module components/product/ProductDescription
 */

'use client';

import { Package, Ruler, Sparkles, Heart } from 'lucide-react';

/**
 * Props for the ProductDescription component
 * @interface ProductDescriptionProps
 */
interface ProductDescriptionProps {
  /** Main product description text */
  description: string;
  /** Product category name */
  category: string;
  /** Product subcategory name (optional) */
  subcategory?: string;
  /** State/region where the product originates from */
  state: string;
}

export default function ProductDescription({
  description,
  category,
  subcategory,
  state,
}: ProductDescriptionProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción del Producto</h2>

      {/* Main Description */}
      <div className="mb-8">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">{description}</p>

        {/* Key Features */}
        <div className="bg-teal-50 rounded-lg p-6 border border-teal-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            Características Principales
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></div>
              <span className="text-gray-700">
                Diseño único inspirado en arte prehispánico mexicano
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></div>
              <span className="text-gray-700">
                Acabado oxidado que resalta los detalles artesanales
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></div>
              <span className="text-gray-700">Piedras de turquesa natural engastadas a mano</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></div>
              <span className="text-gray-700">Cierre seguro con sistema de presión</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Category */}
        <div className="border-l-4 border-teal-500 pl-4 py-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 uppercase tracking-wide flex items-center gap-2">
            <Package className="w-4 h-4 text-teal-600" />
            Categoría
          </h3>
          <p className="text-gray-700 font-medium">{category}</p>
          {subcategory && <p className="text-sm text-gray-500">{subcategory}</p>}
        </div>

        {/* Origin */}
        <div className="border-l-4 border-teal-500 pl-4 py-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 uppercase tracking-wide flex items-center gap-2">
            <Heart className="w-4 h-4 text-teal-600" />
            Origen
          </h3>
          <p className="text-gray-700 font-medium">{state}, México</p>
          <p className="text-sm text-gray-500">Hecho a mano</p>
        </div>

        {/* Dimensions */}
        <div className="border-l-4 border-teal-500 pl-4 py-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 uppercase tracking-wide flex items-center gap-2">
            <Ruler className="w-4 h-4 text-teal-600" />
            Dimensiones
          </h3>
          <p className="text-gray-700 font-medium">2.5 cm × 1.5 cm</p>
          <p className="text-sm text-gray-500">Peso: 8 gramos</p>
        </div>
      </div>

      {/* Materials & Care */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Materials */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="font-bold text-gray-900 mb-3 text-base">Materiales</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-teal-600">•</span>
              <span>Plata .925 (Sterling Silver)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600">•</span>
              <span>Turquesa natural mexicana</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600">•</span>
              <span>Acabado oxidado tradicional</span>
            </li>
          </ul>
        </div>

        {/* Care Instructions */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="font-bold text-gray-900 mb-3 text-base">Cuidados</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-teal-600">•</span>
              <span>Evitar contacto con agua y químicos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600">•</span>
              <span>Limpiar con paño suave y seco</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600">•</span>
              <span>Guardar en lugar seco y protegido</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Perfect For */}
      <div className="mt-6 p-5 bg-linear-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-100">
        <h3 className="font-bold text-gray-900 mb-2 text-base">Perfecto para</h3>
        <p className="text-gray-700 text-sm">
          Ideal para uso diario o ocasiones especiales. Un regalo único que celebra la artesanía
          mexicana. Complementa tanto outfits casuales como elegantes.
        </p>
      </div>
    </div>
  );
}
