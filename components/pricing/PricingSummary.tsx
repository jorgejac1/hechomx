'use client';

import { DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib';

interface PricingSummaryProps {
  totalMaterialCost: number;
  totalLaborCost: number;
  totalOverheadCost: number;
  profitMargin: number;
  onProfitMarginChange: (value: number) => void;
  wholesalePrice: number;
  retailPrice: number;
  isUsingFairWage: boolean;
}

export default function PricingSummary({
  totalMaterialCost,
  totalLaborCost,
  totalOverheadCost,
  profitMargin,
  onProfitMarginChange,
  wholesalePrice,
  retailPrice,
  isUsingFairWage,
}: PricingSummaryProps) {
  const totalCost = totalMaterialCost + totalLaborCost + totalOverheadCost;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-bold text-gray-900">Resumen de Precios</h2>
      </div>

      {/* Fair Wage Indicator */}
      {isUsingFairWage ? (
        <div className="mb-6 p-3 bg-green-50 border-2 border-green-200 rounded-lg flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-900">Salario Justo</p>
            <p className="text-xs text-green-700">Estás usando tarifas de salario digno</p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-900">Revisa tu tarifa</p>
            <p className="text-xs text-yellow-700">Considera usar salario digno recomendado</p>
          </div>
        </div>
      )}

      {/* Cost Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Materiales:</span>
          <span className="font-semibold text-gray-900">{formatCurrency(totalMaterialCost)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Mano de Obra:</span>
          <span className="font-semibold text-gray-900">{formatCurrency(totalLaborCost)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Gastos Generales:</span>
          <span className="font-semibold text-gray-900">{formatCurrency(totalOverheadCost)}</span>
        </div>
        <div className="pt-3 border-t border-gray-200 flex justify-between">
          <span className="font-semibold text-gray-900">Costo Total:</span>
          <span className="font-bold text-lg text-gray-900">{formatCurrency(totalCost)}</span>
        </div>
      </div>

      {/* Profit Margin Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-700">Margen de Ganancia</label>
          <span className="text-lg font-bold text-primary-600">{profitMargin}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={profitMargin}
          onChange={(e) => onProfitMarginChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>10%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Suggested Prices */}
      <div className="space-y-4">
        <div className="p-4 bg-primary-50 rounded-lg border-2 border-primary-200">
          <p className="text-sm text-gray-600 mb-1">Precio Mayoreo</p>
          <p className="text-2xl font-bold text-primary-600">{formatCurrency(wholesalePrice)}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg text-white">
          <p className="text-sm text-primary-100 mb-1">Precio Sugerido al Público</p>
          <p className="text-3xl font-bold">{formatCurrency(retailPrice)}</p>
          <p className="text-xs text-primary-100 mt-2">Incluye margen de distribución (2x)</p>
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          💡 <strong>Tip:</strong> El precio sugerido al público incluye un margen para
          distribuidores. Ajusta según tu canal de venta.
        </p>
      </div>
    </div>
  );
}
