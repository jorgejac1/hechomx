'use client';

import { Heart } from 'lucide-react';
import { formatCurrency } from '@/lib';
import type { FairTradeRates } from '@/lib/types/pricing-calculator';

interface FairTradeRatesSelectorProps {
  selectedRegion: string;
  fairTradeRates: FairTradeRates | null;
  onRegionChange: (region: string) => void;
}

export default function FairTradeRatesSelector({
  selectedRegion,
  fairTradeRates,
  onRegionChange,
}: FairTradeRatesSelectorProps) {
  return (
    <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-700 rounded-xl p-6">
      <div className="flex items-start gap-3">
        <Heart className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Salario Justo</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Selecciona tu región para usar tarifas de salario digno recomendadas
          </p>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full px-4 py-2 border border-green-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="oaxaca">Oaxaca</option>
            <option value="chiapas">Chiapas</option>
            <option value="puebla">Puebla</option>
            <option value="michoacan">Michoacán</option>
            <option value="guanajuato">Guanajuato</option>
          </select>
          {fairTradeRates && (
            <div className="mt-4 p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg text-sm space-y-1">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Salario mínimo:</strong> {formatCurrency(fairTradeRates.minimumWage)}/día
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Salario digno:</strong> {formatCurrency(fairTradeRates.livingWage)}/día
              </p>
              <p className="text-green-700 dark:text-green-300 font-semibold">
                <strong>Tarifa recomendada:</strong>{' '}
                {formatCurrency(fairTradeRates.recommendedHourlyRate)}/hora
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
