/**
 * @fileoverview Tags selection form section component
 * Allows users to add product tags from popular Mexican artisan product tags
 * or create custom tags. Displays selected tags as removable hashtag badges.
 * @module components/product/form/TagsSection
 */

import Autocomplete from '@/components/common/Autocomplete';

/**
 * Props for the TagsSection component
 * @interface TagsSectionProps
 */
interface TagsSectionProps {
  /** Array of selected tags */
  tags: string[];
  /** Callback to update tags array */
  setTags: (tags: string[]) => void;
}

// Popular tags for Mexican artisan products
const POPULAR_TAGS = [
  'hecho a mano',
  'artesanal',
  'tradicional',
  'único',
  'mexicano',
  'oaxaqueño',
  'chiapaneco',
  'decoración',
  'regalo',
  'coleccionable',
  'vintage',
  'rústico',
  'moderno',
  'bohemio',
  'ecológico',
  'sustentable',
  'reciclado',
  'personalizable',
  'edición limitada',
  'navideño',
  'día de muertos',
  'fiesta',
  'cocina',
  'hogar',
  'joyería',
  'moda',
  'textil',
];

export default function TagsSection({ tags, setTags }: TagsSectionProps) {
  const handleAddTag = (newTag: string) => {
    const normalizedTag = newTag.toLowerCase().trim();
    if (normalizedTag && !tags.includes(normalizedTag)) {
      setTags([...tags, normalizedTag]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Etiquetas</h3>
      <div className="space-y-4">
        <Autocomplete
          options={POPULAR_TAGS.filter((t) => !tags.includes(t)).map((t) => ({
            value: t,
            label: t,
          }))}
          value={null}
          onChange={(val) => {
            if (val) {
              handleAddTag(val as string);
            }
          }}
          placeholder="Buscar o crear etiqueta..."
          creatable
          onCreate={handleAddTag}
          createLabel={(query) => `Crear etiqueta "${query}"`}
          multiple
          helperText="Las etiquetas ayudan a los compradores a encontrar tu producto"
        />

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  className="hover:text-gray-900 dark:hover:text-gray-100"
                  aria-label={`Eliminar etiqueta ${tag}`}
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
