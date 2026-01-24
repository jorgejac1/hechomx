'use client';

import { Plus, Trash2, Clock } from 'lucide-react';
import type { LaborTime } from '@/lib/types/pricing-calculator';

interface LaborTasksListProps {
  laborTasks: LaborTime[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof LaborTime, value: string | number) => void;
}

export default function LaborTasksList({
  laborTasks,
  onAdd,
  onRemove,
  onUpdate,
}: LaborTasksListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Tiempo de Trabajo</h2>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      <div className="space-y-3">
        {laborTasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-12 gap-2 items-end p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="col-span-12 sm:col-span-5">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Tarea</label>
              <input
                type="text"
                value={task.taskName}
                onChange={(e) => onUpdate(task.id, 'taskName', e.target.value)}
                placeholder="Tejido, teñido, etc."
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Horas</label>
              <input
                type="number"
                value={task.hours}
                onChange={(e) => onUpdate(task.id, 'hours', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.5"
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Tarifa/hr
              </label>
              <input
                type="number"
                value={task.hourlyRate}
                onChange={(e) => onUpdate(task.id, 'hourlyRate', parseFloat(e.target.value) || 0)}
                min="0"
                step="1"
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="col-span-4 sm:col-span-3 flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Total</label>
                <p className="text-sm font-bold text-green-600 dark:text-green-400 px-2 py-1">
                  ${task.total.toFixed(2)}
                </p>
              </div>
              {laborTasks.length > 1 && (
                <button
                  onClick={() => onRemove(task.id)}
                  className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-sm transition"
                  title="Eliminar tarea"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Total Mano de Obra:
        </span>
        <span className="text-lg font-bold text-green-600 dark:text-green-400">
          ${laborTasks.reduce((sum, t) => sum + t.total, 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
