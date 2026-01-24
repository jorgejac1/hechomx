'use client';

import { Globe, Sprout, Leaf, BookOpen, Star, Home, Palette, Users, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SellerType, CraftCategory, IndigenousConnection } from '@/lib/types/seller-types';
import { SELLER_TYPE_CONFIG, CRAFT_CATEGORIES } from '@/lib/types/seller-types';

const SELLER_ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Palette,
  Users,
  Building2,
};

interface StoryFormSelectorProps {
  sellerType: SellerType;
  craftCategory?: CraftCategory;
  indigenousConnection?: IndigenousConnection;
  onSellerTypeChange: (type: SellerType) => void;
  onCategoryChange: (category: CraftCategory) => void;
  onConnectionChange: (connection: IndigenousConnection) => void;
}

export default function StoryFormSelector({
  sellerType,
  craftCategory,
  indigenousConnection,
  onSellerTypeChange,
  onCategoryChange,
  onConnectionChange,
}: StoryFormSelectorProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Tipo de Vendedor</h2>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Selecciona el tipo de negocio para personalizar tu historia
      </p>

      {/* Seller Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          ¿Qué tipo de vendedor eres? *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(SELLER_TYPE_CONFIG).map(([key, config]) => {
            const Icon = SELLER_ICON_MAP[config.icon];
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSellerTypeChange(key as SellerType)}
                className={`p-4 border-2 rounded-lg text-left transition ${
                  sellerType === key
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500'
                }`}
              >
                <div className="mb-2">
                  {Icon && <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />}
                </div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">
                  {config.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{config.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Craft Category - For artisans and hobby makers */}
      {(sellerType === 'artisan_individual' || sellerType === 'hobby_maker') && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            ¿Qué tipo de productos haces? *
          </label>
          <select
            value={craftCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value as CraftCategory)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Selecciona una categoría</option>
            {Object.entries(CRAFT_CATEGORIES).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label} - {value.examples}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Indigenous Heritage - Only for artisans */}
      {sellerType === 'artisan_individual' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Herencia Indígena (Opcional)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(
              [
                {
                  value: 'native',
                  icon: Leaf,
                  label: 'Artesano Nativo',
                  desc: 'Hablo lengua indígena',
                },
                {
                  value: 'descendant',
                  icon: Sprout,
                  label: 'Descendiente',
                  desc: 'Descendiente indígena',
                },
                {
                  value: 'learned',
                  icon: BookOpen,
                  label: 'Técnicas Aprendidas',
                  desc: 'Aprendí técnicas tradicionales',
                },
                { value: 'none', icon: Star, label: 'Otra Conexión', desc: 'No aplica' },
              ] as { value: string; icon: LucideIcon; label: string; desc: string }[]
            ).map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onConnectionChange(option.value as IndigenousConnection)}
                  className={`p-3 border-2 rounded-lg text-left transition ${
                    indigenousConnection === option.value
                      ? 'border-green-600 bg-green-50 dark:bg-green-900/30'
                      : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Icon className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{option.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
