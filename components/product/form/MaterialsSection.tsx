import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import TextInput from '@/components/common/TextInput';

interface MaterialsSectionProps {
  materials: string[];
  setMaterials: (materials: string[]) => void;
}

export default function MaterialsSection({ materials, setMaterials }: MaterialsSectionProps) {
  const [materialInput, setMaterialInput] = useState('');

  const handleAddMaterial = () => {
    if (materialInput.trim() && !materials.includes(materialInput.trim())) {
      setMaterials([...materials, materialInput.trim()]);
      setMaterialInput('');
    }
  };

  const handleRemoveMaterial = (material: string) => {
    setMaterials(materials.filter((m) => m !== material));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Materiales</h3>
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <TextInput
              type="text"
              value={materialInput}
              onChange={(e) => setMaterialInput(e.target.value)}
              placeholder="Ej: Barro negro"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddMaterial();
                }
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleAddMaterial}
            className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {materials.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {materials.map((material) => (
              <span
                key={material}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
              >
                {material}
                <button
                  type="button"
                  onClick={() => handleRemoveMaterial(material)}
                  className="hover:text-primary-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
