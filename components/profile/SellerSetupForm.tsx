/**
 * @fileoverview Seller setup form modal for creating or editing shop profiles.
 * Provides a modal form for sellers to enter their shop name, location, and description.
 * Supports both create and edit modes with Zod validation.
 * @module components/profile/SellerSetupForm
 */

'use client';

import { useState } from 'react';
import { z } from 'zod';
import { validate } from '@/validators/utils';
import { AlertCircle, Store, MapPin, FileText } from 'lucide-react';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';

/**
 * Zod schema for validating maker/seller profile data
 */
const makerProfileSchema = z.object({
  shopName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  location: z.string().min(3, 'La ubicación es requerida'),
  description: z.string().min(20, 'Describe tu taller o tienda (mínimo 20 caracteres)').max(300),
});

/** Inferred type from the maker profile schema */
type MakerProfileInput = z.infer<typeof makerProfileSchema>;

/**
 * Props for the SellerSetupForm component
 * @interface SellerSetupFormProps
 */
interface SellerSetupFormProps {
  /** Callback function to close the modal */
  onClose: () => void;
  /** Callback function to save the form data */
  onSave: (data: MakerProfileInput) => Promise<void>;
  /** Optional initial data for editing an existing profile */
  initialData?: {
    shopName?: string;
    location?: string;
    description?: string;
  };
}

/**
 * Modal form component for creating or editing seller/shop profiles.
 * Displays a form with shop name, location, and description fields.
 * Validates input using Zod schema and handles loading states.
 * @param {SellerSetupFormProps} props - Component props
 * @returns {JSX.Element} The seller setup form modal
 */
export default function SellerSetupForm({ onClose, onSave, initialData }: SellerSetupFormProps) {
  const isEditing = Boolean(initialData?.shopName);
  const [formData, setFormData] = useState<MakerProfileInput>({
    shopName: initialData?.shopName || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validate(makerProfileSchema, formData);
    if (!validation.success) {
      setErrors(validation.errors || {});
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors({
        _form: error instanceof Error ? error.message : 'Error al guardar la información',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isEditing ? 'Editar Tienda' : 'Activa tu Tienda'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isEditing
            ? 'Actualiza la información de tu tienda'
            : 'Completa esta información para empezar a vender'}
        </p>

        {errors._form && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{errors._form}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Shop Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nombre de tu tienda o taller
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Store className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base ${
                  errors.shopName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ej: Alebrijes Don Pedro"
              />
            </div>
            {errors.shopName && <p className="mt-1.5 text-sm text-red-600">{errors.shopName}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Ubicación</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ej: Oaxaca, México"
              />
            </div>
            {errors.location && <p className="mt-1.5 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Descripción de tu trabajo
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Cuéntanos sobre tu taller, técnicas y tradiciones..."
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/300 caracteres
            </p>
            {errors.description && (
              <p className="mt-1.5 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Help text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Consejo:</strong> Una buena descripción ayuda a los clientes a conocer tu
              historia y técnicas artesanales.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  Guardando...
                </>
              ) : isEditing ? (
                'Guardar Cambios'
              ) : (
                'Activar Tienda'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
