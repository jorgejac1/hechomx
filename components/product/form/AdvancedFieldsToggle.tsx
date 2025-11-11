import { Sparkles } from 'lucide-react';

interface AdvancedFieldsToggleProps {
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
}

export default function AdvancedFieldsToggle({
  showAdvanced,
  setShowAdvanced,
}: AdvancedFieldsToggleProps) {
  return (
    <button
      type="button"
      onClick={() => setShowAdvanced(!showAdvanced)}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium text-gray-700"
    >
      <Sparkles className="w-5 h-5" />
      {showAdvanced ? 'Ocultar' : 'Mostrar'} Opciones Avanzadas
    </button>
  );
}
