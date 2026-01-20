'use client';

import { BookOpen, Plus, Globe } from 'lucide-react';
import { IndigenousConnection, CraftCategory, CRAFT_CATEGORIES } from '@/lib/types/seller-types';

interface ArtisanStorySectionProps {
  craftCategory?: CraftCategory;
  indigenousConnection: IndigenousConnection;
  personalStory: string;
  heritageStory: string;
  craftTechnique: string;
  dailyLife: string;
  culturalSignificance: string;
  traditionalTechniques: string[];
  indigenousLanguageTerms: Array<{
    term: string;
    meaning: string;
    language: string;
  }>;
  onUpdate: (field: string, value: string) => void;
  onUpdateArray: (field: string, value: string[]) => void;
  onUpdateTerms: (terms: Array<{ term: string; meaning: string; language: string }>) => void;
}

export default function ArtisanStorySection({
  craftCategory,
  indigenousConnection,
  personalStory,
  heritageStory,
  craftTechnique,
  dailyLife,
  culturalSignificance,
  traditionalTechniques,
  indigenousLanguageTerms,
  onUpdate,
  onUpdateArray,
  onUpdateTerms,
}: ArtisanStorySectionProps) {
  const addIndigenousTerm = () => {
    onUpdateTerms([...indigenousLanguageTerms, { term: '', meaning: '', language: '' }]);
  };

  const updateIndigenousTerm = (
    index: number,
    field: 'term' | 'meaning' | 'language',
    value: string
  ) => {
    const newTerms = [...indigenousLanguageTerms];
    newTerms[index] = { ...newTerms[index], [field]: value };
    onUpdateTerms(newTerms);
  };

  const removeIndigenousTerm = (index: number) => {
    onUpdateTerms(indigenousLanguageTerms.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-bold text-gray-900">Mi Historia Artesanal</h2>
        </div>
        <p className="text-sm text-gray-600">
          Comparte tu historia, herencia y proceso creativo con el mundo
        </p>
      </div>

      {/* Personal Story */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tu Historia Personal *
          <span className="text-gray-500 font-normal ml-2">
            (¿Cómo comenzaste? ¿Qué te inspiró?)
          </span>
        </label>
        <textarea
          value={personalStory}
          onChange={(e) => onUpdate('personalStory', e.target.value)}
          rows={6}
          placeholder="Cuéntanos tu historia: ¿Cómo aprendiste este oficio? ¿Qué te inspiró a dedicarte a este arte?..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{personalStory.length} caracteres</p>
      </div>

      {/* Heritage Story */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Historia de tu Herencia
          <span className="text-gray-500 font-normal ml-2">(Tu familia, tradición, ancestros)</span>
        </label>
        <textarea
          value={heritageStory}
          onChange={(e) => onUpdate('heritageStory', e.target.value)}
          rows={6}
          placeholder="Comparte la historia de tu familia, las generaciones previas, cómo se ha transmitido este conocimiento..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{heritageStory.length} caracteres</p>
      </div>

      {/* Craft Technique */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Técnica y Proceso *
          <span className="text-gray-500 font-normal ml-2">(¿Cómo creas tus piezas?)</span>
        </label>
        <textarea
          value={craftTechnique}
          onChange={(e) => onUpdate('craftTechnique', e.target.value)}
          rows={6}
          placeholder={
            craftCategory
              ? `Describe tu proceso creativo de ${CRAFT_CATEGORIES[craftCategory].label.toLowerCase()}, materiales que usas, técnicas tradicionales, tiempo que tomas...`
              : 'Describe tu proceso creativo, materiales que usas, técnicas tradicionales, tiempo que tomas...'
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{craftTechnique.length} caracteres</p>
      </div>

      {/* Daily Life */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tu Vida Diaria
          <span className="text-gray-500 font-normal ml-2">(Un día típico en tu taller)</span>
        </label>
        <textarea
          value={dailyLife}
          onChange={(e) => onUpdate('dailyLife', e.target.value)}
          rows={5}
          placeholder="Describe un día típico en tu vida como artesano, tu rutina, tu espacio de trabajo..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{dailyLife.length} caracteres</p>
      </div>

      {/* Cultural Significance - Only for native/descendant */}
      {(indigenousConnection === 'native' || indigenousConnection === 'descendant') && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Significado Cultural
            <span className="text-gray-500 font-normal ml-2">
              (¿Por qué es importante tu arte?)
            </span>
          </label>
          <textarea
            value={culturalSignificance}
            onChange={(e) => onUpdate('culturalSignificance', e.target.value)}
            rows={5}
            placeholder="Explica el significado cultural y la importancia de tu artesanía para tu comunidad y cultura..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">{culturalSignificance.length} caracteres</p>
        </div>
      )}

      {/* Traditional Techniques */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Técnicas Tradicionales
          <span className="text-gray-500 font-normal ml-2">(Una por línea)</span>
        </label>
        <textarea
          value={traditionalTechniques.join('\n')}
          onChange={(e) =>
            onUpdateArray(
              'traditionalTechniques',
              e.target.value.split('\n').filter((line) => line.trim())
            )
          }
          rows={5}
          placeholder="Teñido con cochinilla grana&#10;Tejido en telar de pedal&#10;Hilado a mano de lana virgen&#10;Diseños geométricos tradicionales"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">💡 Escribe cada técnica en una línea nueva</p>
      </div>

      {/* Indigenous Language Terms - Only if native */}
      {indigenousConnection === 'native' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-700">
              Términos en Lengua Indígena
              <span className="text-gray-500 font-normal ml-2">
                (Palabras importantes en tu lengua)
              </span>
            </label>
            <button
              type="button"
              onClick={addIndigenousTerm}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>

          {indigenousLanguageTerms.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Globe className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No hay términos agregados</p>
              <p className="text-xs text-gray-500 mt-1">
                Agrega palabras importantes de tu lengua indígena
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {indigenousLanguageTerms.map((term, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={term.term}
                      onChange={(e) => updateIndigenousTerm(idx, 'term', e.target.value)}
                      placeholder="Término (ej: Didxa')"
                      className="px-3 py-2 text-sm border border-green-300 rounded-sm focus:ring-2 focus:ring-green-500 bg-white"
                    />
                    <input
                      type="text"
                      value={term.language}
                      onChange={(e) => updateIndigenousTerm(idx, 'language', e.target.value)}
                      placeholder="Lengua (ej: Zapoteco)"
                      className="px-3 py-2 text-sm border border-green-300 rounded-sm focus:ring-2 focus:ring-green-500 bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={term.meaning}
                      onChange={(e) => updateIndigenousTerm(idx, 'meaning', e.target.value)}
                      placeholder="Significado (ej: Palabra o lengua)"
                      className="flex-1 px-3 py-2 text-sm border border-green-300 rounded-sm focus:ring-2 focus:ring-green-500 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeIndigenousTerm(idx)}
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-sm transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500 mt-2">
            💡 Ejemplos: Didxa' (Palabra/lengua), Guenda' (Vida), Xhoba (Telar) en Zapoteco
          </p>
        </div>
      )}
    </div>
  );
}
