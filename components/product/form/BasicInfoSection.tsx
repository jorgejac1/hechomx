import { Package } from 'lucide-react';
import { CATEGORY_OPTIONS, getSubcategoriesByCategory } from '@/lib/constants/categories';
import TextInput from '@/components/common/TextInput';
import Select from '@/components/common/Select';
import Textarea from '@/components/common/Textarea';

interface BasicInfoSectionProps {
  name: string;
  setName: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  subcategory: string;
  setSubcategory: (value: string) => void;
  description: string;
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
          <Select
            label="Categoría"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory('');
            }}
            options={CATEGORY_OPTIONS.map((cat) => ({
              value: cat.name,
              label: cat.name,
            }))}
            placeholder="Seleccionar categoría"
            required
          />

          <Select
            label="Subcategoría"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={!category}
            options={subcategories.map((sub) => ({
              value: sub,
              label: sub,
            }))}
            placeholder="Seleccionar subcategoría"
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
