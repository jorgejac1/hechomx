'use client';

import { Building2, Leaf } from 'lucide-react';

interface CompanyStorySectionProps {
  personalStory: string;
  productionProcess: string;
  missionStatement: string;
  sustainabilityPractices: string[];
  onUpdate: (field: string, value: string) => void;
  onUpdateArray: (field: string, value: string[]) => void;
}

export default function CompanyStorySection({
  personalStory,
  productionProcess,
  missionStatement,
  sustainabilityPractices,
  onUpdate,
  onUpdateArray,
}: CompanyStorySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-5 h-5 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-900">Acerca de la Empresa</h2>
        </div>
        <p className="text-sm text-gray-600">Historia, misión y valores de tu empresa</p>
      </div>

      {/* Company History */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Historia de la Empresa *
          <span className="text-gray-500 font-normal ml-2">(¿Cómo comenzó la empresa?)</span>
        </label>
        <textarea
          value={personalStory}
          onChange={(e) => onUpdate('personalStory', e.target.value)}
          rows={6}
          placeholder="Cuenten la historia de su empresa: ¿Cómo comenzó? ¿Qué problema buscaban resolver? ¿Cómo han crecido?..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{personalStory.length} caracteres</p>
      </div>

      {/* Mission & Values */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Misión y Valores *
          <span className="text-gray-500 font-normal ml-2">(¿Qué los impulsa?)</span>
        </label>
        <textarea
          value={missionStatement}
          onChange={(e) => onUpdate('missionStatement', e.target.value)}
          rows={5}
          placeholder="¿Cuál es la misión de su empresa? ¿Qué valores los guían? ¿Qué los hace diferentes?..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{missionStatement.length} caracteres</p>
      </div>

      {/* Production Process */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Proceso de Producción
          <span className="text-gray-500 font-normal ml-2">(¿Cómo elaboran sus productos?)</span>
        </label>
        <textarea
          value={productionProcess}
          onChange={(e) => onUpdate('productionProcess', e.target.value)}
          rows={6}
          placeholder="Describe el proceso de producción, control de calidad, tecnología utilizada, certificaciones..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{productionProcess.length} caracteres</p>
      </div>

      {/* Sustainability Practices */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Prácticas Sustentables
          <span className="text-gray-500 font-normal ml-2">(Una por línea)</span>
        </label>
        <textarea
          value={sustainabilityPractices.join('\n')}
          onChange={(e) =>
            onUpdateArray(
              'sustainabilityPractices',
              e.target.value.split('\n').filter((line) => line.trim())
            )
          }
          rows={5}
          placeholder="Uso de materiales reciclados&#10;Energía solar en producción&#10;Empaques biodegradables&#10;Programa de reciclaje&#10;Reducción de huella de carbono"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">Escribe cada práctica en una línea nueva</p>
      </div>

      {/* Sustainability tip */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
        <Leaf className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-green-900 font-semibold">Sustentabilidad importa</p>
          <p className="text-sm text-green-800">
            Los consumidores valoran empresas comprometidas con el medio ambiente y responsabilidad
            social.
          </p>
        </div>
      </div>
    </div>
  );
}
