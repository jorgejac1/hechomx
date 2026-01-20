interface ProductionOptionsSectionProps {
  customizable: boolean;
  setCustomizable: (value: boolean) => void;
  productionTime: number;
  setProductionTime: (value: number) => void;
}

export default function ProductionOptionsSection({
  customizable,
  setCustomizable,
  productionTime,
  setProductionTime,
}: ProductionOptionsSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Opciones de Producción</h3>
      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={customizable}
            onChange={(e) => setCustomizable(e.target.checked)}
            className="w-5 h-5 text-primary-600 border-gray-300 rounded-sm focus:ring-primary-500"
          />
          <span className="text-gray-900">Este producto es personalizable</span>
        </label>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Tiempo de producción (días)
          </label>
          <input
            type="number"
            value={productionTime}
            onChange={(e) => setProductionTime(Number(e.target.value))}
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
