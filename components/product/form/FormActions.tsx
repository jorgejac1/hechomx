/**
 * @fileoverview Form action buttons component
 * Renders cancel, save draft, and publish buttons for the product form.
 * Includes validation warnings and status indicators.
 * @module components/product/form/FormActions
 */

import { useRouter } from 'next/navigation';
import { AlertCircle, Save, Send } from 'lucide-react';

/**
 * Props for the FormActions component
 * @interface FormActionsProps
 */
interface FormActionsProps {
  /** Whether the form is currently being submitted */
  isSubmitting: boolean;
  /** Whether a draft is being saved */
  isSavingDraft?: boolean;
  /** Whether at least one image has been added */
  hasImages: boolean;
  /** Label text for the submit/publish button */
  submitLabel: string;
  /** Callback function for saving as draft */
  onSaveDraft?: () => void;
  /** Whether to show the save draft button */
  showDraftButton?: boolean;
  /** Current publication status of the product */
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
          <span className="text-sm text-gray-600 dark:text-gray-400">Estado actual:</span>
          {currentStatus === 'draft' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Borrador
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm font-medium rounded-full">
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
          className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>

        {/* Save Draft Button */}
        {showDraftButton && onSaveDraft && (
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isProcessing || !hasImages}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition font-semibold disabled:border-gray-300 dark:disabled:border-gray-600 disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {isSavingDraft ? 'Guardando...' : 'Guardar Borrador'}
          </button>
        )}

        {/* Publish Button */}
        <button
          type="submit"
          disabled={isProcessing || !hasImages}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? 'Publicando...' : submitLabel}
        </button>
      </div>

      {/* Validation Warning */}
      {!hasImages && (
        <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg mt-4">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900 dark:text-yellow-300">Imagen requerida</p>
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              Debes agregar al menos 1 imagen antes de guardar o publicar el producto
            </p>
          </div>
        </div>
      )}

      {/* Draft Info */}
      {showDraftButton && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
          Los borradores solo son visibles para ti. Publícalos cuando estén listos.
        </p>
      )}
    </>
  );
}
