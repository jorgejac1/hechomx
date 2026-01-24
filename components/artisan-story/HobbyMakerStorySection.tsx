'use client';

import { Heart, Lightbulb } from 'lucide-react';

interface HobbyMakerStorySectionProps {
  personalStory: string;
  productionProcess: string;
  dailyLife: string;
  onUpdate: (field: string, value: string) => void;
}

export default function HobbyMakerStorySection({
  personalStory,
  productionProcess,
  dailyLife,
  onUpdate,
}: HobbyMakerStorySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sobre Mí</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Comparte un poco sobre ti y por qué haces lo que haces
        </p>
      </div>

      {/* Personal Story */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Tu Historia *
          <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
            (¿Cómo empezaste? ¿Por qué lo haces?)
          </span>
        </label>
        <textarea
          value={personalStory}
          onChange={(e) => onUpdate('personalStory', e.target.value)}
          rows={5}
          placeholder="Cuéntanos tu historia: ¿Cómo empezaste a hacer esto? ¿Qué te inspiró? Mantén un tono casual y amigable..."
          maxLength={500}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none dark:bg-gray-800 dark:text-gray-100"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {personalStory.length}/500 caracteres
        </p>
      </div>

      {/* What I Make */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Qué Hago
          <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
            (Describe brevemente tus productos)
          </span>
        </label>
        <textarea
          value={productionProcess}
          onChange={(e) => onUpdate('productionProcess', e.target.value)}
          rows={4}
          placeholder="Describe qué productos haces, materiales que usas, cuánto tiempo toma cada pieza..."
          maxLength={300}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none dark:bg-gray-800 dark:text-gray-100"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {productionProcess.length}/300 caracteres
        </p>
      </div>

      {/* Daily Life (Optional) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Un Poco Más (Opcional)
          <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
            (Cuándo trabajas en esto, tu espacio, etc.)
          </span>
        </label>
        <textarea
          value={dailyLife}
          onChange={(e) => onUpdate('dailyLife', e.target.value)}
          rows={3}
          placeholder="Comparto más sobre cuándo y dónde hago mis productos, mi espacio de trabajo..."
          maxLength={250}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none dark:bg-gray-800 dark:text-gray-100"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {dailyLife.length}/250 caracteres
        </p>
      </div>

      {/* Friendly tip */}
      <div className="p-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-purple-900 dark:text-purple-100 font-semibold">
            Consejo: Sé auténtico
          </p>
          <p className="text-sm text-purple-800 dark:text-purple-200">
            Los clientes se conectan con historias reales. No te preocupes por sonar profesional,
            solo sé tú mismo.
          </p>
        </div>
      </div>
    </div>
  );
}
