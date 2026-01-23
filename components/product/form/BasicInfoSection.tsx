/**
 * @fileoverview Basic information form section component
 * Provides inputs for product name, category, subcategory, and description.
 * Uses autocomplete for category selection with dynamic subcategory filtering.
 * @module components/product/form/BasicInfoSection
 */

import { Package } from 'lucide-react';
import { CATEGORY_OPTIONS, getSubcategoriesByCategory } from '@/lib/constants/categories';
import TextInput from '@/components/common/TextInput';
import Autocomplete from '@/components/common/Autocomplete';
import Textarea from '@/components/common/Textarea';

/**
 * Props for the BasicInfoSection component
 * @interface BasicInfoSectionProps
 */
interface BasicInfoSectionProps {
  /** Product name */
  name: string;
  /** Callback to update product name */
  setName: (value: string) => void;
  /** Selected category */
  category: string;
  /** Callback to update category */
  setCategory: (value: string) => void;
  /** Selected subcategory */
  subcategory: string;
  /** Callback to update subcategory */
  setSubcategory: (value: string) => void;
  /** Product description */
  description: string;
  /** Callback to update description */
  setDescription: (value: string) => void;
}

export default function BasicInfoSection({
  name,
  setName,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  description,
  setDescription,
}: BasicInfoSectionProps) {
  const subcategories = category ? getSubcategoriesByCategory(category) : [];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Package className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-bold text-gray-900">Información Básica</h2>
        <span className="text-sm text-red-600">*Obligatorio</span>
      </div>

      <div className="space-y-4">
        {/* Product Name */}
        <TextInput
          label="Nombre del Producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Jarrón de Talavera Azul"
          required
        />

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Autocomplete
            label="Categoría"
            value={category || null}
            onChange={(val) => {
              setCategory((val as string) || '');
              setSubcategory('');
            }}
            options={CATEGORY_OPTIONS.map((cat) => ({
              value: cat.name,
              label: cat.name,
            }))}
            placeholder="Buscar categoría..."
            required
          />

          <Autocomplete
            label="Subcategoría"
            value={subcategory || null}
            onChange={(val) => setSubcategory((val as string) || '')}
            disabled={!category}
            options={subcategories.map((sub) => ({
              value: sub,
              label: sub,
            }))}
            placeholder="Buscar subcategoría..."
          />
        </div>

        {/* Description */}
        <Textarea
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={5}
          placeholder="Describe tu producto: materiales, proceso, tamaño, etc."
          showCharCount
          required
        />
      </div>
    </div>
  );
}
