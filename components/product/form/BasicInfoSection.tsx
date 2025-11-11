import { Package } from 'lucide-react';
import { CATEGORY_OPTIONS, getSubcategoriesByCategory } from '@/lib/constants/categories';

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
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Nombre del Producto *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Jarrón de Talavera Azul"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Categoría *</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="">Seleccionar categoría</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Subcategoría</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={!category}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">Seleccionar subcategoría</option>
              {subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Descripción *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Describe tu producto: materiales, proceso, tamaño, etc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">{description.length} caracteres</p>
        </div>
      </div>
    </div>
  );
}
