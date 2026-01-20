'use client';

import { Plus, Trash2, TrendingUp } from 'lucide-react';
import type { OverheadCost } from '@/lib/types/pricing-calculator';

interface OverheadCostsListProps {
  overheadCosts: OverheadCost[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof OverheadCost, value: string | number) => void;
}

export default function OverheadCostsList({
  overheadCosts,
  onAdd,
  onRemove,
  onUpdate,
}: OverheadCostsListProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Gastos Generales</h2>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      <div className="space-y-3">
        {overheadCosts.map((cost) => (
          <div
            key={cost.id}
            className="grid grid-cols-12 gap-2 items-end p-3 bg-gray-50 rounded-lg"
          >
            <div className="col-span-12 sm:col-span-5">
              <label className="block text-xs text-gray-600 mb-1">Categoría</label>
              <input
                type="text"
                value={cost.category}
                onChange={(e) => onUpdate(cost.id, 'category', e.target.value)}
                placeholder="Renta, luz, herramientas..."
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-xs text-gray-600 mb-1">Monto</label>
              <input
                type="number"
                value={cost.amount}
                onChange={(e) => onUpdate(cost.id, 'amount', parseFloat(e.target.value) || 0)}
                min="0"
                step="1"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-xs text-gray-600 mb-1">Frecuencia</label>
              <select
                value={cost.frequency}
                onChange={(e) => onUpdate(cost.id, 'frequency', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500"
              >
                <option value="one-time">Única vez</option>
                <option value="monthly">Mensual</option>
                <option value="annual">Anual</option>
              </select>
            </div>
            {overheadCosts.length > 1 && (
              <div className="col-span-12 sm:col-span-1 flex items-end justify-center">
                <button
                  onClick={() => onRemove(cost.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-sm transition"
                  title="Eliminar gasto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-lg flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Total Gastos Generales:</span>
        <span className="text-lg font-bold text-purple-600">
          ${overheadCosts.reduce((sum, c) => sum + c.amount, 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
