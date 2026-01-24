'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import {
  VERIFICATION_LEVELS,
  CRAFT_TYPES,
  TRADITIONAL_TECHNIQUES,
  PRODUCTION_CAPACITY,
} from '@/lib/constants/verification';
import type { VerificationLevel, SellerType } from '@/lib/types/verification';
import type { User } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { CheckCircle, AlertCircle, Award, ClipboardList, FileText, Eye } from 'lucide-react';
import RadioGroup from '@/components/common/RadioGroup';
import Stepper, { type Step } from '@/components/common/Stepper';
import FileUpload, { type UploadedFile } from '@/components/common/FileUpload';

export default function VerificationApplicationPage() {
  return (
    <AuthPageWrapper requireSeller>
      {(user) => <VerificationApplicationContent user={user} />}
    </AuthPageWrapper>
  );
}

function VerificationApplicationContent({ user }: { user: User }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sellerType: 'individual' as SellerType,
    requestedLevel: 'verified_artisan' as VerificationLevel,
    craftType: [] as string[],
    techniques: [] as string[],
    yearsOfExperience: 0,
    productionCapacity: 'small' as 'small' | 'medium' | 'large',
    state: '',
    city: '',
    hasPhysicalWorkshop: false,
    heritageInfo: '',
    culturalSignificance: '',
  });

  // File upload states
  const [idFiles, setIdFiles] = useState<UploadedFile[]>([]);
  const [workshopPhotos, setWorkshopPhotos] = useState<UploadedFile[]>([]);
  const [videoFiles, setVideoFiles] = useState<UploadedFile[]>([]);

  const handleFileRemove = (
    fileId: string,
    setter: React.Dispatch<React.SetStateAction<UploadedFile[]>>
  ) => {
    setter((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleSubmit = async () => {
    if (formData.craftType.length === 0) {
      showToast('Por favor selecciona al menos un tipo de artesanía', 'error');
      return;
    }

    if (formData.techniques.length === 0) {
      showToast('Por favor selecciona al menos una técnica', 'error');
      return;
    }

    if (!formData.state || !formData.city) {
      showToast('Por favor completa tu ubicación', 'error');
      return;
    }

    try {
      const response = await fetch('/api/seller/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellerId: user.id,
          sellerName: user.name,
          sellerEmail: user.email,
          sellerType: formData.sellerType,
          requestedLevel: formData.requestedLevel,
          questionnaire: {
            craftType: formData.craftType,
            techniques: formData.techniques,
            yearsOfExperience: formData.yearsOfExperience,
            productionCapacity: formData.productionCapacity,
            location: {
              state: formData.state,
              city: formData.city,
              hasPhysicalWorkshop: formData.hasPhysicalWorkshop,
            },
            heritageInfo: formData.heritageInfo,
            culturalSignificance: formData.culturalSignificance,
          },
        }),
      });

      if (response.ok) {
        showToast('Solicitud enviada con éxito', 'success');
        router.push('/verificacion/estado');
      } else {
        showToast('Error al enviar solicitud', 'error');
      }
    } catch (error) {
      console.error('Error submitting verification request:', error);
      showToast('Error al enviar solicitud', 'error');
    }
  };

  const levelInfo = VERIFICATION_LEVELS[formData.requestedLevel];

  const verificationSteps: Step[] = [
    { id: 'level', label: 'Nivel', description: 'Elige tu nivel', icon: Award },
    { id: 'info', label: 'Información', description: 'Datos del artesano', icon: ClipboardList },
    { id: 'docs', label: 'Documentos', description: 'Sube archivos', icon: FileText },
    { id: 'review', label: 'Revisar', description: 'Confirmar envío', icon: Eye },
  ];

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < step - 1) {
      setStep(stepIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xs p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Solicitud de Verificación</h1>
          <p className="text-gray-600">
            Completa tu solicitud para ser verificado como artesano auténtico
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-xs p-6 mb-6">
          <Stepper
            steps={verificationSteps}
            currentStep={step - 1}
            onStepClick={handleStepClick}
            clickable={true}
            size="md"
            showNumbers={false}
          />
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-xs p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Elige tu Nivel de Verificación
              </h2>

              <RadioGroup
                value={formData.requestedLevel}
                onChange={(value) =>
                  setFormData({ ...formData, requestedLevel: value as VerificationLevel })
                }
                variant="cards"
                options={Object.values(VERIFICATION_LEVELS).map((level) => ({
                  value: level.level,
                  label: (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg font-bold">{level.nameEs}</span>
                      <span className="text-sm text-gray-600">
                        Comisión: {level.commissionRate}%
                      </span>
                    </div>
                  ),
                  description: (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">
                        Tiempo estimado: {level.estimatedTime}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Beneficios:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {level.benefitsEs.slice(0, 3).map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ),
                  icon: <span className="text-3xl">{level.badge.icon}</span>,
                }))}
              />

              <button
                onClick={() => setStep(2)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Información del Artesano</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Artesanía *
                  </label>
                  <select
                    multiple
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.craftType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        craftType: Array.from(e.target.selectedOptions, (option) => option.value),
                      })
                    }
                  >
                    {CRAFT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Técnicas Tradicionales *
                  </label>
                  <select
                    multiple
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.techniques}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        techniques: Array.from(e.target.selectedOptions, (option) => option.value),
                      })
                    }
                  >
                    {TRADITIONAL_TECHNIQUES.map((tech) => (
                      <option key={tech.value} value={tech.value}>
                        {tech.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Años de Experiencia *
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.yearsOfExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacidad de Producción *
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.productionCapacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productionCapacity: e.target.value as 'small' | 'medium' | 'large',
                      })
                    }
                  >
                    {PRODUCTION_CAPACITY.map((cap) => (
                      <option key={cap.value} value={cap.value}>
                        {cap.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hasPhysicalWorkshop}
                    onChange={(e) =>
                      setFormData({ ...formData, hasPhysicalWorkshop: e.target.checked })
                    }
                    className="w-4 h-4 text-primary-600 rounded-sm focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Tengo un taller físico</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Información sobre tu Herencia Artesanal
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={formData.heritageInfo}
                  onChange={(e) => setFormData({ ...formData, heritageInfo: e.target.value })}
                  placeholder="Ej: Técnicas heredadas de mi abuelo..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Significado Cultural de tu Trabajo
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={formData.culturalSignificance}
                  onChange={(e) =>
                    setFormData({ ...formData, culturalSignificance: e.target.value })
                  }
                  placeholder="Ej: Preservando técnicas tradicionales de..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subir Documentos</h2>

              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-secondary-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-secondary-800">
                    <p className="font-semibold mb-1">Documentos Requeridos:</p>
                    <ul className="space-y-1">
                      {levelInfo.requirementsEs.map((req, i) => (
                        <li key={i}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <FileUpload
                  label="Identificación Oficial (INE/Pasaporte)"
                  accept=".jpg,.jpeg,.png,.pdf"
                  maxFiles={2}
                  maxSize={10 * 1024 * 1024}
                  files={idFiles}
                  onFilesChange={setIdFiles}
                  onFileRemove={(id) => handleFileRemove(id, setIdFiles)}
                  helperText="Formatos: JPG, PNG o PDF. Máximo 10MB"
                />

                <FileUpload
                  label="Fotos de tu Taller/Espacio de Trabajo (5+ fotos)"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  maxFiles={10}
                  maxSize={5 * 1024 * 1024}
                  files={workshopPhotos}
                  onFilesChange={setWorkshopPhotos}
                  onFileRemove={(id) => handleFileRemove(id, setWorkshopPhotos)}
                  helperText="Sube al menos 5 fotos. Formatos: JPG, PNG. Máximo 5MB cada una"
                />

                <FileUpload
                  label="Video del Proceso Artesanal (1-3 min)"
                  accept=".mp4,.mov,.webm"
                  maxFiles={1}
                  maxSize={100 * 1024 * 1024}
                  files={videoFiles}
                  onFilesChange={setVideoFiles}
                  onFileRemove={(id) => handleFileRemove(id, setVideoFiles)}
                  helperText="Formatos: MP4, MOV, WebM. Máximo 100MB"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Revisar y Enviar</h2>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Nivel Solicitado</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{levelInfo.badge.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{levelInfo.nameEs}</p>
                      <p className="text-sm text-gray-600">Comisión: {levelInfo.commissionRate}%</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Información</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-gray-600">Tipo de Artesanía:</dt>
                      <dd className="font-medium text-gray-900">{formData.craftType.join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Experiencia:</dt>
                      <dd className="font-medium text-gray-900">
                        {formData.yearsOfExperience} años
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Ubicación:</dt>
                      <dd className="font-medium text-gray-900">
                        {formData.city}, {formData.state}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Taller Físico:</dt>
                      <dd className="font-medium text-gray-900">
                        {formData.hasPhysicalWorkshop ? 'Sí' : 'No'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
                <p className="text-sm text-secondary-800">
                  Al enviar esta solicitud, confirmo que toda la información proporcionada es
                  verdadera y que cuento con los documentos necesarios para verificar mi identidad
                  como artesano.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Enviar Solicitud
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
