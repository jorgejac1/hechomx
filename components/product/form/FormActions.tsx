import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

interface FormActionsProps {
  isSubmitting: boolean;
  hasImages: boolean;
  submitLabel: string;
}

export default function FormActions({ isSubmitting, hasImages, submitLabel }: FormActionsProps) {
  const router = useRouter();

  return (
    <>
      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !hasImages}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Publicando...' : submitLabel}
        </button>
      </div>

      {/* Validation Warning */}
      {!hasImages && (
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900">Imagen requerida</p>
            <p className="text-sm text-yellow-800">
              Debes agregar al menos 1 imagen antes de publicar el producto
            </p>
          </div>
        </div>
      )}
    </>
  );
}
