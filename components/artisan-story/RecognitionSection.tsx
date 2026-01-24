'use client';

import { Award, Plus, X, Shield } from 'lucide-react';
import { SellerType } from '@/lib/types/seller-types';

interface RecognitionSectionProps {
  sellerType: SellerType;
  awards: Array<{
    title: string;
    year: number;
    organization: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  communityProjects: string[];
  onUpdateAwards: (awards: Array<{ title: string; year: number; organization: string }>) => void;
  onUpdateCertifications: (
    certifications: Array<{ name: string; issuer: string; date: string }>
  ) => void;
  onUpdateProjects: (projects: string[]) => void;
}

export default function RecognitionSection({
  sellerType,
  awards,
  certifications,
  communityProjects,
  onUpdateAwards,
  onUpdateCertifications,
  onUpdateProjects,
}: RecognitionSectionProps) {
  const addAward = () => {
    onUpdateAwards([...awards, { title: '', year: new Date().getFullYear(), organization: '' }]);
  };

  const updateAward = (
    index: number,
    field: 'title' | 'year' | 'organization',
    value: string | number
  ) => {
    const newAwards = [...awards];
    newAwards[index] = { ...newAwards[index], [field]: value };
    onUpdateAwards(newAwards);
  };

  const removeAward = (index: number) => {
    onUpdateAwards(awards.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    onUpdateCertifications([...certifications, { name: '', issuer: '', date: '' }]);
  };

  const updateCertification = (index: number, field: 'name' | 'issuer' | 'date', value: string) => {
    const newCertifications = [...certifications];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    onUpdateCertifications(newCertifications);
  };

  const removeCertification = (index: number) => {
    onUpdateCertifications(certifications.filter((_, i) => i !== index));
  };

  // Hobby makers don't need this section
  if (sellerType === 'hobby_maker') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-yellow-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Reconocimientos (Opcional)
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Premios, certificaciones y proyectos comunitarios que destacan tu trabajo
        </p>
      </div>

      {/* Awards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Premios y Reconocimientos
          </label>
          <button
            type="button"
            onClick={addAward}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        {awards.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <Award className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">No hay premios agregados</p>
          </div>
        ) : (
          <div className="space-y-3">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="p-4 bg-linear-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-lg border border-yellow-200 dark:border-yellow-700 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={award.title}
                        onChange={(e) => updateAward(idx, 'title', e.target.value)}
                        placeholder="Nombre del premio"
                        className="px-3 py-2 text-sm border border-yellow-300 dark:border-yellow-600 rounded-sm focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 dark:text-gray-100"
                      />
                      <input
                        type="number"
                        value={award.year}
                        onChange={(e) => updateAward(idx, 'year', parseInt(e.target.value) || 2024)}
                        placeholder="Año"
                        min="1900"
                        max={new Date().getFullYear()}
                        className="px-3 py-2 text-sm border border-yellow-300 dark:border-yellow-600 rounded-sm focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 dark:text-gray-100"
                      />
                    </div>
                    <input
                      type="text"
                      value={award.organization}
                      onChange={(e) => updateAward(idx, 'organization', e.target.value)}
                      placeholder="Organización que lo otorgó"
                      className="w-full px-3 py-2 text-sm border border-yellow-300 dark:border-yellow-600 rounded-sm focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAward(idx)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-sm transition shrink-0"
                    title="Eliminar premio"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Certificaciones
          </label>
          <button
            type="button"
            onClick={addCertification}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <Shield className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No hay certificaciones agregadas
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border border-blue-200 dark:border-blue-700 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(idx, 'name', e.target.value)}
                        placeholder="Nombre de la certificación"
                        className="px-3 py-2 text-sm border border-blue-300 dark:border-blue-600 rounded-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
                      />
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(idx, 'issuer', e.target.value)}
                        placeholder="Organismo emisor"
                        className="px-3 py-2 text-sm border border-blue-300 dark:border-blue-600 rounded-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
                      />
                    </div>
                    <input
                      type="date"
                      value={cert.date}
                      onChange={(e) => updateCertification(idx, 'date', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-blue-300 dark:border-blue-600 rounded-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCertification(idx)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-sm transition shrink-0"
                    title="Eliminar certificación"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community Projects */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Proyectos Comunitarios
          <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">(Uno por línea)</span>
        </label>
        <textarea
          value={communityProjects.join('\n')}
          onChange={(e) =>
            onUpdateProjects(e.target.value.split('\n').filter((line) => line.trim()))
          }
          rows={5}
          placeholder="Talleres gratuitos para jóvenes artesanos&#10;Preservación de técnicas tradicionales&#10;Proyecto de reforestación comunitaria&#10;Capacitación a mujeres artesanas"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none dark:bg-gray-800 dark:text-gray-100"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Escribe cada proyecto en una línea nueva
        </p>
      </div>
    </div>
  );
}
