interface DimensionsWeightSectionProps {
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  setDimensions: (dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  }) => void;
  weight: {
    value: number;
    unit: 'kg' | 'lb';
  };
  setWeight: (weight: { value: number; unit: 'kg' | 'lb' }) => void;
}

export default function DimensionsWeightSection({
  dimensions,
  setDimensions,
  weight,
  setWeight,
}: DimensionsWeightSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Dimensiones y Peso</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Dimensiones</label>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                value={dimensions.length}
                onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                placeholder="Largo"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
              />
              <input
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                placeholder="Ancho"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
              />
              <input
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                placeholder="Alto"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
              />
            </div>
            <select
              value={dimensions.unit}
              onChange={(e) =>
                setDimensions({ ...dimensions, unit: e.target.value as 'cm' | 'in' })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="cm">Centímetros (cm)</option>
              <option value="in">Pulgadas (in)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Peso</label>
          <div className="space-y-2">
            <input
              type="number"
              value={weight.value}
              onChange={(e) => setWeight({ ...weight, value: Number(e.target.value) })}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
              step="0.01"
            />
            <select
              value={weight.unit}
              onChange={(e) => setWeight({ ...weight, unit: e.target.value as 'kg' | 'lb' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="kg">Kilogramos (kg)</option>
              <option value="lb">Libras (lb)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
