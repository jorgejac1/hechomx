/**
 * @fileoverview Additional information form section component
 * Provides text areas for care instructions and product story/cultural background.
 * @module components/product/form/AdditionalInfoSection
 */

import Textarea from '@/components/common/Textarea';

/**
 * Props for the AdditionalInfoSection component
 * @interface AdditionalInfoSectionProps
 */
interface AdditionalInfoSectionProps {
  /** Care instructions text */
  careInstructions: string;
  /** Callback to update care instructions */
  setCareInstructions: (value: string) => void;
  /** Product story/background text */
  story: string;
  /** Callback to update story */
  setStory: (value: string) => void;
}

export default function AdditionalInfoSection({
  careInstructions,
  setCareInstructions,
  story,
  setStory,
}: AdditionalInfoSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Información Adicional</h3>
      <div className="space-y-4">
        <Textarea
          label="Instrucciones de Cuidado"
          value={careInstructions}
          onChange={(e) => setCareInstructions(e.target.value)}
          minRows={3}
          placeholder="Ej: Lavar a mano con agua tibia"
        />

        <Textarea
          label="Historia del Producto"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          minRows={4}
          placeholder="Comparte el significado cultural, proceso de creación, o historia detrás de este producto"
        />
      </div>
    </div>
  );
}
