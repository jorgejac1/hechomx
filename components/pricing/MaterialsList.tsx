'use client';

import { Plus, Trash2, Package } from 'lucide-react';
import type { MaterialCost } from '@/lib/types/pricing-calculator';

interface MaterialsListProps {
  materials: MaterialCost[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof MaterialCost, value: string | number) => void;
}

export default function MaterialsList({
  materials,
  onAdd,
  onRemove,
  onUpdate,
}: MaterialsListProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Materiales</h2>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      <div className="space-y-3">
        {materials.map((material) => (
          <div
            key={material.id}
            className="grid grid-cols-12 gap-2 items-end p-3 bg-gray-50 rounded-lg"
          >
            <div className="col-span-12 sm:col-span-4">
              <label className="block text-xs text-gray-600 mb-1">Material</label>
              <input
                type="text"
                value={material.name}
                onChange={(e) => onUpdate(material.id, 'name', e.target.value)}
                placeholder="Lana, tinte, etc."
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Cantidad</label>
              <input
                type="number"
                value={material.quantity}
                onChange={(e) => onUpdate(material.id, 'quantity', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Unidad</label>
              <select
                value={material.unit}
                onChange={(e) => onUpdate(material.id, 'unit', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="m">m</option>
                <option value="m²">m²</option>
                <option value="L">L</option>
                <option value="unidad">unidad</option>
              </select>
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Costo/u</label>
              <input
                type="number"
                value={material.costPerUnit}
                onChange={(e) =>
                  onUpdate(material.id, 'costPerUnit', parseFloat(e.target.value) || 0)
                }
                min="0"
                step="0.01"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="col-span-12 sm:col-span-2 flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Total</label>
                <p className="text-sm font-bold text-blue-600 px-2 py-1">
                  ${material.total.toFixed(2)}
                </p>
              </div>
              {materials.length > 1 && (
                <button
                  onClick={() => onRemove(material.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-sm transition"
                  title="Eliminar material"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Total Materiales:</span>
        <span className="text-lg font-bold text-blue-600">
          ${materials.reduce((sum, m) => sum + m.total, 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
