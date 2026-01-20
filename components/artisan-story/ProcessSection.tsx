'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Clock,
  Video,
  Leaf,
  Hammer,
  ListOrdered,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  MapPin,
} from 'lucide-react';
import type { Material, Tool, ProcessStep } from '@/lib/types/artisan-story';

interface ProcessSectionProps {
  processVideo: string;
  totalCraftTime: string;
  materials: Material[];
  tools: Tool[];
  processSteps: ProcessStep[];
  onUpdateField: (field: string, value: string) => void;
  onUpdateMaterials: (materials: Material[]) => void;
  onUpdateTools: (tools: Tool[]) => void;
  onUpdateSteps: (steps: ProcessStep[]) => void;
}

export default function ProcessSection({
  processVideo,
  totalCraftTime,
  materials,
  tools,
  processSteps,
  onUpdateField,
  onUpdateMaterials,
  onUpdateTools,
  onUpdateSteps,
}: ProcessSectionProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'materials' | 'tools' | 'steps'>(
    'general'
  );

  // Material handlers
  const addMaterial = () => {
    onUpdateMaterials([...materials, { name: '', source: '', description: '', image: '' }]);
  };

  const updateMaterial = (index: number, field: keyof Material, value: string) => {
    const updated = [...materials];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateMaterials(updated);
  };

  const removeMaterial = (index: number) => {
    onUpdateMaterials(materials.filter((_, i) => i !== index));
  };

  // Tool handlers
  const addTool = () => {
    onUpdateTools([...tools, { name: '', description: '', image: '' }]);
  };

  const updateTool = (index: number, field: keyof Tool, value: string) => {
    const updated = [...tools];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateTools(updated);
  };

  const removeTool = (index: number) => {
    onUpdateTools(tools.filter((_, i) => i !== index));
  };

  // Process Step handlers
  const addStep = () => {
    const newStep: ProcessStep = {
      step: processSteps.length + 1,
      title: '',
      description: '',
      duration: '',
      image: '',
    };
    onUpdateSteps([...processSteps, newStep]);
  };

  const updateStep = (index: number, field: keyof ProcessStep, value: string | number) => {
    const updated = [...processSteps];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateSteps(updated);
  };

  const removeStep = (index: number) => {
    const updated = processSteps.filter((_, i) => i !== index);
    // Renumber steps
    const renumbered = updated.map((step, i) => ({ ...step, step: i + 1 }));
    onUpdateSteps(renumbered);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === processSteps.length - 1) return;

    const updated = [...processSteps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];

    // Renumber steps
    const renumbered = updated.map((step, i) => ({ ...step, step: i + 1 }));
    onUpdateSteps(renumbered);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Clock className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Detrás del Arte</h2>
          <p className="text-sm text-gray-600">Muestra tu proceso creativo paso a paso</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeTab === 'general'
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeTab === 'materials'
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Materiales ({materials.length})
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeTab === 'tools'
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Herramientas ({tools.length})
        </button>
        <button
          onClick={() => setActiveTab('steps')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeTab === 'steps'
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Pasos ({processSteps.length})
        </button>
      </div>

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          {/* Process Video */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Video className="w-4 h-4" />
              Video del Proceso (YouTube)
            </label>
            <input
              type="url"
              value={processVideo}
              onChange={(e) => onUpdateField('processVideo', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Un video mostrando tu proceso de creación (diferente al video de introducción)
            </p>
            {processVideo && (
              <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src={processVideo.replace('watch?v=', 'embed/')}
                  title="Preview del video"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Total Craft Time */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4" />
              Tiempo Total de Creación
            </label>
            <input
              type="text"
              value={totalCraftTime}
              onChange={(e) => onUpdateField('totalCraftTime', e.target.value)}
              placeholder="Ej: 2-3 meses para una pieza grande"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              ¿Cuánto tiempo te toma crear una pieza típica?
            </p>
          </div>
        </div>
      )}

      {/* Materials Tab */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <h3 className="font-medium text-gray-900">Materiales</h3>
            </div>
            <button
              onClick={addMaterial}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar Material
            </button>
          </div>

          {materials.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <Leaf className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No hay materiales agregados</p>
              <button
                onClick={addMaterial}
                className="mt-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Agregar primer material
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {materials.map((material, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-green-700">Material {index + 1}</span>
                    <button
                      onClick={() => removeMaterial(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={material.name}
                        onChange={(e) => updateMaterial(index, 'name', e.target.value)}
                        placeholder="Ej: Lana de Borrego"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        Origen/Fuente *
                      </label>
                      <input
                        type="text"
                        value={material.source}
                        onChange={(e) => updateMaterial(index, 'source', e.target.value)}
                        placeholder="Ej: Rebaños locales de Oaxaca"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Descripción
                      </label>
                      <textarea
                        value={material.description || ''}
                        onChange={(e) => updateMaterial(index, 'description', e.target.value)}
                        placeholder="¿Qué hace especial este material?"
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        URL de Imagen
                      </label>
                      <input
                        type="url"
                        value={material.image || ''}
                        onChange={(e) => updateMaterial(index, 'image', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                      {material.image && (
                        <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden">
                          <Image
                            src={material.image}
                            alt={material.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hammer className="w-5 h-5 text-amber-600" />
              <h3 className="font-medium text-gray-900">Herramientas</h3>
            </div>
            <button
              onClick={addTool}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar Herramienta
            </button>
          </div>

          {tools.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <Hammer className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No hay herramientas agregadas</p>
              <button
                onClick={addTool}
                className="mt-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Agregar primera herramienta
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool, index) => (
                <div key={index} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-amber-700">
                      Herramienta {index + 1}
                    </span>
                    <button
                      onClick={() => removeTool(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={tool.name}
                        onChange={(e) => updateTool(index, 'name', e.target.value)}
                        placeholder="Ej: Telar de Pedal"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Descripción *
                      </label>
                      <textarea
                        value={tool.description}
                        onChange={(e) => updateTool(index, 'description', e.target.value)}
                        placeholder="¿Para qué se usa?"
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        URL de Imagen
                      </label>
                      <input
                        type="url"
                        value={tool.image || ''}
                        onChange={(e) => updateTool(index, 'image', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                      {tool.image && (
                        <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden">
                          <Image src={tool.image} alt={tool.name} fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Process Steps Tab */}
      {activeTab === 'steps' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-900">Pasos del Proceso</h3>
            </div>
            <button
              onClick={addStep}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar Paso
            </button>
          </div>

          {processSteps.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <ListOrdered className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No hay pasos agregados</p>
              <button
                onClick={addStep}
                className="mt-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Agregar primer paso
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <button
                          onClick={() => moveStep(index, 'up')}
                          disabled={index === 0}
                          className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveStep(index, 'down')}
                          disabled={index === processSteps.length - 1}
                          className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <span className="text-sm font-medium text-blue-700">Paso {step.step}</span>
                    </div>
                    <button
                      onClick={() => removeStep(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Título *
                      </label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => updateStep(index, 'title', e.target.value)}
                        placeholder="Ej: Selección de Materiales"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Duración *
                      </label>
                      <input
                        type="text"
                        value={step.duration}
                        onChange={(e) => updateStep(index, 'duration', e.target.value)}
                        placeholder="Ej: 2-3 días"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Descripción *
                      </label>
                      <textarea
                        value={step.description}
                        onChange={(e) => updateStep(index, 'description', e.target.value)}
                        placeholder="Describe este paso en detalle..."
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        URL de Imagen
                      </label>
                      <input
                        type="url"
                        value={step.image || ''}
                        onChange={(e) => updateStep(index, 'image', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                      {step.image && (
                        <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden">
                          <Image src={step.image} alt={step.title} fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500 text-center">
            💡 Usa las flechas para reordenar los pasos
          </p>
        </div>
      )}
    </div>
  );
}
