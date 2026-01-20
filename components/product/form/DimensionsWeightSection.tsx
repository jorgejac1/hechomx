import TextInput from '@/components/common/TextInput';
import Select from '@/components/common/Select';

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
              <TextInput
                type="number"
                value={dimensions.length}
                onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                placeholder="Largo"
                size="sm"
                min={0}
              />
              <TextInput
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                placeholder="Ancho"
                size="sm"
                min={0}
              />
              <TextInput
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                placeholder="Alto"
                size="sm"
                min={0}
              />
            </div>
            <Select
              value={dimensions.unit}
              onChange={(e) =>
                setDimensions({ ...dimensions, unit: e.target.value as 'cm' | 'in' })
              }
              size="sm"
              options={[
                { value: 'cm', label: 'Centímetros (cm)' },
                { value: 'in', label: 'Pulgadas (in)' },
              ]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Peso</label>
          <div className="space-y-2">
            <TextInput
              type="number"
              value={weight.value}
              onChange={(e) => setWeight({ ...weight, value: Number(e.target.value) })}
              placeholder="0"
              min={0}
              step={0.01}
            />
            <Select
              value={weight.unit}
              onChange={(e) => setWeight({ ...weight, unit: e.target.value as 'kg' | 'lb' })}
              size="sm"
              options={[
                { value: 'kg', label: 'Kilogramos (kg)' },
                { value: 'lb', label: 'Libras (lb)' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
