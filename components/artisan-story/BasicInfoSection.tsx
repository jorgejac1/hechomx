'use client';

import { Globe } from 'lucide-react';
import { SellerType, CraftCategory, CRAFT_CATEGORIES } from '@/lib/types/seller-types';

interface BasicInfoSectionProps {
  sellerType: SellerType;
  craftCategory?: CraftCategory;
  specialty: string;
  yearsOfExperience: number;
  generationsOfCraft?: number;
  apprentices?: number;
  teamSize?: number;
  foundingYear?: number;
  city: string;
  state: string;
  region?: string;
  onUpdate: (field: string, value: string | number) => void;
}

export default function BasicInfoSection({
  sellerType,
  craftCategory,
  specialty,
  yearsOfExperience,
  generationsOfCraft,
  apprentices,
  teamSize,
  foundingYear,
  city,
  state,
  region,
  onUpdate,
}: BasicInfoSectionProps) {
  const getSpecialtyPlaceholder = () => {
    if (sellerType === 'hobby_maker' && craftCategory) {
      return `Ej: ${CRAFT_CATEGORIES[craftCategory].examples.split(',')[0].trim()}`;
    }
    if (sellerType === 'artisan_individual' && craftCategory) {
      return `Ej: ${CRAFT_CATEGORIES[craftCategory].examples.split(',')[0].trim()}`;
    }
    return 'Ej: Productos Mexicanos';
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-bold text-gray-900">Información Básica</h2>
        </div>
        <p className="text-sm text-gray-600">Esta información aparecerá en tu perfil público</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Specialty */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Especialidad *</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => onUpdate('specialty', e.target.value)}
            placeholder={getSpecialtyPlaceholder()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Años de Experiencia *
          </label>
          <input
            type="number"
            value={yearsOfExperience}
            onChange={(e) => onUpdate('yearsOfExperience', parseInt(e.target.value) || 0)}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Generations - Only for artisans */}
        {sellerType === 'artisan_individual' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Generaciones de Artesanos *
            </label>
            <input
              type="number"
              value={generationsOfCraft || 1}
              onChange={(e) => onUpdate('generationsOfCraft', parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        )}

        {/* Apprentices - Only for artisans */}
        {sellerType === 'artisan_individual' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Aprendices</label>
            <input
              type="number"
              value={apprentices || 0}
              onChange={(e) => onUpdate('apprentices', parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        )}

        {/* Team Size - For workshop and company */}
        {(sellerType === 'workshop' || sellerType === 'company') && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tamaño del Equipo *
            </label>
            <input
              type="number"
              value={teamSize || 0}
              onChange={(e) => onUpdate('teamSize', parseInt(e.target.value) || 0)}
              min="1"
              placeholder={sellerType === 'workshop' ? '2-10 personas' : '10+ personas'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        )}

        {/* Founding Year - Only for companies */}
        {sellerType === 'company' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Año de Fundación
            </label>
            <input
              type="number"
              value={foundingYear || new Date().getFullYear()}
              onChange={(e) =>
                onUpdate('foundingYear', parseInt(e.target.value) || new Date().getFullYear())
              }
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        )}
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad *</label>
          <input
            type="text"
            value={city}
            onChange={(e) => onUpdate('city', e.target.value)}
            placeholder="Ej: Teotitlán del Valle"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Estado *</label>
          <input
            type="text"
            value={state}
            onChange={(e) => onUpdate('state', e.target.value)}
            placeholder="Ej: Oaxaca"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Región (Opcional)
          </label>
          <input
            type="text"
            value={region || ''}
            onChange={(e) => onUpdate('region', e.target.value)}
            placeholder="Ej: Valles Centrales"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
}
