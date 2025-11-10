'use client';

import { Users, Target } from 'lucide-react';

interface WorkshopStorySectionProps {
  personalStory: string;
  productionProcess: string;
  dailyLife: string;
  missionStatement: string;
  onUpdate: (field: string, value: string) => void;
}

export default function WorkshopStorySection({
  personalStory,
  productionProcess,
  dailyLife,
  missionStatement,
  onUpdate,
}: WorkshopStorySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Nuestra Historia</h2>
        </div>
        <p className="text-sm text-gray-600">Comparte la historia de tu taller y equipo</p>
      </div>

      {/* Team Story */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nuestra Historia *
          <span className="text-gray-500 font-normal ml-2">(¿Cómo comenzó el taller?)</span>
        </label>
        <textarea
          value={personalStory}
          onChange={(e) => onUpdate('personalStory', e.target.value)}
          rows={6}
          placeholder="Cuenten la historia de su taller: ¿Cómo comenzaron? ¿Quiénes forman el equipo?..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{personalStory.length} caracteres</p>
      </div>

      {/* Production Process */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nuestro Proceso *
          <span className="text-gray-500 font-normal ml-2">(¿Cómo trabajan juntos?)</span>
        </label>
        <textarea
          value={productionProcess}
          onChange={(e) => onUpdate('productionProcess', e.target.value)}
          rows={6}
          placeholder="Describe cómo trabajan en equipo, el proceso de producción, control de calidad..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{productionProcess.length} caracteres</p>
      </div>

      {/* Mission Statement */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nuestra Misión
          <span className="text-gray-500 font-normal ml-2">(¿Qué los impulsa como equipo?)</span>
        </label>
        <textarea
          value={missionStatement}
          onChange={(e) => onUpdate('missionStatement', e.target.value)}
          rows={4}
          placeholder="¿Cuál es la misión de su taller? ¿Qué valores los guían como equipo?..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{missionStatement.length} caracteres</p>
      </div>

      {/* Daily Operations */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Un Día en el Taller
          <span className="text-gray-500 font-normal ml-2">(Rutina del equipo)</span>
        </label>
        <textarea
          value={dailyLife}
          onChange={(e) => onUpdate('dailyLife', e.target.value)}
          rows={5}
          placeholder="Describe un día típico en el taller, cómo se organiza el equipo, el espacio de trabajo..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{dailyLife.length} caracteres</p>
      </div>

      {/* Team tip */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-900 font-semibold">Consejo: Destaquen lo colaborativo</p>
          <p className="text-sm text-blue-800">
            Los clientes valoran el trabajo en equipo. Mencionen cómo cada persona contribuye al
            resultado final.
          </p>
        </div>
      </div>
    </div>
  );
}
