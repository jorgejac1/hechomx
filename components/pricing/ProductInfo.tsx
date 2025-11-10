'use client';

import { Package } from 'lucide-react';

interface ProductInfoProps {
  productName: string;
  productDescription: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export default function ProductInfo({
  productName,
  productDescription,
  onNameChange,
  onDescriptionChange,
}: ProductInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-bold text-gray-900">Información del Producto</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre del Producto *
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Ej: Tapete Zapoteca Grande"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
          <textarea
            value={productDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Descripción breve del producto..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
