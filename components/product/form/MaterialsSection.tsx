/**
 * @fileoverview Materials selection form section component
 * Allows users to add product materials from common Mexican craft materials
 * or create custom materials. Displays selected materials as removable tags.
 * @module components/product/form/MaterialsSection
 */

import Autocomplete from '@/components/common/Autocomplete';

/**
 * Props for the MaterialsSection component
 * @interface MaterialsSectionProps
 */
interface MaterialsSectionProps {
  /** Array of selected materials */
  materials: string[];
  /** Callback to update materials array */
  setMaterials: (materials: string[]) => void;
}

// Common Mexican craft materials for suggestions
const COMMON_MATERIALS = [
  'Barro negro',
  'Barro rojo',
  'Cerámica',
  'Talavera',
  'Madera',
  'Madera de copal',
  'Madera de pino',
  'Algodón',
  'Lana',
  'Seda',
  'Henequén',
  'Palma',
  'Mimbre',
  'Vidrio soplado',
  'Plata',
  'Alpaca',
  'Cobre',
  'Latón',
  'Cuero',
  'Ixtle',
  'Obsidiana',
  'Ónix',
  'Jade',
  'Ámbar',
  'Papel amate',
  'Papel picado',
  'Hojalata',
  'Cera de abeja',
];

export default function MaterialsSection({ materials, setMaterials }: MaterialsSectionProps) {
  const handleAddMaterial = (newMaterial: string) => {
    if (newMaterial && !materials.includes(newMaterial)) {
      setMaterials([...materials, newMaterial]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Materiales</h3>
      <div className="space-y-4">
        <Autocomplete
          options={COMMON_MATERIALS.filter((m) => !materials.includes(m)).map((m) => ({
            value: m,
            label: m,
          }))}
          value={null}
          onChange={(val) => {
            if (val) {
              handleAddMaterial(val as string);
            }
          }}
          placeholder="Buscar o crear material..."
          creatable
          onCreate={handleAddMaterial}
          createLabel={(query) => `Agregar "${query}"`}
          multiple
          helperText="Escribe para buscar materiales comunes o crear uno nuevo"
        />

        {materials.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {materials.map((material) => (
              <span
                key={material}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm"
              >
                {material}
                <button
                  type="button"
                  onClick={() => setMaterials(materials.filter((m) => m !== material))}
                  className="hover:text-primary-900 dark:hover:text-primary-100"
                  aria-label={`Eliminar ${material}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
