interface AdditionalInfoSectionProps {
  careInstructions: string;
  setCareInstructions: (value: string) => void;
  story: string;
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
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Instrucciones de Cuidado
          </label>
          <textarea
            value={careInstructions}
            onChange={(e) => setCareInstructions(e.target.value)}
            rows={3}
            placeholder="Ej: Lavar a mano con agua tibia"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Historia del Producto
          </label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={4}
            placeholder="Comparte el significado cultural, proceso de creación, o historia detrás de este producto"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
          />
        </div>
      </div>
    </div>
  );
}
