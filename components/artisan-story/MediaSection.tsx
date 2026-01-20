'use client';

import { useState } from 'react';
import { Camera, Upload, X, Film } from 'lucide-react';
import Image from 'next/image';
import { SellerType } from '@/lib/types/seller-types';

interface MediaSectionProps {
  sellerType: SellerType;
  videoIntro: string;
  workshopPhotos: string[];
  processPhotos: string[];
  familyPhotos: string[];
  teamPhotos: string[];
  onUpdate: (field: string, value: string) => void;
  onUpdatePhotos: (field: string, photos: string[]) => void;
}

export default function MediaSection({
  sellerType,
  videoIntro,
  workshopPhotos,
  processPhotos,
  familyPhotos,
  teamPhotos,
  onUpdate,
  onUpdatePhotos,
}: MediaSectionProps) {
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [activePhotoType, setActivePhotoType] = useState<
    'workshop' | 'process' | 'family' | 'team' | null
  >(null);
  const addPhoto = (type: 'workshop' | 'process' | 'family' | 'team') => {
    if (!newPhotoUrl.trim()) return;

    const photoMap = {
      workshop: workshopPhotos,
      process: processPhotos,
      family: familyPhotos,
      team: teamPhotos,
    };

    onUpdatePhotos(
      type === 'workshop'
        ? 'workshopPhotos'
        : type === 'process'
          ? 'processPhotos'
          : type === 'family'
            ? 'familyPhotos'
            : 'teamPhotos',
      [...photoMap[type], newPhotoUrl]
    );
    setNewPhotoUrl('');
    setActivePhotoType(null);
  };

  const removePhoto = (type: 'workshop' | 'process' | 'family' | 'team', index: number) => {
    const photoMap = {
      workshop: workshopPhotos,
      process: processPhotos,
      family: familyPhotos,
      team: teamPhotos,
    };

    onUpdatePhotos(
      type === 'workshop'
        ? 'workshopPhotos'
        : type === 'process'
          ? 'processPhotos'
          : type === 'family'
            ? 'familyPhotos'
            : 'teamPhotos',
      photoMap[type].filter((_, i) => i !== index)
    );
  };

  const getPhotoSectionTitle = () => {
    if (sellerType === 'hobby_maker') return 'Fotos (Opcional)';
    if (sellerType === 'company') return 'Fotos de la Empresa';
    return 'Fotos';
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Camera className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">{getPhotoSectionTitle()}</h2>
        </div>
        <p className="text-sm text-gray-600">
          {sellerType === 'hobby_maker'
            ? 'Las fotos ayudan a que los clientes confíen en ti (opcional pero recomendado)'
            : 'Las fotos ayudan a que los clientes conozcan tu espacio y proceso'}
        </p>
      </div>

      {/* Video Introduction */}
      {sellerType !== 'hobby_maker' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Video de Introducción (Opcional)
            <span className="text-gray-500 font-normal ml-2">(URL de YouTube o Vimeo)</span>
          </label>
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={videoIntro}
              onChange={(e) => onUpdate('videoIntro', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            💡 Un video corto (1-2 minutos) puede aumentar la confianza hasta 80%
          </p>
        </div>
      )}

      {/* Workshop Photos */}
      {sellerType !== 'company' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              {sellerType === 'hobby_maker' ? 'Fotos de tu Espacio' : 'Fotos del Taller'}{' '}
              {sellerType === 'hobby_maker' ? '(Opcional)' : '*'}
            </label>
            {activePhotoType !== 'workshop' && (
              <button
                type="button"
                onClick={() => setActivePhotoType('workshop')}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Upload className="w-4 h-4" />
                Agregar
              </button>
            )}
          </div>

          {activePhotoType === 'workshop' && (
            <div className="mb-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <input
                type="url"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 border border-indigo-300 rounded-sm mb-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addPhoto('workshop');
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addPhoto('workshop')}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-sm hover:bg-indigo-700"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePhotoType(null);
                    setNewPhotoUrl('');
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {workshopPhotos.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No hay fotos agregadas</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {workshopPhotos.map((photo, idx) => (
                <div key={idx} className="relative group aspect-square">
                  <Image
                    src={photo}
                    alt={`Taller ${idx + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto('workshop', idx)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Process Photos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">
            {sellerType === 'company' ? 'Fotos del Proceso de Producción' : 'Fotos del Proceso'}{' '}
            {sellerType === 'hobby_maker' ? '(Opcional)' : '*'}
          </label>
          {activePhotoType !== 'process' && (
            <button
              type="button"
              onClick={() => setActivePhotoType('process')}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <Upload className="w-4 h-4" />
              Agregar
            </button>
          )}
        </div>

        {activePhotoType === 'process' && (
          <div className="mb-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <input
              type="url"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border border-indigo-300 rounded-sm mb-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addPhoto('process');
                }
              }}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addPhoto('process')}
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-sm hover:bg-indigo-700"
              >
                Agregar
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePhotoType(null);
                  setNewPhotoUrl('');
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {processPhotos.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No hay fotos agregadas</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {processPhotos.map((photo, idx) => (
              <div key={idx} className="relative group aspect-square">
                <Image
                  src={photo}
                  alt={`Proceso ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removePhoto('process', idx)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Family Photos - Only for artisans */}
      {sellerType === 'artisan_individual' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              Fotos Familiares (Opcional)
            </label>
            {activePhotoType !== 'family' && (
              <button
                type="button"
                onClick={() => setActivePhotoType('family')}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Upload className="w-4 h-4" />
                Agregar
              </button>
            )}
          </div>

          {activePhotoType === 'family' && (
            <div className="mb-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <input
                type="url"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 border border-indigo-300 rounded-sm mb-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addPhoto('family');
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addPhoto('family')}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-sm hover:bg-indigo-700"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePhotoType(null);
                    setNewPhotoUrl('');
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {familyPhotos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {familyPhotos.map((photo, idx) => (
                <div key={idx} className="relative group aspect-square">
                  <Image
                    src={photo}
                    alt={`Familia ${idx + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto('family', idx)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Team Photos - Only for workshop and company */}
      {(sellerType === 'workshop' || sellerType === 'company') && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">Fotos del Equipo *</label>
            {activePhotoType !== 'team' && (
              <button
                type="button"
                onClick={() => setActivePhotoType('team')}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Upload className="w-4 h-4" />
                Agregar
              </button>
            )}
          </div>

          {activePhotoType === 'team' && (
            <div className="mb-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <input
                type="url"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 border border-indigo-300 rounded-sm mb-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addPhoto('team');
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addPhoto('team')}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-sm hover:bg-indigo-700"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePhotoType(null);
                    setNewPhotoUrl('');
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {teamPhotos.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No hay fotos agregadas</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {teamPhotos.map((photo, idx) => (
                <div key={idx} className="relative group aspect-square">
                  <Image
                    src={photo}
                    alt={`Equipo ${idx + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto('team', idx)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Photo Tips */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-sm text-indigo-900 font-semibold mb-2">💡 Consejos para buenas fotos:</p>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• Usa buena iluminación natural</li>
          <li>• Muestra tu espacio de trabajo y herramientas</li>
          <li>• Incluye fotos del proceso paso a paso</li>
          {sellerType !== 'hobby_maker' && <li>• Las fotos auténticas generan más confianza</li>}
        </ul>
      </div>
    </div>
  );
}
