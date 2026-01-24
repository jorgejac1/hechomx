/**
 * @fileoverview Basic information section for artisan story form.
 * Captures specialty, experience, location, and type-specific fields.
 * Adapts fields shown based on seller type (hobby maker, artisan, workshop, company).
 * @module components/artisan-story/BasicInfoSection
 */

'use client';

import { Globe } from 'lucide-react';
import { SellerType, CraftCategory, CRAFT_CATEGORIES } from '@/lib/types/seller-types';
import TextInput from '@/components/common/TextInput';

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
          <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Información Básica</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Esta información aparecerá en tu perfil público
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Specialty */}
        <TextInput
          label="Especialidad"
          value={specialty}
          onChange={(e) => onUpdate('specialty', e.target.value)}
          placeholder={getSpecialtyPlaceholder()}
          required
        />

        {/* Years of Experience */}
        <TextInput
          type="number"
          label="Años de Experiencia"
          value={yearsOfExperience}
          onChange={(e) => onUpdate('yearsOfExperience', parseInt(e.target.value) || 0)}
          min={0}
          required
        />

        {/* Generations - Only for artisans */}
        {sellerType === 'artisan_individual' && (
          <TextInput
            type="number"
            label="Generaciones de Artesanos"
            value={generationsOfCraft || 1}
            onChange={(e) => onUpdate('generationsOfCraft', parseInt(e.target.value) || 1)}
            min={1}
            required
          />
        )}

        {/* Apprentices - Only for artisans */}
        {sellerType === 'artisan_individual' && (
          <TextInput
            type="number"
            label="Aprendices"
            value={apprentices || 0}
            onChange={(e) => onUpdate('apprentices', parseInt(e.target.value) || 0)}
            min={0}
          />
        )}

        {/* Team Size - For workshop and company */}
        {(sellerType === 'workshop' || sellerType === 'company') && (
          <TextInput
            type="number"
            label="Tamaño del Equipo"
            value={teamSize || 0}
            onChange={(e) => onUpdate('teamSize', parseInt(e.target.value) || 0)}
            min={1}
            placeholder={sellerType === 'workshop' ? '2-10 personas' : '10+ personas'}
            required
          />
        )}

        {/* Founding Year - Only for companies */}
        {sellerType === 'company' && (
          <TextInput
            type="number"
            label="Año de Fundación"
            value={foundingYear || new Date().getFullYear()}
            onChange={(e) =>
              onUpdate('foundingYear', parseInt(e.target.value) || new Date().getFullYear())
            }
            min={1900}
            max={new Date().getFullYear()}
          />
        )}
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="Ciudad"
          value={city}
          onChange={(e) => onUpdate('city', e.target.value)}
          placeholder="Ej: Teotitlán del Valle"
          required
        />

        <TextInput
          label="Estado"
          value={state}
          onChange={(e) => onUpdate('state', e.target.value)}
          placeholder="Ej: Oaxaca"
          required
        />

        <div className="sm:col-span-2">
          <TextInput
            label="Región (Opcional)"
            value={region || ''}
            onChange={(e) => onUpdate('region', e.target.value)}
            placeholder="Ej: Valles Centrales"
          />
        </div>
      </div>
    </div>
  );
}
