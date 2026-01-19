import { useRouter } from 'next/navigation';
import { AlertCircle, Save, Send } from 'lucide-react';

interface FormActionsProps {
  isSubmitting: boolean;
  isSavingDraft?: boolean;
  hasImages: boolean;
  submitLabel: string;
  onSaveDraft?: () => void;
  showDraftButton?: boolean;
  currentStatus?: 'draft' | 'published';
}

export default function FormActions({
  isSubmitting,
  isSavingDraft = false,
  hasImages,
  submitLabel,
  onSaveDraft,
  showDraftButton = true,
  currentStatus,
}: FormActionsProps) {
  const router = useRouter();
  const isProcessing = isSubmitting || isSavingDraft;

  return (
    <>
      {/* Status Indicator */}
      {currentStatus && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-600">Estado actual:</span>
          {currentStatus === 'draft' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Borrador
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Publicado
            </span>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Cancel Button */}
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isProcessing}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>

        {/* Save Draft Button */}
        {showDraftButton && onSaveDraft && (
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isProcessing || !hasImages}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {isSavingDraft ? 'Guardando...' : 'Guardar Borrador'}
          </button>
        )}

        {/* Publish Button */}
        <button
          type="submit"
          disabled={isProcessing || !hasImages}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? 'Publicando...' : submitLabel}
        </button>
      </div>

      {/* Validation Warning */}
      {!hasImages && (
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg mt-4">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900">Imagen requerida</p>
            <p className="text-sm text-yellow-800">
              Debes agregar al menos 1 imagen antes de guardar o publicar el producto
            </p>
          </div>
        </div>
      )}

      {/* Draft Info */}
      {showDraftButton && (
        <p className="text-sm text-gray-500 text-center mt-3">
          Los borradores solo son visibles para ti. Publícalos cuando estén listos.
        </p>
      )}
    </>
  );
}
